# Domains Overview

Domain-first layout under `src/domains/`:
- landing
- blog
- shop (products, cart, checkout, shared)
- account
- auth
- admin
- shopify (embedded admin)

Each domain follows the UI/logic/data split:
- `ui/` (pages, sections, components, layouts)
- `logic/` (behavior/services, no JSX)
- `data/` (fetchers, content, mappers)
- `hooks/`, `providers/`, `state/` as needed
- Types live next to their code.

Aliases: `@landing`, `@shop`, `@blog`, `@admin`, `@auth`, `@account`, `@shopify`, and `@/lib/*` for shared helpers.

## How to add a feature (quick)
1) Pick the domain.
2) UI goes in `ui/{pages,sections,components,layouts}`.
3) Behavior in `logic/`; data fetching in `data/`.
4) Types beside their usage.
5) Shared helpers only in `src/lib/`; avoid new shared folders.
6) No server code in `src/`; backend lives in `api/_lib`.

## Shop slices
- `shop/products` – merchandising & PDP UI/logic/data.
- `shop/cart` – cart UI, providers, logic.
- `shop/checkout` – checkout/confirmation/tracking UI (+ logic folder reserved).
- `shop/shared` – commerce helpers (Shopify client, Supabase).

## Commands
- `npm run typecheck` – TS check
- `npm run dev` – dev server
- `npm run build` – production build (if configured)
