# Club website

Public website for SV Altbach (the club), served from the `web` workspace package (`apps/web`).

## Glossary

| Term | Definition | Avoid |
| --- | --- | --- |
| Club website | The regular club-facing site (teams, training, contact, etc.). Lives in `apps/web`. | “root app”, “main site” when writing tickets — prefer **Club website** |
| Web | The npm/workspace package name for the Club website (`apps/web`). | Using “web” to mean Masters |

## Relations

- Promotes / links out to **Masters** (separate app: `apps/masters`).
- Consumes shared UI primitives from the **Design system** (`@sv-altbach/ui`); Club theme tokens stay in this app’s `styles.css`.
- Stack: **TanStack Start** (Vite 8 + Nitro). Masters stays on Next and is out of Club stack changes.
- Local default port: `3000`. Links to Masters via `VITE_MASTERS_URL` (local: `http://localhost:3001`).
- Email preview (`bun run email-preview`): port `3002` (started alongside `dev` via turbo `with`).
