# SV Altbach

SV Altbach is a Bun-powered Next.js monorepo for the club website. The main app lives in `apps/web` and serves both the root website and the `masters` subdomain pages.

## Tech stack

- Bun workspaces
- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Radix Themes / Base UI components
- Turborepo

## Requirements for local development

- Bun `1.3.x`
- Node.js `24.x` (helpful for tooling parity, but Bun is the package manager/runtime used by the project)

## Project structure

- `apps/web` – main web app
  - `src/app/(root)` – public/root website routes
  - `src/app/sub/masters` – `masters` subdomain pages
  - `src/components` – shared UI primitives
  - `src/utils` – general utilities shared across the app
- `packages/typescript-config` – shared TypeScript configuration

## Getting started

Install dependencies from the repository root:

```bash
bun install
```

Start the development server:

```bash
bun run dev
```

This runs the Turborepo workspace dev command. If you only want to work on the website app directly:

```bash
cd apps/web
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
bun run dev         # start the Next.js app in development
bun run build       # build the Next.js app
bun run start       # start the production server
bun run typegen     # generate Next.js route/cache types
bun run check:types # TypeScript type check
```

## Blog section

The website homepage includes a Tumblr-powered blog section that fetches and displays the latest 5 posts from `https://svaltbach-blog.tumblr.com/`.

- Blog data is cached with Next.js cache components and revalidated weekly.
- The homepage blog data can be refreshed manually through `POST /api/revalidate`.

### Environment variables

- `BLOG_REVALIDATE_API_KEY` (required for manual revalidation)
- `TUMBLR_BLOG_API_URL` (optional override for local testing; defaults to the public Tumblr read API)

### Manual revalidation

Send a `POST` request to `/api/revalidate` with the API key in the `x-api-key` header:

```bash
curl -X POST \
  -H "x-api-key: $BLOG_REVALIDATE_API_KEY" \
  https://your-domain.example/api/revalidate
```

If the key is missing or invalid, the endpoint returns `401 Unauthorized`.
