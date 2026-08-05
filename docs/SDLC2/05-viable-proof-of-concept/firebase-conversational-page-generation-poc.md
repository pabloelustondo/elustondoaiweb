# Firebase Conversational Page Generation — Smallest Viable Proof of Concept

**Date:** 2026-07-31  
**Status:** Proposed proof; no implementation or deployment authorized by this document

## Hypothesis

A stable Elustondo.ai shell can accept a visitor's intent, safely choose between navigating to permanent information and presenting a useful grounded HTML page generated from a small approved corpus, and remain usable without allowing model output to control the site.

## Smallest proof

The proof contains:

- one responsive shell page using the official visual direction;
- permanent navigation and a static fallback explanation;
- one Assistant Panel with text input and reviewed examples;
- one large Generated Page Canvas;
- deterministic navigation and generated-page fixtures for early UI and safety work;
- one HTTPS assistant endpoint for the live experiment;
- one shell-owned route allow-list;
- a small versioned source pack;
- one replaceable model-provider adapter;
- structured response validation;
- HTML sanitization;
- a scriptless sandboxed iframe;
- visible sources and limitations;
- bounded telemetry and a generation kill switch.

It does not require a database, authentication, CMS, persistent chat history, voice, autonomous agents, open-web research, or production DNS.

## Proof sequence

### POC-0: Deterministic shell

- Implement ready, routing, navigating, generating, generated-page, clarification, refusal, insufficient-information, and error states using fixed fixtures.
- Demonstrate at least one allow-listed navigation result and one source-grounded generated page.
- Verify design, mobile layout, keyboard flow, status announcements, and sandbox containment.
- Demonstrate that the permanent site remains usable with generation disabled.

No provider key, billing change, or live function is required.

### POC-1: Local or emulated endpoint

- Implement the assistant action request/response contract.
- Use deterministic provider fixtures.
- Add route and source selection, action validation, route allow-list enforcement, sanitization, timeouts, and bounded errors.
- Run contract, route, injection, sanitizer, and accessibility tests.

### POC-2: Controlled live generation

Prerequisites:

- explicit approval of the model/provider;
- usable provider credential stored through managed server-side secrets;
- explicit Firebase Blaze/billing decision;
- budget, quotas, rate limits, and kill switch;
- approved source pack and evaluation prompts.

Deploy only to a controlled preview, not the public domain.

### POC-3: Evidence review

- Run the reviewed prompt and adversarial suites.
- Inspect source grounding, unsupported claims, accessibility, responsiveness, failures, latency, and usage/cost evidence.
- Record a continue, revise, or stop decision.

## POC source pack

Start with a deliberately small set of approved records representing:

- company identity and contact boundary;
- one method;
- one or two articles;
- one project with approved public claims;
- approved people/role information;
- permanent page URLs.

Each record must carry an identifier, title, public text when applicable, route or destination, approval status, and last-reviewed date.

## Required evidence

- screenshots or recordings of every shell state on desktop and mobile;
- keyboard and accessibility observations;
- contract and sanitizer test results;
- representative grounded responses with their sources;
- representative navigation results with their expected allow-listed destinations;
- unsupported and adversarial prompt results;
- provider and validation failure evidence;
- latency and bounded usage/cost summary;
- preview URL and exact reviewed version;
- content-steward and release/operations decisions.

## Stop conditions

Stop live experimentation if:

- the system repeatedly invents facts or sources;
- active content can escape validation or containment;
- private or unapproved material appears;
- cost or request volume cannot be bounded;
- the provider credential cannot be protected;
- the static shell or contact path becomes unavailable;
- required operational approval is absent.

## Explicit future experiments

- Voice input through a separately approved transcription and privacy boundary.
- Authenticated member administration.
- Protected customer applications with a separate authorization model.
- Source-aware external research with dates, citations, freshness policy, and evaluation.

These are Product Vision directions, not part of the smallest proof.
