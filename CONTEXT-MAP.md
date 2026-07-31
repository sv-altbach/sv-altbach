# Context map

| Context | Path | Notes |
| --- | --- | --- |
| Club website | [`apps/web/CONTEXT.md`](apps/web/CONTEXT.md) | Public SV Altbach club site. Stays as the `web` app; planned later migration to TanStack Start. |
| Masters | [`apps/masters/CONTEXT.md`](apps/masters/CONTEXT.md) | SVA Masters tournament site. Extracted to `apps/masters`; keep stack and product behavior stable. |

## System-wide decisions

- **Split topology:** Club website = `apps/web`, Masters = `apps/masters` (two deployable apps).
- **Extract direction:** Peel the Club website out; Masters inherits today’s combined Next app shell as far as practical (product + stack freeze).
- **No in-app subdomain routing:** Host-based rewrites / `/sub/:subdomain` indirection in Next were only for serving both sites from one build. That goes away — each app is its own origin.
- **Hosting:** two Vercel projects — club host → `apps/web`, `masters.<domain>` → `apps/masters`.
- **Design system:** during the split, keep shadcn/`components/ui` local to each app. **After** the split, adopt a shadcn monorepo setup so both apps share one design system.
- **Code ownership:** no shared runtime package in the split. Masters owns Masters types/data/utils; Club website owns its own. Cross-site only via URLs, not imports.
- **Club → Masters links:** absolute URLs from env (e.g. `NEXT_PUBLIC_MASTERS_URL`). Remove `SubdomainLink` / subdomain routing helpers.
- **Masters routes:** flatten to app root (`/`, `/scoreboard`, …) — no `/sub/masters` prefix.
- **Scope of this change:** app split only. Club TanStack Start migration and shadcn monorepo design system are separate follow-ups.
- **Local ports:** Club website `3000`, Masters `3001` (wired via env, e.g. `NEXT_PUBLIC_MASTERS_URL`), Club email preview `3002`.

See [`docs/adr/`](docs/adr/) when ADRs exist.
