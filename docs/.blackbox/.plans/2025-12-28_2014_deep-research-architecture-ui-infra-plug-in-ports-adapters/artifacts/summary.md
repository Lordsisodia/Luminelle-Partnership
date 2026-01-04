# Summary (skim)

- Goal: make UI interchangeable by hiding Shopify (today) and Stripe/others (future) behind stable internal **ports** with replaceable **adapters**.
- Current reality: the repo already has commerce **ports + runtime** and a Stripe-ready payments runtime; remaining work is removing vendor IDs/copy from UI/config and cleaning up legacy “shared lib” boundaries.
- North star: UI → domain logic → platform ports (contracts) → vendor adapters (Shopify/Stripe/mock).
- Key leaks today:
  - `src/ui/providers/DrawerProvider.tsx` (Shopify GIDs in UI/provider)
  - `src/domains/client/shop/products/data/product-config.ts` and `src/domains/client/shop/cart/logic/volumeDiscounts.ts` (Shopify IDs in client config/logic)
  - `src/lib/product.ts`, `src/lib/sections.ts` (audit: ensure they don’t run vendor queries / leak vendor DTOs)
- Existing good foundations:
  - `src/domains/platform/commerce/ports/*` + `src/domains/platform/commerce/runtime.ts`
  - `src/domains/platform/payments/runtime.ts` + `src/domains/platform/payments/adapters/stripe/*`
- Safety: use “Stop points” as merge milestones (Stop 1–8) so you can pause/resume without losing state.

## Top 3 decisions needed
1) Internal identifiers: what replaces Shopify GIDs in UI (variantKey / productKey strategy)?
2) Environment policy: dev mock vs prod hard error when not configured (platform entrypoint only).
3) Stop-points plan: which stop point is the target for the next merge?

## Next 5 steps (ranked)
1) Remove vendor IDs from UI + client config (internal keys only) — see `rankings.md`.
2) Replace vendor-specific UI copy with capability-driven UI copy (`CheckoutCapabilities`).
3) Audit + migrate `src/lib/product.ts` behind ports (if still leaking vendor details).
4) Audit + migrate `src/lib/sections.ts` behind ports/content runtime (if still leaking vendor details).
5) Reduce naming confusion in client-domain modules (avoid vendor names in client logic).

## Links
- Run folder: `docs/.blackbox/.plans/2025-12-28_2014_deep-research-architecture-ui-infra-plug-in-ports-adapters`
- Final report: `docs/.blackbox/.plans/2025-12-28_2014_deep-research-architecture-ui-infra-plug-in-ports-adapters/final-report.md`
- Coupling inventory: `docs/.blackbox/.plans/2025-12-28_2014_deep-research-architecture-ui-infra-plug-in-ports-adapters/artifact-map.md`
- Rankings: `docs/.blackbox/.plans/2025-12-28_2014_deep-research-architecture-ui-infra-plug-in-ports-adapters/rankings.md`
- Week-1 board: `docs/.blackbox/.plans/2025-12-28_2014_deep-research-architecture-ui-infra-plug-in-ports-adapters/week-1-execution-board.md`
- Migration checklist: `docs/.blackbox/.plans/2025-12-28_2014_deep-research-architecture-ui-infra-plug-in-ports-adapters/migration-checklist.md`
- Stop points + risks: `docs/.blackbox/.plans/2025-12-28_2014_deep-research-architecture-ui-infra-plug-in-ports-adapters/stop-points-and-risks.md`
