# Elustondo.ai Developer Guide

This guide explains how to work with the current repository. Product intent, sprint authorization, and historical evidence remain in [SDLC²](../SDLC2/README.md); current system boundaries and rationale are in [Architecture](../Architecture/README.md).

## Prerequisites

- Node.js `^20.19.0`, `^22.13.0`, or `>=24.0.0` for the repository and frontend tooling.
- Node.js 22 for the configured Firebase Functions runtime.
- pnpm 11.9 or newer; the repository declares pnpm 11.9.0.
- Firebase CLI only for explicitly authorized emulator or deployment work.

Install the complete workspace from the repository root with `pnpm install --frozen-lockfile`. The root lockfile coordinates `frontend` and `backend/article-curator`. The curator also retains its package-local lock and pnpm build approvals because Firebase uploads that component as an independent Functions source project.

## Workspace orientation

- [`frontend/`](../../frontend/) owns the stable visitor-facing React/Vite application and its reviewed static content.
- [`backend/article-curator/`](../../backend/article-curator/) owns scheduled Medium discovery, LangChain/Gemini classification, state transitions, persistence adapters, and logs.
- [`scripts/`](../../scripts/) contains repository-level controlled maintenance tools.
- [`docs/SDLC2/`](../SDLC2/) contains authorization, specifications, sprint evidence, and change history.

The public frontend does not fetch Medium, LinkedIn, GitHub, Gemini, or the curator during visitor requests. Its approved article snapshot is versioned under `frontend/src/content/articles/`.

## Root commands

| Command | Purpose |
|---|---|
| `pnpm frontend:dev` | Run the Vite development server. |
| `pnpm frontend:preview` | Preview the production frontend build. |
| `pnpm frontend:typecheck` | Type-check frontend source and Vite configuration. |
| `pnpm frontend:lint` | Lint the frontend package. |
| `pnpm frontend:test` | Run frontend tests. |
| `pnpm frontend:build` | Type-check and build `frontend/dist`. |
| `pnpm backend:typecheck` | Type-check the Article Curator. |
| `pnpm backend:lint` | Lint the Article Curator. |
| `pnpm backend:test` | Run backend tests. |
| `pnpm backend:build` | Compile the backend to `backend/article-curator/lib`. |
| `pnpm curator:local` | Run one deterministic offline curator observation. |
| `pnpm curator:local:twice` | Run the deterministic observation twice and apply the confirmed removal. |
| `pnpm content:refresh` | Produce a review-only frontend article candidate and diff from versioned fixtures. |
| `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm build` | Verify both workspace packages. |

Run `pnpm frontend:dev` for live development. Run `pnpm frontend:build` followed by `pnpm frontend:preview` to inspect the production output. Vite uses `frontend/` as its project root, so `/src/main.tsx` and `/assets/...` in the entry document remain package-relative.

## Safe Article Curator operation

`pnpm curator:local:twice` uses `FixtureMediumCatalogSource`, `DeterministicFixtureClassifier`, and `LocalFileCuratorStore`. It writes only ignored files under `backend/article-curator/.local/` unless `CURATOR_LOCAL_DIRECTORY` points to another local directory. It does not use credentials, call Medium or Gemini, write Firebase Storage, or invoke the production schedule.

The production composition uses:

- `CURATOR_GEMINI_MODEL` to override the default `gemini-2.5-flash-lite` model name;
- Google Cloud application identity/credentials supplied by the managed Firebase runtime;
- the default Firebase Storage bucket for curator state and run records.

Never place secret values in source, documentation, command output, fixtures, or Git. A live provider or Firebase operation requires separately approved credentials, billing, project selection, budget controls, and deployment authority.

## Firebase configuration

[`firebase.json`](../../firebase.json) maps:

- Hosting to `frontend/dist`, with an SPA fallback to `/index.html`;
- the `article-curator` Functions codebase to `backend/article-curator` on Node.js 22;
- local Functions, Storage, and emulator UI ports.

The following are documented deployment commands only. **They were not executed during the repository restructure and must not be run without explicit authorization and verified Firebase project context:**

```text
firebase deploy --only hosting
firebase deploy --only functions:article-curator
```

Deployment does not authorize production promotion, DNS changes, provider billing, credentials, or remote article-state mutation. GoDaddy and mail-related DNS remain outside normal development work.

## Maintaining dependencies and snapshots

Do not hand-edit lockfile resolution data. When package declarations change under an approved task, update the root workspace lock through normal pnpm installation. If backend dependencies change, also refresh and verify the isolated lock from `backend/article-curator/` so Firebase receives a reproducible pnpm project.

`pnpm content:refresh` writes a candidate snapshot and diff under the Sprint 003 evidence folder. It never promotes the candidate into the frontend's approved snapshot automatically.
