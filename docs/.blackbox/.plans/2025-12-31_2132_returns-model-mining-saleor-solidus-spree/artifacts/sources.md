# Sources

Format:
- URL or file path
  - Supports: what claim/data this source backs
  - Accessed: YYYY-MM-DD
  - Confidence: High | Medium | Low

Example:
- https://example.com/pricing
  - Supports: pricing tiers + limits
  - Accessed: 2025-12-28
  - Confidence: High

---

- `docs/.blackbox/oss-catalog/inventory.md`
  - Supports: returns tag coverage is still weak (low count vs other tags)
  - Accessed: 2025-12-31
  - Confidence: High

- `docs/.blackbox/oss-catalog/lanes/returns-store-credit.md`
  - Supports: existing stop rules for returns repo discovery; where-to-mine pointers
  - Accessed: 2025-12-31
  - Confidence: High

- `docs/.blackbox/deepresearch/2025-12-31_saleor-returns-refunds-store-credit-domain-model.md`
  - Supports: Saleor return/refund flows + “refund owed vs processed” + gift cards as store credit rail
  - Accessed: 2025-12-31
  - Confidence: High

- `docs/.blackbox/deepresearch/2025-12-31_returns-domain-model-contrast-saleor-spree-solidus.md`
  - Supports: cross-platform mapping + recommended Lumelle primitives
  - Accessed: 2025-12-31
  - Confidence: High

- `docs/.blackbox/oss-catalog/component-source-map.md`
  - Supports: concrete file pointers into Saleor/Solidus/Spree for later mining
  - Accessed: 2025-12-31
  - Confidence: High

- https://github.com/saleor/saleor
  - Supports: existence of referenced return/refund/gift card files; license is BSD-3-Clause
  - Accessed: 2025-12-31
  - Confidence: High

- https://github.com/solidusio/solidus
  - Supports: store credit ledger + return authorization models; license text in `LICENSE.md` is BSD-3-Clause style
  - Accessed: 2025-12-31
  - Confidence: High

- https://github.com/spree/spree
  - Supports: reference-only comparison for store credit + returns; dual license includes AGPL-3.0 for v4.10+ contributions
  - Accessed: 2025-12-31
  - Confidence: Medium
