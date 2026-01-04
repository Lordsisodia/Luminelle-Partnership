# Rankings (0–100)

Use the rubric in `docs/.blackbox/agents/deep-research/rubric.md` (or your folder equivalent).

## Ranked items
1) **Remove vendor IDs above adapters (Shopify GIDs → internal keys)** — 92/100
   - Thesis: Make provider boundaries real by eliminating raw vendor IDs from UI/config/logic.
   - Evidence:
     - `docs/.blackbox/scripts/check-vendor-leaks.sh`
     - `src/domains/platform/commerce/adapters/shopify/internal-api/keys.ts`
     - `src/ui/providers/DrawerProvider.tsx`
     - `src/domains/client/shop/products/data/product-config.ts`
     - `src/domains/client/shop/cart/logic/volumeDiscounts.ts`
   - Risks:
     - Requires careful renaming (`variantId` → `variantKey`) to avoid regressions.
   - Next step: follow `docs/.blackbox/.plans/2025-12-29_0741_ui-infra-key-mapping-migration-remove-shopify-gids/final-report.md`
   - Breakdown: Impact 24/25, Feasibility 18/20, Evidence 19/20, Novelty 10/15, Time-to-value 9/10, Risk profile 8/10

2) **Capabilities-driven checkout UI (reduce provider operational copy)** — 84/100
   - Thesis: UI should render “how checkout works” from `CheckoutCapabilities`, not provider assumptions.
   - Evidence:
     - `src/domains/platform/commerce/ports/checkout.ts`
     - `src/domains/platform/commerce/runtime.ts`
     - `src/domains/client/shop/cart/ui/pages/CheckoutHandoffPage.tsx`
   - Risks:
     - Some provider-specific troubleshooting may still be needed; decide where it lives (admin/dev-only).
   - Next step: define generic UX states for checkout handoff based on `CheckoutCapabilities.handoff`.
   - Breakdown: Impact 22/25, Feasibility 16/20, Evidence 16/20, Novelty 12/15, Time-to-value 8/10, Risk profile 10/10

3) **Branded key types for `ProductKey` / `VariantKey` / etc.** — 78/100
   - Thesis: Prevent regressions by making it difficult to pass the wrong kind of ID through ports.
   - Evidence:
     - `src/domains/platform/ports/primitives.ts`
     - `src/domains/platform/commerce/ports/*`
   - Risks:
     - Can add type friction; needs a migration strategy and constructors.
   - Next step: propose a minimal branding pattern + codemod plan (no runtime change initially).
   - Breakdown: Impact 20/25, Feasibility 14/20, Evidence 14/20, Novelty 12/15, Time-to-value 8/10, Risk profile 10/10
