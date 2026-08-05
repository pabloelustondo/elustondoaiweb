# AI-Assisted Web App UML

**Status:** Implementation reference for the Elustondo.ai proof of concept  
**Scope:** Stable public website, assisted navigation, and bounded generated pages

These models illustrate the component boundaries, request flow, trust boundaries, and visitor-visible states established by the [Product Vision](../../02-intent/product-vision.md), [System Model and Use Cases](../../03-system-model-and-use-cases/conversational-page-generation-system-model-and-use-cases.md), [AI-Assisted Navigation and Page Generation Architecture](../conversational-page-generation-architecture.md), and [Assistant Action Contract](../../08-specifications-as-code/generated-page-contract.md).

The diagrams are specifications, not evidence that the system has been implemented or deployed.

## 1. Structural component model

```mermaid
classDiagram
    class StableShell {
        +renderPermanentSite()
        +validateAssistantResult()
        +presentTrustedState()
        +remainUsableWithoutAI()
    }
    class AssistantPanel {
        +collectTextRequest()
        +showSuggestions()
        +trackBoundedSession()
        +acceptFutureVoiceInput()
    }
    class IntentRouter {
        +proposeNavigate()
        +proposeGeneratedPage()
        +requestClarification()
        +returnBoundedFailure()
    }
    class SiteNavigator {
        +verifyRouteId()
        +navigateAllowListedRoute()
    }
    class ApprovedContentRetriever {
        +selectRoutes()
        +selectSources()
    }
    class PageGenerationCoordinator {
        +constructProviderRequest()
        +applyTimeouts()
        +boundOutput()
    }
    class ModelAdapter {
        +invokeModel()
        +translateProviderErrors()
        +reportUsage()
    }
    class OutputGuard {
        +validateActionContract()
        +verifyRoutesAndSources()
        +sanitizeHTML()
        +rejectActiveContent()
    }
    class GeneratedPageCanvas {
        +renderScriptlessHTML()
        +isolateFromShell()
    }
    class ApprovedSourcePack {
        +sourceId
        +routeId
        +approvedContent
        +reviewDate
    }
    class VoiceInputAdapter {
        +transcribeToText()
    }

    StableShell *-- AssistantPanel
    StableShell *-- SiteNavigator
    StableShell *-- GeneratedPageCanvas
    AssistantPanel --> IntentRouter : normalized request
    VoiceInputAdapter ..> AssistantPanel : future text input
    IntentRouter --> ApprovedContentRetriever
    ApprovedContentRetriever --> ApprovedSourcePack
    IntentRouter --> PageGenerationCoordinator : when generation needed
    PageGenerationCoordinator --> ModelAdapter
    ModelAdapter --> OutputGuard : untrusted candidate
    OutputGuard --> StableShell : validated action envelope
    StableShell --> SiteNavigator : navigate action
    StableShell --> GeneratedPageCanvas : render action
```

### Responsibility boundary

- `StableShell` owns identity, trusted UI, routing authority, and availability.
- `AssistantPanel` owns visitor input and bounded interaction state.
- `IntentRouter` proposes an action but never navigates or renders directly.
- `SiteNavigator` executes only shell-owned allow-listed routes.
- `ApprovedContentRetriever` selects reviewed routes and sources.
- `PageGenerationCoordinator` owns the bounded composition workflow.
- `ModelAdapter` isolates provider-specific behavior.
- `OutputGuard` validates every action and fails closed.
- `GeneratedPageCanvas` renders only sanitized scriptless HTML in isolation.
- `VoiceInputAdapter` is a future input adapter, not a separate decision pipeline.

## 2. System and trust-boundary view

```mermaid
flowchart LR
    Visitor["Anonymous visitor"]

    subgraph Browser["Browser — stable website plane"]
        Shell["Stable Shell"]
        Panel["Assistant Panel"]
        Navigator["Site Navigator"]
        Canvas["Generated Page Canvas"]
        Permanent["Permanent pages, articles, resources and contact"]

        Shell --> Panel
        Shell --> Navigator
        Shell --> Canvas
        Navigator --> Permanent
    end

    subgraph Server["Firebase — assistant plane"]
        Endpoint["Assistant Endpoint"]
        Router["Intent Router"]
        Retriever["Approved Content Retriever"]
        Coordinator["Page Generation Coordinator"]
        Adapter["Model Adapter"]
        Guard["Output Guard"]
        Pack["Approved Source and Route Pack"]

        Endpoint --> Retriever
        Retriever --> Pack
        Endpoint --> Router
        Router --> Coordinator
        Coordinator --> Adapter
        Adapter --> Guard
        Router --> Guard
    end

    Provider["External model provider"]

    Visitor --> Shell
    Panel -->|"Untrusted request"| Endpoint
    Adapter --> Provider
    Provider -->|"Untrusted candidate"| Adapter
    Guard -->|"Validated action envelope"| Endpoint
    Endpoint --> Shell
    Shell -->|"Allow-listed route"| Navigator
    Shell -->|"Sanitized HTML"| Canvas
```

The principal trust boundary is the `OutputGuard`. Neither a route nor generated HTML becomes a browser action merely because the model proposed it.

## 3. Navigation or generation sequence

```mermaid
sequenceDiagram
    actor Visitor
    participant Panel as Assistant Panel
    participant Shell as Stable Shell
    participant Endpoint as Assistant Endpoint
    participant Content as Approved Content Retriever
    participant Router as Intent Router
    participant Model as Model Adapter and Provider
    participant Guard as Output Guard
    participant Navigator as Site Navigator
    participant Canvas as Generated Page Canvas

    Visitor->>Panel: Enter question or destination request
    Panel->>Shell: Submit normalized text
    Shell->>Endpoint: Versioned assistant request
    Endpoint->>Content: Select approved routes and sources
    Content-->>Endpoint: Bounded approved records
    Endpoint->>Router: Resolve proposed action

    alt Existing permanent destination is sufficient
        Router-->>Guard: Candidate navigate action
        Guard-->>Endpoint: Validated route identifier
        Endpoint-->>Shell: navigate envelope
        Shell->>Navigator: Execute allow-listed route
        Navigator-->>Visitor: Permanent page
    else Tailored explanation is required
        Router->>Model: Policy + intent + approved sources
        Model-->>Guard: Candidate generated-page action
        Guard->>Guard: Validate contract and sources
        Guard->>Guard: Sanitize scriptless HTML
        Guard-->>Endpoint: Safe generated-page envelope
        Endpoint-->>Shell: render envelope
        Shell->>Canvas: Render isolated document
        Canvas-->>Visitor: Generated page with sources
    else Request is ambiguous or unsupported
        Router-->>Guard: Clarification, limitation or refusal
        Guard-->>Endpoint: Typed trusted outcome
        Endpoint-->>Shell: Non-HTML outcome
        Shell-->>Visitor: Trusted shell message
    end
```

## 4. Visitor-visible state model

```mermaid
stateDiagram-v2
    [*] --> Ready
    Ready --> Routing: Submit request
    Routing --> Navigating: Valid route action
    Routing --> Generating: Generated page required
    Routing --> ClarificationRequired: Ambiguous request
    Routing --> InsufficientInformation: Unsupported by approved material
    Routing --> PolicyRefusal: Outside policy
    Routing --> Unavailable: Service, quota or budget failure
    Generating --> GeneratedPage: Valid grounded response
    Generating --> InvalidOutput: Validation failed
    Generating --> Unavailable: Provider or timeout failure
    Navigating --> PermanentSite: Shell executes route
    GeneratedPage --> Routing: Refine request
    GeneratedPage --> Ready: Start over
    ClarificationRequired --> Routing: Submit clarification
    InsufficientInformation --> Ready: Revise request
    PolicyRefusal --> Ready: Ask supported question
    InvalidOutput --> Ready: Retry
    Unavailable --> Ready: Service restored
    Ready --> PermanentSite: Use normal navigation
    GeneratedPage --> PermanentSite: Open source page
    InsufficientInformation --> PermanentSite: Browse content
    Unavailable --> PermanentSite: Continue without AI
```

## Implementation implications

1. Build the permanent corporate site independently of model connectivity.
2. Treat navigation and page generation as different typed actions.
3. Keep the route allow-list under shell and content-steward control.
4. Preserve normal navigation, downloads, articles, and contact in every assistant state.
5. Keep generation, validation, sanitization, routing, and rendering as separate observable responsibilities.
6. Model voice as a future text-input adapter that enters the same pipeline.
7. Keep future authenticated areas outside the anonymous assistant and generated frame.

## Verification targets

- Permanent public journeys work with the assistant removed or disabled.
- Navigation fixtures can reach only allow-listed local destinations.
- Arbitrary model URLs, unknown route identifiers, unknown sources, and contract mismatches are rejected.
- Generated output cannot execute scripts, submit forms, navigate the parent, access shell state, or imitate authentication controls.
- Clarification and failure outcomes use trusted shell components rather than generated HTML.
- Desktop and mobile presentations expose equivalent information and actions.
