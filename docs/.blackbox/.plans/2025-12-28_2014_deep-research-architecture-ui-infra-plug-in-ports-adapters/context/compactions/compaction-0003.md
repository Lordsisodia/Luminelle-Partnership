---
compaction: 0003
created_at: "2025-12-29 01:57"
range: "0021-0030"
max_bytes: 1048576
per_step_budget_bytes: 98304
---

# Compaction 0003 (0021–0030)

## ✅ Summary (fill this after compaction)

- <3–7 bullets capturing the durable takeaways>

## 🧩 Patterns / heuristics (fill this after compaction)

- Prompt improvements:
- Checklist improvements:
- Better stop conditions:

## Steps compacted (trimmed)

### 0021_checkpoint-stop-2-implemented-entrypoints-env-policy.md

---
step: 0021
created_at: "2025-12-28 21:36"
title: "Checkpoint: Stop 2 implemented (entrypoints + env policy)"
---

# Step 0021: Checkpoint: Stop 2 implemented (entrypoints + env policy)

## ✅ What I did (facts)

- Implemented Stop 2 runtime entrypoints:
  - `@platform/commerce` now exports `createCommerce()` and `commerce` (adapter selection + env policy).
  - `@platform/content` now exports `createContent()` and `content`.
- Centralized environment policy:
  - Dev: return mock adapters when not configured (keeps local UX usable).
  - Prod: return “disabled” adapters that surface `PortError('NOT_CONFIGURED')` or `UNAVAILABLE` on calls (no silent fallback).
- Ran `npm run typecheck` successfully.

## 🧠 What I learned (new information)

- For “no consumer migrations yet” safety, the entrypoints must not throw at import time; they should return ports that throw `PortError` when invoked (or return `CheckoutStart.mode: 'none'`).

## 🧭 What changes because of this

- The project now has a single place to pick adapters and enforce dev/prod behavior, which is the key requirement before migrating any consumers away from `shopifyEnabled` checks.

## ➡️ Next step

- Implement Stop 3: Shopify adapters that implement the new ports using internal API calls (functions) by default, returning first-party handoff URLs for checkout when available.

## 🔗 Links / references

- `src/domains/platform/commerce/runtime.ts`
- `src/domains/platform/content/runtime.ts`
- `src/domains/platform/ports/errors.ts`

---

### 0022_checkpoint-stop-3-wired-content-config.md

---
step: 0022
created_at: "2025-12-28 21:48"
title: "Checkpoint: Stop 3 wired content + config"
---

# Step 0022: Checkpoint: Stop 3 wired content + config

## ✅ What I did (facts)

- Wired the Content runtime entrypoint to the Shopify “internal API” adapter (Stop 3).
- Added a dev opt-in flag (`USE_REAL_CONTENT=true`) so local dev defaults to the mock adapter.
- Updated Shopify “configured” checks in both Commerce + Content runtimes to match internal-API reality:
  - Require `SHOPIFY_STORE_DOMAIN` only (public Storefront token is no longer required for adapter selection).
- Ran validations:
  - `npm run typecheck`
  - `python3 docs/08-meta/maintenance/validate_docs.py`
  - `docs/.blackbox/scripts/check-blackbox.sh`

## 🧠 What I learned (new information)

- Client-side “configured” checks can’t reliably prove server-side Shopify credentials exist (Pages Functions use `SHOPIFY_STOREFRONT_PRIVATE_TOKEN`), so the safest guard is “domain present” + runtime PortError on request failures.

## 🧭 What changes because of this

- The UI now has a stable, vendor-agnostic Content entrypoint (`@platform/content`) that can be backed by Shopify without any UI changes.
- Dev behavior stays predictable (mock-by-default), while prod behavior is explicit (calls will fail with standardized `PortError` when misconfigured/unavailable).

## ➡️ Next step

- Complete Stop 3 wiring review + tighten adapter boundaries:
  1) Consider extracting a shared internal-API `requestJson` into `@platform/http` (or similar) to avoid `content` depending on `commerce` adapter internals.
  2) Start Stop 4 consumer migrations: migrate `src/lib/sections.ts` to `@platform/content` and delete the direct Storefront query usage from the UI layer.

## 🔗 Links / references

- `src/domains/platform/content/runtime.ts`
- `src/domains/platform/commerce/runtime.ts`
- `src/domains/platform/content/adapters/shopify/internal-api/index.ts`
- `src/domains/platform/content/adapters/shopify/internal-api/sections.ts`

---

### 0023_stop-4-migrate-lib-sections-to-content-port.md

---
step: 0023
created_at: "2025-12-28 21:53"
title: "Stop 4: migrate lib/sections to Content port"
---

# Step 0023: Stop 4: migrate lib/sections to Content port

## ✅ What I did (facts)

- Replaced the Shopify Storefront GraphQL query in `src/lib/sections.ts` with a call to the vendor-agnostic Content port:
  - `fetchSections()` now calls `content.sections.getLandingSections()`.
- Updated the only known caller to stop labeling it “legacy”:
  - `src/domains/client/shop/products/data/product-loaders.ts`
- Ran validations:
  - `npm run typecheck`
  - `python3 docs/08-meta/maintenance/validate_docs.py`

## 🧠 What I learned (new information)

- The existing `Sections` shape in `src/lib/sections.ts` already matched the platform `SectionsDTO`, so this migration was mostly a dependency boundary change (minimal churn).

## 🧭 What changes because of this

- The UI layer no longer imports or depends on the Shopify Storefront query for landing sections; Shopify is now a swappable adapter behind `@platform/content`.

## ➡️ Next step

- Continue Stop 4 by migrating `src/lib/product.ts` to use `@platform/commerce` (catalog port) and remove `@platform/commerce/shopify` imports from UI-facing libs.

## 🔗 Links / references

- `src/lib/sections.ts`
- `src/domains/client/shop/products/data/product-loaders.ts`
- `src/domains/platform/content/runtime.ts`

---

### 0024_stop-4-migrate-lib-product-to-commerce-port.md

---
step: 0024
created_at: "2025-12-28 21:56"
title: "Stop 4: migrate lib/product to Commerce port"
---

# Step 0024: Stop 4: migrate lib/product to Commerce port

## ✅ What I did (facts)

- Replaced direct Shopify Storefront GraphQL query usage in `src/lib/product.ts` with the vendor-agnostic Commerce catalog port:
  - `fetchProductByHandle()` now calls `commerce.catalog.getProductByHandle(handle)` and maps the DTO into the legacy `Product` shape expected by UI code.
- Preserved legacy dev behavior: unless `USE_REAL_COMMERCE=true`, `fetchProductByHandle()` returns the “stub product” placeholder so hard-coded product defaults don’t get overwritten by mock data.
- Updated the known caller to drop “legacy” naming:
  - `src/domains/client/shop/products/data/product-loaders.ts`
- Ran validations:
  - `npm run typecheck`

## 🧠 What I learned (new information)

- The existing UI `Product` type is a simple subset of `ProductDTO` and can be supported by a straightforward mapping (product key + default variant key + unit price + images).

## 🧭 What changes because of this

- UI-facing product data loading no longer imports Shopify-specific modules; Shopify is now strictly an adapter behind `@platform/commerce`.

## ➡️ Next step

- Continue Stop 4/5 by eliminating remaining Shopify leaks in UI/domain code:
  1) Migrate `CartContext.tsx` to use the cart + checkout ports (larger change; likely Stop 6).
  2) Rename vendor-named UI routes/pages (e.g. `ShopifyCheckoutHandoffPage`) after the handoff capability model.

## 🔗 Links / references

- `src/lib/product.ts`
- `src/domains/client/shop/products/data/product-loaders.ts`
- `src/domains/platform/commerce/runtime.ts`

---

### 0025_stop-6-migrate-cartcontext-to-cart-checkout-ports.md

---
step: 0025
created_at: "2025-12-28 22:03"
title: "Stop 6: migrate CartContext to Cart/Checkout ports"
---

# Step 0025: Stop 6: migrate CartContext to Cart/Checkout ports

## ✅ What I did (facts)

- Replaced Shopify-specific cart sync logic in the cart provider with the vendor-agnostic ports:
  - `src/domains/client/shop/cart/providers/CartContext.tsx` now calls `commerce.cart.*` for cart mutations and `commerce.checkout.beginCheckout()` to compute `checkoutUrl`.
- Removed persistence of legacy Shopify cart IDs (`lumelle_shopify_cart_id`); the provider now clears that key on mount.
- Kept UX stable:
  - Local `items` + `discountCode` are still persisted (`lumelle_cart`, `lumelle_cart_discount_code`) for fast UI boot.
  - Incompatible legacy variant IDs (`gid://shopify/...`) are filtered out to avoid passing undecodable IDs into the port layer.
- Ran validations:
  - `npm run typecheck`
  - `python3 docs/08-meta/maintenance/validate_docs.py`

## 🧠 What I learned (new information)

- The internal-API cart adapter already supports the higher-level behaviors the UI relied on (discount codes, buyer identity, attributes) via optional port methods (`applyDiscount`, `setBuyerIdentity`, `setAttributes`), which makes the provider migration mostly mechanical.

## 🧭 What changes because of this

- Shopify no longer leaks into the UI cart provider; Shopify is now just an adapter behind `@platform/commerce`.
- Checkout handoff is now modeled as a capability (`CheckoutPort.beginCheckout()`), enabling future providers (Stripe, etc.) without changing UI call sites.

## ➡️ Next step

- Rename remaining vendor-named UI concepts to capability language (e.g. “Shopify checkout handoff” pages/routes) and/or update copy to remove Shopify-specific wording.

## 🔗 Links / references

- `src/domains/client/shop/cart/providers/CartContext.tsx`
- `src/domains/platform/commerce/runtime.ts`
- `src/domains/platform/commerce/adapters/shopify/internal-api/cart.ts`
- `src/domains/platform/commerce/adapters/shopify/internal-api/checkout.ts`

---

### 0026_stop-7-de-shopify-checkout-handoff-naming.md

---
step: 0026
created_at: "2025-12-28 22:05"
title: "Stop 7: de-Shopify checkout handoff naming"
---

# Step 0026: Stop 7: de-Shopify checkout handoff naming

## ✅ What I did (facts)

- Renamed the vendor-named cart/checkout handoff UI page to capability language:
  - `src/domains/client/shop/cart/ui/pages/ShopifyCheckoutHandoffPage.tsx` → `src/domains/client/shop/cart/ui/pages/CheckoutHandoffPage.tsx`
  - Updated the exported component name to `CheckoutHandoffPage`.
  - Updated route wiring in `src/App.tsx` for `/cart/c/*`.
- Updated cart page copy to remove “Shopify” branding (UI now treats checkout as a provider capability):
  - `src/domains/client/shop/cart/ui/pages/CartPage.tsx`
- Ran validation:
  - `npm run typecheck`

## 🧠 What I learned (new information)

- The `/cart/c/*` route is already modeled in `CheckoutCapabilities.handoff.routes`, so it’s safe to treat the page name as provider-agnostic while keeping Shopify-specific troubleshooting details inside the body text.

## 🧭 What changes because of this

- Remaining vendor naming is reduced; UI concepts align with the ports/capabilities model (making future Stripe/other providers less invasive).

## ➡️ Next step

- Continue Stop 7 by removing/renaming remaining provider-specific language in routes/pages (e.g., any “Shopify checkout” labels in `/checkout` flow) and ensure analytics/copy stays correct.

## 🔗 Links / references

- `src/domains/client/shop/cart/ui/pages/CheckoutHandoffPage.tsx`
- `src/App.tsx`
- `src/domains/client/shop/cart/ui/pages/CartPage.tsx`

---

### 0027_stop-7-make-checkout-ui-capability-driven.md

---
step: 0027
created_at: "2025-12-28 22:07"
title: "Stop 7: make checkout UI capability-driven"
---

# Step 0027: Stop 7: make checkout UI capability-driven

## ✅ What I did (facts)

- Exposed checkout capability + latest checkout-start state via `CartContext`:
  - Added `checkoutCapabilities` (from `commerce.checkout.getCapabilities()`)
  - Added `checkoutStart` (latest `commerce.checkout.beginCheckout()` result)
- Updated checkout UI to use capability language and provider labels:
  - `src/domains/client/shop/cart/ui/pages/CartPage.tsx` now uses `checkoutCapabilities.providerLabel` when available and shows a generic “Checkout unavailable” state when `checkoutStart.mode === 'none'`.
  - `src/domains/client/shop/checkout/ui/pages/CheckoutPage.tsx` now uses `providerLabel` (if present) and displays the port-provided unavailable reason (if present).
- Ran validations:
  - `npm run typecheck`
  - `python3 docs/08-meta/maintenance/validate_docs.py`

## 🧠 What I learned (new information)

- Keeping `checkoutUrl` as a simple string in the context while also exposing `checkoutStart` lets us migrate UI incrementally without breaking existing redirect-only flows.

## 🧭 What changes because of this

- Checkout UI is now provider-agnostic: it renders “what the checkout provider can do” rather than hard-coding Shopify-specific labels/states.

## ➡️ Next step

- Tighten checkout reliability:
  1) Ensure cart mutations update `checkoutStart` consistently (e.g., after discounts/attributes changes).
  2) Consider moving all checkout copy to a single helper based on `CheckoutCapabilities` + `CheckoutStart` (one source of truth).

## 🔗 Links / references

- `src/domains/client/shop/cart/providers/CartContext.tsx`
- `src/domains/client/shop/cart/ui/pages/CartPage.tsx`
- `src/domains/client/shop/checkout/ui/pages/CheckoutPage.tsx`

---

### 0028_stop-7-remove-shopify-branding-from-checkout-ui-copy.md

---
step: 0028
created_at: "2025-12-28 22:10"
title: "Stop 7: remove Shopify branding from checkout UI copy"
---

# Step 0028: Stop 7: remove Shopify branding from checkout UI copy

## ✅ What I did (facts)

- Removed remaining user-facing “Shopify” strings from checkout/cart UI surfaces (while keeping Shopify-specific troubleshooting only where needed):
  - Updated checkout CTA/status copy in the cart drawer: `src/ui/providers/DrawerProvider.tsx`
  - Updated the checkout handoff page user-facing text + CTA label to refer to the “checkout provider”: `src/domains/client/shop/cart/ui/pages/CheckoutHandoffPage.tsx`
  - Updated order tracking helper text to avoid vendor naming: `src/domains/client/shop/checkout/ui/pages/OrderTrackingPage.tsx`
  - Adjusted a comment in cart page to be provider-agnostic: `src/domains/client/shop/cart/ui/pages/CartPage.tsx`
- Ran validations:
  - `npm run typecheck`
  - `python3 docs/08-meta/maintenance/validate_docs.py`

## 🧠 What I learned (new information)

- Most remaining “Shopify” references are now either internal comments or explicitly Shopify-specific troubleshooting (appropriate as long as Shopify remains the current provider).

## 🧭 What changes because of this

- Checkout UX reads as provider-agnostic, which reduces future migration surface area (e.g., Stripe) without changing functionality.

## ➡️ Next step

- Decide how to handle the Shopify-specific developer troubleshooting block:
  1) Keep it in `CheckoutHandoffPage` (helpful for debugging)
  2) Or move it into a developer doc and show only a short user-facing explanation in the UI.

## 🔗 Links / references

- `src/ui/providers/DrawerProvider.tsx`
- `src/domains/client/shop/cart/ui/pages/CheckoutHandoffPage.tsx`
- `src/domains/client/shop/checkout/ui/pages/OrderTrackingPage.tsx`

---

### 0029_stop-7-gate-provider-troubleshooting-behind-debug.md

---
step: 0029
created_at: "2025-12-29 01:48"
title: "Stop 7: gate provider troubleshooting behind debug"
---

# Step 0029: Stop 7: gate provider troubleshooting behind debug

## ✅ What I did (facts)

- Kept provider-specific troubleshooting (Shopify domain/proxy details) available for debugging, but removed it from normal end-user UI:
  - `src/domains/client/shop/cart/ui/pages/CheckoutHandoffPage.tsx` now only renders the “Developer details” `<details>` block in dev, or when `?debug=1` is present.
- Updated the route comment to provider-agnostic language:
  - `src/App.tsx`
- Ran validations:
  - `npm run typecheck`
  - `python3 docs/08-meta/maintenance/validate_docs.py`

## 🧠 What I learned (new information)

- Gating provider-specific troubleshooting is a good compromise during provider transitions: it preserves high-signal debugging context without permanently “branding” the checkout UX.

## 🧭 What changes because of this

- Checkout handoff UX reads as provider-agnostic in production, but developers can still self-serve the Shopify domain/proxy fix when needed.

## ➡️ Next step

- Optional: move the Shopify troubleshooting text into a dedicated engineering doc and link to it from the debug panel to keep the UI file slimmer.

## 🔗 Links / references

- `src/domains/client/shop/cart/ui/pages/CheckoutHandoffPage.tsx`
- `src/App.tsx`

---

### 0030_cleanup-remove-unused-legacy-cart-shim-and-recovery.md

---
step: 0030
created_at: "2025-12-29 01:57"
title: "Cleanup: remove unused legacy cart shim and recovery"
---

# Step 0030: Cleanup: remove unused legacy cart shim and recovery

## ✅ What I did (facts)

- Removed the unused client-side “Shopify cart shim” module and stopped re-exporting it:
  - Removed export from `src/domains/client/shop/cart/index.ts`
  - Deleted `src/domains/client/shop/cart/logic/shopifyCart.ts`
- Removed an unused cart “recovery” subsystem that had no imports/references:
  - Deleted `src/domains/client/shop/cart/recovery/env.ts`
  - Deleted `src/domains/client/shop/cart/recovery/queue.ts`
  - Deleted `src/domains/client/shop/cart/recovery/reconcile.ts`
  - Deleted `src/domains/client/shop/cart/recovery/snapshot.ts`
  - Deleted `src/domains/client/shop/cart/recovery/storeV2.ts`
  - Deleted `src/domains/client/shop/cart/recovery/token.ts`
- Ran validations:
  - `npm run typecheck`
  - `python3 docs/08-meta/maintenance/validate_docs.py`

## 🧠 What I learned (new information)

- The legacy shim and recovery code weren’t being imported anywhere, so removing them reduces surface area without affecting runtime behavior.

## 🧭 What changes because of this

- The cart domain is simpler and more robust: there’s now a single source of truth (the ports-based `CartContext`) instead of parallel unused implementations.

## ➡️ Next step

- Optional: remove the now-empty directory `src/domains/client/shop/cart/recovery/` (filesystem-only cleanup), and/or continue scanning for dead exports under `src/domains/client/shop/cart/`.

## 🔗 Links / references

- `src/domains/client/shop/cart/index.ts`
- `src/domains/client/shop/cart/providers/CartContext.tsx`

---

## Cleanup notes

- Step files compacted: 10 (and removed from steps/)
- Compaction file is capped at ~1048576 bytes (configurable via BLACKBOX_CONTEXT_MAX_BYTES).
