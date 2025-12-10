# Lumelle × Shopify (Headless + Checkout) — Implementation Plan

Date: 2025-12-07
Owner: Lumelle core app (`app/`), serverless API routes (`/api/*`)

## Outcome
- Shoppers browse and add to cart on our site; payment happens at Shopify checkout.
- Shopify remains the source of truth for orders, payments, taxes, shipping.
- Supabase stores our app data (settings, mirrors of customers/orders, analytics).

## Architecture (quick)
- Frontend: Vite/React app in `app/` with customer‑facing UI.
- Server: Vercel serverless routes in `/api/*`.
- Shopify:
  - Storefront GraphQL (cart → `checkoutUrl`).
  - Admin GraphQL (OAuth token, webhooks, backfills).
  - Customer Accounts (hosted login) for shoppers.
- Supabase: Postgres for app data + mirrors.

## Environment (required)
- Storefront: `VITE_SHOPIFY_STOREFRONT_PUBLIC_TOKEN` (client); `SHOPIFY_STOREFRONT_PRIVATE_TOKEN` (server, optional).
- Admin app: `SHOPIFY_API_KEY`, `SHOPIFY_API_SECRET`, `SHOPIFY_APP_URL`, `SCOPES` (include `read_customers`, later `read_orders`).
- DB: `DATABASE_URL` (pooled 6543), `DIRECT_URL` (5432).

## Data Model (Supabase tables)
- `Session` (exists) — Shopify offline admin token per shop.
- `ShopSettings` (exists) — per‑shop config (e.g., public message).
- `ShopCustomers` (exists) — mirrored customers via webhooks.
- `ShopOrders` (new) — mirror basic order fields for analytics.

## Functions/Capabilities (minimal set)

### Identity
- Shopper login: Link to Shopify Customer Accounts hosted pages. (No DB writes.)
- Internal/creator auth (optional): keep Clerk/Supabase if needed.

### Catalog (read‑only)
- `products.list(params)` — Storefront API.
- `products.get(id|handle)` — Storefront API.
- `collections.list/get` — Storefront API.

### Cart & Checkout (Storefront API)
- `cart.getOrCreate()` — create if missing; persist `cartId` in localStorage.
- `cart.addLines(lines)` — add/merge lines.
- `cart.updateLine(lineId, qty)` — update quantity.
- `cart.removeLine(lineId)` — remove line.
- `cart.setBuyerIdentity({ email, countryCode })` — optional.
- `checkout.createRedirect()` — get `checkoutUrl` and redirect.

Notes:
- Easiest path: call Storefront API directly from client with the Public token.
- If we want server‑side only, proxy via `/api/storefront/*` (see below).

### Orders (mirror to Supabase)
- `orders.webhookCreate` → upsert `ShopOrders`.
- `orders.webhookUpdate` → update row.
- `orders.webhookFulfilled` (optional) → update fulfillment info.
- (Optional) `orders.backfill(shop, since)` — Admin GraphQL pagination.

### Customers (already wired)
- `customers.webhookCreate/Update/Delete` → upsert/delete `ShopCustomers`.
- GDPR webhooks → redact/delete rows. (Done.)

### Admin (tiny UI)
- `settings.get/save(shop)` — `ShopSettings` (Done: `/api/shopify/settings`).
- `billing.activateTestPlan(shop)` — appSubscriptionCreate (Dev) (Done: `/api/shopify/billing/create`).

## API Routes (serverless)
Existing:
- Auth/OAuth: `/api/shopify/auth`, `/api/shopify/auth/callback`.
- Settings: `/api/shopify/settings` (GET/POST).
- Webhooks (HMAC verified):
  - Customers: `/api/shopify/webhooks/customers-*.ts` (create/update/delete, GDPR) — Done.
  - App uninstall: `/api/shopify/webhooks/app-uninstalled` — Done.

To add (only if we choose server‑side cart):
- `/api/storefront/cart/create|get|add-lines|update-line|remove-line|set-attributes`.
- `/api/storefront/checkout` → returns `checkoutUrl`.

## Frontend Hooks (client)
- `useProducts()` — product/collection queries.
- `useCart()` — wraps Storefront Cart API (create/add/update/remove/checkoutUrl).

## Scopes (minimum)
- Now: `read_customers` (mirrors); `write_products` (kept for demo; can remove if unused).
- Later (for order mirroring): `read_orders`.

## Milestones
- M0 — Env + tokens — DONE
  - Headless storefront tokens set; OAuth working.
- M1 — Cart → Checkout — DONE
  - `useCart()` implemented; redirect via `checkoutUrl`.
- M2 — Orders Mirror — DONE
  - `ShopOrders` table; orders webhooks wired; UI pages read from mirror.
- M3 — Admin polish — PARTIAL
  - Settings/Billing available (served from core).
- M4 — Hardening — DONE (baseline)
  - Webhook idempotency; backfill jobs; Admin GQL helper.

## Testing Checklist
- Cart: add/update/remove; redirect via `checkoutUrl`.
- Order created: webhook writes `ShopOrders`.
- Uninstall app: sessions + mirrors are removed.
- GDPR topics: data is redacted in Supabase.

## Nice‑to‑Have (later)
- Customer Account UI Extension (order‑status/thank‑you blocks).
- Theme App Extension (storefront blocks), if needed.
- Basic analytics using mirrors (orders/customers) and ShopifyQL/Notebooks.
