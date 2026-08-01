# Conversational Web App Page Mockups

**Status:** Design and interaction reference  
**Implementation status:** Not production code and not evidence of a connected backend

> **Current interpretation:** The existing interactive artifact is an early state prototype. The current Product Vision additionally requires a distinct Assistant Panel, a large Generated Page Canvas, and deterministic examples of both allow-listed navigation and generated-page actions. A revised mockup is required before the first implementation sprint is finalized.

This package illustrates how the new Elustondo.ai experience can work as a web application while preserving a dependable corporate website. It should be read with the [UML models](../uml/conversational-web-app-uml.md), the [Website Design Specification](../website-design-specification-v1.md), and the [Conversational Architecture](../conversational-page-generation-architecture.md).

## Files

- [Interactive standalone mockup](elustondo-web-app-interactive-mockups.html) — open directly in a browser to review the design.
- [Editable visualization fragment](elustondo-web-app-mockups.fragment.html) — source fragment used to produce the standalone review artifact.

The standalone file is the easiest review artifact. The fragment is retained so a future design or implementation agent can inspect and revise the page-state prototype without treating generated wrapper code as canonical application source.

## What the mockup demonstrates

### Permanent shell

- Official Elustondo.ai identity and restrained editorial styling.
- Stable primary navigation for Articles, Projects, Methods, People, About, and Contact.
- A visible explanation of the bounded generated-page capability.
- Continued access to permanent content when generation is unavailable.

### Ready state

- A visitor can ask a focused question about approved Elustondo.ai material.
- Suggested questions illustrate supported scope without presenting a general-purpose chatbot.
- The stable shell owns the input and submit action.
- A future revised mockup should show the Assistant Panel separately from the dominant page canvas; its exact desktop placement remains a design decision.

### Navigation-result state

- The assistant identifies an existing permanent destination instead of regenerating equivalent information.
- The shell validates and executes an allow-listed route.
- A future revised mockup must demonstrate this state; it is not represented completely by the current artifact.

### Generated-page state

- A page-like response is presented as an authored result, not a chat transcript.
- The result names the approved sources used.
- A visible notice explains that the result is bounded, sanitized, scriptless, and isolated.
- Permanent source pages remain one click away.

### Service-unavailable state

- The shell remains intact when the model provider, quota, validation, policy, or budget boundary blocks generation.
- No partial generated output is displayed.
- The visitor is redirected to useful permanent content and contact options.

### Mobile-width review

- The `Mobile width` control constrains the same states to a narrow viewport.
- Mobile is a responsive presentation of the same content and actions, not a separate product flow.

## Review controls

The top controls switch among `Ready`, `Generated page`, and `Service unavailable`. The mobile-width switch is independent, so every state can be reviewed at desktop and narrow widths.

## Design decisions illustrated

- The experience is page generation inside a stable site, not an open-ended chatbot.
- AI output never owns the header, navigation, footer, page routing, or input controls.
- The editorial visual language remains calm and corporate rather than resembling a chat product.
- Sources and system boundaries are visible without dominating the visitor experience.
- Failure is a designed state, not an empty screen.

## Production handoff rules

- Rebuild the experience as accessible semantic application components; do not ship this mockup as the production application.
- Use approved logo masters from the controlled corporate brand collection. The embedded vector artwork is a design-review representation, not a replacement brand master.
- Replace placeholder buttons and sample questions only with reviewed routes and content.
- Implement loading, insufficient-source, policy-refusal, invalid-output, and unavailable states from the UML state model, even where this visual review artifact shows only the principal states.
- Validate keyboard operation, focus order, screen-reader labelling, reduced motion, colour contrast, and responsive behaviour down to 320 CSS pixels.
- Apply the generated-page contract, source verification, sanitization, and sandbox restrictions before rendering any live response.

## Acceptance for the visual baseline

- Official brand identity is recognizable and unmodified.
- Permanent navigation remains visible in every state.
- The generated result is visually distinct without becoming a separate uncontrolled application.
- Source disclosure and bounded-generation language are clear.
- The unavailable state remains useful and trustworthy.
- Desktop and narrow-width layouts preserve the same information hierarchy.
- A revised baseline demonstrates both assisted navigation and generated-page composition.
