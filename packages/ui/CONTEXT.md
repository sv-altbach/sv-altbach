# Design system

Shared shadcn UI package for the Club website and Masters. Workspace package: `@sv-altbach/ui` (`packages/ui`).

## Glossary

| Term | Definition | Avoid |
| --- | --- | --- |
| Design system | The shared `@sv-altbach/ui` package: shadcn primitives, CLI-managed utils/hooks, and base stylesheet wiring. | “theme package”, “shared styles” when you mean the full primitive surface |
| UI primitive | A shadcn/registry component living under `packages/ui/src/components` (Button, Dialog, Table, …). | App composites such as heroes, nav, scoreboard chrome |
| Base stylesheet | `packages/ui/src/styles/globals.css` — Tailwind / shadcn / structural CSS shared by both apps. Does **not** own Club or Masters brand tokens. | Treating app `:root` tokens as part of the Design system |
| App theme tokens | Per-app CSS variables (`:root` / `.dark` and app-only extras) defined in each app’s `globals.css` after importing the base stylesheet. | Unifying Club and Masters into one token set “for consistency” |

## Relations

- Consumed by **Club website** (`apps/web`) and **Masters** (`apps/masters`) via direct package imports.
- Apps own composition and product UI; this package owns primitives and shared base CSS only.
- Framework-agnostic (React-only). Next-specific wiring (for example Club’s Sonner toaster with `next-themes`) stays in the Club website app.
- Adding components: run `shadcn add` so installs land in `@sv-altbach/ui`; both apps’ `components.json` aliases point `ui` / `utils` here.
- Authority: [`docs/adr/0002-shared-shadcn-design-system.md`](../../docs/adr/0002-shared-shadcn-design-system.md).
