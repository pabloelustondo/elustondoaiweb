export type PublicationState = 'PUBLIC'
export type ProjectDisclosure = 'PUBLIC_REPOSITORY' | 'PUBLIC_SUMMARY_ONLY' | 'PRIVATE'

export interface ArticleRecord {
  id: string
  title: string
  summary?: string
  publishedLabel: string
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
  canonicalSource: 'docs/SDLC2.md'
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

export const articles: readonly ArticleRecord[] = [
  {
    id: 'three-amigos-agent-architecture',
    title: 'The Three Amigos Agent Architecture',
    summary: 'Why I use GPT, Claude, and Gemini as different cognitive agents and why context changes everything.',
    publishedLabel: 'June 25, 2026',
    url: 'https://medium.com/@pabloelustondo/the-three-amigos-agent-architecture-9b65d9344cf9',
    source: 'MEDIUM_ELUSTONDO_AI_LIST',
    publicationState: 'PUBLIC',
  },
  {
    id: 'domain-analysis-responsibility-driven-design',
    title: 'Domain Analysis & Wirfs-Brock’s Responsibility-Driven Design for Agentic AI',
    summary: 'From domain language to responsibilities, collaborators, and Agent-Oriented Design.',
    publishedLabel: 'July 15, 2026',
    url: 'https://medium.com/@pabloelustondo/domain-analysis-wirfs-brocks-responsibility-driven-design-for-agentic-ai-d0cbb412315c',
    source: 'MEDIUM_ELUSTONDO_AI_LIST',
    publicationState: 'PUBLIC',
  },
  {
    id: 'practical-local-ai-2026-part-one',
    title: 'The Rise of Practical Local AI in 2026 Part I: Models, Runtimes, and the Capability Cascade',
    summary: 'Use the strongest useful intelligence during development — and the minimum sufficient intelligence during execution.',
    publishedLabel: 'July 24, 2026',
    url: 'https://medium.com/@pabloelustondo/the-rise-of-practical-local-ai-in-2026-part-i-models-runtimes-and-the-capability-cascade-ca7e94cdb449',
    source: 'MEDIUM_ELUSTONDO_AI_LIST',
    publicationState: 'PUBLIC',
  },
  {
    id: 'solid-in-the-ai-era',
    title: 'SOLID in the AI Era: Same Principles, New Design Units',
    publishedLabel: 'July 5, 2026',
    url: 'https://medium.com/@pabloelustondo/solid-2-0-rethinking-architecture-best-practice-for-the-agentic-era-31f8d7aa9beb',
    source: 'MEDIUM_ELUSTONDO_AI_LIST',
    publicationState: 'PUBLIC',
  },
  {
    id: 'ai-assisted-legacy-fx-payment-system',
    title: 'An AI-Assisted Strategy for a Legacy FX Payment System: A Rotman Capstone Project',
    summary: 'Originally submitted in October 2025 for the Generative AI for Business program at the University of Toronto’s Rotman School of Management.',
    publishedLabel: 'August 1, 2026',
    url: 'https://medium.com/@pabloelustondo/an-ai-assisted-strategy-for-a-legacy-fx-payment-system-a-rotman-capstone-project-74d10ab995f6',
    source: 'MEDIUM_ELUSTONDO_AI_LIST',
    publicationState: 'PUBLIC',
  },
]

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
    canonicalSource: 'docs/SDLC2.md',
    publicationState: 'PUBLIC',
  },
]

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
