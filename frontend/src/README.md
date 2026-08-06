# Frontend source

This folder contains the maintained React application source for the public Elustondo.ai experience.

- `main.tsx` mounts the application.
- `App.tsx` owns the stable shell, routes, navigation, and page composition.
- `styles.css` owns the responsive visual system.
- `content/` contains reviewed, typed public-content records and their provenance rules.
- `test/` contains shared browser-test setup; colocated `*.test.*` files verify application behavior.

Keep visitor rendering deterministic and independent of live Medium, LinkedIn, GitHub, Gemini, or curator requests. Scheduled ingestion and classification belong to [`backend/article-curator`](../../backend/article-curator/README.md).
