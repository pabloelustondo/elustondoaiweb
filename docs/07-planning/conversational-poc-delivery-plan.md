# Conversational Proof-of-Concept Delivery Plan

**Date:** 2026-07-31  
**Status:** Planning baseline; execution requires explicit authorization

## Delivery principle

Prove the riskiest responsibilities in order: stable experience, explicit contract, containment, grounding, live provider call, then operational control. Do not begin with public deployment or a visually polished but unbounded generator.

## Phase 1: Documentation and decisions

- Approve Product Vision, audiences, public and future authenticated use cases, knowledge boundary, content policy, architecture, assistant action contract, and success criteria.
- Select the first source pack and content owner.
- Decide whether the live proof will be private, allow-listed, or public.
- Select provider/model.
- Decide whether to approve Blaze billing and define budget/limit ownership.

**Gate:** no code or infrastructure change until the package and immediate implementation scope are approved.

## Phase 2: Deterministic shell proof

- Add official build-time brand assets.
- Implement stable navigation, Assistant Panel, Generated Page Canvas, sources and limitations, and all UI states.
- Use fixed fixtures for allow-listed navigation, generated pages, clarification, insufficient information, refusal, invalid output, and unavailability.
- Verify the route allow-list, responsive layout, keyboard flow, accessibility, and frame containment.

**Evidence:** shell tests, screenshots, manual QA notes, and fixture-based safety results.

## Phase 3: Endpoint and safety pipeline

- Implement the versioned assistant action request and response contract.
- Add deterministic provider adapter.
- Add approved route and source selection.
- Add validation, sanitizer, timeouts, output limits, and typed errors.
- Test prompt injection, malformed output, active HTML, invalid routes, arbitrary URLs, invalid sources, and stale requests.

**Gate:** no live provider call until the contract and containment evidence pass review.

## Phase 4: Controlled provider integration

- Provision or reuse a provider credential without exposing its value.
- Bind it to the function through managed secrets.
- Configure budget alerts, quotas, rate limits, and a kill switch.
- Run the evaluation suite against the live provider in a controlled environment.

**Gate:** repeated unsupported claims, source failures, unsafe output, or uncontrolled cost blocks preview deployment.

## Phase 5: Firebase preview QA

- Build and deploy the exact candidate to a Firebase preview channel.
- Confirm preview access policy and interaction with the real backend.
- Run functional, safety, content, accessibility, responsive, latency, and cost checks.
- Record the candidate version, preview URL, findings, and disposition.

**Gate:** preview approval does not authorize live-channel promotion or DNS changes.

## Phase 6: Product decision

Choose one:

- continue iterating as a controlled experiment;
- integrate the experience into the public site with additional production work;
- retain only the static shell;
- stop and archive the proof.

Production integration requires a new release plan covering privacy, abuse prevention, availability, support, retention, legal content, monitoring, and rollback.

Voice, member authentication, protected customer applications, and source-aware external research are later experiments. Each requires its own intent, use cases, architecture, privacy and security decisions, sprint package, and approval.

## Dependencies

- approved official brand assets;
- approved public source corpus;
- approved permanent route catalogue;
- model/provider decision;
- managed provider credential;
- Firebase billing decision for function deployment;
- named budget/quota owner;
- validation and sanitization libraries selected during implementation;
- evaluation prompts and content reviewers.

## Responsibilities

- **Pablo/content steward:** product direction, public content, people, role, résumé and route approval, methodology judgment, billing, and release authorization.
- **Codex/engineering agent:** scoped implementation, tests, evidence, documentation updates, and explicit claim boundaries.
- **Operator:** secret management, quotas, alerts, preview access, kill switch, deployment, and rollback.

## Current next action

Review this specification package, complete the component responsibility cards, and define the smallest authorized deterministic shell increment. No dependency installation, commit, push, Firebase upgrade, credential action, deployment, or DNS change is implied by this plan.
