# Authorized Implementation Prompt — Sprint 003 Intelligent Article Discovery --HA

## Authorization

This prompt is human approved and immutable once implementation begins. Do not edit this prompt or the paired Sprint Plan. Execute only the bounded Sprint 003 scope below.

## Prompt

Repository:

`/Users/paboelustodo/-PROJECTS/elustondoaiweb`

Start Sprint 003 — Intelligent Article Discovery.

Follow the repository's `AGENTS.md`, SDLC² governance, the human-approved Sprint 003 plan, and this authorized prompt exactly.

Before implementation:

1. Verify the repository path, Git root, current branch, baseline commit, remote relationship, and complete worktree state.
2. Record that authorization was given on `main` at baseline `97fb034b3162640fcef816169609bb0cf4947c83`, with protected pre-existing uncommitted Sprint 002 and unrelated work. Do not overwrite, discard, stage, commit, or otherwise mutate that protected baseline.
3. Read `AGENTS.md` and its complete mandatory reading list.
4. Read:
   - `docs/07-planning/sprints/sprint-003-intelligent-article-discovery/README.md`
   - `docs/07-planning/sprints/sprint-003-intelligent-article-discovery/01-sprint-plan--HA.md`
   - this immutable prompt
   - `docs/07-planning/sprints/sprint-002-public-content/00-content-approval-register--HA.md`
   - `docs/07-planning/sprints/sprint-002-public-content/01-sprint-plan--HA.md`
   - `docs/07-planning/sprints/sprint-002-public-content/03-agent-delivered-scope-report.md`
   - `src/content/siteContent.ts`
5. Preserve all user-authored, Sprint 002, untracked, and unrelated work. Before changing an existing file, compare its current contents and identify whether Sprint 002 already modified it.
6. Run the baseline verification suite before implementation:
   - `pnpm install --frozen-lockfile`
   - `pnpm run typecheck`
   - `pnpm run lint`
   - `pnpm run test`
   - `pnpm run build`
7. If the existing dirty baseline creates a conflict, required artifacts are missing, or a pre-existing verification failure prevents a reliable Sprint 003 baseline, stop and record the exact blocker. Do not repair unrelated work or force the sprint forward.

Implement only the approved Sprint 003 scope.

### 1. ArticleSourceSnapshot

- Use only Pablo's approved Medium list as the canonical public source boundary:
  `https://medium.com/@pabloelustondo/list/elustondoai-dd60f27687ee`
- Treat list membership as public-indexing authority. Exclude records outside that list.
- Create a versioned local normalized snapshot used by the public application. Visitor rendering must never depend on a Medium request.
- Preserve canonical Medium metadata, including a stable source identifier, canonical title, canonical URL, author, publication time, source collection, and refresh time.
- Detect and report duplicates, malformed records, missing records, changed metadata, stale titles, and list-membership changes.
- Preserve the last known good snapshot when refresh or validation fails.
- Produce a reviewable diff before an updated snapshot becomes the public local source.
- Provide an explicit developer-run refresh boundary, preferably through a repository script such as `pnpm content:refresh`. Do not add scheduled refresh or visitor-time refresh.
- First implement and test pure adapter and normalization behavior against a versioned approved source fixture or snapshot.
- Implement a live Medium-list adapter only if a stable, supported public surface is verified. Do not use headless browsing, fragile scraping, authentication workarounds, or a terms-sensitive workaround. If no safe supported surface is available, record remote discovery as `PARTIAL` or `POSTPONED` while delivering the deterministic local foundation.

### 2. ArticleTaxonomy

- The only initial pillars are `SDLC²`, `Architecture`, and `Modernization`. Do not invent another pillar.
- Support multiple pillars or subjects per article.
- Support `Unclassified` without guessing.
- Preserve classification provenance, rationale, human review state, and Pablo-owned editorial overrides.
- Ensure editorial overrides survive source refreshes.
- Use explicit editorial assignments and deterministic rules only. Do not call or configure a live AI provider.
- Seed only the classifications already approved:
  - Responsibility-Driven Design or Wirfs-Brock -> `SDLC²`
  - SOLID -> `SDLC²`
  - Practical Local AI or local LLM -> `Architecture`
  - Legacy FX payment system -> `Modernization`
  - Three Amigos -> `Unclassified` until Pablo explicitly assigns it
- A newly validated list article must appear in `Latest` and may remain `Unclassified` until an editorial assignment exists.

### 3. ArticleRanker

- Order `Latest` strictly by canonical publication time, newest first.
- Rank articles within a pillar using deterministic, explainable signals and explicit editorial decisions.
- Treat `canonical` as a tone-setting pillar article and `featured` as explicit editorial priority.
- Every relevance result must expose an inspectable reason.
- Use deterministic tie-breaking.
- Do not create one opaque universal score and do not allow relevance to alter the chronological `Latest` stream.

### 4. Articles experience

- Integrate with the existing `StableShell` and preserve the approved Sprint 001 and Sprint 002 design, navigation, responsiveness, and accessibility.
- Make pillars and relevance the primary discovery area.
- Make `Latest` a visibly separate, secondary chronological stream.
- Add supporting subject or related-reading paths only when they fit this approved scope and remain explainable.
- Display the canonical Medium title as article metadata. An Elustondo.ai grouping label or editorial heading must not replace or rewrite the canonical article title.
- Keep canonical Medium destinations clear.
- Present empty, partial, refresh-failure, and `Unclassified` states clearly.
- Do not add a conversational assistant, generated-page canvas, news aggregator, project portal route, voice interface, member account, database, CMS, or authentication.

Use a controlled RED/GREEN sequence where practical:

1. `ArticleSourceSnapshot`: normalization, approved-list boundary, duplicates, changed metadata, and refresh failure.
2. `ArticleTaxonomy`: approved pillars, multi-membership, `Unclassified`, provenance, and override persistence.
3. `ArticleRanker`: chronology, explainable relevance, canonical and featured behavior, related reading, and deterministic ties.
4. Articles experience: distinct primary pillar/relevance and secondary `Latest` areas, canonical metadata and links, accessibility, responsive behavior, and failure states.
5. Refactor only while the full suite remains green.

Required automated verification:

- source normalization and canonical metadata;
- approved-list membership boundary;
- duplicate, malformed, missing, changed, and stale-title handling;
- failed refresh preserving the last known good snapshot;
- approved taxonomy, multiple membership, `Unclassified`, provenance, and editorial-override persistence;
- newest-first chronological ordering;
- deterministic pillar relevance, canonical and featured handling, tie-breaking, and rationale;
- visible distinction between pillar/relevance discovery and the chronological `Latest` stream;
- canonical Medium titles and destinations;
- empty, partial, failure, and unclassified states;
- no runtime Medium or AI-provider request during visitor rendering.

Run the complete verification suite after implementation:

- `pnpm install --frozen-lockfile`
- `pnpm run typecheck`
- `pnpm run lint`
- `pnpm run test`
- `pnpm run build`

Run production-preview browser verification at 320, 390, 768, 1024, and 1440 CSS pixels. Verify:

- no horizontal overflow;
- keyboard operation and visible focus;
- skip-link focus on every page;
- current-page indication;
- mobile-menu behavior;
- route navigation, direct entry, refresh, Back, and Forward;
- branded not-found behavior as a regression check;
- the pillar/relevance journey and the latest-writing journey;
- canonical article titles and Medium destinations;
- clear partial, failure, and unclassified states;
- no visitor-time network dependency on Medium or an AI provider.

Documentation and evidence:

1. Complete or update `docs/07-planning/sprints/sprint-003-intelligent-article-discovery/03-agent-delivered-scope-report.md`.
2. Create or update `docs/07-planning/sprints/sprint-003-intelligent-article-discovery/evidence/README.md` and store concise, reproducible evidence in the appropriate evidence subfolders.
3. Update the relevant component documentation and component catalogue only where the delivered architecture changes their responsibilities.
4. Record `COMPLETED`, `PARTIAL`, `POSTPONED`, `OMITTED`, `CHANGED`, and `UNPLANNED` work accurately. Distinguish imported facts, deterministic results, editorial overrides, fixtures, and postponed external discovery.
5. Record any specification ambiguity, prompt-quality issue, claim discrepancy, evidence gap, or proposed SDLC² improvement discovered during the sprint.

When implementation and agent verification are complete, stop at:

`AWAITING_INTEGRATION_TEST`

Do not perform or claim independent integration testing, code review, or sprint approval.

Do not modify the approved Sprint Plan or this implementation prompt.

Do not create a branch, stage files, commit, push, create or merge a pull request, tag a release, deploy, configure Firebase, create or retrieve credentials, call a live AI provider, change billing, publish a production release, or modify DNS.
