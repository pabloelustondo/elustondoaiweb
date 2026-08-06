# Frontend Content

This folder contains reviewed typed records used by the visitor-facing application. `siteContent.ts` owns permanent page content; [`articles/`](articles/) owns the fallback article snapshot, the runtime catalog client, taxonomy, ranking, provenance, and their tests.

The only runtime fetch is the curated article catalog from this site's own `/api/articles` endpoint. Unreviewed imports, backend persistence, and editorial approval workflows do not belong in this folder.
