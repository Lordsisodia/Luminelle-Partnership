# PostHog + Cloudflare Pages (Functions) — Setup & Verification

This doc is the “single source of truth” for how PostHog works in this repo and how to set it up on Cloudflare Pages + Pages Functions.

It assumes:
- Frontend is deployed on **Cloudflare Pages**
- Server endpoints are **Cloudflare Pages Functions** (the `functions/**` folder)
- Shopify checkout happens on Shopify, so we attribute purchase via Shopify **orders/create webhook**

Related docs:
- Architecture: `integration-plan.md`
- Staging flow: `staging-runbook.md`
- Env reference: `env-flags.md`
- Root env template: `/.env.example`

---

## 0) How it works (high level)

### Browser → PostHog (quantitative)
We send a small, intentional event set to PostHog:
- `experiment_exposure` (once per session per experiment)
- `cta_click`
- `add_to_cart`
- `begin_checkout`

Code:
- PostHog wrapper: `src/lib/analytics/posthog.ts`
- Flag evaluation helper (no `$feature_flag_called` spam): `src/lib/analytics/useFeatureFlagVariant.ts`
- First experiment wiring (hero CTA): `src/domains/landing/ui/sections/shop/hero-shop/HeroShop.tsx`

Free-tier guardrails (already in code):
- `autocapture=false`
- `capture_pageview=false`
- session replay disabled

### Shopify webhook → PostHog (purchase)
Checkout + payment happen on Shopify. The reliable “purchase happened” signal is Shopify’s `orders/create` webhook.

Flow:
1) Before redirecting to Shopify checkout, we write attributes onto the Shopify cart:
   - `ph_distinct_id`
   - `lumelle_anon_id`, `lumelle_session_id`
   - `exp_*` (e.g. `exp_hero_cta_copy=control|bold`)
2) Shopify includes those attributes in the created order (as note attributes / additional details).
3) Our Cloudflare webhook handler extracts them and sends a server-side `purchase` event to PostHog.

Code:
- Cloudflare webhook (prod path): `functions/api/shopify/webhooks/orders-create.ts`

---

## 1) Prereq sanity check (Cloudflare Functions must actually run)

Cloudflare Pages can serve SPA fallbacks (HTML) even for `/api/*` if Functions aren’t enabled for those routes.

This repo uses `public/_routes.json` to control which paths invoke Functions.
It must include `/api/*`.

After deploying, verify:
- `GET https://<your-domain>/api/health` returns JSON like `{ "ok": true, ... }`
  - If it returns HTML (`index.html`), Functions are not being invoked.

Fix:
- Ensure `public/_routes.json` includes `/api/*`
- Redeploy

---

## 2) PostHog project setup (per client)

Create one PostHog project per client site (recommended).

In PostHog onboarding, you’ll see “Install” options (React / JS / etc.).
For this repo:
- Choose **React** (or “JavaScript web”) just to get the right context
- **Do not paste** their snippet into `index.html` (we already initialize PostHog in code)
- Copy the **Project API key** (`phc_…`)

### PostHog host (important)
PostHog has:
- a UI host (e.g. `https://us.posthog.com`)
- an ingestion host (what SDKs should send events to)

Use ingestion host in this repo:
- US: `https://us.i.posthog.com`
- EU: `https://eu.i.posthog.com`

---

## 3) Cloudflare env vars (where + what)

Cloudflare Dashboard → Pages → your project → Settings → **Variables and Secrets**

Rules:
- `VITE_*` vars are **frontend build-time** (Vite bakes them into the bundle)
  - Changing them requires a redeploy
- Non-`VITE_` vars are **runtime** (Pages Functions secrets)

### Frontend (Vite build vars)
Set:
- `VITE_ANALYTICS_ENABLED=true`
- `VITE_EXPERIMENTS_ENABLED=true`
- `VITE_POSTHOG_KEY=<phc_…>`
- `VITE_POSTHOG_HOST=https://us.i.posthog.com` (or EU)

### Functions runtime (server secrets)
Set as **Secret**:
- `POSTHOG_API_KEY=<phc_…>` (same project key)
- `POSTHOG_HOST=https://us.i.posthog.com` (or EU)
- `SHOPIFY_WEBHOOK_SECRET=<shopify webhook secret>` (or `SHOPIFY_API_SECRET`)

Notes:
- Keep secrets as “Secret” in Cloudflare (not Plaintext): Shopify secrets, DB URLs, Clerk secrets, etc.
- Never commit real secrets to the repo. Use `/.env.example` for templates.

---

## 4) Create the first feature flag / experiment (hero CTA)

In PostHog → Feature flags (or Experiments):

Create a multivariate flag:
- Key: `hero_cta_copy`
- Variants: `control`, `bold`

Recommended rollout:
1) Staging: `100% control` for a day (verifies data pipeline without UI change risk)
2) Staging: `50/50` once pipeline is verified
3) Production: `24h control-only` baseline, then `50/50`

---

## 5) Shopify webhook setup (purchase attribution)

In Shopify Admin:
- Notifications → Webhooks → Create webhook
- Topic: `orders/create`
- URL:
  - `https://<your-domain>/api/shopify/webhooks/orders-create`
- Format: JSON

This calls:
- `functions/api/shopify/webhooks/orders-create.ts`

---

## 6) Verification checklist (what to look for)

### A) Browser events
PostHog → Live events:

1) Visit the site
2) Click the hero CTA
3) Add to cart
4) Begin checkout

Expected events:
- `experiment_exposure` (should include `experiment_key=hero_cta_copy` + `variant`)
- `cta_click`
- `add_to_cart`
- `begin_checkout`

### B) Purchase event (server-side)
Place a test order.

Expected:
- `purchase` appears in PostHog
- Event properties include:
  - `shop`, `order_id`, `value`, `currency`
  - `exp_*` properties (e.g. `exp_hero_cta_copy`)

---

## 7) Troubleshooting

### `/api/health` returns HTML
Cause: Functions aren’t being invoked for `/api/*`.

Fix:
- Ensure `public/_routes.json` includes `/api/*`
- Redeploy

### Events aren’t showing in PostHog
Check:
- Cloudflare Pages env vars exist and are on the correct environment (Preview vs Production)
- `VITE_POSTHOG_HOST` is an ingestion host (`https://us.i.posthog.com` or `https://eu.i.posthog.com`)
- `VITE_ANALYTICS_ENABLED=true` (events won’t emit if false)

### Purchases aren’t showing
Check:
- Shopify webhook URL points to `/api/shopify/webhooks/orders-create`
- Cloudflare Functions secrets exist:
  - `POSTHOG_API_KEY`, `POSTHOG_HOST`
  - `SHOPIFY_WEBHOOK_SECRET` (or `SHOPIFY_API_SECRET`)

