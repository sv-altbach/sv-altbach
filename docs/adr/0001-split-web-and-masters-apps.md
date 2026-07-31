# ADR-0001: Split Club website and Masters into separate apps

## Status

Accepted (grilling; implementation not started)

## Context

`apps/web` currently serves both the Club website and Masters via Next host rewrites (`masters.<domain>` → `/sub/masters/...`). That couples two products in one build/runtime. Masters should stay on Next unchanged; the Club website will later move to TanStack Start.

## Decision

- Deployable apps: `apps/masters` (Masters) and `apps/web` (Club website).
- Extract the Club website out of the combined app; keep Masters product behavior and Next stack frozen.
- Remove subdomain rewrite / `/sub/...` routing from the Next build — each app is its own origin.
- Masters flattens routes to the app root (`/scoreboard`, etc.) so public paths on `masters.<domain>` stay stable without rewrites.
- **Hosting:** two Vercel projects/deployments — club host → `apps/web`, `masters.<domain>` → `apps/masters`.
- **Scope:** this change is the split only. TanStack Start (Club) and shadcn monorepo design system are follow-ups.
- **Local ports:** `apps/web` → `3000`, `apps/masters` → `3001`, with env examples so Club → Masters links work under turbo.

## Consequences

- Club → Masters links use an env-configured origin (e.g. `NEXT_PUBLIC_MASTERS_URL`); delete `SubdomainLink` / subdomain helpers.
- Cross-site links are absolute URLs, not internal subdomain helpers.
- DNS/Vercel domain config owns host routing; Next does not.
- **UI / shadcn:** do not extract a shared design-system package in the split itself — each app keeps a local `components/ui`. After the split, implement a shadcn monorepo setup so both apps consume one design system.
- **Non-UI code:** split by ownership. Masters keeps Masters types/tournament data/scoreboard utils; Club website keeps only Club code. No shared runtime package — they share little to no runtime logic; cross-site coupling is URLs only.
