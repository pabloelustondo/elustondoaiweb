# Generated Content Policy

**Date:** 2026-07-31  
**Status:** Required policy baseline for the proof of concept

## Source policy

- Use only material explicitly approved for public Elustondo.ai use.
- Maintain a source identifier, title, canonical URL or repository path, approval state, and last-reviewed date for every source.
- Treat model knowledge as a language capability, not as evidence about Elustondo.ai.
- If the approved corpus does not support an answer, state the limitation and direct the visitor to a stable page or contact path.
- Never infer confidential client details, private commercial arrangements, personal data, credentials, or unapproved project status.
- Treat current external facts as unsupported unless a separately approved retrieval capability provides attributable sources, dates, citations, and freshness evidence.

## Prompt policy

- Treat the visitor prompt as untrusted data.
- Do not allow prompt text to override system policy, source limits, output constraints, or safety rules.
- Reject or safely constrain requests for hidden instructions, credentials, private data, arbitrary scripts, remote resource loading, or actions outside website explanation.
- Treat navigation as a typed proposal. The shell may execute only reviewed local routes or destinations from its own allow-list.
- Apply length and rate limits before invoking the model.

## Output policy

Every accepted response must:

- answer the visitor's intent using approved material;
- distinguish facts, summaries, limitations, and suggested next steps;
- expose the supporting sources in the response envelope and user interface;
- avoid unsupported superlatives, performance claims, testimonials, roles, or credentials;
- use neutral, professional language consistent with the editorial design;
- remain meaningful when styles fail and readable by assistive technology;
- pass the generated-page contract and sanitizer before rendering.

An accepted navigation response must identify a destination from the shell-owned allow-list. A model-provided arbitrary URL is not a navigation authorization.

## Prohibited generated behaviour

Generated output must not contain or activate:

- scripts, event handlers, executable URLs, or dynamic code;
- forms, authentication prompts, payment controls, or file uploads;
- nested frames, browser navigation, pop-ups, or downloads;
- external stylesheets, fonts, images, video, audio, or tracking pixels unless explicitly allow-listed;
- access to cookies, local storage, parent-window APIs, or Firebase credentials;
- claims sourced only from the visitor prompt;
- invented people, biographies, projects, clients, quotes, metrics, or links.

The prohibition on generated browser navigation does not prevent the assistant endpoint from proposing a typed allow-listed navigation action. Only the stable shell may validate and execute that action.

## Presentation policy

- The stable shell always identifies generated content as a composed response.
- Sources and limitations remain visible outside or alongside the generated frame.
- A refusal or insufficient-source response uses the shell's normal components; it is not generated HTML.
- Generated content cannot imitate system notices, security prompts, checkout screens, or login forms.

## Review policy

- The content steward approves the initial corpus and example prompts.
- A representative evaluation suite must be reviewed before live preview.
- Material source changes require content review and regression checks.
- Unsafe output, repeated unsupported claims, or missing attribution blocks promotion.
