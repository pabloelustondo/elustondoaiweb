# Backend

Backend components are organized by responsibility rather than hosting technology.

- [`article-curator/`](article-curator/) discovers and curates the approved Medium collection on a bounded schedule. Firebase Functions is its current execution mechanism.

Visitor-facing presentation does not belong here. A new backend component requires its own responsibility boundary, tests, operating instructions, and explicit authorization.
