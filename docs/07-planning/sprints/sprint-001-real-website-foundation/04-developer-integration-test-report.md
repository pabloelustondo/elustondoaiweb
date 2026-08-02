# Sprint 001 — Developer Integration Test Report

**Current status:** `COMPLETE — PASS`
**Current result:** `PASS` — Correction 02 fresh independent rerun
**Required role:** Fresh independent integration-test task
**Latest correction rerun executed:** 2026-08-02 (America/Toronto)

The historical first integration run failed on 320-pixel horizontal overflow and skip-link focus transfer. Correction 01 later passed fresh independent integration testing. Correction 02 addresses dependency reproducibility, Node compatibility, component-state documentation, and historical evidence interpretation. This report preserves both prior runs and records a fresh independent Correction 02 rerun. No implementation repair or code review was performed by the tester.

## Current gate decision — Correction 02 rerun

`PASS`

Correction 02 independently passes its metadata, lockfile, frozen-toolchain, documentation, and focused site-regression checks. Developer Integration Testing is complete for this correction. The Sprint may resume only at the next governance gate: fresh independent code review.

## Correction 02 repository and worktree condition

- Git root: `/Users/paboelustodo/-PROJECTS/elustondoaiweb`.
- Branch/upstream: `sprint-001-real-website-foundation` / `origin/sprint-001-real-website-foundation`.
- HEAD: `9a4f0929a55289e1751893665f5cef0d72be1878`; HEAD remained unchanged.
- Correction 02 remains an uncommitted worktree on the PR branch.
- Pre-existing work was preserved. No implementation source file or dependency declaration was changed by this tester.
- `git diff --check` passed.
- Tester-authored Correction 02 changes are limited to this report and [`evidence/integration/correction-02-retest-observations.md`](evidence/integration/correction-02-retest-observations.md).

## Correction 02 package and compatibility verification

- Every direct dependency and development-dependency declaration is an exact `x.y.z` version; no `latest` specifier remains in `package.json` or `pnpm-lock.yaml`.
- Runtime dependencies contain only `react` 19.2.8 and `react-dom` 19.2.8.
- Vite, TypeScript, React build plugin, lint, tests, types, jsdom, and accessibility tooling are development dependencies.
- `packageManager` is `pnpm@11.9.0`; the available pnpm was 11.9.0.
- Declared Node range is `^20.19.0 || ^22.13.0 || >=24.0.0`; the independent environment used Node 24.14.0.
- The declared Node range is compatible with the principal pinned tool engines inspected independently: Vite 8.2.0, Vitest 4.1.10, jsdom 29.0.1, and `@vitejs/plugin-react` 6.0.5. jsdom 29.0.1 provides the constraining `^20.19.0 || ^22.13.0 || >=24.0.0` range reflected in the manifest and README.
- The lockfile importer reproduces the manifest's exact specifiers and runtime/dev classification. Its diff transparently records jsdom 30.0.1 being replaced with 29.0.1 and the corresponding transitive graph changes.
- README guidance states Node 20.19+, Node 22.13+, or Node 24+ and pnpm 11.9+, consistent with `package.json`.

## Correction 02 automated results

- `pnpm install --frozen-lockfile`: pass; already up to date.
- Type-check: pass; no diagnostics.
- Lint: pass; no findings.
- Tests: pass; 1 file and 5 tests passed. The unchanged non-failing JSDOM canvas notice was observed.
- Production build: pass; Vite 8.2.0 transformed 16 modules and emitted the same application asset names and sizes as the Correction 01 build.
- `git diff --check`: pass.

## Correction 02 documentation verification

- The StableShell responsibility card now identifies an implemented architectural baseline and accurately says the Sprint 001 foundation was independently integration-tested and is awaiting code review and merge.
- The component catalogue now gives StableShell the same implemented/integration-tested state while leaving all future components planned, designed, specified, or future as appropriate.
- The historical implementation-agent browser observation now preserves its original mistaken `innerWidth` comparison, adds the correct document `clientWidth`, records 305/320 as overflow at 320 pixels, and explicitly links the interpretation to the first independent failure and Correction 01 resolution.
- This correction is consistent with the preserved first-run evidence and the passing Correction 01 retest; it does not rewrite the original failure as a pass.

## Correction 02 focused browser regression smoke

- Local production preview: `http://127.0.0.1:4178/`.
- At 320 CSS pixels, browser inner width was 320 and document client/scroll widths were 305/305; no overflowing element was found.
- Mobile navigation opened with `aria-expanded="true"`, moved focus to Home, closed on Escape, and returned focus to the menu button without reintroducing overflow.
- Keyboard Tab exposed the skip link's 3-pixel gold focus outline; Enter preserved `#main-content` and focused `MAIN#main-content` with `tabindex="-1"`.
- At 1440 CSS pixels, document client/scroll widths were 1425/1425, no overflowing element was found, desktop navigation remained visible, and the mobile menu button remained hidden.
- One `h1` and one each of header, main, footer, and named primary navigation remained present; all displayed fragment targets resolved.
- The canonical logo loaded with meaningful alternative text and natural size 1100 × 220.
- Browser warning/error inspection returned an empty list.
- Independent requests returned HTTP 200 for `/` and both canonical SVG assets.

## Correction 02 findings and blockers

- Blocking regressions: none observed.
- New application findings: none observed.
- Metadata or documentation inconsistencies: none observed within the authorized Correction 02 scope.
- Environment blockers: none.

## Correction 02 independent evidence

- [`evidence/integration/correction-02-retest-observations.md`](evidence/integration/correction-02-retest-observations.md)
- Correction implementation evidence under `evidence/corrections/correction-02/` was read as an agent claim and was not substituted for independent execution.

## Historical passing rerun — Correction 01

`PASS`

Correction 01 independently resolves both defects from the first run, and the full required integration suite passes. Developer Integration Testing is complete. The Sprint may advance only to the next governance gate: fresh independent code review. This result does not perform or pre-approve that review.

## Correction 01 repository, revision, and worktree condition

- Git root: `/Users/paboelustodo/-PROJECTS/elustondoaiweb`.
- Branch/upstream: `main` / `origin/main`.
- HEAD: `5b527e3f200190a2790385a2a7c85aadd06b9f73`; HEAD remained unchanged.
- The original implementation, Correction 01, Sprint package, and test reports remain uncommitted.
- Pre-existing governance/index changes and untracked `docs/sdlc2/On Development Agents to enforce SDLC2.md` remain present and were not changed by this test.
- `git diff --check` passed. Dependency and build directories remain ignored.
- Tester-authored Correction 01 changes are limited to this report and [`evidence/integration/correction-01-retest-observations.md`](evidence/integration/correction-01-retest-observations.md).

## Correction 01 environment and tool versions

- Node.js: `v24.14.0`, bundled Codex primary runtime.
- pnpm: `11.9.0`.
- Browser: controlled Chrome session against the local Vite production preview.
- Independent tested URL: `http://127.0.0.1:4176/`.

## Correction 01 automated and build results

- `pnpm install --frozen-lockfile`: pass; lockfile already up to date.
- Type-check: pass; no diagnostics.
- Lint: pass; no findings.
- Tests: pass; 1 file and 5 tests passed. JSDOM printed the unchanged, non-failing canvas `getContext` notice.
- Production build: pass; Vite 8.2.0 transformed 16 modules and emitted static assets.
- Automated accessibility coverage: pass through the complete test suite.
- `git diff --check`: pass.

## Correction 01 executed user journeys and regression checks

- Loaded the corrected production homepage and inspected its semantic DOM.
- Verified every displayed fragment navigation target exists.
- Exercised the responsive shell at 320, 390, 768, 1024, and 1440 CSS pixels.
- Opened the mobile navigation at 320 pixels; verified `aria-expanded="true"`, focus movement to Home, Escape close, `aria-expanded="false"`, and focus return to the menu button.
- Used keyboard Tab to focus the skip link and Enter to activate it; verified visible focus, `#main-content`, and active focus on `MAIN#main-content` with `tabindex="-1"`.
- Inspected browser warnings/errors.
- Made independent HTTP requests for the document and both canonical SVG assets.
- Recomputed both asset hashes against the controlled masters.
- Confirmed no application runtime backend, assistant, Firebase, authentication, analytics, form, router, or external-content request was introduced.

## Correction 01 responsive results

| Requested width | Browser inner width | Document client width | Document scroll width | Result |
|---:|---:|---:|---:|---|
| 320 | 320 | 305 | 305 | Pass |
| 390 | 390 | 375 | 375 | Pass |
| 768 | 768 | 753 | 753 | Pass |
| 1024 | 1024 | 1009 | 1009 | Pass |
| 1440 | 1440 | 1425 | 1425 | Pass |

No tested width produced horizontal overflow or an element extending beyond the document client area. At 320 pixels the corrected page had no horizontal scrollbar, while the approved visual hierarchy, content, logo, mobile control, and actions remained coherent.

## Correction 01 keyboard and accessibility observations

- One `h1`; one each of header, main, footer, and named primary-navigation landmarks.
- All displayed fragment targets resolved.
- Mobile-menu open, focus-on-open, Escape close, and focus return passed.
- Skip-link focus exposed the existing 3-pixel gold outline.
- Skip-link Enter activation produced URL fragment `#main-content` and active element `MAIN#main-content`; focus transfer passed.
- The complete five-test suite, including the added skip-link regression, passed.
- Reduced-motion support remains present. This is not a WCAG or assistive-technology certification.

## Correction 01 browser console, requests, and assets

- Browser warning/error inspection returned an empty list.
- Independent local requests returned `200 OK` for `/`, `/assets/Elustondo.ai-Logo-Primary.svg`, and `/assets/Elustondo.ai-Icon-Square.svg`.
- No missing required asset was observed.
- Repository copies independently matched the controlled masters:
  - Primary logo: `4236776750cca01bbb678af54cfcfd8bef7f04a6c52b2c534849a494f548bf78`.
  - Square icon: `18aa4817a34fcabb76e058025d7d46c160bbd2f914ada47fef95d89aac16ba5d`.

## Correction 01 planned scope versus observed behavior

- Correction 01 authorized exactly two fixes: remove horizontal overflow at 320 CSS pixels and transfer skip-link focus to main content.
- Both corrected behaviors independently passed.
- The existing homepage design, branding, typography, content hierarchy, navigation, contact links, mobile menu, and wider responsive breakpoints remained intact in the tested production build.
- No unrelated feature or external-system behavior was observed.
- The correction agent's claims are reproduced; its evidence remains implementation evidence and was not substituted for this independent session.

## Correction 01 regressions, findings, and blockers

- Blocking regressions: none observed.
- New application findings: none observed.
- Environment blockers: none.
- The disclosed JSDOM canvas notice remains non-failing and is not used by the application.

## Independent evidence paths

- First integration run: [`evidence/integration/integration-session-observations.md`](evidence/integration/integration-session-observations.md).
- Correction 01 fresh rerun: [`evidence/integration/correction-01-retest-observations.md`](evidence/integration/correction-01-retest-observations.md).
- Correction implementation evidence under `evidence/corrections/correction-01/` was read as an agent claim, not treated as independent proof.

## Historical first integration run — preserved FAIL

**Executed:** 2026-08-01 (America/Toronto)
**Historical result:** `FAIL`

The first independent run passed frozen installation, type-check, lint, four tests, production build, 1440/1024/768/390 responsive checks, mobile-menu operation, browser-console inspection, HTTP checks, and asset identity. It identified:

1. At 320 CSS pixels, browser `innerWidth` was 320, document client width was 305, and document scroll width was 320, producing a visible 15-pixel horizontal scrollbar.
2. Skip-link activation changed the fragment to `#main-content`, but focus remained on `BODY`.

That `FAIL` correctly stopped the Sprint at the integration gate and led to the separately authorized immutable Correction 01 prompt. The historical evidence remains unchanged at [`evidence/integration/integration-session-observations.md`](evidence/integration/integration-session-observations.md). It is superseded only for the current gate decision by the passing Correction 01 rerun; it is not erased or retroactively changed.

## Claim boundaries

This report does not constitute code review, Pablo Manual QA, sprint approval, deployment evidence, WCAG certification, or release authorization. It verifies only the local uncommitted worktree and local production preview described above. No commit, push, pull request, deployment, Firebase action, credential operation, billing change, or DNS change occurred.

## Result

`PASS`

Stop after Developer Integration Testing. The next permitted gate is fresh independent code review; do not skip directly to Pablo Manual QA, sprint approval, deployment, or release.
