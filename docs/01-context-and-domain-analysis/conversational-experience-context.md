# Conversational Experience Context

**Date:** 2026-07-31  
**Status:** Current product direction; specification only  
**Owner:** Elustondo Systems Consulting Inc.

## Evolution from the original baseline

The July 28 baseline defined a static, editorial corporate website. That foundation remains useful: it supplies the trusted identity, navigation, reviewed content, fallback pages, accessibility baseline, and Firebase-hosted shell.

The July 31 direction adds a bounded AI-assisted experience. A visitor enters a question or destination request, and the system proposes either navigation to existing permanent content or a focused HTML page inside the stable website shell. This is not an unrestricted unsourced assistant and does not replace the permanent site structure. It is an experiment in navigating and composing useful contextual presentations from approved material.

The project has three purposes: fulfil the company-evaluation and knowledge use cases, exercise and improve SDLC² through a real delivery record, and learn through controlled use of new technologies and interaction patterns.

## Problem

A conventional navigation tree requires visitors to infer where relevant material lives. Elustondo.ai spans services, articles, papers, methods, project evidence, people, résumés, resources, and consulting capabilities; a visitor may instead arrive with a question such as:

- How does Elustondo.ai approach AI-assisted software engineering?
- Which work demonstrates offline-first architecture?
- What is SDLC² and how does it change delivery?
- Who contributes to a particular project or method?

The proof of concept should let the visitor express that intent directly. When an existing page is sufficient, the assistant should help navigate to it. When synthesis is needed, it should generate a grounded, safe, legible page that remains recognizably part of Elustondo.ai.

## Stakeholders

- **Prospective client or evaluator:** wants evidence about services, experience, people, projects, methods, résumés, and engagement fit.
- **Knowledge seeker:** wants useful articles, methods, papers, resources, downloads, or a tailored explanation without learning the site's taxonomy.
- **Content steward:** approves source material and public claims.
- **Website operator:** controls deployment, cost, quotas, safety policy, and incident response.
- **Engineering agent or developer:** implements only the approved specification and preserves evidence.
- **Model provider:** supplies generation capability but is not the source of truth for Elustondo.ai facts.

## Existing assets and constraints

- The official Elustondo.ai identity and the quiet editorial design remain mandatory.
- The permanent shell must work even when generation is unavailable.
- Only approved Elustondo.ai material may ground generated pages.
- User prompts are untrusted input.
- Model output is untrusted until it passes structural validation and sanitization.
- Generated content must not execute arbitrary JavaScript or modify the shell.
- The shell owns an allow-list of permanent destinations; a model-proposed arbitrary URL has no routing authority.
- The two primary public journeys require no registration.
- Member login, protected customer applications, voice, and external research are future capabilities requiring separate specifications.
- A deployed Firebase function requires an explicit billing and operational decision.
- Provider credentials must be stored as managed secrets and never committed or exposed to the browser.
- Preview URLs can be shared publicly; preview access and real backend interaction must be treated accordingly.

## Unknowns requiring a decision

- The initial approved source corpus and its update owner.
- The exact model/provider and acceptable generation cost.
- Whether the first live proof is private, allow-listed, or public.
- Prompt, output, and history retention policy.
- Rate limits, daily budget, abuse response, and per-user controls.
- Whether generated pages must show source citations in every response.
- The process for promoting a successful experiment into the public website.
- The final responsive placement and behavior of the Assistant Panel and Generated Page Canvas.
- The future source-aware external-research policy and whether it should ever answer general current-fact questions.

## Governing principle

The stable site owns identity, navigation, policy, and trust. The assistant may propose an allow-listed route or compose a page inside that boundary; it does not control the website.
