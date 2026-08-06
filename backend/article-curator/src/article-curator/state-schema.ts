import { z } from 'zod'
import {
  APPROVED_MEDIUM_PROFILE_FEED_URL,
  APPROVED_PILLARS,
  type CuratorState,
} from './contracts.js'
import { mediumPostIdFromUrl, normalizeMediumUrl } from './medium-source.js'

const boundedIdentifier = z.string().min(1).max(240).refine(
  (value) => value === value.trim(),
  'Identifiers must already be normalized.',
)
const timestamp = z.string().min(1).max(100).refine(
  (value) => !Number.isNaN(Date.parse(value)),
  'Timestamp must be parseable.',
)
const identifierList = z.array(boundedIdentifier).max(200).refine(
  (values) => new Set(values).size === values.length,
  'Identifier lists must not contain duplicates.',
)

const classificationSchema = z.strictObject({
  pillars: z.array(z.enum(APPROVED_PILLARS)).max(APPROVED_PILLARS.length).refine(
    (values) => new Set(values).size === values.length,
    'Pillars must not contain duplicates.',
  ),
  subjects: z.array(z.string().min(1).max(80).refine(
    (value) => value === value.trim(),
    'Subjects must already be normalized.',
  )).max(6).refine(
    (values) => new Set(values).size === values.length,
    'Subjects must not contain duplicates.',
  ),
  rationale: z.string().min(1).max(500),
  confidence: z.number().min(0).max(1),
  origin: z.enum(['EDITORIAL_OVERRIDE', 'LANGCHAIN_GEMINI']),
  humanReviewState: z.enum(['APPROVED', 'AI_CURATED']),
  reviewedAt: timestamp.optional(),
}).superRefine((classification, context) => {
  if (classification.origin === 'EDITORIAL_OVERRIDE' && classification.humanReviewState !== 'APPROVED') {
    context.addIssue({ code: 'custom', message: 'Editorial overrides must be human approved.' })
  }
  if (classification.origin === 'LANGCHAIN_GEMINI' && classification.humanReviewState !== 'AI_CURATED') {
    context.addIssue({ code: 'custom', message: 'Machine classifications must remain AI curated.' })
  }
})

const articleSchema = z.strictObject({
  sourceId: boundedIdentifier,
  mediumPostId: z.string().regex(/^[0-9a-f]{12}$/),
  canonicalTitle: z.string().min(1).max(500).refine(
    (value) => value === value.trim(),
    'Titles must already be normalized.',
  ),
  canonicalUrl: z.url().superRefine((value, context) => {
    try {
      if (normalizeMediumUrl(value) !== value) {
        context.addIssue({ code: 'custom', message: 'Medium URLs must be canonical.' })
      }
    } catch {
      context.addIssue({ code: 'custom', message: 'URL must be a canonical Medium URL.' })
    }
  }),
  author: z.literal('Pablo Elustondo'),
  publishedAt: timestamp,
  tags: z.array(z.string().min(1).max(100).refine(
    (value) => value === value.trim(),
    'Tags must already be normalized.',
  )).max(25),
  excerpt: z.string().max(1000).refine(
    (value) => value === value.trim(),
    'Excerpts must already be normalized.',
  ).optional(),
  sourceCollection: z.literal(APPROVED_MEDIUM_PROFILE_FEED_URL),
  classification: classificationSchema,
}).superRefine((article, context) => {
  try {
    if (mediumPostIdFromUrl(article.canonicalUrl) !== article.mediumPostId) {
      context.addIssue({ code: 'custom', message: 'Medium post identity must match the canonical URL.' })
    }
  } catch {
    context.addIssue({ code: 'custom', message: 'Canonical URL must contain a stable Medium post identity.' })
  }
})

const runSummarySchema = z.strictObject({
  runId: boundedIdentifier,
  startedAt: timestamp,
  completedAt: timestamp,
  status: z.enum(['UPDATED', 'UNCHANGED', 'FAILED']),
  discoveredCount: z.number().int().min(0).max(1000),
  addedArticleIds: identifierList,
  removedArticleIds: identifierList,
  pendingRemovalArticleIds: identifierList,
  classifiedArticleIds: identifierList,
  message: z.string().min(1).max(1000),
})

const curatorStateSchema = z.strictObject({
  schemaVersion: z.literal(1),
  sourceCollection: z.literal(APPROVED_MEDIUM_PROFILE_FEED_URL),
  refreshedAt: timestamp,
  articles: z.array(articleSchema).min(1).max(200),
  pendingRemoval: z.strictObject({
    articleIds: identifierList.min(1),
    confirmations: z.number().int().min(1).max(100),
    firstObservedAt: timestamp,
    lastObservedAt: timestamp,
  }).optional(),
  lastRun: runSummarySchema.optional(),
}).superRefine((state, context) => {
  const identities = [
    ['sourceId', state.articles.map((article) => article.sourceId)],
    ['mediumPostId', state.articles.map((article) => article.mediumPostId)],
    ['canonicalUrl', state.articles.map((article) => article.canonicalUrl)],
  ] as const
  for (const [name, values] of identities) {
    if (new Set(values).size !== values.length) {
      context.addIssue({ code: 'custom', message: `Curator state contains duplicate ${name} values.` })
    }
  }

  if (state.pendingRemoval) {
    const articleIds = new Set(state.articles.map((article) => article.sourceId))
    const unknown = state.pendingRemoval.articleIds.filter((articleId) => !articleIds.has(articleId))
    if (unknown.length > 0) {
      context.addIssue({ code: 'custom', message: `Pending removals reference unknown articles: ${unknown.join(', ')}` })
    }
  }
})

export class CuratorStateValidationError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options)
    this.name = 'CuratorStateValidationError'
  }
}

export function parseCuratorState(candidate: unknown): CuratorState {
  const parsed = curatorStateSchema.safeParse(candidate)
  if (!parsed.success) {
    throw new CuratorStateValidationError(
      `Persisted curator state failed runtime validation: ${z.prettifyError(parsed.error)}`,
      { cause: parsed.error },
    )
  }
  return parsed.data
}
