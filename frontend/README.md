# Frontend

This package is the visitor-facing Elustondo.ai website. It owns the stable branded shell, permanent routes, reviewed static content, responsive layout, accessibility behavior, and browser tests.

## Contents

- `src/` — React application, styling, typed content, and tests.
- `public/` — approved public build-time assets.
- `index.html` — Vite entry document.
- `vite.config.ts` — Vite and frontend Vitest configuration.
- `tsconfig*.json` and `eslint.config.js` — frontend type and lint boundaries.

The frontend does not own scheduled ingestion, Gemini calls, Firebase Storage persistence, deployment authority, or production credentials. It currently renders a reviewed bundled article snapshot; it does not read Medium or the curator during a visitor request.

From the repository root, use `pnpm frontend:dev`, `pnpm frontend:typecheck`, `pnpm frontend:lint`, `pnpm frontend:test`, `pnpm frontend:build`, or `pnpm frontend:preview`. Full instructions are in the [Developer Guide](../docs/02_DeveloperGuide/README_ai.md).
