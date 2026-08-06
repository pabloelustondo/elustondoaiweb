# Agent Instructions

These instructions apply to the entire `elustondoaiweb` repository. They define how Codex and other development agents should work on the Elustondo.ai website.

## Read first

Begin with the four maintained breadth-first guides:

1. [System Definition](docs/01_SystemDefinition/README_ai.md)
2. [Developer Guide](docs/02_DeveloperGuide/README_ai.md)
3. [Architecture](docs/03_Architecture/README_ai.md)
4. [SDLC2 responsibility and navigation guide](docs/04_SDLC2/README_ai.md)

Before making a material product, design, architecture, implementation, deployment, or release decision, also read:

1. [Product Vision](docs/04_SDLC2/02-intent/product-vision.md)
2. [Repository Intent](docs/04_SDLC2/02-intent/repository-intent.md)
3. [Conversational Page Generation Intent](docs/04_SDLC2/02-intent/conversational-page-generation-intent.md)
4. [Generated Content Policy](docs/04_SDLC2/02-intent/generated-content-policy.md)
5. [Elustondo.ai System Model and Use Cases](docs/04_SDLC2/03-system-model-and-use-cases/conversational-page-generation-system-model-and-use-cases.md)
6. [Firebase Conversational POC](docs/04_SDLC2/05-viable-proof-of-concept/firebase-conversational-page-generation-poc.md)
7. [AI-Assisted Navigation and Page Generation Architecture](docs/04_SDLC2/06-solution-design-and-architecture/conversational-page-generation-architecture.md)
8. [Conversational Web App UML](docs/04_SDLC2/06-solution-design-and-architecture/uml/conversational-web-app-uml.md)
9. [Interactive Page Mockups](docs/04_SDLC2/06-solution-design-and-architecture/mockups/README.md)
10. [Sprint Documentation and Governance Model](docs/04_SDLC2/07-planning/sprint-documentation-and-governance-model.md)
11. [Assistant Navigation and Generated Page Contract](docs/04_SDLC2/08-specifications-as-code/generated-page-contract.md)
12. [Website Project Index](docs/04_SDLC2/01-context-and-domain-analysis/website-project-index.md)
13. [Website Design Specification v1](docs/04_SDLC2/06-solution-design-and-architecture/website-design-specification-v1.md)
14. [Website Development Plan v1](docs/04_SDLC2/07-planning/website-development-plan-v1.md)
15. [Brand Usage](docs/04_SDLC2/06-solution-design-and-architecture/brand-usage.md)
16. [Brand and Graphical Asset Register](docs/04_SDLC2/06-solution-design-and-architecture/brand-and-graphical-asset-register.md)
17. [Release Plan](docs/04_SDLC2/07-planning/release-plan.md)
18. [Sprint Roadmap](docs/04_SDLC2/07-planning/sprint-roadmap.md)
19. [Component Catalogue](docs/04_SDLC2/06-solution-design-and-architecture/components/component-catalog.md)

The July 28 static documents define the stable site and design foundation. The July 31 conversational documents define the current proof-of-concept evolution and take precedence where runtime scope differs. The user's latest explicit direction overrides both. If durable documents still conflict, stop and report the conflict before implementing.

## Repository and source-of-truth rules

- This local repository is the active implementation workspace.
- GitHub is the canonical version history once changes are committed and pushed.
- The Markdown files under `docs/` are the implementation-ready documentation set. Their linked Google Docs record provenance and may remain useful as corporate records.
- Official corporate logo masters and brand applications remain controlled by the `C7-Corporation / Brand & Marketing` source collection. Copy only approved build-time assets into the website repository; never redraw or regenerate them.
- The Google Drive mirror is not a Node development environment. Never install dependencies, create build caches, or run an active development toolchain inside the Drive mirror.

## Product boundary

- The permanent foundation is a static corporate website and stable editorial shell.
- The two primary initial journeys are anonymous: evaluate Elustondo.ai for an engagement and learn from its public knowledge. Do not place either journey behind registration.
- The current proof-of-concept direction adds one bounded server-side assistant endpoint that proposes either allow-listed navigation or a scriptless HTML document composed from approved Elustondo.ai material.
- Prefer React, TypeScript, Vite, static reviewed content, Firebase Hosting, a narrowly scoped HTTPS function for the approved proof, and GitHub-based build/deployment automation.
- Do not add Firestore, Authentication, a CMS, payments, customer accounts, persistent conversation history, autonomous actions, or additional server runtimes without an explicit requirement and approval.
- Member authentication, protected customer applications, voice, and source-aware external research are future Product Vision directions, not current implementation authorization.
- Do not turn the initial proof into an unsourced general-purpose assistant or allow generated output to control the shell. The stable shell validates navigation proposals and renders generated content only inside the documented sandbox.
- Use a direct email contact path until form delivery, spam handling, privacy, and operational ownership are defined.
- DNS remains unchanged until a Firebase candidate passes the documented release QA gate and the user explicitly approves cutover.

## Design and content rules

- Preserve the quiet, serious, editorial visual direction.
- Use the official Elustondo.ai logo assets without recolouring, redrawing, stretching, simplifying, or modifying internal spacing.
- Do not fabricate portraits, biographies, team roles, client claims, testimonials, metrics, project status, credentials, or external links.
- Verify public facts and obtain approval for people, roles, photographs, and project disclosures before release.
- Keep evidence, assumptions, placeholders, simulations, preview validation, and production verification clearly distinct.
- Target accessible semantic HTML, keyboard operation, visible focus, sufficient contrast, responsive behaviour down to 320 CSS pixels, and reduced-motion support.
- Treat prompts and model output as untrusted. Validate the structured contract, verify approved source identifiers, sanitize generated HTML, and render it only inside the documented scriptless sandbox.

## Working rules

- Inspect the actual repository path, Git root, branch, status, and relevant files before changing anything.
- Preserve unrelated and user-authored changes. Do not overwrite an existing artifact without first comparing it.
- Route durable change artifacts to the corresponding numbered folder under `docs/04_SDLC2/`; update indexes and links when adding documents.
- The Sprint Documentation and Governance Model does not itself activate work. Begin sprint implementation only when Pablo explicitly authorizes the exact Sprint Plan and implementation prompt.
- Treat methodology learning as a project output: record specification ambiguities, prompt quality, claim accuracy, evidence gaps, review findings, and proposed SDLC² improvements in the applicable sprint record.
- Planning documents and placeholders do not by themselves authorize implementation beyond the user's request.
- Do not install dependencies, commit, push, publish, deploy, promote a Firebase release, or modify DNS unless the user explicitly requests that action.
- Do not upgrade Firebase billing, provision paid resources, create or retrieve provider credentials, or enable a live model call without explicit user approval.
- Never request, display, log, or commit a provider secret. A missing usable secret is a blocker for live generation, not permission to ask for plaintext.
- Never change mail-related DNS records such as MX, SPF, DKIM, or DMARC as part of a website cutover.
- Validate relevant links, document structure, tests, builds, responsive behaviour, and accessibility before claiming completion.

## Communication

- Lead with outcomes and decisions in plain language.
- Do not dump terminal commands or code into a planning conversation unless the user explicitly asks for executable instructions.
- When Codex can perform an authorized repository action directly, perform it and report the result instead of asking the user to copy commands.
