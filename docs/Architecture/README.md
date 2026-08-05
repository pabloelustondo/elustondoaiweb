# Elustondo.ai Architecture

This is the maintained description of what the current system is and why. Sprint-specific proposals, decisions, and evidence remain in [SDLC²](../SDLC2/README.md). Developer commands and environment details belong in the [Developer Guide](../DeveloperGuide/README.md).

## System context

Elustondo.ai currently has two independently useful runtime boundaries:

1. A static React/Vite frontend that presents the company, people, projects, methods, and a reviewed article snapshot.
2. An Article Curator backend designed to run every 15 minutes as a Firebase scheduled function, discover the approved Medium list, classify changed records with LangChain/Gemini, and preserve validated state in Firebase Storage.

The frontend remains usable if the curator, Medium, Gemini, or Firebase Functions is unavailable. The checked-in frontend does not yet consume the curator's cloud snapshot, and this repository does not claim a live deployment.

## Boundaries and responsibilities

| Boundary | Owns | Does not own |
|---|---|---|
| Frontend | Identity, stable routes, responsive and accessible presentation, reviewed bundled records, browser behavior. | Medium discovery, AI classification, remote persistence, schedules, secrets. |
| Article Curator | Scheduled orchestration, Medium membership and metadata checks, approved-pillar classification, comparison, removal confirmation, state persistence, bounded logging. | Visitor rendering, editorial approval, arbitrary web research, shell routing, deployment authority. |
| SDLC² documentation | Intent, use cases, specifications, sprint authority, evidence, review, and learning history. | Current developer commands or runtime implementation. |

Detailed current and planned components are indexed in the [component catalogue](../SDLC2/06-solution-design-and-architecture/components/component-catalog.md).

## Principal flows

### Visitor flow

```text
Firebase Hosting or local Vite server
→ frontend static assets
→ React stable shell and route handling
→ reviewed local content records
→ permanent visitor page
```

### Article curation flow

```text
15-minute Firebase schedule
→ load last-known-good state
→ Gemini URL-context membership discovery + Medium profile RSS cross-check
→ normalize and compare records
→ LangChain/Gemini classification for new or changed records
→ preserve editorial overrides and confirm removals twice
→ validate and save Firebase Storage state
→ write bounded operational log
```

### Offline verification flow

```text
deterministic four-article fixture
→ deterministic classifier
→ local file store
→ first removal observation remains pending
→ second identical observation applies removal
```

## Current decisions and characteristics

- **Static-first availability:** the public experience has no visitor-time external dependency.
- **Responsibility-oriented layout:** `frontend` and `backend/article-curator` describe product responsibilities; React, Vite, Firebase, LangChain, and Gemini are replaceable implementation choices within those boundaries.
- **Last-known-good safety:** failed discovery or classification does not replace validated state.
- **Conservative removal:** a missing Medium member must be observed twice consecutively before removal.
- **Human editorial authority:** existing editorial overrides are preserved; model output is structured, validated, and correctable.
- **Explainable taxonomy:** the current approved pillars are SDLC², Architecture, and Modernization. No broader ES2 taxonomy is finalized here.
- **Isolated deployment package:** the backend keeps an upload-local lockfile while the repository also uses a root workspace lock.

These choices favor auditability and graceful failure over immediate freshness. The trade-offs are delayed removal, duplicated lockfile maintenance for the deployable package, and an explicit future integration step before the frontend can consume curator output.

## Operational boundaries

The code includes Firebase Hosting and Functions paths, a schedule definition, Firebase Storage adapters, and a Gemini model adapter. Configuration is not proof of deployment. Live provider calls, remote writes, scheduler invocation, billing, secrets, production promotion, and DNS changes remain separate operational gates.

## Current architecture versus proposals

The frontend and Article Curator described above are implemented. The assistant panel, allow-listed natural-language navigation, generated-page canvas, output guard, and live assistant endpoint remain proposed future components. Their design records are preserved in:

- [AI-Assisted Navigation and Page Generation Architecture](../SDLC2/06-solution-design-and-architecture/conversational-page-generation-architecture.md)
- [Conversational Web App UML](../SDLC2/06-solution-design-and-architecture/uml/conversational-web-app-uml.md)
- [Article Curator and LangChain architecture record](../SDLC2/06-solution-design-and-architecture/medium-article-curator-and-langchain-architecture--AI.md)

This folder is the initial home of the evolving ES2 architectural approach, but it deliberately does not invent or finalize a twelve-dimension ES2 taxonomy.
