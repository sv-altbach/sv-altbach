# Context map

| Context | Path | Notes |
| --- | --- | --- |
| Club website | [`apps/web/CONTEXT.md`](apps/web/CONTEXT.md) | Public SV Altbach club site. Stays as the `web` app; planned later migration to TanStack Start. |
| Masters | [`apps/masters/CONTEXT.md`](apps/masters/CONTEXT.md) | SVA Masters tournament site. Extracted to `apps/masters`; keep stack and product behavior stable. |
| Design system | [`packages/ui/CONTEXT.md`](packages/ui/CONTEXT.md) | Shared `@sv-altbach/ui` shadcn package. Primitives + base CSS; per-app theme tokens stay in each app. |

## System-wide decisions

- **Split topology:** Club website = `apps/web`, Masters = `apps/masters` (two deployable apps).
- **Extract direction:** Peel the Club website out; Masters inherits today’s combined Next app shell as far as practical (product + stack freeze).
- **No in-app subdomain routing:** Host-based rewrites / `/sub/:subdomain` indirection in Next were only for serving both sites from one build. That goes away — each app is its own origin.
- **Hosting:** two Vercel projects — club host → `apps/web`, `masters.<domain>` → `apps/masters`.
- **Design system:** shared `@sv-altbach/ui` (`packages/ui`) for shadcn primitives, utils/hooks, and base stylesheet. Club website and Masters keep **separate theme tokens** and app-specific CSS; do not force one brand look onto the other. Apps import directly from package exports (no local `components/ui` forks). See ADR-0002.
- **Code ownership:** no shared non-UI runtime package. Masters owns Masters types/data/utils; Club website owns its own. Cross-site only via URLs, not imports (UI primitives via `@sv-altbach/ui` are the intentional exception).
- **Club → Masters links:** absolute URLs from env (e.g. `NEXT_PUBLIC_MASTERS_URL`). Remove `SubdomainLink` / subdomain routing helpers.
- **Masters routes:** flatten to app root (`/`, `/scoreboard`, …) — no `/sub/masters` prefix.
- **Local ports:** Club website `3000`, Masters `3001` (wired via env, e.g. `NEXT_PUBLIC_MASTERS_URL`), Club email preview `3002`.

See [`docs/adr/`](docs/adr/) when ADRs exist.
