# 005 — Cart recovery endpoints are currently stubs (feature will not work)

## Summary
The “cart recovery” API surface exists but is not fully implemented:

- `api/storefront/cart/share.ts` issues a token and returns a URL, but defaults `restoreBaseUrl` to `https://example.com/cart` when not provided.
- `api/storefront/cart/restore.ts` verifies a token but does **not** actually reconstruct a cart; it returns placeholder JSON.
- `api/internal/recovery-cron.ts` returns `501 not implemented` when enabled.

## Impact
- **High** if cart recovery is enabled (or expected to work): customers will not get working restore flows.
- **Medium** if disabled: dead/stub endpoints increase maintenance burden and can confuse QA.

## Evidence
- `api/internal/recovery-cron.ts` returns `501` when enabled.
- `api/storefront/cart/restore.ts` contains TODOs for loading snapshot and replaying cart lines, then returns a placeholder `checkoutUrl`.
- `api/storefront/cart/share.ts` hardcodes `https://example.com/cart` as a fallback base URL.

## Repro
1. Set env flags so the endpoints are enabled:
   - `CART_RECOVERY_ENABLED=1`
   - `CART_RECOVERY_SECRET=...`
2. Call share endpoint to obtain a token.
3. Call restore endpoint with that token.
4. Observe:
   - restore response does not correspond to a real Shopify cart restoration
   - cron endpoint returns 501 if enabled

## Likely Root Cause
This is an in-progress feature scaffold (there are “Magic Cart Recovery System” planning docs) that hasn’t been completed.

## Fix Direction
- Decide whether to ship or remove:
  - If shipping soon: implement snapshot storage + restoration and remove placeholder defaults.
  - If not shipping: gate behind a feature flag and document it as “not implemented” to avoid surprise.
- Replace `https://example.com/cart` default with a real configured base URL (env-derived).

