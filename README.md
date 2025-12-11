# Lumelle App (Domain-first Vite/React)

Modernized, AI-friendly layout with domain isolation and UI/logic/data separation.

## Quick start
```bash
npm install
npm run dev      # start Vite dev server
npm run typecheck
npm run build
```

## Key paths
- `src/domains/` – bounded contexts:
  - `landing`, `blog`, `shop` (products/cart/checkout/shared), `account`, `auth`, `admin`, `shopify`.
  - Each domain uses `ui/{pages,sections,components,layouts}`, plus `logic/`, `data/`, `hooks/`, `providers/` as needed.
- `src/lib/` – shared helpers (`lib/utils/*`, `lib/ui.ts`).
- `api/_lib/` – backend/server helpers (moved out of `src` to avoid client bundling).
- `docs/` – project knowledge base; see `docs/ARCHITECTURE-HOWTO.md` and `docs/domains-README.md`.

## Conventions
- If it renders, it lives in `ui/`.  
- Behavior belongs in `logic/`; data fetching in `data/`; co-locate types with their code.  
- Use domain aliases: `@landing`, `@shop`, `@blog`, `@admin`, `@auth`, `@account`, `@shopify`, `@/lib/*`.
- Shared UI comes from `@siso/ui` (see `src/lib/ui.ts`).

## Environment
Copy `.env.example` to `.env` and fill Shopify/Supabase/Clerk keys as needed. See `docs/ARCHITECTURE-HOWTO.md` for details.
