# Elustondo.ai

This repository contains the visitor-facing Elustondo.ai application, the scheduled Article Curator backend, and the documentation used to understand, change, and operate them.

## Website and ASDG

- [Elustondo.ai](https://elustondo.ai/) is the public site for the practice, its writing, methods, and selected projects.
- [Introducing ASDG](https://www.youtube.com/watch?v=yb4ggoYQrtw) is the 2:12 introduction to the Agentic Software Development Governance Project.
- [ASDG on GitHub](https://github.com/Elustondo-ai/asdg) holds the methodology and its tooling. The [ASDG playlist](https://www.youtube.com/playlist?list=PLQ5UBReAns0Q) collects the selected videos.
- The [ASDG video distribution notes](docs/04_SDLC2/01-context-and-domain-analysis/asdg-video-distribution--AI.md) document the Methods placement and publishing workflow.

## Repository map

| Area | Responsibility |
|---|---|
| [`frontend/`](frontend/) | Visitor-facing React and Vite website. |
| [`backend/article-curator/`](backend/article-curator/) | Scheduled Article Curator implemented for Firebase Functions. |
| [`docs/01_SystemDefinition/`](docs/01_SystemDefinition/README_ai.md) | What Elustondo.ai is, why it exists, its actors, capabilities, journeys, rules, and boundaries. |
| [`docs/02_DeveloperGuide/`](docs/02_DeveloperGuide/README_ai.md) | How developers install, run, test, build, and safely operate the current system. |
| [`docs/03_Architecture/`](docs/03_Architecture/README_ai.md) | What the current architecture is, why its boundaries exist, and which proposals remain future work. |
| [`docs/04_SDLC2/`](docs/04_SDLC2/README_ai.md) | How the system changes: intent, specifications, sprint governance, evidence, and learning. |
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

The aggregate checks run both workspace packages. See the [Developer Guide](docs/02_DeveloperGuide/README_ai.md) for package-specific commands, safe curator operation, configuration, and gated deployment interfaces.

## Governance and identity

Read [`AGENTS.md`](AGENTS.md) before material work. SDLC2 sprint records and their human-approval boundaries remain under [`docs/04_SDLC2/07-planning/`](docs/04_SDLC2/07-planning/).

Canonical brand masters remain in the controlled corporate Brand & Marketing collection. Files under [`frontend/public/assets/`](frontend/public/assets/) are approved build-time copies, not competing masters.
