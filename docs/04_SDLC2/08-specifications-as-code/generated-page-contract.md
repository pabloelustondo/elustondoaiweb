# Assistant Navigation and Generated Page Contract

**Version:** 0.2  
**Date:** 2026-07-31  
**Status:** Agent-ready contract baseline

Version 0.2 expands the original generated-page-only draft so the assistant can propose either navigation to existing permanent content or rendering of a tailored generated page. No deployed 0.1 compatibility obligation currently exists.

## Endpoint

The proof of concept exposes one server-side HTTPS operation:

`POST /api/assist`

The final deployed route may use a Firebase Hosting rewrite or direct function URL. Clients depend on the versioned contract, not the physical route.

## Request

```json
{
  "contractVersion": "0.2",
  "input": {
    "kind": "text",
    "text": "Show me Pablo's relevant solution-architecture experience."
  },
  "context": {
    "previousRequestId": null,
    "refinement": null,
    "currentRouteId": "home"
  }
}
```

Rules:

- `contractVersion` is required.
- `input.kind` is `text` in the initial proof.
- `input.text` is required, normalized, and subject to configured length limits.
- `context` is optional and bounded.
- `currentRouteId` is advisory context and must match a known shell route if supplied.
- Unknown fields are rejected or ignored according to the version policy; behavior must be tested.
- Client-supplied route identifiers, sources, policy, HTML, system instructions, model options, and destinations are not trusted.
- Future voice transcription produces normalized text before this contract; raw audio is not included in version 0.2.

## Common response fields

Every response includes:

```json
{
  "contractVersion": "0.2",
  "requestId": "server-generated-id",
  "status": "success",
  "action": "navigate"
}
```

Allowed action values:

- `navigate`
- `render_generated_page`
- `ask_for_clarification`
- `insufficient_information`
- `policy_refusal`
- `service_unavailable`

The service returns exactly one action. Action-specific required and prohibited fields are validated before the shell receives the response.

## Navigation response

```json
{
  "contractVersion": "0.2",
  "requestId": "server-generated-id",
  "status": "success",
  "action": "navigate",
  "destination": {
    "routeId": "people-pablo",
    "anchorId": "experience"
  },
  "message": "Pablo's approved profile contains the relevant experience.",
  "sources": [
    {
      "id": "people-pablo-profile",
      "title": "Pablo Elustondo — approved public profile",
      "routeId": "people-pablo"
    }
  ],
  "limitations": []
}
```

Navigation rules:

- `routeId` must match a current shell-owned allow-list entry selected for the request.
- `anchorId`, when present, must be valid for that route.
- The endpoint returns no arbitrary destination URL as navigation authority.
- The shell revalidates the route before execution.
- Generated HTML is prohibited in a `navigate` response.
- Approved external destinations such as LinkedIn require a separately typed or explicitly allow-listed shell action; they are not silently treated as local routes.

## Generated-page response

```json
{
  "contractVersion": "0.2",
  "requestId": "server-generated-id",
  "status": "success",
  "action": "render_generated_page",
  "page": {
    "title": "Relevant solution-architecture experience",
    "html": "<article>...</article>"
  },
  "sources": [
    {
      "id": "approved-source-id",
      "title": "Approved source title",
      "routeId": "methods-example"
    }
  ],
  "limitations": [],
  "usage": {
    "provider": "configured-provider",
    "model": "configured-model",
    "inputUnits": null,
    "outputUnits": null
  }
}
```

The browser receives only sanitized `page.html`. Candidate provider output must never enter this envelope before action validation, source verification, and sanitization.

## Clarification response

```json
{
  "contractVersion": "0.2",
  "requestId": "server-generated-id",
  "status": "clarification_required",
  "action": "ask_for_clarification",
  "message": "Which technology or type of engagement would you like to evaluate?",
  "suggestions": [
    "Solution architecture",
    "AI-assisted development",
    "Mobile engineering"
  ],
  "retryable": true
}
```

Clarification uses trusted shell components. It never returns generated HTML.

## Insufficient-information response

```json
{
  "contractVersion": "0.2",
  "requestId": "server-generated-id",
  "status": "insufficient_information",
  "action": "insufficient_information",
  "message": "The approved Elustondo.ai material does not support this request.",
  "retryable": false
}
```

This is the expected initial response for time-sensitive external questions when no separately approved source-aware retrieval capability exists.

## Policy-refusal response

```json
{
  "contractVersion": "0.2",
  "requestId": "server-generated-id",
  "status": "policy_refusal",
  "action": "policy_refusal",
  "message": "This request is outside the supported public-information boundary.",
  "retryable": false
}
```

## Service-unavailable response

```json
{
  "contractVersion": "0.2",
  "requestId": "server-generated-id",
  "status": "provider_timeout",
  "action": "service_unavailable",
  "message": "The assistant is temporarily unavailable. The permanent site remains available.",
  "retryable": true
}
```

Allowed status values:

- `success`
- `clarification_required`
- `insufficient_information`
- `invalid_request`
- `policy_refusal`
- `rate_limited`
- `budget_limited`
- `provider_timeout`
- `provider_error`
- `invalid_generated_output`
- `service_disabled`

The action and status combination must be validated. For example, `success` may accompany `navigate` or `render_generated_page`, while a provider timeout must use `service_unavailable`.

## HTML allow-list

Initial allowed structural elements:

- `article`, `section`, `header`, `footer`, `aside`
- `h2` through `h6`
- `p`, `blockquote`, `pre`, `code`
- `ul`, `ol`, `li`, `dl`, `dt`, `dd`
- `strong`, `em`, `small`, `span`
- `table`, `caption`, `thead`, `tbody`, `tr`, `th`, `td`
- `a` only for allow-listed destinations
- `hr`

The shell owns the page-level `h1`; generated content starts at `h2`.

Initially prohibited:

- `script`, `style`, `link`, `meta`, `base`
- `iframe`, `object`, `embed`, `canvas`, `svg`, `math`
- `form`, `input`, `button`, `select`, `textarea`
- `video`, `audio`, `source`, `track`
- generated images or external resources until a separate allow-list and alt-text policy exists.

Voice support does not permit generated audio elements inside the page. Voice input and generated-page media are separate concerns.

## Attribute and URL policy

- Remove all event-handler attributes.
- Remove inline scripts and executable or data URLs.
- Allow only explicitly reviewed attributes needed for semantics and accessibility.
- Links resolve through an allow-list and receive safe target and relationship handling.
- Generated IDs and classes are optional and must use a constrained prefix if enabled.
- Inline style is prohibited in the initial proof unless a reviewed CSS-property sanitizer is added.
- Generated content cannot invoke shell routes directly; navigation remains a parent-shell action.

## Size and structure policy

Implementation must define and test:

- maximum input length;
- maximum bounded session context;
- maximum selected source size;
- maximum provider response size;
- maximum sanitized HTML size;
- maximum source and suggestion counts;
- request and provider timeouts.

These values belong in controlled configuration, not visitor input.

## Validation result

Validation returns either:

- one safe, versioned action envelope; or
- one typed non-success envelope.

It never returns a partially accepted route or candidate HTML.

## Versioning

- Breaking request, action, or response changes require a new contract version.
- The shell and endpoint reject unsupported versions explicitly.
- Contract fixtures for every action and status combination are retained for regression tests.
- Navigation allow-list changes require route-contract tests.
