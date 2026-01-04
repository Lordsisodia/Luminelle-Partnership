# Summary

## Key takeaways
- Returns-specific OSS repo discovery is saturated/noisy; mining mature platforms is higher ROI.
- Saleor (BSD-3-Clause) provides the cleanest conceptual split we should adopt:
  - **refund owed/authorized** vs **refund processed/executed** (async + idempotent)
  - “store credit” implemented as a payment rail (gift cards as gateway)
- Solidus provides the clearest permissive reference for **store credit as a ledger**:
  - `store_credit` + immutable `store_credit_event`
  - reimbursements choose refund rails (original payment vs store credit)
  - return authorization state machine + eligibility validators = policy gates
- Spree is useful for structural comparison but is **reference-only** due to AGPL-3.0 for v4.10+ contributions.

## Recommendation
- Stop searching for more “returns frameworks”; implement Lumelle Returns v0 using:
  1) `ReturnCase` + `ReturnLine` (explicit state machine for approval + receiving + inspection)
  2) `RefundInstruction` (owed/authorized) + `RefundExecution` (processed, async) aligned with Saleor’s model
  3) `StoreCreditLedger` (events) aligned with Solidus’s model
- Use OPA/policy engine as the gate for:
  - eligibility (time window, condition, RMA required)
  - approval thresholds (refund amount, actor role)
- Use the updated lane + source map as the “where to mine” index, then move into a concrete 1–2 day implementation POC.

## Links
- Run folder: `docs/.blackbox/.plans/2025-12-31_2132_returns-model-mining-saleor-solidus-spree/`
- Extracted pointers: `docs/.blackbox/.plans/2025-12-31_2132_returns-model-mining-saleor-solidus-spree/artifacts/extracted.md`
- Structured extraction: `docs/.blackbox/.plans/2025-12-31_2132_returns-model-mining-saleor-solidus-spree/artifacts/extracted.json`
- Evergreen Saleor deep dive: `docs/.blackbox/deepresearch/2025-12-31_saleor-returns-refunds-store-credit-domain-model.md`
- Evergreen contrast: `docs/.blackbox/deepresearch/2025-12-31_returns-domain-model-contrast-saleor-spree-solidus.md`
- Published pointers:
  - `docs/.blackbox/oss-catalog/lanes/returns-store-credit.md`
  - `docs/.blackbox/oss-catalog/component-source-map.md`
