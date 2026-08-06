import type { ArticleSourceSnapshot, NormalizedArticleRecord } from './articleSourceSnapshot'

export const APPROVED_PILLARS = ['SDLC²', 'Architecture', 'Modernization'] as const
export type ArticlePillar = (typeof APPROVED_PILLARS)[number]

export interface ArticleEditorialOverride {
  articleId: string
  pillars: ArticlePillar[]
  subjects: string[]
  canonicalFor: ArticlePillar[]
  featuredFor: ArticlePillar[]
  editorialPriority: number
  provenance: 'EDITORIAL_OVERRIDE'
  rationale: string
  humanReviewState: 'APPROVED'
  reviewedAt: string
}

export interface ClassifiedArticle extends NormalizedArticleRecord {
  pillars: ArticlePillar[]
  subjects: string[]
  canonicalFor: ArticlePillar[]
  featuredFor: ArticlePillar[]
  editorialPriority: number
  classificationState: 'CLASSIFIED' | 'UNCLASSIFIED'
  provenance: 'EDITORIAL_OVERRIDE' | 'NO_EDITORIAL_ASSIGNMENT' | 'AI_CLASSIFICATION'
  rationale: string
  humanReviewState: 'APPROVED' | 'NEEDS_REVIEW' | 'AI_CURATED'
  reviewedAt?: string
}

const reviewedAt = '2026-08-03T00:00:00.000Z'

export const editorialTaxonomy: readonly ArticleEditorialOverride[] = [
  {
    articleId: 'domain-analysis-responsibility-driven-design',
    pillars: ['SDLC²'], subjects: ['responsibility-driven design', 'agentic systems'], canonicalFor: [], featuredFor: [], editorialPriority: 0,
    provenance: 'EDITORIAL_OVERRIDE', rationale: 'Pablo approved Responsibility-Driven Design as SDLC² material.', humanReviewState: 'APPROVED', reviewedAt,
  },
  {
    articleId: 'solid-in-the-ai-era',
    pillars: ['SDLC²'], subjects: ['SOLID', 'agentic systems'], canonicalFor: [], featuredFor: [], editorialPriority: 0,
    provenance: 'EDITORIAL_OVERRIDE', rationale: 'Pablo approved SOLID as SDLC² material.', humanReviewState: 'APPROVED', reviewedAt,
  },
  {
    articleId: 'practical-local-ai-2026-part-one',
    pillars: ['Architecture'], subjects: ['local LLMs', 'AI runtimes'], canonicalFor: [], featuredFor: [], editorialPriority: 0,
    provenance: 'EDITORIAL_OVERRIDE', rationale: 'Pablo approved the practical local-LLM article for Architecture.', humanReviewState: 'APPROVED', reviewedAt,
  },
  {
    articleId: 'ai-assisted-legacy-fx-payment-system',
    pillars: ['Modernization'], subjects: ['legacy modernization', 'financial systems'], canonicalFor: [], featuredFor: [], editorialPriority: 0,
    provenance: 'EDITORIAL_OVERRIDE', rationale: 'Pablo approved the legacy FX payment-system article for Modernization.', humanReviewState: 'APPROVED', reviewedAt,
  },
]

export function applyArticleTaxonomy(
  snapshot: ArticleSourceSnapshot,
  overrides: readonly ArticleEditorialOverride[],
): ClassifiedArticle[] {
  const byArticleId = new Map(overrides.map((override) => [override.articleId, override]))
  return snapshot.articles.map((article) => {
    const override = byArticleId.get(article.sourceId)
    if (!override) {
      return {
        ...article,
        pillars: [], subjects: [], canonicalFor: [], featuredFor: [], editorialPriority: 0,
        classificationState: 'UNCLASSIFIED', provenance: 'NO_EDITORIAL_ASSIGNMENT',
        rationale: 'No approved editorial assignment exists yet.', humanReviewState: 'NEEDS_REVIEW',
      }
    }
    return {
      ...article,
      ...override,
      classificationState: override.pillars.length > 0 ? 'CLASSIFIED' : 'UNCLASSIFIED',
    }
  })
}
