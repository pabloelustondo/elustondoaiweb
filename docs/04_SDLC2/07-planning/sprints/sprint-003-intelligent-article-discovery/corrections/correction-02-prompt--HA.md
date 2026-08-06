# Sprint 003 Correction 002 Prompt — Repository Structure and Documentation Organization --HA

**Authorization:** Human authorized by Pablo Elustondo in Codex on 2026-08-04
**Status:** `AUTHORIZED — NOT EXECUTED`
**Relationship to original work order:** Final Sprint 003 documentation and folder-structure correction. It preserves the original Sprint 003 plan, prompt, Correction 001, and runtime behavior.
**Source:** User-supplied attached prompt, archived verbatim below.
**Source SHA-256:** `76fe8aa751a8efca89b4b0371c9080564f7d9f44f5ac47d8e2cba3fcd8db8f`

The prompt’s starting-state assumptions must be revalidated when execution begins. Archiving this prompt does not claim that execution has occurred or that its preconditions currently hold.

## Authorized prompt (verbatim)

---

You are working in the `elustondoaiweb` repository on branch:

sprint-003-intelligent-article-discovery

Assume:

- the correct branch is already checked out;
- the branch is up to date with origin;
- the working tree is clean;
- the current implementation is not to be changed;
- this is a documentation-only restructuring task.

# Objective

Reorganize the repository documentation into four canonical, numbered documentation areas under `docs/`:

docs/
├── 01_SystemDefinition/
├── 02_DeveloperGuide/
├── 03_Architecture/
└── 04_SDLC2/

Each folder must have one primary entry document:

docs/01_SystemDefinition/README_ai.md
docs/02_DeveloperGuide/README_ai.md
docs/03_Architecture/README_ai.md
docs/04_SDLC2/README_ai.md

These four documents must be substantive entry points, not placeholder pages.

The existing Elustondo.ai Developer Guide contains material belonging to several different documentation responsibilities. Refactor that material into the four documents above.

Do not merely copy the same complete guide into four places. Separate the content according to ownership and provide short cross-references where context is needed.

# Important documentation model

The four areas answer different questions.

## 1. System Definition

Primary question:

“What is Elustondo.ai, why does it exist, who or what interacts with it, and where are its boundaries?”

This is the first document a new reader should encounter.

It is the canonical, high-level, largely technology-independent definition of the current system.

It should include:

- the purpose of Elustondo.ai;
- the value the system provides;
- intended audiences, users, actors, and external participants;
- the current system boundary;
- major system capabilities;
- major use cases or user journeys;
- the conceptual system model;
- important domain, publishing, and editorial rules;
- major external systems and dependencies;
- constraints;
- explicit non-goals;
- a high-level explanation of the Medium Article Curator as a system capability;
- a reading map to the Developer Guide, Architecture, and SDLC2.

For the Article Curator, this document should explain at a system level:

- Pablo’s Medium profile is currently the trusted author source;
- the Medium `AI Philosophy` topic is the current eligibility signal;
- eligibility answers whether an article may appear on Elustondo.ai;
- SDLC2, ES2, Modernization, and future pillars answer where an eligible article should be presented;
- the site should not require a manually maintained second article catalog;
- the curator is an automated system capability, while human editorial authority remains with Pablo.

Do not put detailed commands, package scripts, implementation algorithms, framework details, or deployment procedures in System Definition.

Do not turn System Definition into marketing copy. It must define the actual current system clearly and precisely.

## 2. Developer Guide

Primary question:

“How do I understand, run, test, maintain, and safely change the current implementation?”

This is the practical guide for someone working in the repository.

At the beginning, explicitly tell a new developer to read the System Definition first when they need the complete system context.

It should include:

- repository orientation;
- workspace and package organization;
- component ownership;
- the root package’s coordination role;
- frontend source, assets, and generated output;
- Article Curator source, fixtures, tests, and generated output;
- prerequisites;
- version checks;
- installation from the repository root;
- local frontend execution;
- frontend verification commands;
- backend and curator verification commands;
- safe local curator execution;
- fixture-backed and offline execution expectations;
- configuration and secret-handling instructions at a practical developer level;
- Firebase emulator usage;
- deployment commands as gated operational interfaces, not ordinary development commands;
- how to make a normal change;
- generated artifacts;
- common troubleshooting;
- the new-developer confidence check;
- links to deeper architectural explanations and SDLC2 evidence.

The Developer Guide should explain enough “why” to make instructions understandable to a human, but detailed architectural rationale, alternatives, patterns, and trade-offs belong in Architecture.

Preserve the practical strengths of the current Developer Guide, including:

- focused component commands before aggregate repository commands;
- one dependency installation from the workspace root;
- the distinction between maintained source and generated artifacts;
- the requirement that `pnpm curator:local` be safe by construction;
- the prohibition against local fixture runs changing production state;
- the four-article benchmark as a regression signal rather than an eternal business rule;
- explicit human approval before production deployment;
- desktop and mobile QA for the frontend;
- the distinction between authentication and authorization.

## 3. Architecture

Primary question:

“How is the system technically shaped, and why was it shaped that way?”

This is the maintained architectural view of the current operational system.

It is also where the evolving ES2 approach is applied.

It should include:

- architectural scope;
- system context;
- major technical boundaries;
- frontend responsibility;
- Article Curator responsibility;
- curated article state responsibility;
- external Medium, Gemini, LangChain, Firebase, and Google Cloud relationships;
- principal runtime and data flows;
- architectural characteristics;
- relevant design patterns;
- important architectural decisions;
- constraints;
- failure containment;
- observability;
- security and trust boundaries;
- deployment topology at an architectural level;
- trade-offs and rejected or deferred alternatives where existing documentation supports them;
- the relationship between maintained Architecture and the evolving ES2 approach;
- links to SDLC2 material containing the original change evidence.

The Architecture document must explain the deeper technical reasoning behind the Article Curator, including:

- why the public frontend must not discover Medium articles during a visitor request;
- why Medium and AI model calls occur asynchronously in the background;
- why the frontend and curator are separate responsibilities;
- why the frontend reads the last validated curated state;
- why a visual frontend change should not risk the publishing pipeline;
- why a classifier change should not require rebuilding the public experience;
- why previous state is needed for additions, edits, and removals;
- why state must be validated before publication;
- why the system needs an atomic or otherwise safe publication boundary;
- why fixture-backed local execution is an architectural safety property;
- why the author profile acts as a trust boundary;
- why `AI Philosophy` eligibility and destination-pillar classification are different decisions;
- why Gemini, through LangChain, assists with ambiguous classification but does not replace Pablo’s editorial decision;
- how the system should behave when Medium, Gemini, Firebase, storage, or scheduling fails;
- why logs and decision explanations are necessary for an automated curator.

Do not turn Architecture into:

- a command reference;
- a sprint diary;
- a duplicate of the Developer Guide;
- a speculative future-state document presented as current reality.

Clearly distinguish current operational architecture from future ideas or proposals.

## 4. SDLC2

Primary question:

“How are changes proposed, designed, implemented, verified, reviewed, observed, and learned from?”

This folder already contains or may contain sprint and change documentation. Preserve that evidence and history.

The new `README_ai.md` should serve as the navigation and responsibility guide for SDLC2.

It should explain:

- the purpose of SDLC2;
- that SDLC2 records and governs changes rather than serving as the canonical description of the current system;
- how domain analysis, intent, use cases, benchmarks, solution design, planning, implementation, QA, review, deployment, operational observation, sprint closure, and learning fit together;
- where the canonical SDLC2 steps are documented;
- how to navigate existing sprint and change folders;
- what belongs in SDLC2;
- what does not belong in SDLC2;
- how approved changes graduate into maintained documentation.

Include a clear graduation model:

- proposed system purpose, capability, actor, rule, use case, or boundary begins in SDLC2 and updates System Definition after implementation and acceptance;
- proposed technical design begins in SDLC2 and updates Architecture after implementation and acceptance;
- new commands, setup procedures, or maintenance workflows begin in SDLC2 and update the Developer Guide after they become operational reality;
- implementation, QA, review, benchmark, deployment, and learning evidence generally remains in SDLC2;
- Architecture and System Definition must describe the current system, not merely a proposal;
- the Developer Guide must describe the current developer workflow, not a planned workflow.

Do not rewrite or replace existing canonical SDLC2 documents unnecessarily. Link to them and preserve historical evidence.

# Solution design rule

Do not create a separate top-level `SolutionDesign` folder.

Solution design has two states:

1. While proposed or under implementation, it belongs within the relevant SDLC2 change or sprint.
2. After successful implementation and verification, its durable architectural conclusions are incorporated into Architecture.

Also do not create a separate top-level `BusinessAnalysis` folder.

The stable high-level artifacts traditionally associated with business analysis—purpose, actors, use cases, domain concepts, rules, and system boundary—belong in System Definition.

# Required migration behavior

Before editing:

1. Inspect the current `docs/` tree.
2. Locate and read the current Elustondo.ai Developer Guide.
3. Read the current Architecture entry documents.
4. Read the current SDLC2 entry documents and identify the existing sprint/change hierarchy.
5. Search the repository for Markdown links and textual references to:
   - `docs/DeveloperGuide`
   - `docs/Architecture`
   - `docs/SDLC2`
   - equivalent relative paths
6. Inspect the root repository README and any documentation navigation files.
7. Base the new documents only on facts supported by the current repository and existing documentation.
8. Do not invent implementation details.

Then perform the restructuring.

Use `git mv` when renaming or relocating existing tracked folders and files so Git history is preserved.

Expected canonical path mapping:

- `docs/DeveloperGuide/` → `docs/02_DeveloperGuide/`
- `docs/Architecture/` → `docs/03_Architecture/`
- `docs/SDLC2/` → `docs/04_SDLC2/`
- create `docs/01_SystemDefinition/`

Preserve all existing nested documentation, sprint evidence, architectural documents, images, diagrams, and supporting files.

Do not delete historical documentation merely because it does not fit the new entry-page structure.

If an existing entry document already contains unique material:

- merge or redistribute that material carefully;
- preserve its meaning;
- do not overwrite it blindly;
- use Git history rather than creating duplicate “old,” “backup,” or “copy” files.

Update all maintained repository links and path references affected by the moves.

Do not rename every historical Markdown file merely to enforce the authorship suffix convention. That would be an unrelated mass change. However, every new primary document created by this task must end in `_ai.md`.

# Current Developer Guide refactoring

Use the current Elustondo.ai Developer Guide as a major source, but distribute its sections by responsibility.

Examples:

## Move or summarize into System Definition

- the purpose of Elustondo.ai;
- the visitor-facing purpose of the frontend;
- the role of Pablo’s Medium essays;
- the system-level reason the Article Curator exists;
- trusted author scope;
- AI Philosophy eligibility;
- site pillars;
- high-level system flow;
- external-system boundaries;
- system constraints and non-goals.

## Keep or develop in Developer Guide

- repository tree;
- root workspace explanation;
- prerequisites;
- installation;
- commands;
- frontend workflow;
- curator workflow;
- fixtures;
- tests;
- safe local execution;
- emulator usage;
- practical configuration handling;
- deployment gates;
- normal change workflow;
- generated artifacts;
- troubleshooting;
- confidence check.

## Move or develop in Architecture

- frontend-curator separation;
- asynchronous discovery and classification;
- stable prepared state;
- change detection;
- state validation;
- publication safety;
- LangChain and Gemini responsibility boundaries;
- reliability and failure containment;
- trust boundaries;
- observability;
- scheduling design;
- technical trade-offs.

## Keep in SDLC2 or link to existing SDLC2 evidence

- original change intent;
- sprint-specific domain analysis;
- proposed use cases;
- benchmarks;
- proof-of-concept evidence;
- implementation records;
- QA evidence;
- review evidence;
- operational observations;
- sprint learning and future work.

Avoid large duplicated passages. A short summary with a relative link to the canonical document is preferable.

# Navigation and breadth-first reading

The documentation must support breadth-first understanding.

At the top of every one of the four entry documents, include a small navigation block linking to all four areas.

Use relative Markdown links.

The System Definition should explicitly recommend this default reading order:

1. System Definition
2. Developer Guide
3. Architecture
4. SDLC2

The Developer Guide should say:

- read System Definition first for purpose, actors, capabilities, use cases, and system boundaries;
- continue in Developer Guide for repository and operational development instructions;
- open Architecture for deeper technical rationale;
- use SDLC2 when proposing, implementing, reviewing, or investigating a change.

The Architecture document should link back to System Definition for business and system intent and to the Developer Guide for commands.

The SDLC2 document should link to the maintained documents representing operational reality.

# Writing requirements

Write for an intelligent human developer who repeatedly asks “why?”

The documentation must be:

- clear;
- direct;
- technically precise;
- readable;
- calm;
- structured for progressive disclosure;
- detailed enough to be useful without becoming repetitive;
- explicit about current reality versus proposal;
- explicit about responsibility and ownership.

Avoid:

- empty introductory prose;
- excessive jargon without explanation;
- unexplained acronyms;
- marketing language;
- long repetitive lists;
- implementation details in System Definition;
- command sequences in Architecture;
- architectural essays in the Developer Guide;
- sprint history in maintained current-state documents;
- claims not supported by repository evidence.

Explain an acronym or specialized term the first time it appears.

Preserve the established terms:

- Elustondo.ai
- SDLC2
- ES2
- Medium Article Curator
- AI Philosophy
- LangChain
- Gemini
- Firebase
- operational reality
- human editorial authority

# Repository changes allowed

This is a documentation-only change.

Allowed:

- create the new documentation folder structure;
- move existing documentation folders with `git mv`;
- create or revise Markdown documentation;
- update Markdown links and documentation navigation;
- update repository README links when necessary;
- update documentation-related path references.

Not allowed:

- application source-code changes;
- package changes;
- dependency changes;
- build configuration changes;
- Firebase configuration changes;
- Cloud configuration changes;
- test behavior changes;
- Article Curator behavior changes;
- deployment;
- production access;
- secret or credential changes;
- commit;
- push.

# Validation

After editing:

1. Display the resulting `docs/` tree.
2. Search for stale references to:
   - `docs/DeveloperGuide`
   - `docs/Architecture`
   - `docs/SDLC2`
3. Validate all relative Markdown links affected by this change.
4. Run an existing documentation-link checker if the repository already provides one.
5. Do not introduce a new dependency merely to validate links.
6. Run:

git diff --check
git status --short

7. Review the final diff for:
   - accidental deletions;
   - duplicated material;
   - broken links;
   - unsupported claims;
   - incorrect current-versus-proposed language;
   - files placed under the wrong documentation responsibility.

Because this task is documentation-only, do not run unrelated application builds or deployments unless an existing repository rule explicitly requires them for documentation changes.

# Acceptance criteria

The work is complete only when:

- `docs/` contains the four canonical numbered documentation areas;
- each area has a substantive `README_ai.md`;
- System Definition is clearly the first breadth-first document;
- the Developer Guide directs new readers to System Definition;
- the current Developer Guide has been responsibly separated rather than duplicated;
- the current frontend and Article Curator are understandable at a high level from System Definition;
- practical commands remain in Developer Guide;
- deep technical “how and why” discussions are in Architecture;
- change-specific intent and evidence remain in SDLC2;
- no separate Business Analysis or Solution Design top-level folder was created;
- existing SDLC2 history and architectural material were preserved;
- maintained links point to the new paths;
- no application behavior was changed;
- the working tree contains only deliberate documentation changes.

# Final response

When finished, provide:

1. the final `docs/` tree;
2. a concise list of files created;
3. a concise list of files or folders moved;
4. a concise list of existing documents materially revised;
5. the main content moved into each of the four documentation areas;
6. the links or path references updated;
7. validation commands run and their results;
8. any existing documentation that could not be classified safely;
9. `git status --short`;
10. confirmation that no commit, push, deployment, application code, package, or configuration change was made.

If you discover a genuinely destructive ambiguity—such as conflicting canonical documents whose contents cannot safely be merged—stop before deleting or overwriting anything and report the conflict precisely.
