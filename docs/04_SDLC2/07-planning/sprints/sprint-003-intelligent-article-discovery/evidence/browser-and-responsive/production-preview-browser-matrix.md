# Production-Preview Browser Verification

**Date:** 2026-08-03
**Preview:** Local Vite production preview at `http://127.0.0.1:4178/`
**Browser:** Controlled Chrome session
**Evidence authority:** Implementation-agent verification only

## Responsive matrix

Home, Articles, Projects, Methods, People, About, Contact, and the branded not-found route were checked at 320, 390, 768, 1024, and 1440 CSS pixels.

- 40 route-width combinations checked.
- Horizontal overflow: zero in every combination.
- One correct `h1` and route-aware document title observed on every route.
- Current-page navigation marker matched every permanent route; the not-found page had no false current-page marker.

## Keyboard and routing

- Skip-link activation moved focus to `MAIN#main-content` and set `#main-content` on all seven permanent routes and the not-found route.
- At 320 pixels, opening the mobile menu focused Home; Escape closed the menu and returned focus to its control.
- Direct entry and reload on `/articles` preserved the page.
- Client-side navigation Articles → Projects worked.
- Browser Back returned to Articles; Forward returned to Projects.

## Article journeys

- Primary discovery exposed exactly the approved pillars: SDLC², Architecture, and Modernization.
- The separate Latest stream showed, in order: Legacy FX, Practical Local AI, Responsibility-Driven Design, SOLID, and Three Amigos.
- Three Amigos remained visibly Unclassified while still present in Latest.
- Relevance explanations were visible on pillar cards.
- All observed article destinations used Pablo's canonical public Medium path.

## Runtime independence and console

- Browser warnings/errors: none.
- No Medium or AI-provider runtime resource was requested by the application.
- The only external page resource was the pre-existing Google Fonts stylesheet; Medium URLs were normal visitor-activated links only.

The responsive override was reset and the temporary QA tab was finalized after verification.
