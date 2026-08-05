# SV Altbach

SV Altbach is a Bun-powered monorepo for the club website, the SVA Masters tournament site, and a headless CMS.

## Tech stack

- Bun workspaces
- TanStack Start (Club website) + Next.js 16 App Router (Masters + CMS)
- Payload CMS v3 (CMS)
- Vite 8 + Nitro (Club)
- React 19
- TypeScript
- Tailwind CSS 4
- Radix Themes / Base UI components
- Turborepo

## Requirements for local development

- Bun `1.3.x`
- Node.js `24.x` (helpful for tooling parity, but Bun is the package manager/runtime used by the project)

## Project structure

- `apps/web` – Club website (TanStack Start, port 3000)
  - `src/routes` – file-based routes (`__root`, `index`, legal/teams pages)
  - `src/components` – Club page sections and chrome (theme, footer, contact, …)
  - `src/data` – static Club tables/lists
  - `emails/` – React Email templates (preview via `email-preview`; imported for Resend)
- `apps/masters` – standalone SVA Masters Next.js app (port 3001)
  - `/` – tournament home page
  - `/scoreboard` – current rankings
  - `/finals/*` – finals pages and results
- `apps/cms` – headless Payload CMS (Next.js, port 3003)
  - `/admin` – Payload admin (email/password editors)
  - REST/GraphQL API under `/api/*`
  - Own Vercel project + Vercel Postgres + Vercel Blob (see below)
- `packages/ui` – shared Design system (`@sv-altbach/ui`): shadcn primitives, `cn`/utils, base stylesheet
- `packages/typescript-config` – shared TypeScript configuration (`tsconfig.nextjs.json`, `tsconfig.vite.json`)

Club and Masters import UI primitives from `@sv-altbach/ui` and keep their own theme tokens (Club: `src/styles.css`; Masters: `src/app/globals.css`). CMS uses Payload admin chrome and is not a Design system consumer in v1.

## Getting started

Install dependencies from the repository root:

```bash
bun install
```

Copy env examples (optional for most local work; required for Club → Masters links and contact mail):

```bash
cp apps/web/.env.example apps/web/.env
cp apps/masters/.env.example apps/masters/.env
cp apps/cms/.env.example apps/cms/.env
```

Local ports (no clashes under `turbo dev`):

| App | Port | URL |
| --- | --- | --- |
| Club website (`apps/web`) | 3000 | `http://localhost:3000` |
| SVA Masters (`apps/masters`) | 3001 | `http://localhost:3001` |
| Club email preview | 3002 | `http://localhost:3002` |
| CMS (`apps/cms`) | 3003 | `http://localhost:3003` (admin: `/admin`) |

Club → Masters links use `VITE_MASTERS_URL` in `apps/web` (default `http://localhost:3001`).

CMS needs Postgres locally (`POSTGRES_URL` + `PAYLOAD_SECRET` in `apps/cms/.env`). Optional Docker Postgres:

```bash
docker compose -f apps/cms/docker-compose.yml up -d
```

Start the workspace apps (and Club email preview) via Turborepo:

```bash
bun run dev
```

Or run each app directly:

```bash
cd apps/web
bun run dev
```

```bash
cd apps/masters
bun run dev
```

```bash
cd apps/cms
bun run dev
```

## Useful scripts

From the repository root:

```bash
bun run dev         # start all workspace dev tasks via Turborepo
bun run check       # biome + TypeScript checks across the workspace
bun run build       # production build for workspace packages
```

From `apps/web`:

```bash
bun run dev         # start TanStack Start (Vite) on port 3000
bun run build       # Vite + Nitro production build
bun run start       # preview the production build (`vite preview`)
bun run check:types # TypeScript type check
bun run email-preview   # React Email preview UI (port 3002; run alongside `bun run dev` if needed)
```

From `apps/masters`:

```bash
bun run dev         # start the Masters app on port 3001
bun run build       # build the Masters app
bun run start       # serve the production build on port 3001
bun run typegen     # generate Next.js route/cache types
bun run check:types # TypeScript type check
```

From `apps/cms`:

```bash
bun run dev         # start Payload/Next on port 3003
bun run build       # production build
bun run ci          # run Postgres migrations then build (Vercel build command)
bun run start       # serve the production build on port 3003
bun run payload     # Payload CLI (migrate, generate:types, …)
bun run typegen     # generate Next.js route/cache types
bun run check:types # TypeScript type check
```

## CMS hosting (third Vercel project)

Deploy `apps/cms` as its **own** Vercel project/origin (separate from Club and Masters):

| Setting | Value |
| --- | --- |
| Root Directory | `apps/cms` |
| Install Command | `cd ../.. && bun install` (or your monorepo install equivalent) |
| Build Command | `bun run ci` (migrate + `next build`) |
| Framework | Next.js |

Connect **Vercel Postgres** and **Vercel Blob** to that CMS project only. Env secrets (`POSTGRES_URL`, `PAYLOAD_SECRET`, `BLOB_READ_WRITE_TOKEN`) stay on the CMS project — Club remains DB-less. See `apps/cms/.env.example` and ADR-0004.

On first deploy, open `/admin` and create the first editor (email/password).

## Transactional email (React Email + Resend)

Contact mail is sent with [Resend](https://resend.com) using [React Email](https://react.email) templates under `apps/web/emails/`. Templates are rendered to HTML and plain text with `@react-email/render` before calling the API (works reliably with `resend.batch.send`).

## Blog section

The Club homepage includes a Tumblr-powered blog section that fetches and displays the latest 5 posts from `https://svaltbach-blog.tumblr.com/`.

- Blog data is loaded in the home route loader.
- Client-side revisits reuse loader data within ~1 hour (`staleTime`).
- Cold full page loads may refetch Tumblr (no Next-style ISR).

### Environment variables

- `TUMBLR_BLOG_FEED_URL` (optional override for local testing; defaults to the public Tumblr RSS feed)
- `VITE_MASTERS_URL` (absolute Masters origin for Club → Masters links)
- `RESEND_API_KEY` / `RESEND_DOMAIN` / `INTERNAL_CONTACT_EMAIL` (contact form)
