# Lumelle – Workstream Status (Dec 15, 2025)

## Cloudflare Pages / Workers
- Cloudflare Functions version of all API routes is in `functions/api/**` and replaces the legacy Vercel-style `api/**` for Cloudflare deployments.
- Smoke tests to run once envs are set: `/api/health`, `/api/orders/by-email?email=…`, `/api/admin/sections/get` (Bearer `INTERNAL_SHARED_SECRET`).

### Runtime secrets still missing in Cloudflare
- `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` (required; otherwise Supabase calls fail).
- `INTERNAL_SHARED_SECRET` (required for `/api/admin/*` and `/api/exports/*`).
- Shopify Customer Accounts (optional; only if we keep that flow):
  - `CUSTOMER_CLIENT_ID`
  - `CUSTOMER_CLIENT_SECRET`

Where to get them:
- Supabase URL + service_role: Supabase Dashboard → Settings → API.
- INTERNAL_SHARED_SECRET: generate yourself (e.g., `openssl rand -base64 32`), store as runtime secret.
- Customer Accounts creds: Shopify Admin → Apps & sales channels → Hydrogen/Headless → Storefront settings → Customer Account API → create “Confidential client”; add redirect `https://<domain>/api/customer-auth/callback`.

## Auth / Orders UX (double-login)
- Current Orders page (`src/domains/account/ui/pages/OrdersPage.tsx`) shows both Clerk login and Shopify Customer Accounts login. If Shopify Accounts are disabled, this creates a confusing double-login.
- Decision needed:
  - If we go Clerk-only: hide/remove `/api/customer-auth/*` buttons and rely on Supabase-backed order lookups (`/api/orders/by-email|by-name|get`).
  - If we keep Shopify Accounts: leave the flow and ensure the Customer Accounts secrets are present.
  - No code change made yet pending your choice.

## SISO App Factory dependency
- Request: confirm nothing is consumed from SISO App Factory and remove dependency or copy over needed components.
- Not yet executed in this session; needs a dependency/import scan, then either copy components into the repo or drop the package.

## Supabase migrations (already applied)
- Shopify mirrors + metrics tables and RPCs created.
- Experiments schema fixed and RLS policies added.
- Shopify tables now have RLS enabled; service_role is required server-side.

## Next actions (proposed)
1) Set missing Cloudflare runtime secrets (at least `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `INTERNAL_SHARED_SECRET`).
2) Decide on Customer Accounts vs Clerk-only and adjust Orders UI accordingly.
3) Audit & remove/port SISO App Factory dependency.
4) Run smoke tests on Cloudflare after secrets are in place.
