import { describe, expect, it } from 'vitest'
import { rankLatest, rankPillarArticles, relatedArticles, type ClassifiedArticle } from './articleRanker'
import { APPROVED_MEDIUM_LIST_URL } from './articleSourceSnapshot'

function article(overrides: Partial<ClassifiedArticle> & Pick<ClassifiedArticle, 'sourceId' | 'publishedAt'>): ClassifiedArticle {
  return {
    canonicalTitle: overrides.sourceId,
    canonicalUrl: `https://medium.com/@pabloelustondo/${overrides.sourceId}`,
    author: 'Pablo Elustondo',
    sourceCollection: APPROVED_MEDIUM_LIST_URL,
    pillars: ['SDLC²'],
    subjects: [],
    canonicalFor: [],
    featuredFor: [],
    editorialPriority: 0,
    classificationState: 'CLASSIFIED',
    provenance: 'EDITORIAL_OVERRIDE',
    rationale: 'Test fixture.',
    humanReviewState: 'APPROVED',
    reviewedAt: '2026-08-03T00:00:00.000Z',
    ...overrides,
  }
}

describe('ArticleRanker', () => {
  it('orders Latest strictly newest first with a stable id tie-break', () => {
    const ranked = rankLatest([
      article({ sourceId: 'b', publishedAt: '2026-08-01T00:00:00.000Z' }),
      article({ sourceId: 'c', publishedAt: '2026-08-02T00:00:00.000Z' }),
      article({ sourceId: 'a', publishedAt: '2026-08-01T00:00:00.000Z', canonicalFor: ['SDLC²'] }),
    ])

    expect(ranked.map((item) => item.sourceId)).toEqual(['c', 'a', 'b'])
  })

  it('ranks canonical, featured, explicit priority, recency, and ties transparently inside a pillar', () => {
    const ranked = rankPillarArticles([
      article({ sourceId: 'ordinary', publishedAt: '2026-08-04T00:00:00.000Z' }),
      article({ sourceId: 'featured', publishedAt: '2026-08-01T00:00:00.000Z', featuredFor: ['SDLC²'] }),
      article({ sourceId: 'canonical', publishedAt: '2026-07-01T00:00:00.000Z', canonicalFor: ['SDLC²'] }),
      article({ sourceId: 'priority', publishedAt: '2026-08-03T00:00:00.000Z', editorialPriority: 3 }),
    ], 'SDLC²')

    expect(ranked.map((item) => item.article.sourceId)).toEqual(['canonical', 'featured', 'priority', 'ordinary'])
    expect(ranked[0].reasons).toContain('Canonical article for SDLC².')
    expect(ranked[1].reasons).toContain('Featured by editorial decision for SDLC².')
    expect(ranked[2].reasons).toContain('Editorial priority 3.')
    expect(ranked.every((item) => item.reasons.length > 0)).toBe(true)
  })

  it('explains related reading through shared approved pillars and subjects', () => {
    const origin = article({ sourceId: 'origin', publishedAt: '2026-08-03T00:00:00.000Z', subjects: ['agents'] })
    const related = relatedArticles(origin, [
      origin,
      article({ sourceId: 'shared-pillar', publishedAt: '2026-08-02T00:00:00.000Z' }),
      article({ sourceId: 'shared-subject', publishedAt: '2026-08-01T00:00:00.000Z', pillars: ['Architecture'], subjects: ['agents'] }),
      article({ sourceId: 'unrelated', publishedAt: '2026-08-04T00:00:00.000Z', pillars: ['Modernization'] }),
    ])

    expect(related.map((item) => item.article.sourceId)).toEqual(['shared-pillar', 'shared-subject'])
    expect(related[0].reasons[0]).toMatch(/shared pillar/i)
    expect(related[1].reasons[0]).toMatch(/shared subject/i)
  })
})
