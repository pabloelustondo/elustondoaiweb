# Sprint 003 Correction 003 Proposed Prompt — Closure Safety and Evidence --AI

**Proposal date:** 2026-08-05
**Status:** `PROPOSED — NOT AUTHORIZED`
**Source:** [Sprint 003 independent code and repository review](../05-code-review-report.md)
**Authority:** This AI-authored proposal becomes executable only if Pablo explicitly approves this exact work order.

## Objective

Resolve every blocking Sprint 003 code-review finding, reconcile the current evidence, and return one corrected candidate to `AWAITING_INTEGRATION_TEST` without connecting the curator to the public runtime or performing any cloud, provider, Git, release, or DNS action.

## Starting boundary

1. Work only in `/Users/paboelustodo/-PROJECTS/elustondoaiweb` on `sprint-003-intelligent-article-discovery`.
2. Verify the Git root, branch, revision, upstream relationship, and complete staged/unstaged/untracked state before editing.
3. Preserve the current Correction 002 documentation work and all unrelated or user-authored changes.
4. Read `AGENTS.md`, its mandatory breadth-first and decision documents, the Sprint 003 package, Corrections 001 and 002, and `05-code-review-report.md` before implementation.
5. Do not modify the human-approved Sprint Plan, original implementation prompt, Correction 001 prompt, Correction 002 prompt, or Pablo's integration report.
6. If the observed worktree no longer matches these assumptions or a change would require a new product, cloud, or publication decision, stop and record the exact blocker.

## Authorized implementation scope after Pablo's approval

### 1. Harden the frontend article snapshot boundary

- Normalize canonical strings before duplicate comparison.
- Reject whitespace-equivalent duplicate source identifiers and canonical URLs.
- Require the exact approved author `Pablo Elustondo`.
- Preserve the approved Medium List and canonical Medium URL boundaries.
- Keep the previous approved snapshot unchanged on every validation failure.
- Add RED/GREEN tests for wrong author, normalized duplicate identifiers, normalized duplicate URLs, malformed input, and last-known-good preservation.

### 2. Make curator identities collision-safe

- Preserve existing approved source identifiers already present in curator state.
- Derive a stable unique source identifier for a new Medium article using its stable Medium post identity.
- Reject any duplicate normalized `sourceId` or `mediumPostId` before classification or persistence.
- Add RED/GREEN tests with two distinct posts that share a human-readable slug.

### 3. Enforce the last-known-good storage contract

- Make the required current snapshot and bounded run record one testable commit outcome.
- A failed required persistence operation must leave the prior state current and report failure.
- Do not let failure of an optional secondary audit sink convert an already committed state into a failed-run claim.
- Ensure failure handling does not recursively depend on the same failing append operation.
- Add RED/GREEN tests for state-load validation failure, state-save failure, required run-record failure, and optional audit-sink failure.

### 4. Validate persisted state at runtime

- Add a bounded runtime schema for `CuratorState`, including schema version, approved collection, canonical Medium URL, exact author, stable identifiers, dates, approved pillars, classification completeness, pending-removal structure, and run-summary limits.
- Apply it to local-file and Firebase Storage loads before orchestration consumes the state.
- Reject invalid persisted state without replacing it or weakening the public bundled snapshot boundary.

### 5. Make local and review commands reproducible

- Make each default `pnpm curator:local:twice` invocation start from a fresh isolated fixture state and demonstrate pending then confirmed removal.
- Retain an explicit safe path for a developer who deliberately wants a persistent local directory.
- Make `pnpm content:refresh` work throughout the root package's declared Node.js range without relying on Node.js 24 type stripping.
- Do not add a new dependency if the checked-in workspace already contains a suitable runner.

### 6. Correct deterministic frontend fallback order

- Preserve the reviewed Sprint 002 Home article priority.
- Place newly approved identifiers not in that priority after the reviewed entries using a deterministic fallback.
- Add a regression test proving an unknown identifier cannot displace the reviewed first three merely because `indexOf` returns `-1`.

### 7. Reconcile current paths and evidence

- Update the maintained Method metadata path and its test to `docs/04_SDLC2/SDLC2.md`.
- Update the Sprint evidence index to distinguish Pablo's completed product/curator integration test from the still-required Correction 002/003 retest.
- Record the correction response, exact check results, remaining accepted boundaries, and any specification ambiguity or SDLC2 improvement.
- Preserve historical documents in their original historical voice.

## Required verification

Run and record:

1. frozen workspace installation;
2. frontend and backend type checking;
3. repository lint;
4. all frontend and backend automated tests;
5. frontend and backend production builds;
6. a fresh two-cycle curator demonstration twice in succession, with both invocations independently showing pending then confirmed removal;
7. content refresh through a runtime path compatible with every declared root Node.js family, or equivalent reproducible compatibility evidence;
8. Markdown relative-link validation;
9. Correction 002 corpus-preservation validation;
10. Git whitespace validation for combined, staged, and unstaged diffs;
11. production-preview browser QA at 320, 390, 768, 1024, and 1440 CSS pixels, including keyboard focus, mobile navigation, routes, not-found behavior, Articles journeys, browser logs, horizontal overflow, and absence of visitor-time Medium or provider requests.

Add focused failure-injection tests for every storage and identity condition in this correction. Do not treat the existing green fixture suite as evidence for cases it did not execute.

## Explicitly excluded

- changing public editorial content or approved branding;
- consuming curator state in the visitor runtime;
- live Medium URL-context or Gemini calls;
- Firebase project binding, Storage operations, scheduler execution, IAM, secrets, credentials, resource provisioning, or billing;
- a new endpoint, assistant interface, generated-page implementation, authentication, database, CMS, analytics, payment, or voice feature;
- commit, staging, push, PR mutation, review-thread resolution, merge, deployment, release, or DNS action.

## Required output and stop state

Create `correction-03-agent-response--AI.md` with an exact delivered-scope and evidence claim. Update current Sprint status records to `AWAITING_INTEGRATION_TEST` only after every required check passes.

Stop there. A fresh independent integration test, code review, Pablo approval, and any Git or release action remain separate gates.
