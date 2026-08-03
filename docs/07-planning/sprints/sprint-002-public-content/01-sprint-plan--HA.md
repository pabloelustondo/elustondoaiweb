# Sprint 002 Plan — Public Content --HA

**Status:** `APPROVED — AUTHORIZED FOR IMPLEMENTATION`
**Pablo Manual QA required:** Yes
**Release relationship:** R2 — Complete Public Corporate Site
**Principal component:** Static Content Model
**Integration boundary:** `StableShell` permanent routes
**Approved source:** [Elustondo.ai — Sprint 002 Approval Package --HA](https://docs.google.com/document/d/1PKKdsI2e7xQjA7MsacOb53lCMd9JFkfipcdaMmibYZQ)

## Sprint goal

Implement typed reviewed static content and permanent Articles, Projects, Methods, People, About, and Contact routes while preserving the approved Sprint 001 design and preventing unreviewed, private, or automatically synchronized material from reaching public output.

## Visitor journeys

1. A prospective client, evaluator, recruiter, partner, or collaborator reviews the company, experience, people, projects, methods, and contact information.
2. A reader or knowledge seeker discovers approved articles, methods, and project material.

Neither journey requires registration, AI, or a runtime connection to an external content source.

## Authorized component boundary

Sprint 002 may affect:

- typed Static Content Model records and tests;
- `StableShell` routing, navigation, shared page layout, and page presentation;
- permanent Home, Articles, Projects, Methods, People, About, and Contact pages;
- an accessible branded not-found page;
- homepage selections, footer links, and cross-links required to reach permanent destinations;
- documentation and evidence directly required for this sprint.

## Deliverables

1. Typed records for approved articles, projects, methods, people, company information, contact information, and external destinations.
2. An explicit, testable publication and project-disclosure boundary.
3. Stable routes for `/`, `/articles`, `/projects`, `/methods`, `/people`, `/about`, and `/contact`.
4. A shared permanent-page layout consistent with the Sprint 001 editorial design.
5. Navigation, homepage selections, footer, and cross-links that use permanent routes.
6. Static Medium article metadata and canonical links without visitor-time fetching.
7. Public project links selected through the approved GitHub list; private project summaries only when separately approved and sanitized.
8. SDLC² as the only Methods pillar, using `docs/SDLC2.md`.
9. The four approved People names and LinkedIn destinations without unsupported roles or biographies.
10. Accurate documentation and evidence.

## Acceptance criteria

### Content and privacy

- Every rendered record is permitted by `00-content-approval-register--HA.md`.
- The site contains no private repository URL, path, source material, confidential detail, unapproved fixture, or unresolved claim.
- Public repositories are selected; their contents are not mirrored automatically.
- Article pages use reviewed static metadata and canonical Medium destinations without runtime Medium fetching.
- No runtime request to Medium, LinkedIn, or GitHub is required to render the site.
- No download is included.

### Routes and behavior

- `/`, `/articles`, `/projects`, `/methods`, `/people`, `/about`, and `/contact` render on direct entry and refresh.
- Browser Back and Forward behavior works.
- Primary navigation identifies the current destination accessibly.
- The mobile menu remains keyboard-operable and closes appropriately after navigation.
- The skip link transfers focus to the main content on every route.
- Unknown routes receive an accessible branded not-found page with a route to Home.

### Design and accessibility

- The approved Sprint 001 official branding, quiet editorial identity, typography, spacing, focus treatment, and responsive character are preserved.
- Heading order, landmarks, page titles, link purpose, focus behavior, and current-page indication are meaningful.
- No horizontal document overflow occurs at 320, 390, 768, 1024, or 1440 CSS pixels.
- Reduced-motion preferences remain respected.

### Engineering and evidence

- Frozen dependency installation, type checking, linting, automated tests, and production build pass.
- Tests cover route rendering, navigation, current-page state, content publication, private-project containment, mobile navigation, not-found behavior, and skip-link focus.
- Production-preview evidence covers both principal journeys, direct entry, refresh, Back and Forward, viewport behavior, console output, and runtime independence from external content sources.

## Non-goals

- AI assistant UI, generated-page canvas, model calls, or assistant endpoint;
- backend services, automatic synchronization, CMS, database, authentication, member editing, forms, newsletters, analytics, payments, or persistent visitor state;
- Architecture as a Method pillar;
- unapproved downloads or private-project disclosure;
- Firebase configuration, deployment, credentials, billing changes, or DNS changes.

## Authorization boundary

- Implementation and the frozen dependency installation are authorized only by the immutable prompt in `02-authorized-implementation-prompt--HA.md`.
- Independent integration testing, code review, Sprint approval, commit, push, pull request, merge, deployment, Firebase work, credentials, billing, and DNS are not authorized.
- Implementation must stop at `AWAITING_INTEGRATION_TEST`.
