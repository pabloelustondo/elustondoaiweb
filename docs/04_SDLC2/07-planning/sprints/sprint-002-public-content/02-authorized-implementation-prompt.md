# Sprint 002 Implementation Prompt — Public Content

**Status:** `DRAFT — NOT AUTHORIZED FOR EXECUTION`

This filename is the canonical work-order location required by the governance model. Its present contents are a proposal. It becomes immutable and executable only after Pablo explicitly approves the exact Sprint Plan, approved content inventory, and this prompt.

## Proposed work order

Repository:

`/Users/paboelustodo/-PROJECTS/elustondoaiweb`

Implement Sprint 002 — Public Content following the repository's `AGENTS.md`, SDLC² governance, approved Sprint Plan, Public Content Source and Publication Policy, and Static Content Model Responsibility Card.

### Preflight

Before changing files:

1. Verify the repository path, Git root, current branch, baseline commit, remote relationship, and worktree state.
2. Read `AGENTS.md` and its complete mandatory reading list.
3. Read the complete Sprint 002 package, the public-content policy, the Static Content Model card, and the content inventory approved with this work order.
4. Preserve all unrelated and user-authored work. Stop if the worktree contains changes that cannot safely coexist with this sprint.
5. Do not edit this prompt after execution begins.

### Goal and boundary

Build typed reviewed static content and permanent routes for Home, Articles, Projects, Methods, People, About, and Contact. Integrate the Static Content Model with `StableShell` while preserving the approved Sprint 001 design, responsive behavior, and accessibility.

Use Medium, LinkedIn, and official Git project repositories only as provenance and approved destinations represented by reviewed local records. Do not fetch, scrape, mirror, or synchronize their content at visitor runtime.

### Required behavior

- Implement the routes and acceptance criteria in `01-sprint-plan.md`.
- Render only records included in the approved content inventory.
- Ensure private and awaiting-review material cannot reach public output.
- Never link a private repository or expose private source metadata.
- Use approved sanitized summaries for `PUBLIC_SUMMARY_ONLY` projects.
- Do not infer people roles or biographies from LinkedIn.
- Omit unresolved content rather than inventing it.
- Preserve the direct email contact model unless the approved inventory says otherwise.
- Add an accessible not-found route and preserve skip-link focus on all pages.
- Keep permanent content usable without AI or external content services.

### Required checks

Use a controlled RED/GREEN sequence where practical:

1. Add failing tests for new route, navigation, content-publication, containment, and accessibility expectations.
2. Implement the smallest coherent solution that makes those tests pass.
3. Run the frozen dependency installation.
4. Run the complete type-check, lint, automated-test, and production-build suite.
5. Run the production preview and verify direct entry, refresh, Back/Forward, primary navigation, mobile navigation, not-found behavior, and skip-link focus.
6. Verify at 320, 390, 768, 1024, and 1440 CSS pixels with no horizontal document overflow.
7. Verify the two principal visitor journeys using only approved records.
8. Confirm from browser and request logs that permanent pages do not depend on runtime Medium, LinkedIn, or GitHub content requests.
9. Retain proportionate screenshots, console output, request logs, test results, and build evidence under the Sprint 002 evidence index.

### Documentation and delivery

- Update content-maintenance and architecture documentation affected by the implementation.
- Record every planned item as completed, partial, postponed, not implemented, changed, or replaced in `03-agent-delivered-scope-report.md`.
- Disclose all unplanned additions, fixtures, omissions, known limitations, and content dependencies.
- Record the exact repository, branch, baseline, working revision, files changed, checks executed, evidence paths, and authorization-sensitive actions that did or did not occur.

### Prohibited scope

Do not implement AI features, a backend, automatic external synchronization, a CMS, database, authentication, forms, analytics, payments, Firebase configuration, provider credentials, billing changes, deployment, or DNS changes.

Do not fabricate people, roles, biographies, projects, claims, metrics, images, external links, downloads, testimonials, or publication approval.

### Stop state

After implementation verification and the delivered-scope report are complete, stop at:

`AWAITING_INTEGRATION_TEST`

Do not perform or claim independent integration testing, code review, Sprint approval, commit, push, pull request, merge, deployment, Firebase work, credential work, billing changes, or DNS changes.

