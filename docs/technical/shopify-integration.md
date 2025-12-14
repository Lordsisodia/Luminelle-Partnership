# Shopify Integration Guide (Lumelle Frontend + Supabase backend)

This doc captures how we connect the existing Lumelle UI to Shopify so customers can add to cart and check out.

## 1) Credentials to collect
- **Shop domain**: `yourshop.myshopify.com`
- **Storefront API public access token**: from Shopify Admin → Apps → your custom app → Storefront API.
- (Optional) **Storefront private/Admin token**: server-only, for future secure calls.

## 2) Env variables (app/.env)
```
SHOPIFY_STORE_DOMAIN=yourshop.myshopify.com
SHOPIFY_STOREFRONT_PUBLIC_TOKEN=shpua_xxx
SHOPIFY_STOREFRONT_PRIVATE_TOKEN=
SHOPIFY_API_VERSION=2025-10
```
Note: Images for marketing pages are served from `public/**` by default. If you later move static assets to an external host (e.g., Cloudflare R2), enable it with:
- `VITE_USE_ASSET_CDN=1`
- `VITE_ASSET_BASE_URL=https://assets.yourdomain.com`

## 3) Code wiring (already added)
- `src/lib/shopify.ts` – Storefront GraphQL client (reads env, throws if missing).
- `src/lib/shopifyCart.ts` – cartCreate, cartLinesAdd/Update/Remove, cartFetch, with CartFields fragment.
- `src/utils/env.ts` – env helper.
- `src/state/CartContext.tsx` – now auto-uses Shopify when envs present:
  - Persists `cartId` in `localStorage`.
  - Hydrates from Shopify on load (`cartFetch`).
  - add/setQty/remove map to Shopify cart mutations.
  - Exposes `checkoutUrl` for Buy Now.
  - Falls back to legacy local cart if Shopify envs are absent.

**Where to find the Storefront token in the Shopify UI:**
- Partner Dev Dashboard → Apps → your app → **Settings → Storefront API** → Access token → Reveal/Generate.
- Use the store’s myshopify domain (e.g., `lumelle-3.myshopify.com`) when generating the custom install link; the public domain still works for shoppers.

## 4) How “Add to Basket” / “Buy Now” should work
1. On first add: `cartCreate` (with merchandiseId/qty) → store `cartId` + `checkoutUrl`.
2. Subsequent adds: `cartLinesAdd` or `cartLinesUpdate`.
3. Quantity changes: `cartLinesUpdate`.
4. Remove: `cartLinesRemove`.
5. “Buy Now”: ensure line exists then redirect to `checkoutUrl`.
6. Persist cartId in `localStorage`; on app load, call `cartFetch(cartId)`.

## 5) Product data requirements
- Buttons must pass **Shopify variant IDs (GIDs)** as `merchandiseId`.
- Queries to fetch variants (example):
```
product(handle: $handle) {
  id
  title
  variants(first: 20) { edges { node { id title availableForSale price: priceV2 { amount currencyCode } } } }
  images(first: 10) { edges { node { url altText } } }
}
```

## 6) Minimal Storefront mutations/queries
- `cartCreate(input:{lines:[{merchandiseId, quantity}]}) { cart { ...CartFields } }`
- `cartLinesAdd(cartId, lines)`
- `cartLinesUpdate(cartId, lines)`
- `cartLinesRemove(cartId, lineIds)`
- `cart(id)` query to hydrate.
- Optional: `cartBuyerIdentityUpdate` to set email/country/customer token; `cartDiscountCodesUpdate`.

## 7) Customer accounts (optional, later)
- Use `customerAccessTokenCreate` for login.
- Pass token into `cartBuyerIdentityUpdate(customerAccessToken)` for checkout continuity.

## 8) Admin/secure (future)
- Keep Admin/private tokens server-only (not used yet).
- Potential uses: webhooks (orders/create, inventory updates), metaobjects/metafields, reporting.

## 9) Deployment checklist
- Add envs in Vercel/hosting: `SHOPIFY_STORE_DOMAIN`, `SHOPIFY_STOREFRONT_PUBLIC_TOKEN`, `SHOPIFY_API_VERSION`.
- Redeploy; verify Network calls go to `…/api/2025-10/graphql.json` with 200 responses.
- QA: add item, reload (cart persists), click Buy Now → Shopify checkout shows line item.

### Domain gotcha (important for headless)
Shopify’s Storefront API returns `cart.checkoutUrl` on the shop’s **primary domain** (often a custom domain like `yourbrand.com`), and on newer checkouts it can look like:

- `https://your-primary-domain.com/cart/c/<cartId>?key=...`

If your **headless storefront** is deployed on the same domain (and your host rewrites unknown routes to `index.html`), then visiting that URL will load the SPA instead of Shopify, often presenting as a **white screen**.

Fix: In Shopify Admin → **Settings → Domains**, set Shopify’s **primary domain** to a Shopify-served domain (recommended: a dedicated subdomain like `shop.yourbrand.com`) and point that subdomain’s DNS to Shopify. Alternatively, proxy Shopify checkout routes (at minimum `/cart/c/*` and usually `/checkouts/*`) to Shopify at the edge.

### (Optional) Keep checkout on the same domain (Cloudflare Pages Functions)
If you want to keep the headless app on `yourbrand.com` *and* have Shopify checkout URLs load on `yourbrand.com/cart/c/*`, you need edge routing that proxies only the checkout paths to Shopify.

This repo includes a Cloudflare Pages Functions proxy for:
- `/cart/c/*` → `functions/cart/c/[[catchall]].ts`
- `/checkouts/*` → `functions/checkouts/[[catchall]].ts`

To avoid burning Functions quota on normal browsing traffic, it uses `public/_routes.json` to run Functions **only** for those checkout paths.

Enable “same-domain checkout” in the UI by setting:
- `VITE_SHOPIFY_CHECKOUT_PROXY=1`

Optionally set the upstream host for the Pages Function proxy (server-side):
- `SHOPIFY_CHECKOUT_UPSTREAM_DOMAIN=yourshop.myshopify.com` (defaults to `SHOPIFY_STORE_DOMAIN`)

Important:
- This approach still consumes Cloudflare Functions requests for each checkout page/XHR that hits those paths.
- Shopify must not redirect the upstream domain back to `yourbrand.com` (otherwise the proxy can’t complete). In Shopify Admin → **Settings → Domains**, set Shopify’s **primary domain** to the upstream domain (usually the `…myshopify.com` domain) or to a dedicated Shopify subdomain.

## 10) Current status (Dec 6, 2025)
- Shopify wiring in code is complete and gated by envs.
- Image CDN is optional (default is local `public/**`; enable with `VITE_USE_ASSET_CDN=1` + `VITE_ASSET_BASE_URL`).
- Awaiting Storefront token + shop domain to activate live cart/checkout.
