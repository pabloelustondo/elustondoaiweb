# Sprint 002 Production-Preview Browser Observations

**Date:** 2026-08-02
**Preview:** `http://127.0.0.1:4177/`
**Build:** production `dist/` output
**Browser:** Chrome controlled through the Codex browser session

## Routes and history

- Home, Articles, Projects, Methods, People, About, Contact, and a missing route rendered the expected single `h1`.
- Direct entry and refresh preserved the Projects page.
- Navigation from Home to Articles and Articles to Projects updated content without a document reload.
- Back returned from Projects to Articles; Forward returned to Projects.
- Articles navigation exposed `aria-current="page"` on the Articles route.

## Keyboard behavior

- At 320 CSS pixels, opening the menu moved focus to Home.
- Escape closed the menu and returned focus to the menu button.
- Activating the skip link focused `MAIN#main-content` on `/`, `/articles`, `/projects`, `/methods`, `/people`, `/about`, `/contact`, and the missing route.

## Responsive matrix

The document client width equaled its scroll width in all 40 route/viewport combinations:

- viewports: 320, 390, 768, 1024, and 1440 CSS pixels;
- states: Home, Articles, Projects, Methods, People, About, Contact, and not-found;
- horizontal overflow: 0 CSS pixels in every observation.

## Principal visitor journeys

- Evaluator journey: Home → Projects → People → About → Contact destinations all rendered approved company, project, people, and contact information.
- Reader journey: Home → Articles and Methods rendered the five approved Medium-list records and SDLC² without registration or an external content fetch.

## Content and runtime boundary

- The browser rendered the complete permanent content from the production bundle.
- No browser console warnings or errors were recorded.
- Medium, LinkedIn, and GitHub appear only as visitor-activated external links.
- Source and bundle inspection confirmed no application external-content request path. The Vite module-preload helper is limited to same-origin static assets.
- No private repository URL, private path, download, Architecture pillar, or unapproved record was present.

## Evidence limitation

This was implementation-agent browser verification. Independent integration testing remains required.
