# Sprint 001 Implementation Prompt — Real Website Foundation

**Prompt status:** `AUTHORIZED — READY FOR DISPATCH`
**Intended role:** Fresh Codex implementation task
**Response artifact:** `03-agent-delivered-scope-report.md`
**Historical context required:** No
**Created:** 2026-08-01
**Authorized by:** Pablo Elustondo through direct approval on 2026-08-01

This is the authorized Sprint 001 work order. Once dispatched, it is immutable. The executing agent must not edit it. Any later scope change requires a numbered correction prompt.

## Objective

Implement the first real React/TypeScript/Vite Elustondo.ai website foundation and responsive homepage, bounded to `StableShell`, with verified official branding, automated checks, and reproducible browser screens and logs.

## Repository preflight

Before editing:

1. Confirm `/Users/paboelustodo/-PROJECTS/elustondoaiweb` is the Git root.
2. Record branch, HEAD, upstream, staged state, complete status, and all untracked files.
3. Preserve unrelated work, including any pre-existing untracked `docs/sdlc2/` content.
4. Confirm the repository is the active non-Drive implementation workspace.
5. Do not read or modify the legacy Google Drive checkout as a development environment.

## Required reading order

1. `AGENTS.md`
2. `docs/02-intent/product-vision.md`
3. `docs/02-intent/repository-intent.md`
4. `docs/03-system-model-and-use-cases/conversational-page-generation-system-model-and-use-cases.md`
5. `docs/06-solution-design-and-architecture/website-design-specification-v1.md`
6. `docs/06-solution-design-and-architecture/brand-usage.md`
7. `docs/06-solution-design-and-architecture/brand-and-graphical-asset-register.md`
8. `docs/06-solution-design-and-architecture/mockups/README.md`
9. `docs/06-solution-design-and-architecture/components/component-catalog.md`
10. `docs/06-solution-design-and-architecture/components/responsibility-cards/stable-shell.md`
11. `docs/07-planning/sprint-roadmap.md`
12. this sprint's `01-sprint-plan.md`
13. this prompt

## Authorized implementation

- Scaffold a minimal React, TypeScript, and Vite application in the repository root.
- Add only the dependencies and configuration required for build, type-check, lint, tests, and proportionate accessibility verification.
- Implement `StableShell` as reusable semantic components: header, primary navigation, homepage, and footer.
- Implement working in-page navigation for the homepage sections delivered in this sprint.
- Use design tokens and restrained CSS consistent with the approved editorial direction.
- Locate and copy the canonical primary logo and appropriate icon from the controlled corporate brand collection. Record provenance. Do not redraw, regenerate, recolor, or edit the artwork.
- Use conservative reviewed repository content. Do not invent public claims, roles, links, portraits, testimonials, metrics, or project status.
- Implement desktop, tablet, and mobile behavior down to 320 CSS pixels, including an accessible mobile navigation control.
- Add automated tests for the principal component, navigation, and accessibility behaviors.
- Document how the app is installed, checked, built, and previewed without requiring Pablo to operate the toolchain personally.
- Produce the exact delivery report and evidence required by the Sprint Plan.

## Required implementation discipline

- Treat the standalone interactive mockup as a visual/state reference, not production source.
- Keep content, layout, and reusable components separated proportionately; do not introduce a CMS or premature abstraction.
- Begin with failing or absent-behavior tests where practical, then implement and rerun them.
- Keep the stable site independent of AI, Firebase, and backend availability.
- Do not create controls for unavailable secondary pages or assistant behavior unless they are non-interactive and explicitly identified as future design context.
- Do not add a routing library unless a concrete Sprint 001 requirement justifies it.
- Do not commit dependency folders, caches, secrets, uncontrolled test artifacts, or production build output unless the repository specification explicitly requires a small reviewed artifact.

## Required checks and evidence

Execute and record:

- dependency installation result;
- TypeScript type-check;
- lint;
- all automated tests;
- production build;
- local preview smoke test;
- desktop and mobile browser walkthroughs, including 320 CSS pixels;
- mobile navigation open/close and keyboard behavior;
- keyboard focus walkthrough;
- accessibility check;
- browser console inspection;
- local request/server log inspection;
- `git diff --check`, complete status, and diff summary.

Capture desktop and mobile screenshots plus browser and server logs from the same build and testing session. Clearly distinguish automated evidence, manual observation, fixture content, and unverified release behavior.

## Required response

Complete `03-agent-delivered-scope-report.md` with:

- repository, branch, baseline, and final worktree identity;
- every planned item classified as completed, partial, postponed, not implemented, changed, or replaced;
- unplanned additions;
- files and components changed;
- exact checks and observed results;
- evidence paths;
- canonical asset provenance;
- limitations, defects, and reviewer focus;
- confirmation of external actions not taken;
- final state `AWAITING_INTEGRATION_TEST` or `BLOCKED`.

## Stop and escalation conditions

Stop without substituting invented content or assets when:

- the approved primary logo cannot be verified;
- unrelated work cannot be separated safely;
- the current plan conflicts materially with authoritative specifications;
- a required tool or check cannot run and the cause cannot be isolated;
- implementation would require Firebase, credentials, billing, deployment, DNS, authentication, backend services, or scope beyond `StableShell`.

## Prohibited actions

- Do not implement assistant, backend, authentication, CMS, database, forms, payments, analytics, Firebase, deployment, or DNS behavior.
- Do not modify the Google Drive mirror.
- Do not edit this prompt after execution begins.
- Do not self-approve, perform independent integration testing, or perform independent code review.
- Do not commit, push, open a pull request, merge, publish, deploy, create credentials, change billing, or modify DNS.

## Completion boundary

Implementation ends after the delivery report and evidence are complete. Report `AWAITING_INTEGRATION_TEST`. A fresh independent task must execute the Developer Integration Test Report before code review or Pablo Manual QA.
