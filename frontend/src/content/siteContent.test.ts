import { describe, expect, it } from 'vitest'
import {
  articles,
  compareReviewedArticlePriority,
  isProjectPublishable,
  methods,
  people,
  projects,
  type ProjectRecord,
} from './siteContent'

describe('approved static content boundary', () => {
  it('contains exactly the approved Medium-list snapshot', () => {
    expect(articles).toHaveLength(4)
    expect(articles.every((article) => article.source === 'MEDIUM_ELUSTONDO_AI_LIST')).toBe(true)
    expect(articles.every((article) => article.url.startsWith('https://medium.com/@pabloelustondo/'))).toBe(true)
    expect(articles.slice(0, 3).map((article) => article.id)).toEqual([
      'domain-analysis-responsibility-driven-design',
      'practical-local-ai-2026-part-one',
      'solid-in-the-ai-era',
    ])
  })

  it('places unknown article identifiers after the reviewed Home order', () => {
    const ordered = [
      { id: 'newly-approved-article' },
      { id: 'practical-local-ai-2026-part-one' },
      { id: 'domain-analysis-responsibility-driven-design' },
      { id: 'solid-in-the-ai-era' },
      { id: 'another-new-article' },
    ].sort(compareReviewedArticlePriority)

    expect(ordered.map((article) => article.id)).toEqual([
      'domain-analysis-responsibility-driven-design',
      'practical-local-ai-2026-part-one',
      'solid-in-the-ai-era',
      'another-new-article',
      'newly-approved-article',
    ])
  })

  it('contains only the approved public GitHub project', () => {
    expect(projects.map((project) => project.name)).toEqual(['Elustondo.ai'])
    expect(projects.map((project) => project.repositoryUrl)).toEqual([
      'https://github.com/pabloelustondo/elustondoaiweb',
    ])
    expect(projects.every(isProjectPublishable)).toBe(true)
  })

  it('rejects private repository records from publication', () => {
    const privateRecord: ProjectRecord = {
      id: 'private-example',
      name: 'Private example',
      summary: 'Not approved for publication.',
      disclosure: 'PRIVATE',
      repositoryUrl: 'https://github.com/example/private',
    }
    expect(isProjectPublishable(privateRecord)).toBe(false)
  })

  it('contains SDLC² as the only approved method', () => {
    expect(methods.map((method) => method.name)).toEqual(['SDLC²'])
    expect(methods[0].canonicalSource).toBe('docs/04_SDLC2/SDLC2.md')
  })

  it('contains exactly the four approved people and LinkedIn destinations', () => {
    expect(people.map((person) => person.name)).toEqual([
      'Williams Martinez',
      'Rodrigo Elustondo',
      'Santiago Elustondo',
      'Pablo Elustondo',
    ])
    expect(people.every((person) => person.linkedInUrl.startsWith('https://www.linkedin.com/in/'))).toBe(true)
  })
})
