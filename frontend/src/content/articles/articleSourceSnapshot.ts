export const APPROVED_MEDIUM_LIST_URL = 'https://medium.com/@pabloelustondo/list/elustondoai-dd60f27687ee' as const

export interface RawArticleSourceRecord {
  sourceId: string
  canonicalTitle: string
  canonicalUrl: string
  author: string
  publishedAt: string
  sourceCollection: string
}

export interface NormalizedArticleRecord extends RawArticleSourceRecord {
  sourceCollection: typeof APPROVED_MEDIUM_LIST_URL
}

export interface ArticleSourceSnapshot {
  version: number
  sourceCollection: typeof APPROVED_MEDIUM_LIST_URL
  refreshedAt: string
  articles: readonly NormalizedArticleRecord[]
}

export type SnapshotIssueCode =
  | 'DUPLICATE_SOURCE_ID'
  | 'DUPLICATE_CANONICAL_URL'
  | 'MALFORMED_RECORD'
  | 'MALFORMED_URL'
  | 'MALFORMED_PUBLICATION_TIME'
  | 'OUTSIDE_APPROVED_COLLECTION'

export interface SnapshotIssue {
  code: SnapshotIssueCode
  sourceId?: string
  detail: string
}

export interface ChangedArticleMetadata {
  sourceId: string
  fields: string[]
  staleTitle: boolean
}

export interface ArticleSourceDiff {
  added: string[]
  removed: string[]
  changed: ChangedArticleMetadata[]
}

export type ArticleRefreshResult =
  | {
      ok: true
      candidate: ArticleSourceSnapshot
      diff: ArticleSourceDiff
      publicationDecision: 'UNCHANGED' | 'REVIEW_REQUIRED'
    }
  | {
      ok: false
      snapshot: ArticleSourceSnapshot
      issues: SnapshotIssue[]
    }

const requiredFields: readonly (keyof RawArticleSourceRecord)[] = [
  'sourceId',
  'canonicalTitle',
  'canonicalUrl',
  'author',
  'publishedAt',
  'sourceCollection',
]

function validateRecord(record: RawArticleSourceRecord): SnapshotIssue[] {
  const issues: SnapshotIssue[] = []
  if (requiredFields.some((field) => typeof record[field] !== 'string' || record[field].trim() === '')) {
    issues.push({ code: 'MALFORMED_RECORD', sourceId: record.sourceId, detail: 'Every canonical metadata field is required.' })
  }

  let canonicalUrl: URL | undefined
  try {
    canonicalUrl = new URL(record.canonicalUrl)
  } catch {
    issues.push({ code: 'MALFORMED_URL', sourceId: record.sourceId, detail: 'Canonical URL is not a valid URL.' })
  }
  if (canonicalUrl && (canonicalUrl.protocol !== 'https:' || canonicalUrl.hostname !== 'medium.com' || !canonicalUrl.pathname.startsWith('/@pabloelustondo/'))) {
    issues.push({ code: 'MALFORMED_URL', sourceId: record.sourceId, detail: 'Canonical URL is outside Pablo Elustondo’s public Medium publication path.' })
  }

  if (Number.isNaN(Date.parse(record.publishedAt))) {
    issues.push({ code: 'MALFORMED_PUBLICATION_TIME', sourceId: record.sourceId, detail: 'Publication time is not an ISO-compatible date.' })
  }
  if (record.sourceCollection !== APPROVED_MEDIUM_LIST_URL) {
    issues.push({ code: 'OUTSIDE_APPROVED_COLLECTION', sourceId: record.sourceId, detail: 'Record is outside the approved Elustondo.ai Medium list.' })
  }
  return issues
}

function metadataDiff(previous: NormalizedArticleRecord, current: NormalizedArticleRecord) {
  const fields = (['canonicalTitle', 'canonicalUrl', 'author', 'publishedAt', 'sourceCollection'] as const)
    .filter((field) => previous[field] !== current[field])
  return fields.length > 0 ? { sourceId: current.sourceId, fields: [...fields], staleTitle: fields.includes('canonicalTitle') } : undefined
}

export function normalizeArticleSource(
  records: readonly RawArticleSourceRecord[],
  previousSnapshot: ArticleSourceSnapshot,
  refreshedAt: string,
): ArticleRefreshResult {
  const issues = records.flatMap(validateRecord)
  const seenIds = new Set<string>()
  const seenUrls = new Set<string>()
  for (const record of records) {
    if (seenIds.has(record.sourceId)) {
      issues.push({ code: 'DUPLICATE_SOURCE_ID', sourceId: record.sourceId, detail: 'Source identifier occurs more than once.' })
    }
    if (seenUrls.has(record.canonicalUrl)) {
      issues.push({ code: 'DUPLICATE_CANONICAL_URL', sourceId: record.sourceId, detail: 'Canonical URL occurs more than once.' })
    }
    seenIds.add(record.sourceId)
    seenUrls.add(record.canonicalUrl)
  }

  if (issues.length > 0) return { ok: false, snapshot: previousSnapshot, issues }

  const articles = records
    .map((record): NormalizedArticleRecord => ({
      sourceId: record.sourceId.trim(),
      canonicalTitle: record.canonicalTitle.trim(),
      canonicalUrl: record.canonicalUrl.trim(),
      author: record.author.trim(),
      publishedAt: record.publishedAt.trim(),
      sourceCollection: APPROVED_MEDIUM_LIST_URL,
    }))
    .sort((left, right) => left.sourceId.localeCompare(right.sourceId))

  const priorById = new Map(previousSnapshot.articles.map((article) => [article.sourceId, article]))
  const currentById = new Map(articles.map((article) => [article.sourceId, article]))
  const added = articles.filter((article) => !priorById.has(article.sourceId)).map((article) => article.sourceId)
  const removed = previousSnapshot.articles.filter((article) => !currentById.has(article.sourceId)).map((article) => article.sourceId).sort()
  const changed = articles.flatMap((article) => {
    const previous = priorById.get(article.sourceId)
    if (!previous) return []
    const change = metadataDiff(previous, article)
    return change ? [change] : []
  })
  const diff = { added, removed, changed }
  const publicationDecision = added.length || removed.length || changed.length ? 'REVIEW_REQUIRED' : 'UNCHANGED'

  return {
    ok: true,
    candidate: {
      version: previousSnapshot.version + (publicationDecision === 'REVIEW_REQUIRED' ? 1 : 0),
      sourceCollection: APPROVED_MEDIUM_LIST_URL,
      refreshedAt,
      articles,
    },
    diff,
    publicationDecision,
  }
}
