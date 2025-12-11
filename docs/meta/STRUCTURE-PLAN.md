# Lumelle app structure (in-progress DDD reorg)

## Top-level (repo root)
- `docs/` – project briefs, checklists, and architecture notes (existing).
- `public/` – static assets served as-is (favicons, hero images, etc.).
- `scripts/` – one-off utilities (feeds, uploads, imports).
- `src/` – all application code.
- `server/` – webhook/express server (moved from old `app/server`).

## src/ layout (target state)
- `app/` – router/app shell wiring only.
- `domains/` – primary organization (DDD). Current domains: `landing/`, `shop/`, `auth/`, `blog/`, `admin/`.
  - Inside each domain: `sections/`, `components/`, `hooks/`, `logic/` (use-cases/services), `data/` (fetchers/mappers), `types/` (DTOs), plus subfolders per section as needed.
- `components/` – cross-domain reusable UI atoms/molecules.
- `hooks/` – cross-cutting hooks.
- `config/` – runtime config/constants/feature flags.
- `lib/` – pure utilities/helpers.
- `providers/` – global context providers.
- `types/` – shared types/interfaces.
- `assets/` – code-imported static assets (non-public).

## Moves completed (Dec 10)
- Landing sections relocated to `src/domains/landing/sections/<slug>/` with stubs left in `src/sections/*` to avoid breaking imports during transition.
- Shop sections relocated to `src/domains/shop/sections/` with stubs left in `src/sections/shop/*`.

## Next moves (proposed)
1) **Pages → domains**: move route components from `src/pages` into corresponding domain (`landing`, `blog`, `product`, `admin`, `auth`, `shopify`). Leave re-export stubs or update router imports.
2) **Content/data**: shift `src/content/*` into each domain’s `data/` folder (e.g., landing content → `domains/landing/data/content.ts`).
3) **Hooks/lib/state**: migrate domain-specific hooks/state into respective domains; keep cross-cutting in `hooks/` and `state/` (or `providers/`).
4) **Configs**: consolidate `config/constants.ts` and env mappings into `src/config/` with typed schema.
5) **Remove stubs** once imports updated to new paths.
6) **Docs**: add per-domain README documenting boundaries and dependencies.

## Notes
- Stubs ensure current imports keep working while we update paths incrementally.
- When moving files, prefer domain-first placement; only put code in `components/` or `hooks/` if it is genuinely shared across domains.

## Moves completed (Dec 10, pass 2)
- Route pages moved into domain folders with stubs left under `src/pages` (landing, shop, blog, admin, auth, account, shopify).
- Content files moved into domain `data/` folders with stubs under `src/content`.
- State/contexts moved into domain `state/` or `providers/` with stubs left under `src/state`.
- Domain-specific hooks moved into domain `hooks/` with stubs left under `src/hooks`.
- Components/layouts moved: landing UI pieces, Shopify picker, AdminGuard now sit under domain components/layouts with stubs left in `src/components` and `src/layouts`.
- Domain logic/data moved: shop logic (product, shopifyCart, shopify) and supabase client; landing logic (sections, seo) now under domain folders with stubs left in `src/lib`.
- Imports updated to point directly at domain paths; temporary re-export stubs removed.
