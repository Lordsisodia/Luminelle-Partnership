# Magic Cart Recovery System — Design Draft
Date: 2025-12-11
Source: High ROI Feature #4 ("Magic" Cart)

## Goal
Never lose a shopper's cart. If they close the tab, switch devices, or come back days later, the cart is restored instantly—with a clear CTA to continue checkout—and we capture a recovery signal (email/link) that can be used for follow-up.

## Current State (audit)
- Cart state lives in React contexts at `src/domains/shop/cart/providers/CartContext.tsx` and a duplicate legacy copy under `src/domains/shop/ui/providers/CartContext.tsx`.
- Persistence is manual: `localStorage` keys `lumelle_cart` (line items) and `lumelle_shopify_cart_id` (Shopify cart id). No TTL/versioning/migrations.
- Shopify cart sync is optional: if `VITE_USE_SERVER_CART=1`, the context calls `/api/storefront/cart/*`; otherwise it uses public Storefront GraphQL (`src/lib/shopifyCart.ts`).
- No queued writes for offline; a failed Shopify fetch clears the cart entirely.
- No recovery UX (no restore banner/deep link/exit-intent), no telemetry on saves/restores, no shareable cart URL, and no email capture except setting buyer identity when already on Shopify.

## Experience Requirements
- **Auto-restore:** On visit, rehydrate local cart and reconcile with Shopify; if Shopify cart is missing/expired, recreate it and keep local items.
- **Cross-session + cross-device:** Shareable restore link and buyer email attached to Shopify cart so a user can resume on another device.
- **Offline-friendly:** Local cart mutations work offline; queued mutations sync when online.
- **Safety:** Detect stale lines (sold out/price changes) and present a guided resolution state instead of silently failing.
- **Transparency:** Show a “Restore your cart” banner/toast with timestamp of last save and CTA to checkout.
- **Telemetry:** Events for `cart_saved`, `cart_restored`, `restore_fail`, `cart_share_created`, `cart_share_opened`, `email_captured` routed to analytics (pick PostHog/GA4).

## Architecture
### State & Persistence
- Move cart state into a Zustand store with `persist` middleware + `createJSONStorage(localStorage)`.
- Single source of truth slice: `{ lines, checkoutUrl, shopifyCartId, buyerEmail, attributes, discounts, lastUpdated, mode: 'local'|'shopify', version }`.
- Storage keys: `lumelle_cart_v2` (store blob) + `lumelle_cart_meta_v2` (hash/ts). Keep a migration to read legacy `lumelle_cart` & `lumelle_shopify_cart_id` and delete them after successful migration.
- TTL: default 30 days since `lastUpdated`; expire by clearing local copy but keep a "restore link" if present.

### Hydration & Sync pipeline
1) **Boot:** Rehydrate persisted store. If `shopifyCartId` exists and Shopify is enabled, call `cartFetch` (server proxy when `VITE_USE_SERVER_CART=1`).
2) **Reconcile:** Compare local lines vs Shopify lines by merchandiseId; if conflicts, prefer Shopify quantities but mark differences for UI (e.g., toast “We adjusted quantities for availability”).
3) **Recovery on 404/expired:** If Shopify cart fetch 404s, create a new cart and replay local lines; keep `buyerEmail` and `discounts` by reapplying APIs.
4) **Offline queue:** If Shopify calls fail (network/offline), enqueue mutations `{ op, payload }` in memory + persisted; retry with exponential backoff when `navigator.onLine` flips true.
5) **Autosave:** Persist on every mutation and throttle `lastUpdated` stamp (e.g., 1s).

### Recovery UX
- **Restore surface:** Banner/toast on page load when `hydratedFromPersist == true` that shows `lastUpdated` and buttons: `Go to cart`, `Checkout`, `Dismiss`.
- **Exit-intent/lightweight modal:** On mouseleave/top bounce or after first add-to-cart, offer “Save my cart for later” with email input; on submit call `cartBuyerIdentityUpdate` and store `buyerEmail` locally.
- **Shareable link:** Button “Copy restore link” that hits backend to mint a signed token; copy to clipboard.

### Shareable Restore Link (cross-device)
- New endpoint `POST /api/storefront/cart/share` (server) returns `{ restoreUrl }`.
- Server logic: generate payload `{ cartId, issuedAt, expiresAt, email? }`; sign with HMAC using `INTERNAL_SHARED_SECRET`; encode as URL-safe base64; return `/cart?restore=token`.
- Optional fallback when no Shopify cart: persist a serialized cart in Supabase `cart_shares` (id, payload JSON, expires_at) and return a token referencing that record.
- Client handler: on `restore` param, POST token to `/api/storefront/cart/restore` → validates signature/expiry, fetches Shopify cart, or loads stored payload, then hydrates Zustand store and navigates to cart page.

### Data & Validation
- Persist fields: line items (variant id, title, price snapshot, qty), discounts, attributes, checkoutUrl, buyerEmail, `lastUpdated`, `schemaVersion`.
- Guardrails: price snapshot is informational only; after fetch, show UI diff if price changed; reject negative/zero qty; cap max lines.
- PII: only email is stored locally; tokens do not include PII unless necessary—prefer storing email server-side keyed by token.

### Telemetry
- Minimal event schema: `{ event, cartId, lineCount, subtotal, buyerEmailPresent:boolean, restoreSource: 'local'|'share_link'|'shopify', ts }`.
- Wire into existing analytics client (choose PostHog/GA4; default to PostHog if available, else GA4 via gtag). Add feature flag to disable in dev.

### Feature Flags & Config
- `VITE_CART_RECOVERY_ENABLED` (client) to wrap hydration/banner/exit-intent.
- `VITE_CART_SHARE_ENABLED` (client) to show share link UI.
- `CART_RECOVERY_TOKEN_TTL_DAYS` (server, default 14).
- `VITE_USE_SERVER_CART` already supported; ensure recovery works in both modes.

## Implementation Plan (phased)
1) **Unify store (2d):** Replace both CartContext implementations with a single Zustand store + React provider; add persist + migration for legacy keys; keep API surface (`add`, `setQty`, `remove`, `clear`, `setEmail`, `setAttributes`, `applyDiscount`).
2) **Hydration/resync (1d):** Implement boot reconcile + 404 recovery + offline queue with retry; add guarded local → Shopify replay.
3) **Recovery UI (1d):** Restore banner/toast, exit-intent capture, “copy restore link” CTA, with skeleton states for reconcile adjustments.
4) **Share endpoints (1d):** Build `/api/storefront/cart/share` and `/api/storefront/cart/restore`; HMAC signing; optional Supabase `cart_shares` table for non-Shopify carts.
5) **Telemetry & flags (0.5d):** Event hooks, feature flags, env wiring, docs.
6) **QA & rollout (0.5d):** Test offline/online, token expiry, price/availability changes, and legacy key migration.

## Risks & Open Questions
- Need confirmation on analytics stack (PostHog vs GA4) and email provider (Shopify Flow/Marketing vs Resend/Supabase). 
- Price drift/variant availability: acceptable to auto-adjust quantity to available? Should we block checkout until user confirms? 
- GDPR/consent: is storing email in localStorage allowed without explicit consent? 
- Where to host shared-cart payloads if Shopify cart ID is unavailable (Supabase vs Vercel KV)?
- Do we want SMS for recovery, or email-only is sufficient?

## Success Criteria
- Return visit restores cart in <400ms from local cache; Shopify sync completes in background without cart loss.
- At least 20% of abandoned carts are restorable via banner or link (measured via `cart_restored/cart_saved`).
- No cart loss across deploys due to schema versioning; zero silent failures in logs.
