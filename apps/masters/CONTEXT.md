# Masters

SVA Masters tournament site (scoreboard, tournaments, finals, etc.). Workspace package: `apps/masters`.

## Glossary

| Term | Definition | Avoid |
| --- | --- | --- |
| Masters | The SVA Masters product/site and its workspace app (`apps/masters`). | “subdomain app”, “masters package” when you mean the deployable app |
| Scoreboard | Masters ranking / results UI backed by tournament JSON data. | |

## Relations

- Separate deployable app from the **Club website** (`apps/web`).
- **Unchanged** means both a **product freeze** (same URLs, UI, scoreboard behavior) and a **stack freeze** (stays on Next.js; not part of the TanStack Start migration).
- Split approach: **extract the Club website out**; do not carve/refactor Masters beyond what the split mechanically requires.
- Local default port: `3001`. Routes live at the app root (no `/sub/masters` prefix).
