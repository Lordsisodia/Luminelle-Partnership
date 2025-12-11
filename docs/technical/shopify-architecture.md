Title: Shopify Integration Architecture (Final)
Date: 2025-12-07

Overview
- We run a headless storefront in `app/` (Vite/React). Shopify powers catalog, cart, checkout, orders, and customers.
- All Shopify server logic lives under `/api/shopify/*` in this repo. The legacy `shopify-app/` folder was removed.

Identity
- Shoppers: Shopify Customer Accounts (hosted at `https://{SHOPIFY_STORE_DOMAIN}/account`).
- Admin/OAuth: our `/api/shopify/auth` → `/api/shopify/auth/callback` stores an offline Admin token (Session table).

Storefront (Cart → Checkout)
- Client uses Storefront GraphQL (public token) via `app/src/lib/shopify*.ts`.
- Optional: server proxies under `/api/storefront/*` (private token) to hide tokens; toggle with `VITE_USE_SERVER_CART=1`.
- Flow: `cartCreate`/`cartLinesAdd`/`cartLinesUpdate` → `checkoutUrl` → redirect to Shopify checkout.

Mirrors in Supabase
- ShopCustomers: kept in sync via customer webhooks (create/update/delete) and GDPR topics.
- ShopOrders: written via `orders/create` and `orders/updated` webhooks; optional backfill APIs.
- Webhooks are HMAC‑verified and idempotent (`ShopWebhookDeliveries`).

Admin/Backfills
- Backfills: `/api/shopify/backfill/{customers|orders}?shop=...` with `Authorization: Bearer INTERNAL_SHARED_SECRET`.
- Webhooks auto‑registered during OAuth callback.

Key Endpoints
- OAuth: `/api/shopify/auth`, `/api/shopify/auth/callback`.
- Webhooks: `/api/shopify/webhooks/*` (customers*, orders*, app-uninstalled, GDPR).
- Orders API (for UI): `/api/orders/list`, `/api/orders/get?id=...`, `/api/orders/by-email`, `/api/orders/by-name`.
- Storefront proxies: `/api/storefront/cart/*`, `/api/storefront/product/by-handle`.

Frontend Pages
- Product (live variant/price): `app/src/pages/product/ProductPage.tsx`.
- Cart/Checkout (Shopify redirect): `app/src/pages/{CartPage,CheckoutPage}.tsx`.
- Orders UI: `app/src/pages/account/{OrdersPage,OrderDetailPage}.tsx`.

Environment (summary)
- Storefront: `SHOPIFY_STORE_DOMAIN`, `SHOPIFY_STOREFRONT_PUBLIC_TOKEN`, `SHOPIFY_API_VERSION`.
- Admin: `SHOPIFY_API_KEY`, `SHOPIFY_API_SECRET`, `SHOPIFY_APP_URL`, `SCOPES` (include `read_customers,read_orders`).
- Database: `DATABASE_URL` (pooled 6543), `DIRECT_URL` (5432).
- Internal: `INTERNAL_SHARED_SECRET` (for backfills).

Notes
- Checkout, taxes, shipping, payments remain fully on Shopify.
- Supabase holds app data + mirrored entities for analytics/UX.
