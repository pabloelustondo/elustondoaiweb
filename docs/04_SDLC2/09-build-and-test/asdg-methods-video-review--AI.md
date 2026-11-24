# ASDG Methods video local review

**Date:** 2026-11-24

**Status:** AI-authored implementation and verification record; awaiting Pablo's review

**Scope:** Local follow-up to [draft PR #3](https://github.com/pabloelustondo/elustondoaiweb/pull/3), explicitly requested by Pablo; does not activate Sprint 004 or constitute independent approval.

## Baseline and authority

- Repository: `/Users/pablo.elustondo/git-projects/elustondoaiweb`.
- Origin: `https://github.com/pabloelustondo/elustondoaiweb.git`.
- The initial `main` worktree was clean. Fetched origin and created local `asdg-introduction` tracking `origin/asdg-introduction`; both pointed to `6fdc65a976960da34c5878e641a0e56e7c4f3ff0`, with zero divergence.
- Reviewed the seven-file branch diff against `origin/main` (`2577699052c084c79801de7940a486749e64ea31`) before editing.
- Pablo authorized installing locked dependencies, local browser checks, fixes, and documentation updates. New changes remain uncommitted. No push, PR update, publication, deployment, or DNS operation was performed.

## Finding and change

The original direct YouTube fallback followed the iframe. Expanding the desktop player displaced it by roughly 428 pixels; mobile users also had to pass the embedded content to reach it. Moved the fallback beside the load/hide control, before the frame, and gave the direct link a 44-pixel minimum target height. Added a short explanation of the on-demand YouTube connection and associated it with the button's accessible description.

Preserved the existing upload `yb4ggoYQrtw`, privacy-enhanced embed host, native player controls, no-autoplay behavior, and frame removal on hide. Extended regression coverage for keyboard entry, Enter/Space toggling, focus retention, fallback order, iframe removal, and expanded-shell accessibility.

## Automated checks

Locked installation completed using pnpm 11.9.0 and Node.js 26.13.1. The installer warned that the backend Functions package targets Node.js 22; no backend runtime verification is claimed here. Neither lockfile changed.

| Check | Result |
|---|---|
| `pnpm frontend:typecheck` | Passed |
| `pnpm frontend:lint` | Passed |
| `pnpm frontend:test` | Passed: 5 files, 38 tests |
| `pnpm frontend:build` | Passed: Vite production bundle |

The first expanded accessibility test failed because axe attempted cross-frame messaging against a jsdom iframe. The corrected test disables iframe traversal for that check and still audits the expanded parent shell; it does not suppress shell rules. The suite emits jsdom's canvas `getContext` warning, so automated results do not establish full color-contrast coverage. No dependency was added to mask these environment limits.

## Browser observations

Used local Chrome against the development server at `http://127.0.0.1:5173/methods` and production preview at `http://127.0.0.1:4173/methods`.

| Journey | Observed result |
|---|---|
| Initial Methods entry | Official shell, ASDG introduction, controls, and fallback present; no iframe before activation. |
| Desktop at 1349 × 712 | No page overflow; expanded frame measured 760 × 427.5. Embed loaded the expected title and played after keyboard activation. |
| Mobile viewport at 320 × 740 | Page scroll width equaled viewport width; frame measured 256 × 200. Text and links wrapped without clipping. |
| Mobile viewport at 390 × 844 | Page scroll width equaled viewport width; load control and direct fallback remained readable. |
| Keyboard load and hide | Enter and Space toggled the shell button; focus remained on it; hide removed the frame. |
| Keyboard playback in production preview | Tab moved from the shell control to the direct link, then to YouTube's Play button. Enter started playback; the player exposed Pause and advancing seek position. |
| Playback teardown | Activating Hide during playback removed the iframe and left the load control focused. |
| Direct fallback | Keyboard activation navigated to `https://www.youtube.com/watch?v=yb4ggoYQrtw`; YouTube showed the expected title and 2:12 duration. |

Screenshots: [desktop](evidence/asdg-methods-video/desktop.jpg) and [320-pixel mobile](evidence/asdg-methods-video/mobile-320.jpg), captured from the production preview.

One captured console error came from the user's Grammarly extension stylesheet, not the website. This review did not intentionally block YouTube or simulate an offline browser. The direct link and shell controls are outside the iframe by construction; actual provider-blocked playback remains a manual release check. Mobile checks used viewport emulation, not a physical phone. Fullscreen transitions, caption accuracy, screen-reader output, and cross-browser behavior were not exhaustively tested. Local results do not verify a deployed release.

## Learning for the next publishing pass

Separate shell behavior from third-party player behavior in acceptance checks: an accessible toggle and a mounted iframe do not prove playback. Preserve a stable fallback before externally loaded content, test the built bundle, and record environment limitations alongside passing checks. These are review findings and proposed publishing practice, not a retrospective approval of a new sprint.
