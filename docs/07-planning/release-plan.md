# Elustondo.ai Release Plan

**Status:** Planning baseline; releases require separate approval
**Owner and acceptance authority:** Pablo Elustondo
**Last updated:** 2026-08-01

## Purpose

This plan groups the website work into meaningful product releases. A sprint may complete without authorizing a release, Firebase deployment, production promotion, or DNS change.

## Release sequence

### R1 — Real Website Foundation

Outcome: replace the standalone design mockup as the only runnable artifact with a real, maintainable static web application foundation.

Includes React, TypeScript, Vite, approved official branding, a stable semantic shell, responsive navigation, a homepage, and reproducible build, test, browser, accessibility, screenshot, console, and request evidence.

Release gate: Sprint 001 passes independent integration testing, independent code review, and Pablo Manual QA. R1 may remain local or in a non-public preview; completion does not authorize DNS changes.

### R2 — Complete Public Corporate Site

Outcome: provide the complete anonymous company-evaluation and knowledge-discovery journeys through Articles, Projects, Methods, People, About, Contact, approved external links, and approved résumé/PDF downloads.

### R3 — Deterministic AI-Assisted Experience

Outcome: demonstrate the Assistant Panel, allow-listed navigation, Generated Page Canvas, clarification, refusal, insufficient-information, invalid-output, and unavailable states using deterministic fixtures only. This release makes no live model or backend claim.

### R4 — Controlled Assistant Integration

Outcome: implement the versioned assistant endpoint, approved-source retrieval, route validation, HTML validation and sanitization, sandbox containment, operational limits, and a controlled live-provider experiment. Provider credentials, billing, budgets, quotas, rate limits, and kill-switch ownership require separate approval.

### R5 — Public Release Candidate

Outcome: produce an approved Firebase candidate with complete content, functional, accessibility, responsive, browser, performance, security, privacy, operational, and rollback evidence.

Only Pablo may authorize production promotion and the later GoDaddy web-DNS cutover. PurelyMail records remain protected.

## Release rules

- Evidence from a mockup or fixture cannot prove production behavior.
- A local build cannot prove Firebase deployment.
- A Firebase preview approval cannot authorize production or DNS changes.
- Every release identifies the exact reviewed revision and accepted findings and deferrals.
- The static site remains useful when the assistant is unavailable.

## Related planning

- [Website Development Plan v1](website-development-plan-v1.md)
- [Conversational POC Delivery Plan](conversational-poc-delivery-plan.md)
- [Sprint Roadmap](sprint-roadmap.md)
- [Sprint Documentation and Governance Model](sprint-documentation-and-governance-model.md)
