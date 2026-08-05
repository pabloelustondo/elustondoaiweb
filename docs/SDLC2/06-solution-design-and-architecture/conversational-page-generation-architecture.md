# AI-Assisted Navigation and Page Generation Architecture

**Date:** 2026-07-31  
**Status:** Architecture baseline for the proof of concept

## Architectural intent

Elustondo.ai combines a permanent editorial website with an experimental AI-assisted interface. The visitor may use normal navigation or describe what they want through an Assistant Panel. The system then proposes one controlled outcome:

- navigate to an existing approved site destination;
- render a tailored source-grounded HTML page;
- ask for clarification;
- report insufficient information;
- refuse the request;
- report unavailability.

The assistant is not allowed to control the website directly. The stable shell validates every proposed action and remains usable when the assistant is unavailable.

## Architectural planes

### Stable website plane

Firebase Hosting serves the official identity, permanent navigation, public pages, articles, resources, downloads, contact paths, assistant controls, accessibility behavior, source and limitation presentation, and the Generated Page Canvas.

The Stable Shell owns routing and iframe creation. No model output can replace the shell, header, navigation, assistant controls, authentication boundary, or footer.

### Assistant plane

A server-side HTTPS endpoint validates requests, selects approved destinations and sources, routes intent, invokes the model provider when needed, validates the structured action, verifies route and source identifiers, sanitizes generated HTML, and returns a safe response envelope.

### Future authenticated plane

Company-member administration and protected customer applications are future security domains. They require separate identity, authorization, tenancy, privacy, audit, and operational specifications. They must not be added as an incidental extension of the public Assistant Panel.

## Principal components

### StableShell

Owns official identity, permanent pages, public navigation, responsive layout, accessibility, assistant lifecycle, trusted errors, source disclosure, routing authority, and generated-frame containment.

### AssistantPanel

Owns visitor text input, reviewed suggestions, bounded in-memory session context, submit and refinement controls, loading state, and the integration point for a future Voice Input Adapter.

The panel may appear as a right rail on large screens or another clearly separated area. On narrow screens it must reflow without reducing the generated page to an unusable region.

### IntentRouter

Proposes exactly one action based on policy, visitor intent, approved destinations, and approved sources:

```text
navigate
render_generated_page
ask_for_clarification
insufficient_information
policy_refusal
service_unavailable
```

The Intent Router proposes; it does not execute browser navigation or render HTML.

### SiteNavigator

Maps a validated route identifier to a shell-owned destination and performs the transition. It rejects arbitrary model URLs, unsupported anchors, external navigation not on an allow-list, and stale destinations.

### ApprovedContentRetriever

Selects bounded approved records relevant to routing or page composition. For the smallest proof these may be versioned static JSON or Markdown bundled with the server implementation.

### PageGenerationCoordinator

Builds the provider request from system policy, the versioned action contract, normalized visitor intent, selected approved context, and bounded optional session context. It owns timeouts and output-size limits at the local application boundary.

### ModelAdapter

Hides provider-specific authentication, model identifiers, payloads, usage parsing, timeouts, and error translation behind a replaceable interface.

### OutputGuard

Validates the structured action contract, route identifiers, source identifiers, size, required fields, and policy. For generated pages it sanitizes HTML and rejects active or malformed content. It fails closed.

### GeneratedPageCanvas

Provides the large page-result region. It renders only sanitized scriptless HTML through iframe `srcdoc` or an equivalent isolated document boundary. It owns no routing, generation, source selection, or model logic.

### ApprovedSourcePack

Stores reviewed public facts and excerpts with stable identifiers, titles, content types, topics, approved routes or URLs, approval state, review date, and optional expiry or withdrawal state.

### TelemetryBoundary

Records bounded operational and methodology evidence: request identity, action type, outcome, source and route identifiers, duration, validation result, and bounded usage or cost metadata. Raw prompts, generated HTML, secrets, and future voice data are not retained by default.

### VoiceInputAdapter — future

Transcribes voice into normalized text before the existing assistant pipeline. It does not bypass the Intent Router, action contract, safety policy, or accessibility requirements.

## Request paths

### Navigation path

```text
Visitor
→ AssistantPanel
→ Assistant endpoint
→ ApprovedContentRetriever
→ IntentRouter
→ OutputGuard validates route identifier
→ StableShell
→ SiteNavigator
→ Existing permanent destination
```

### Generated-page path

```text
Visitor
→ AssistantPanel
→ Assistant endpoint
→ ApprovedContentRetriever
→ PageGenerationCoordinator
→ ModelAdapter
→ Model provider
→ OutputGuard validates contract and sources
→ HTML sanitizer
→ StableShell
→ GeneratedPageCanvas
→ scriptless sandboxed iframe
```

### Clarification and failure path

Clarification, insufficient-information, policy, provider, validation, quota, budget, and timeout results return typed data. The Stable Shell presents them using trusted permanent components. No candidate HTML is rendered for these outcomes.

## Trust boundaries

- Visitor text is untrusted.
- Future voice and transcripts are untrusted and privacy-sensitive.
- Approved source records are trusted only within their recorded approval scope and review date.
- Model output is always untrusted.
- A model route is a proposal, not authority.
- Sanitized HTML is displayable content, not application code.
- The browser never receives the provider credential.
- The generated frame receives no Firebase configuration, application secrets, routing authority, authentication state, or privileged parent-window access.
- Future authenticated areas remain outside the generated frame.

## Stable Shell responsibilities

- Own official identity, permanent navigation, pages, downloads, and contact paths.
- Validate input presence and client-side length.
- Track the active request and ignore stale results.
- Present loading, navigation, generated-page, clarification, refusal, retry, and failure states.
- Validate that a navigation result maps to a current shell-owned allow-list entry.
- Keep sources and limitations visible outside or alongside generated content.
- Set the frame sandbox without script permission.
- Apply site security headers and a restrictive content security policy.
- Provide a complete static fallback when the assistant is disabled.

## Assistant endpoint responsibilities

- Accept only the versioned request contract.
- Enforce method, content type, request size, origin, access, rate, concurrency, and budget policy.
- Assign a server request identifier.
- Select bounded approved source and route records.
- Keep visitor input distinct from system instructions and sources.
- Invoke the model only through the Model Adapter.
- Apply provider timeout and output-size limits.
- Require one versioned typed action.
- Verify route and source identifiers against the selected approved sets.
- Sanitize generated HTML and reject active or malformed content.
- Return no partial candidate HTML after any failed safety step.
- Emit bounded telemetry without secrets or raw content by default.

## Approved source and route model

Each source or destination record should contain, as applicable:

- stable identifier;
- title;
- approved public text or excerpt;
- shell route or canonical public destination;
- content type;
- topics or tags used only for selection;
- approval state;
- last-reviewed date;
- optional expiry or withdrawal state.

The initial endpoint does not retrieve arbitrary open-web content. Current external facts require a separately approved source-aware retrieval architecture with dates, citations, freshness, and evaluation policy.

## Validation and sanitization

Validation precedes action execution and sanitization:

1. Parse the structured response.
2. Check contract version, action, status, and required fields.
3. Enforce field, source-count, HTML, and total-size limits.
4. Verify every route identifier against the selected allow-list.
5. Verify every source identifier against the selected approved set.
6. Reject unsupported metadata and destinations.
7. For generated pages, sanitize allowed HTML and CSS.
8. Re-check the sanitized result for required structure.
9. Return a controlled invalid-output result if any step fails.

Do not attempt to make arbitrary generated applications safe. The initial generated output is a constrained, scriptless editorial document.

## Rendering containment

- Use iframe `srcdoc` or an equivalent isolated document boundary.
- Omit `allow-scripts`, `allow-forms`, `allow-popups`, `allow-top-navigation`, and same-origin privileges.
- Block external resources by default.
- Keep navigation, source links, limitations, downloads, and contact actions in the parent shell when practical.
- Never inject candidate HTML directly into the shell DOM.
- Never allow generated markup to imitate login, payment, system, or security controls.

## Future voice boundary

Voice follows this path:

```text
Voice capture
→ approved transcription boundary
→ normalized text request
→ existing assistant endpoint
```

Before implementation, voice requires explicit decisions for consent, microphone permission, transcription provider, accessibility alternative, raw-audio handling, transcript retention, error recovery, cost, and privacy.

## Failure isolation

Provider, validator, sanitizer, route, quota, budget, timeout, and voice-adapter failures must not affect permanent site availability. A kill switch can disable the assistant without removing public pages, articles, resources, downloads, people, services, or contact.

## Deployment topology

- Firebase Hosting preview channel: stable shell and approved preview configuration.
- Firebase HTTPS function: assistant endpoint after explicit approval.
- Managed secret: provider credential bound only to the function.
- Optional local or emulated function: deterministic routing and generation tests.
- GitHub workflow: build, test, and preview after separately approved implementation.

A deployed function, provider credential, billing upgrade, public preview, live-channel promotion, or DNS cutover is an explicit operational gate rather than an implementation detail.

## References

- [Product Vision](../02-intent/product-vision.md)
- [System Model and Use Cases](../03-system-model-and-use-cases/conversational-page-generation-system-model-and-use-cases.md)
- [Assistant Navigation and Generated Page Contract](../08-specifications-as-code/generated-page-contract.md)
- [Firebase Hosting preview channels](https://firebase.google.com/docs/hosting/test-preview-deploy)
- [Cloud Functions for Firebase — get started](https://firebase.google.com/docs/functions/get-started)
- [Cloud Functions environment and secret configuration](https://firebase.google.com/docs/functions/config-env)
- [Cloud Functions quotas and limits](https://firebase.google.com/docs/functions/quotas)
