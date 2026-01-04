---
step: 0002
created_at: "2025-12-31 21:33"
title: "Saleor mining: refunds/returns/gift-card primitives"
---

# Step 0002: Saleor mining: refunds/returns/gift-card primitives

## ✅ What I did (facts)

- Confirmed `saleor/saleor` is permissively licensed (BSD-3-Clause) and actively maintained.
- Verified the exact code locations for Saleor’s return/refund primitives using `gh api` (no cloning).
- Cross-referenced and consolidated the existing evergreen Saleor returns mining note so this plan can reuse it instead of duplicating analysis.

## 🧠 What I learned (new information)

- Saleor’s return/refund system is expressed primarily through fulfillment + order mutations, not a standalone “RMA table”.
- The most reusable design pattern is the separation of:
  1) “refund is owed / granted” (auditable instruction)
  2) “refund is processed” (transaction request + async outcome)
- “Store credit” analogue is implemented as gift cards acting like a payment rail (`GIFT_CARD_PAYMENT_GATEWAY_ID`), and refunds can flow back into gift card balance.

## 🧭 What changes because of this

- We have concrete, stable file pointers to mine later without more discovery loops.
- We can use Saleor as the canonical reference for:
  - return vs refund workflows
  - “refund to store credit” modeled as a payment rail + ledger adjustments
  - separating accounting intent (“grant refund”) from payment execution (“request refund”)

## ➡️ Next step

- Mine Solidus/Spree next for contrast on:
  - store credit ledger models (`store_credit_event`)
  - return authorization state machines
  - reimbursements linking returns → refunds/store-credit
  Then publish the cross-platform “Lumelle mapping” summary back into the returns lane + source map.

## 🔗 Links / references

- Evergreen Saleor mining note: `docs/.blackbox/deepresearch/2025-12-31_saleor-returns-refunds-store-credit-domain-model.md`
- Cross-platform contrast: `docs/.blackbox/deepresearch/2025-12-31_returns-domain-model-contrast-saleor-spree-solidus.md`
- Source map (gift card pointers already recorded): `docs/.blackbox/oss-catalog/component-source-map.md`
- Saleor repo: https://github.com/saleor/saleor
