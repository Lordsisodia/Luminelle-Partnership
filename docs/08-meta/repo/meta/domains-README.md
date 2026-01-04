# Domains Overview (2025-12-20)

Domain-first layout under `src/domains/`:
- `client/` – marketing, shop (`products/`, `cart/`, `checkout/`), `account/`, `rewards/`
- `admin/` – `catalog/`, `pages/`, `media/`, `blog/`, `analytics/` (orders/settings scaffolded)
- `creator/`
- `blog/`
- `platform/` – `auth/`, `commerce/` (Shopify), `storage/` (Supabase), plus `cms/`, `feature-flags/`, `observability/`, `design-tokens/`
- `ui-kit/` – domain-agnostic primitives (small, optional)

Each slice keeps the layered shape:
- `ui/` (pages, sections, components, layouts)
- `logic/` (behavior/services, no JSX)
- `data/` (fetchers, mappers, content)
- `hooks/`, `providers/`, `state/` as needed
- Types colocated.

Aliases:
- `@client`, `@admin`, `@creator`, `@blog`, `@platform`, `@ui-kit`, `@` (root)
- Cross-domain access should go through `@platform/*` or the owning domain’s surface exports. No deep imports across domains.

How to add a feature (quick):
1) Pick the domain and, if applicable, the flow (e.g., `client/shop/products/pdp`).
2) UI → `ui/{pages,sections,components,layouts}`; logic → `logic/`; data → `data/`; state/providers/hooks alongside.
3) Keep vendor clients in platform; domains consume `@platform/*`.
4) Avoid new “shared” folders—use platform or domain-owned code.
5) No server code in `src/`; backend lives in `api/`.

Commands
- `npm run typecheck`
- `npm run lint`
- `npm run dev`
