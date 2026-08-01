# Elustondo.ai Website Documentation

This directory contains the implementation-ready documentation for the Elustondo.ai corporate website. Artifacts are routed by the twelve SDLC² concerns so product intent, design, implementation, QA, release evidence, and operational learning remain distinct.

The imported website documents retain links to their Google Docs sources for provenance. The local Markdown copies are the documents agents should read while working in this repository.

## Current authoritative set

- [Product Vision](02-intent/product-vision.md)
- [Repository Intent](02-intent/repository-intent.md)
- [Conversational Experience Context](01-context-and-domain-analysis/conversational-experience-context.md)
- [Conversational Page Generation Intent](02-intent/conversational-page-generation-intent.md)
- [Generated Content Policy](02-intent/generated-content-policy.md)
- [Elustondo.ai System Model and Use Cases](03-system-model-and-use-cases/conversational-page-generation-system-model-and-use-cases.md)
- [POC Success Criteria and Test Strategy](04-benchmarks-test-strategy-and-success-criteria/conversational-poc-success-criteria.md)
- [Firebase Conversational Page Generation POC](05-viable-proof-of-concept/firebase-conversational-page-generation-poc.md)
- [AI-Assisted Navigation and Page Generation Architecture](06-solution-design-and-architecture/conversational-page-generation-architecture.md)
- [Conversational Web App UML](06-solution-design-and-architecture/uml/conversational-web-app-uml.md)
- [Interactive Page Mockups](06-solution-design-and-architecture/mockups/README.md)
- [Conversational POC Delivery Plan](07-planning/conversational-poc-delivery-plan.md)
- [Claude First-Version Implementation Prompt](07-planning/claude-first-version-implementation-prompt.md)
- [Sprint Documentation and Governance Model](07-planning/sprint-documentation-and-governance-model.md)
- [Assistant Navigation and Generated Page Contract](08-specifications-as-code/generated-page-contract.md)
- [Firebase Conversational POC Operations](11-operational-reality/firebase-conversational-poc-operations.md)
- [Conversational POC Observability Plan](12-observability-insights-and-learning/conversational-poc-observability-plan.md)
- [Website Project Index](01-context-and-domain-analysis/website-project-index.md)
- [Website Design Specification v1](06-solution-design-and-architecture/website-design-specification-v1.md)
- [Website Development Plan v1](07-planning/website-development-plan-v1.md)
- [Website Asset Index](06-solution-design-and-architecture/website-asset-index.md)
- [Brand Usage](06-solution-design-and-architecture/brand-usage.md)
- [Brand and Graphical Asset Register](06-solution-design-and-architecture/brand-and-graphical-asset-register.md)
- [Legacy Claude Design Handoff](06-solution-design-and-architecture/reference/Elustondo.ai-Website-Design-Specification-Claude-Handoff.docx) — retained for historical reference; superseded by the canonical v1 design specification.

## Documentation map

| Step | Concern | Folder | Current website artifacts |
|---:|---|---|---|
| 01 | Context and Domain Analysis | [01-context-and-domain-analysis](01-context-and-domain-analysis/) | Project index and conversational-experience context |
| 02 | Intent | [02-intent](02-intent/) | Product vision, repository intent, conversational intent, and generated-content policy |
| 03 | System Model and Use Cases | [03-system-model-and-use-cases](03-system-model-and-use-cases/) | Actors, responsibilities, states, flows, and use cases |
| 04 | Benchmarks, Test Strategy, and Success Criteria | [04-benchmarks-test-strategy-and-success-criteria](04-benchmarks-test-strategy-and-success-criteria/) | POC acceptance and evidence strategy |
| 05 | Viable Proof of Concept | [05-viable-proof-of-concept](05-viable-proof-of-concept/) | Smallest Firebase conversational proof |
| 06 | Solution Design and Architecture | [06-solution-design-and-architecture](06-solution-design-and-architecture/) | Stable design, conversational architecture, UML, interactive page mockups, and brand/asset governance |
| 07 | Planning | [07-planning](07-planning/) | Static development plan, conversational POC delivery plan, first-version Claude implementation prompt, and sprint governance model |
| 08 | Specifications as Code | [08-specifications-as-code](08-specifications-as-code/) | Versioned assistant-action contract, route policy, generated-page contract, and HTML policy |
| 09 | Build and Test | [09-build-and-test](09-build-and-test/) | Future build records and test evidence |
| 10 | Review and Release | [10-review-and-release](10-review-and-release/) | Future review, preview, release, and DNS approval |
| 11 | Operational Reality | [11-operational-reality](11-operational-reality/) | Firebase billing, secrets, cost, privacy, preview, and rollback constraints |
| 12 | Observability, Insights, and Learning | [12-observability-insights-and-learning](12-observability-insights-and-learning/) | Privacy-safe telemetry, evaluation evidence, alerts, and learning loop |

The numbering is organizational, not a rigid waterfall. A folder's existence does not mean its concern is complete.
