import { describe, expect, it } from 'vitest'
import { approvedArticleSnapshot } from './approvedArticleSnapshot'
import {
  APPROVED_PILLARS,
  applyArticleTaxonomy,
  editorialTaxonomy,
  type ArticleEditorialOverride,
} from './articleTaxonomy'

describe('ArticleTaxonomy', () => {
  it('uses only the approved pillars and preserves approved seeded classifications', () => {
    expect(APPROVED_PILLARS).toEqual(['SDLC²', 'Architecture', 'Modernization'])
    const classified = applyArticleTaxonomy(approvedArticleSnapshot, editorialTaxonomy)

    expect(classified.find((article) => article.sourceId === 'domain-analysis-responsibility-driven-design')?.pillars).toEqual(['SDLC²'])
    expect(classified.find((article) => article.sourceId === 'solid-in-the-ai-era')?.pillars).toEqual(['SDLC²'])
    expect(classified.find((article) => article.sourceId === 'practical-local-ai-2026-part-one')?.pillars).toEqual(['Architecture'])
    expect(classified.find((article) => article.sourceId === 'ai-assisted-legacy-fx-payment-system')?.pillars).toEqual(['Modernization'])
  })

  it('keeps Three Amigos explicitly unclassified instead of guessing', () => {
    const classified = applyArticleTaxonomy(approvedArticleSnapshot, editorialTaxonomy)
    const article = classified.find((item) => item.sourceId === 'three-amigos-agent-architecture')

    expect(article?.pillars).toEqual([])
    expect(article?.classificationState).toBe('UNCLASSIFIED')
    expect(article?.provenance).toBe('EDITORIAL_OVERRIDE')
    expect(article?.rationale).toMatch(/not yet assigned/i)
  })

  it('supports multiple pillars and keeps editorial overrides separate from refreshed source metadata', () => {
    const override: ArticleEditorialOverride = {
      articleId: 'three-amigos-agent-architecture',
      pillars: ['SDLC²', 'Architecture'],
      subjects: ['multi-agent systems'],
      canonicalFor: [],
      featuredFor: ['Architecture'],
      editorialPriority: 2,
      provenance: 'EDITORIAL_OVERRIDE',
      rationale: 'Synthetic test override.',
      humanReviewState: 'APPROVED',
      reviewedAt: '2026-08-03T12:00:00.000Z',
    }
    const refreshed = {
      ...approvedArticleSnapshot,
      refreshedAt: '2026-08-04T12:00:00.000Z',
      articles: approvedArticleSnapshot.articles.map((article) => ({
        ...article,
        canonicalTitle: article.sourceId === override.articleId ? 'Refreshed canonical title' : article.canonicalTitle,
      })),
    }
    const classified = applyArticleTaxonomy(refreshed, [override])
    const article = classified.find((item) => item.sourceId === override.articleId)

    expect(article?.canonicalTitle).toBe('Refreshed canonical title')
    expect(article?.pillars).toEqual(['SDLC²', 'Architecture'])
    expect(article?.featuredFor).toEqual(['Architecture'])
    expect(article?.provenance).toBe('EDITORIAL_OVERRIDE')
  })
})
