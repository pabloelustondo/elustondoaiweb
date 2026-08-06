import { XMLParser } from 'fast-xml-parser'
import { z } from 'zod'
import {
  APPROVED_MEDIUM_PROFILE_FEED_URL,
  REQUIRED_PUBLISH_TAG,
  type DiscoveredMediumArticle,
  type MediumCatalogSource,
} from './contracts.js'

const rssItemSchema = z.record(z.string(), z.unknown())
const rssSchema = z.object({
  rss: z.object({
    channel: z.object({
      item: z.union([rssItemSchema, z.array(rssItemSchema)]),
    }),
  }),
})

export class MediumSourceUnavailableError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'MediumSourceUnavailableError'
  }
}

function textValue(value: unknown): string {
  if (typeof value === 'string') return value.trim()
  if (typeof value === 'number') return String(value)
  if (value && typeof value === 'object' && '#text' in value) {
    return textValue((value as { '#text': unknown })['#text'])
  }
  return ''
}

function stripHtml(value: string): string {
  return value
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/\s+/g, ' ')
    .trim()
}

// Medium exposes tags as feed categories; slugs and display names must compare equal.
export function normalizeTagSlug(value: string): string {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

export function hasRequiredPublishTag(tags: readonly string[]): boolean {
  const required = normalizeTagSlug(REQUIRED_PUBLISH_TAG)
  return tags.some((tag) => normalizeTagSlug(tag) === required)
}

function normalizeTags(tags: readonly unknown[]): string[] {
  const seen = new Set<string>()
  const normalized: string[] = []
  for (const tag of tags) {
    const text = textValue(tag)
    const slug = normalizeTagSlug(text)
    if (!slug || seen.has(slug)) continue
    seen.add(slug)
    normalized.push(text)
  }
  return normalized
}

export function normalizeMediumUrl(value: string): string {
  const url = new URL(value)
  const isMediumHost = url.hostname === 'medium.com' || url.hostname.endsWith('.medium.com')
  if (url.protocol !== 'https:' || !isMediumHost) {
    throw new MediumSourceUnavailableError(`Medium returned a non-Medium canonical URL: ${value}`)
  }
  url.hostname = 'medium.com'
  url.search = ''
  url.hash = ''
  return url.toString().replace(/\/$/, '')
}

export function mediumPostIdFromUrl(value: string): string {
  const url = normalizeMediumUrl(value)
  const match = url.match(/-([0-9a-f]{12})(?:$|\/)/i)
  if (!match?.[1]) {
    throw new MediumSourceUnavailableError(`Medium article URL has no stable post identifier: ${value}`)
  }
  return match[1].toLowerCase()
}

function validateDiscoveredArticles(articles: readonly DiscoveredMediumArticle[]): DiscoveredMediumArticle[] {
  if (articles.length === 0) {
    throw new MediumSourceUnavailableError('The Medium profile feed returned no articles; the last-known-good catalog is preserved.')
  }

  const seenPostIds = new Set<string>()
  return articles.map((article) => {
    const canonicalUrl = normalizeMediumUrl(article.canonicalUrl)
    const postId = mediumPostIdFromUrl(canonicalUrl)
    if (seenPostIds.has(postId)) {
      throw new MediumSourceUnavailableError(`The Medium profile feed returned duplicate post ${postId}.`)
    }
    seenPostIds.add(postId)

    if (article.author.trim() !== 'Pablo Elustondo') {
      throw new MediumSourceUnavailableError(`Unexpected Medium author for post ${postId}.`)
    }
    if (Number.isNaN(Date.parse(article.publishedAt))) {
      throw new MediumSourceUnavailableError(`Invalid publication time for Medium post ${postId}.`)
    }

    return {
      canonicalTitle: article.canonicalTitle.trim(),
      canonicalUrl,
      author: article.author.trim(),
      publishedAt: new Date(article.publishedAt).toISOString(),
      tags: normalizeTags(article.tags),
      ...(article.excerpt?.trim() ? { excerpt: stripHtml(article.excerpt).slice(0, 1000) } : {}),
    }
  })
}

export class MediumProfileRssReader implements MediumCatalogSource {
  constructor(
    private readonly feedUrl = APPROVED_MEDIUM_PROFILE_FEED_URL,
    private readonly fetcher: typeof fetch = fetch,
  ) {}

  async read(): Promise<DiscoveredMediumArticle[]> {
    const response = await this.fetcher(this.feedUrl, {
      headers: {
        accept: 'application/rss+xml, application/xml;q=0.9, text/xml;q=0.8',
        'user-agent': 'Elustondo.ai Article Curator/0.1 (+https://elustondo.ai)',
      },
      signal: AbortSignal.timeout(20_000),
    })
    if (!response.ok) {
      throw new MediumSourceUnavailableError(`Medium profile RSS returned HTTP ${response.status}.`)
    }

    const parsed = rssSchema.parse(new XMLParser({ ignoreAttributes: false }).parse(await response.text()))
    const rawItems = Array.isArray(parsed.rss.channel.item)
      ? parsed.rss.channel.item
      : [parsed.rss.channel.item]

    const articles = rawItems.map((item): DiscoveredMediumArticle => ({
      canonicalTitle: textValue(item.title),
      canonicalUrl: textValue(item.link),
      author: textValue(item['dc:creator']),
      publishedAt: textValue(item.pubDate),
      tags: normalizeTags(Array.isArray(item.category) ? item.category : item.category !== undefined ? [item.category] : []),
      excerpt: stripHtml(textValue(item['content:encoded'])).slice(0, 1000),
    }))

    return validateDiscoveredArticles(articles)
  }
}

export class FixtureMediumCatalogSource implements MediumCatalogSource {
  constructor(private readonly articles: readonly DiscoveredMediumArticle[]) {}

  async read(): Promise<DiscoveredMediumArticle[]> {
    return validateDiscoveredArticles(structuredClone(this.articles))
  }
}

export class FailingMediumCatalogSource implements MediumCatalogSource {
  constructor(private readonly message = 'Simulated Medium source failure.') {}

  async read(): Promise<DiscoveredMediumArticle[]> {
    throw new MediumSourceUnavailableError(this.message)
  }
}
