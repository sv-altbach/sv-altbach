# CMS

Headless content layer for SV Altbach editorial content. Workspace package planned at `apps/cms` (Payload CMS v3 on Next.js). Not a public website — admin UI + HTTP API only.

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
- Persistence: **Vercel Postgres** + **Vercel Blob** (media). Hosted as its own Vercel project/origin. See ADR-0004.
- Local default port (when scaffolded): `3003`. Club reads via server env such as `CMS_URL` (e.g. `http://localhost:3003`).
- Content bootstrap: one-shot import from Tumblr JSON API into Posts; then CMS is source of truth for the live Club feed.
