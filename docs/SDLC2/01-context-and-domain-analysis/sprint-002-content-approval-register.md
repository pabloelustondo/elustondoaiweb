# Sprint 002 Content Approval Register

**Status:** Working inventory; entries marked `NEEDS_REVIEW` are not authorized for public rendering
**Owner and publication authority:** Pablo Elustondo
**Last updated:** 2026-08-02

## How to use this register

This register identifies the exact public-content decisions needed before Sprint 002 implementation is authorized. It does not copy external material and does not approve a candidate merely by listing it.

An entry becomes `APPROVED` only after its website wording, destination, assets, disclosure classification, and consent requirements have been reviewed. Implementation must exclude entries that remain `NEEDS_REVIEW`, `PRIVATE`, or `POSTPONED`.

## Articles

Medium is the expected publication authority for complete articles. The website will store reviewed static metadata and a canonical destination; it will not retrieve Medium content during a visitor request.

| Candidate | Current state | Required before approval |
|---|---|---|
| Specification-driven AI-assisted software engineering | `NEEDS_REVIEW` | Confirm exact Medium title, author, canonical URL, publication date, website summary, topics, and approved image |
| Responsibility-driven design for the agentic AI era | `NEEDS_REVIEW` | Confirm exact Medium title, author, canonical URL, publication date, website summary, topics, and approved image |
| Simple context architecture for personal multi-agent systems | `NEEDS_REVIEW` | Confirm exact Medium title, author, canonical URL, publication date, website summary, topics, and approved image |

Additional Medium articles may be proposed, but each requires the same review. Listing every Medium publication is not a Sprint 002 requirement.

## Projects

Git repositories and controlled project documentation establish the official project source. The website publishes a deliberately selected representation.

| Candidate | Proposed classification | Current state | Required before approval |
|---|---|---|---|
| Elustondo.ai website | `PUBLIC` | `NEEDS_REVIEW` | Approve public summary, repository destination, selected architecture/method claims, status wording, and any screenshots or diagrams |
| VISTA | Undecided | `NEEDS_REVIEW` | Decide `PUBLIC`, `PUBLIC_SUMMARY_ONLY`, `PRIVATE`, or `AWAITING_REVIEW`; then approve only the permitted summary, claims, assets, and links |
| Any other official project | Undecided | `NEEDS_REVIEW` | Identify the official Git source and make a project-specific publication decision before drafting the website record |

No private repository URL, internal path, source material, or identifying project detail may be copied into a public record.

## Methods

| Candidate | Current state | Required before approval |
|---|---|---|
| SDLC² | `NEEDS_REVIEW` | Approve public name, concise explanation, maturity/status wording, related article or document destinations, and any diagram/download |
| Responsibility-Driven Design | `NEEDS_REVIEW` | Approve public explanation, relationship to agentic systems, and related article or resource |
| Specification-driven work | `NEEDS_REVIEW` | Approve public explanation and relationship to evidence-led delivery |
| Evidence-led delivery | `NEEDS_REVIEW` | Approve public explanation of plan, implementation claim, independent checks, review, and human approval |
| SOLID 2.0 | `NEEDS_REVIEW` | Decide whether it belongs in Sprint 002 and approve its public definition before inclusion |

## People

LinkedIn is the expected professional-information source. Every website profile still requires direct confirmation and publication consent from the represented person.

| Candidate | Current state | Required before approval |
|---|---|---|
| Pablo Elustondo | `NEEDS_REVIEW` | Approve Elustondo.ai relationship/role, concise biography, specialties, LinkedIn URL, photograph choice, and optional résumé PDF |
| Santiago Elustondo | `NEEDS_REVIEW` | Approve Elustondo.ai relationship/role, concise biography, specialties, LinkedIn URL, photograph choice, and optional résumé PDF |
| Rodrigo Elustondo | `NEEDS_REVIEW` | Approve Elustondo.ai relationship/role, concise biography, specialties, LinkedIn URL, photograph choice, and optional résumé PDF |
| Williams Martinez | `NEEDS_REVIEW` | Approve Elustondo.ai relationship/role, concise biography, specialties, LinkedIn URL, photograph choice, and optional résumé PDF |

The site must not infer any person's company role from LinkedIn or reuse a full LinkedIn profile as website copy.

## About and company information

| Item | Current state | Current reviewed boundary or required decision |
|---|---|---|
| Public brand: Elustondo.ai | `APPROVED` | Established by repository intent and Sprint 001 |
| Legal operator: Elustondo Systems Consulting Inc. | `APPROVED` | Established by repository intent and Sprint 001 |
| Location: Toronto, Canada | `APPROVED` | Established by Sprint 001 |
| High-level purpose and editorial position | `APPROVED` | May be derived without expanding claims from Product Vision, Repository Intent, and Sprint 001 copy |
| Expanded company history | `NEEDS_REVIEW` | Draft and approve before publication |
| Detailed services and capability claims | `NEEDS_REVIEW` | Select exact services and approve evidence-supported wording |

## Contact and external destinations

| Item | Current state | Required before approval |
|---|---|---|
| `pablo@elustondo.ai` direct email | `APPROVED` | Retain the Sprint 001 direct email path |
| Company or personal LinkedIn destinations | `NEEDS_REVIEW` | Confirm exact canonical URLs and intended labels |
| Medium publication/profile destination | `NEEDS_REVIEW` | Confirm exact canonical URL and intended label |
| GitHub organization or profile destination | `NEEDS_REVIEW` | Confirm exact canonical URL and intended scope |
| Meeting link or additional contact destination | `POSTPONED` | Include only through a later explicit decision |

## Downloads

| Candidate type | Current state | Required before approval |
|---|---|---|
| Résumé or professional-profile PDF | `NEEDS_REVIEW` | Identify exact owner and file, review public contents, assign version/date, approve filename and display metadata |
| Capability statement | `NEEDS_REVIEW` | Identify or create controlled publication file and approve its complete contents |
| Paper, diagram, or presentation | `NEEDS_REVIEW` | Select exact public artifact, verify rights and confidentiality, and approve version and metadata |

## Minimum authorization decision

Sprint 002 implementation may begin with a deliberately small approved set. Pablo may:

1. approve selected records after their missing metadata is supplied;
2. postpone unresolved records without inventing substitutes;
3. authorize the page and filtering architecture with empty-state behavior for a category whose public records are not yet ready.

The authorized implementation prompt must reference the revision of this register that contains the final bounded set.

