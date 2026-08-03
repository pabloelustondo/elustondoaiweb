# Sprint 003 Plan — Intelligent Article Discovery --HA

## Purpose

Define the first intelligent Elustondo.ai content capability: a controlled process that imports canonical metadata for approved Medium articles, organizes the material by editorial pillar or subject, publication time, and explainable relevance, and publishes a stable article-discovery experience without making visitor requests depend on Medium.

**Review convention:** Yellow = awaiting human review; red = correction required; light blue = human approved.

**Status:** `HUMAN APPROVED — READY FOR IMPLEMENTATION`
**Google Docs review copy:** <https://docs.google.com/document/d/1mPG13kAlSbQr2vfdqw-A56ksaGSj-JU3LplFtSs5sG0>
**Human review required:** Complete
**Pablo Manual QA required:** Yes
**Release relationship:** R2 — Complete Public Corporate Site; knowledge foundation for later assistant releases
**Principal components:** `ArticleSourceSnapshot`, `ArticleTaxonomy`, and `ArticleRanker`
**Integration boundary:** Static Content Model and the permanent Articles experience

## Problem

Sprint 002 stores a small, manually reviewed article snapshot. That is sufficient for a static baseline, but it does not scale to Pablo's growing body of writing and it can preserve stale metadata when a Medium title changes.

A reader should not face one undifferentiated chronological list. Elustondo.ai must help people discover:

- the latest writing;
- articles related to a specific editorial pillar or subject;
- canonical or especially important material;
- relevant follow-on reading;
- the original Medium destination and trustworthy publication metadata.

This organization must be useful and intelligent without becoming opaque, fragile, or dependent on a live Medium request whenever a visitor opens the page.

## Sprint goal

Implement a controlled article-ingestion and curation foundation plus an improved Articles experience that:

1. imports or refreshes canonical metadata from an explicitly approved Medium source collection;
2. stores a versioned local snapshot used for public rendering;
3. classifies articles using an approved editorial-pillar and subject taxonomy;
4. presents a primary pillar-and-relevance area and a separate strictly chronological latest area;
5. uses transparent ranking signals and deliberate editorial overrides;
6. preserves provenance, correction, accessibility, responsiveness, and graceful failure.

## Product relationship

This sprint supports the knowledge-seeker journey directly and improves the engagement-evaluation journey indirectly by making Elustondo.ai's ideas, methods, and expertise easier to understand.

It is also the first planned content-intelligence layer. Later assistants, news curation, and project portals may reuse its taxonomy, source records, provenance, and ranking concepts, but those capabilities are not delivered by this sprint.

## Approved implementation decisions

Pablo's approval establishes:

1. the canonical source is the Medium list **Elustondo.ai** at <https://medium.com/@pabloelustondo/list/elustondoai-dd60f27687ee>;
2. list membership authorizes public indexing; records outside the list are excluded;
3. the initial pillars are **SDLC²**, **Architecture**, and **Modernization**; no additional pillar may be invented;
4. an article may belong to multiple approved pillars or subjects;
5. `canonical` identifies a tone-setting pillar article, `featured` is an explicit editorial priority, and `relevant` must have an inspectable reason;
6. Pablo owns editorial overrides for this sprint;
7. refresh is an explicit developer-run operation; scheduled and visitor-time refreshes are excluded;
8. Sprint 003 uses explicit editorial assignments and deterministic, explainable rules. Live AI-provider classification is postponed and requires separate approval.

## Articles screen organization

The Articles screen has two visibly separate areas because relevance and publication time answer different questions.

### Primary area — Pillars and relevance

The default area uses stable Elustondo.ai editorial pillars. Each pillar presents:

- the pillar name and concise definition;
- one tone-setting or canonical article first, when one exists;
- supporting articles ordered by explainable relevance.

Pillar navigation remains stable while its articles update from the controlled source snapshot.

The initial approved classifications are:

- **SDLC²:** Responsibility-Driven Design or Wirfs-Brock and SOLID.
- **Architecture:** the practical local-LLM article.
- **Modernization:** the legacy FX payment-system article.

The Three Amigos article remains `Unclassified` until Pablo assigns it to an approved pillar. A future canonical SDLC² article may become that pillar's tone-setting article after publication and inclusion in the approved Medium list.

### Secondary area — Latest by time

A separate Medium-like stream is ordered strictly by canonical publication time, newest first. Relevance, featured status, and editorial importance never alter this order.

### Supporting navigation

Subjects, related-reading links, filters, and later question-driven navigation may supplement the two areas; they must not combine relevance and chronology into one ranking.

## Journeys and update behavior

- **Explore a pillar:** start with its canonical article, when available, then continue through supporting articles ordered by relevance.
- **Browse the latest:** read approved publications in strict newest-first order.
- **Continue reading:** follow related suggestions justified by shared pillars, subjects, or explicit editorial relationships.
- **Incorporate new writing:** add a new approved article to the chronological stream by date and to pillar areas by classification and relevance. Traceable editorial overrides survive later refreshes.

## Proposed component boundary

### `ArticleSourceSnapshot`

Owns controlled import and the stable local representation of approved Medium metadata. It identifies records durably, validates changed or malformed data, preserves the last known good snapshot, produces a reviewable diff, and stays outside the visitor request path.

### `ArticleTaxonomy`

Owns approved pillars, subjects, classification provenance, and manual overrides. It supports multiple classifications when approved, distinguishes editorial decisions from deterministic proposals, and uses `Unclassified` rather than inventing a category. Live AI-assisted classification is postponed.

### `ArticleRanker`

Owns explainable ordering. It orders `Latest` strictly by canonical publication time; orders pillar and related material from approved signals and explicit editorial decisions; and provides deterministic ties and inspectable rationale instead of one opaque universal score.

### Articles experience

Owns accessible presentation of the local snapshot: primary pillar-and-relevance discovery, a separate latest-by-time stream, and optional supporting paths. Exact labels and layout require design review and must preserve the quiet editorial direction.

## Proposed article record

Each normalized record should retain:

- **Identity and provenance:** stable identifier, canonical title and Medium URL, author, publication time, source collection, and refresh time.
- **Editorial metadata:** approved summary, pillars, subjects, canonical or featured flags, and explicit related-article identifiers.
- **Governance:** classification origin and rationale, editorial overrides, human-review time, and publication state.

The final schema belongs in the authorized implementation prompt and tests; this list is a responsibility proposal, not an implementation prescription.

## Refresh and publication model

```text
Approved Medium source collection
→ controlled refresh process
→ metadata validation, taxonomy, and relevance processing
→ editorial overrides and reviewable diff
→ versioned local snapshot
→ automated checks
→ public Articles experience
```

Visitors read the local snapshot; they never wait for Medium or an AI provider. A failed refresh preserves the last known good index, and changed metadata appears in a reviewable diff.

## Proposed acceptance criteria

### Source integrity

- Every public article originates in the approved source boundary.
- The snapshot records canonical title, URL, author, and publication time accurately.
- Duplicate, malformed, missing, changed, and refresh-failure cases produce explicit results without losing the last known good snapshot.
- No Medium request is made during visitor page rendering.

### Organization and authority

- Every article is classified into approved pillars or subjects or explicitly marked `Unclassified`.
- Latest ordering is deterministic and date-based; pillar and related ordering is explainable.
- Canonical, featured, and override states are explicit editorial metadata and survive refresh.
- No opaque model output is treated as publication authority.

### Experience and evidence

- The Articles page presents pillar-and-relevance discovery as its primary area and a separate strictly chronological latest area.
- Canonical Medium destinations remain clear.
- Empty, partial, refresh-failure, and unclassified states are understandable.
- The design is accessible, keyboard-operable, responsive down to 320 CSS pixels, and consistent with the approved editorial system.
- The site remains fully usable without Medium or an AI service being available.
- Frozen dependency installation, type checking, linting, automated tests, and production build pass.
- Automated coverage includes import, normalization, duplicates, ordering, classification, overrides, and failures.
- Browser evidence covers principal journeys and supported widths.
- Network evidence confirms no visitor-time dependency on Medium or an AI provider.
- The delivery report distinguishes imported facts, deterministic results, editorial overrides, fixtures, and postponed work.

## Expected RED/GREEN sequence

1. Define and implement `ArticleSourceSnapshot` through RED/GREEN tests for normalization, duplicates, metadata changes, and refresh failure.
2. Define and implement `ArticleTaxonomy` through RED/GREEN tests for classification, `Unclassified`, provenance, and override persistence.
3. Define and implement `ArticleRanker` through RED/GREEN tests for chronology, pillar relevance, related reading, and deterministic ties.
4. Define and integrate the Articles experience through RED/GREEN browser or component tests, then refactor only while the full suite remains green.

## Explicit non-goals

- visitor-time Medium fetching or uncontrolled external mirroring;
- a news aggregator, open-web crawler, Pena agent, or project application routes;
- conversational assistant UI, generated-page canvas, or model-driven navigation;
- accounts, personalization, persistent history, CMS, database, or member administration;
- automatic publication of unapproved or unsupported AI-generated material;
- Firebase deployment, provider credentials, billing, production release, or DNS changes.

The news aggregator and project portal remain future directions. Sprint 003 creates reusable content-intelligence foundations without implementing those products.

## Dependencies and risks

- Medium capabilities, formats, and terms may not support the selected source boundary reliably.
- Material outside the approved Medium list must not enter the public snapshot.
- Titles, dates, and canonical URLs may change or differ across feeds and visible story pages.
- Taxonomy and relevance can become inconsistent or opaque without clear ownership and signals.
- AI-assisted classification introduces provider, credential, cost, privacy, reproducibility, and approval risks.

Implementation must use the smallest safe refresh mechanism consistent with the approved Medium-list boundary.

## Stop conditions

Stop planning or implementation and request Pablo's direction if:

- the approved Medium-list boundary cannot be verified or the permitted access method is unclear;
- implementation would require a new pillar, unsupported classification, or relevance authority beyond Pablo's approved rules;
- implementation requires an unapproved provider, credential, billing, Firebase, or deployment action;
- imported data could overwrite manual decisions or publish without a reviewable diff;
- the Sprint 002 disposition changes the assumed Static Content Model boundary.

## Authorization boundary

- This `--HA` document and its paired `--HA` implementation prompt authorize only the bounded Sprint 003 implementation described here.
- They authorize frozen dependency installation and the local build, test, browser, accessibility, and evidence work required by the prompt.
- They do not authorize commits, pushes, pull requests, merges, deployment, live AI-provider calls, credentials, billing, Firebase work, production release, or DNS changes.
- Implementation must stop at `AWAITING_INTEGRATION_TEST`; independent integration testing, code review, and sprint approval remain separate gates.
