# Sprint 001 Independent Integration-Test Observations

**Session:** 2026-08-01 (America/Toronto)
**Revision:** `5b527e3f200190a2790385a2a7c85aadd06b9f73`, uncommitted worktree
**Preview:** local Vite production preview, `http://127.0.0.1:4173/`

## Reproduced checks

- Frozen-lockfile install: pass, already up to date.
- Type-check: pass.
- Lint: pass.
- Vitest: 1 file, 4 tests passed; non-failing JSDOM canvas notice observed.
- Production build: pass, 16 modules.
- `git diff --check`: pass.

## Responsive measurements

| Requested CSS width | `innerWidth` | client width | scroll width | Result |
|---:|---:|---:|---:|---|
| 1440 | 1440 | 1425 | 1425 | Pass |
| 1024 | 1024 | 1009 | 1009 | Pass |
| 768 | 768 | 753 | 753 | Pass |
| 390 | 390 | 375 | 375 | Pass |
| 320 | 320 | 305 | 320 | **Fail — visible horizontal scrollbar** |

At 320 pixels the root, header, and main measured 320 pixels wide while the document client width was 305 pixels. The resulting 15-pixel horizontal overflow was visible in the controlled browser viewport.

## Interaction and accessibility observations

- Mobile button: `aria-controls="primary-menu"`; closed `aria-expanded="false"`.
- After open: `aria-expanded="true"`; menu display `flex`; focus on Home.
- After Escape: `aria-expanded="false"`; menu display `none`; focus returned to the menu button.
- Skip link focus style: 3-pixel solid gold outline.
- Skip link activation: location hash became `#main-content`, but active element was `BODY`; main content did not receive focus.
- Semantic counts: one `h1`, one header, one main, one footer, one navigation.
- Broken displayed fragment targets: none.
- Browser warning/error entries: none.

## Local requests and assets

- `/`: HTTP 200.
- `/assets/Elustondo.ai-Logo-Primary.svg`: HTTP 200.
- `/assets/Elustondo.ai-Icon-Square.svg`: HTTP 200.
- Primary-logo natural dimensions: 1100 × 220; meaningful `Elustondo.ai` alternative text.
- Repository copies and controlled masters had identical SHA-256 values:
  - `4236776750cca01bbb678af54cfcfd8bef7f04a6c52b2c534849a494f548bf78`.
  - `18aa4817a34fcabb76e058025d7d46c160bbd2f914ada47fef95d89aac16ba5d`.

## Boundaries

No implementation file, unrelated governance/index file, or `docs/sdlc2/` file was changed. No commit, push, deployment, Firebase action, credential, billing, or DNS action occurred.
