import { articleSummaries } from './articles/articleEditorialMetadata'
import { approvedArticleSnapshot } from './articles/approvedArticleSnapshot'

export type PublicationState = 'PUBLIC'
export type ProjectDisclosure = 'PUBLIC_REPOSITORY' | 'PUBLIC_SUMMARY_ONLY' | 'PRIVATE'

export interface ArticleRecord {
  id: string
  title: string
  summary?: string
  publishedLabel: string
  publishedAt: string
  author: string
  url: string
  source: 'MEDIUM_ELUSTONDO_AI_LIST'
  publicationState: PublicationState
}

export interface ProjectRecord {
  id: string
  name: string
  summary: string
  disclosure: ProjectDisclosure
  repositoryUrl?: string
}

export interface MethodRecord {
  id: string
  name: string
  summary: string
  canonicalSource: 'docs/04_SDLC2/SDLC2.md'
  publicationState: PublicationState
}

export interface PersonRecord {
  id: string
  name: string
  linkedInUrl: string
  publicationState: PublicationState
}

export const company = {
  legalName: 'Elustondo Systems Consulting Inc.',
  publicName: 'Elustondo.ai',
  location: 'Toronto, Canada',
  email: 'pablo@elustondo.ai',
} as const

const publicationDate = new Intl.DateTimeFormat('en-US', {
  year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC',
})
const sprintTwoArticleOrder = [
  'domain-analysis-responsibility-driven-design',
  'practical-local-ai-2026-part-one',
  'solid-in-the-ai-era',
  'ai-assisted-legacy-fx-payment-system',
]
const sprintTwoArticlePriority = new Map(
  sprintTwoArticleOrder.map((articleId, index) => [articleId, index]),
)

export function compareReviewedArticlePriority(
  left: Pick<ArticleRecord, 'id'>,
  right: Pick<ArticleRecord, 'id'>,
) {
  const leftPriority = sprintTwoArticlePriority.get(left.id)
  const rightPriority = sprintTwoArticlePriority.get(right.id)
  if (leftPriority !== undefined && rightPriority !== undefined) return leftPriority - rightPriority
  if (leftPriority !== undefined) return -1
  if (rightPriority !== undefined) return 1
  return left.id.localeCompare(right.id)
}

export const articles: readonly ArticleRecord[] = approvedArticleSnapshot.articles
  .map((article) => ({
    id: article.sourceId,
    title: article.canonicalTitle,
    summary: articleSummaries[article.sourceId],
    publishedLabel: publicationDate.format(new Date(article.publishedAt)),
    publishedAt: article.publishedAt,
    author: article.author,
    url: article.canonicalUrl,
    source: 'MEDIUM_ELUSTONDO_AI_LIST' as const,
    publicationState: 'PUBLIC' as const,
  }))
  .sort(compareReviewedArticlePriority)

export function isProjectPublishable(project: ProjectRecord) {
  if (project.disclosure === 'PRIVATE') return false
  if (project.disclosure === 'PUBLIC_REPOSITORY') {
    return project.repositoryUrl?.startsWith('https://github.com/') === true
  }
  return !project.repositoryUrl
}

const projectRecords: readonly ProjectRecord[] = [
  {
    id: 'elustondo-ai',
    name: 'Elustondo.ai',
    summary: 'The public repository behind an evolving intelligent application and portal for understanding our team, services, experience, methods, curated knowledge, advanced agent-assisted interfaces, and selected projects.',
    disclosure: 'PUBLIC_REPOSITORY',
    repositoryUrl: 'https://github.com/pabloelustondo/elustondoaiweb',
  },
]

export const projects = projectRecords.filter(isProjectPublishable)

export const methods: readonly MethodRecord[] = [
  {
    id: 'sdlc2',
    name: 'SDLC²',
    summary: 'A knowledge-centred, specification-driven, evidence-driven twelve-step methodology for AI-assisted software engineering, with pervasive AI assistance and continuing human responsibility for intent, judgment, authorization, accountability, and interpretation of evidence.',
    canonicalSource: 'docs/04_SDLC2/SDLC2.md',
    publicationState: 'PUBLIC',
  },
]

export const asdgIntroduction = {
  title: 'Introducing ASDG, the Agentic Software Development Governance Project',
  summary: 'Pablo Elustondo introduces the motivation and vision behind ASDG. It brings together agile delivery, living specifications, and teams of specialized AI agents that collaborate under human direction.',
  videoId: 'yb4ggoYQrtw',
  playlistUrl: 'https://www.youtube.com/playlist?list=PLQ5UBReAns0Q',
  repositoryUrl: 'https://github.com/Elustondo-ai/asdg',
} as const

export const people: readonly PersonRecord[] = [
  {
    id: 'williams-martinez',
    name: 'Williams Martinez',
    linkedInUrl: 'https://www.linkedin.com/in/williams-martinez-0bbb201/',
    publicationState: 'PUBLIC',
  },
  {
    id: 'rodrigo-elustondo',
    name: 'Rodrigo Elustondo',
    linkedInUrl: 'https://www.linkedin.com/in/rodrigo-elustondo/',
    publicationState: 'PUBLIC',
  },
  {
    id: 'santiago-elustondo',
    name: 'Santiago Elustondo',
    linkedInUrl: 'https://www.linkedin.com/in/santiago-elustondo/',
    publicationState: 'PUBLIC',
  },
  {
    id: 'pablo-elustondo',
    name: 'Pablo Elustondo',
    linkedInUrl: 'https://www.linkedin.com/in/pabloelustondo/',
    publicationState: 'PUBLIC',
  },
]
