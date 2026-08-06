import { describe, expect, it } from 'vitest'
import {
  FixtureMediumCatalogSource,
  MediumProfileRssReader,
  hasRequiredPublishTag,
  mediumPostIdFromUrl,
  normalizeMediumUrl,
  normalizeTagSlug,
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
      tags: ['AI Philosophy'],
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
      tags: ['AI Philosophy'],
    }]).read()).rejects.toThrow('Unexpected Medium author')
  })

  it('matches the required publish tag across slug and display spellings', () => {
    expect(normalizeTagSlug('AI Philosophy')).toBe('ai-philosophy')
    expect(hasRequiredPublishTag(['ai-philosophy'])).toBe(true)
    expect(hasRequiredPublishTag(['AI  Philosophy'])).toBe(true)
    expect(hasRequiredPublishTag(['Agents', 'SDLC'])).toBe(false)
    expect(hasRequiredPublishTag([])).toBe(false)
  })

  it('reads tags from RSS categories', async () => {
    const feed = `<?xml version="1.0" encoding="UTF-8"?>
      <rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/">
        <channel>
          <title>Stories by Pablo Elustondo on Medium</title>
          <item>
            <title><![CDATA[Tagged story]]></title>
            <link>https://medium.com/@pabloelustondo/tagged-story-aabbccddeeff?source=rss</link>
            <category><![CDATA[AI Philosophy]]></category>
            <category><![CDATA[Agents]]></category>
            <dc:creator><![CDATA[Pablo Elustondo]]></dc:creator>
            <pubDate>Mon, 03 Aug 2026 12:00:00 GMT</pubDate>
            <content:encoded><![CDATA[<p>Body</p>]]></content:encoded>
          </item>
          <item>
            <title><![CDATA[Untagged story]]></title>
            <link>https://medium.com/@pabloelustondo/untagged-story-112233445566?source=rss</link>
            <dc:creator><![CDATA[Pablo Elustondo]]></dc:creator>
            <pubDate>Sun, 02 Aug 2026 12:00:00 GMT</pubDate>
            <content:encoded><![CDATA[<p>Body</p>]]></content:encoded>
          </item>
        </channel>
      </rss>`
    const reader = new MediumProfileRssReader(
      'https://medium.com/feed/@pabloelustondo',
      async () => new Response(feed, { status: 200 }),
    )

    const articles = await reader.read()
    expect(articles).toHaveLength(2)
    expect(articles[0]?.tags).toEqual(['AI Philosophy', 'Agents'])
    expect(hasRequiredPublishTag(articles[0]?.tags ?? [])).toBe(true)
    expect(articles[1]?.tags).toEqual([])
    expect(hasRequiredPublishTag(articles[1]?.tags ?? [])).toBe(false)
  })
})
