# Elustondo.ai Product Vision

**Date:** 2026-07-31  
**Status:** Current product vision  
**Owner:** Elustondo Systems Consulting Inc.

## Vision statement

Elustondo.ai will be a credible and useful public presence for the company, a knowledge destination for software and AI engineering, a living case study through which SDLC² is exercised and improved, and a controlled laboratory for AI-assisted web interfaces that can navigate existing information or compose a purpose-built page for a visitor.

The site should demonstrate the company’s capability through the usefulness, clarity, evidence, and engineering discipline of the experience itself.

## Three product purposes

### 1. Fulfil the company and knowledge use cases

The primary purpose is to help public visitors do two things without registration.

First, a prospective client, hiring manager, partner, recruiter, or technical evaluator must be able to understand Elustondo.ai’s services, methods, experience, people, and selected work. The visitor may review approved LinkedIn profiles, download approved résumé or capability-statement PDFs, ask questions about relevant experience, and contact the company about an engagement.

Second, an engineer, architect, technical leader, student, researcher, potential client, or returning reader must be able to learn from Elustondo.ai. The site will provide articles, methods, papers, diagrams, presentations, downloads, and related material organized for discovery and careful reading.

The editorial inspiration is the role played by an authoritative technical-practice website such as Martin Fowler’s: visitors often arrive primarily to learn, while the depth and usefulness of the published work provide credible reasons to engage the practice.

### 2. Exercise and improve SDLC²

The website is a real test of the SDLC² methodology, not merely a site developed while methodology documents sit separately.

Every sprint should help the team learn:

- whether the vision, intent, use cases, component boundaries, specifications, and prompts gave agents sufficient context;
- whether the Sprint Plan created a useful authorization boundary;
- whether the implementation agent’s delivered-scope claim was accurate;
- whether Developer Integration Testing and code review found meaningful gaps;
- which evidence was necessary to support completion claims;
- which parts of the methodology were unclear, cumbersome, missing, or especially valuable;
- what should be improved in SDLC² before the next sprint or another project.

Sprint disposition, retrospectives, evidence gaps, and methodology lessons are therefore first-class project outputs.

### 3. Learn and experiment with new technologies and patterns

Elustondo.ai is the first company site intended to test an AI-assisted interface as a primary interaction pattern.

The permanent website will provide normal pages and navigation. Alongside that stable foundation, an assistant panel will accept a visitor’s question or instruction. On large screens the panel may appear as a right rail or another clearly separated control area; exact placement remains a design decision. A large generated-page canvas will display a tailored answer as formatted HTML inside an isolated iframe.

The assistant has two principal responsibilities:

1. **Navigate existing information.** When an approved permanent page already answers the request, the assistant proposes a safe, allow-listed navigation action.
2. **Generate a purpose-built page.** When no single page adequately answers the request, the system composes a source-grounded HTML document and displays it in the generated-page canvas.

The generated answer may use headings, prose, lists, tables, timelines, comparisons, and other approved scriptless editorial structures. It should feel like a contextual web page rather than a conventional chat bubble containing a long paragraph.

## Product audiences and use-case priority

| Audience or capability | Authentication | Priority |
|---|---|---|
| Prospective client or evaluator | None | Primary initial use case |
| Reader or knowledge seeker | None | Primary initial use case |
| Elustondo.ai company member | Required in a future release | Future |
| Customer or protected-application user | Required in a future release | Future |
| General public registration | Not required | Excluded from the initial release |

The first two public journeys must never be hidden behind registration.

## Public experience

The stable site should provide permanent destinations such as:

```text
Home
Services
Experience / Projects
People
Articles
Resources
Methods
Ask Elustondo.ai
About
Contact
```

The exact labels may evolve through information-architecture work, but the product responsibilities remain distinct.

For prospective engagements, the experience should support:

- service and capability discovery;
- team experience and approved public profiles;
- approved project and case-study evidence;
- LinkedIn destinations;
- downloadable résumé, capability, paper, or presentation PDFs;
- questions about experience, technologies, methods, and team fit;
- a direct contact or meeting-request path.

For readers, the experience should support:

- recent and selected writing;
- browsing by topic, method, author, or project;
- permanent articles and curated external publications;
- papers, diagrams, presentations, and downloadable material;
- questions spanning multiple approved sources;
- related-material discovery and links to the permanent sources used.

## AI-assisted interaction model

The assistant is not allowed to control the permanent website directly. It returns one typed proposal to the stable shell:

- navigate to an allow-listed site destination;
- render a sanitized generated page;
- ask for clarification;
- report insufficient approved information;
- refuse a request outside policy;
- report that the service is unavailable.

The stable shell validates the proposal and owns the resulting navigation, loading, errors, source disclosure, and iframe rendering.

Generated content is always untrusted until it passes the versioned contract, source verification, HTML validation, sanitization, and sandbox policy. It cannot replace or control the header, navigation, footer, assistant controls, authentication, or application routing.

## Future voice interaction

Voice is a future input adapter, not a separate product architecture:

```text
Voice input
→ transcription
→ normalized visitor request
→ the same intent-routing pipeline
→ navigation or generated page
```

Voice support requires separate privacy, consent, transcription, accessibility, retention, and operational decisions before implementation.

## Future authenticated capabilities

Authentication is not part of the two primary public use cases.

The initial authenticated audience will be the four Elustondo.ai company members. Potential future responsibilities include maintaining public content, uploading approved resources, updating profiles and résumés, approving assistant source material, and accessing internal or experimental applications.

A later protected-application audience may include customers or other authorized external users. Company members and external application users are separate roles and must not share permissions merely because both can log in.

No specific member-administration or customer-application feature is authorized by this vision. Each requires its own use cases, security model, privacy decisions, architecture, sprint, and approval.

## Knowledge boundary

The initial assistant is grounded in approved Elustondo.ai material: company information, services, people, experience, projects, articles, methods, and approved related technical resources.

A question such as “What is the GDP growth story in Argentina?” illustrates the long-term ability to generate a tailored page, but a current external-fact answer requires a different capability: source-aware external retrieval, publication dates, citations, freshness rules, evaluation, and an explicit content policy. The initial system must not answer time-sensitive external questions from model memory and present them as authoritative.

External research may become a future experiment, but it is not silently included in the first source-grounded release.

## Stable-foundation invariant

The permanent site must remain useful if the assistant is disabled, unavailable, rate-limited, over budget, or rejected by policy.

```text
Assistant available
→ normal navigation plus assisted navigation and generated pages

Assistant unavailable
→ normal pages, articles, downloads, people, services, and contact still work
```

The experimental interface must never become a single point of failure for the company’s public identity or contact path.

## Product success

The product succeeds when:

- prospective clients can evaluate the company and reach a contact decision;
- readers repeatedly find useful, trustworthy technical material;
- public information is accessible without registration;
- assistant navigation reaches the correct existing destination;
- generated pages are useful, grounded, safe, accessible, and visibly sourced;
- the stable site remains fully usable without AI;
- each sprint produces trustworthy implementation, testing, review, and approval evidence;
- SDLC² lessons are recorded and influence later sprints;
- experiments remain bounded by explicit operational, privacy, cost, and release decisions.

## Current release boundary

The initial release should prioritize the two anonymous public use cases, the stable editorial site, deterministic assisted-navigation and generated-page fixtures, and the smallest controlled source-grounded generation proof.

Member login, customer applications, voice, general open-web research, persistent personalization, and autonomous actions remain future capabilities requiring separate authorization.
