export const APPROVED_MEDIUM_LIST_URL =
  'https://medium.com/@pabloelustondo/list/elustondoai-dd60f27687ee' as const

export const APPROVED_MEDIUM_PROFILE_FEED_URL =
  'https://medium.com/feed/@pabloelustondo' as const

export const APPROVED_PILLARS = ['SDLC²', 'Architecture', 'Modernization'] as const

export type ApprovedPillar = (typeof APPROVED_PILLARS)[number]

export interface DiscoveredMediumArticle {
  canonicalTitle: string
  canonicalUrl: string
  author: string
  publishedAt: string
  excerpt?: string
}

export interface ArticleClassification {
  pillars: ApprovedPillar[]
  subjects: string[]
  rationale: string
  confidence: number
  origin: 'EDITORIAL_OVERRIDE' | 'LANGCHAIN_GEMINI'
  humanReviewState: 'APPROVED' | 'AI_CURATED'
  reviewedAt?: string
}

export interface CuratedArticle extends DiscoveredMediumArticle {
  sourceId: string
  mediumPostId: string
  sourceCollection: typeof APPROVED_MEDIUM_LIST_URL
  classification: ArticleClassification
}

export interface PendingRemovalObservation {
  articleIds: string[]
  confirmations: number
  firstObservedAt: string
  lastObservedAt: string
}

export interface CuratorRunSummary {
  runId: string
  startedAt: string
  completedAt: string
  status: 'UPDATED' | 'UNCHANGED' | 'FAILED'
  discoveredCount: number
  addedArticleIds: string[]
  removedArticleIds: string[]
  pendingRemovalArticleIds: string[]
  classifiedArticleIds: string[]
  message: string
}

export interface CuratorState {
  schemaVersion: 1
  sourceCollection: typeof APPROVED_MEDIUM_LIST_URL
  refreshedAt: string
  articles: CuratedArticle[]
  pendingRemoval?: PendingRemovalObservation
  lastRun?: CuratorRunSummary
}

export interface MediumCatalogSource {
  read(): Promise<DiscoveredMediumArticle[]>
}

export interface ClassificationInput {
  sourceId: string
  canonicalTitle: string
  excerpt?: string
}

export interface ClassificationResult extends ArticleClassification {
  sourceId: string
}

export interface ArticleClassifier {
  classify(articles: readonly ClassificationInput[]): Promise<ClassificationResult[]>
}

export interface CuratorStore {
  loadState(): Promise<CuratorState>
  saveState(state: CuratorState): Promise<void>
  appendRunLog(run: CuratorRunSummary): Promise<void>
}

export interface CuratorLogger {
  info(message: string, details?: Record<string, unknown>): void
  warn(message: string, details?: Record<string, unknown>): void
  error(message: string, details?: Record<string, unknown>): void
}
