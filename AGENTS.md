## Agent skills

### Issue tracker

Issues live in GitHub Issues for `sv-altbach/sv-altbach` (via `gh`). See `docs/agents/issue-tracker.md`.

### Triage labels

Default vocabulary: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Multi-context: root `CONTEXT-MAP.md` points at per-context `CONTEXT.md` files. See `docs/agents/domain.md`.

## Cursor Cloud specific instructions

Bun `1.3.14` is the package manager/runtime and is pre-installed in the VM snapshot (on `PATH` via `/usr/local/bin/bun`). Dependencies are refreshed automatically on startup via `bun install`. Standard scripts are documented in `README.md` and the `package.json` files; notes below are only for non-obvious gotchas.

- Running the app: prefer `cd apps/web && bun run dev` (Next.js on port 3000). The root `bun run dev` uses `turbo dev --ui tui`, an interactive TUI that misbehaves in non-interactive/agent shells.
- Single app, two products via host rewrites (`apps/web/next.config.ts`): the club site is at `http://localhost:3000` and SVA Masters is at `http://masters.localhost:3000` (also `/scoreboard`). `*.localhost` resolves locally; with curl, target Masters via `-H "Host: masters.localhost"`.
- Type checking (`tsc --noEmit` / `check:types`) depends on Next.js-generated route types. If you see `Cannot find name 'LayoutProps'`, run `bun run typegen` in `apps/web` first (the dev server also generates these automatically on start).
- Contact form needs a real `RESEND_API_KEY` in `apps/web/.env`: `apps/web/src/integrations/email.ts` throws `RESEND_API_KEY is not set` at module load, so submitting the contact form crashes without it. Everything else (club site, Masters tabs/scoreboard, email preview on port 3002) works without any secrets.
- Lint uses Biome: `bunx biome ci .` (matches CI in `.github/workflows/code-quality.yml`). The repo currently has some pre-existing Biome formatting errors unrelated to environment setup.
