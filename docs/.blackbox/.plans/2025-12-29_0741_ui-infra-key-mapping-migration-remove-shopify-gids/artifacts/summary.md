# Summary

## Key takeaways
- Current disallowed leaks are limited and concrete (5 lines), all in UI/provider or client config/logic.
- The platform already provides the right abstraction:
  - `VariantKey` is an opaque key type and Shopify adapters already encode/decode it (`variant.<base64url>`).
- The fastest safe migration is to replace hardcoded Shopify GIDs with their encoded `VariantKey` equivalents (no UI vendor IDs, no adapter imports from UI).

## Recommendation
- Phase 1 (recommended): use opaque `VariantKey` encoding for “known variants” in UI/config.
- Phase 2 (optional): introduce semantic keys (e.g. `variant.shower-cap.default`) only if/when you need cross-provider stable naming.

## Links
- Run folder: `docs/.blackbox/.plans/2025-12-29_0741_ui-infra-key-mapping-migration-remove-shopify-gids`
- Key strategy: `docs/05-planning/research/ui-infra-key-mapping-strategy.md`
