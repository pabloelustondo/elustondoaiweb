# Sprint 002 Independent Integration-Test Evidence

**Date:** 2026-08-03
**Role:** Independent Developer Integration Tester
**Candidate:** uncommitted worktree over `97fb034b3162640fcef816169609bb0cf4947c83`
**Result:** `PASS`

## Reproducible command results

| Check | Result |
|---|---|
| `pnpm install --frozen-lockfile` | PASS — already current |
| `pnpm run typecheck` | PASS |
| `pnpm run lint` | PASS |
| `pnpm run test` | PASS — 2 files, 18 tests |
| `pnpm run build` | PASS — 17 modules transformed |

Runtime used for project commands: Node.js 24.14.0 and pnpm 11.9.0.

## Browser observations

- Browser: Google Chrome 150.0.7871.187.
- Preview: independently built production output at `http://127.0.0.1:4174/`.
- Direct entry and refresh: 8 of 8 route states passed.
- Back and Forward: Articles ↔ Projects passed.
- Current-page indication: all seven permanent routes passed.
- Mobile menu keyboard open/focus, Escape/return focus, and navigation/close passed at 320 CSS pixels.
- Skip-link keyboard focus: 8 of 8 route states focused `MAIN#main-content` and set `#main-content`.
- Horizontal overflow: 0 CSS pixels in all 40 route/viewport combinations.
- Semantic structure: 8 of 8 route states had one `h1`, one main landmark, no skipped heading level, no duplicate ID, and no empty-purpose link.
- Browser console warnings/errors: 0.

## Responsive matrix

| Width | Home | Articles | Projects | Methods | People | About | Contact | Not found |
|---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 320 | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| 390 | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| 768 | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| 1024 | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| 1440 | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |

## Approved-content inventory observed

- Articles: 5 approved Medium-list records and 5 canonical Medium links.
- Projects: 1 approved public repository.
- Methods: SDLC² only.
- People: 4 approved names and LinkedIn links.
- Downloads: 0.
- Forms or registration inputs: 0.
- Private or confidential records: 0 observed.

## Runtime-boundary observation

Application source contains no external-content `fetch`, `XMLHttpRequest`, or Axios path. The only production-bundle `fetch` is Vite's standard module-preload helper for same-origin static assets. Medium, LinkedIn, and GitHub values are static link destinations.

## Environment notes

- The bundled Node directory had to be placed on the command path because the default shell exposed `pnpm` without `node`.
- Initial sandboxed Vite/Vitest attempts could not write `.vite-temp`; the same commands passed with the authorized repository write boundary.
- Eight jsdom canvas-context notices were printed, but all 18 tests passed and the application contains no canvas.

