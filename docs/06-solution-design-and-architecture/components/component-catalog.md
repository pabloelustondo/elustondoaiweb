# Elustondo.ai Component Catalogue

**Status:** Architectural planning baseline
**Last updated:** 2026-08-01

| Component | Responsibility | Current state | First planned sprint |
|---|---|---|---|
| `StableShell` | Own permanent identity, semantic page structure, navigation, responsive layout, static content presentation, and graceful operation without AI. | Design and mockup only | Sprint 001 |
| Static Content Model | Own reviewed local article, project, method, person, company, and site-metadata records. | Planned | Sprint 002 |
| `AssistantPanel` | Own visitor question entry, suggestions, status, clarification, and request cancellation. | Designed; not implemented | Sprint 003 |
| `SiteNavigator` | Convert an approved route identifier into shell-owned navigation. Never execute arbitrary URLs. | Designed; not implemented | Sprint 003 |
| `GeneratedPageCanvas` | Present validated generated HTML within the documented isolated, scriptless boundary. | Designed; not implemented | Sprint 003 |
| `AssistantEndpoint` | Accept and return the versioned assistant action contract. | Specified; not implemented | Sprint 004 |
| `IntentRouter` | Select navigation, generation, clarification, insufficiency, refusal, or unavailable outcomes. | Specified; not implemented | Sprint 004 |
| `ApprovedSourcePack` | Supply reviewed Elustondo.ai material and stable source identifiers. | Planned | Sprint 004 |
| `OutputGuard` | Validate the response contract, route and source identifiers, HTML policy, limits, and sanitization. | Specified; not implemented | Sprint 004 |
| `ModelAdapter` | Isolate provider-specific invocation, timeouts, and usage metadata behind a narrow interface. | Future | Sprint 005 |

## Dependency direction

The permanent shell must not depend on assistant availability. The assistant may propose an allow-listed action, but the shell owns navigation and rendering decisions. Provider-specific code remains behind `ModelAdapter` and cannot control the shell.

## Sprint 001 boundary

Sprint 001 implements only `StableShell` plus the repository build-and-test foundation required to verify it. It does not implement assistant components, backend services, Firebase deployment, authentication, or a content-management system.
