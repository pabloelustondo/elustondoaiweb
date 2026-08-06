# Elustondo.ai Developer Guide

> **Documentation:** [1. System Definition](../01_SystemDefinition/README_ai.md) · [2. Developer Guide](../02_DeveloperGuide/README_ai.md) · [3. Architecture](../03_Architecture/README_ai.md) · [4. SDLC2](../04_SDLC2/README_ai.md)

**Status:** AI-authored reconciliation of the reviewed Developer Guide; awaiting human review
**Last reconciled:** 2026-08-05
**Reviewed source:** [Elustondo.ai Developer Guide — Google Doc](https://docs.google.com/document/d/1KIiau4o8l8MPWa-pU0vrHGzT60qI3K1jt_oZ0Z8JVl8/edit)

## Start with the system

Read the [System Definition](../01_SystemDefinition/README_ai.md) first when you need the complete purpose, actors, capabilities, public-content rules, user journeys, and system boundaries.

Continue here for repository orientation and practical development work. Open [Architecture](../03_Architecture/README_ai.md) when you need the deeper technical rationale. Use [SDLC2](../04_SDLC2/README_ai.md) when proposing, authorizing, implementing, testing, reviewing, or investigating a change.

This guide describes the current developer workflow. A command being documented here does not itself authorize deployment, production access, credentials, billing, or DNS changes.

## Repository orientation

```text
elustondoaiweb/
├── frontend/                    visitor-facing React/Vite application
├── backend/
│   └── article-curator/         scheduled Medium Article Curator
├── docs/
│   ├── 01_SystemDefinition/     what the system is and why
│   ├── 02_DeveloperGuide/       how to work with it
│   ├── 03_Architecture/         how it is shaped and why
│   └── 04_SDLC2/                how changes are governed and evidenced
├── scripts/                     repository-level maintenance tools
├── package.json                 workspace coordination and aggregate commands
├── pnpm-workspace.yaml          frontend/backend workspace membership
├── pnpm-lock.yaml               reproducible root workspace dependencies
└── firebase.json                configured Hosting, Functions, and emulator paths
```

The root package is a coordinator, not the frontend. Install once from the repository root and use root scripts to address either package or the complete workspace.

### Frontend ownership

`frontend/` owns:

- the stable public shell and permanent routes;
- responsive and accessible browser behavior;
- reviewed static content records;
- official build-time brand assets;
- frontend tests and production output.

Important locations:

```text
frontend/src/                         maintained React/TypeScript source
frontend/src/content/                 typed reviewed public records
frontend/src/content/articles/        approved bundled article snapshot and taxonomy
frontend/public/                      approved public build-time assets
frontend/dist/                        generated production output; do not hand-edit
```

The frontend does not fetch Medium, LinkedIn, GitHub, Gemini, Firebase Storage, or the curator during a visitor request. It currently renders a version-controlled article snapshot.

### Medium Article Curator ownership

`backend/article-curator/` owns:

- scheduled curation orchestration;
- Medium-list observation and profile-feed enrichment;
- normalization and comparison with previous state;
- bounded LangChain/Gemini classification;
- editorial-override and two-observation removal rules;
- local and Firebase Storage adapters;
- run summaries and component tests.

Important locations:

```text
backend/article-curator/src/index.ts                  Firebase schedule wrapper
backend/article-curator/src/article-curator/          contracts and implementation
backend/article-curator/src/local-fixtures.ts         deterministic fixture data
backend/article-curator/src/local-runner.ts           credential-free local entry
backend/article-curator/lib/                          generated JavaScript; do not hand-edit
backend/article-curator/.local/                       ignored local curator state
```

The curator does not own visitor rendering, editorial approval, deployment authority, or the public release decision.

## Prerequisites

- Git.
- Node.js `^20.19.0`, `^22.13.0`, or `>=24.0.0` for repository tooling.
- Node.js 22 for the configured Firebase Functions runtime.
- pnpm 11.9 or newer; the repository declares pnpm 11.9.0.
- Firebase CLI only for an explicitly authorized emulator or deployment task.
- Google Cloud CLI only for explicitly authorized local cloud identity or diagnostics.

Confirm the environment when diagnosing setup problems:

```text
node --version
pnpm --version
firebase --version
gcloud --version
```

## Install once from the root

Use the root lockfile for the complete workspace:

```text
pnpm install --frozen-lockfile
```

Do not install dependencies in a Google Drive mirror. Do not run separate package installations during normal development. The backend retains its own lockfile because Firebase uploads it as an independently reproducible Functions source package; update that lock only as part of an approved dependency change.

## Work on the frontend

Start the development server from the repository root:

```text
pnpm frontend:dev
```

Run focused checks while changing the frontend:

```text
pnpm frontend:typecheck
pnpm frontend:lint
pnpm frontend:test
pnpm frontend:build
```

Inspect the production build rather than assuming the development server proves release behavior:

```text
pnpm frontend:build
pnpm frontend:preview
```

Manual frontend QA should cover:

- desktop and narrow/mobile layouts, including 320 CSS pixels;
- direct route entry, refresh, Back, and Forward;
- keyboard navigation, visible focus, mobile-menu behavior, and skip-link focus;
- current-page indication and the branded not-found route;
- browser console and failed network requests;
- absence of visitor-time calls to Medium, LinkedIn, GitHub, Gemini, or the curator.

## Work on the Article Curator

Run focused backend checks before aggregate repository checks:

```text
pnpm backend:typecheck
pnpm backend:lint
pnpm backend:test
pnpm backend:build
```

### Safe local execution

`pnpm curator:local` must be safe by construction:

```text
pnpm curator:local
```

It uses fixture-backed Medium data, a deterministic classifier, and a local file store. By default it writes only ignored files beneath `backend/article-curator/.local/`. It must not require production credentials, call Medium or Gemini, write Firebase Storage, invoke a deployed schedule, or change public frontend content.

The two-cycle demonstration exercises conservative removal:

```text
pnpm curator:local:twice
```

Each default invocation creates fresh isolated temporary state, then removes it after the demonstration. The first observation marks a missing article as pending. The second identical observation applies the removal. Running the command again independently repeats both stages. The resulting four-article fixture is a regression signal for the current scenario, not an eternal business rule and not proof of the live Medium list.

Set `CURATOR_LOCAL_DIRECTORY` to an explicit local directory only when persistent diagnostic state is useful. `pnpm curator:local` retains its existing ignored `.local/` state behavior.

If a local fixture run attempts production access, treat that as a safety defect and stop.

### Review-only frontend refresh

```text
pnpm content:refresh
```

This repository tool compares versioned fixtures with the approved frontend snapshot and writes review evidence under the Sprint 003 evidence folder. It runs through the checked-in `tsx` loader, so it does not depend on Node.js 24 automatic TypeScript stripping and remains compatible with every Node.js family declared by the root package. It does not promote a candidate into the public application automatically.

## Verify the complete workspace

After focused package checks pass, run the aggregate commands:

```text
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

These commands cover both workspace packages. They do not deploy anything.

## Configuration and secrets

The production curator composition currently reads one explicit application setting:

- `CURATOR_GEMINI_MODEL` optionally overrides the default Gemini model name.

The intended deployed function uses Google Cloud managed runtime identity for Firebase Storage and Gemini access. The Firebase project, default Storage bucket, region, schedule, model access, quotas, and billing are operational concerns that must be verified in the authorized environment; source code alone does not establish them.

Never place credentials, tokens, private keys, or secret values in:

- Git or source files;
- documentation or sprint evidence;
- fixtures and tests;
- terminal transcripts, screenshots, or logs.

Prefer managed identity in Firebase. Application Default Credentials may be used for a specifically authorized local cloud task, but authentication only establishes identity. It does not grant task authorization, editorial approval, deployment approval, billing approval, or permission to touch production data.

Only when an authorized task explicitly requires local Google Cloud identity should this interface be used:

```text
gcloud auth application-default login
```

Do not run it as a routine setup step.

## Firebase emulators

`firebase.json` currently maps:

- Hosting to `frontend/dist`, with the single-page application fallback to `/index.html`;
- the `article-curator` Functions codebase to `backend/article-curator` on Node.js 22;
- local Functions, Storage, and emulator UI ports.

The current scheduled function composes the production Medium, Gemini, and Firebase Storage adapters. Starting or invoking that function in an emulator is therefore **not** a safe fixture-backed curator test and could reach live services if identity and access are available.

For an explicitly authorized Hosting-only emulator exercise, build the frontend and start only Hosting:

```text
pnpm frontend:build
firebase emulators:start --only hosting
```

Use `pnpm curator:local` for safe curator verification. Do not invoke the Functions emulator until a fixture-backed emulator composition is implemented or the exact live-adapter boundary, Storage emulator, credentials, project, and external calls are separately authorized and verified. Emulator success is not production evidence.

## Deployment is a gated interface

The repository exposes these deployment interfaces:

```text
pnpm build
firebase deploy --only hosting
firebase deploy --only functions:article-curator
firebase deploy
```

They are not normal development commands. Before any deployment, require all of the following that apply:

- explicit human authorization for the exact target and revision;
- verified Firebase project context;
- frozen installation and passing focused plus aggregate checks;
- safe curator dry-run evidence;
- configuration, identity, secrets, quota, billing, and security review;
- non-production browser and operational QA;
- a rollback and observation plan.

Deployment does not by itself authorize production promotion, public DNS changes, mail-record changes, live model usage, or editorial publication.

## Normal change workflow

1. Read [System Definition](../01_SystemDefinition/README_ai.md) for current purpose and boundaries.
2. Read `AGENTS.md` and the relevant SDLC2 intent, specification, benchmark, plan, and authorized prompt.
3. Confirm the Git root, branch, baseline, upstream relationship, and worktree state.
4. Identify the owning component and the smallest coherent change.
5. Preserve unrelated and user-authored work.
6. Add or update deterministic tests and fixtures where the authorized behavior requires them.
7. Run focused component checks, then aggregate checks.
8. Run safe local curator or browser verification when relevant.
9. Record claims and evidence in the applicable SDLC2 sprint package.
10. Update System Definition, Architecture, or this guide only when accepted operational reality changed.

An implementation agent may report what it changed, but it cannot independently approve its own work.

## Maintained source and generated artifacts

Maintain source files and configuration; regenerate outputs through their owning tools.

Do not hand-edit:

- `frontend/dist/`;
- `backend/article-curator/lib/`;
- coverage output;
- `node_modules/`;
- tool caches;
- ignored local curator state.

Do not commit generated dependencies or caches. Build output is evidence only when a task explicitly asks to preserve it.

## Troubleshooting

### A package cannot resolve a dependency

Confirm that installation was run once from the root with the frozen lockfile and that the declared Node and pnpm versions are supported. Do not repair the symptom by adding an unreviewed second installation.

### Hosting serves the wrong files

Confirm that `firebase.json` points to `frontend/dist` and that `pnpm frontend:build` completed. Do not point Hosting at maintained source.

### Firebase cannot find the function package

Confirm that the Functions source remains `backend/article-curator`, that its build passes, and that its package-local lock remains reproducible.

### The local curator touches a network or cloud service

Stop. The fixture-backed local path must be independent of Medium, Gemini, Firebase, credentials, and the production schedule.

### Documentation links break after a move

Update maintained inbound paths and validate relative links without adding an unapproved dependency. The repository currently has no versioned Markdown-link command, so record the review method and result in the applicable delivery report. Preserve historical prompt wording when it records an old path as evidence rather than an active instruction.

### A cloud command authenticates successfully

Do not infer authorization. Verify the approved task, target project, data boundary, billing boundary, and allowed mutation before proceeding.

## New-developer confidence check

A new developer should be able to demonstrate, from the repository root:

```text
pnpm install --frozen-lockfile
pnpm typecheck
pnpm lint
pnpm test
pnpm build
pnpm curator:local
git diff --check
git status --short
```

Confidence means:

- both packages pass their maintained checks;
- the frontend remains a static visitor experience with no visitor-time external dependency;
- the curator local path has no production side effects;
- Firebase paths match the responsibility-oriented repository layout;
- generated artifacts and uncommitted changes are understood rather than ignored;
- no deployment or production claim is made from local verification alone.

## Where to go next

- [System Definition](../01_SystemDefinition/README_ai.md) — complete system context.
- [Architecture](../03_Architecture/README_ai.md) — technical boundaries, patterns, failure behavior, and trade-offs.
- [SDLC2](../04_SDLC2/README_ai.md) — authorization, specifications, sprint history, tests, review, evidence, and learning.
