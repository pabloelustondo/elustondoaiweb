# Sprint 001 Correction 01 — Browser Observations

**Executed:** 2026-08-01 (America/Toronto)
**Local production preview:** `http://127.0.0.1:4175/`
**Revision:** `main` at `5b527e3f200190a2790385a2a7c85aadd06b9f73` with the documented uncommitted correction

These are implementation-agent observations. They are not independent integration evidence.

## Responsive measurements

| Requested viewport | Browser inner width | Document client width | Document scroll width | Result |
|---:|---:|---:|---:|---|
| 320 | 320 | 305 | 305 | Pass — no horizontal overflow |
| 390 | 390 | 375 | 375 | Pass — no horizontal overflow |
| 768 | 768 | 753 | 753 | Pass — no horizontal overflow |
| 1024 | 1024 | 1009 | 1009 | Pass — no horizontal overflow |
| 1440 | 1440 | 1425 | 1425 | Pass — no horizontal overflow |

The 15-pixel difference between browser inner width and document client width is the browser's vertical scrollbar. The corrected document no longer extends underneath or beyond it.

## Skip-link behavior

- The corrected production bundle exposes `tabindex="-1"` on `main#main-content`.
- After the skip link was focused and activated, the observed active element was `MAIN#main-content`.
- The resulting URL fragment was `#main-content`.
- The automated regression test separately verifies the keyboard-only path: Tab focuses the skip link, Enter activates it, and main content receives focus.

## Visual and console observations

- The approved homepage design, content hierarchy, logo, mobile menu, typography, and actions remained visually unchanged.
- The corrected 320-pixel screenshot is preserved as [`mobile-320-corrected.png`](mobile-320-corrected.png).
- Browser warning/error inspection returned an empty list.

No Firebase, deployment, public-hosting, or production claim is made.
