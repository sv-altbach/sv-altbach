# Context map

| Context | Path | Notes |
| --- | --- | --- |
| Club website | [`apps/web/CONTEXT.md`](apps/web/CONTEXT.md) | Public SV Altbach club site. TanStack Start (Vite 8 + Nitro) in `apps/web`. |
| Masters | [`apps/masters/CONTEXT.md`](apps/masters/CONTEXT.md) | SVA Masters tournament site. Extracted to `apps/masters`; keep stack and product behavior stable. |
| CMS | [`apps/cms/CONTEXT.md`](apps/cms/CONTEXT.md) | Headless Payload CMS (Next) in `apps/cms`. Admin + API only; Club consumes posts over HTTP. See ADR-0004. |
| Design system | [`packages/ui/CONTEXT.md`](packages/ui/CONTEXT.md) | Shared `@sv-altbach/ui` shadcn package. Primitives + base CSS; per-app theme tokens stay in each app. |

## System-wide decisions

- **Split topology:** Club website = `apps/web`, Masters = `apps/masters`, CMS = `apps/cms` (three deployable apps).
- **Extract direction:** Peel the Club website out; Masters inherits today’s combined Next app shell as far as practical (product + stack freeze).
- **No in-app subdomain routing:** Host-based rewrites / `/sub/:subdomain` indirection in Next were only for serving both sites from one build. That goes away — each app is its own origin.
- **Hosting:** three Vercel projects — club host → `apps/web`, `masters.<domain>` → `apps/masters`, CMS origin → `apps/cms`. See ADR-0004.
- **Design system:** shared `@sv-altbach/ui` (`packages/ui`) for shadcn primitives, utils/hooks, and base stylesheet. Club website and Masters keep **separate theme tokens** and app-specific CSS; do not force one brand look onto the other. Apps import directly from package exports (no local `components/ui` forks). See ADR-0002. CMS is not a Design system consumer for public UI in v1 (Payload admin owns its chrome).
- **Code ownership:** no shared non-UI runtime package. Masters owns Masters types/data/utils; Club website owns its own; CMS owns Payload config/collections. Cross-app only via URLs, not imports (UI primitives via `@sv-altbach/ui` are the intentional exception between Club and Masters).
- **Club → Masters links:** absolute URLs from env (`VITE_MASTERS_URL` on Club). Remove `SubdomainLink` / subdomain routing helpers.
- **Club → CMS:** Club fetches published content over HTTPS from the CMS origin (`CMS_URL` or equivalent server env). No Payload imports in Club. See ADR-0004.
- **Masters routes:** flatten to app root (`/`, `/scoreboard`, …) — no `/sub/masters` prefix.
- **Local ports:** Club website `3000`, Masters `3001`, Club email preview `3002`, CMS `3003`.
- **Club stack:** TanStack Start (Vite 8 + Nitro). Masters remains on Next. CMS is Next + Payload. Club does **not** revert to Next for CMS. See ADR-0003 and ADR-0004.

See [`docs/adr/`](docs/adr/) when ADRs exist.
