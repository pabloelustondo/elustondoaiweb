# Sprint 004 Proposed Implementation Prompt — Deterministic Assistant Experience --AI

**Proposal date:** 2026-08-05
**Status:** `PROPOSED — NOT AUTHORIZED`
**Authority:** Execute only after Pablo explicitly approves this exact prompt and [the Sprint Plan](01-sprint-plan--AI.md).

## Mission

Implement the bounded Sprint 004 Deterministic Assistant Experience from fixed local fixtures. Deliver the real Assistant Panel, shell-owned navigation validation, contract guard, approved-source validation, generated-page sanitizer, and scriptless Generated Page Canvas without adding an endpoint or making any external, provider, Firebase, credential, or production call.

## Mandatory preconditions

1. Read `AGENTS.md` and every mandatory breadth-first and decision document it lists.
2. Read the complete Sprint 004 package and the final approved Sprint 003 disposition.
3. Verify the repository path, Git root, branch, revision, upstream, and staged/unstaged/untracked state.
4. Require a clean approved Sprint 003 integration baseline unless Pablo has explicitly approved a different exact starting state.
5. Preserve unrelated and user-authored work. Do not repair unrelated debt.
6. Confirm that this Plan and prompt carry Pablo's explicit authorization. A `DRAFT` or `PROPOSED` file is not executable authority.
7. If the baseline, authority, approved content, or durable documents conflict, stop and record the exact blocker.

## Implementation requirements

### 1. Contract and fixtures

- Implement a TypeScript representation of generated-page contract version `0.2` for the six allowed actions.
- Create a deterministic local adapter with reviewed positive fixtures for navigation, generated page, clarification, insufficient information, policy refusal, and service unavailable.
- Create test-only malformed fixtures for invalid version, status/action pairing, multiple actions, missing/extra fields, unknown route/source, oversize, prohibited markup, event attributes, executable URL, and external resource.
- Do not use random, time-dependent, network, model, or browser-storage behavior to select fixture results. Stable request identifiers may be deterministic fixture identifiers.
- Label the experience as a deterministic preview so it cannot be mistaken for live AI.

### 2. Assistant Panel

- Add a clearly separated, dismissible Assistant Panel to the permanent Stable Shell.
- Provide a labelled bounded text input, reviewed example suggestions, submit/refine controls, trusted status messages, and source/limitation disclosure.
- Keep session state local, bounded, and in memory only. Do not persist prompts or results.
- Preserve every permanent route, normal navigation, skip link, mobile menu, not-found behavior, document title, history behavior, and current-page indication.
- Use predictable focus and status-announcement behavior without trapping keyboard users or stealing focus on every update.

### 3. Response guard and Site Navigator

- Treat every fixture response as untrusted.
- Require exactly contract version `0.2`, one allowed action, an allowed status/action pair, bounded fields, and action-specific required/prohibited fields.
- Validate every route identifier and anchor against a shell-owned allow-list.
- Validate every source identifier against the selected approved local source pack.
- Reject arbitrary URLs and external navigation authority.
- Perform navigation only after validation through `SiteNavigator` and the existing shell history behavior.
- Fail closed to a trusted invalid-output state; never render partial candidate HTML.

### 4. Approved source pack

- Reference only already approved local public content with stable identifiers, titles, routes, bounded excerpts, and approval state.
- Do not fabricate or expand biographies, roles, client claims, metrics, project status, credentials, external facts, or links.
- Keep unsupported current or open-web questions in the insufficient-information fixture path.

### 5. Sanitizer and Generated Page Canvas

- Sanitize generated-page fixture HTML with a strict allow-list derived from contract version `0.2`.
- Remove or reject scripts, styles supplied by the candidate, metadata, embedded documents, SVG/MathML/canvas, forms and controls, media, images, external resources, event handlers, unreviewed attributes, executable/data URLs, arbitrary destinations, and page-level `h1` content.
- Do not add a dependency. Use reviewed platform APIs and small explicit code unless Pablo separately authorizes a dependency change.
- Render only the sanitized result in a sandboxed `iframe` `srcdoc` or equivalent isolated document boundary.
- Omit script, same-origin, form, popup, download, and top-navigation permissions.
- Let the shell add only trusted wrapper styling and a restrictive no-network frame policy.
- Keep sources, limitations, retry/dismiss controls, navigation, and contact actions in trusted parent-shell UI.

### 6. Styling and accessibility

- Preserve the quiet, serious editorial visual system and official logo usage.
- Keep both primary anonymous journeys obvious with the assistant open or closed.
- Reflow the panel and canvas cleanly at 320, 390, 768, 1024, and 1440 CSS pixels.
- Preserve semantic headings, one shell-owned page `h1`, visible focus, keyboard operation, sufficient contrast, reduced motion, and zoom-friendly layout.
- Do not create a chatty floating widget that obscures content or permanent navigation.

### 7. RED/GREEN verification

Add failing tests first where practical, then implement until green. Cover:

1. exact positive response fixtures for all six actions;
2. version, status/action, required/prohibited field, size, route, anchor, and source validation;
3. arbitrary URL and unknown destination rejection;
4. sanitizer element, attribute, URL, heading, and external-resource policy;
5. sandbox permissions and no candidate HTML in the parent shell;
6. deterministic navigation, Back/Forward, current-page state, and focus;
7. panel open/close, suggestions, input bound, clarification/refinement, trusted errors, and dismissal;
8. permanent-site fallback when the assistant is unavailable;
9. accessibility checks for shell, panel, outcome states, disclosures, and canvas labelling;
10. no visitor-time assistant endpoint, Medium, provider, or Firebase request.

Run the complete suite:

- frozen workspace installation;
- frontend and backend type checking;
- repository lint;
- all frontend and backend tests;
- frontend and backend builds;
- Git whitespace checks.

Run production-preview browser QA at 320, 390, 768, 1024, and 1440 CSS pixels. Exercise every permanent route, not-found state, six positive fixtures, representative negative fixtures, panel and mobile-menu keyboard behavior, focus, history, responsive layout, console logs, and local network requests.

## Documentation and evidence

1. Create `03-agent-delivered-scope-report.md` with exact completed, partial, postponed, omitted, changed, and unplanned scope.
2. Add concise reproducible evidence under the Sprint 004 package.
3. Update maintained component and architecture documentation only for responsibilities that are actually implemented.
4. Keep endpoint, provider, Firebase, credentials, rate limits, budgets, telemetry, and deployment explicitly proposed or future.
5. Record specification ambiguity, prompt quality, claim discrepancies, evidence gaps, and proposed SDLC2 improvements.

## Prohibited actions

Do not:

- add an assistant endpoint or server runtime;
- call a model, provider, Medium, open web, Firebase Function, Firebase Storage, Firestore, or Authentication;
- add credentials, secrets, IAM, rate limits, quotas, budgets, analytics, telemetry retention, payments, forms, accounts, protected applications, persistent history, voice, or generated applications;
- alter approved branding or fabricate public content;
- connect the visitor site to curator state;
- stage, commit, push, mutate a PR, resolve review threads, merge, deploy, release, change billing, or modify DNS.

## Required stop state

When implementation and implementation-agent evidence are complete and all authorized checks pass, update the current Sprint 004 manifest and registry to:

`AWAITING_INTEGRATION_TEST`

Stop. Do not perform or claim independent integration testing, code review, Sprint approval, Git integration, deployment, release, or DNS action.
