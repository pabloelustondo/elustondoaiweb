import { JsonOutputParser } from '@langchain/core/output_parsers'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import { ChatGoogle } from '@langchain/google/node'
import { XMLParser } from 'fast-xml-parser'
import { z } from 'zod'
import {
  APPROVED_MEDIUM_LIST_URL,
  APPROVED_MEDIUM_PROFILE_FEED_URL,
  type DiscoveredMediumArticle,
  type MediumCatalogSource,
} from './contracts.js'

const listDiscoverySchema = z.object({
  status: z.enum(['ok', 'unavailable']),
  reason: z.string().max(500).optional(),
  articles: z.array(z.object({
    canonicalTitle: z.string().min(1).max(500),
    canonicalUrl: z.url(),
    author: z.string().min(1).max(200),
    publishedAt: z.string().min(1).max(100),
    excerpt: z.string().max(1000).optional(),
  })).max(100),
})

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
    throw new MediumSourceUnavailableError('The approved Medium list returned no articles; the last-known-good catalog is preserved.')
  }

  const seenPostIds = new Set<string>()
  return articles.map((article) => {
    const canonicalUrl = normalizeMediumUrl(article.canonicalUrl)
    const postId = mediumPostIdFromUrl(canonicalUrl)
    if (seenPostIds.has(postId)) {
      throw new MediumSourceUnavailableError(`The approved Medium list returned duplicate post ${postId}.`)
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
      ...(article.excerpt?.trim() ? { excerpt: stripHtml(article.excerpt).slice(0, 1000) } : {}),
    }
  })
}

export class LangChainMediumListMembershipSource implements MediumCatalogSource {
  constructor(
    private readonly model: ChatGoogle,
    private readonly listUrl = APPROVED_MEDIUM_LIST_URL,
  ) {}

  async read(): Promise<DiscoveredMediumArticle[]> {
    const prompt = ChatPromptTemplate.fromMessages([
      [
        'system',
        [
          'You are the source-discovery step of the Elustondo.ai article curator.',
          'Use URL context to open exactly the supplied public Medium List.',
          'Return only articles that are visibly members of that List at this moment.',
          'Do not use memory, search results, recommendations, the author profile, or related stories as list membership evidence.',
          'Copy each title, canonical Medium URL, author, publication time, and visible subtitle or excerpt exactly when available.',
          'If the List cannot be read with confidence, return status unavailable and an empty articles array.',
          'Return JSON only with keys status, reason, and articles.',
        ].join(' '),
      ],
      ['human', 'Approved Medium List: {listUrl}'],
    ])

    const urlContextModel = this.model.bindTools([{ urlContext: {} }])
    const promptValue = await prompt.invoke({ listUrl: this.listUrl })
    const response = await urlContextModel.invoke(promptValue.toChatMessages())
    const parser = new JsonOutputParser<Record<string, unknown>>()
    const candidate = listDiscoverySchema.parse(await parser.invoke(response))

    if (candidate.status !== 'ok') {
      throw new MediumSourceUnavailableError(
        candidate.reason || 'Gemini URL context could not read the approved Medium list.',
      )
    }

    return validateDiscoveredArticles(candidate.articles)
  }
}

export class MediumProfileRssReader {
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
      excerpt: stripHtml(textValue(item['content:encoded'])).slice(0, 1000),
    }))

    return validateDiscoveredArticles(articles)
  }
}

export class RssValidatedMediumCatalogSource implements MediumCatalogSource {
  constructor(
    private readonly membershipSource: MediumCatalogSource,
    private readonly rssReader: MediumProfileRssReader,
  ) {}

  async read(): Promise<DiscoveredMediumArticle[]> {
    const [members, profileArticles] = await Promise.all([
      this.membershipSource.read(),
      this.rssReader.read(),
    ])
    const profileByPostId = new Map(
      profileArticles.map((article) => [mediumPostIdFromUrl(article.canonicalUrl), article]),
    )

    return validateDiscoveredArticles(members.map((member) => {
      const profileArticle = profileByPostId.get(mediumPostIdFromUrl(member.canonicalUrl))
      return profileArticle
        ? { ...member, ...profileArticle, canonicalUrl: member.canonicalUrl }
        : member
    }))
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
