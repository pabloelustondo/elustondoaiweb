You are working inside the current software repository.

Your assignment is to design and implement a complete SDLC2 development-review Agent system using all relevant Codex capabilities.

Do not merely recommend files or show examples in the response. Inspect the repository, create the required artifacts, validate them, and report exactly what you created.

# Objective

Create three clearly separated development-review Agents:

1. **SDLC2 Methodology and Readiness Review Agent**

   * The umbrella methodology reviewer.
   * Reviews the project across the complete SDLC2 lifecycle.
   * Similar to a process guardian or methodology-focused project reviewer, but not a conventional Project Manager.
   * Determines whether the project, sprint, or component has sufficient context, intent, design, planning, specifications, authorization, evidence, and learning artifacts to proceed.

2. **SDLC2 Code Review Agent**

   * A specialized reviewer operating within the SDLC2 umbrella.
   * Reviews implementation changes against intent, specifications, architecture, component responsibilities, tests, repository rules, and relevant engineering standards.
   * Must be independent from the implementation Agent.

3. **SDLC2 QA Evidence Review Agent**

   * A specialized reviewer operating within the SDLC2 umbrella.
   * Reviews whether QA claims are supported by sufficient, reproducible, traceable evidence.
   * Evaluates evidence quality rather than trusting a developer or Agent’s statement that something “works.”

These are project-scoped development execution roles. They are not new permanent Personal Agents and must not be registered as independent Personal Agents with their own Google Drive Agent-Ctx, Inbox, or Outbox.

The existing Personal Agent System Registry identifies `SDLC2` as an advisory methodology Agent. Do not change the Registry, create new canonical addresses, or reorganize another Agent’s context.

# Foundational SDLC2 principle

Preserve this contract:

> The human can understand it, the Agent can implement it, the test can verify it, and the repository can preserve it.

Also preserve these principles:

* The repository is the durable source of truth.
* Prompts and conversations are temporary.
* Specifications are the interface between human intent and Agent execution.
* Explicit work authorization outranks plans, prompts, or model initiative.
* An Agent may reason proactively but may implement only within an explicitly prepared and authorized scope.
* A builder must not be the sole judge of its own work.
* Generated output is not verified progress.
* Review findings must distinguish facts, evidence, inference, judgment, uncertainty, and missing information.
* Tests, specifications, repository evidence, and human judgment are the final arbiters—not agreement between models.
* Review Agents are advisory. The project owner retains decision and authorization authority.
* Governance must remain proportional. Distinguish:

  * sprint-blocking prerequisites;
  * component-specific prerequisites;
  * deferred dependencies;
  * optional inputs.
* Do not convert SDLC2 into mechanical bureaucracy.

# Required source inspection

Before designing anything:

1. Read the repository’s root `AGENTS.md`.

2. Discover and read all applicable nested `AGENTS.md` and `AGENTS.override.md` files.

3. Inventory the `/docs` directory and identify existing SDLC2, architecture, planning, specification, testing, QA, review, operational, and learning documents.

4. Inspect existing `.codex`, `.agents`, `.github`, `CLAUDE.md`, Skills, hooks, scripts, templates, and CI configuration.

5. Check the current Git status and preserve unrelated user changes.

6. Locate and read these supplied source files by path or filename:

   * `project_sources/01-PENA_SDLC2_Operational_AI_Learning_Curriculum.md`
   * `project_sources/02-AI-Learn-SDLC2-Context-Engineering-Primer.md`
   * `project_sources/03-AI-Learn-Primer.md`
   * `project_sources/04-AI-Learn-000-Master-Primer.md`

7. Search the repository for the current canonical SDLC2 lifecycle. Do not assume that an older primer contains the latest lifecycle.

8. If multiple lifecycle versions conflict, preserve the discrepancy in a short decision-needed section. Do not silently invent a new canonical lifecycle.

9. Treat the attached learning primers as sources and context, not automatically as higher authority than current repository governance.

# Source precedence

When sources conflict, use this precedence:

1. Pablo’s explicit instruction in this task.
2. Applicable repository `AGENTS.md` and `AGENTS.override.md`.
3. Explicitly identified canonical SDLC2 documents.
4. Current project architecture, specifications, and accepted decisions.
5. The attached learning primers.
6. General Codex or industry defaults.

Report material conflicts instead of concealing them.

# Use Codex capabilities deliberately

Apply all relevant Codex customization layers, keeping their responsibilities distinct:

* `/docs`: canonical, vendor-neutral SDLC2 knowledge and Agent definitions.
* `AGENTS.md`: concise repository governance, routing, completion rules, and consequential review invariants.
* Nested `AGENTS.md`: scoped rules only where a component genuinely needs specialized guidance.
* `.codex/agents/`: project-scoped Codex custom Agent definitions.
* `.agents/skills/`: reusable review procedures.
* `.codex/config.toml`: only supported Codex execution and multi-Agent configuration.
* Codex Code Review rules: consequential repository-specific review rules placed in the closest applicable `AGENTS.md`.
* Hooks or command rules: only for deterministic mechanical enforcement that should not depend on model judgment.
* MCP: only when a review procedure genuinely needs an external system.
* Subagents: use for independent, read-heavy analysis and final validation.
* Worktrees: use only if isolation is materially useful.
* Automations: document possible future uses, but do not create scheduled reviews without explicit scheduling authority.

Do not force every Codex feature into the repository. If a capability is not appropriate, record why it was intentionally omitted.

Keep canonical SDLC2 semantics in `/docs`. Codex files must remain thin execution adapters rather than duplicating the entire methodology.

# Required documentation structure

Adapt names only when the repository already has a clearly established equivalent structure. Otherwise create:

```text
docs/
  sdlc2/
    agents/
      README.md

      common/
        SDLC2-REVIEW-SYSTEM.md
        SDLC2-LIFECYCLE-AND-GATES.md
        SDLC2-REVIEW-EVIDENCE-CONTRACT.md
        SDLC2-FINDINGS-TAXONOMY.md
        SDLC2-AGENT-RESPONSIBILITY-MATRIX.md

      methodology-readiness-review/
        AGENT-CHARTER.md
        REVIEW-PROCEDURE.md
        REVIEW-CHECKLIST.md
        REVIEW-REPORT-TEMPLATE.md

      code-review/
        AGENT-CHARTER.md
        REVIEW-PROCEDURE.md
        REVIEW-CHECKLIST.md
        REVIEW-REPORT-TEMPLATE.md

      qa-evidence-review/
        AGENT-CHARTER.md
        REVIEW-PROCEDURE.md
        REVIEW-CHECKLIST.md
        REVIEW-REPORT-TEMPLATE.md

      integration/
        SDLC2-REVIEW-ORCHESTRATION.md
        SDLC2-CODEX-INTEGRATION.md
        SDLC2-PROVIDER-PORTABILITY.md
        SDLC2-ADOPTION-AND-VALIDATION-PLAN.md
```

Do not create duplicate documents when a suitable canonical document already exists. Extend, link, or adapt existing artifacts carefully.

# Common review model

Define a common evidence-backed review model shared by all three Agents.

Every review report must identify:

* Review target.
* Requested operation.
* Baseline branch, commit, specification, sprint, component, or release.
* Applicable instruction and document sources.
* Files and artifacts inspected.
* Commands executed.
* Evidence produced or examined.
* Findings ordered by consequence.
* Missing or inaccessible evidence.
* Assumptions and uncertainties.
* Conflicting sources.
* Required decisions.
* Recommended next action.
* Explicit statement of what the reviewer did not evaluate.

Use a restrained status vocabulary such as:

* `READY`
* `READY WITH CONDITIONS`
* `NOT READY`
* `CANNOT ASSESS`

Define finding severity independently from readiness status. Avoid declaring a project ready merely because no defect was found.

Every finding should include:

* Identifier.
* Severity.
* Category.
* Evidence location.
* Observation or fact.
* Consequence.
* Applicable requirement or invariant.
* Recommended safe path.
* Confidence or uncertainty.
* Blocking scope:

  * sprint-blocking;
  * component-blocking;
  * deferred;
  * advisory.

# Agent 1: SDLC2 Methodology and Readiness Review Agent

Define this Agent as the umbrella reviewer and process guardian.

It must review, as applicable:

* Context and domain understanding.
* Intent and expected outcomes.
* System model, actors, boundaries, and use cases.
* Benchmarks, acceptance criteria, and testability.
* VibePOC or exploratory evidence where applicable.
* Solution design.
* Architecture and component responsibilities.
* Planning and dependencies.
* Specifications and implementation readiness.
* Explicit implementation authorization.
* Build and test evidence.
* Development QA.
* Code-review readiness and findings.
* Merge and release readiness.
* Operational reality and observability.
* Sprint closure, lessons, feedback, and next-sprint input.

The Agent must:

* Inspect repository evidence before making a readiness judgment.
* Identify missing prerequisites without manufacturing them.
* Distinguish missing evidence from evidence of failure.
* Route specialized questions to the Code Review or QA Evidence Review Agent.
* Preserve dissenting specialist findings in its consolidated report.
* Never authorize implementation, merge, release, or deployment.
* Never implement missing work during a review operation.
* Avoid reviewing detailed code correctness unless necessary to determine whether the required review exists.

# Agent 2: SDLC2 Code Review Agent

Define this Agent as an independent, read-only code reviewer.

It must evaluate applicable changes for:

* Correctness and behavioral regressions.
* Conformance to intent, use cases, specifications, and acceptance criteria.
* Architectural consistency.
* Responsibility allocation and component boundaries.
* SOLID 2.0 and responsibility-driven design where the repository requires them.
* Security, privacy, data integrity, concurrency, and failure behavior.
* API and compatibility contracts.
* Error handling and recovery.
* Test quality and missing tests.
* Observability implications.
* Maintainability when it has a concrete engineering consequence.
* Repository-specific review invariants from root or nested `AGENTS.md`.

It must:

* Review the actual diff and trace affected execution paths.
* Cite exact files, symbols, and evidence.
* Prioritize consequential findings.
* Avoid style-only comments better handled by formatters or linters.
* Explain safe counterexamples and exceptions.
* Run safe deterministic verification commands when useful.
* Never fix the code during the review operation.
* Never treat passing tests as proof that no defect exists.
* Never approve its own implementation work.

Add concise `## Code Review Rules` sections to the applicable `AGENTS.md` only for durable, consequential, repository-specific invariants. Keep formatting and mechanical checks in CI.

# Agent 3: SDLC2 QA Evidence Review Agent

Define this Agent as an independent reviewer of QA evidence.

It must evaluate:

* Traceability from intent and acceptance criteria to tests and evidence.
* Test environment and configuration.
* Exact commands and procedures used.
* Reproducibility.
* Test data and fixtures.
* Expected versus observed results.
* Screenshots, recordings, logs, traces, reports, and other evidence.
* Timestamps, commit or build identity, and provenance.
* Negative paths and failure cases.
* Regression coverage.
* Platform, browser, device, or environment coverage when applicable.
* Known limitations and untested areas.
* Whether evidence demonstrates the claimed behavior rather than merely showing activity.
* Whether evidence is sufficient for the specific gate being claimed.

It must distinguish:

* A developer or Agent claim.
* Evidence that an action was attempted.
* Evidence that a test executed.
* Evidence that the expected result occurred.
* Evidence that the result corresponds to the reviewed build.
* Evidence sufficient to support a release or gate decision.

It must not:

* Accept “tests passed” without inspectable results.
* Treat screenshots alone as complete evidence when deterministic evidence is available.
* repair product defects while reviewing evidence;
* invent missing results;
* infer full system quality from a narrow happy-path demonstration.

# Codex custom Agents

Create these project-scoped, read-only custom Agent definitions:

```text
.codex/agents/
  sdlc2-methodology-reviewer.toml
  sdlc2-code-reviewer.toml
  sdlc2-qa-evidence-reviewer.toml
```

Use only fields supported by the current Codex installation.

Each custom Agent must define:

* `name`
* `description`
* `developer_instructions`
* an appropriate read-only sandbox setting;
* appropriate reasoning defaults only when justified.

The custom Agent instructions must reference the canonical `/docs` definitions and applicable `AGENTS.md`; do not paste the entire methodology into TOML.

Do not give review Agents write authority merely because the parent session has it. State clearly that a live parent-session permission override may supersede a custom Agent default and that the behavioral prohibition against editing remains in force.

# Reusable Skills

Create repository Skills under:

```text
.agents/skills/
  sdlc2-methodology-review/
  sdlc2-code-review/
  sdlc2-qa-evidence-review/
```

Each Skill must contain a valid `SKILL.md` and use progressive disclosure.

The Skill should define the repeatable procedure: inputs, target resolution, evidence collection, checks, report production, stopping conditions, and handoff.

Put detailed checklists and templates in `/docs` or Skill references rather than bloating the Skill metadata.

Do not create scripts merely to make the Skill appear sophisticated. Add scripts only when they provide deterministic, reusable verification.

# Orchestration model

Document and implement this relationship:

1. The human or project-owning Agent requests a review.
2. The SDLC2 Methodology and Readiness Reviewer resolves the target and applicable gate.
3. It may delegate code review and QA-evidence review as separate read-only operations.
4. Each specialist returns its own evidence-backed report.
5. The umbrella reviewer consolidates the results without erasing disagreement.
6. The project owner decides whether to accept, reject, defer, or request remediation.
7. A separate authorized implementation operation performs any fixes.
8. Review is repeated against the new repository state.

A review request is context and work authorization for review only. It is not authorization to implement repairs.

# Provider portability

Keep the methodology vendor-neutral.

Document the mapping:

* `/docs`: canonical SDLC2 semantics.
* `AGENTS.md`: portable repository contract and routing.
* `.codex/agents`: Codex execution-role adapters.
* `.agents/skills`: portable reusable procedures where supported.
* `.codex/config.toml`: Codex runtime configuration.
* `CLAUDE.md` or Copilot-specific instructions: future thin adapters, not competing canonical definitions.

Do not create provider-specific duplication unless the repository already requires it.

# Multi-Agent execution for this assignment

Use parallel subagents only for independent read-heavy work. Suggested division:

* Repository and existing-document inventory.
* SDLC2 lifecycle and governance extraction.
* Codex configuration and schema verification.
* Cross-document consistency and responsibility-boundary review.

The main Agent owns integration and writes. Avoid parallel writes to overlapping files.

Wait for all required analysis Agents, reconcile discrepancies, and preserve material disagreements.

# Validation

After creating the package:

1. Validate all internal links and referenced paths.
2. Validate TOML syntax.
3. Validate Skill metadata and structure.
4. Confirm all three custom Agents are discoverable under the supported Codex mechanism.
5. Confirm all review Agents are behaviorally read-only.
6. Confirm canonical methodology is not duplicated unnecessarily.
7. Confirm the umbrella Agent does not absorb the responsibilities of the two specialists.
8. Confirm the specialists do not claim project authority.
9. Confirm the QA Evidence Reviewer evaluates evidence rather than acting as the general test executor.
10. Confirm the Code Reviewer reviews implementation rather than becoming an implementer.
11. Confirm no Registry, Inbox, Outbox, or external Agent context was modified.
12. Confirm unrelated repository changes were preserved.
13. Run a dry review of the created package using independent read-only Agents:

    * one coverage reviewer;
    * one boundary and contradiction reviewer;
    * one Codex configuration reviewer.
14. Repair material problems found in the package, then revalidate.

# Final response

Lead with the outcome.

Report:

* Files created.
* Existing files updated.
* Existing artifacts reused instead of duplicated.
* The responsibility boundary of each Agent.
* Codex capabilities applied.
* Capabilities intentionally not applied and why.
* Validation commands and results.
* Conflicts or decisions still requiring Pablo.
* Exact prompt examples for invoking each of the three Agents.
* Git status summary.

Do not commit, push, open a pull request, modify external systems, or update the Personal Agent System Registry unless Pablo separately authorizes that action.
