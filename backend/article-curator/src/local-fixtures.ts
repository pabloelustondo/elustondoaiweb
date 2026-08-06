import type { DiscoveredMediumArticle } from './article-curator/contracts.js'

// Feed fixture: all five bootstrap stories are visible, but Three Amigos
// no longer carries the required "AI Philosophy" tag, so it must be unpublished.
export const mediumFeedWithUntaggedThreeAmigos: readonly DiscoveredMediumArticle[] = [
  {
    canonicalTitle: 'An AI-Assisted Strategy for a Legacy FX Payment System: A Rotman Capstone Project',
    canonicalUrl: 'https://medium.com/@pabloelustondo/an-ai-assisted-strategy-for-a-legacy-fx-payment-system-a-rotman-capstone-project-74d10ab995f6',
    author: 'Pablo Elustondo',
    publishedAt: '2026-08-01',
    tags: ['AI Philosophy', 'Legacy Modernization'],
  },
  {
    canonicalTitle: 'Domain Analysis & Wirfs-Brock’s Responsibility-Driven Design for Agentic AI',
    canonicalUrl: 'https://medium.com/@pabloelustondo/domain-analysis-wirfs-brocks-responsibility-driven-design-for-agentic-ai-d0cbb412315c',
    author: 'Pablo Elustondo',
    publishedAt: '2026-07-15',
    tags: ['AI Philosophy'],
  },
  {
    canonicalTitle: 'The Rise of Practical Local AI in 2026 Part I: Models, Runtimes, and the Capability Cascade',
    canonicalUrl: 'https://medium.com/@pabloelustondo/the-rise-of-practical-local-ai-in-2026-part-i-models-runtimes-and-the-capability-cascade-ca7e94cdb449',
    author: 'Pablo Elustondo',
    publishedAt: '2026-07-24',
    tags: ['ai-philosophy'],
  },
  {
    canonicalTitle: 'SOLID in the AI Era: Same Principles, New Design Units',
    canonicalUrl: 'https://medium.com/@pabloelustondo/solid-2-0-rethinking-architecture-best-practice-for-the-agentic-era-31f8d7aa9beb',
    author: 'Pablo Elustondo',
    publishedAt: '2026-07-05',
    tags: ['AI Philosophy', 'Software Architecture'],
  },
  {
    canonicalTitle: 'The Three Amigos Agent Architecture',
    canonicalUrl: 'https://medium.com/@pabloelustondo/the-three-amigos-agent-architecture-9b65d9344cf9',
    author: 'Pablo Elustondo',
    publishedAt: '2026-06-25',
    tags: ['Agents'],
  },
]
