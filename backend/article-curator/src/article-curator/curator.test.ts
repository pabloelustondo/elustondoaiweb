import { describe, expect, it } from 'vitest'
import { cloneBootstrapCuratorState } from './bootstrap-state.js'
import {
  ArticleCurator,
} from './curator.js'
import { DeterministicFixtureClassifier } from './langchain-classifier.js'
import {
  FailingMediumCatalogSource,
  FixtureMediumCatalogSource,
} from './medium-source.js'
import type {
  CuratorLogger,
  CuratorRunSummary,
  CuratorState,
  CuratorStore,
  DiscoveredMediumArticle,
} from './contracts.js'
import { mediumListWithoutThreeAmigos } from '../local-fixtures.js'

class MemoryStore implements CuratorStore {
  state = cloneBootstrapCuratorState()
  audits: CuratorRunSummary[] = []
  failStateSave = false
  failRequiredRunRecord = false
  failAudit = false

  async loadState(): Promise<CuratorState> {
    return structuredClone(this.state)
  }

  async commitState(state: CuratorState, requiredRun: CuratorRunSummary): Promise<void> {
    if (this.failStateSave) throw new Error('Simulated state-save failure.')
    if (this.failRequiredRunRecord) throw new Error('Simulated required run-record failure.')
    this.state = structuredClone({ ...state, lastRun: requiredRun })
  }

  async appendAuditLog(run: CuratorRunSummary): Promise<void> {
    if (this.failAudit) throw new Error('Simulated optional audit failure.')
    this.audits.push(structuredClone(run))
  }
}

const quietLogger: CuratorLogger = {
  info: () => undefined,
  warn: () => undefined,
  error: () => undefined,
}

function asDiscovered(state: CuratorState): DiscoveredMediumArticle[] {
  return state.articles.map((article) => ({
    canonicalTitle: article.canonicalTitle,
    canonicalUrl: article.canonicalUrl,
    author: article.author,
    publishedAt: article.publishedAt,
    ...(article.excerpt ? { excerpt: article.excerpt } : {}),
  }))
}

describe('ArticleCurator', () => {
  it('requires two consecutive observations before applying a removal', async () => {
    const store = new MemoryStore()
    const curator = new ArticleCurator(
      new FixtureMediumCatalogSource(mediumListWithoutThreeAmigos),
      new DeterministicFixtureClassifier(),
      store,
      quietLogger,
    )

    const first = await curator.run()
    expect(first.pendingRemovalArticleIds).toEqual(['three-amigos-agent-architecture'])
    expect(store.state.articles).toHaveLength(5)

    const second = await curator.run()
    expect(second.removedArticleIds).toEqual(['three-amigos-agent-architecture'])
    expect(store.state.articles).toHaveLength(4)
    expect(store.state.articles.map((article) => article.sourceId)).not.toContain('three-amigos-agent-architecture')
  })

  it('adds and classifies a newly discovered article using only approved pillars', async () => {
    const store = new MemoryStore()
    const source = new FixtureMediumCatalogSource([
      ...asDiscovered(store.state),
      {
        canonicalTitle: 'Specification-Driven AI-Assisted Engineering in SDLC²',
        canonicalUrl: 'https://medium.com/@pabloelustondo/specification-driven-ai-assisted-engineering-in-sdlc2-aabbccddeeff',
        author: 'Pablo Elustondo',
        publishedAt: '2026-08-03',
      },
    ])
    const curator = new ArticleCurator(
      source,
      new DeterministicFixtureClassifier(),
      store,
      quietLogger,
    )

    const result = await curator.run()
    expect(result.addedArticleIds).toEqual(['specification-driven-ai-assisted-engineering-in-sdlc2-aabbccddeeff'])
    expect(result.classifiedArticleIds).toEqual(['specification-driven-ai-assisted-engineering-in-sdlc2-aabbccddeeff'])
    const article = store.state.articles.find((candidate) => candidate.mediumPostId === 'aabbccddeeff')
    expect(article?.classification.pillars).toEqual(['SDLC²'])
    expect(article?.classification.origin).toBe('LANGCHAIN_GEMINI')
  })

  it('preserves a Pablo-owned editorial override when source metadata changes', async () => {
    const store = new MemoryStore()
    const discovered = asDiscovered(store.state)
    const target = discovered.find((article) => article.canonicalUrl.includes('d0cbb412315c'))
    if (!target) throw new Error('Expected approved article fixture.')
    target.canonicalTitle = `${target.canonicalTitle} — Revised`
    const curator = new ArticleCurator(
      new FixtureMediumCatalogSource(discovered),
      new DeterministicFixtureClassifier(),
      store,
      quietLogger,
    )

    const result = await curator.run()
    expect(result.classifiedArticleIds).not.toContain('domain-analysis-responsibility-driven-design')
    const article = store.state.articles.find((candidate) => candidate.sourceId === 'domain-analysis-responsibility-driven-design')
    expect(article?.classification.origin).toBe('EDITORIAL_OVERRIDE')
    expect(article?.classification.pillars).toEqual(['SDLC²'])
  })

  it('preserves the last-known-good state when source discovery fails', async () => {
    const store = new MemoryStore()
    const before = structuredClone(store.state)
    const curator = new ArticleCurator(
      new FailingMediumCatalogSource(),
      new DeterministicFixtureClassifier(),
      store,
      quietLogger,
    )

    await expect(curator.run()).rejects.toThrow('Simulated Medium source failure')
    expect(store.state).toEqual(before)
    expect(store.audits.at(-1)?.status).toBe('FAILED')
  })

  it('derives distinct stable identities for different posts with the same slug', async () => {
    const store = new MemoryStore()
    const source = new FixtureMediumCatalogSource([
      ...asDiscovered(store.state),
      {
        canonicalTitle: 'Shared slug one',
        canonicalUrl: 'https://medium.com/@pabloelustondo/shared-slug-aabbccddeeff',
        author: 'Pablo Elustondo',
        publishedAt: '2026-08-03',
      },
      {
        canonicalTitle: 'Shared slug two',
        canonicalUrl: 'https://medium.com/@pabloelustondo/shared-slug-112233445566',
        author: 'Pablo Elustondo',
        publishedAt: '2026-08-04',
      },
    ])
    const curator = new ArticleCurator(source, new DeterministicFixtureClassifier(), store, quietLogger)

    await curator.run()
    expect(store.state.articles.filter((article) => article.sourceId.startsWith('shared-slug-')).map((article) => article.sourceId)).toEqual([
      'shared-slug-112233445566',
      'shared-slug-aabbccddeeff',
    ])
  })

  it('rejects a normalized source identifier collision before classification or persistence', async () => {
    const store = new MemoryStore()
    const existing = store.state.articles.at(0)
    if (!existing) throw new Error('Expected bootstrap article fixture.')
    existing.sourceId = 'shared-slug-aabbccddeeff'
    const before = structuredClone(store.state)
    const source = new FixtureMediumCatalogSource([
      ...asDiscovered(store.state),
      {
        canonicalTitle: 'Shared slug collision',
        canonicalUrl: 'https://medium.com/@pabloelustondo/shared-slug-aabbccddeeff',
        author: 'Pablo Elustondo',
        publishedAt: '2026-08-04',
      },
    ])
    const curator = new ArticleCurator(source, new DeterministicFixtureClassifier(), store, quietLogger)

    await expect(curator.run()).rejects.toThrow('Duplicate normalized source identifier')
    expect(store.state).toEqual(before)
  })

  it.each([
    ['state save', 'failStateSave'],
    ['required run record', 'failRequiredRunRecord'],
  ] as const)('preserves the prior state when the required %s commit fails', async (_label, failure) => {
    const store = new MemoryStore()
    store[failure] = true
    const before = structuredClone(store.state)
    const curator = new ArticleCurator(
      new FixtureMediumCatalogSource(mediumListWithoutThreeAmigos),
      new DeterministicFixtureClassifier(),
      store,
      quietLogger,
    )

    await expect(curator.run()).rejects.toThrow('Simulated')
    expect(store.state).toEqual(before)
    expect(store.audits.at(-1)?.status).toBe('FAILED')
  })

  it('treats the secondary audit sink as best-effort after the required commit succeeds', async () => {
    const store = new MemoryStore()
    store.failAudit = true
    const warnings: string[] = []
    const curator = new ArticleCurator(
      new FixtureMediumCatalogSource(mediumListWithoutThreeAmigos),
      new DeterministicFixtureClassifier(),
      store,
      { ...quietLogger, warn: (message) => warnings.push(message) },
    )

    const result = await curator.run()
    expect(result.status).toBe('UPDATED')
    expect(store.state.lastRun).toEqual(result)
    expect(store.state.pendingRemoval?.articleIds).toEqual(['three-amigos-agent-architecture'])
    expect(warnings).toEqual(['Article curator audit log could not be appended.'])
  })
})
