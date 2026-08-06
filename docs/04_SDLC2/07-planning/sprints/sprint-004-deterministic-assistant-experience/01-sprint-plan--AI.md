# Sprint 004 Plan — Deterministic Assistant Experience --AI

**Plan date:** 2026-08-05
**Status:** `DRAFT — NOT AUTHORIZED`
**Owner and approval authority:** Pablo Elustondo
**Planning source:** Sprint Roadmap, Product Vision, Repository Intent, conversational intent and policy, system model, Firebase POC, architecture, UML, mockups, generated-page contract 0.2, current component catalogue, and Sprint 003 review state

## 1. Intent

Sprint 004 should make the future assistant experience tangible without introducing a live assistant service.

Visitors keep the complete permanent site and normal navigation. A clearly separated Assistant Panel accepts bounded text and returns one deterministic local fixture outcome:

- propose navigation to an existing shell-owned route;
- render a source-grounded scriptless editorial page in a contained canvas;
- ask for clarification;
- report insufficient approved information;
- refuse an unsupported request; or
- show service unavailability while leaving the permanent site usable.

The Sprint proves interaction, validation, accessibility, responsive layout, and containment. It does not prove model quality, endpoint security, Firebase operation, or live AI.

## 2. Baseline and authorization dependency

Sprint 004 must begin from the approved Sprint 003 integration baseline, not from an unresolved mixed worktree. Its implementation prompt may become `READY` only after Pablo:

1. approves and integrates Sprint 003 or explicitly revises this dependency;
2. reviews the final Sprint 003 findings and deferrals; and
3. explicitly approves this Plan and the exact proposed implementation prompt.

The existing roadmap entry alone is not authorization.

## 3. Human-visible journeys

### 3.1 Permanent-site fallback

A visitor can ignore or close the Assistant Panel and use every permanent route exactly as before. No assistant state or failure can replace the shell, header, navigation, page content, contact path, or footer.

### 3.2 Deterministic navigation

A reviewed example request returns a contract-versioned `navigate` fixture. The shell revalidates the route identifier through `SiteNavigator`, then performs ordinary local navigation. An arbitrary URL or unknown route is rejected.

### 3.3 Deterministic generated page

A reviewed example request returns a `render_generated_page` fixture grounded only in approved local source identifiers. The shell validates the action, source identifiers, structure, and size; sanitizes the fixture HTML; and renders it in `GeneratedPageCanvas` through a scriptless sandbox. Sources and limitations remain visible in trusted parent-shell UI.

### 3.4 Clarification, insufficient information, refusal, and failure

Each non-page outcome is rendered by trusted React components, never by candidate HTML. The visitor can refine, dismiss, or continue normal site navigation.

## 4. Component responsibilities

### AssistantPanel

Owns bounded text input, reviewed suggestion buttons, submit/refinement actions, deterministic loading simulation if useful, current local result state, status announcements, dismissal, and keyboard behavior. Context is in-memory and bounded; it is not persisted.

### DeterministicAssistantAdapter

Maps only reviewed local fixture keys to version 0.2 response envelopes. Unknown or malformed input resolves to a safe typed outcome. It performs no fetch, timer-dependent external action, model call, storage write, or analytics event.

### AssistantResponseGuard

Parses and validates exactly one action, allowed status/action combinations, field presence, route identifiers, source identifiers, counts, and size limits. It fails closed. The deterministic adapter is still treated as untrusted at this boundary so Sprint 005 can replace it without bypassing shell validation.

### SiteNavigator

Maps a validated route identifier to a current permanent local destination. It rejects arbitrary URLs, unknown routes, unsupported anchors, and external navigation proposals.

### ApprovedSourcePack

References already approved local public content using stable identifiers, titles, routes, and bounded excerpts. It does not duplicate private records or invent current facts.

### GeneratedPageSanitizer

Allows only the structural HTML, attributes, and allow-listed destinations in contract version 0.2. It removes active content, event handlers, external resources, unsupported controls, executable URLs, and page-level `h1` content. Invalid or empty results fail closed.

### GeneratedPageCanvas

Renders only sanitized scriptless HTML inside a sandboxed `iframe` `srcdoc` or equivalent isolated document boundary. The shell supplies any trusted frame styling and restrictive policy wrapper. The frame receives no scripts, forms, popups, same-origin privilege, parent navigation authority, Firebase configuration, credentials, or external resources.

## 5. Approved fixture set

The minimum fixture set must include:

1. one local navigation result;
2. one generated-page result grounded in at least two approved local sources;
3. one clarification result with reviewed suggestions;
4. one insufficient-information result for unsupported current/external facts;
5. one policy refusal;
6. one service-unavailable result;
7. malformed negative fixtures for unknown route, unknown source, invalid status/action pairing, prohibited HTML, event attributes, executable URL, external resource, oversized content, and multiple/ambiguous actions.

Fixture prompts and outputs are demonstrations, not claims about model intelligence.

## 6. In-scope implementation

- Add the Assistant Panel to the permanent shell without hiding either primary anonymous journey.
- Add the deterministic adapter, version 0.2 TypeScript contract, response guard, route allow-list, approved source pack, sanitizer, Site Navigator, and Generated Page Canvas.
- Use only approved local content and destinations.
- Preserve desktop and narrow layouts down to 320 CSS pixels.
- Support keyboard operation, visible focus, labelled input, status announcements, predictable focus after results/navigation, and reduced motion.
- Add exact unit, component, accessibility, negative-contract, sanitization, navigation, responsive, and no-network tests.
- Update maintained component and architecture documentation and the Sprint evidence package only where the delivered implementation changes current responsibilities.

## 7. Acceptance criteria

### Stable shell and fallback

- Every existing permanent route and not-found state remains usable with the panel open, closed, or failed.
- The assistant never replaces permanent navigation or the shell.
- No visitor request depends on Medium, Gemini, another AI provider, Firebase Functions, Storage, or a new endpoint.

### Navigation authority

- Only a current shell-owned route identifier can navigate.
- Unknown route, arbitrary URL, external destination, and unsupported anchor fixtures fail closed.
- Browser history, direct navigation, current-page state, and focus behavior remain correct.

### Generated-page containment

- Only sanitized scriptless HTML enters the canvas.
- The frame has no script, same-origin, form, popup, download, or top-navigation permission.
- Sources and limitations remain visible in trusted shell UI.
- Prohibited elements, attributes, URLs, and resources are removed or rejected according to one tested policy.
- Candidate content cannot create a page-level `h1`, imitate login/payment/system controls, or control parent navigation.

### Typed outcomes

- Navigation, generated page, clarification, insufficient information, refusal, and service-unavailable states are visually and semantically distinct.
- Invalid version, status/action combination, field set, route, source, size, or HTML returns a trusted failure state with no partial candidate HTML.

### Accessibility and responsive behavior

- Panel, suggestions, status messages, source/limitation disclosure, dismissal, navigation, and generated canvas are keyboard-operable with visible focus.
- Results are announced without stealing focus unpredictably.
- The layout has no horizontal overflow at 320, 390, 768, 1024, and 1440 CSS pixels.
- Reduced-motion and zoom-friendly behavior are preserved.

### Evidence

- Frozen installation, type checking, lint, all tests, and both builds pass.
- Production-preview QA covers all permanent routes, the six positive assistant outcomes, negative safety fixtures, mobile menu interaction, browser history, focus, console logs, and local network requests.
- Network evidence shows no assistant endpoint, provider, Medium, or Firebase request.
- The delivery report distinguishes implemented fixture behavior from future live architecture.

## 8. Explicit non-goals

- a Firebase or other server endpoint;
- live model or provider calls;
- LangChain use in the visitor assistant;
- credentials, secrets, IAM, rate limits, quotas, budgets, cost controls, telemetry retention, or production alerting;
- open-web research, current-news answers, live source retrieval, or visitor-time Medium access;
- Firestore, Authentication, member accounts, protected applications, persistent conversation history, CMS, analytics, payments, forms, or voice;
- generated applications, scripts, forms, media, images, arbitrary CSS, arbitrary links, or shell replacement;
- deployment, release, billing, DNS, or Git authorization.

These belong to later approved increments or separate product decisions.

## 9. Risks and controls

| Risk | Sprint 004 control |
|---|---|
| A local fixture is mistaken for AI evidence | Label deterministic behavior in UI, tests, reports, and screenshots |
| Fixture output bypasses future safety architecture | Route every fixture through the same response guard and sanitizer boundary |
| Generated markup contaminates the shell | Isolated scriptless canvas; trusted sources/limitations stay in parent UI |
| Assistant harms the permanent journeys | Collapsible/separated panel and complete static fallback |
| Narrow layouts become unusable | Mobile-first reflow and exact viewport evidence |
| Approved content drifts or is duplicated | Stable source identifiers referencing current reviewed local records |

## 10. Required stop state

After an authorized implementation and implementation-agent verification, stop at `AWAITING_INTEGRATION_TEST`.

Independent integration testing, code review, Pablo's approval, Git actions, deployment, release, and DNS remain separate gates.
