# Elustondo.ai website

This repository contains the Elustondo.ai website and its implementation documentation. Sprint 001 establishes a local-only React, TypeScript, and Vite homepage foundation; it does not include backend, AI, Firebase, deployment, or DNS behavior.

## Local workflow

Use Node.js 20 or newer and pnpm:

```text
pnpm install
pnpm run typecheck
pnpm run lint
pnpm test
pnpm run build
pnpm run preview
```

The preview command prints the local URL. The application is self-contained after its local assets load and has no runtime backend dependency.

## Project structure

- `src/App.tsx`: semantic shell components and homepage content.
- `src/styles.css`: design tokens and responsive presentation.
- `public/assets/`: approved build-time copies of canonical brand assets.
- `docs/`: product, design, planning, evidence, and governance records.

The canonical brand masters remain in the controlled corporate Brand & Marketing collection. Repository copies are build-time assets, not competing masters.
