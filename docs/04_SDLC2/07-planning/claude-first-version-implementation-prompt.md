# Claude First-Version Implementation Prompt

**Purpose:** Authorize and guide the first deterministic implementation increment  
**Target:** Phase 2 — stable shell proof  
**Backend:** None  
**Deployment:** Not authorized

Copy the prompt below into Claude Code while its working directory is the root of the local `elustondoaiweb` repository.

---

## Prompt

You are implementing the first working version of the Elustondo.ai website in this repository.

### Objective

Build the deterministic front-end proof described as Phase 2 in the repository documentation: a stable, responsive corporate website shell containing an Assistant Panel, allow-listed assisted navigation, and a large isolated generated-page canvas driven entirely by local fixtures.

This increment proves design, interaction states, accessibility, containment, and build quality. It must not call a live model, create a Firebase function, deploy anything, modify DNS, or introduce secrets.

### Repository authority and reading order

First inspect the actual repository root, branch, Git status, and existing files. Then read `AGENTS.md` completely and follow it.

Before implementation, read these documents completely:

1. `docs/02-intent/product-vision.md`
2. `docs/02-intent/repository-intent.md`
3. `docs/02-intent/conversational-page-generation-intent.md`
4. `docs/02-intent/generated-content-policy.md`
5. `docs/03-system-model-and-use-cases/conversational-page-generation-system-model-and-use-cases.md`
6. `docs/04-benchmarks-test-strategy-and-success-criteria/conversational-poc-success-criteria.md`
7. `docs/05-viable-proof-of-concept/firebase-conversational-page-generation-poc.md`
8. `docs/06-solution-design-and-architecture/conversational-page-generation-architecture.md`
9. `docs/06-solution-design-and-architecture/uml/conversational-web-app-uml.md`
10. `docs/06-solution-design-and-architecture/mockups/README.md`
11. `docs/06-solution-design-and-architecture/website-design-specification-v1.md`
12. `docs/06-solution-design-and-architecture/brand-usage.md`
13. `docs/08-specifications-as-code/generated-page-contract.md`
14. `docs/07-planning/conversational-poc-delivery-plan.md`

Use the interactive mockup at `docs/06-solution-design-and-architecture/mockups/elustondo-web-app-interactive-mockups.html` as a visual and interaction reference. Do not ship the mockup itself as the application.

If two durable documents conflict, obey the most recent explicit product direction recorded by `AGENTS.md`. If the conflict materially changes the implementation, stop and report it before coding.

### Authorization for this increment

You are authorized to:

- create and modify application source, configuration, tests, and local documentation inside this repository;
- initialize a React, TypeScript, and Vite application in the repository root;
- add the smallest reasonable dependencies needed for the implementation and automated tests;
- install dependencies and run the development build, production build, linting, type checking, and tests in this non-Drive local repository.

You are not authorized to:

- commit or push changes;
- create a pull request;
- deploy or publish the website;
- configure Firebase projects, Hosting, Functions, App Hosting, billing, or secrets;
- connect to any AI/model provider;
- modify GoDaddy, DNS, email records, or the public domain;
- add Firestore, Authentication, analytics, a CMS, payments, accounts, persistent chat history, or autonomous actions.

### Required implementation

#### 1. Stable website shell

Implement a quiet, serious, editorial shell that remains completely usable without AI:

- Elustondo.ai identity area;
- responsive permanent navigation covering the approved public destinations;
- a distinct Assistant Panel for text questions, navigation requests, suggestions, and status;
- a large Generated Page Canvas that remains the dominant reading surface;
- direct paths to permanent content and contact;
- stable footer with only reviewed information already present in the specifications.

Do not fabricate URLs, biographies, roles, client claims, testimonials, metrics, credentials, project status, or contact information.

#### 2. Official brand constraint

Search the repository for approved production logo assets before implementing the header.

- If approved assets are present, use them without recolouring, redrawing, stretching, simplifying, or changing their spacing.
- If approved assets are absent, do not extract the mockup SVG, recreate the crest, generate a substitute, or fetch a logo from the web.
- In that case, use a restrained text-only `elustondo.ai` development fallback, keep the asset integration isolated in one component, and report the missing official asset as a release blocker.

#### 3. Deterministic conversational states

Implement these explicit states from the UML model:

- `ready`;
- `routing`;
- `navigating`;
- `generating`;
- `generatedPage`;
- `clarificationRequired`;
- `insufficientInformation`;
- `policyRefusal`;
- `invalidOutput`;
- `unavailable`.

Use deterministic local fixtures and a small development-only state selector or predictable fixture triggers so every state can be reviewed and tested without a backend.

Include at least:

- one request that resolves to an allow-listed existing route;
- one request that resolves to a source-grounded generated page;
- one ambiguous request that asks for clarification;
- one unsupported external-information request;
- one controlled unavailable state.

The shell must own the route table and revalidate every navigation action. Fixtures must not navigate arbitrary model-supplied URLs.

The default demonstration question may explain how SDLC² guides AI-assisted development, but its answer must be grounded only in repository documentation and must identify the approved local sources used.

#### 4. Navigation and generated-page containment

Implement the versioned assistant-action contract through deterministic local types and fixtures. Treat navigation and generated-page rendering as distinct outcomes.

Render the successful fixture as scriptless HTML inside a sandboxed iframe or an equivalently isolated component matching the documented architecture.

- Do not grant script execution.
- Do not grant form submission, popups, parent navigation, or same-origin access.
- Do not allow the fixture to control the permanent shell.
- Keep shell input, loading, errors, navigation, and source controls outside the generated content.

Although this increment uses trusted local fixtures, preserve the production boundary in the component design. Do not claim that live validation or sanitization has been implemented unless it actually has.

#### 5. Responsive and accessible behaviour

Implement and verify:

- semantic landmarks and headings;
- keyboard operation and logical focus order;
- visible focus styles;
- labelled form controls and status announcements;
- sufficient colour contrast;
- reduced-motion support;
- usable layouts from 320 CSS pixels through desktop widths;
- equivalent information and actions on mobile and desktop.

#### 6. Maintainable structure

Separate at least:

- stable shell/layout;
- navigation;
- Assistant Panel, question input, and suggestions;
- experience state model;
- deterministic Intent Router fixture;
- shell-owned route allow-list and Site Navigator;
- deterministic fixture adapter;
- Generated Page Canvas and result frame;
- source disclosure;
- site content/configuration;
- styling/design tokens.

Keep dependencies minimal. Avoid a general component framework unless the repository already requires one. Implement only the small explicit route table needed to prove allow-listed navigation; do not introduce routing complexity merely to make the first proof look complete.

### Tests and evidence

Add proportionate automated tests that verify at least:

- all required states can be reached deterministically;
- navigation fixtures reach only their expected allow-listed destinations;
- unknown routes and arbitrary URLs are rejected;
- successful results display source disclosure;
- failure states preserve permanent navigation and useful fallback actions;
- the result frame has the intended sandbox restrictions;
- no state causes fixture HTML to replace or control the shell;
- the principal input and state controls are keyboard-accessible.

Run and record the results of:

- dependency installation;
- production build;
- TypeScript checking;
- linting;
- automated tests.

If browser automation is already available without adding disproportionate complexity, capture desktop and 320-pixel-width evidence for the ready, generated-page, and unavailable states. Otherwise report manual visual QA as still required; do not fabricate screenshots or evidence.

### Documentation update

Update only the relevant repository documentation to record:

- what was implemented;
- what remains a fixture;
- known limitations and blockers;
- exact verification performed;
- whether official brand assets were available.

Do not rewrite the product intent or expand the approved scope.

### Completion report

When finished, report concisely:

1. the working result;
2. the important files created or changed;
3. build, lint, type-check, and test results;
4. the navigation and generated-page fixtures and UI states verified;
5. missing official assets or content approvals;
6. remaining work before a Firebase preview;
7. confirmation that nothing was committed, pushed, deployed, connected to a live model, or changed in DNS.

Do not stop after scaffolding. Complete the deterministic shell proof and its verification unless a documented conflict or missing prerequisite makes safe implementation impossible.

---

## Expected outcome

Claude should return a locally working and tested deterministic UI proof. It should not return a Firebase deployment, a live AI integration, or a collection of visual placeholders presented as production-ready content.
