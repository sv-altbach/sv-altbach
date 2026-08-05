# ADR-0004: Club CMS as a separate Payload app

## Status

Accepted

## Context

ADR-0003 moved the Club website (`apps/web`) to TanStack Start. Production deploys need a post-build workaround (`apps/web/scripts/patch-react-require.mjs` for Nitro/Vite CJS React requires). Separately, the club wants an editable content layer for news/blog, with Payload CMS v3 as the intended product — Payload v3 integrates best with Next.js; official TanStack Start support is expected with Payload v4.

Reverting Club to Next solely to embed Payload would undo ADR-0003. Embedding Payload in Club is not required for a headless content layer: Club already loads blog teasers from an external origin (Tumblr RSS).

## Decision

- **Do not reverse ADR-0003.** Club stays on TanStack Start. The React-require patch remains accepted deploy debt until fixed upstream.
- Add a new deployable app **`apps/cms`**: Payload CMS v3 on **Next.js**, used only as a **headless content layer** (admin UI + HTTP API). Consuming apps own all public frontends.
- **v1 scope:** Club website is the only consumer. First collection is **posts/news** replacing the live Tumblr home feed. One-shot migration from Tumblr (JSON API) into Payload; then CMS is the source of truth (no ongoing Tumblr sync). Tumblr may remain as archive/footer links only.
- **Hosting:** third Vercel project/origin for CMS (extends ADR-0001’s “one app = one origin” model). Club does not import Payload server code; it fetches published posts over HTTPS and maps responses into Club-owned types (e.g. existing `BlogPost` shape). Cache posture similar to today’s ~1h Tumblr feed stale window; tighter revalidation is optional later.
- **Data:** Vercel Postgres for Payload; Vercel Blob for media uploads. Editor auth: Payload built-in email/password users (no external IdP in v1).
- **Code ownership:** no shared non-UI runtime package between Club and CMS (same rule as Club ↔ Masters). Cross-app coupling is URLs/env only.
- Masters remains out of CMS scope for v1. Revisit in-app Payload on Start only if Payload v4 + TanStack support and upstream bundling fixes make a later consolidation worthwhile.

## Consequences

- CONTEXT-MAP lists three deployable apps (Club, Masters, CMS) and three Vercel projects.
- Club home blog path moves from Tumblr RSS → CMS HTTP API after migration/cutover.
- CMS local port and `CMS_URL` (or equivalent) env are documented in `apps/cms/CONTEXT.md` / Club env examples when the app is scaffolded.
- Performance: an extra HTTPS hop on cache miss is acceptable for a small, cached post list; co-location is not required for v1.
