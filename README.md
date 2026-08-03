# SV Altbach

SV Altbach is a Bun-powered monorepo for the club website and the SVA Masters tournament site.

## Tech stack

- Bun workspaces
- TanStack Start (Club website) + Next.js 16 App Router (Masters)
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
- `packages/ui` – shared Design system (`@sv-altbach/ui`): shadcn primitives, `cn`/utils, base stylesheet
- `packages/typescript-config` – shared TypeScript configuration (`tsconfig.nextjs.json`, `tsconfig.vite.json`)

Both apps import UI primitives from `@sv-altbach/ui` and keep their own theme tokens (Club: `src/styles.css`; Masters: `src/app/globals.css`).

## Getting started

Install dependencies from the repository root:

```bash
bun install
```

Copy env examples (optional for most local work; required for Club → Masters links and contact mail):

```bash
cp apps/web/.env.example apps/web/.env
cp apps/masters/.env.example apps/masters/.env
```

Local ports (no clashes under `turbo dev`):

| App | Port | URL |
| --- | --- | --- |
| Club website (`apps/web`) | 3000 | `http://localhost:3000` |
| SVA Masters (`apps/masters`) | 3001 | `http://localhost:3001` |
| Club email preview | 3002 | `http://localhost:3002` |

Club → Masters links use `VITE_MASTERS_URL` in `apps/web` (default `http://localhost:3001`).

Start both apps (and Club email preview) via Turborepo:

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
bun run start       # serve Nitro output (`.output/server`)
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
