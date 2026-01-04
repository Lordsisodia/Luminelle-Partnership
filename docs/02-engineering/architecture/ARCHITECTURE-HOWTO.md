# Architecture How-To

Date: December 10, 2025

## When adding a new feature
1) Pick the domain first (landing, shop/products, shop/cart, shop/checkout, blog, auth, account, admin, shopify).
2) Place UI under `src/domains/<domain>/ui/`:
   - pages/ – route entry components
   - sections/ – reusable page sections
   - components/ – small domain-only UI
   - layouts/ – shell wrappers
3) Put behavior in `logic/` and data fetching in `data/` inside the same domain; keep React out of `logic/`.
4) Types live beside the code that uses them (same folder), not in a global types folder.
5) Shared helpers belong in `src/lib/` (see `lib/utils/*`, `lib/ui.ts`). Avoid creating new shared directories.
6) Cart/Checkout specifics:
   - Cart state/providers → `shop/cart/providers/`
   - Cart mutations → `shop/cart/logic/`
   - Checkout flows → `shop/checkout/ui/` (UI) and `shop/checkout/logic/` (behavior)
7) Shopify Admin (embedded) lives in `shopify/ui/` and never imports storefront code.

## Commands
- `npm run typecheck` – TypeScript check
- `npm run lint` – (if configured) linting
- `npm run dev` – dev server

## Naming tips
- Sections: one folder per feature, PascalCase file inside (e.g., `hero-shop/HeroShop.tsx`).
- Keep imports using domain aliases: `@landing/...`, `@shop/...`, `@blog/...`, etc.

## Safety checklist
- Never import server code into UI; server lives under `api/_lib/`.
- If sharing a helper, ask: is it truly cross-domain? If not, keep it in the domain.
