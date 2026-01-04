# Current inventory (Shopify WebhookInbox)

Captured: `2026-01-02`

Goal of this doc:
- Capture **what we already built** (so we don’t reinvent it)
- Identify **where drift exists** (so we can unify safely)
- Produce a clear starting point for reverse-engineering + upgrades

---

## Canonical ingress (what Shopify is configured to hit)

Evidence:
- `shopify.app.toml` uses:
  - OAuth redirect: `/api/shopify/auth/callback`
  - App proxy: `/api/shopify`
- `server/README.md` explicitly states: Shopify webhooks live at `api/shopify/webhooks/*`
- `docs/02-engineering/technical/shopify-architecture.md` states: “All Shopify server logic lives under `/api/shopify/*`”

Conclusion:
- Treat `api/shopify/webhooks/*` as the **production canonical** webhook surface.
- Treat `functions/api/shopify/webhooks/*` as an **alternate runtime** (Cloudflare Pages Functions) that must either:
  - be kept in parity (adapter), or
  - be intentionally deprecated (decision required).

---

## Active webhook topics (auto-registered during OAuth callback)

From `api/shopify/auth/callback.ts` (and the parallel `functions/api/shopify/auth/callback.ts`), we auto-register:

| Shopify topic | Callback path | Node handler | Functions handler | Primary side effects |
|---|---|---|---|---|
| `CUSTOMERS_CREATE` | `/api/shopify/webhooks/customers-create` | `api/shopify/webhooks/customers-create.ts` | `functions/api/shopify/webhooks/customers-create.ts` | Upsert `ShopCustomers` |
| `CUSTOMERS_UPDATE` | `/api/shopify/webhooks/customers-update` | `api/shopify/webhooks/customers-update.ts` | `functions/api/shopify/webhooks/customers-update.ts` | Upsert `ShopCustomers` |
| `CUSTOMERS_DELETE` | `/api/shopify/webhooks/customers-delete` | `api/shopify/webhooks/customers-delete.ts` | `functions/api/shopify/webhooks/customers-delete.ts` | Delete/mark customer (impl-specific) |
| `APP_UNINSTALLED` | `/api/shopify/webhooks/app-uninstalled` | `api/shopify/webhooks/app-uninstalled.ts` | `functions/api/shopify/webhooks/app-uninstalled.ts` | Cleanup stub (`handleAppUninstalled`) |
| `ORDERS_CREATE` | `/api/shopify/webhooks/orders-create` | `api/shopify/webhooks/orders-create.ts` | `functions/api/shopify/webhooks/orders-create.ts` | Upsert `ShopOrders`, PostHog purchase, optional email |
| `ORDERS_UPDATED` | `/api/shopify/webhooks/orders-updated` | `api/shopify/webhooks/orders-updated.ts` | `functions/api/shopify/webhooks/orders-updated.ts` | Upsert `ShopOrders`, refund email (Node), loyalty reversal |
| `FULFILLMENTS_CREATE` | `/api/shopify/webhooks/fulfillments-create` | `api/shopify/webhooks/fulfillments-create.ts` | `functions/api/shopify/webhooks/fulfillments-create.ts` | Update fulfillment status, optional shipment email, loyalty award |

Notes:
- Node uses Vercel’s `bodyParser: false` pattern + request stream reading in `_verify.ts`.
- Functions uses `Request.text()` + HMAC verification (`functions/_lib/shopifyWebhooks.ts`) or inline logic.

---

## Webhook idempotency (current behavior)

### Storage

Table:
- `public."ShopWebhookDeliveries"` (Supabase/Postgres)

Current schema (from migration `server/migrations/2025-12-14_shopify_tables_and_metrics.sql`):
- `id text primary key`
- `received_at timestamptz default now()`

Usage:
- Both runtimes use this table for:
  - Shopify delivery dedupe keys (per webhook delivery)
  - Internal idempotency keys for side effects (e.g. loyalty award/reversal)

### Idempotency key header drift (important)

Observed:
- Node handlers typically use `req.headers['x-shopify-delivery-id']` as the “delivery id”.
- Functions handlers vary:
  - some use `x-shopify-delivery-id`
  - some fallback to `x-shopify-webhook-id` / `X-Shopify-Webhook-Id`

Risk:
- If `X-Shopify-Delivery-Id` changes between retries (likely), dedupe may not prevent duplicate side effects.

Recommendation:
- Standardize on **`X-Shopify-Webhook-Id`** (and store `shop` alongside it), using the unique key:
  - `(shop, webhook_id)`
- Keep the ability to dedupe internal side effects with composite keys like:
  - `loyalty:award:fulfillment:${shop}:${orderId}`
  - `loyalty:reverse:refund:${shop}:${orderId}`

---

## Webhooks present in repo but not auto-registered

### Node `api/shopify/webhooks/*` includes extra handlers
- `checkouts-create.ts`
- `checkouts-update.ts`
- `products_create.ts`
- GDPR topics: `customers-data-request.ts`, `customers-redact.ts`, `shop-redact.ts`

### Functions `functions/api/shopify/webhooks/*` set is smaller
- No checkout/product handlers present
- GDPR handlers exist

This is a drift signal:
- Either these are legacy/unused, or registration is handled elsewhere.

Action:
- Confirm what topics are registered in the Shopify admin for the app (source of truth).

---

## Early “best-of-both-worlds” opportunities (quick wins)

- ✅ Adopt the Functions pattern where possible:
  - `waitUntil(...)` for non-critical work (e.g., PostHog) to reduce Shopify retries/timeouts
- ✅ Make verification parity explicit:
  - Node verify should trim headers + return structured failure reasons (without logging secrets)
- ✅ Evolve the inbox schema additively:
  - store `shop`, `topic`, `status`, `attempts`, `last_error`, `processed_at`, `payload_hash`
  - keep existing `id` behavior working during migration

