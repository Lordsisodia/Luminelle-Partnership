# Cloudflare Pages + Workers + R2 + Supabase (Deployment Setup)

This doc describes the intended production setup for this repo:

- **Frontend**: Cloudflare Pages (static Vite build)
- **API**: Cloudflare Workers (or Pages Functions) for `/api/*`
- **Images/Assets**: Cloudflare R2 (served via a public hostname or a Worker)
- **Database**: Supabase Postgres (keep current usage)

The goal is to keep **public shopping pages** extremely cheap to serve (mostly static + Shopify) and use Workers only for:

- Shopify **webhooks**
- Shopify **Customer Accounts** auth + “my orders” endpoints
- (Optional) admin analytics endpoints, if you still want them

> Important: Workers is not “full Node.js”. Don’t deploy the current `/api/**` folder to Workers as-is (many files assume `@vercel/node` and `pg` TCP pooling). The right approach is to **port only the endpoints you need**, and have them talk to Supabase via **HTTP** (not `pg`).

---

## 0) Architecture decisions (what runs where)

### Keep `VITE_USE_SERVER_CART=0`
This repo is already set up so the “browse → cart → checkout” flow can work without hitting your own backend at all:

- Cart + checkout can use Shopify Storefront directly from the browser when `VITE_USE_SERVER_CART=0`.
- Checkout redirects to Shopify checkout URL (no backend required).

This is ideal for Cloudflare’s free-tier request limits because normal shoppers don’t consume Worker requests.

### Minimal backend surface
For production, the “must have” server endpoints are typically:

- **Shopify webhooks** (examples in `api/shopify/webhooks/*` today)
- **Customer Accounts** auth:
  - `/api/customer-auth/start`
  - `/api/customer-auth/callback`
  - `/api/customer-auth/logout`
- **Customer Orders**:
  - `/api/customer/orders`
  - `/api/customer/order`
- (Optional) order lookup endpoints:
  - `/api/orders/by-email`
  - `/api/orders/by-name`
  - `/api/orders/get`
- (Optional) internal/admin metrics endpoints:
  - `/api/metrics/*`
  - `/api/exports/*`

---

## 1) Prereqs checklist

- A **Cloudflare account** with your domain added (recommended so you can use Pages, Workers, and R2 on the same zone).
- A **Supabase project** (already used by this repo).
- A **Shopify store** (already used by this repo).
- A **Clerk project** (already used by this repo).

Local tools:
- Node + npm
- Cloudflare Wrangler CLI (recommended)

---

## 2) Cloudflare Pages (frontend)

### 2.1 Create the Pages project
1. Cloudflare Dashboard → **Pages** → “Create a project”.
2. Connect your Git repo and select this project.

### 2.2 Build settings
- **Build command**: `npm run build`
- **Build output directory**: `dist`

### 2.3 SPA route fallback (required)
Because this is a React SPA using `react-router-dom`, deep links (e.g. `/account/orders`) must serve `index.html`.

Create `public/_redirects` with:

```txt
/* /index.html 200
```

Cloudflare Pages will include this in the final build.

### 2.4 Pages environment variables (build-time)
Set these in Cloudflare Pages → Settings → Environment variables.

**Frontend (Vite) variables** (safe to expose to the browser):
- `VITE_USE_SERVER_CART=0`
- `VITE_SUPABASE_URL=...`
- `VITE_SUPABASE_ANON_KEY=...`
- `VITE_CLERK_PUBLISHABLE_KEY=...`
- `VITE_SHOPIFY_STORE_DOMAIN=...`
- `VITE_SHOPIFY_STOREFRONT_PUBLIC_TOKEN=...`
- (Optional) **Asset CDN toggle**:
  - Leave `VITE_USE_ASSET_CDN` unset (recommended initially) to serve images from this repo’s `public/**` folder on Pages.
  - If you later move assets to R2, set:
    - `VITE_USE_ASSET_CDN=1`
    - `VITE_ASSET_BASE_URL=...` (see section 3)

### 2.5 Custom domain
In Pages → Custom domains:
1. Add your production domain (e.g. `lumelle.com`).
2. Follow Cloudflare’s DNS instructions.

---

## 3) Cloudflare R2 (images + static assets)

> Optional: If you want to avoid R2 (card requirement) and keep things simple, you can just keep “marketing images” in this repo under `public/uploads/**` and `public/images/**`. Cloudflare Pages will serve them directly and cheaply.

### 3.1 Decide how assets are served
You have two common patterns:

**Option A (simplest): “Public assets hostname”**
- Serve R2 objects via a public hostname like `assets.yourdomain.com`.
- Best for public images and CSS/JS-like assets.

**Option B (more controlled): “Worker serves assets”**
- Requests go to `/assets/*` on your main domain.
- A Worker fetches from R2 and sets correct cache headers.
- Useful if you want full control over caching, auth, or URL shaping.

### 3.2 Create an R2 bucket
Cloudflare Dashboard → R2 → Create bucket, e.g.:
- `lumelle-assets`

### 3.3 Upload current assets
This repo already has public assets in:
- `public/uploads/**`
- `public/images/**`

You can upload these to R2 and keep their relative paths, e.g.:
- `uploads/luminele/...`
- `images/...`

### 3.4 Point the app at the new asset base URL
This repo can use a CDN base URL to build absolute asset URLs, but it is **opt-in**.

To enable CDN mode in Cloudflare Pages, set:
- `VITE_USE_ASSET_CDN=1`
- `VITE_ASSET_BASE_URL=https://assets.yourdomain.com` (or your chosen URL)

This avoids using Supabase Storage egress for high-traffic images.

---

## 4) Cloudflare Workers (API)

### 4.1 Choose a deployment model

**Option A: Pages Functions**
- Folder: `functions/api/**`
- URLs: `https://yourdomain.com/api/...`

**Option B: Standalone Worker**
- Deploy a Worker and route `/api/*` to it (recommended for clearer separation).

Either works. Pick one and keep it consistent.

### 4.1.1 Quick smoke test endpoint
After deploying, hit:
- `/api/health`

It should return JSON like `{ "ok": true, ... }`.

### 4.2 Worker environment variables (server-only secrets)
These must be stored as **Worker secrets** (not `VITE_` variables):

- `SUPABASE_URL` (or reuse your Supabase URL)
- `SUPABASE_SERVICE_ROLE_KEY` (server-only!)
- `SHOPIFY_STORE_DOMAIN`
- `SHOPIFY_API_SECRET` (used for webhook HMAC + OAuth verification)
- `SHOPIFY_WEBHOOK_SECRET` (optional alias; if set, used instead of `SHOPIFY_API_SECRET` for webhooks)
- `SHOPIFY_API_KEY` (only needed if you use `/api/shopify/auth` OAuth install flow)
- `SHOPIFY_API_VERSION` (optional; default in code is `2025-10`)
- Shopify Customer Accounts:
  - `CUSTOMER_CLIENT_ID`
  - `CUSTOMER_CLIENT_SECRET`
- Analytics (optional):
  - `POSTHOG_API_KEY` (server-side capture key; used by Shopify webhooks → `purchase`)
  - `POSTHOG_HOST` (ingestion host, e.g. `https://us.i.posthog.com` or `https://eu.i.posthog.com`)
- Optional:
  - `EMAIL_SEND` (if you send confirmation emails)
  - `INTERNAL_SHARED_SECRET` (if you keep internal admin endpoints)
  - `SHOPIFY_STOREFRONT_PRIVATE_TOKEN` (only needed if you enable server-side cart or call `/api/storefront/*`)
  - `CLERK_WEBHOOK_SECRET` (only needed if you use `/api/webhooks/clerk`)

### 4.3 Port the required endpoints (high level)

> Update: This repo now includes a Cloudflare Pages Functions implementation under `functions/api/**` which replaces the legacy Vercel-style `api/**` folder for Cloudflare deployments.

#### A) Shopify webhooks
Endpoints like:
- `/api/shopify/webhooks/orders-create`
- `/api/shopify/webhooks/orders-updated`
- `/api/shopify/webhooks/customers-*`
- `/api/shopify/webhooks/fulfillments-create`

Requirements:
- Verify Shopify webhook HMAC using the raw request body.
- Implement **idempotency** using a table like `ShopWebhookDeliveries` in Supabase (recommended), or keep handlers fast so Shopify doesn’t retry.
- Write/update orders/customers into Supabase tables (`ShopOrders`, `ShopCustomers`).

Update: `orders/create` is already implemented for Cloudflare in `functions/api/shopify/webhooks/orders-create.ts` and (optionally) sends a server-side `purchase` event to PostHog when `POSTHOG_API_KEY` is set.

#### B) Shopify Customer Accounts auth
Endpoints:
- `/api/customer-auth/start`
- `/api/customer-auth/callback`
- `/api/customer-auth/logout`

Requirements:
- PKCE generation (verifier/challenge) and temporary cookies.
- Exchange code for tokens, set durable cookies (`cust_at`, `cust_rt`).

Workers considerations:
- Replace Node `crypto` + `Buffer` with Web Crypto (`crypto.subtle`) and base64 helpers.
- Cookie attributes should be correct:
  - `Secure; HttpOnly; SameSite=None; Path=/`

#### C) Customer orders endpoints
Endpoints:
- `/api/customer/orders`
- `/api/customer/order`

Requirements:
- Read `cust_at` / `cust_rt` cookies.
- Call Shopify Customer Account API GraphQL endpoint.
- Refresh access token when needed.

---

## 5) Supabase (DB tables + indexes)

Because Workers won’t be running `pg` migrations automatically, create tables in Supabase once.

This repo includes ready-to-run SQL migrations in `server/migrations/`:
- `server/migrations/2025-12-14_shopify_tables_and_metrics.sql` (Shopify sync tables + analytics RPCs)
- `server/migrations/2025-12-14_customers_table.sql` (optional: Clerk/customer sync table)

Minimum recommended tables:
- `ShopOrders`
- `ShopCustomers`
- `ShopWebhookDeliveries`

Recommended indexes (for speed + cheap queries):
- `ShopOrders`:
  - index on `processed_at` / `created_at`
  - index on `lower(email)`
  - index on `name`
- `ShopCustomers`:
  - index on `lower(email)`

Security notes:
- If Workers write using the **service role**, they bypass RLS.
- If the browser reads data directly from Supabase, enable RLS and use normal auth.

---

## 6) Shopify admin configuration

### 6.1 Webhook destinations
Update webhook callback URLs to point at your Cloudflare API domain:

- `https://yourdomain.com/api/shopify/webhooks/orders-create`
- etc

### 6.2 Customer Accounts OAuth
Ensure Shopify Customer Accounts application settings include:
- Correct redirect URL:
  - `https://yourdomain.com/api/customer-auth/callback`

---

## 7) Deployment order (recommended)

1. Deploy Pages (frontend) first (even with placeholder API URL).
2. Deploy R2 + assets hostname, set `VITE_ASSET_BASE_URL`, redeploy Pages.
3. Deploy Worker API (webhooks + customer-auth + customer orders).
4. Apply Supabase SQL tables/indexes.
5. Update Shopify webhook URLs + Customer Accounts settings.

---

## 8) Smoke test checklist (don’t skip)

### Public shopping
- Home loads (no Clerk required)
- Product page loads
- Add to cart works
- Checkout redirects to Shopify checkout

### Accounts
- `/account/orders` loads
- “Sign in with Shopify Accounts” flow completes
- Orders list loads via `/api/customer/orders`
- Order detail loads via `/api/customer/order`

### Webhooks
- Place test order in Shopify
- Confirm webhook arrives
- Confirm order row appears/updates in Supabase
- Confirm duplicate deliveries do not double-write

---

## 9) Free-tier safety notes

- **Pages static assets** are served from CDN and don’t consume Worker “requests/day”.
- Worker requests are consumed primarily by:
  - webhooks per order
  - account/order endpoints

This is why keeping `VITE_USE_SERVER_CART=0` is important: buyers don’t burn your Worker budget.
