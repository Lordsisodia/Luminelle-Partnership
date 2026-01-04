# Summary

## Key takeaways
- Saleor models **returns/refunds as fulfillment-level primitives**, not a separate “RMA object”:
  - `FulfillmentStatus.RETURNED`, `REFUNDED`, `REFUNDED_AND_RETURNED`, `REPLACED`.
- The “return products” flow supports **(a) return**, **(b) optional refund**, and **(c) optional replacement** in a single mutation by marking lines with `replace=true`.
- Refund can be handled in multiple ways:
  - **line-level** refund (`orderFulfillmentRefundProducts`)
  - **amount-level** refund (`orderRefund`)
  - **granted refund** as a tracked obligation tied to a transaction item (create/update + later request against a transaction).
- “Store credit” conceptually maps well to Saleor’s **gift card gateway**:
  - refunding a transaction paid by gift card increments gift card balance (`refund_gift_card_transaction`).

## Recommendation
- Treat Saleor as a **reference model** for returns/exchanges primitives and GraphQL input shapes.
- For our platform, define a small set of primitives that match these proven seams:
  - `ReturnCase` (lines, quantities, shipping decision, replace vs refund intent)
  - `RefundInstruction` (method: original payment vs store credit; amount; status)
  - `ReplacementOrder` (optional exchange flow)
  - Implement orchestration via our workflow/policy layer; keep the domain model explicit and auditable.

## Links
- Run folder: `<this plan folder>`
- Evergreen: `docs/.blackbox/deepresearch/2025-12-31_saleor-returns-refunds-store-credit-domain-model.md`
