# Summary — Architecture map + improvements

## Key takeaways
- The repo already implements a **ports + adapters + runtime selection** architecture for major infrastructure domains:
  - commerce (Shopify today), payments (Stripe), content (Shopify today).
- The boot and composition flow is coherent:
  - `src/main.tsx` (global providers) → `src/router.tsx` (root provider tree) → `src/App.tsx` (routes → domains).
- The biggest remaining blocker to “interchangeable UI” isn’t missing ports — it’s **leakage above adapters**:
  - raw Shopify IDs in UI/config/logic
  - provider-specific operational copy in UI
  - legacy shims with confusing naming (`variantId` that’s actually a `VariantKey`)

## Recommendation
- Keep the existing platform runtime approach, and improve modularity via a tight sequence:
  1) Remove vendor IDs above adapters (measurable, small blast radius).
  2) Make checkout UI capabilities-driven (reduce provider-specific copy).
  3) Tighten key type safety to prevent regressions.
  4) Rationalize `src/lib/*` shims to avoid semantic mismatches.

## Links
- Run folder: `docs/.blackbox/.plans/2025-12-29_1844_architecture-map-improvements-src`
- Prior architecture run (bigger picture): `docs/.blackbox/.plans/2025-12-28_2014_deep-research-architecture-ui-infra-plug-in-ports-adapters`
- Key-mapping migration (vendor IDs): `docs/.blackbox/.plans/2025-12-29_0741_ui-infra-key-mapping-migration-remove-shopify-gids`

