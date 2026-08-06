# Firebase AI-Assisted Proof-of-Concept Operations

**Date:** 2026-07-31  
**Status:** Operational decision record required before live deployment

## Billing gate

Official Firebase documentation currently states that Cloud Functions can be emulated on any Firebase project, but deploying functions requires the Blaze pricing plan. Linking billing is therefore an explicit owner decision.

No agent should upgrade the project, link billing, deploy a function, or create paid resources without Pablo's direct approval.

## Cost controls

Before a live function preview:

- identify the billing account and accountable owner without recording payment identifiers in the repository;
- define budget alerts and a human response;
- set request, concurrency, timeout, output, and per-user/per-origin limits;
- define a daily or experiment-level stop threshold;
- expose a kill switch that disables assistant actions while preserving the static site;
- record provider usage and bounded cost metadata where available;
- review Firebase and provider quotas rather than assuming defaults are safe.

## Secret handling

- Store provider credentials only through managed server-side secrets.
- Bind each secret only to the function that needs it.
- Never put credentials in browser code, committed `.env` files, documentation, screenshots, logs, prompts, or generated pages.
- Never print or retrieve a secret merely to prove it exists.
- Treat missing credential access as a deployment blocker, not a reason to ask for plaintext in chat.

## Preview exposure

Firebase Hosting preview URLs are shareable and public to anyone who knows the URL. Preview deployments may interact with real backend resources. Therefore:

- decide whether the proof needs additional access control;
- do not treat an unguessable URL as authentication;
- use non-confidential sources and test prompts;
- apply the same quotas, secret handling, validation, and logging policy used for a public endpoint;
- record which function/configuration a preview uses.

## Privacy and retention

- Do not persist raw prompts or generated HTML by default.
- Publish concise visitor-facing notice before retaining prompts, identifiers, or analytics.
- Avoid collecting names, email addresses, or other personal data in the generator.
- Define retention and deletion before enabling any detailed diagnostic logging.
- Keep operational logs free of secrets and private source content.
- Treat future member authentication, customer applications, voice input, and source-aware external research as separate privacy and security reviews rather than extensions implicitly covered by this proof of concept.

## Availability and rollback

- Static navigation and permanent content remain deployable independently.
- The assistant endpoint can be disabled without taking down the site.
- A proposed navigation action is executed only by the parent shell after its route identifier passes the repository-controlled allow-list.
- Provider failure, quota exhaustion, invalid output, or sanitizer failure produces a controlled shell state.
- Record the exact preview/live versions and maintain a route to restore the prior static release.
- DNS cutover remains a separate, explicitly approved release action.

## Operational readiness evidence

- billing decision;
- budget and alert configuration;
- quota/rate/timeout configuration;
- secret binding verification without revealing values;
- kill-switch test;
- controlled failure tests;
- route allow-list and unknown-route rejection tests;
- preview access decision;
- log/privacy review;
- rollback rehearsal or documented procedure.

## References

- [Firebase Production Deployment Runbook](../09-build-and-test/firebase-production-deployment-runbook.md) — verified, reproducible execution of these gates against the live project
- [Firebase pricing plans](https://firebase.google.com/docs/projects/billing/firebase-pricing-plans)
- [Cloud Functions for Firebase — get started](https://firebase.google.com/docs/functions/get-started)
- [Cloud Functions environment and secret configuration](https://firebase.google.com/docs/functions/config-env)
- [Cloud Functions quotas and limits](https://firebase.google.com/docs/functions/quotas)
- [Firebase Hosting preview channels](https://firebase.google.com/docs/hosting/test-preview-deploy)
