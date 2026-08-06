# ArticleRanker Responsibility Card

**Status:** Sprint 003 implementation delivered; Pablo integration test passed; awaiting code review

## Purpose

Produce deterministic, inspectable article ordering for two distinct questions: what is newest and what is most relevant within an approved pillar.

## Owns

- strictly newest-first Latest ordering with stable identifier tie-breaking;
- pillar filtering;
- ordered comparison of canonical, featured, editorial-priority, publication-date, and identifier signals;
- visible reasons for every pillar result;
- related-reading candidates justified by shared approved pillars or subjects.

## Does not own

- taxonomy or editorial authority;
- an opaque universal relevance score;
- altering chronological order because an article is canonical, featured, or important;
- source retrieval or public rendering.

## Test seams

- chronology and deterministic ties;
- canonical, featured, priority, and recency ordering;
- non-empty inspectable rationales;
- related-reading inclusion and explanations;
- proof that editorial signals never change Latest.
