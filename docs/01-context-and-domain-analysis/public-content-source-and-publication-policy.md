# Public Content Source and Publication Policy

**Status:** Sprint 002 planning baseline for Pablo's review
**Applies to:** Permanent public content on Elustondo.ai
**Last updated:** 2026-08-02

## Purpose

Elustondo.ai presents a deliberately selected public view of the company's writing, people, projects, methods, and resources. An authoritative source establishes the underlying facts, but source availability does not authorize automatic publication on the website.

The governing flow is:

```text
Authoritative source
→ publication and confidentiality review
→ approved static website record
→ Git review and release evidence
→ Elustondo.ai
```

The website must not scrape, mirror, or dynamically publish changes from Medium, LinkedIn, or project repositories when a visitor opens a page.

## Source-of-truth map

| Content | Authoritative source | Website representation |
|---|---|---|
| Published articles | The canonical Medium publication, unless another publication is explicitly designated | Reviewed title, summary, author, publication date, topics, image reference, and canonical URL |
| Professional information | The person's LinkedIn profile plus direct confirmation by that person | Approved name, relationship to Elustondo.ai, concise biography, selected specialties, photograph, LinkedIn URL, and optional approved download |
| Public projects | The official Git repository and controlled project documentation | A carefully selected public summary, approved claims, images, resources, and optional repository URL |
| Private projects | The private Git repository and controlled project documentation | No entry, or an explicitly approved sanitized public summary without private links or materials |
| Résumés and downloadable profiles | The approved, versioned publication PDF | Controlled static file plus owner, title, version/date, and display metadata |
| Company information | Approved corporate and project documentation | Reviewed company description, services, location, and contact information |
| Methods | Canonical methodology documentation and approved publications | Reviewed public explanation, related material, diagrams, and downloads |

## Runtime rule

Medium may remain the canonical home of a complete article, LinkedIn may remain the canonical professional profile, and Git may remain the official project record. Elustondo.ai stores only the reviewed website presentation in its repository.

This separation ensures that:

- the site remains useful when an external service is unavailable;
- only deliberately selected material appears;
- external edits do not silently alter the website;
- Git records the exact public content reviewed for a release;
- confidential or irrelevant repository material is not exposed merely because it exists.

## Project publication classifications

Every candidate project must receive one classification before implementation:

| Classification | Meaning | Website treatment |
|---|---|---|
| `PUBLIC` | The project and approved source material are public | Publish only selected, reviewed facts; link the repository only when approved |
| `PUBLIC_SUMMARY_ONLY` | The project is private, but a sanitized summary is authorized | Publish only the approved summary and approved non-confidential assets; never link the private repository |
| `PRIVATE` | The project is not authorized for public disclosure | Do not list or reference it |
| `AWAITING_REVIEW` | Publication scope has not been decided | Do not publish until Pablo records a decision |

Public repository status is not blanket permission to reproduce everything in the repository. Selection and review are still required.

## Private-project summary gate

A private-project summary may include only explicitly approved information such as:

- a generalized problem or domain;
- the team's approved responsibility;
- a non-confidential architectural approach;
- broadly stated technologies;
- engineering methods used;
- approved outcomes and transferable lessons.

It must exclude:

- unapproved client or partner identity;
- private repository links, paths, code, issues, or commit history;
- credentials, private infrastructure, security-sensitive design, or operational data;
- confidential screenshots, datasets, documents, or correspondence;
- unapproved metrics, business results, testimonials, or customer claims;
- names or identifying details without consent;
- details that defeat an intended anonymization.

## People and consent

LinkedIn is a professional source, not an automatic website feed. Each person must approve the website-specific profile, role wording, photograph, external link, and any downloadable résumé. The site must not infer an Elustondo.ai role from LinkedIn or reproduce an entire profile without review.

## Publication states

Each static content record must carry or be traceable to one of these states:

- `APPROVED` — authorized for the website wording and destinations shown;
- `NEEDS_REVIEW` — candidate material that must not be presented as production fact;
- `PRIVATE` — excluded from public output;
- `POSTPONED` — deliberately deferred to a later sprint or release.

Development fixtures, placeholders, and summaries awaiting review must remain visibly distinguishable from approved production content and must not be released accidentally.

## Sprint 002 initial inventory

| Area | Current approved foundation | Required decision or material |
|---|---|---|
| Articles | Three development-only themes appear on the Sprint 001 homepage | Select Medium articles and approve canonical metadata and links |
| Projects | Elustondo.ai website may be described from its public repository and approved documentation | Classify every additional project and approve its disclosure boundary |
| Methods | Explicit intent, responsible design, and evidence-led delivery appear on the homepage | Select and approve full public method summaries and related resources |
| People | Company identity and the existence of four intended members are documented | Each person must approve name, role, biography, photo, LinkedIn URL, and any PDF |
| About | Legal company name, public brand, Toronto location, and high-level purpose are established | Approve the expanded company narrative and services wording |
| Contact | `pablo@elustondo.ai` is the reviewed direct contact path | Decide whether any additional public destination is approved |
| Downloads | The product vision permits approved résumés, papers, presentations, and capability PDFs | Identify, version, review, and explicitly approve each file before inclusion |

## Enforcement for Sprint 002

Sprint 002 may implement the content structure and permanent routes, but it may publish only records classified `APPROVED`. When required content is unavailable, the implementation must omit it or use an explicitly labelled non-production fixture covered by test evidence. It must not invent, infer, scrape, or silently synchronize public content.

