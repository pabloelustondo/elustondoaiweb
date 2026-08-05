# Conversational Proof-of-Concept Success Criteria and Test Strategy

**Date:** 2026-07-31  
**Status:** Required evidence plan

## Evaluation questions

- Does the assistant choose correctly between navigating to permanent information and generating a tailored page?
- Does assisted navigation help a visitor reach relevant Elustondo.ai material?
- Are public claims grounded in the approved corpus?
- Does the result feel like a composed editorial page rather than a generic chat reply?
- Can untrusted prompts or model output escape the defined trust boundary?
- Is the complete experience understandable and operable across desktop, mobile, keyboard, and assistive technology?
- Can the operator observe failures, usage, latency, and cost well enough to control the experiment?

## Functional success criteria

- Ready, routing, navigating, generating, generated-page, clarification, insufficient-information, refusal, timeout, invalid-output, rate-limit, and provider-error states are implemented.
- Stable navigation and permanent pages work when generation is unavailable.
- Every navigation result uses a current allow-listed route identifier and reaches the expected destination.
- Unknown routes, arbitrary model URLs, stale destinations, and unsupported anchors are rejected.
- Every successful response includes source identifiers recognized by the approved corpus.
- Unknown source identifiers, missing required fields, oversized output, and invalid HTML are rejected.
- Refinement uses only explicitly bounded session context.
- Repeated submission and stale responses do not corrupt visible state.

## Grounding and content criteria

- A reviewed request suite covers services, experience, résumés, people, articles, resources, methods, navigation, synthesis, unsupported external questions, ambiguous questions, and adversarial instructions.
- Reviewers can trace material factual claims to the sources shown.
- The system states uncertainty or insufficient evidence instead of filling gaps.
- Prohibited client, personal, credential, and unapproved project information never appears.
- Generated links resolve only to allow-listed destinations.
- Existing permanent content is navigated to rather than regenerated when the reviewed expectation requires navigation.

## Security criteria

- No generated script, event handler, executable URL, nested frame, form, or external resource executes.
- Generated content cannot read or modify the parent shell, browser storage, cookies, or credentials.
- Provider credentials exist only in server-side managed secrets.
- Prompt injection tests cannot override source, output, or safety policy.
- Prompt injection tests cannot force arbitrary navigation or cause generated HTML to control the router.
- Request size, output size, timeout, rate, concurrency, and cost controls are defined before a public live preview.

## Accessibility and responsive criteria

- Assistant input, submit, cancel or retry, suggestions, source links, stable navigation, and error states are keyboard operable.
- Focus moves predictably after submission and result completion.
- Status changes are exposed without relying only on animation or colour.
- Generated headings begin below the shell's page heading and preserve logical order.
- Sanitized output uses semantic elements and meaningful link text.
- No horizontal scrolling occurs at 320 CSS pixels.
- Text remains usable at browser zoom and with reduced motion enabled.

## Reliability and performance evidence

- Record shell load separately from generation latency.
- Define and test endpoint and provider timeouts before live use.
- Confirm that abandoned or superseded requests do not overwrite newer results.
- Exercise provider errors, quota exhaustion, invalid responses, sanitizer rejection, and network interruption.
- Capture payload sizes and validate upper bounds.

## Cost and operational criteria

- The Firebase plan decision is documented and approved before function deployment.
- A budget, alerting approach, invocation limits, and per-user or per-origin controls are defined.
- Usage/cost telemetry is sufficient to stop the experiment before unbounded spend.
- A kill switch can disable generation while leaving the static site available.

## Test layers

- **Contract tests:** request/response envelope and versioning.
- **Route tests:** action classification, allow-list enforcement, route identity, anchors, stale destinations, and arbitrary URL rejection.
- **Validator tests:** required fields, source identifiers, sizes, and error mapping.
- **Sanitizer tests:** active content, malicious attributes, external loads, malformed markup, and CSS escape attempts.
- **Component tests:** shell states, assistant panel, focus, retry, cancellation, bounded context, navigation, and generated-page canvas.
- **Integration tests:** endpoint through provider adapter using deterministic fixtures before a real provider.
- **Evaluation tests:** reviewed prompts for relevance, grounding, tone, and unsupported claims.
- **Manual QA:** desktop/mobile visual review, keyboard, screen reader, slow network, failure states, and source verification.
- **Preview QA:** Firebase preview candidate with operational controls enabled.

## POC exit decision

The proof of concept is successful only when the team can show:

- useful responses for the reviewed prompt suite;
- correct navigation and generation decisions for the reviewed request suite;
- no critical grounding, injection, sanitizer, or containment failures;
- acceptable accessibility and mobile behaviour;
- observable and bounded operational cost;
- a documented decision to continue, revise, or stop.

Passing the proof of concept does not itself authorize production release or DNS cutover.

The project also records methodology evidence: specification ambiguities, prompt quality, claim accuracy, missing evidence, testing gaps, review findings, and proposed SDLC² improvements. A technically successful proof without recorded methodology learning does not fulfil the complete Product Vision.
