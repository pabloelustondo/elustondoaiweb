# Sprint 001 Plan — Real Website Foundation

**Status:** `APPROVED — READY FOR IMPLEMENTATION DISPATCH`
**App-facing:** Yes
**Pablo Manual QA required:** Yes
**Historical context required:** No
**Created:** 2026-08-01
**Approved by:** Pablo Elustondo through direct approval on 2026-08-01

## Problem

Elustondo.ai currently has comprehensive specifications and an interactive standalone mockup, but it does not yet have a real application source tree, production build, reusable components, automated checks, or application evidence. The mockup can illustrate states but cannot become the production website or prove application behavior.

## Sprint goal

Create the first real static Elustondo.ai web application foundation and a responsive homepage that can be built, tested, and run from the repository. The result must use the approved design hierarchy and canonical brand assets, remain useful without AI, and produce reproducible screens and logs for human review.

## Relevant product intent and use cases

This sprint establishes the permanent anonymous foundation for:

- a prospective client evaluating Elustondo.ai's services and experience;
- a knowledge seeker discovering articles, methods, projects, and people;
- later assistant capabilities that must integrate without owning the stable shell.

It does not implement the complete content journeys or an assistant.

## Authorized component and integration boundary

Primary component: [`StableShell`](../../../06-solution-design-and-architecture/components/responsibility-cards/stable-shell.md).

Supporting boundary: repository build-and-test foundation needed to compile and verify `StableShell`.

## Current behavior

- The repository contains documentation and a standalone interactive HTML mockup.
- The mockup is served as a static file and simulates states.
- There is no React/TypeScript/Vite application, production build, automated app test, or app-specific browser/build evidence.
- Approved logo masters are documented but are not currently present as build-time repository assets.

## Desired behavior

- The repository contains a conventional React, TypeScript, and Vite static application.
- A real homepage renders through reusable semantic components.
- The header, navigation, main content, and footer work without AI or backend services.
- Navigation uses working in-page targets for the Sprint 001 homepage; future page routes are not faked.
- The layout is usable and coherent at desktop, tablet, 390-pixel, and 320-pixel widths.
- The application is keyboard operable and exposes appropriate landmarks, headings, labels, focus states, and reduced-motion behavior.
- The application can be built and previewed reproducibly with no browser-console errors.

## Authorized scope

1. Scaffold the React/TypeScript/Vite application in the active non-Drive repository.
2. Add a minimal, reviewable package and tool configuration for build, type-check, lint, tests, and local preview.
3. Create a small design-token layer based on approved brand and design documentation.
4. Copy verified canonical build-time logo/icon assets from the controlled corporate brand collection; record their source and do not edit their internal artwork.
5. Implement reusable `Header`, `PrimaryNavigation`, `HomePage`, and `Footer` components.
6. Implement homepage sections for introduction, selected writing, current work, methods, people, editorial note, and contact action using reviewed or explicitly development-only static content.
7. Add responsive behavior and a mobile navigation control.
8. Add proportionate component/navigation/accessibility-oriented automated tests.
9. Add a reproducible local run and evidence process.
10. Update repository usage documentation and the Sprint 001 delivery report.

## Explicit non-goals

- Secondary permanent pages or a routing framework unless needed solely for correct shell structure.
- Live article feeds, external research, CMS, database, authentication, user accounts, forms, payments, analytics, or persistent state.
- Assistant Panel, Generated Page Canvas, model calls, backend endpoints, Firebase Functions, provider credentials, or live AI.
- Firebase configuration, preview deployment, production deployment, billing, domain changes, or DNS work.
- New or redrawn official logos, invented portraits, biographies, roles, client claims, testimonials, metrics, project status, or external links.
- Reusing the interactive mockup wrapper as production application code.

## Acceptance criteria

### Structure and behavior

- A fresh checkout can install dependencies, type-check, lint, test, build, and preview using documented project scripts.
- The production build emits static browser assets.
- The homepage uses reusable semantic components and working navigation targets.
- The stable site functions with network access disabled after its local assets are loaded; no runtime backend dependency is introduced.
- No control promises a page or action that does not exist in Sprint 001.

### Brand and content

- The header uses the canonical `Elustondo.ai-Logo-Primary` asset copied without alteration from the controlled source.
- The asset source and copied filename are recorded.
- No approximate, generated, candidate, draft, archived, or redrawn logo is used.
- Public-facing claims and people information are either already reviewed or explicitly marked as development-only fixtures and excluded from release claims.

### Responsive and visual

- The hierarchy remains coherent at approximately 1440, 1024, 768, 390, and 320 CSS pixels.
- There is no unintended horizontal overflow, clipped interactive content, stretched imagery, or unreadable navigation.
- Mobile navigation opens, closes, exposes state accessibly, and supports keyboard use.

### Accessibility

- One clear page-level heading and valid landmark hierarchy.
- Keyboard access to every interactive control with visible focus.
- Accessible navigation naming and mobile-control state.
- Meaningful logo alternative text.
- Sufficient base contrast and reduced-motion support.
- Automated accessibility checks report no serious or critical issue in the tested homepage state.

### Verification

- Type-check, lint, automated tests, and production build pass.
- Browser console has no errors or warnings attributable to the application.
- Local HTTP requests for the tested application return successful responses with no missing required asset.
- Desktop and mobile screenshots and corresponding browser/server logs come from the same build and testing session.

## Expected checks

- dependency installation in the active non-Drive implementation repository;
- TypeScript type-check;
- lint;
- automated unit/component tests;
- production build;
- local preview or static-server smoke test;
- browser interaction at desktop and narrow widths;
- keyboard and focus walkthrough;
- automated accessibility scan where supported;
- browser-console and local-request log inspection;
- repository diff and broken-link review.

Exact commands are selected during implementation according to the scaffold and recorded in the delivery report; passing commands must be executed, not merely proposed.

## Required evidence

- test, type-check, lint, and build outputs;
- local preview URL and exact tested revision/worktree state;
- desktop and mobile screenshots;
- browser console and local server request logs from the same session;
- keyboard/accessibility notes;
- list and provenance of copied canonical assets;
- implemented-versus-postponed scope classification;
- complete Git status and diff summary.

Evidence belongs under [`evidence/`](evidence/README.md) or in concise linked reports. Do not commit dependency directories, caches, uncontrolled build output, secrets, or private information.

## Dependencies and assumptions

- Node.js and a package manager are available to the implementation agent in the active local repository or an approved CI environment. Pablo does not need to install or operate them personally.
- The canonical primary logo and icon can be located and copied from the controlled Brand & Marketing collection.
- Homepage wording will be conservative and derived from reviewed repository documents.
- The implementation agent can use the current interactive mockup as a visual reference, not as production source.

## Stop conditions

Stop and report `BLOCKED` without inventing a substitute if:

- the canonical logo source cannot be verified;
- repository state contains unrelated changes that cannot be separated safely;
- required tool installation would modify the Google Drive mirror instead of the active local repository;
- the specifications conflict materially about the Sprint 001 boundary;
- a check cannot be executed or its failure cannot be distinguished from an environment problem;
- work would require credentials, billing, deployment, DNS, or expanded product scope.

## Authority status

- Planning-package creation: authorized by Pablo on 2026-08-01.
- Implementation: authorized for a fresh Codex implementation task executing the exact approved prompt.
- Dependency installation in the active non-Drive repository: proposed within the implementation authorization.
- Commit, push, pull request, merge, publish, Firebase deployment, provider credentials, billing, production promotion, and DNS: not authorized.
