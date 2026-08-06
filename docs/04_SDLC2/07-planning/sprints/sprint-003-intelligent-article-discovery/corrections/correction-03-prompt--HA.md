# Sprint 003 Correction 003 — Closure Safety and Evidence

I authorize Codex to implement this exact Correction 003 work order.

## Objective

Resolve every finding CR-003-01 through CR-003-08 in the Sprint 003 Independent Code and Repository Review and return a fully verified candidate to `AWAITING_INTEGRATION_TEST`.

This authorization is limited to local implementation, tests, documentation, and evidence. It does not authorize staging, committing, pushing, changing PR #2, merging, deploying, using live cloud/provider services, changing billing, releasing, or modifying DNS.

## Repository boundary

Work only in:

- Repository: `/Users/paboelustodo/-PROJECTS/elustondoaiweb`
- Branch: `sprint-003-intelligent-article-discovery`
- Reviewed baseline: `9e0c5ec22e46f863598972ad321e07a2cdf4c66e`

Before editing:

1. Verify the Git root, branch, revision, upstream relationship, and complete staged, unstaged, and untracked state.
2. Preserve the existing uncommitted Correction 002 documentation migration and every unrelated or user-authored change.
3. Read `AGENTS.md`, all documents it identifies as mandatory, the complete Sprint 003 package, Corrections 001 and 002, and `05-code-review-report.md`.
4. Do not modify the approved Sprint Plan, original authorized implementation prompt, Correction 001 prompt, Correction 002 prompt, or Pablo’s integration-test report.
5. If the current worktree no longer matches these assumptions, or implementation requires a new product, editorial, cloud, publication, or security decision, stop and report the exact conflict.

## Required implementation

### CR-003-01 — Harden frontend source validation

- Normalize canonical strings before checking uniqueness.
- Reject whitespace-equivalent duplicate source identifiers.
- Reject whitespace-equivalent duplicate canonical URLs.
- Require the exact approved author `Pablo Elustondo`.
- Preserve the approved Medium List and canonical Medium URL boundaries.
- Preserve the previous approved snapshot after every validation failure.
- Add RED/GREEN regression tests for all these cases.

### CR-003-02 — Make curator identities collision-safe

- Preserve existing approved source identifiers already stored in curator state.
- For new articles, derive a stable unique source identifier that incorporates the stable Medium post identity.
- Reject normalized duplicate `sourceId` or `mediumPostId` values before classification or persistence.
- Add a regression test using two distinct Medium posts with the same human-readable slug.

### CR-003-03 — Enforce last-known-good persistence

- Make the current snapshot and required bounded run record one testable commit outcome.
- If any required persistence operation fails, leave the prior state current and report the run as failed.
- Prevent failure handling from recursively relying on the same failing run-log operation.
- Treat any optional secondary audit sink as explicitly best-effort.
- An optional audit failure must not turn an already committed successful run into a reported failure.
- Add failure-injection tests for state-save, required run-record, and optional audit-sink failures.

### CR-003-04 — Validate persisted curator state

- Implement a bounded runtime schema for `CuratorState`.
- Validate schema version, approved collection, canonical Medium URL, exact author, identifiers, dates, approved pillars, classification completeness, pending-removal data, and run-summary limits.
- Apply validation to local-file and Firebase Storage loads before orchestration consumes the state.
- Reject invalid, stale, corrupt, or adversarial state without replacing the last-known-good state.
- Add local-store and Firebase-adapter contract tests.

### CR-003-05 — Correct Home article ordering

- Replace the unsafe `indexOf` subtraction with an explicit deterministic priority mechanism.
- Preserve the reviewed Sprint 002 priority order.
- Place unknown or newly approved identifiers after reviewed identifiers.
- Add a test proving that an unknown identifier cannot displace the reviewed first three Home articles.

### CR-003-06 — Make content refresh portable

- Make `pnpm content:refresh` work across every Node.js family declared in the root package.
- Remove its dependency on Node.js 24 automatic TypeScript stripping.
- Use an existing compatible workspace runner or remove the runtime TypeScript import.
- Do not add a dependency when an appropriate checked-in runner already exists.
- Add a command-level compatibility regression check.

### CR-003-07 — Make the two-cycle demonstration reproducible

- Make every default `pnpm curator:local:twice` invocation start with fresh isolated demonstration state.
- Every invocation must independently demonstrate pending removal followed by confirmed removal.
- Running the command twice consecutively must produce the complete demonstration both times.
- Retain an explicit safe option for persistent local state where useful.
- Do not weaken the existing `curator:local` diagnostic behavior unintentionally.

### CR-003-08 — Reconcile evidence and maintained paths

- Update maintained application metadata and its test from `docs/SDLC2/SDLC2.md` to `docs/04_SDLC2/SDLC2.md`.
- Update the Sprint evidence index to distinguish:
  - Pablo’s completed product/curator integration test;
  - the still-required Correction 002/003 integration retest;
  - the completed independent review that produced `CHANGES REQUIRED`.
- Preserve historical reports in their original historical voice.
- Record exact verification results, remaining accepted boundaries, specification ambiguities, and applicable SDLC2 learning.

## Required verification

Run and record:

1. Frozen workspace installation with no lockfile changes.
2. Frontend and backend TypeScript checks.
3. Repository lint with no warnings or errors.
4. Complete frontend and backend automated tests.
5. Frontend and backend production builds.
6. Focused failure-injection tests for every storage, validation, and identity boundary changed.
7. `curator:local:twice` twice consecutively, with both invocations independently demonstrating pending and confirmed removal.
8. `content:refresh` compatibility across the declared Node.js runtime families, or equivalent reproducible compatibility evidence.
9. Markdown relative-link validation.
10. Correction 002 SDLC2 corpus-preservation validation.
11. Git whitespace validation for the combined, staged, and unstaged diffs.
12. Production-preview browser QA at 320, 390, 768, 1024, and 1440 CSS pixels.
13. Keyboard focus, mobile navigation, normal routes, not-found behavior, and Articles journeys.
14. Browser console and network inspection.
15. Confirmation of no horizontal overflow and no visitor-time Medium, Gemini, or other provider requests.

Do not reuse earlier green results as proof for cases that were not executed after this correction.

## Explicit exclusions

Do not:

- change approved public editorial content or branding;
- connect curator state to the visitor runtime;
- make live Medium URL-context, Gemini, Firebase Storage, or other provider calls;
- bind or provision Firebase resources;
- execute Cloud Scheduler, IAM, secrets, credentials, billing, or production operations;
- introduce a new endpoint, assistant, generated-page feature, authentication, database, CMS, analytics, payment, or voice feature;
- stage, commit, push, modify PR #2, resolve GitHub review threads, merge, deploy, release, or change DNS.

## Required output and stopping point

Create:

`docs/04_SDLC2/07-planning/sprints/sprint-003-intelligent-article-discovery/corrections/correction-03-agent-response--AI.md`

The response must contain:

- the exact delivered scope;
- files changed;
- tests added;
- complete verification results;
- any deviations or unresolved findings;
- confirmation that excluded actions were not performed;
- the remaining independent approval gates.

Only update current Sprint records to `AWAITING_INTEGRATION_TEST` if every authorized change and required verification passes.

Then stop.

A fresh independent integration test, independent code review, Pablo’s final Sprint disposition, and all Git or release actions remain separate gates.
