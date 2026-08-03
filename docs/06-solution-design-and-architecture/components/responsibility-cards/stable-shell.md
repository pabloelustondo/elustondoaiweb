# StableShell Responsibility Card

**Status:** Implemented architectural baseline
**Implementation state:** Sprint 001 approved and merged to `main`

## Purpose

Provide a dependable, accessible, responsive Elustondo.ai website that remains useful without an AI service.

## Owns

- official brand placement using approved build-time assets;
- semantic header, navigation, main content, and footer;
- homepage composition and reviewed static presentation;
- responsive behavior from wide desktop through 320 CSS pixels;
- keyboard navigation, visible focus, heading structure, landmarks, reduced-motion treatment, and base contrast;
- stable in-page navigation during Sprint 001 and permanent route ownership as later pages arrive;
- graceful separation between permanent content and future assistant capabilities.

## Does not own

- model calls, prompt construction, provider credentials, or generated content;
- assistant intent classification or arbitrary navigation decisions;
- authentication, accounts, customer applications, payments, analytics, or CMS behavior;
- Firebase deployment, DNS, email delivery, or operational approval;
- invention or modification of official logos, people information, claims, project status, or external links.

## Inputs

- reviewed site metadata and homepage content;
- canonical design specification and mockup reference;
- approved primary logo and icon assets copied from the controlled brand collection;
- design tokens and responsive rules.

## Outputs and public contracts

- valid browser-renderable static application;
- semantic landmarks and working navigation targets;
- stable visual slots for future permanent routes and assistant integration;
- deterministic page output suitable for browser, accessibility, and visual validation.

## Failure and uncertainty outcomes

- If an approved brand asset is unavailable, stop and report the dependency; never redraw it.
- If content is unverified, omit it or label it as non-production fixture content in development evidence; never present uncertain claims as approved public facts.
- If future assistant services fail, permanent content and navigation remain available.

## Test seams and evidence

- component rendering and navigation tests;
- production build, type-check, lint, and automated-test results;
- keyboard-only walkthrough and focus evidence;
- desktop, tablet, 390-pixel, and 320-pixel screenshots;
- browser console and local request logs from the same tested build/session;
- reduced-motion and overflow checks;
- comparison with the approved design hierarchy without treating the mockup as production code.

## Relevant specifications

- [Product Vision](../../../02-intent/product-vision.md)
- [Website Design Specification v1](../../website-design-specification-v1.md)
- [AI-Assisted Navigation and Page Generation Architecture](../../conversational-page-generation-architecture.md)
- [Sprint 001 Plan](../../../07-planning/sprints/sprint-001-real-website-foundation/01-sprint-plan.md)
