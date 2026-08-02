# Sprint 001 Correction 02 — Authorized Prompt

**Authorized by:** Pablo Elustondo
**Authorized:** 2026-08-02
**Status:** Immutable executed correction work order

Address the four minor review findings on GitHub pull request #1 without changing the approved Sprint 001 design or product behavior:

1. Align the documented and declared Node.js requirement with the actual dependency engine requirements.
2. Replace every `latest` dependency declaration with explicit reproducible versions, keep only React and React DOM as runtime dependencies, move build and test tooling to development dependencies, and regenerate the pnpm lockfile.
3. Update the StableShell responsibility documentation so it no longer claims the implemented component is unimplemented.
4. Correct the historical implementation-agent overflow evidence so it compares document `scrollWidth` with `clientWidth`, preserves the original mistake transparently, and remains consistent with the historical integration failure and Correction 01 pass.

Preserve unrelated work and historical evidence. Run locked installation, type-check, lint, all automated tests, production build, and Git whitespace checks. Record the correction response and evidence. Stop at `AWAITING_INTEGRATION_TEST` for the correction. Do not perform independent integration testing or code review. Do not merge, deploy, configure Firebase, create credentials, change billing, or modify DNS.
