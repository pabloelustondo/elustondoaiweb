# Elustondo.ai Component Catalogue

**Status:** Architectural planning baseline
**Last updated:** 2026-08-03

| Component | Responsibility | Current state | First planned sprint |
|---|---|---|---|
| `StableShell` | Own permanent identity, semantic page structure, navigation, responsive layout, static content presentation, and graceful operation without AI. | Sprint 001 approved and merged to `main` | Sprint 001 |
| Static Content Model | Own reviewed local article, project, method, person, company, contact, download, and site-metadata records plus their publication boundary. | Implemented, independently tested, and approved in Sprint 002 | Sprint 002 |
| `ArticleSourceSnapshot` | Import and preserve canonical metadata from the approved Medium source collection outside the visitor request path. | Approved for Sprint 003 implementation | Sprint 003 |
| `ArticleTaxonomy` | Classify articles by approved editorial pillar and subject while preserving provenance and correctable overrides. | Planned | Sprint 003 |
| `ArticleRanker` | Produce transparent ordering signals for recency and relevance without hiding editorial choices inside an unexplained score. | Planned | Sprint 003 |
| `AssistantPanel` | Own visitor question entry, suggestions, status, clarification, and request cancellation. | Designed; not implemented | Sprint 004 |
| `SiteNavigator` | Convert an approved route identifier into shell-owned navigation. Never execute arbitrary URLs. | Designed; not implemented | Sprint 004 |
| `GeneratedPageCanvas` | Present validated generated HTML within the documented isolated, scriptless boundary. | Designed; not implemented | Sprint 004 |
| `AssistantEndpoint` | Accept and return the versioned assistant action contract. | Specified; not implemented | Sprint 005 |
| `IntentRouter` | Select navigation, generation, clarification, insufficiency, refusal, or unavailable outcomes. | Specified; not implemented | Sprint 005 |
| `ApprovedSourcePack` | Supply reviewed Elustondo.ai material and stable source identifiers. | Planned | Sprint 005 |
| `OutputGuard` | Validate the response contract, route and source identifiers, HTML policy, limits, and sanitization. | Specified; not implemented | Sprint 005 |
| `ModelAdapter` | Isolate provider-specific invocation, timeouts, and usage metadata behind a narrow interface. | Future | Sprint 006 |

## Dependency direction

The permanent shell must not depend on assistant availability. The assistant may propose an allow-listed action, but the shell owns navigation and rendering decisions. Provider-specific code remains behind `ModelAdapter` and cannot control the shell.

## Sprint 001 boundary

Sprint 001 implements only `StableShell` plus the repository build-and-test foundation required to verify it. It does not implement assistant components, backend services, Firebase deployment, authentication, or a content-management system.

## Sprint 002 boundary

Sprint 002 implemented the Static Content Model and integrated it with `StableShell` permanent routes. Medium, LinkedIn, and Git repositories remain authoritative sources or destinations, but visitor page rendering uses reviewed local records rather than runtime external feeds. Private projects remain private unless Pablo explicitly approves a sanitized `PUBLIC_SUMMARY_ONLY` record.

## Sprint 003 boundary

Sprint 003 is approved to add controlled Medium metadata ingestion and intelligent article organization by editorial pillar or subject, publication time, and explainable relevance. It must produce a stable local snapshot rather than fetch Medium during each visitor request. The approved package defines the canonical Medium list, three initial pillars, deterministic ranking signals, developer-run refresh boundary, Pablo-owned editorial overrides, and required review evidence.
