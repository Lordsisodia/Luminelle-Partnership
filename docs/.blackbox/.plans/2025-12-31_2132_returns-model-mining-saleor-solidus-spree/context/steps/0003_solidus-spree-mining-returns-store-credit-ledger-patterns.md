---
step: 0003
created_at: "2025-12-31 21:33"
title: "Solidus/Spree mining: returns + store-credit ledger patterns"
---

# Step 0003: Solidus/Spree mining: returns + store-credit ledger patterns

## ✅ What I did (facts)

- Verified Solidus’s license manually by reading `LICENSE.md` via GitHub contents API (BSD-3-Clause style text) since GitHub reports `NOASSERTION`.
- Enumerated and verified the exact Solidus file pointers for:
  - store credit ledger (`store_credit_event`, reasons/types)
  - return authorization state machine
  - reimbursement types (original payment vs store credit)
  - admin controllers for store credits + customer returns
- Verified the analogous model/controller locations in Spree (reference-only) and confirmed the dual-license reality (AGPL-3.0 for v4.10+ contributions).

## 🧠 What I learned (new information)

- Solidus/Spree provide the clearest “store credit as a ledger” pattern:
  - a primary balance object (`store_credit`)
  - an immutable event/history table (`store_credit_event`)
  - reason/type metadata to keep issuance/redemption auditable
- Returns are expressed as a set of cooperating objects:
  - `return_authorization` (state machine / approval gate)
  - `customer_return` + `return_item` (actual return lines)
  - `reimbursement` (ties return outcomes to refund method + payment execution)
- Return eligibility validators in Solidus act like policy gates (time window, RMA required, etc.) and map cleanly to our OPA/policy layer conceptually.

## 🧭 What changes because of this

- For “store credit”, Solidus becomes the canonical model reference (permissive license + explicit ledger).
- Spree remains useful only for cross-checking structure and UX ideas, not for integration.
- We can now write a concrete Lumelle internal model recommendation that combines:
  - Saleor’s “refund owed vs refund processed” split
  - Solidus’s store-credit ledger + reimbursement bridge

## ➡️ Next step

- Publish these pointers into:
  - `docs/.blackbox/oss-catalog/lanes/returns-store-credit.md`
  - `docs/.blackbox/oss-catalog/component-source-map.md`
  And update this plan’s `artifacts/summary.md` with the final recommended Lumelle primitives.

## 🔗 Links / references

- Solidus repo: https://github.com/solidusio/solidus
- Spree repo (reference-only): https://github.com/spree/spree
- Existing source map section (store credit + returns pointers): `docs/.blackbox/oss-catalog/component-source-map.md`
- Plan extracted pointers: `docs/.blackbox/.plans/2025-12-31_2132_returns-model-mining-saleor-solidus-spree/artifacts/extracted.md`
