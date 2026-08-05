# Sprint 001 Correction 02 — Independent Integration Retest Observations

**Session:** 2026-08-02 (America/Toronto)
**Result:** `PASS`
**Branch:** `sprint-001-real-website-foundation`
**HEAD:** `9a4f0929a55289e1751893665f5cef0d72be1878`
**Preview:** `http://127.0.0.1:4178/`

This is fresh independent evidence for Correction 02. The original failed run and Correction 01 passing rerun remain separately preserved.

## Package and lockfile

- Direct runtime dependencies: `react` 19.2.8 and `react-dom` 19.2.8 only.
- Development dependencies: 18 build, type, lint, test, DOM, and accessibility packages.
- Non-exact direct specifiers: none.
- `latest` declarations in `package.json` or `pnpm-lock.yaml`: none.
- `packageManager`: `pnpm@11.9.0`.
- Engines: Node `^20.19.0 || ^22.13.0 || >=24.0.0`; pnpm `>=11.9.0`.
- Independent environment: Node 24.14.0; pnpm 11.9.0.
- Inspected principal tool engines:
  - Vite 8.2.0: `^20.19.0 || >=22.12.0`.
  - Vitest 4.1.10: `^20.0.0 || ^22.0.0 || >=24.0.0`.
  - jsdom 29.0.1: `^20.19.0 || ^22.13.0 || >=24.0.0`.
  - React plugin 6.0.5: `^20.19.0 || >=22.12.0`.
- The lockfile importer exactly matches the manifest specifiers and dependency classification.
- Lockfile diff records jsdom 30.0.1 changing to 29.0.1 and regenerates the related transitive graph.

## Reproduced checks

- `pnpm install --frozen-lockfile`: pass; already up to date.
- Type-check: pass.
- Lint: pass.
- Vitest: 1 file, 5 tests passed; unchanged non-failing JSDOM canvas notice.
- Production build: pass; Vite 8.2.0, 16 modules.
- Output: `index.html` 0.62 kB, CSS 4.85 kB, JavaScript 196.97 kB.
- `git diff --check`: pass.

## Documentation consistency

- README Node and pnpm guidance matches the package manifest.
- StableShell responsibility card reports implemented and independently integration-tested, awaiting code review and merge.
- Component catalogue reports the same StableShell state without changing future component states.
- Historical browser evidence now explicitly preserves the original comparison mistake and correctly records client width 305 versus scroll width 320 as pre-correction overflow.
- The historical note is consistent with the original independent FAIL and Correction 01 PASS.

## Focused browser regression

- 320 pixels: `innerWidth` 320; document client/scroll widths 305/305; no enumerated overflow.
- Mobile menu: open state and focus-to-Home passed; Escape close and focus return passed; widths remained 305/305.
- Skip link: first Tab exposed visible focus; Enter produced `#main-content` and focused `MAIN#main-content` with `tabindex="-1"`.
- 1440 pixels: `innerWidth` 1440; client/scroll widths 1425/1425; no enumerated overflow; desktop navigation state preserved.
- Semantic structure: one `h1`, header, main, footer, and primary navigation; no broken displayed fragment target.
- Logo: loaded, alt `Elustondo.ai`, natural size 1100 × 220.
- Browser warnings/errors: none.
- HTTP 200: document, primary logo, and square icon.

## Boundaries and result

`PASS`

No implementation source, dependency declaration, unrelated file, comment thread, Git history, external system, or deployment state was changed by this retest. This evidence does not perform code review, sprint approval, comment resolution, merge, deployment, Firebase, credentials, billing, or DNS work. The next gate is fresh independent code review.
