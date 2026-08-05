# Elustondo.ai

This repository contains the visitor-facing Elustondo.ai application, the scheduled Article Curator backend, and the documentation used to understand, change, and operate them.

## Repository map

| Area | Responsibility |
|---|---|
| [`frontend/`](frontend/) | Visitor-facing React and Vite website. |
| [`backend/article-curator/`](backend/article-curator/) | Scheduled Article Curator implemented for Firebase Functions. |
| [`docs/SDLC2/`](docs/SDLC2/) | How the system changes: intent, specifications, sprint governance, evidence, and learning. |
| [`docs/DeveloperGuide/`](docs/DeveloperGuide/) | How developers install, run, test, build, and safely operate the current system. |
| [`docs/Architecture/`](docs/Architecture/) | What the current architecture is, why its boundaries exist, and which proposals remain future work. |
| [`scripts/`](scripts/) | Repository-level maintenance tools that coordinate components. |

The frontend remains useful without the curator or any AI service. The Article Curator has a deterministic offline path and a deployable Firebase implementation, but this repository structure does not claim that the function is deployed or that the public frontend consumes its cloud snapshot.

## Essential commands

Use Node.js 20.19 or newer within a supported release line and pnpm 11.9 or newer. The Article Curator deploys on the Node.js 22 Firebase runtime.

```text
pnpm install --frozen-lockfile
pnpm frontend:dev
pnpm typecheck
pnpm lint
pnpm test
pnpm build
pnpm curator:local:twice
```

The aggregate checks run both workspace packages. See the [Developer Guide](docs/DeveloperGuide/README.md) for package-specific commands, safe curator operation, configuration, and deployment commands that were not executed during this restructure.

## Governance and identity

Read [`AGENTS.md`](AGENTS.md) before material work. SDLC² sprint records and their human-approval boundaries remain under [`docs/SDLC2/07-planning/`](docs/SDLC2/07-planning/).

Canonical brand masters remain in the controlled corporate Brand & Marketing collection. Files under [`frontend/public/assets/`](frontend/public/assets/) are approved build-time copies, not competing masters.
