# CMS

Headless content layer for SV Altbach editorial content. Workspace package: `apps/cms` (Payload CMS v3 on Next.js). Not a public website — admin UI + HTTP API only.

## Glossary

| Term | Definition | Avoid |
| --- | --- | --- |
| CMS | The Payload app in `apps/cms`: editable content store and API for consuming apps. | Calling this “the Club website” or treating it as a page renderer |
| Post | A news/blog entry owned by the CMS (v1 collection). Club maps API responses into its own blog teaser types. | “Tumblr post” once cutover is done — prefer **Post** for CMS-sourced content |
| Payload admin | Payload’s built-in admin UI on the CMS origin for editors (email/password users in v1). | Embedding admin into Club or Masters |

## Relations

- Consumed by the **Club website** over HTTPS (v1 only). Club owns presentation; CMS does not render the public site.
- **Masters** does not consume the CMS in v1.
- Does not share a non-UI runtime package with Club or Masters — coupling is env URLs + HTTP only.
- Persistence: **Vercel Postgres** (`POSTGRES_URL`) + **Vercel Blob** (`BLOB_READ_WRITE_TOKEN` for media). Hosted as its **own Vercel project/origin** (Root Directory `apps/cms`), separate from Club and Masters. See ADR-0004.
- Local default port: `3003` (`http://localhost:3003`). Admin is mounted at `/` (Payload-only Next shell; no separate frontend). Club will read via server env such as `CMS_URL` once cut over.
- Editor auth: Payload built-in **Users** collection (email/password). First admin user is created on first visit to `/`.
- Scaffold collections: **Users** (auth) and **Media** (uploads → Blob when token is set). **Posts** land in a follow-up ticket.
- Content bootstrap: one-shot import from Tumblr JSON API into Posts; then CMS is source of truth for the live Club feed.

## Local development

```bash
# Optional: docker compose -f apps/cms/docker-compose.yml up -d
# Put secrets in apps/cms/.env.local (PAYLOAD_SECRET required)
cd apps/cms && bun run dev
```

Committed `.env` = public/local defaults (empty secret keys as documentation). `.env.local` = secrets (`PAYLOAD_SECRET`; override `POSTGRES_URL` / `BLOB_READ_WRITE_TOKEN` as needed). Blob token optional locally (falls back to disk). Next runs under Node (`next dev` / `next build`, Turbopack) because Bun-as-runtime breaks Payload SSR externals. Payload CLI: `bunx payload`.
