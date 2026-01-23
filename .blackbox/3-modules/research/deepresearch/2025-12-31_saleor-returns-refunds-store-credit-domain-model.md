# Saleor returns/refunds + “store credit” (domain model mining)

Created: `2025-12-31`

This is an evergreen, agent-facing note capturing Saleor’s approach to:
- returns + exchanges (replacement)
- refunds (line-level and amount-level)
- “store credit” analogue (gift cards as a wallet/payment rail)

This is **pattern mining**, not vendoring:
- we are recording contracts, primitives, and the seams between concerns
- we are not copying or embedding Saleor code into our repo

Artifacts / execution plan:
- `docs/.blackbox/.plans/2025-12-31_0655_deep-research-returns-domain-model-mining-saleor/`
Cross-platform contrast (reference-only additions):
- `docs/.blackbox/deepresearch/2025-12-31_returns-domain-model-contrast-saleor-spree-solidus.md`

Primary OSS source repo:
- `saleor/saleor`

---

## Why this matters to Lumelle

Our returns lane is “repo-saturated” (few high-signal dedicated returns frameworks exist). Saleor is a reference-quality commerce domain model that includes:
- a concrete, production-shaped return/refund/exchange flow
- explicit handling of shipping refunds and partial line refunds
- a useful separation between “refund is owed” vs “refund has been processed”

---

## Saleor’s core primitives (what to copy as concepts)

### 1) Fulfillment is the “return/refund object”
Saleor expresses return/refund lifecycle via **Fulfillment records** and `FulfillmentStatus`:
- `fulfilled`
- `returned`
- `refunded`
- `refunded_and_returned`
- `replaced`
- `waiting_for_approval`

This is a good reminder: a returns system doesn’t necessarily need a separate “RMA table” if you already have a strong fulfillment primitive. (We can still build a `ReturnCase` if we want a clearer admin UX + auditable state machine.)

### 2) Return products (optionally refund + optionally replace)
GraphQL mutation:
- `orderFulfillmentReturnProducts(order: ID!, input: OrderReturnProductsInput!)`

Key input shape:
- `orderLines[]` (unfulfilled lines to return)
- `fulfillmentLines[]` (fulfilled lines to return)
- `refund: Boolean` (if true, attempt refund action)
- `amountToRefund?: Decimal` (manual override; blocked when order has gift card lines)
- `includeShippingCosts: Boolean` (ignored if `amountToRefund` provided)
- per-line `replace: Boolean` (creates a replacement draft order for exchange flow)

Outputs:
- `returnFulfillment` (the return record)
- `replaceFulfillment` (if replacement flow)
- `replaceOrder` (draft order created for replacement)

Practical pattern:
- “Exchange” is a first-class option at the line level (`replace=true`), not a separate process.

### 3) Refund products (line-level refund without “return” semantics)
GraphQL mutation:
- `orderFulfillmentRefundProducts(order: ID!, input: OrderRefundProductsInput!)`

Input shape parallels return:
- `orderLines[]`, `fulfillmentLines[]`
- `amountToRefund?: Decimal`
- `includeShippingCosts: Boolean`

### 4) Refund order (amount-level)
GraphQL mutation:
- `orderRefund(id: ID!, amount: Decimal!)`

This is a useful “ops escape hatch”: refund a specified amount, without being forced into line-level selection.

---

## Granted refunds (separating “owed” vs “processed”)

Saleor has a “granted refund” object with statuses:
- `none` → not processed
- `pending` → requested/in progress
- `success` → processed
- `failure` → failed

This is powerful because it splits:
1) “We owe the customer X” (auditable record with reason + line linkage)
2) “We processed the refund against a payment rail” (transaction request + events)

GraphQL:
- `orderGrantRefundCreate` / `orderGrantRefundUpdate` → create/update the “owed” record
- `transactionRequestRefundForGrantedRefund` → request processing the refund against a transaction

This matches how we’ll likely need to work:
- ops policy/approval gates create the “owed refund” record
- finance/payment execution processes it asynchronously and emits events

---

## “Store credit” analogue: gift cards as a wallet rail

Saleor treats gift cards as a payment gateway (`GIFT_CARD_PAYMENT_GATEWAY_ID`).

Refunding to gift card (“store credit”) behavior:
- increases gift card balance
- records a transaction event (success/failure)
- can stop actions once the charged amount is fully refunded

This suggests a clean design for us:
- treat store credit as a **first-class payment method**
- implement “refund to store credit” as a ledger credit with its own status and audit trail

---

## What we should adopt as Lumelle primitives (recommended mapping)

Minimal primitives we can build (and keep stable):

1) `ReturnCase`
- `id`, `order_id`, `status` (`draft|submitted|approved|received|rejected|closed`)
- `lines[]`: `(order_line_id, quantity, disposition=return|replace, reason_code?)`
- `refund`: `{method: original|store_credit|split, amount?, include_shipping?}`
- `shipping_refund_policy`: explicit field (not implicit flags)

2) `RefundInstruction`
- `id`, `return_case_id`, `status` (`none|pending|success|failure`)
- `rail`: `payment_gateway` or `store_credit`
- `amount`
- `transaction_ref` / `ledger_ref`

3) `ReplacementOrder` (optional, only if we implement exchanges)
- link to original order + return case
- created once `replace` lines are approved

Orchestration:
- drive via workflow/policy layer, but keep these objects explicit (audit, idempotency, retries).

---

## File pointers (for deeper mining later)

Core return/refund mutations:
- `saleor/graphql/order/mutations/fulfillment_return_products.py`
- `saleor/graphql/order/mutations/fulfillment_refund_products.py`
- `saleor/graphql/order/mutations/order_refund.py`
- `saleor/order/actions.py` (return/refund/replace orchestration)

Granted refund workflow:
- `saleor/graphql/order/mutations/order_grant_refund_create.py`
- `saleor/graphql/order/mutations/order_grant_refund_update.py`
- `saleor/graphql/payment/mutations/transaction/transaction_request_refund_for_granted_refund.py`
- `saleor/giftcard/gateway.py` (`refund_gift_card_transaction`)

Behavior examples:
- `saleor/graphql/order/tests/mutations/test_fulfillment_return_products.py`

---

## Next actions (how this compounds)

1) Convert the mapping above into a “ReturnCase API contract” doc (internal) for:
   - admin returns UI
   - webhook ingestion (Shopify → normalized objects)
   - workflow/policy engine integration
2) Run 1 small POC: implement a ReturnCase state machine + “refund instruction” ledger stub, not UI polish.
3) Only if we need nuance around store credit, mine an additional platform for contrast (Solidus/Spree).
