import { describe, expect, it } from 'vitest'
import {
  APPROVED_MEDIUM_LIST_URL,
  normalizeArticleSource,
  type ArticleSourceSnapshot,
  type RawArticleSourceRecord,
} from './articleSourceSnapshot'

const previous: ArticleSourceSnapshot = {
  version: 1,
  sourceCollection: APPROVED_MEDIUM_LIST_URL,
  refreshedAt: '2026-08-02T00:00:00.000Z',
  articles: [
    {
      sourceId: 'article-one',
      canonicalTitle: 'Article one',
      canonicalUrl: 'https://medium.com/@pabloelustondo/article-one-123456789abc',
      author: 'Pablo Elustondo',
      publishedAt: '2026-08-01T12:00:00.000Z',
      sourceCollection: APPROVED_MEDIUM_LIST_URL,
    },
    {
      sourceId: 'article-two',
      canonicalTitle: 'Article two',
      canonicalUrl: 'https://medium.com/@pabloelustondo/article-two-abcdef123456',
      author: 'Pablo Elustondo',
      publishedAt: '2026-07-01T12:00:00.000Z',
      sourceCollection: APPROVED_MEDIUM_LIST_URL,
    },
  ],
}

const currentRecords = (): RawArticleSourceRecord[] => previous.articles.map((article) => ({ ...article }))

describe('ArticleSourceSnapshot', () => {
  it('normalizes canonical metadata inside the approved Medium-list boundary', () => {
    const result = normalizeArticleSource(currentRecords(), previous, '2026-08-03T12:00:00.000Z')

    expect(result.ok).toBe(true)
    if (!result.ok) return
    expect(result.candidate.articles[0]).toEqual(previous.articles[0])
    expect(result.candidate.refreshedAt).toBe('2026-08-03T12:00:00.000Z')
    expect(result.diff).toEqual({ added: [], removed: [], changed: [] })
    expect(result.publicationDecision).toBe('UNCHANGED')
  })

  it('fails closed for duplicate, malformed, or outside-list records and preserves the last good snapshot', () => {
    const duplicate = currentRecords()[0]
    const invalidRecords: RawArticleSourceRecord[] = [
      duplicate,
      { ...duplicate },
      { ...currentRecords()[1], canonicalUrl: 'not-a-url' },
      { ...currentRecords()[1], sourceId: 'outside', sourceCollection: 'https://medium.com/some-other-list' },
    ]
    const result = normalizeArticleSource(invalidRecords, previous, '2026-08-03T12:00:00.000Z')

    expect(result.ok).toBe(false)
    if (result.ok) return
    expect(result.snapshot).toBe(previous)
    expect(result.issues.map((issue) => issue.code)).toEqual(expect.arrayContaining([
      'DUPLICATE_SOURCE_ID',
      'MALFORMED_URL',
      'OUTSIDE_APPROVED_COLLECTION',
    ]))
  })

  it('reports added, missing, changed, and stale-title metadata without publishing it automatically', () => {
    const records: RawArticleSourceRecord[] = [
      { ...currentRecords()[0], canonicalTitle: 'Article one — corrected title' },
      {
        sourceId: 'article-three',
        canonicalTitle: 'Article three',
        canonicalUrl: 'https://medium.com/@pabloelustondo/article-three-111111111111',
        author: 'Pablo Elustondo',
        publishedAt: '2026-08-03T12:00:00.000Z',
        sourceCollection: APPROVED_MEDIUM_LIST_URL,
      },
    ]
    const result = normalizeArticleSource(records, previous, '2026-08-03T12:00:00.000Z')

    expect(result.ok).toBe(true)
    if (!result.ok) return
    expect(result.diff.added).toEqual(['article-three'])
    expect(result.diff.removed).toEqual(['article-two'])
    expect(result.diff.changed).toEqual([
      { sourceId: 'article-one', fields: ['canonicalTitle'], staleTitle: true },
    ])
    expect(result.publicationDecision).toBe('REVIEW_REQUIRED')
  })
})
