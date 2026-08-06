# Elustondo.ai System Definition

> **Documentation:** [1. System Definition](../01_SystemDefinition/README_ai.md) · [2. Developer Guide](../02_DeveloperGuide/README_ai.md) · [3. Architecture](../03_Architecture/README_ai.md) · [4. SDLC2](../04_SDLC2/README_ai.md)

**Status:** AI-authored current-state guide; awaiting human review
**Last reconciled:** 2026-08-05
**Scope:** The implemented public application, the implemented-but-not-yet-integrated Medium Article Curator, and their verified boundaries

## Purpose

Elustondo.ai is the public digital entry point for Elustondo Systems Consulting Inc. It exists to help people understand the practice, evaluate whether its experience fits an engagement, and learn from its technical writing, methods, and selected work.

The application also serves two internal purposes: it is a living case study for exercising and improving SDLC2, and it is a controlled environment for exploring intelligent user interfaces. Those experimental goals do not weaken the public experience: the permanent site must remain useful when every AI or external-content service is unavailable.

This document defines the current system. It is not a marketing page, a command reference, a sprint history, or a claim that configured cloud components are deployed.

## Value and audiences

Elustondo.ai supports two primary anonymous audiences.

### Prospective clients and professional evaluators

They need to understand:

- who Elustondo.ai is;
- the team's areas of experience;
- the methods and engineering perspective behind the work;
- selected public projects and writing;
- how to contact the company.

This journey must not require registration.

### Readers and knowledge seekers

They come to discover technical articles, methods, research, and selected project material. The experience should make durable ideas easy to find by subject and editorial relevance, while also showing recent writing.

This journey must not require registration either.

Company members, authenticated customers, and users of future hosted applications are future audiences. They are not part of the current public system boundary.

## Actors and external participants

| Actor or participant | Current relationship to the system |
|---|---|
| Anonymous visitor | Browses permanent pages and follows approved public destinations. |
| Pablo Elustondo | Owns product direction, public-content approval, editorial overrides, and consequential release decisions. |
| Elustondo.ai team member | Appears through approved public identity information; no member administration capability exists yet. |
| Developer or development agent | Changes the repository within SDLC2 authorization and evidence boundaries. |
| Medium | Hosts Pablo's articles and the approved Elustondo.ai list used by the curator. |
| LinkedIn | Provides approved public profile destinations; it is not queried during visitor requests. |
| GitHub | Holds canonical version history and selected public project destinations; repositories are not mirrored automatically into the site. |
| Firebase and Google Cloud | Are configured as hosting, scheduled execution, identity, and storage mechanisms. Configuration is not proof of deployment. |
| Gemini through LangChain | Assists the background curator with list observation and bounded classification. It has no editorial or release authority. |

## Current system boundary

The current repository contains two independently useful implementation boundaries:

1. **Public frontend.** A static React and Vite application with Home, Articles, Projects, Methods, People, About, Contact, and a branded not-found experience. It reads reviewed records bundled with the application.
2. **Medium Article Curator.** A scheduled backend component that can observe the approved Medium source, compare it with prior state, classify new or changed articles, preserve editorial decisions, and store a candidate curated state.

These boundaries are not yet connected in production. The frontend does not read the curator's Firebase Storage output. A cloud-ready function, schedule, or adapter in the repository does not prove that it is deployed or operating.

```text
Anonymous visitor
        |
        v
Static frontend --> reviewed bundled content --> permanent page

Background schedule --> Medium Article Curator --> candidate curated state
                              |                         |
                              +--> Medium              +--> not yet consumed by frontend
                              +--> Gemini via LangChain
```

## Current capabilities

### Stable public experience

The frontend currently provides:

- official Elustondo.ai identity and a responsive, accessible shell;
- permanent navigation and direct-entry routes;
- reviewed company, people, project, method, contact, and article records;
- article organization by the approved pillars `SDLC²`, `Architecture`, and `Modernization`;
- deterministic recent and relevance ordering;
- explicit handling of unclassified material;
- external links only to reviewed public destinations;
- useful operation without Medium, LinkedIn, GitHub, Gemini, Firebase Functions, or the curator at visitor time.

### Controlled public-content boundary

Public content follows these rules:

- facts, profiles, project disclosures, links, and downloadable material require an approved public source and scope;
- private repository URLs, paths, source material, client information, and confidential details are excluded;
- public GitHub repositories are candidates, not automatic publications;
- LinkedIn is the source or destination for supported public identity information, not permission to invent a biography;
- Medium is the publishing source for approved articles, while the frontend serves reviewed local metadata;
- the repository's `SDLC2.md` is the current canonical source for the public SDLC2 method description;
- unresolved or unsafe material is omitted rather than guessed.

### Medium Article Curator

The curator exists to avoid a second manually maintained article catalog while keeping visitor rendering independent of Medium and AI availability. One bounded run can:

1. load the last-known-good curator state;
2. observe exact membership of Pablo's approved Elustondo.ai Medium list;
3. use Pablo's Medium profile feed to enrich matching metadata;
4. normalize and validate supported Medium records;
5. detect additions, edits, and missing records;
6. classify only new or changed records that do not have a human editorial override;
7. require the same missing set in two consecutive observations before removal;
8. save state and a bounded run record.

Pablo retains human editorial authority. Gemini output is constrained, validated, attributable as machine-curated, and correctable. It cannot approve publication, change a human override, deploy the site, or decide release scope.

## Article eligibility and destination

Eligibility and placement are different decisions:

- **Eligibility** asks whether an article may enter the Elustondo.ai curation process.
- **Destination** asks where an eligible article belongs in the reader experience.

The current implementation uses membership in Pablo's approved Elustondo.ai Medium list as its inclusion signal, together with exact-author and Medium-record validation. The current destination pillars are `SDLC²`, `Architecture`, and `Modernization`.

The reviewed Correction 002 source also describes a desired policy in which the Medium `AI Philosophy` topic becomes the eligibility signal and `ES2` may become a destination pillar. That policy is **not implemented in the current contracts, filters, fixtures, or tests**. It therefore remains an explicit policy-alignment item for a later SDLC2 change; this maintained definition does not present it as operational reality or finalize the evolving ES2 taxonomy.

## Principal user journeys

### Evaluate Elustondo.ai

1. A visitor lands on the public application.
2. They review the company positioning, people, methods, selected projects, and writing.
3. They may follow approved LinkedIn, Medium, or GitHub destinations.
4. They contact the company through the approved direct email path.

### Learn from Elustondo.ai

1. A reader opens Articles or another knowledge destination.
2. They browse recent writing or a subject pillar.
3. They see reviewed titles, summaries, dates, and provenance.
4. They open the canonical Medium publication when they want the full article.

### Maintain the article collection

1. A scheduled or safe local curator run observes the approved Medium source.
2. The curator compares the observation with previous state.
3. Deterministic rules handle known changes; Gemini through LangChain assists bounded classification where configured.
4. The result is validated and recorded without replacing Pablo's editorial authority.
5. Publication into the public frontend remains a separate controlled step today.

## External dependencies and failure meaning

| Dependency | What it contributes | What happens when it is unavailable |
|---|---|---|
| Medium list and profile feed | Article membership observation and metadata enrichment | The curator run fails or defers change; the bundled public site remains available. |
| Gemini through LangChain | Structured list observation and classification assistance | The affected curator run fails; existing public content remains available. |
| Firebase Functions scheduler | Intended 15-minute background trigger | No scheduled refresh occurs; visitor pages remain static. |
| Firebase Storage | Intended curator state and run-record persistence | Remote curator persistence cannot complete; no visitor request depends on it. |
| Firebase Hosting | Target static delivery mechanism | Local builds still exist, but no production availability claim follows from repository configuration. |
| GitHub | Version history and reviewed integration | It is not a visitor-time runtime dependency. |

## Constraints and invariants

- The public application must work without AI and without visitor-time external-content calls.
- Model output and external-source data are untrusted until narrowed and validated.
- Human editorial authority remains with Pablo.
- No private or confidential project material may cross the publication boundary.
- Official brand assets must not be redrawn, recoloured, distorted, or regenerated.
- Responsive behavior must support narrow screens down to 320 CSS pixels without horizontal overflow.
- Permanent navigation, keyboard access, visible focus, semantic structure, and reduced-motion support are product requirements.
- A fixture, local run, configuration file, successful build, or preview is not evidence of production operation.
- Deployment, billing, credentials, production promotion, and DNS changes are separate human-authorized actions.

## Explicit non-goals of the current system

The current implementation does not provide:

- visitor accounts, member login, customer tenancy, or protected applications;
- a content-management system or database-backed editorial interface;
- payment processing;
- persistent conversations, voice input, or autonomous actions;
- open-web research or a live news aggregator;
- a deployed assistant endpoint, generated-page canvas, or AI-controlled navigation;
- automatic public publication of every Medium article or GitHub repository;
- proof that Firebase, Gemini, Storage, or the schedule is live.

Those ideas may appear in Product Vision or design records. They remain proposals until an authorized SDLC2 change is implemented, verified, accepted, and graduated into this document.

## Reading order

Use this breadth-first order:

1. **System Definition** — purpose, actors, capabilities, rules, journeys, and boundaries.
2. **[Developer Guide](../02_DeveloperGuide/README_ai.md)** — repository structure, commands, safe local work, and operational gates.
3. **[Architecture](../03_Architecture/README_ai.md)** — technical responsibilities, flows, decisions, failure containment, and trade-offs.
4. **[SDLC2](../04_SDLC2/README_ai.md)** — how changes are proposed, authorized, implemented, verified, reviewed, accepted, observed, and learned from.

The maintained guides describe current reality. Sprint-specific intent, proposals, claims, evidence, and historical decisions remain in SDLC2.
