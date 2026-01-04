# Rankings (0–100)

Use the rubric in `docs/.blackbox/agents/deep-research/rubric.md` (or your folder equivalent).

## Ranked items
1) **Remove vendor IDs from UI + client config (internal keys only)** — 90/100
   - Thesis: Eliminating `gid://shopify/...` from UI/config is the biggest unlock for vendor swap-ability.
   - Evidence:
     - `src/ui/providers/DrawerProvider.tsx` (Shopify variant GIDs in UI/provider)
     - `src/domains/client/shop/products/data/product-config.ts` (fallback Shopify variant IDs)
     - `src/domains/client/shop/cart/logic/volumeDiscounts.ts` (variant ID constant)
   - Risks: Requires a clear mapping strategy (where “internal key → vendor ID” resolution lives).
   - Next step: Define/standardize `VariantKey` naming + add a resolver at the platform boundary.
   - Breakdown: Impact <n>/25, Feasibility <n>/20, Evidence <n>/20, Novelty <n>/15, Time-to-value <n>/10, Risk profile <n>/10

2) **Capability-driven checkout UX (no vendor copy in UI)** — 84/100
   - Thesis: UI renders checkout generically using capabilities (redirect vs embedded) instead of vendor copy.
   - Evidence:
     - `src/ui/providers/DrawerProvider.tsx` (copy: “Secure checkout (Shopify)”, “Preparing Shopify checkout…”)
     - `src/domains/client/shop/cart/providers/CartContext.tsx` (capabilities + beginCheckout usage)
     - `functions/_lib/shopifyCheckoutProxy.ts` + `functions/cart/c/[[catchall]].ts` + `functions/checkouts/[[catchall]].ts` (handoff/proxy is infra; UI should not own it)
   - Risks: Capability model too complex; mismatched expectations between providers.
   - Next step: Define `CheckoutCapabilities` shape + example values for Shopify redirect checkout, including handoff routes and the “first-party URL preferred” policy.
   - Breakdown: Impact <n>/25, Feasibility <n>/20, Evidence <n>/20, Novelty <n>/15, Time-to-value <n>/10, Risk profile <n>/10

3) **Audit + migrate shared libs behind ports (remove lingering vendor leaks)** — 80/100
   - Thesis: `src/lib/*` should not run vendor queries or leak vendor DTOs; ports enforce boundary.
   - Evidence:
     - `src/lib/product.ts`
     - `src/lib/sections.ts`
   - Risks: Requires some refactoring later; need to decide where “content” lives.
   - Next step: Plan migrations to `@platform/commerce/catalog` and `@platform/content/sections`.

4) **Keep “checkout handoff” UX vendor-agnostic** — 72/100
   - Thesis: Routes/pages should not be vendor-named so UI remains interchangeable.
   - Evidence:
     - `src/domains/client/shop/cart/ui/pages/CheckoutHandoffPage.tsx`
     - `src/App.tsx` route mapping (`/cart/c/*`)
     - `functions/_lib/shopifyCheckoutProxy.ts` (route behavior already exists server-side; surface it as a capability)
   - Risks: SEO/analytics or external links might depend on the current route naming; need redirects.
   - Next step: Define a generic `CheckoutHandoffPage` that delegates to `CheckoutPort` (design first).

5) **Reduce naming confusion (remove vendor names from client-domain files)** — 64/100
   - Thesis: Vendor names in client-domain files can create accidental coupling and regressions.
   - Evidence:
     - `src/domains/client/shop/cart/logic/shopifyCart.ts` (vendor-named file living in client domain)
   - Risks: Renames are noisy; coordinate with import paths.
   - Next step: Rename to a vendor-agnostic name (e.g. `cartSync.ts`) once boundaries are fully stable.
