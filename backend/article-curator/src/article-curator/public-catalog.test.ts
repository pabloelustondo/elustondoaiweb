import { describe, expect, it } from 'vitest'
import { cloneBootstrapCuratorState } from './bootstrap-state.js'
import { toPublicCatalog } from './public-catalog.js'

describe('toPublicCatalog', () => {
  it('projects the curator state into the frontend-facing shape, newest first', () => {
    const state = cloneBootstrapCuratorState()
    const catalog = toPublicCatalog(state)

    expect(catalog.version).toBe(1)
    expect(catalog.refreshedAt).toBe(state.refreshedAt)
    expect(catalog.articles).toHaveLength(state.articles.length)
    const dates = catalog.articles.map((article) => Date.parse(article.publishedAt))
    expect(dates).toEqual([...dates].sort((left, right) => right - left))

    const first = catalog.articles[0]
    expect(first).toMatchObject({
      sourceId: 'ai-assisted-legacy-fx-payment-system',
      author: 'Pablo Elustondo',
      pillars: ['Modernization'],
      classificationState: 'CLASSIFIED',
    })
    expect(first?.url).toContain('https://medium.com/@pabloelustondo/')
    expect(first?.tags).toContain('AI Philosophy')
  })

  it('marks articles without pillars as unclassified', () => {
    const catalog = toPublicCatalog(cloneBootstrapCuratorState())
    const threeAmigos = catalog.articles.find((article) => article.sourceId === 'three-amigos-agent-architecture')
    expect(threeAmigos?.classificationState).toBe('UNCLASSIFIED')
    expect(threeAmigos?.pillars).toEqual([])
  })
})
