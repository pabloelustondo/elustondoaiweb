# Elustondo.ai Website Project Index

> Imported from the [canonical Google Doc](https://docs.google.com/document/d/17DQkxfMjkdw5AP-oT4lO0JDDLUM48T-jRA6MGZdNncY) on 2026-07-31.

> **Current evolution:** The July 31 conversational page-generation proof of concept extends this static baseline. See [Conversational Experience Context](conversational-experience-context.md).

**Status:** Active development
**Owner:** Elustondo Systems Consulting Inc.
**Original Drive project folder:** C7-Corporation / Elustondo.ai Website

**Canonical implementation repository:** `/Users/paboelustodo/-PROJECTS/elustondoaiweb`
**Production domain:** elustondo.ai
**Current production host:** GoDaddy placeholder
**Target host:** Firebase Hosting
**DNS cutover rule:** Do not switch DNS until the Firebase deployment is reviewed and passes the release QA gate.

## 1. Purpose

This folder is the canonical working context for the design, content, implementation, quality assurance, deployment, and release history of the Elustondo.ai website.

The site must present a quiet, serious, editorial technology practice. It must not resemble a promotional AI landing page, generic agency website, or personal résumé. The public identity is Elustondo.ai, operated by Elustondo Systems Consulting Inc.

## 2. Canonical folder map

00 Start Here — project index, current-state summaries, decisions, and orientation.
01 Product & Content — audience, positioning, information architecture, page copy, services, projects, methods, articles, and team content.
02 UX & Visual Design — approved design specification, wireframes, mockups, responsive behavior, accessibility, and design decisions.
03 Architecture & Development — technical architecture, repository conventions, Firebase configuration, implementation plans, and engineering records.
04 QA & Release — test plans, browser/device evidence, accessibility reports, performance results, release approvals, and DNS cutover records.
05 Website-Specific Assets — website-only mockups, page graphics, team photography, social previews, favicon exports, working files, provenance, and archived iterations.

## 3. Brand asset boundary

Canonical corporate logos and identity files do not belong in the website project folder. They remain under:
C7-Corporation / Brand & Marketing

The website consumes those approved assets but does not fork or redraw them. The official master logo, corporate lockup, shield, square icon, article signature, email signature mark, payment application, brand applications sheet, and brand-use rules are maintained centrally there.

## 4. Current design baseline

The approved baseline is the editorial homepage concept created in July 2026:
- restrained white/off-white canvas;
- dark Elustondo blue typography and controls;
- serif display headings paired with clean sans-serif body text;
- official Elustondo.ai logo in the header;
- clear navigation for Home, Articles, Projects, Methods, People, About, and Contact;
- hero positioning around practical software architecture, AI-assisted engineering, and agentic systems;
- selected writing, current work, team, and professional links;
- no fabricated portraits, project claims, client logos, locations, or credentials.

## 5. Authoritative documents

- Elustondo.ai Website Design Specification v1 — visual direction, layout, component behavior, copy constraints, and responsive rules.
- Elustondo.ai Website Development Plan v1 — technical approach, delivery phases, repository strategy, Firebase preview process, QA gates, and release plan.
- Elustondo.ai Brand & Graphical Asset Register — canonical files, intended uses, ownership, archival rules, and website consumption rules.

## 6. Working rules

- GitHub will be the source of truth for production code.
- AI builders may be used for ideation or code generation, but generated work must enter the repository and pass review.
- Firebase preview URLs are used for development and QA.
- elustondo.ai remains on the current public placeholder until release approval.
- Static content is preferred for v1; do not introduce Firestore, authentication, Cloud Functions, or a CMS without a demonstrated requirement.
- Existing official logos must be used without redrawing, recolouring, stretching, or modifying internal spacing.
- Every public fact, role, project statement, and contact detail must be verified before release.

## 7. Immediate next steps

1. Review and approve the local documentation baseline and conversational proof-of-concept package.
2. Select and approve the smallest public source pack.
3. Decide the first authorized implementation increment.
4. Prove the stable shell, UI states, generated-page contract, and sandbox with deterministic fixtures.
5. Decide provider, credential, Firebase billing, budget, quota, and preview-access responsibilities before live generation.
6. Run content, safety, accessibility, responsive, operational, and cost QA in a controlled preview.
7. Make an explicit continue, revise, stop, production-release, and eventual DNS decision.

**Last updated:** 2026-07-31
