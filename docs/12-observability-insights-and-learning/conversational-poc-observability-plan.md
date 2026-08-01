# Conversational Proof-of-Concept Observability Plan

**Date:** 2026-07-31  
**Status:** Required observability baseline

## Objectives

Observability must answer:

- Is the service available?
- Which stage failed?
- Did the assistant navigate to approved permanent content, generate a bounded page, request clarification, or decline?
- Are responses grounded and passing policy?
- How long do source selection, provider generation, validation, and sanitization take?
- Are requests, usage, and cost within approved limits?
- Are visitors reaching useful source material?
- Should the experiment continue, change, or stop?

## Request lifecycle events

- request accepted or rejected;
- intent classified as navigation, page generation, clarification, insufficient information, refusal, or unavailable;
- proposed route accepted or rejected by the shell allow-list;
- source selection completed;
- provider call started and completed;
- provider timeout or error;
- structured validation passed or failed;
- sanitizer passed or rejected output;
- response returned;
- client rendered success or controlled error;
- request cancelled, superseded, or abandoned.

Each event should use a request identifier and stage/status fields. Do not use raw prompt text as the identifier.

## Metrics

- total accepted/rejected requests;
- navigation-success, generation-success, clarification, refusal, insufficient-source, timeout, provider-error, invalid-output, unknown-route, rate-limit, and budget-limit counts;
- end-to-end and per-stage durations;
- selected-source count;
- provider usage units and bounded cost estimate when available;
- validator and sanitizer rejection reasons;
- response and sanitized HTML sizes;
- client render failures;
- assistant kill-switch state.

## Privacy-safe logging

By default, do not log:

- raw visitor prompts;
- generated HTML;
- provider credentials or authorization headers;
- private source content;
- names, email addresses, IP addresses, or persistent user identifiers unless a reviewed operational requirement and notice exists.

For debugging, prefer:

- request identifier;
- prompt length and coarse category;
- source identifiers;
- contract version;
- action type and approved route identifier, when applicable;
- policy decision;
- status and error category;
- durations and bounded usage data.

Any temporary detailed logging requires explicit scope, access, retention, and deletion decisions.

## Evaluation evidence

Automated operational metrics do not prove content quality. Maintain a separate reviewed evaluation record containing:

- prompt identifier and purpose;
- expected relevant sources;
- observed sources;
- grounding and unsupported-claim assessment;
- usefulness and tone assessment;
- accessibility or rendering issues;
- reviewer and date;
- disposition.

Use synthetic or approved prompts; do not place private visitor prompts in the durable evaluation set.

## Alerts and stop signals

Define alerts or operational responses for:

- request or cost threshold approached;
- repeated provider failure;
- elevated invalid-output or sanitizer rejection rate;
- unexpected source identifiers;
- latency degradation;
- kill-switch activation;
- any confirmed private-data, active-content, or unsupported-claim incident.

Critical safety or privacy incidents stop the live assistant while leaving the static site available.

## Learning loop

At each review:

1. Compare intended use cases with observed results.
2. Separate content-corpus gaps from prompt, model, validator, sanitizer, or UX defects.
3. Update one responsibility at a time where practical.
4. Rerun the relevant regression and evaluation suites.
5. Record whether the change improved usefulness without weakening safety, accessibility, or cost control.
6. Record any SDLC² process lesson in the sprint package, including whether a document, gate, role, or evidence rule should change for the next sprint.
