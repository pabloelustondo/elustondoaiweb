# Elustondo.ai SDLC2 Guide

> **Documentation:** [1. System Definition](../01_SystemDefinition/README_ai.md) · [2. Developer Guide](../02_DeveloperGuide/README_ai.md) · [3. Architecture](../03_Architecture/README_ai.md) · [4. SDLC2](../04_SDLC2/README_ai.md)

**Status:** AI-authored navigation and responsibility guide; awaiting human review
**Last reconciled:** 2026-08-05
**Canonical method:** [SDLC2 — The Canonical 12-Step Cycle](SDLC2.md)

## What SDLC2 is for

SDLC2 governs how Elustondo.ai changes. It brings intent, models, use cases, benchmarks, architecture proposals, plans, specifications, implementation claims, tests, review, operational evidence, and learning into the version-controlled repository so that people and development agents work from the same explicit context.

SDLC2 is knowledge-centred, specification-driven, and evidence-driven. Artificial intelligence may assist throughout the lifecycle, but people retain responsibility for intent, judgment, authorization, accountability, independent review, and the interpretation of evidence.

This folder is not the canonical description of the current system. Current purpose and boundaries belong in [System Definition](../01_SystemDefinition/README_ai.md), current developer procedures in the [Developer Guide](../02_DeveloperGuide/README_ai.md), and accepted technical structure in [Architecture](../03_Architecture/README_ai.md).

## The twelve concerns

The numbered folders preserve distinct engineering questions without imposing a rigid waterfall. New evidence can send work back to an earlier concern.

| Step | Area | Primary question |
|---:|---|---|
| 1 | [Context and Domain Analysis](01-context-and-domain-analysis/) | What real-world, organizational, technical, and human context must be understood? |
| 2 | [Intent](02-intent/) | Why does the change exist, what outcome matters, and what is outside scope? |
| 3 | [System Model and Use Cases](03-system-model-and-use-cases/) | Which actors, responsibilities, information, states, and observable journeys define the needed system? |
| 4 | [Benchmarks, Test Strategy, and Success Criteria](04-benchmarks-test-strategy-and-success-criteria/) | What evidence would justify believing the change is useful and correct? |
| 5 | [Viable Proof of Concept](05-viable-proof-of-concept/) | What smallest credible experiment can resolve the highest uncertainty? |
| 6 | [Solution Design and Architecture](06-solution-design-and-architecture/) | How should the proposed solution allocate behavior, information, responsibilities, interfaces, and trade-offs? |
| 7 | [Planning](07-planning/) | What bounded sequence of work, authority, dependencies, risks, and evidence will deliver it? |
| 8 | [Specifications as Code](08-specifications-as-code/) | What authoritative, agent-ready, repository-resident specification governs implementation and evaluation? |
| 9 | [Build and Test](09-build-and-test/) | What was implemented, and what evidence shows conformance and important failure behavior? |
| 10 | [Review and Release](10-review-and-release/) | Should the increment leave the controlled environment, given independent evidence and accepted risk? |
| 11 | [Operational Reality](11-operational-reality/) | What happens when the integrated system meets real users, data, infrastructure, and consequences? |
| 12 | [Observability, Insights, and Learning](12-observability-insights-and-learning/) | What did operation reveal, and how does that learning update the next cycle? |

The complete responsibilities and rationale are defined in [SDLC2.md](SDLC2.md).

## Planning and authorization hierarchy

The planning layers must not be collapsed:

```text
Product Vision
    -> Release Plan
        -> rolling Sprint Roadmap
            -> bounded Sprint Package
```

- The **Product Vision** gives durable strategic direction.
- The **Release Plan** groups meaningful product outcomes and release gates.
- The **Sprint Roadmap** is adjustable direction, not an active work order.
- A **Sprint Package** records one bounded increment and its authority.

Only Pablo's explicit approval of the exact Sprint Plan and implementation prompt activates implementation. A roadmap row, mockup, placeholder, document, or AI suggestion does not authorize work.

Start at:

- [Planning index](07-planning/README.md)
- [Release Plan](07-planning/release-plan.md)
- [Sprint Roadmap](07-planning/sprint-roadmap.md)
- [Sprint registry](07-planning/sprints/README.md)
- [Sprint Documentation and Governance Model](07-planning/sprint-documentation-and-governance-model.md)

## Sprint package model

Every implemented sprint preserves six distinct decisions or claims:

1. **Sprint Plan** — Pablo's bounded authorized intent.
2. **Authorized implementation prompt** — immutable work order for the implementation agent.
3. **Agent delivered-scope report** — the implementing agent's claim, including omissions, deviations, and risks.
4. **Developer Integration Test report** — independent observed behavior and environment evidence.
5. **Code-review report** — independent structural and technical judgment.
6. **Sprint approval and disposition** — Pablo's acceptance, deferrals, rejection, correction, or blocking decision.

Corrections preserve the original plan and prompt. A correction adds a new authorized prompt and agent response, then reruns the affected independent gates. The implementing agent cannot approve its own change.

The workflow states are:

```text
DRAFT -> READY -> IN_PROGRESS -> AWAITING_INTEGRATION_TEST
      -> AWAITING_CODE_REVIEW -> AWAITING_APPROVAL -> APPROVED -> CLOSED

At an applicable gate: CHANGES_REQUIRED or BLOCKED
```

Approval of a sprint does not automatically authorize a commit, push, merge, Firebase deployment, production promotion, provider billing, credential use, or Domain Name System change. Those permissions must be explicit.

## How to navigate the current history

The [Sprint registry](07-planning/sprints/README.md) is the entry point for sprint packages:

- [Sprint 001 — Real Website Foundation](07-planning/sprints/sprint-001-real-website-foundation/README.md)
- [Sprint 002 — Public Content](07-planning/sprints/sprint-002-public-content/README.md)
- [Sprint 003 — Intelligent Article Discovery](07-planning/sprints/sprint-003-intelligent-article-discovery/README.md)

Within a sprint, read in numbered order. Then open its `evidence/` index and any `corrections/` index. Treat plans, prompts, agent claims, independent observations, code-review conclusions, and human approval as different artifact types; none substitutes for another.

The [`reference/`](reference/) folder preserves unique historical SDLC2 material that is not current repository governance. Historical filenames and statements may record the paths, assumptions, or terminology that were true when work occurred.

## What belongs in SDLC2

Keep these artifacts here:

- domain research, source policies, assumptions, and unresolved questions;
- proposed purpose, actors, capabilities, rules, boundaries, and use cases;
- benchmarks, evaluation strategy, and success criteria;
- proofs of concept and their evidence;
- proposed solution design and architecture;
- release plans, roadmaps, sprint plans, and immutable work orders;
- agent implementation claims and correction responses;
- automated, browser, accessibility, integration, security, and operational evidence;
- independent code review and human disposition;
- deployment observations, incidents, metrics, insights, and lessons;
- rejected or deferred alternatives when they remain relevant to decision history.

## What does not belong as the canonical answer in SDLC2

SDLC2 may contain the origin and evidence for these facts, but their maintained current form belongs elsewhere:

- current system purpose, actors, capabilities, rules, and boundary -> System Definition;
- current commands, setup, safe local workflows, and troubleshooting -> Developer Guide;
- current technical responsibilities, runtime flows, decisions, constraints, and trade-offs -> Architecture;
- maintained source code, package declarations, static assets, and generated build output -> their owning implementation folders.

Do not use an old sprint proposal as proof that the current system implements the proposal. Verify implementation and accepted evidence first.

## Graduation into maintained documentation

SDLC2 is where a change begins and where its evidence remains. Accepted operational reality graduates into the maintained guides:

| Change artifact | While proposed or in progress | After implementation, independent verification, and human acceptance |
|---|---|---|
| Purpose, actor, capability, rule, use case, or system boundary | Relevant SDLC2 context, intent, model, or sprint package | Update [System Definition](../01_SystemDefinition/README_ai.md). |
| Technical design, responsibility, interface, flow, constraint, or trade-off | Relevant SDLC2 design/architecture record and sprint package | Update [Architecture](../03_Architecture/README_ai.md). |
| Command, setup procedure, maintenance workflow, or troubleshooting rule | Relevant SDLC2 plan, implementation, and evidence | Update the [Developer Guide](../02_DeveloperGuide/README_ai.md). |
| Implementation claim, benchmark, test, review, deployment observation, incident, or lesson | SDLC2 | Remains in SDLC2 as attributable evidence and history. |

Graduation is not copying an entire sprint report into a maintained guide. Extract the durable accepted conclusion, state it once in its owning guide, and link back to evidence when the rationale matters.

Maintained guides must distinguish:

- **implemented and accepted**;
- **configured but not operationally verified**;
- **proposed, deferred, or future**.

## Solution design and business analysis placement

There is no separate top-level `SolutionDesign` area:

1. proposed solution design belongs in the relevant SDLC2 change or sprint;
2. accepted durable architectural conclusions graduate to Architecture.

There is no separate top-level `BusinessAnalysis` area either. Stable purpose, audiences, actors, journeys, domain rules, and system boundaries graduate to System Definition; the research and change evidence remain in SDLC2.

## Evidence rules

Evidence must be attributable, reproducible, proportionate, and labeled by boundary.

- Record the exact repository, branch, revision, worktree condition, environment, and command or journey observed.
- Distinguish a fixture from a live source, a local build from a deployment, a preview from production, and configuration from runtime observation.
- Preserve original evidence; add analysis without overwriting it.
- Record environment failures separately from application defects.
- Never store secrets, credentials, access tokens, private prompts, or unnecessary personal information.
- Do not turn a successful implementation-agent check into independent approval.
- Explicitly route postponed work rather than silently erasing it from scope.

## Authorship and approval markers

The repository preserves historical filenames. New AI-authored maintained entry documents created by Correction 002 use the requested `_ai.md` suffix. Sprint artifacts also use the established `--AI` and `--HA` markers where applicable:

- `AI` identifies material authored or claimed by an AI agent and still subject to human judgment;
- `HA` records explicit human approval or a human-authored/approved authority boundary.

A filename is a visibility aid, not a substitute for the document's status metadata or the underlying approval record. Do not rename historical evidence merely to normalize its suffix.

## Normal change path

1. Confirm the current maintained system in System Definition, Developer Guide, and Architecture.
2. Identify the SDLC2 concern and existing evidence relevant to the proposed change.
3. Define intent, boundaries, success evidence, component ownership, and non-goals.
4. Create and obtain approval for the bounded Sprint Plan and immutable implementation prompt.
5. Implement without exceeding the authorized boundary.
6. Record an honest delivered-scope claim.
7. Execute independent integration testing and code review.
8. Obtain Pablo's disposition and any consequential action authority.
9. Preserve evidence and accepted deferrals.
10. Graduate accepted operational conclusions into the maintained guide that owns them.
11. Feed operational observations and learning into the next cycle.

## Current maintained reality

For the current system, use:

- [System Definition](../01_SystemDefinition/README_ai.md)
- [Developer Guide](../02_DeveloperGuide/README_ai.md)
- [Architecture](../03_Architecture/README_ai.md)

Use this SDLC2 corpus to understand how those current facts were proposed, tested, reviewed, accepted, or left unresolved.
