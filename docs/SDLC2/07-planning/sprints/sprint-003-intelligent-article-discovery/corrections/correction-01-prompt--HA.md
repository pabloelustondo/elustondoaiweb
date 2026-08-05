# Sprint 003 Correction 001 Prompt — Scheduled LangChain Medium Curator --HA

**Authorization:** Human authorized by Pablo Elustondo in Codex on 2026-08-03
**Status:** `AUTHORIZED AND EXECUTED`
**Relationship to original work order:** This correction preserves the immutable Sprint 003 plan and prompt. It supersedes only their exclusions of scheduled refresh and live-provider implementation code. It does not authorize live provider calls or deployment.

## Pablo's direction

Implement the Medium curator every 15 minutes using the LangChain TypeScript/Node code that will eventually run in a Google/Firebase Cloud Function.

## Authorized correction boundary

- Add a deployable Node.js 22 Firebase scheduled function configured for every 15 minutes.
- Run LangChain inside the function and use Gemini through a replaceable, testable boundary.
- Read only Pablo's approved Elustondo.ai Medium List as indexing authority.
- Preserve the three approved pillars and Pablo-owned overrides.
- Store a last-known-good curator snapshot and bounded operational logs.
- Add deterministic credential-free local tests and a local demonstration.
- Add the dependency and Firebase source configuration required to compile the function.
- Preserve the existing uncommitted Sprint 003 delivery and all unrelated work.

## Required safety behavior

- Do not use a headless browser, authenticated workaround, hidden Medium API, or embedded secret.
- Treat Medium, RSS, and Gemini output as fallible input.
- Validate URLs, author, dates, duplicates, identifiers, pillars, and classification completeness.
- Require two consecutive successful observations before applying removals.
- Preserve the current snapshot after any source, model, validation, or storage failure.
- Keep visitor rendering independent from Medium and Gemini.

## Operational boundary

Not authorized: Firebase project binding, resource provisioning, provider credential creation or retrieval, live Gemini calls, live Medium URL-context calls, deployment, billing changes, commit, push, pull request, production release, or DNS changes.

## Required stop state

After implementation-agent verification, stop at `AWAITING_INTEGRATION_TEST`.
