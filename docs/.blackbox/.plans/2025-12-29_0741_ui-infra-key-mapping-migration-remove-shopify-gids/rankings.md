# Rankings (0–100)

Use the rubric in `docs/.blackbox/agents/deep-research/rubric.md` (or your folder equivalent).

## Ranked items
1) **Remove disallowed Shopify GIDs above adapters** — 92/100
   - Thesis: Removing `gid://shopify/...` from UI/provider + client config is the biggest unlock for “Shopify now, Stripe later” without UI churn.
   - Evidence:
     - `artifacts/baseline-vendor-leaks.txt`
     - `artifacts/vendor-leaks-current.txt`
     - `src/ui/providers/DrawerProvider.tsx`
     - `src/domains/client/shop/products/data/product-config.ts`
     - `src/domains/client/shop/cart/logic/volumeDiscounts.ts`
   - Risks:
     - Breaking cart add flow if we feed ports raw Shopify IDs (decoder rejects them).
     - Creating “two mapping tables” if we don’t centralize.
   - Next step: adopt the existing opaque `VariantKey` encoding (`variant.<base64url>`) for these hardcoded cases and keep mapping at the adapter boundary.
   - Breakdown: Impact 25/25, Feasibility 18/20, Evidence 19/20, Novelty 8/15, Time-to-value 9/10, Risk profile 13/10

2) **Make vendor leak scan enforceable in CI** — 70/100
   - Thesis: A cheap guardrail prevents regression once we start editing UI/commerce.
   - Evidence:
     - `docs/.blackbox/scripts/check-vendor-leaks.sh`
     - `docs/.blackbox/scripts/validate-all.sh`
   - Risks: False positives if we don’t keep an explicit allowlist for transitional code.
   - Next step: once disallowed leaks are removed, turn on `--fail-vendor-leaks` in the long-run loop (or CI).
   - Breakdown: Impact 15/25, Feasibility 18/20, Evidence 16/20, Novelty 8/15, Time-to-value 8/10, Risk profile 5/10
