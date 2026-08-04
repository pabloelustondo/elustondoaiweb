import { describe, expect, it } from 'vitest'
import {
  FixtureMediumCatalogSource,
  mediumPostIdFromUrl,
  normalizeMediumUrl,
} from './medium-source.js'

describe('Medium source validation', () => {
  it('normalizes Medium URLs and extracts the stable post identifier', () => {
    const url = normalizeMediumUrl('https://pabloelustondo.medium.com/example-title-aabbccddeeff?source=list')
    expect(url).toBe('https://medium.com/example-title-aabbccddeeff')
    expect(mediumPostIdFromUrl(url)).toBe('aabbccddeeff')
  })

  it('rejects an empty catalog and duplicate posts', async () => {
    await expect(new FixtureMediumCatalogSource([]).read()).rejects.toThrow('no articles')
    const article = {
      canonicalTitle: 'Article',
      canonicalUrl: 'https://medium.com/@pabloelustondo/article-aabbccddeeff',
      author: 'Pablo Elustondo',
      publishedAt: '2026-08-03',
    }
    await expect(new FixtureMediumCatalogSource([article, article]).read()).rejects.toThrow('duplicate post')
  })

  it('rejects non-Medium URLs and unexpected authors', async () => {
    expect(() => normalizeMediumUrl('https://example.com/article-aabbccddeeff')).toThrow('non-Medium')
    await expect(new FixtureMediumCatalogSource([{
      canonicalTitle: 'Article',
      canonicalUrl: 'https://medium.com/@pabloelustondo/article-aabbccddeeff',
      author: 'Someone Else',
      publishedAt: '2026-08-03',
    }]).read()).rejects.toThrow('Unexpected Medium author')
  })
})
