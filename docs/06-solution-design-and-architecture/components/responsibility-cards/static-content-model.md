# Static Content Model Responsibility Card

**Status:** Sprint 002 approved architectural baseline
**Implementation state:** Implemented, independently tested, and human approved

## Purpose

Provide typed, reviewable local records for the permanent Elustondo.ai pages without introducing a database, CMS, runtime external feed, or publication ambiguity.

## Owns

- local records for articles, projects, methods, people, company information, contact destinations, downloads, and site metadata;
- stable record identifiers, route associations, ordering, summaries, and publication state;
- typed distinctions between internal routes, approved external destinations, and approved downloads;
- project publication classifications: `PUBLIC_REPOSITORY`, `PUBLIC_SUMMARY_ONLY`, and `PRIVATE`;
- traceability from website records to an authoritative source and recorded approval;
- deterministic content supplied to permanent pages and later approved source-pack work.

## Does not own

- automatic Medium, LinkedIn, or Git synchronization;
- scraping or reproducing complete external profiles or repositories;
- deciding whether private material may be published;
- inventing biographies, roles, claims, metrics, project status, links, images, or summaries;
- content-management authentication or editorial workflow;
- route rendering, layout, navigation controls, or visual design;
- AI retrieval, prompt construction, generation, or source-pack approval.

## Collaborators and dependency direction

- `StableShell` consumes approved static records and owns routes and presentation.
- Human content owners and Pablo approve wording, links, downloads, consent, and project disclosure.
- Future `ApprovedSourcePack` may consume a separately reviewed projection of these records; it must not broaden their publication authority.

The content model must not depend on external services during visitor requests. External URLs are destinations and provenance, not runtime data dependencies.

## Inputs

- approved Medium publication metadata;
- LinkedIn-derived professional information confirmed by the person represented;
- official public or private Git project sources interpreted through the publication policy;
- approved company and methodology documentation;
- approved, versioned downloadable files and brand assets.

## Outputs and public contracts

- typed immutable records suitable for deterministic static rendering;
- collections filtered so `PRIVATE`, `AWAITING_REVIEW`, and unapproved material cannot appear in production page output;
- stable slugs or route identifiers for Articles, Projects, Methods, People, About, and Contact;
- validated internal, external, email, and download destinations;
- source and approval metadata sufficient for review without exposing private sources to visitors.

## Authority and trust boundaries

- Existence in Medium, LinkedIn, Git, Drive, or project documentation is evidence of a source, not website-publication approval; membership in an explicitly approved source list may provide that authority.
- Public Git repositories are still curated rather than mirrored.
- Private Git repositories remain private; only an explicitly approved sanitized summary may cross the boundary.
- LinkedIn information requires person-specific confirmation for its website representation.
- Only approved PDF versions may be copied into public assets.

## Failure and uncertainty outcomes

- Reject or omit records missing required approval, canonical destination, or classification.
- Do not render private records or private-source locations.
- Report broken, malformed, duplicated, or unsupported destinations during verification.
- If required wording or consent is unresolved, retain the item as `NEEDS_REVIEW` outside production output rather than filling the gap.

## Test seams and acceptance evidence

- type-level and schema-level validation of content records;
- tests proving private and unapproved records do not reach public collections;
- route and link tests for every approved record;
- page-render tests for empty, minimal, and complete approved collections;
- build and browser evidence showing permanent routes work without network content retrieval;
- review evidence connecting displayed claims, links, and downloads to approved inventory entries.

## Relevant specifications

- [Public Content Source and Publication Policy](../../../01-context-and-domain-analysis/public-content-source-and-publication-policy.md)
- [Sprint 002 Content Approval Register --HA](../../../07-planning/sprints/sprint-002-public-content/00-content-approval-register--HA.md)
- [Product Vision](../../../02-intent/product-vision.md)
- [Repository Intent](../../../02-intent/repository-intent.md)
- [Website Development Plan v1](../../../07-planning/website-development-plan-v1.md)
- [Sprint 002 Plan --HA](../../../07-planning/sprints/sprint-002-public-content/01-sprint-plan--HA.md)
