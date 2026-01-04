---
step: 0001
created_at: "2025-12-31 06:55"
title: "Mine Saleor returns/refunds/store-credit artifacts"
---

# Step 0001: Mine Saleor returns/refunds/store-credit artifacts

## ✅ What I did (facts)

- Used GitHub code search + raw file reads (no cloning) to identify Saleor’s core returns/refunds primitives:
  - GraphQL mutations: `orderFulfillmentReturnProducts`, `orderFulfillmentRefundProducts`, `orderRefund`
  - Granted refund workflow: `orderGrantRefundCreate`, `orderGrantRefundUpdate`, plus `transactionRequestRefundForGrantedRefund`
- Read the mutation input/output shapes and the underlying action logic in `saleor/order/actions.py` to understand:
  - how Saleor creates return fulfillments
  - how optional refund amount is computed (or forced) and how shipping is included
  - how “replace” lines create a replacement draft order
- Traced the “store credit” analogue via gift cards:
  - gift card refund path increments gift card balance and records transaction events
- Captured source pointers + a condensed takeaway summary in plan artifacts.
- Appended mining notes to `docs/.blackbox/oss-catalog/curation.json` for `saleor/saleor` (plus tags for filtering).
- Promoted an evergreen deepresearch note for future reuse.

## 🧠 What I learned (new information)

- Saleor’s “return” is primarily a **fulfillment-level state transition** plus events/webhooks, not a standalone RMA object.
- Returns can optionally include:
  - automatic/explicit refunds
  - shipping refund inclusion
  - exchanges via “replace” lines that create a new draft order
- “Granted refund” is a useful pattern for separating:
  - “we owe the customer X” (tracked record with reason + line linkage)
  - “we processed the refund via a payment rail” (transaction request + status tracking)
- Gift cards behave like a “wallet” payment rail; refunding to store credit is implemented by crediting gift card balance.

## 🧭 What changes because of this

- Instead of hunting for small “returns apps”, we can mine Saleor’s primitives to define our own returns lifecycle:
  - explicit return case object + line items
  - refund method selection (original payment vs store credit)
  - exchange path (replacement order) modeled cleanly and auditably
- This gives us concrete, real-world input shapes we can borrow for our internal APIs/UI contracts.

## ➡️ Next step

- Convert these findings into a concise internal “ReturnCase + RefundInstruction” spec and ensure our returns lane docs reference it (then decide whether to also mine Solidus/Spree for store-credit/return state nuance).

## 🔗 Links / references

- Plan artifacts:
  - `docs/.blackbox/.plans/2025-12-31_0655_deep-research-returns-domain-model-mining-saleor/artifacts/sources.md`
  - `docs/.blackbox/.plans/2025-12-31_0655_deep-research-returns-domain-model-mining-saleor/artifacts/summary.md`
- Evergreen note:
  - `docs/.blackbox/deepresearch/2025-12-31_saleor-returns-refunds-store-credit-domain-model.md`
