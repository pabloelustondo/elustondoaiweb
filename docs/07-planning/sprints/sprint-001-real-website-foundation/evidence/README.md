# Sprint 001 Evidence Index

**Status:** Sprint 001 implementation and correction evidence complete; Correction 01 and Correction 02 independently passed integration testing; awaiting fresh independent code review

**Evidence session:** 2026-08-01, local production build served at `http://127.0.0.1:4173/`, branch `main`, baseline and current HEAD `5b527e3f200190a2790385a2a7c85aadd06b9f73` with the uncommitted worktree described in the delivery report.

## Required evidence groups

### Automated checks

- dependency-install result;
- type-check;
- lint;
- automated tests;
- production build;
- `git diff --check` and repository status.

Captured output: [`automated/final-checks.log`](automated/final-checks.log). Dependency installation completed with pnpm 11.9.0: 233 packages were installed initially; the lockfile was then refreshed after TypeScript was pinned to stable 5.9.3 and `typescript-eslint` was added. The final log records passing type-check, lint, four tests, and production build.

### Browser and responsive behavior

- exact tested revision/worktree and local URL;
- desktop, tablet, 390-pixel, and 320-pixel screenshots;
- mobile navigation open and closed states;
- keyboard focus walkthrough;
- accessibility observations or report.

Screens from the same final build/session:

- [`browser/desktop-1440.jpg`](browser/desktop-1440.jpg)
- [`browser/tablet-1024.jpg`](browser/tablet-1024.jpg)
- [`browser/tablet-768.jpg`](browser/tablet-768.jpg)
- [`browser/mobile-390.jpg`](browser/mobile-390.jpg)
- [`browser/mobile-320.jpg`](browser/mobile-320.jpg)
- [`browser/mobile-320-menu-open.jpg`](browser/mobile-320-menu-open.jpg)

The original implementation-agent session correctly observed responsive behavior at 1440, 1024, 768, and 390 pixels but used browser `innerWidth` instead of document `clientWidth` when interpreting the 320-pixel result. The first independent integration run measured client width 305 and scroll width 320, proving a visible 15-pixel overflow. Correction 01 removed that overflow; its independent rerun measured client width and scroll width both 305 at a 320-pixel browser viewport. The original mistake remains transparently recorded in [`browser/session-observations.md`](browser/session-observations.md). Mobile-menu focus and Escape behavior, landmark structure, and canonical logo dimensions otherwise passed in the original session.

The automated `vitest-axe` scan found zero violations in the rendered homepage state. A keyboard walkthrough confirmed the skip link, primary navigation, hero actions, email links, visible focus styling, and Escape behavior. These are implementation observations, not independent WCAG certification.

### Corresponding logs

- browser console;
- local network/request or server logs;
- timestamps or session notes connecting logs to the captured screens;
- missing-asset and failed-request check.

- [`browser/browser-console.log`](browser/browser-console.log): no warnings or errors returned by the browser inspection API.
- [`browser/local-request.log`](browser/local-request.log): local HTTP request evidence for the page and canonical logo from the same preview session; both returned HTTP 200.
- [`browser/session-observations.md`](browser/session-observations.md): timestamps, responsive measurements, interaction outcomes, and evidence distinctions.

### Provenance and boundaries

- canonical logo source and copied asset filenames;
- fixture or placeholder disclosures;
- local-only, preview, and production claims kept distinct.

Build-time assets were copied without modification from the controlled `C7-Corporation / Brand & Marketing / 01 Logos` collection. SHA-256 identity was verified between source and repository copy:

- `Elustondo.ai-Logo-Primary.svg`: `4236776750cca01bbb678af54cfcfd8bef7f04a6c52b2c534849a494f548bf78`
- `Elustondo.ai-Icon-Square.svg`: `18aa4817a34fcabb76e058025d7d46c160bbd2f914ada47fef95d89aac16ba5d`

This evidence verifies only a local uncommitted production build. It does not verify a Firebase preview, deployment, public delivery, DNS, or production release.

## Correction 01 evidence

The first independent integration test recorded two defects: horizontal overflow at 320 CSS pixels and incomplete skip-link focus transfer. The separately authorized Correction 01 preserves its implementation evidence under [`corrections/correction-01/`](corrections/correction-01/):

- [`automated-checks.log`](corrections/correction-01/automated-checks.log) — locked dependency verification, type-check, lint, five tests, and production build.
- [`browser-observations.md`](corrections/correction-01/browser-observations.md) — responsive measurements, focus result, claim boundaries, and browser-console result.
- [`mobile-320-corrected.png`](corrections/correction-01/mobile-320-corrected.png) — corrected 320-pixel implementation-agent screenshot.

The fresh independent Correction 01 rerun passed. See [`integration/correction-01-retest-observations.md`](integration/correction-01-retest-observations.md).

## Correction 02 evidence

Correction 02 addresses four minor GitHub PR review findings concerning Node compatibility, deterministic dependency declarations, StableShell documentation state, and the interpretation of historical overflow evidence.

- [`corrections/correction-02/automated-checks.log`](corrections/correction-02/automated-checks.log) — dependency classification, lockfile, frozen installation, type-check, lint, five tests, build, and whitespace results.

The fresh independent Correction 02 rerun passed. See [`integration/correction-02-retest-observations.md`](integration/correction-02-retest-observations.md).

## Storage rules

Use concise text summaries and intentionally selected screenshots. Do not commit dependency directories, caches, secrets, private data, raw uncontrolled build output, or large ephemeral artifacts. Large artifacts may remain external when their stable reference and retention are recorded here.
