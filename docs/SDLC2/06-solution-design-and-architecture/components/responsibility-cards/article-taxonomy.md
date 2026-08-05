# ArticleTaxonomy Responsibility Card

**Status:** Sprint 003 implementation delivered; Pablo integration test passed; awaiting code review

## Purpose

Apply Pablo-owned, traceable editorial classifications to approved article identities without guessing or coupling those decisions to source refreshes.

## Owns

- the approved pillars `SDLC²`, `Architecture`, and `Modernization`;
- multiple pillar and subject assignments;
- explicit `Unclassified` handling;
- classification provenance, rationale, human-review state, and review time;
- canonical, featured, and editorial-priority overrides;
- persistence of overrides across source metadata refreshes by stable article identifier.

## Does not own

- creating new pillars;
- live AI classification;
- canonical Medium metadata;
- chronology or relevance ordering;
- publication of unsupported assignments.

## Failure and uncertainty boundary

A record without an approved override remains `Unclassified` and `NEEDS_REVIEW`. It remains eligible for the chronological Latest stream but is not silently placed in a pillar.

## Test seams

- approved pillar set and seeded mappings;
- multiple membership;
- explicit Unclassified behavior;
- provenance and rationale;
- override survival after canonical metadata changes.
