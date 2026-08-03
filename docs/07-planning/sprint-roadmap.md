# Elustondo.ai Sprint Roadmap

**Status:** Rolling planning baseline; roadmap entries are not implementation authorization
**Last updated:** 2026-08-03

## Current sequence

| Sprint | Goal | Principal boundary | Expected human-visible result |
|---|---|---|---|
| 001 — Real Website Foundation | Build the first real static website foundation and homepage. | `StableShell` and repository build/test foundation | Running responsive homepage with official branding, tests, screens, browser logs, and server logs |
| 002 — Public Content | Add the complete public corporate and knowledge pages. | Static content model and permanent routes | Navigable Articles, Projects, Methods, People, About, and Contact experience |
| 003 — Intelligent Article Discovery | Import a controlled snapshot of approved Medium articles and organize it intelligently by editorial pillar or subject, publication time, and explainable relevance. | `ArticleSourceSnapshot`, `ArticleTaxonomy`, `ArticleRanker`, and the Articles experience | A useful article library with canonical Medium metadata, pillar-based discovery, recent writing, relevant writing, and deliberate editorial overrides |
| 004 — Deterministic Assistant Experience | Add the AI-assisted interface with fixed safe fixtures. | `AssistantPanel`, `SiteNavigator`, and `GeneratedPageCanvas` | Predictable navigation, generated-page, clarification, refusal, and failure demonstrations |
| 005 — Assistant Safety Pipeline | Add the versioned endpoint and containment controls using a deterministic adapter. | `AssistantEndpoint`, `IntentRouter`, `OutputGuard`, route/source allow-lists | End-to-end controlled pipeline with negative security and contract tests |
| 006 — Controlled Live AI and Firebase Preview | Connect an approved provider and deploy a bounded preview. | `ModelAdapter`, managed secrets, operational controls, Firebase preview | Real provider experiment with safety, latency, cost, and operational evidence |
| 007 — Release Hardening | Complete public-release QA and rollback readiness. | Cross-cutting release candidate | Reviewed Firebase candidate ready for Pablo's release decision |

## Sprint 003 planning direction

Sprint 003 is the first planned intelligent content capability. It should transform the approved Medium source collection into a stable, useful Elustondo.ai article index without making visitor rendering depend on Medium availability.

The planned flow is:

```text
Approved Medium collection
→ controlled metadata import
→ canonical title, URL, author, and publication date snapshot
→ subject and editorial-pillar classification
→ transparent recency and relevance signals
→ deliberate editorial overrides
→ reviewed static article index
→ Articles page
```

The approved Sprint Plan defines the canonical Medium list, developer-run refresh boundary, initial pillar taxonomy, relevance rules, Pablo-owned overrides, provenance fields, and failure behavior. It preserves the Sprint 002 rule that public visitor requests do not fetch Medium at runtime. Article-list membership authorizes indexing, while imported metadata and deterministic classifications remain traceable and correctable.

## Roadmap rules

- Only the exact approved Sprint Plan and immutable implementation prompt activate work.
- The next sprint is reconsidered after the current sprint's evidence and deferrals are known.
- Any unresolved official-brand or reviewed-content dependency may block the affected acceptance criterion.
- Voice, authentication, protected customer applications, persistent conversation history, and source-aware open-web research remain outside these seven sprints.
- DNS cutover is a release action after the approved candidate, not a sprint side effect.

## Active package

- [Sprint 001 — Real Website Foundation](sprints/sprint-001-real-website-foundation/README.md) — `APPROVED` and merged to `main` with explicit deferrals.
- [Sprint 002 — Public Content](sprints/sprint-002-public-content/README.md) — `APPROVED`; independent integration testing passed, code review approved integration with minor findings, and Pablo accepted the Sprint.
- [Sprint 003 — Intelligent Article Discovery](sprints/sprint-003-intelligent-article-discovery/README.md) — `READY`; Pablo approved the Sprint Plan and immutable implementation prompt for bounded local implementation.
