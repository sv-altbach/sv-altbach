# Club website

Public website for SV Altbach (the club), served from the `web` workspace package (`apps/web`).

## Glossary

| Term | Definition | Avoid |
| --- | --- | --- |
| Club website | The regular club-facing site (teams, training, contact, etc.). Lives in `apps/web`. | “root app”, “main site” when writing tickets — prefer **Club website** |
| Web | The npm/workspace package name for the Club website (`apps/web`). | Using “web” to mean Masters |

## Relations

- Promotes / links out to **Masters** (separate app: `apps/masters`).
- Consumes shared UI primitives from the **Design system** (`@sv-altbach/ui`); Club theme tokens stay in this app’s `globals.css`.
- This is the code that gets **extracted** from today’s combined Next app; Masters is not the extraction target.
- Planned later: migrate this app to TanStack Start; Masters is out of that migration.
- Local default port: `3000`. Links to Masters via `NEXT_PUBLIC_MASTERS_URL` (local: `http://localhost:3001`).
- Email preview (`bun run email-preview`): port `3002` (started alongside `dev` via turbo `with`).
