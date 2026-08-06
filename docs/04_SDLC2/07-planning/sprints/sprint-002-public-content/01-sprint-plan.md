# Sprint 002 Plan — Public Content

**Status:** `DRAFT — NOT AUTHORIZED`
**Pablo Manual QA required:** Yes
**Release relationship:** R2 — Complete Public Corporate Site
**Principal component:** Static Content Model
**Integration boundary:** `StableShell` permanent routes

## Problem

Sprint 001 provides a responsive, accessible homepage foundation, but its navigation still targets homepage sections and much of its writing, work, methods, and people material is deliberately limited or development-only. The two primary anonymous journeys require permanent destinations where a visitor can evaluate the practice or learn from reviewed material.

## Sprint goal

Implement the typed static-content foundation and permanent Articles, Projects, Methods, People, About, and Contact routes while preserving the approved Sprint 001 design and preventing unreviewed, private, or automatically synchronized material from reaching public output.

## Product intent and use cases

The sprint supports:

1. A prospective client, evaluator, recruiter, partner, or collaborator reviewing services, experience, people, projects, methods, and contact information.
2. A reader or knowledge seeker discovering selected articles, methods, project lessons, and downloadable resources.

Neither journey requires registration. The website must remain fully useful without AI.

## Authorized component boundary

Sprint 002 may affect:

- the Static Content Model and its tests;
- `StableShell` routing, navigation, shared page layout, and page presentation needed to consume approved records;
- permanent Articles, Projects, Methods, People, About, and Contact pages;
- approved public assets and downloads explicitly included in the final authorized inventory;
- documentation and automated checks directly required for this scope.

## Current and desired behavior

Current:

- navigation uses in-page homepage anchors;
- secondary destinations are not permanent pages;
- article themes are development-only previews;
- only the Elustondo.ai website is described as current work;
- detailed people profiles and professional links are intentionally omitted;
- no approved download collection is present.

Desired:

- every primary destination has a stable local route and meaningful page title;
- navigation works by direct entry, ordinary links, browser history, refresh, keyboard, and mobile menu;
- approved records are stored in typed local modules and rendered deterministically;
- Medium, LinkedIn, and Git serve as authoritative sources without becoming runtime content feeds;
- private, awaiting-review, and unapproved records cannot appear in production output;
- homepage selections link coherently to the permanent content;
- missing approved content is omitted honestly rather than invented.

## Proposed deliverables

1. Define typed records for articles, projects, methods, people, external links, downloads, company information, and site metadata where required by approved content.
2. Establish explicit publication state and project-disclosure classification in the model or an equivalently testable publication boundary.
3. Add stable routes for `/articles`, `/projects`, `/methods`, `/people`, `/about`, and `/contact`, while preserving `/` as Home.
4. Add a shared permanent-page layout consistent with the Sprint 001 editorial system.
5. Update header, homepage selections, footer, and cross-links to use permanent routes.
6. Render only the content entries that Pablo approves before implementation authorization.
7. Support approved Medium and LinkedIn destinations as external links without fetching their content at visitor runtime.
8. Support approved public-project links and approved sanitized private-project summaries without exposing private repositories.
9. Include approved résumé or resource PDFs only if the exact file and publication metadata are authorized.
10. Update repository documentation for content maintenance, provenance, and publication review.

## Acceptance criteria

### Content and privacy

- Every displayed person, role, biography, project claim, external URL, and download appears in the approved content inventory.
- No `PRIVATE`, `AWAITING_REVIEW`, `NEEDS_REVIEW`, or unapproved fixture record is rendered in production pages.
- A private project can appear only as an approved `PUBLIC_SUMMARY_ONLY` record and never exposes its repository or private-source location.
- Public repositories are represented selectively; the site does not mirror repository contents.
- Article presentation uses reviewed static metadata and canonical Medium destinations without runtime Medium fetching.
- People presentation uses explicitly approved website profiles and LinkedIn links; it does not infer company roles from LinkedIn.

### Routes and behavior

- `/`, `/articles`, `/projects`, `/methods`, `/people`, `/about`, and `/contact` render the intended page on direct navigation and refresh.
- Browser Back and Forward behavior works.
- Primary navigation identifies the current destination accessibly.
- The mobile menu remains keyboard-operable and closes appropriately after navigation.
- The skip link transfers focus to the main content on every permanent route.
- Unknown routes receive an accessible, branded not-found experience with a route back to Home.
- Contact remains a direct email path unless additional destinations are explicitly approved.

### Design and accessibility

- The quiet editorial Sprint 001 identity, official logo, typography, spacing, focus treatment, and responsive character are preserved.
- Heading order, landmarks, page titles, link purpose, focus behavior, and current-page indication are meaningful.
- No horizontal document overflow occurs at 320, 390, 768, 1024, or 1440 CSS pixels.
- Reduced-motion preferences remain respected.
- External links and downloads are communicated clearly without unnecessary new-window behavior.

### Engineering and evidence

- Frozen dependency installation, type checking, linting, automated tests, and production build pass.
- Tests cover route rendering, navigation, current-page state, content filtering, private-project containment, and skip-link focus.
- Browser evidence covers both principal visitor journeys, direct route entry, history, refresh, external-link rendering, and any approved download.
- Console and local request logs are retained from the same tested production-preview session.
- No runtime request to Medium, LinkedIn, or GitHub is required to render permanent content.

## Content authorization dependency

Before implementation is authorized, Pablo should approve a bounded content set. Unresolved candidates may remain outside the sprint rather than blocking the entire routing and content-model increment, provided the omission is explicit.

The working decisions are maintained in the [Sprint 002 Content Approval Register](../../../01-context-and-domain-analysis/sprint-002-content-approval-register.md).

At minimum, authorization must identify:

- selected article records and canonical Medium links;
- project records and publication classifications;
- method summaries;
- approved People-page scope;
- About and Contact copy;
- every external link, photograph, and downloadable file included.

## Non-goals

- AI assistant UI, generated-page canvas, intent routing, model calls, or assistant endpoint;
- automatic Medium, LinkedIn, GitHub, or Google Drive synchronization;
- CMS, database, authentication, member editing, accounts, or protected applications;
- contact form, newsletter, analytics, payments, or persistent visitor state;
- Firebase configuration, preview deployment, production deployment, or DNS changes;
- voice, open-web research, or external-fact generation;
- publication of any unapproved private-project information.

## Stop conditions

Stop and report rather than infer when:

- an intended record lacks publication approval or a canonical source;
- person consent, role wording, project classification, or private-summary boundary is unclear;
- an approved asset or download cannot be verified;
- implementation requires a new runtime service, secret, database, billing change, or external synchronization;
- the route solution would require weakening accessibility or the approved design;
- unrelated work would need to be overwritten.

## Authorization status

- Planning documents: authorized for preparation.
- Sprint implementation: **not authorized until Pablo approves this exact plan and prompt.**
- Dependency installation: not authorized by this draft.
- Commit, push, pull request, or merge: not authorized.
- Firebase, deployment, credentials, billing, and DNS: not authorized.
