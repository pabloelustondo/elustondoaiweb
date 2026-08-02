# Browser session observations

**Date:** 2026-08-01
**Local URL:** `http://127.0.0.1:4173/`
**Build identity:** branch `main`, HEAD `5b527e3f200190a2790385a2a7c85aadd06b9f73`, uncommitted worktree recorded in the delivery report.

## Automated browser facts

> **Correction note:** This implementation-agent session originally compared browser `innerWidth` with document `scrollWidth` and incorrectly recorded no overflow at 320 pixels. The first independent integration run later measured document `clientWidth` 305 and `scrollWidth` 320, correctly identifying horizontal overflow. Correction 01 removed that overflow. The table below preserves the original session values while adding the independently measured client width and corrected interpretation.

| Viewport | Browser inner width | Document client width | Document scroll width | Correct interpretation |
|---:|---:|---:|---:|---|
| 1440 | 1440 | 1425 | 1425 | No overflow |
| 1024 | 1024 | 1009 | 1009 | No overflow |
| 768 | 768 | 753 | 753 | No overflow |
| 390 | 390 | 375 | 375 | No overflow |
| 320 | 320 | 305 | 320 | Overflow present in this pre-correction build |

- Landmark query: one `header`, one `nav`, one `main`, and one `footer`.
- Heading query: one `h1`.
- Canonical primary logo loaded at natural dimensions 1100 × 220.
- Browser console query for warnings and errors returned an empty list.
- Mobile navigation at 320 pixels: control count 1; closed `aria-expanded=false`; open `aria-expanded=true`; focus moved to Home; Escape closed the menu and returned focus to the button.

## Manual observation

Screens were inspected for preserved hierarchy, readable type, unclipped controls, appropriate logo proportions, single-column mobile flow, and visible focus presentation. The skip link, primary navigation, hero actions, and email links were keyboard reachable. The implementation agent did not notice horizontal scrolling during this session; the subsequent independent integration test detected and measured it at 320 pixels, and Correction 01 resolved it.

## Evidence distinctions

- The homepage copy is conservative repository-derived content; the three writing entries are development-only editorial previews with no outbound publication controls.
- People details are deliberately omitted pending reviewed profiles and consent.
- Automated and browser evidence concerns a local uncommitted production build only.
- No independent integration testing, code review, manual QA approval, deployment, or production verification is claimed.
