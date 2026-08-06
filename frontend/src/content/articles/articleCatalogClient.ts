import type { ArticleRecord } from '../siteContent'
import { articleSummaries } from './articleEditorialMetadata'
import { APPROVED_MEDIUM_FEED_URL } from './articleSourceSnapshot'
import { APPROVED_PILLARS, type ArticlePillar, type ClassifiedArticle } from './articleTaxonomy'

export const ARTICLE_CATALOG_ENDPOINT = '/api/articles'

export interface PublicCatalogArticle {
  sourceId: string
  title: string
  url: string
  author: string
  publishedAt: string
  tags: string[]
  excerpt?: string
  pillars: ArticlePillar[]
  subjects: string[]
  classificationState: 'CLASSIFIED' | 'UNCLASSIFIED'
}

export interface PublicCatalog {
  version: 1
  refreshedAt: string
  articles: PublicCatalogArticle[]
}

export interface ArticleLibrary {
  refreshedAt: string
  articles: readonly ArticleRecord[]
  classified: readonly ClassifiedArticle[]
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((entry) => typeof entry === 'string')
}

function isCatalogArticle(candidate: unknown): candidate is PublicCatalogArticle {
  if (typeof candidate !== 'object' || candidate === null) return false
  const article = candidate as Record<string, unknown>
  const url = typeof article.url === 'string' ? article.url : ''
  return typeof article.sourceId === 'string' && article.sourceId.trim() !== ''
    && typeof article.title === 'string' && article.title.trim() !== ''
    && url.startsWith('https://medium.com/')
    && article.author === 'Pablo Elustondo'
    && typeof article.publishedAt === 'string' && !Number.isNaN(Date.parse(article.publishedAt))
    && isStringArray(article.tags)
    && (article.excerpt === undefined || typeof article.excerpt === 'string')
    && isStringArray(article.pillars)
    && article.pillars.every((pillar) => (APPROVED_PILLARS as readonly string[]).includes(pillar))
    && isStringArray(article.subjects)
    && (article.classificationState === 'CLASSIFIED' || article.classificationState === 'UNCLASSIFIED')
}

export function parsePublicCatalog(candidate: unknown): PublicCatalog | null {
  if (typeof candidate !== 'object' || candidate === null) return null
  const catalog = candidate as Record<string, unknown>
  if (catalog.version !== 1) return null
  if (typeof catalog.refreshedAt !== 'string' || Number.isNaN(Date.parse(catalog.refreshedAt))) return null
  if (!Array.isArray(catalog.articles) || !catalog.articles.every(isCatalogArticle)) return null
  const sourceIds = new Set(catalog.articles.map((article) => article.sourceId))
  if (sourceIds.size !== catalog.articles.length) return null
  return { version: 1, refreshedAt: catalog.refreshedAt, articles: catalog.articles }
}

const publicationDate = new Intl.DateTimeFormat('en-US', {
  year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC',
})

function cardSummary(article: PublicCatalogArticle): string | undefined {
  const curated = articleSummaries[article.sourceId]
  if (curated) return curated
  const excerpt = article.excerpt?.trim()
  if (!excerpt) return undefined
  if (excerpt.length <= 220) return excerpt
  return `${excerpt.slice(0, 220).replace(/\s+\S*$/, '')}…`
}

export function toArticleLibrary(catalog: PublicCatalog): ArticleLibrary {
  const articles = catalog.articles.map((article): ArticleRecord => ({
    id: article.sourceId,
    title: article.title,
    summary: cardSummary(article),
    publishedLabel: publicationDate.format(new Date(article.publishedAt)),
    publishedAt: article.publishedAt,
    author: article.author,
    url: article.url,
    source: 'MEDIUM_ELUSTONDO_AI_LIST',
    publicationState: 'PUBLIC',
  }))

  const classified = catalog.articles.map((article): ClassifiedArticle => ({
    sourceId: article.sourceId,
    canonicalTitle: article.title,
    canonicalUrl: article.url,
    author: article.author,
    publishedAt: article.publishedAt,
    sourceCollection: APPROVED_MEDIUM_FEED_URL,
    pillars: [...article.pillars],
    subjects: [...article.subjects],
    canonicalFor: [],
    featuredFor: [],
    editorialPriority: 0,
    classificationState: article.pillars.length > 0 ? 'CLASSIFIED' : 'UNCLASSIFIED',
    provenance: article.pillars.length > 0 ? 'AI_CLASSIFICATION' : 'NO_EDITORIAL_ASSIGNMENT',
    rationale: article.pillars.length > 0
      ? 'Classified by the article curator from approved Medium metadata.'
      : 'No pillar assignment exists yet.',
    humanReviewState: article.pillars.length > 0 ? 'AI_CURATED' : 'NEEDS_REVIEW',
  }))

  return { refreshedAt: catalog.refreshedAt, articles, classified }
}

let cachedLibrary: Promise<ArticleLibrary | null> | undefined

export function fetchArticleLibrary(fetcher: typeof fetch = fetch): Promise<ArticleLibrary | null> {
  cachedLibrary ??= (async () => {
    try {
      const response = await fetcher(ARTICLE_CATALOG_ENDPOINT, { headers: { accept: 'application/json' } })
      if (!response.ok) return null
      const catalog = parsePublicCatalog(await response.json())
      return catalog ? toArticleLibrary(catalog) : null
    } catch {
      return null
    }
  })().then((library) => {
    // A failed fetch is not cached so a later page view can retry.
    if (!library) cachedLibrary = undefined
    return library
  })
  return cachedLibrary
}

export function resetArticleLibraryCache() {
  cachedLibrary = undefined
}
