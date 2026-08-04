# ArticleSourceSnapshot Responsibility Card

**Status:** Sprint 003 implementation delivered; Pablo integration test passed; awaiting code review

## Purpose

Provide the public application with a versioned, validated local snapshot of article metadata from Pablo's approved Elustondo.ai Medium list without making visitor rendering depend on Medium.

## Owns

- the exact approved Medium-list boundary;
- normalized source identity, canonical title and URL, author, publication date, collection, and refresh time;
- duplicate, malformed, outside-list, missing, added, changed, and stale-title detection;
- fail-closed preservation of the last known good snapshot;
- candidate snapshot and reviewable diff production through the explicit developer-run refresh command.

## Does not own

- visitor-time fetching;
- fragile scraping, browser automation, or authenticated Medium access;
- editorial classification, relevance, summaries, or public promotion authority;
- automatic replacement of the approved application snapshot.

## Collaborators and dependency direction

`ArticleTaxonomy` consumes stable article identifiers from the approved snapshot. The Static Content Model projects reviewed snapshot metadata into existing page records. `StableShell` and the Articles experience consume only the local approved projection.

## Failure and review boundary

Validation failure returns the existing snapshot plus explicit issues. A valid changed source produces a candidate and diff marked `REVIEW_REQUIRED`; it does not publish itself. The current developer-run command uses a versioned approved fixture because no safe supported live Medium-list surface was verified in Sprint 003.

## Test seams

- pure normalization and diff tests;
- duplicate, malformed URL, outside-list, missing, added, changed, and stale-title tests;
- failed-refresh preservation tests;
- command evidence proving that candidate and diff are written while the approved snapshot remains unchanged.
