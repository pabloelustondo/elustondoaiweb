# Elustondo.ai System Model and Use Cases

**Date:** 2026-07-31  
**Status:** Current system specification  
**Scope:** Stable public website, assisted navigation, generated pages, and identified future authenticated capabilities

## System purpose

The system supports two primary anonymous public journeys:

1. evaluate Elustondo.ai and its members for a potential engagement;
2. learn from Elustondo.ai’s articles, methods, papers, resources, and technical work.

It also serves as a living SDLC² case study and an experimental platform for AI-assisted interfaces.

Future authenticated journeys for company members and protected-application users are recorded for architectural awareness but are not included in the initial public implementation.

## System boundary

Inside the initial Elustondo.ai system:

- stable website shell and permanent navigation;
- public pages, articles, resources, downloads, profiles, and contact paths;
- assistant panel and bounded in-memory session state;
- assistant HTTPS endpoint;
- intent router;
- shell-owned allow-listed site destinations;
- approved source pack and retrieval or selection logic;
- page-generation coordinator and model adapter;
- structured action validator;
- source verifier and HTML sanitizer;
- safe response envelope;
- generated-page canvas and sandboxed iframe;
- operational and methodology-learning telemetry.

Outside the initial system:

- visitor browser and network;
- external model provider;
- Google and Firebase platform services;
- LinkedIn, Medium, GitHub, or other approved external destinations;
- canonical corporate records not approved for public use;
- open web and unapproved third-party content;
- voice transcription service;
- member administration and customer applications;
- production release, provider billing, credentials, and DNS decisions.

## Actors and responsibilities

### Prospective client or evaluator

A prospective client, hiring manager, partner, recruiter, or technical evaluator wants to understand services, methods, people, relevant experience, selected work, and engagement fit. The actor may open approved LinkedIn profiles, download approved résumé or capability PDFs, ask questions, and contact the company.

### Knowledge seeker

An engineer, architect, technical leader, student, researcher, potential client, or returning reader wants to discover and understand articles, papers, methods, diagrams, presentations, and related material.

### General visitor

Uses permanent navigation, the assistant, downloads, and contact paths without creating an account.

### Company member — future

One of the four Elustondo.ai members may later authenticate to maintain approved public material, profiles, résumés, assistant sources, or internal applications. Specific permissions remain undefined and require separate approval.

### Protected-application user — future

A customer or another authorized external user may later authenticate to use a protected application. This actor is not equivalent to a company member and requires a separate authorization and data-isolation model.

### Content steward

Selects public source material, verifies claims, approves examples and permanent destinations, resolves conflicts, records review dates, and withdraws obsolete material.

### Website operator

Controls availability, access policy, budgets, quotas, secrets, deployment, monitoring, kill switch, rollback, and incident response.

### SDLC² process owner

Reviews sprint evidence, agent claims, testing, code review, approval outcomes, and methodology findings so that project experience can improve SDLC².

### Assistant service

Classifies the visitor’s request and returns exactly one typed proposal: navigate, render a generated page, ask for clarification, report insufficient information, refuse, or report unavailability.

### Model provider

Transforms supplied policy, visitor intent, and approved context into a candidate structured response. It has no authority to approve facts, routes, sources, HTML, publication, or browser actions.

## Component responsibilities

- **StableShell:** official identity, permanent navigation, public content, accessibility, request lifecycle, errors, source disclosure, and final authority over routing and rendering.
- **AssistantPanel:** text input, reviewed suggestions, bounded session context, submit and refinement controls, loading state, and future voice-adapter integration point.
- **IntentRouter:** proposes whether the request should navigate, generate a page, ask for clarification, return a limitation, refuse, or fail safely.
- **SiteNavigator:** validates proposed route identifiers against the shell-owned allow-list and performs navigation; it never accepts arbitrary model URLs as authority.
- **ApprovedContentRetriever:** selects bounded approved source records and permanent destinations relevant to the request.
- **PageGenerationCoordinator:** constructs the bounded generation request, applies time and output limits, and coordinates the provider adapter and safety pipeline.
- **ModelAdapter:** owns provider-specific authentication, payload translation, model identity, usage parsing, timeout, and provider-error translation.
- **OutputGuard:** validates the action contract, verifies source and destination identifiers, sanitizes HTML, rejects active content, and fails closed.
- **GeneratedPageCanvas:** provides the large result region and renders only sanitized scriptless HTML inside the sandboxed iframe.
- **ApprovedSourcePack:** stores reviewed public facts, excerpts, resource metadata, destinations, approval state, and review dates.
- **TelemetryBoundary:** records bounded operational and methodology evidence without exposing secrets or retaining sensitive raw content by default.
- **VoiceInputAdapter — future:** transcribes voice to normalized text before the existing request pipeline; it does not bypass intent, content, safety, or accessibility policy.

## Primary assistant flow

1. The visitor enters a question or navigation request in the Assistant Panel.
2. The Stable Shell validates basic length and state, assigns a client request identifier, and shows an honest loading state.
3. The assistant endpoint validates the versioned request and applies access, origin, rate, and budget policy.
4. The Approved Content Retriever selects bounded source and destination records.
5. The Intent Router returns a candidate typed action, using the Model Adapter when required.
6. The Output Guard validates the action, contract version, sources, destination, size, and policy.
7. For `navigate`, the shell verifies the route identifier and the Site Navigator executes the transition.
8. For `render_generated_page`, the candidate HTML is sanitized and returned in a safe envelope.
9. The Stable Shell displays sources and limitations and renders the HTML inside the Generated Page Canvas sandbox.
10. For clarification, insufficient information, refusal, or failure, the shell uses trusted permanent UI rather than candidate HTML.
11. Telemetry records the action type, outcome, durations, source identifiers, and bounded usage data.

No model-provided route or HTML reaches the browser action boundary before validation. Generated HTML never controls the shell or router.

## Visitor-visible states

- **Ready:** assistant input and reviewed examples are available.
- **Submitting:** duplicate submission is prevented and cancellation may be offered.
- **Routing:** the system is resolving whether to navigate or generate.
- **Navigating:** a validated local destination is being opened.
- **Generating:** page composition is in progress; no fabricated percentage is shown.
- **Generated page:** safe page, sources, limitations, and refinement controls are visible.
- **Clarification required:** the shell asks a bounded follow-up question.
- **Insufficient information:** approved material cannot support the request.
- **Policy refusal:** the request is outside the allowed boundary.
- **Timeout or provider failure:** retry and permanent navigation remain available.
- **Invalid output:** candidate content is discarded.
- **Rate or budget limit:** a bounded availability message is shown.
- **Service disabled:** permanent pages, downloads, and contact remain available.

## Primary business use cases

### UC-01: Evaluate Elustondo.ai for an engagement

**Actor:** Prospective client or evaluator.  
**Goal:** Decide whether the company and its members are credible and suitable for a contract.  
**Authentication:** None.

**Main flow:**

1. The visitor arrives through the homepage, a profile, an article, a search result, or a direct referral.
2. The visitor reviews services, methods, selected work, and approved experience.
3. The visitor opens approved LinkedIn profiles or downloads an approved résumé, capability statement, paper, or presentation.
4. The visitor may ask a question such as which person has relevant experience or how the company approaches a particular technology or delivery problem.
5. The assistant navigates to an existing destination or generates a tailored source-grounded page.
6. The visitor contacts the company, requests a conversation, downloads material, or keeps Elustondo.ai under consideration.

**Success outcome:** The visitor obtains enough trustworthy information to make an engagement or screening decision.

### UC-02: Learn from Elustondo.ai

**Actor:** Knowledge seeker.  
**Goal:** Find and understand useful technical material.  
**Authentication:** None.

**Main flow:**

1. The visitor discovers recent, featured, or topic-related material.
2. The visitor browses articles, methods, papers, diagrams, presentations, projects, or resources.
3. The visitor reads permanent content, opens an approved external publication, or downloads a resource.
4. The visitor may ask a question spanning one or several approved sources.
5. The assistant navigates to the best existing material or composes a tailored page with visible sources.
6. The visitor follows related material and may return to the site as a technical reference.

**Success outcome:** The visitor learns something useful and can trace the explanation to stable sources.

### UC-03A: Maintain the site as a company member — future

**Actor:** Authenticated Elustondo.ai company member.  
**Goal:** Maintain approved public information or use an internal application.  
**Authentication:** Required.

Potential future responsibilities include article management, resource uploads, profile and résumé maintenance, source approval, and internal applications. Exact permissions, workflows, data ownership, security, and audit requirements are not yet specified.

### UC-03B: Use a protected customer application — future

**Actor:** Authorized customer or application user.  
**Goal:** Use a protected service supplied through Elustondo.ai.  
**Authentication:** Required.

This use case requires a separate product definition, tenant and authorization model, privacy boundary, operational ownership, and release plan. It must not inherit company-member permissions.

## Assistant-support use cases

### UC-04: Navigate through natural language

**Trigger:** The visitor requests information already represented by an approved permanent destination.  
**Outcome:** The endpoint proposes an allow-listed route identifier; the shell validates and performs navigation.

### UC-05: Generate a tailored page

**Trigger:** No single permanent page adequately answers a supported question.  
**Outcome:** The system composes a grounded, sanitized HTML page with visible approved sources and renders it in the sandbox.

### UC-06: Refine a result

**Precondition:** A navigation or generated-page result exists in the current browser session.  
**Outcome:** Only explicitly bounded session context is used; no persistent visitor profile is created.

### UC-07: Ask an ambiguous question

**Trigger:** The system cannot confidently choose a destination or generation task.  
**Outcome:** The trusted shell asks a concise clarification rather than guessing.

### UC-08: Ask beyond the approved corpus

**Trigger:** Approved material cannot support the request, including a current external-fact question without approved retrieval.  
**Outcome:** No invented answer; the system states the boundary and offers permanent navigation, sources, or contact.

### UC-09: Attempt prompt injection or active content

**Trigger:** The visitor asks for hidden instructions, private data, scripts, external embeds, unauthorized routes, or policy bypass.  
**Outcome:** The request is rejected or safely constrained; candidate output receives no execution or routing authority.

### UC-10: Experience a provider, validation, quota, or timeout failure

**Outcome:** Candidate output is discarded, typed telemetry is recorded, and permanent navigation, downloads, and contact remain usable.

### UC-11: Review source, route, policy, or model changes

**Actor:** Content steward or operator.  
**Outcome:** Evaluation, navigation, contract, sanitizer, accessibility, and safety tests are rerun before preview promotion.

### UC-12: Record methodology learning

**Actor:** SDLC² process owner.  
**Trigger:** A sprint is tested, reviewed, corrected, approved, blocked, or closed.  
**Outcome:** Evidence gaps, prompt quality, component-boundary issues, process friction, and proposed SDLC² improvements are recorded and considered during next-sprint planning.

## Information retention

- Keep public visitor session context in browser memory only unless a later privacy decision authorizes persistence.
- Do not log raw prompts, generated HTML, voice, or transcripts by default.
- Retain request identifiers, action type, status, timing, policy result, source and route identifiers, and bounded usage or cost metadata.
- Never log provider secrets, authorization headers, private source content, résumé data not approved for public use, or protected-application information.
- Future authentication and voice capabilities require separate retention and privacy specifications.
