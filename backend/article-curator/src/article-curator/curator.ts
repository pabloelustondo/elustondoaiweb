import { randomUUID } from 'node:crypto'
import {
  APPROVED_MEDIUM_LIST_URL,
  type ArticleClassification,
  type ArticleClassifier,
  type ClassificationInput,
  type CuratedArticle,
  type CuratorLogger,
  type CuratorRunSummary,
  type CuratorState,
  type CuratorStore,
  type DiscoveredMediumArticle,
  type MediumCatalogSource,
  type PendingRemovalObservation,
} from './contracts.js'
import { mediumPostIdFromUrl, normalizeMediumUrl } from './medium-source.js'

interface NormalizedDiscoveredArticle extends DiscoveredMediumArticle {
  sourceId: string
  mediumPostId: string
}

function sourceIdFromUrl(url: string): string {
  const pathname = new URL(url).pathname
  const lastSegment = pathname.split('/').filter(Boolean).at(-1) ?? ''
  const mediumPostId = mediumPostIdFromUrl(url)
  const slug = lastSegment.replace(/-[0-9a-f]{12}$/i, '').trim().toLowerCase()
  return slug ? `${slug}-${mediumPostId}` : `medium-${mediumPostId}`
}

function normalizeDiscovered(
  discovered: readonly DiscoveredMediumArticle[],
  previous: CuratorState,
): NormalizedDiscoveredArticle[] {
  const previousByPostId = new Map(previous.articles.map((article) => [article.mediumPostId, article]))
  const seenPostIds = new Set<string>()
  const seenSourceIds = new Set<string>()

  return discovered.map((article) => {
    const canonicalUrl = normalizeMediumUrl(article.canonicalUrl)
    const mediumPostId = mediumPostIdFromUrl(canonicalUrl)
    if (seenPostIds.has(mediumPostId)) throw new Error(`Duplicate Medium post ${mediumPostId}.`)
    seenPostIds.add(mediumPostId)
    const prior = previousByPostId.get(mediumPostId)
    const sourceId = (prior?.sourceId ?? sourceIdFromUrl(canonicalUrl)).trim()
    if (seenSourceIds.has(sourceId)) throw new Error(`Duplicate normalized source identifier ${sourceId}.`)
    seenSourceIds.add(sourceId)

    return {
      sourceId,
      mediumPostId,
      canonicalTitle: article.canonicalTitle.trim(),
      canonicalUrl,
      author: article.author.trim(),
      publishedAt: new Date(article.publishedAt).toISOString(),
      ...(article.excerpt?.trim() ? { excerpt: article.excerpt.trim() } : {}),
    }
  })
}

function sourceMetadataChanged(
  previous: CuratedArticle,
  current: NormalizedDiscoveredArticle,
): boolean {
  return previous.canonicalTitle !== current.canonicalTitle
    || previous.canonicalUrl !== current.canonicalUrl
    || previous.author !== current.author
    || previous.publishedAt !== current.publishedAt
    || previous.excerpt !== current.excerpt
}

function sameIds(left: readonly string[], right: readonly string[]): boolean {
  return left.length === right.length && left.every((value, index) => value === right[index])
}

function removalObservation(
  absentArticleIds: string[],
  previous: PendingRemovalObservation | undefined,
  now: string,
): PendingRemovalObservation | undefined {
  if (absentArticleIds.length === 0) return undefined
  const sorted = [...absentArticleIds].sort()
  const isContinuation = previous && sameIds(previous.articleIds, sorted)
  return {
    articleIds: sorted,
    confirmations: isContinuation ? previous.confirmations + 1 : 1,
    firstObservedAt: isContinuation ? previous.firstObservedAt : now,
    lastObservedAt: now,
  }
}

function classificationInput(article: NormalizedDiscoveredArticle): ClassificationInput {
  return {
    sourceId: article.sourceId,
    canonicalTitle: article.canonicalTitle,
    ...(article.excerpt ? { excerpt: article.excerpt } : {}),
  }
}

function catalogFingerprint(articles: readonly CuratedArticle[]): string {
  return JSON.stringify(articles.map((article) => ({
    sourceId: article.sourceId,
    mediumPostId: article.mediumPostId,
    canonicalTitle: article.canonicalTitle,
    canonicalUrl: article.canonicalUrl,
    author: article.author,
    publishedAt: article.publishedAt,
    excerpt: article.excerpt,
    classification: article.classification,
  })))
}

export class ArticleCurator {
  constructor(
    private readonly source: MediumCatalogSource,
    private readonly classifier: ArticleClassifier,
    private readonly store: CuratorStore,
    private readonly logger: CuratorLogger,
    private readonly removalConfirmationCount = 2,
    private readonly clock: () => Date = () => new Date(),
  ) {}

  private async appendAuditBestEffort(run: CuratorRunSummary): Promise<void> {
    try {
      await this.store.appendAuditLog(run)
    } catch (error) {
      this.logger.warn('Article curator audit log could not be appended.', {
        runId: run.runId,
        errorName: error instanceof Error ? error.name : 'UnknownError',
        message: error instanceof Error ? error.message : 'Unknown audit-log failure.',
      })
    }
  }

  async run(): Promise<CuratorRunSummary> {
    const runId = randomUUID()
    const startedAt = this.clock().toISOString()
    let discoveredCount = 0

    try {
      const previous = await this.store.loadState()
      const discovered = normalizeDiscovered(await this.source.read(), previous)
      discoveredCount = discovered.length
      const discoveredIds = new Set(discovered.map((article) => article.sourceId))
      const previousById = new Map(previous.articles.map((article) => [article.sourceId, article]))
      const absentArticleIds = previous.articles
        .filter((article) => !discoveredIds.has(article.sourceId))
        .map((article) => article.sourceId)
        .sort()
      const pendingRemoval = removalObservation(absentArticleIds, previous.pendingRemoval, startedAt)
      const removalsConfirmed = Boolean(
        pendingRemoval && pendingRemoval.confirmations >= this.removalConfirmationCount,
      )
      const appliedRemovedArticleIds = removalsConfirmed ? pendingRemoval?.articleIds ?? [] : []

      const needsClassification = discovered.filter((article) => {
        const prior = previousById.get(article.sourceId)
        if (!prior) return true
        if (prior.classification.origin === 'EDITORIAL_OVERRIDE') return false
        return sourceMetadataChanged(prior, article)
      })
      const classificationResults = await this.classifier.classify(
        needsClassification.map(classificationInput),
      )
      const classificationsById = new Map(
        classificationResults.map((classification) => [classification.sourceId, classification]),
      )

      const nextArticles = discovered.map((article): CuratedArticle => {
        const prior = previousById.get(article.sourceId)
        const classification = prior && (
          prior.classification.origin === 'EDITORIAL_OVERRIDE'
          || !sourceMetadataChanged(prior, article)
        )
          ? prior.classification
          : classificationsById.get(article.sourceId)

        if (!classification) throw new Error(`No classification exists for ${article.sourceId}.`)

        return {
          ...article,
          sourceCollection: APPROVED_MEDIUM_LIST_URL,
          classification: classification as ArticleClassification,
        }
      })

      if (pendingRemoval && !removalsConfirmed) {
        for (const articleId of pendingRemoval.articleIds) {
          const prior = previousById.get(articleId)
          if (prior) nextArticles.push(prior)
        }
      }
      nextArticles.sort((left, right) => left.sourceId.localeCompare(right.sourceId))

      const addedArticleIds = nextArticles
        .filter((article) => !previousById.has(article.sourceId))
        .map((article) => article.sourceId)
      const stateChanged = catalogFingerprint(previous.articles) !== catalogFingerprint(nextArticles)
        || JSON.stringify(previous.pendingRemoval) !== JSON.stringify(removalsConfirmed ? undefined : pendingRemoval)
      const completedAt = this.clock().toISOString()
      const run: CuratorRunSummary = {
        runId,
        startedAt,
        completedAt,
        status: stateChanged ? 'UPDATED' : 'UNCHANGED',
        discoveredCount,
        addedArticleIds,
        removedArticleIds: appliedRemovedArticleIds,
        pendingRemovalArticleIds: removalsConfirmed ? [] : pendingRemoval?.articleIds ?? [],
        classifiedArticleIds: classificationResults.map((result) => result.sourceId),
        message: removalsConfirmed
          ? 'Validated catalog saved after confirming the same removal set twice.'
          : pendingRemoval
            ? 'Catalog saved with removals pending a second consecutive observation.'
            : stateChanged
              ? 'Validated catalog saved.'
              : 'Validated catalog is unchanged.',
      }
      const nextState: CuratorState = {
        schemaVersion: 1,
        sourceCollection: APPROVED_MEDIUM_LIST_URL,
        refreshedAt: completedAt,
        articles: nextArticles,
        ...(!removalsConfirmed && pendingRemoval ? { pendingRemoval } : {}),
        lastRun: run,
      }

      await this.store.commitState(nextState, run)
      await this.appendAuditBestEffort(run)
      this.logger.info('Article curator completed.', {
        runId,
        status: run.status,
        discoveredCount,
        addedCount: run.addedArticleIds.length,
        removedCount: run.removedArticleIds.length,
        pendingRemovalCount: run.pendingRemovalArticleIds.length,
        classifiedCount: run.classifiedArticleIds.length,
      })
      return run
    } catch (error) {
      const completedAt = this.clock().toISOString()
      const run: CuratorRunSummary = {
        runId,
        startedAt,
        completedAt,
        status: 'FAILED',
        discoveredCount,
        addedArticleIds: [],
        removedArticleIds: [],
        pendingRemovalArticleIds: [],
        classifiedArticleIds: [],
        message: error instanceof Error ? error.message : 'Unknown curator failure.',
      }
      await this.appendAuditBestEffort(run)
      this.logger.error('Article curator failed; last-known-good state was preserved.', {
        runId,
        errorName: error instanceof Error ? error.name : 'UnknownError',
        message: run.message,
      })
      throw error
    }
  }
}
