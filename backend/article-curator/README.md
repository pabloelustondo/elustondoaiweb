# Article Curator

The Article Curator is the scheduled backend component introduced in Sprint 003. Its current production composition is a Firebase scheduled function using LangChain and Gemini; its policy and state-transition logic remain deterministic and independently testable.

## Responsibility

Every 15 minutes, the configured function can:

1. load the last-known-good curator state;
2. discover exact membership of Pablo Elustondo's approved Medium list;
3. cross-check metadata against Pablo's Medium profile feed;
4. detect additions, changes, and removals;
5. classify only new or changed records with the approved taxonomy while preserving editorial overrides;
6. require the same removal set twice before applying removals;
7. save validated state and a bounded run record;
8. log the outcome without exposing secrets.

The committed offline fixture removes the former Three Amigos item. After two consecutive local observations, the catalog contains the expected four articles. This restructure does not add an `AI Philosophy` taxonomy or alter the three approved pillars: `SDLC²`, `Architecture`, and `Modernization`.

## Package map

- `src/index.ts` — Firebase 15-minute schedule wrapper.
- `src/article-curator/` — contracts, orchestration, source, classifier, persistence, bootstrap state, and tests.
- `src/local-runner.ts` and `src/local-fixtures.ts` — credential-free deterministic execution.
- `lib/`, `.local/`, `coverage/`, and `node_modules/` — ignored generated or local-only material.

Use the root commands `pnpm backend:typecheck`, `pnpm backend:lint`, `pnpm backend:test`, and `pnpm backend:build`. `pnpm curator:local:twice` is the safe offline demonstration; it does not call Medium, Gemini, Firebase, or a production schedule.

The package-local lockfile and `pnpm-workspace.yaml` are retained so the Firebase-uploaded source remains a reproducible pnpm build project. The root lockfile separately coordinates the complete repository workspace.

See the [Developer Guide](../../docs/DeveloperGuide/README.md), [maintained architecture](../../docs/Architecture/README.md), and [Sprint 003 architecture record](../../docs/SDLC2/06-solution-design-and-architecture/medium-article-curator-and-langchain-architecture--AI.md).
