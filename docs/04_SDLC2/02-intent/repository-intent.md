# Repository Intent

## Primary purpose

This repository contains the source code, implementation-ready documentation, methodology evidence, and approved build-time assets for the public Elustondo.ai website operated by Elustondo Systems Consulting Inc.

The website should present a mature, practical technology practice through carefully reviewed writing, methods, selected projects, people, and contact information. It should be quiet, serious, editorial, accessible, and evidence-led rather than resembling a generic AI startup, a high-pressure agency page, or a personal résumé.

The website has three purposes: fulfil the public company-evaluation and knowledge use cases, exercise and improve SDLC² through real delivery evidence, and provide a controlled environment for learning and experimenting with AI-assisted interface technologies and patterns.

The current proof-of-concept direction adds an intent-driven experience: a visitor asks a question or requests a destination, and the assistant proposes either allow-listed navigation to permanent content or a focused, scriptless HTML page composed from approved material inside the stable website shell. This evolution does not give the model authority over identity, routing, source approval, policy, or publication.

## Intended audiences

- Prospective clients, hiring managers, partners, recruiters, and technical evaluators assessing services, team experience, methods, and engagement fit.
- Engineers, architects, students, researchers, and technical leaders reading Elustondo.ai articles, papers, resources, and methods.
- Potential collaborators evaluating the practice's work and approach.
- People seeking a direct, professional contact path.
- In future releases, authenticated company members and separately authorized users of protected applications.

## Version 1 outcomes

- A responsive static site covering Home, Articles, Projects, Methods, People, About, and Contact.
- Correct use of the official Elustondo.ai identity.
- Reviewed, accurate content with no invented claims or biographies.
- Accessible semantic presentation on desktop, tablet, and mobile.
- Reproducible GitHub-based builds and Firebase Hosting preview deployments.
- A bounded conversational page-generation proof evaluated for usefulness, grounding, containment, accessibility, latency, and cost.
- Deterministic proof that the assistant can distinguish safe navigation to an existing destination from generation of a tailored page.
- Durable sprint evidence and recorded SDLC² learning that can improve later work.
- Human QA and explicit approval before production release or DNS cutover.

## Operating model

- Local non-Drive repository: active development and verification.
- GitHub: canonical version history and automated build workflow.
- Google Drive: provenance documents, corporate records, and controlled brand masters.
- Firebase Hosting preview channels: QA candidates.
- Firebase HTTPS function: controlled page generation after explicit implementation and billing approval.
- Managed secret and replaceable model-provider adapter: server-side provider access.
- Firebase Hosting live channel: approved production release.
- GoDaddy: domain registration and web DNS until an approved cutover.

The production-host statement above records the July 2026 planning baseline and must be verified before any release operation.

## Product boundary

- Static permanent content and client-side presentation remain the reliable foundation.
- The proof-of-concept exception is one narrowly scoped HTTPS assistant endpoint using an approved source pack, a versioned action contract, allow-listed navigation, validation, sanitization, and isolated rendering.
- No database, authentication, CMS, user accounts, payment flow, persistent conversation history, or autonomous action in the initial public release.
- Future member administration, protected customer applications, and voice input are planned capability areas, not current implementation authorization.
- Direct email contact initially; no form until delivery, spam, privacy, and ownership are defined.
- Medium may remain the publishing destination for complete articles while the site presents curated summaries and links.
- Only reviewed public project information may be published.

## Explicit exclusions

- Fabricated portraits, testimonials, biographies, client logos, credentials, metrics, or project claims.
- Generic AI imagery and promotional language unsupported by evidence.
- Open-web or general-purpose answers presented without source-aware retrieval, dates, citations, freshness policy, and explicit authorization.
- Arbitrary generated JavaScript, forms, external embeds, or model control of the stable shell.
- Duplicate or modified corporate logo masters.
- Unapproved production deployment or DNS changes.
- Changes to mail-related DNS records during website work.
- Dependency installation or active builds inside the Google Drive mirror.

## Success

The foundation succeeds when the approved site is useful and credible, its content and identity are correct, accessibility and responsive checks pass, the Firebase preview has been reviewed, release evidence is retained, and production can be cut over safely with a documented rollback path.

The conversational proof succeeds only when reviewed evidence shows correct assisted navigation, useful grounded pages, effective containment and sanitization, accessible failure handling, observable bounded cost, and an explicit continue, revise, or stop decision. The methodology purpose succeeds only when sprint findings and evidence gaps are recorded and influence later SDLC² work. Proof success does not automatically authorize public release.
