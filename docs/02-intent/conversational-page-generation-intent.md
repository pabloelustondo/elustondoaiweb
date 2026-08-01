# Conversational Page Generation Intent

**Date:** 2026-07-31  
**Status:** Current proof-of-concept intent; implementation requires separate approval

## Purpose

Demonstrate that a visitor can describe what they want to find or understand and receive the most appropriate controlled outcome within a stable branded website shell:

- navigation to an existing permanent destination when the information already exists there;
- a focused, accessible generated page when the visitor needs a tailored explanation or synthesis;
- a clarification, limitation, refusal, or availability message when neither outcome is justified.

The experiment should test whether an AI-assisted interface combining navigation and page composition is more useful than forcing every visitor through a fixed navigation hierarchy. It also provides a real project through which SDLC² can be exercised, evaluated, and improved.

## Audiences

- Prospective clients, hiring managers, partners, recruiters, and technical evaluators exploring services, experience, people, résumés, projects, and methods.
- Engineers, architects, students, researchers, and technical leaders seeking articles, papers, resources, and related writing.
- Potential collaborators evaluating projects and ways of working.
- Returning readers looking for a specific Elustondo.ai concept.
- In future releases, authenticated Elustondo.ai members and separately authorized protected-application users.

## Intended experience

1. The visitor sees the normal Elustondo.ai identity, permanent navigation, a large content canvas, and a concise assistant panel.
2. The visitor enters a question or navigation request, or selects a reviewed example.
3. The shell shows a clear loading state and preserves control of routing and presentation.
4. A server-side assistant endpoint classifies the request and returns one typed proposal.
5. For navigation, the shell verifies the destination against its allow-list and performs the route change.
6. For page generation, the endpoint selects approved sources, composes a bounded page, validates and sanitizes the result, and returns a safe envelope.
7. The shell renders safe generated HTML inside a large isolated iframe while keeping sources, limitations, navigation, and assistant controls outside it.
8. The visitor can refine the request, start over, open permanent sources, or continue through normal navigation.
9. Clarification, insufficient evidence, policy limits, or service failures are explained without breaking the shell.

## Success outcomes

- Navigation proposals reach the correct allow-listed permanent destination.
- Generated pages are relevant to the visitor's expressed intent.
- Claims are traceable to approved source material.
- The result feels like an Elustondo.ai page, not merely a generic chatbot transcript.
- Unsafe or structurally invalid output is blocked.
- Keyboard, screen-reader, mobile, and reduced-motion users retain an understandable experience.
- Cost, latency, failures, and policy outcomes are observable.
- The static site remains available when generation is disabled or unavailable.

## Proof-of-concept boundary

Included:

- Stable branded shell and permanent navigation.
- Assistant panel and large generated-page canvas with responsive placement.
- One text request at a time with optional bounded in-memory session context.
- Typed navigation and generated-page outcomes.
- Allow-listed permanent destinations owned by the shell.
- Curated source pack controlled by the content steward.
- One server-side HTTPS assistant endpoint.
- Structured response validation and HTML sanitization.
- Scriptless sandboxed rendering.
- Clear loading, empty, success, refusal, timeout, and error states.
- Preview deployment and manual QA.

Excluded unless separately approved:

- Open-web research and current external-data answers without source-aware retrieval, dates, citations, and freshness policy.
- Arbitrary code execution or generated JavaScript.
- User accounts, profiles, or long-term personalization.
- Member administration, customer applications, and public registration.
- Voice capture, transcription, or audio retention.
- Persistent conversation storage.
- Autonomous actions, email sending, purchases, or business transactions.
- Unreviewed client or private project information.
- An unsourced general-purpose assistant unrelated to the initial approved knowledge boundary.
- Automatic production deployment or DNS cutover.

## Relationship to the stable site

The assistant experience is an evolution of the static baseline, not its deletion. Home, Services, Experience or Projects, People, Articles, Resources, Methods, About, and Contact remain stable destinations and fallback content. Generated pages may summarize and connect them, but cannot redefine approved facts.

The assistant may propose navigation, but the shell owns the route allow-list and executes the transition. Generated HTML never controls the permanent router.

## Future evolution

Voice may later be added as an input adapter that transcribes speech into the same normalized request contract. Authenticated company-member and protected customer experiences are separate future security domains. Neither capability is implied by the initial public proof.
