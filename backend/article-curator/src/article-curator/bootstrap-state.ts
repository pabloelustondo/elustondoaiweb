import {
  APPROVED_MEDIUM_LIST_URL,
  type ArticleClassification,
  type CuratedArticle,
  type CuratorState,
} from './contracts.js'

const reviewedAt = '2026-08-03T00:00:00.000Z'

function approvedClassification(
  pillars: ArticleClassification['pillars'],
  subjects: string[],
  rationale: string,
): ArticleClassification {
  return {
    pillars,
    subjects,
    rationale,
    confidence: 1,
    origin: 'EDITORIAL_OVERRIDE',
    humanReviewState: 'APPROVED',
    reviewedAt,
  }
}

const articles: CuratedArticle[] = [
  {
    sourceId: 'ai-assisted-legacy-fx-payment-system',
    mediumPostId: '74d10ab995f6',
    canonicalTitle: 'An AI-Assisted Strategy for a Legacy FX Payment System: A Rotman Capstone Project',
    canonicalUrl: 'https://medium.com/@pabloelustondo/an-ai-assisted-strategy-for-a-legacy-fx-payment-system-a-rotman-capstone-project-74d10ab995f6',
    author: 'Pablo Elustondo',
    publishedAt: '2026-08-01',
    sourceCollection: APPROVED_MEDIUM_LIST_URL,
    classification: approvedClassification(
      ['Modernization'],
      ['legacy modernization', 'financial systems'],
      'Pablo approved the legacy FX payment-system article for Modernization.',
    ),
  },
  {
    sourceId: 'domain-analysis-responsibility-driven-design',
    mediumPostId: 'd0cbb412315c',
    canonicalTitle: 'Domain Analysis & Wirfs-Brock’s Responsibility-Driven Design for Agentic AI',
    canonicalUrl: 'https://medium.com/@pabloelustondo/domain-analysis-wirfs-brocks-responsibility-driven-design-for-agentic-ai-d0cbb412315c',
    author: 'Pablo Elustondo',
    publishedAt: '2026-07-15',
    sourceCollection: APPROVED_MEDIUM_LIST_URL,
    classification: approvedClassification(
      ['SDLC²'],
      ['responsibility-driven design', 'agentic systems'],
      'Pablo approved Responsibility-Driven Design as SDLC² material.',
    ),
  },
  {
    sourceId: 'practical-local-ai-2026-part-one',
    mediumPostId: 'ca7e94cdb449',
    canonicalTitle: 'The Rise of Practical Local AI in 2026 Part I: Models, Runtimes, and the Capability Cascade',
    canonicalUrl: 'https://medium.com/@pabloelustondo/the-rise-of-practical-local-ai-in-2026-part-i-models-runtimes-and-the-capability-cascade-ca7e94cdb449',
    author: 'Pablo Elustondo',
    publishedAt: '2026-07-24',
    sourceCollection: APPROVED_MEDIUM_LIST_URL,
    classification: approvedClassification(
      ['Architecture'],
      ['local LLMs', 'AI runtimes'],
      'Pablo approved the practical local-LLM article for Architecture.',
    ),
  },
  {
    sourceId: 'solid-in-the-ai-era',
    mediumPostId: '31f8d7aa9beb',
    canonicalTitle: 'SOLID in the AI Era: Same Principles, New Design Units',
    canonicalUrl: 'https://medium.com/@pabloelustondo/solid-2-0-rethinking-architecture-best-practice-for-the-agentic-era-31f8d7aa9beb',
    author: 'Pablo Elustondo',
    publishedAt: '2026-07-05',
    sourceCollection: APPROVED_MEDIUM_LIST_URL,
    classification: approvedClassification(
      ['SDLC²'],
      ['SOLID', 'agentic systems'],
      'Pablo approved SOLID as SDLC² material.',
    ),
  },
  {
    sourceId: 'three-amigos-agent-architecture',
    mediumPostId: '9b65d9344cf9',
    canonicalTitle: 'The Three Amigos Agent Architecture',
    canonicalUrl: 'https://medium.com/@pabloelustondo/the-three-amigos-agent-architecture-9b65d9344cf9',
    author: 'Pablo Elustondo',
    publishedAt: '2026-06-25',
    sourceCollection: APPROVED_MEDIUM_LIST_URL,
    classification: approvedClassification(
      [],
      [],
      'Pablo has not assigned this article to an approved pillar.',
    ),
  },
]

export const bootstrapCuratorState: CuratorState = {
  schemaVersion: 1,
  sourceCollection: APPROVED_MEDIUM_LIST_URL,
  refreshedAt: reviewedAt,
  articles,
}

export function cloneBootstrapCuratorState(): CuratorState {
  return structuredClone(bootstrapCuratorState)
}
