# ADR-0002: Shared shadcn Design system package

## Status

Accepted

## Context

ADR-0001 split the Club website (`apps/web`) and Masters (`apps/masters`) into separate deployable apps and intentionally kept shadcn `components/ui` local during that split. That temporary duplication invited drift and made adding a single primitive a two-app chore. CONTEXT-MAP already called for a post-split shadcn monorepo Design system.

## Decision

- Introduce workspace package `@sv-altbach/ui` under `packages/ui` as the shared Design system.
- Scope is the strict shadcn surface only: UI primitives, CLI-managed utils/hooks, and a shared base stylesheet. App composites (nav, heroes, scoreboard chrome) stay app-owned.
- Seed the package from the Club website’s existing shadcn inventory; migrate Masters in the same change so there is never a dual source of UI truth mid-migration.
- Both apps depend on `@sv-altbach/ui` via `workspace:*` and import directly from package exports (`@sv-altbach/ui/components/...`, `@sv-altbach/ui/lib/utils`). No long-lived app re-export shims; local `components/ui` trees are removed.
- Per-app themes remain intentional: each app owns `:root` / `.dark` tokens and app-specific CSS (for example Masters’ header image). The Design system exports structural base CSS only.
- Each app’s `components.json` points `css` at that app’s globals and routes `ui` / `utils` aliases to `@sv-altbach/ui`. Shared UI runtime dependencies live on the package; Next-only wiring (for example `next-themes` and the Club Sonner toaster) stays in apps so the package remains React-only ahead of the Club TanStack Start migration.
- Preserve existing stack choices: `base-nova`, Tabler icons, RSC-capable components, Tailwind v4.
- Do not introduce a shared non-UI runtime package as part of this decision.

## Consequences

- ADR-0001 remains historical for the app split. This ADR supersedes its temporary local-`components/ui` guidance for shared UI going forward.
- Adding a shadcn primitive is done once in `@sv-altbach/ui` and consumed by both apps.
- Club and Masters may diverge visually via tokens without forking component source.
- CONTEXT-MAP and `packages/ui/CONTEXT.md` describe the live Design system boundary for agents and humans.
