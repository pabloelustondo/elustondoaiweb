# Public Content Maintenance --AI

**Status:** `DRAFT — AI GENERATED; HUMAN REVIEW REQUIRED`

## Purpose

Keep the public site useful while preserving the human-approved source-list and privacy boundaries established for Sprint 002.

## Operating rule

The browser renders only typed records in `src/content/siteContent.ts`. Medium, LinkedIn, and GitHub are provenance and destination systems; they are not visitor-time content feeds.

## Adding or changing content

1. Confirm that the item qualifies under the current human-approved content register.
2. Recheck the canonical public destination and copy only supported public metadata.
3. Update the typed local record.
4. Add or update a publication-boundary test.
5. Run type checking, linting, tests, the production build, and proportionate browser QA.
6. Obtain human review before publication when the current register does not already make source-list membership the approval decision.

## Privacy rule

Never add a private repository URL, internal path, source material, or confidential detail. A private project requires a separately approved sanitized public summary and must not include a repository destination.

## Honest omission

If a source, claim, person detail, asset, download, or disclosure boundary is unresolved, omit it rather than inventing or inferring it.
