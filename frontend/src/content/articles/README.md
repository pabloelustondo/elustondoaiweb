# Article Content

This folder contains the reviewed fallback article snapshot, deterministic taxonomy and ranking logic, and the runtime catalog client. At load time the application fetches the curated catalog from `/api/articles` (never Medium directly); when that fetch fails, the reviewed local snapshot in this folder is shown instead.

Scheduled discovery from the Medium profile feed, the "AI Philosophy" tag gate, LangChain/Gemini classification, and remote persistence belong to [`backend/article-curator/`](../../../../backend/article-curator/).
