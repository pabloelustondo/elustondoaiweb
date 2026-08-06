# Repository Scripts

This folder contains controlled repository-level maintenance tools that coordinate more than one package or write review artifacts outside a component.

Article refresh is no longer a manual script: the scheduled curator in [`backend/article-curator/`](../backend/article-curator/) reads the Medium profile feed, applies the "AI Philosophy" tag gate, and publishes the catalog the site fetches from `/api/articles`.

Component-specific runtime code belongs under `frontend/` or `backend/`, not here.
