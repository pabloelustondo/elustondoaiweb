# Elustondo.ai Architecture

> **Documentation:** [1. System Definition](../01_SystemDefinition/README_ai.md) · [2. Developer Guide](../02_DeveloperGuide/README_ai.md) · [3. Architecture](../03_Architecture/README_ai.md) · [4. SDLC2](../04_SDLC2/README_ai.md)

**Status:** AI-authored maintained architecture; awaiting human review
**Last reconciled:** 2026-08-05
**Scope:** Verified current implementation and configured topology, with future proposals clearly separated

## How to use this document

Read the [System Definition](../01_SystemDefinition/README_ai.md) for purpose, actors, capabilities, journeys, and public-content rules. Use the [Developer Guide](../02_DeveloperGuide/README_ai.md) for commands and practical maintenance. This document explains how the current implementation is technically shaped and why.

Original proposals, sprint decisions, implementation claims, tests, and review evidence remain in [SDLC2](../04_SDLC2/README_ai.md). A proposal preserved there is not current architecture until it has been implemented, verified, accepted, and reflected here.

## Architectural scope and truth model

The repository has two implemented runtime responsibilities:

1. a static visitor-facing React/Vite frontend;
2. a scheduled Medium Article Curator backend designed for Firebase Functions.

The repository also contains Firebase Hosting, Functions, Storage, and schedule configuration plus Gemini/LangChain adapters. Those are implementation and deployment interfaces, not evidence that a live Firebase project, scheduler, storage object, model call, or production release exists.

The current frontend and curator are deliberately separated, and the frontend does **not** yet consume the curator's cloud state.

## System context

```text
                      Verified application request path

Visitor -> static server -> static frontend bundle
           (local verified; Firebase Hosting configured but deployment unverified)
                                                |
                                                v
                                      reviewed bundled records

                         Background curation path in code

Firebase schedule -> Article Curator -> Medium approved list
                          |           -> Pablo profile RSS
                          |           -> Gemini through LangChain
                          v
                 Firebase Storage current state with required run
                          + optional secondary audit object
                          |
                          +---- no current frontend reader
```

The static frontend is the current publication boundary. The curator's stored JSON is candidate operational state for a future integration, not automatically public content.

## Major technical boundaries

| Boundary | Owns | Explicitly does not own |
|---|---|---|
| Frontend | Brand identity, permanent routes, browser history, responsive and accessible presentation, reviewed bundled records, deterministic article views. | Medium discovery, model calls, remote state, scheduling, secrets, editorial approval, deployment authority. |
| Medium Article Curator | Background observation, normalization, change detection, bounded classification, editorial-override preservation, conservative removal, state and run-record persistence. | Visitor rendering, public release, arbitrary research, human editorial judgment, frontend routing. |
| Curated frontend snapshot | The exact article metadata included in a reviewed frontend build. | Automatic synchronization with Medium or Firebase Storage. |
| Curator state | Last recorded catalog, pending removals, classification provenance, and bounded run history objects. | Public publication by itself. |
| Repository workspace | Reproducible coordination of both packages and documentation. | Cloud identity, live project selection, billing, or production evidence. |
| SDLC2 | Intent, proposals, authorization, implementation claims, evidence, review, disposition, and learning. | Canonical current-system or command reference. |

## Frontend architecture

The frontend is a static single-page application built with React, TypeScript, and Vite. It provides a stable shell around permanent routes for Home, Articles, Projects, Methods, People, About, Contact, and not-found behavior.

Its key architectural properties are:

- **Static-first availability.** The application imports reviewed content records into the bundle. Visitor rendering does not depend on Medium, LinkedIn, GitHub, Gemini, Firebase Functions, or the curator.
- **Shell-owned navigation.** The application owns route transitions, browser-history behavior, mobile navigation, skip-link focus, and current-page indication.
- **Typed publication boundary.** Public records carry explicit types, publication states, disclosure classes, and approved destinations. Unsafe or private records fail closed.
- **Deterministic article presentation.** The current article snapshot is grouped into `SDLC²`, `Architecture`, and `Modernization`; recent ordering and relevance signals are explainable rather than hidden in a runtime model score.
- **Responsive editorial presentation.** Layout adapts across content-driven widths, including the 320 CSS-pixel acceptance boundary.

The bundled article snapshot currently contains four reviewed records. “The Three Amigos Agent Architecture” was removed from the publication snapshot after Pablo removed it from Medium. This reviewed frontend change is separate from the backend's four-article local regression fixture.

## Medium Article Curator architecture

The Article Curator is an in-process TypeScript pipeline wrapped by a Firebase scheduled function. LangChain is a library inside that function; it is not a separate server or scheduler. Gemini is the external model used by LangChain adapters.

### Configured schedule

The function is configured for:

- every 15 minutes;
- `America/Toronto` time zone;
- `northamerica-northeast1` region;
- 512 MiB memory;
- 180-second timeout;
- concurrency 1 and maximum one instance.

These limits reduce overlap in the configured deployment, but they are not a distributed lock and do not prove that the schedule is deployed.

### One curation cycle

```text
Load previous state
    |
    v
Observe approved Medium-list membership through Gemini URL context
    +--> read Pablo profile RSS concurrently for matching metadata enrichment
    |
    v
Normalize and validate supported Medium records
    |
    v
Compare additions, edits, and absences with previous state
    |
    +--> preserve human editorial overrides
    +--> classify only new or changed eligible records
    +--> require two matching absence observations before removal
    |
    v
Commit validated current state with required bounded run record
    |
    v
Append optional audit record best-effort and emit structured log
```

The Medium list observation is model-mediated: the adapter asks Gemini, through LangChain and URL context, to inspect the exact approved list and produce structured JSON. Application validation then narrows the result. The profile Really Simple Syndication (RSS) feed enriches records whose post identifiers match; an unmatched model-observed list member is not rejected solely because RSS lacks it.

### Source normalization and validation

Current source validation requires:

- an HTTPS Medium host;
- a canonicalized URL without query or fragment noise;
- a supported 12-hexadecimal-character Medium post identifier;
- the exact author name `Pablo Elustondo`;
- a parseable publication date;
- at least one record;
- no normalized duplicate source identifiers, post identifiers, or canonical URLs.

Existing approved source identifiers are preserved from prior valid state. New identifiers incorporate the stable Medium post identifier so distinct posts with the same human-readable slug cannot collide.

Model classification uses structured output constrained to the current pillars `SDLC²`, `Architecture`, and `Modernization`, plus bounded subjects, rationale, and confidence. Shape and allow-list validation do not prove semantic correctness; Pablo's editorial decisions remain authoritative.

## Eligibility, classification, and human authority

The architecture separates:

1. **source eligibility** — whether a Medium record enters the curation pipeline;
2. **destination classification** — where an eligible article appears in the reader experience;
3. **publication authority** — whether reviewed content enters a public frontend release.

Current implemented eligibility is approved Medium-list membership plus source normalization and author validation. Current destination classification is limited to `SDLC²`, `Architecture`, and `Modernization`. Existing human editorial overrides are preserved and outrank machine classification.

Correction 002 source material introduces `AI Philosophy` as an intended eligibility signal and mentions `ES2` as a possible destination pillar. Neither rule exists in current contracts, filters, fixtures, or tests. They remain an unresolved design evolution, not current operational architecture. This document therefore does not finalize an ES2 taxonomy.

## State and publication boundaries

### Frontend publication state

The frontend reads `approvedArticleSnapshot.json` at build time. Changing the curator's cloud state does not change the public application. Publishing a new frontend snapshot currently remains a version-controlled, human-reviewed release action.

### Curator state

The Firebase adapter targets:

```text
article-curator/current.json
article-curator/runs/<timestamp>-<run-id>.json  (optional secondary audit)
```

When no remote current state exists, the adapter uses a bootstrap catalog. Both local-file and Firebase loads validate the complete bounded `CuratorState` runtime schema before orchestration consumes it. Validation covers the schema version, approved collection and author, canonical Medium identities, dates, identifiers, approved pillars, classification completeness and origin, pending-removal references, uniqueness, and bounded run-summary data. Invalid stored state is rejected rather than treated as current.

The local file adapter writes a temporary file and renames it, providing an atomic replacement on the local filesystem. The Firebase adapter performs a normal object save; it does not currently use a generation precondition, compare-and-swap, transaction, or distributed lock.

The required bounded run record is embedded as `lastRun` in the same current-state object and committed as one store outcome. A failed required commit therefore leaves the previous current object in place. The separate per-run object is explicitly optional audit evidence: its failure is logged best-effort and does not convert an already committed successful run into failure. This is an application-level commit boundary; concurrent remote writers are still not serialized because Firebase Storage generation preconditions or a distributed lock are not implemented.

## Why the responsibilities are separate

### Visitors must not wait for Medium or Gemini

Medium availability, model latency, quota, cost, response quality, and external markup changes are inappropriate dependencies for a public page request. A prepared static snapshot provides predictable performance and availability.

### Visual changes must not risk the publishing pipeline

The frontend owns presentation. The curator owns content observation and candidate state. A layout or accessibility change should not modify source discovery, classification, or persistence behavior.

### Classifier changes must not require rebuilding the visitor experience

The taxonomy and model adapter can evolve within the curator boundary. A later integration can publish validated state through an explicit contract without coupling React components to model-provider behavior.

### Previous state is necessary

Without prior state, the system cannot distinguish a new article from an edit, a temporary discovery failure from a removal, or a machine classification from a preserved human override.

### Destructive change is delayed

One missing observation may be transient. Requiring two identical observations before removal favors public stability over immediate deletion.

### Publication is a separate authority

Discovery answers what appears to exist; classification proposes placement; publication is a reviewed product decision. Keeping those stages separate prevents a model or external source from directly changing the public site.

### Fixture-backed local execution is a safety property

Local verification must be able to exercise orchestration and removal behavior without credentials, external calls, schedules, or production writes. This makes failure reproducible and prevents routine development from becoming an operational event.

## Patterns in the current implementation

- **Ports and adapters.** Source, classifier, store, and logger interfaces isolate external mechanisms from policy.
- **Dependency injection.** Production, fixture, failure, memory, local-file, and Firebase adapters can exercise the same curator orchestration.
- **Orchestrated pipeline.** One component owns the ordered curation cycle while collaborators retain narrow responsibilities.
- **Anti-corruption layer.** Medium/model data is normalized into internal records rather than trusted directly.
- **Structured-output contract.** Gemini candidates must match bounded schemas and allow-lists.
- **Last-known-good commit boundary.** Discovery, normalization, classification, validation, or required persistence failure prevents replacement of current state.
- **Editorial override.** Human decisions survive subsequent model runs.
- **Two-observation debounce.** Destructive removal requires repeated evidence.
- **Static snapshot publication gate.** The visitor application changes only through a reviewed build today.

## Trust and security boundaries

- Visitor content records, Medium responses, RSS data, and model output are untrusted until validated for their intended scope.
- The author name and approved source establish a narrow publication trust boundary; they do not validate every semantic claim in an article.
- Gemini can propose structured observations or classifications, but cannot grant eligibility beyond policy, approve content, or deploy it.
- The browser receives no model credential or Firebase Storage access through the current implementation.
- The scheduled function is the only backend export; there is no visitor-facing curator HTTP endpoint.
- Managed Google Cloud identity is intended for deployed access. No credential, project binding, Identity and Access Management policy, Storage rule, or live authorization property is proven by this repository alone.
- Private repositories, confidential project details, secrets, raw credentials, and unnecessary personal information remain outside the public-content boundary.

## Failure containment

| Failure | Current behavior and boundary |
|---|---|
| Medium or list observation fails | The curator records or attempts a failed run and rethrows; no visitor request depends on the run. |
| Source normalization rejects data | The candidate is not accepted; previous public frontend content remains unchanged. |
| Gemini classification fails | The run fails before normal state replacement; existing public frontend content remains unchanged. |
| One article is absent once | The record remains and is marked pending removal. |
| The same article set is absent twice | Removal is applied to curator state. Public frontend content still requires separate publication. |
| Required state-and-run commit fails | The run reports failure and the prior current object remains the store's current state. |
| Optional audit append fails after commit | The successful current commit remains successful; the audit failure is logged best-effort. |
| Persisted state is stale, corrupt, or adversarial | Complete load-time schema validation rejects it before orchestration consumes or replaces it. |
| Schedule does not run | Freshness degrades; the static frontend remains available. |
| Curator, Medium, Gemini, or Functions is unavailable | Permanent visitor pages continue from the bundled snapshot. |

## Observability

Each curator run summary records:

- run identifier and timestamps;
- status and discovered count;
- added, removed, pending-removal, and classified identifiers;
- a bounded message.

Firebase logging emits success counts or failure names and messages. The current code does not intentionally log raw prompts, complete model responses, or credentials.

Current observability limits are explicit: there is no committed retention policy, alerting rule, dashboard, distributed trace, health endpoint, aggregate metric set, or token/cost telemetry. Per-run objects can accumulate over time unless an operational retention policy is added.

## Configured deployment topology

```text
Firebase Hosting
    public directory: frontend/dist
    route fallback: /index.html

Firebase Functions codebase: article-curator
    source: backend/article-curator
    runtime: Node.js 22
    trigger: scheduled function

Firebase Storage
    intended curator state and run-record objects

Gemini on Google Cloud
    invoked in-process through LangChain adapters
```

This is a configured topology. Live provider calls, remote state, scheduled execution, project identity, billing, production promotion, and Domain Name System (DNS) cutover remain separate operational gates.

## Trade-offs and current limitations

| Choice | Benefit | Cost or limitation |
|---|---|---|
| Bundled frontend snapshot | Fast, stable, auditable visitor path | Publication can lag the curator; current snapshots can diverge. |
| Background 15-minute curator | Freshness without visitor latency | Requires scheduler, cloud identity, provider quota, cost control, and operations. |
| Gemini URL-context list observation | Avoids a manually maintained second catalog | Membership remains model-mediated and externally dependent. |
| RSS enrichment | Supplies independent matching metadata when present | It does not prove membership for every model-observed record. |
| Two-observation removal | Protects against transient absence | Legitimate removals are delayed. |
| Human editorial overrides | Preserves authority and correction | Requires explicit provenance and maintenance. |
| Validated JSON current object with embedded required run | Bounded load-time schema and one testable state-plus-required-run commit | No compare-and-swap, generation precondition, distributed lock, or transaction across independent writers. |
| Same Gemini model for discovery and classification | Simple production composition | Couples two failure, quota, and model-quality concerns. |
| Root and backend lockfiles | Reproducible workspace and deployable package | Dependency maintenance is duplicated deliberately. |

The current frontend snapshot and local curator fixture both contain four records, but they reached that membership through separate reviewed and deterministic-fixture paths. They are still not synchronized states, and matching counts do not implement the deferred publication integration.

## Current architecture versus future proposals

### Implemented in the repository

- stable static routes and reviewed content;
- deterministic article taxonomy and ranking;
- scheduled curator code;
- LangChain/Gemini Medium and classification adapters;
- local deterministic curator verification;
- Firebase Storage and Hosting/Functions adapters and configuration.

### Configured but not operationally verified

- live Firebase Hosting and Functions deployment;
- scheduler execution;
- Firebase Storage persistence;
- managed runtime identity and Gemini access;
- live Medium URL-context behavior;
- quotas, billing, cost, alerts, and retention.

### Proposed or deferred

- frontend consumption of curator output;
- a formal publication contract and promotion step;
- `AI Philosophy` topic eligibility;
- an evolved ES2 classification taxonomy;
- Assistant Panel and natural-language navigation;
- generated-page canvas, output guard, and assistant endpoint;
- authentication, voice, customer applications, and open-web research.

## Architecture and ES2

This maintained view is an early place to apply the evolving ES2 architectural approach: responsibilities, boundaries, flows, evidence, operational reality, and trade-offs are made explicit. It does not define or freeze a twelve-part ES2 taxonomy. Proposed ES2 concepts should be explored in SDLC2 and graduate here only after implementation and acceptance.

## Detailed records and evidence

- [Current component catalogue](../04_SDLC2/06-solution-design-and-architecture/components/component-catalog.md)
- [Article Curator responsibility card](../04_SDLC2/06-solution-design-and-architecture/components/responsibility-cards/article-curator--AI.md)
- [Article Curator and LangChain architecture record](../04_SDLC2/06-solution-design-and-architecture/medium-article-curator-and-langchain-architecture--AI.md)
- [Sprint 003 package](../04_SDLC2/07-planning/sprints/sprint-003-intelligent-article-discovery/README.md)
- [Future conversational architecture](../04_SDLC2/06-solution-design-and-architecture/conversational-page-generation-architecture.md) — proposal, not current runtime
- [Future conversational UML](../04_SDLC2/06-solution-design-and-architecture/uml/conversational-web-app-uml.md) — specification, not implementation evidence
