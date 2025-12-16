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
- `functions/api/**` – **Cloudflare Pages Functions** API implementation (`/api/*` on Cloudflare Pages).
- `api/**` – legacy **Vercel** serverless snapshot (kept for reference; not used on Cloudflare).
- `docs/` – project knowledge base; see `docs/ARCHITECTURE-HOWTO.md` and `docs/domains-README.md`.

## Conventions
- If it renders, it lives in `ui/`.  
- Behavior belongs in `logic/`; data fetching in `data/`; co-locate types with their code.  
- Use domain aliases: `@landing`, `@shop`, `@blog`, `@admin`, `@auth`, `@account`, `@shopify`, `@/lib/*`.
- Shared UI helpers live in `src/lib/ui.ts`.

## Environment
Copy `.env.example` to `.env` and fill Shopify/Supabase/Clerk keys as needed. See `docs/ARCHITECTURE-HOWTO.md` for details.

## Shopify webhooks (orders → Supabase)
- Shopify signs Admin API webhooks with your app **API secret / client secret** (`SHOPIFY_API_SECRET`).
- Some older deployments also use `SHOPIFY_WEBHOOK_SECRET`; keep it set to the **same value** as `SHOPIFY_API_SECRET` (or omit it if unused).
- Webhook callback URLs can’t be on your shop’s own domains; use a separate receiver domain (e.g. your Cloudflare Pages `*.pages.dev` URL).
- Quick sanity check: `node scripts/check-orders-webhook.mjs --url=https://<your-app-url>` should return `200 OK` for `SHOPIFY_API_SECRET`.
