import { describe, expect, it } from 'vitest'
import { cloneBootstrapCuratorState } from './bootstrap-state.js'
import { parseCuratorState } from './state-schema.js'

describe('persisted CuratorState runtime schema', () => {
  it('accepts the bounded bootstrap state', () => {
    expect(parseCuratorState(cloneBootstrapCuratorState())).toEqual(cloneBootstrapCuratorState())
  })

  it.each([
    ['wrong author', () => {
      const state = cloneBootstrapCuratorState()
      return {
        ...state,
        articles: state.articles.map((article, index) => (
          index === 0 ? { ...article, author: 'Someone Else' } : article
        )),
      }
    }],
    ['duplicate source identity', () => {
      const state = cloneBootstrapCuratorState()
      const first = state.articles.at(0)
      if (!first) throw new Error('Expected bootstrap article fixture.')
      return {
        ...state,
        articles: state.articles.map((article, index) => (
          index === 1 ? { ...article, sourceId: first.sourceId } : article
        )),
      }
    }],
    ['unapproved pillar', () => {
      const state = cloneBootstrapCuratorState()
      return {
        ...state,
        articles: state.articles.map((article, index) => (
          index === 0
            ? { ...article, classification: { ...article.classification, pillars: ['Marketing'] } }
            : article
        )),
      }
    }],
    ['unknown pending removal', () => ({
      ...cloneBootstrapCuratorState(),
      pendingRemoval: {
        articleIds: ['unknown-article'],
        confirmations: 1,
        firstObservedAt: '2026-08-05T12:00:00.000Z',
        lastObservedAt: '2026-08-05T12:00:00.000Z',
      },
    })],
    ['unbounded run summary', () => ({
      ...cloneBootstrapCuratorState(),
      lastRun: {
        runId: 'run-003',
        startedAt: '2026-08-05T12:00:00.000Z',
        completedAt: '2026-08-05T12:00:01.000Z',
        status: 'FAILED',
        discoveredCount: 0,
        addedArticleIds: [],
        removedArticleIds: [],
        pendingRemovalArticleIds: [],
        classifiedArticleIds: [],
        message: 'x'.repeat(1001),
      },
    })],
  ])('rejects %s', (_label, candidate) => {
    expect(() => parseCuratorState(candidate())).toThrow('failed runtime validation')
  })
})
