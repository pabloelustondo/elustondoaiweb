# Repository Scripts

This folder contains controlled repository-level maintenance tools that coordinate more than one package or write review artifacts outside a component.

`refresh-articles.mjs` reads versioned frontend fixtures, validates a candidate article snapshot, and writes a reviewable candidate and diff to Sprint 003 evidence. It does not promote the candidate, call Medium, mutate remote state, or deploy anything.

Component-specific runtime code belongs under `frontend/` or `backend/`, not here.
