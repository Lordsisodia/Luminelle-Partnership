---
step: 0004
created_at: "2025-12-31 21:34"
title: "Publish: update returns lane + source map + blocks contracts"
---

# Step 0004: Publish: update returns lane + source map + blocks contracts

## ✅ What I did (facts)

- Published the mined returns/refunds/store-credit file pointers into the evergreen docs:
  - updated the returns lane doc with “where to mine” pointers and links to evergreen deep dives
  - updated the component source map with a dedicated Saleor returns/refunds subsection + Solidus eligibility validators
- Added minimal, API-contract-driven ops/admin block contracts for returns surfaces (list + detail) so UI work can start without waiting on more OSS discovery.
- Consolidated all mining outputs into this plan’s artifacts (`extracted.md` + structured `extracted.json` + summary).

## 🧠 What I learned (new information)

- Once returns primitives are written as stable internal contracts (ReturnCaseTable/ReturnCaseDetail), we can mine OSS for *patterns* without becoming dependent on any one platform.
- The best cross-platform synthesis for Lumelle is:
  - Saleor’s “owed vs processed” split (async execution)
  - Solidus’s store-credit ledger + reimbursements (refund rails)
  - OPA/policy engine as the explicit approval/eligibility gate.

## 🧭 What changes because of this

- Returns work can proceed in engineering without another “search cycle”.
- The lane doc + source map become the canonical lookup table for future returns questions (“where do we find examples of X?”).
- The blocks contracts now include returns ops surfaces, making it easier to prototype quickly in admin tooling.

## ➡️ Next step

- Render + sanity-check the updated catalog outputs, then decide whether to:
  - continue mining deeper into one platform (if we still lack a specific primitive), or
  - stop mining and schedule the Returns v0 POC implementation work (recommended).

## 🔗 Links / references

- Returns lane: `docs/.blackbox/oss-catalog/lanes/returns-store-credit.md`
- Source map: `docs/.blackbox/oss-catalog/component-source-map.md`
- Blocks contracts: `docs/.blackbox/oss-catalog/blocks-kit-contracts.md`
- Plan artifacts: `docs/.blackbox/.plans/2025-12-31_2132_returns-model-mining-saleor-solidus-spree/artifacts/summary.md`
