# ArticleCurator Responsibility Card --AI

**Document state:** `AI DRAFT — HUMAN REVIEW REQUIRED`
**Implementation state:** Implemented locally; independent integration testing pending

## Purpose

Convert one validated observation of the approved Elustondo.ai Medium List into a safe, explainable, last-known-good curator state outside the visitor request path.

## Owns

- normalized Medium post identity and metadata comparison;
- added, changed, missing, and removed article decisions;
- two-consecutive-observation removal confirmation;
- classification requests only for new or changed non-overridden articles;
- preservation of Pablo-owned editorial overrides;
- last-known-good state publication;
- bounded run outcomes and logs.

## Does not own

- Medium's availability or page format;
- model credentials, billing, IAM, or deployment approval;
- new editorial pillars;
- human approval of AI-curated classifications;
- public Articles-page runtime retrieval;
- site routing, rendering, release, or DNS.

## Collaborators

- `LangChainMediumListMembershipSource` discovers current List membership through Gemini URL context.
- `MediumProfileRssReader` provides official public profile metadata for cross-checking.
- `LangChainArticleClassifier` proposes only approved-pillar classifications.
- `CuratorStore` supplies Firebase Storage and local-file adapters.
- Cloud Scheduler invokes the Firebase wrapper every 15 minutes after deployment.

## Contracts

Input: one duplicate-free, non-empty collection of validated Pablo Elustondo Medium records.
Output: one `CuratorState` plus one bounded `CuratorRunSummary`.
Failure: throw a typed or ordinary error after recording a bounded failure; do not replace the current state.

## Authority boundary

Medium List membership authorizes indexing. Pablo-owned editorial overrides outrank model output. LangChain and Gemini propose structured discovery and classification data but do not control deployment, pillars, credentials, or public UI behavior.

## Test seams

- fixture and failing Medium sources;
- deterministic and LangChain classifiers behind one interface;
- memory, local-file, and Firebase Storage stores behind one interface;
- injected clock and logger;
- explicit removal-confirmation count.

## Acceptance evidence

- deterministic tests for additions, delayed removals, invalid sources, invalid classifications, and failure preservation;
- local two-cycle demonstration removing `three-amigos-agent-architecture` only after confirmation;
- Functions type checking, linting, tests, and build;
- later independent Firebase emulator and controlled cloud evidence.
