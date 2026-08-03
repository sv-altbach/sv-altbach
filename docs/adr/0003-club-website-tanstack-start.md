# ADR-0003: Club website on TanStack Start

## Status

Accepted

## Context

ADR-0001 split Club (`apps/web`) and Masters (`apps/masters`) and foreshadowed moving Club to TanStack Start while freezing Masters on Next. Club was still on Next.js App Router (Cache Components, server actions, `next/image`, `NEXT_PUBLIC_*`), which blocked that stack move and kept both apps on the same framework story.

## Decision

- Convert `apps/web` in place to **TanStack Start** (Vite 8 + Nitro) with default `src/routes` file routing.
- Flat route tree under `__root` (no pathless `(root)`-style layout group).
- Contact form uses one Start `createServerFn` with Valibot + Resend; no dedicated contact HTTP route.
- Tumblr blog posts load via the home route loader with ~1h client `staleTime`; no Next ISR / `/api/revalidate`.
- Public Masters origin env is `VITE_MASTERS_URL` (replacing `NEXT_PUBLIC_MASTERS_URL`).
- Images stay as plain `<img>` / CSS (no Unpic / image CDN).
- Masters remains Next and is out of scope for this change.
- Hosting stays two Vercel projects; Club builds with Vite + Nitro for Vercel.

## Consequences

- Club maintainers develop and deploy a Start app; Masters keep Next tooling (`typegen`, `.next`, etc.).
- Shared `@sv-altbach/ui` stays framework-agnostic; typescript-config gains a Vite/Start base (`tsconfig.vite.json`) while Masters keeps `tsconfig.nextjs.json`.
- Deploy env for Club must set `VITE_MASTERS_URL` when cutting over from `NEXT_PUBLIC_MASTERS_URL`.
