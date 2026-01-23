# Returns / refunds / store credit — domain model contrast (Saleor vs Spree vs Solidus)

Created: `2025-12-31`

Purpose: consolidate **return + refund + store credit** modeling patterns from high-signal commerce stacks we already cataloged so we can:
- stop “infinite GitHub searching” for returns frameworks (it’s saturated),
- design Lumelle’s in-house **ReturnCase** + **RefundInstruction** + **StoreCreditLedger** primitives with confidence,
- keep everything **reference-only** unless license is safe.

Scope note:
- We are *not* adopting these platforms.
- We are extracting **domain concepts**, **state boundaries**, and **file pointers** for later reading.

Primary sources:
- `saleor/saleor` (BSD-3-Clause, safe in our catalog)
- `solidusio/solidus` (BSD-3-Clause text in `LICENSE.md`, but GitHub reports `NOASSERTION`; treat as safe for mining)
- `spree/spree` (copyleft for v4.10+ contributions; treat as reference-only)

Related:
- Saleor deep dive: `docs/.blackbox/deepresearch/2025-12-31_saleor-returns-refunds-store-credit-domain-model.md`
- Consolidated pointers: `docs/.blackbox/oss-catalog/component-source-map.md`

---

## The primitives each platform “wants you to think in”

### Saleor (Fulfillment-first)
Saleor leans on **Fulfillment** as the “return/refund object” and expresses return/refund outcomes through fulfillment status + mutations:
- Return products (optionally refund and/or replace)
- Refund products (line-level refund)
- Refund order (amount-level “ops escape hatch”)

Key pattern:
- Separates “we owe a refund” vs “we processed a refund” via a **GrantedRefund**-style flow (owed record + async transaction request).
- Treats “store credit” via **gift cards as a payment rail** (i.e., store credit behaves like a payment method).

### Spree / Solidus (RMA + return items + reimbursements)
Spree/Solidus are closer to classic e-commerce admin semantics:
- **ReturnAuthorization**: the “RMA authorization / approval” boundary (requested → authorized → …).
- **CustomerReturn**: the “what came back / receiving” boundary.
- **ReturnItem**: line-level return object (reception/acceptance status, eligibility checks).
- **Reimbursement**: the “refund decision + execution” object, with a performer + reimbursement types.
- **StoreCredit** (+ **StoreCreditEvent**): store credit balance and ledger/events.

Key pattern:
- Return intake and refund execution are modeled as separate concerns with explicit objects.
- Store credit is a first-class balance with an event/ledger trail.

---

## Cross-platform “concept equivalences” (useful mapping)

These are *not* 1:1, but they help shape our internal model:

### “Return case”
- Saleor: a return is often represented as a **return fulfillment**.
- Spree/Solidus: a return is typically represented across:
  - **ReturnAuthorization** (approval intent)
  - **CustomerReturn** (received items)

Lumelle mapping:
- `ReturnCase` (single object) with:
  - approval status (policy/workflow)
  - receiving status (warehouse)
  - linkages to refund instructions and store credit ledger entries

### “Return line”
- Saleor: return/refund lines can be represented via fulfillment lines / order lines in mutation input.
- Spree/Solidus: **ReturnItem** (with eligibility validators + reception/acceptance state machines).

Lumelle mapping:
- `ReturnLine` / `ReturnCaseLine` modeled explicitly (SKU/variant id, quantity, reason, disposition, inspection outcome).

### “Refund owed vs refund processed”
- Saleor: explicit “granted refund” flow is a strong pattern.
- Spree/Solidus: reimbursements + performer capture similar separation (decision + execution hooks).

Lumelle mapping:
- `RefundInstruction` (owed/authorized) and `RefundExecution` (processed, async, idempotent) with audit events for every state change.

### “Store credit”
- Saleor: gift cards act as store credit rail (balance and events).
- Spree/Solidus: StoreCredit + StoreCreditEvent is a clean ledger primitive.

Lumelle mapping:
- `StoreCreditAccount` + `StoreCreditLedgerEntry` (credit/debit/adjustment/expiry) tied to ReturnCase + order + actor.

---

## What we should copy as *design principles* (not code)

1) **Separate intent from execution**
- “Return approved” and “refund executed” must be separate (async failure handling, retries, idempotency, approvals).

2) **Make store credit a payment rail**
- Treat store credit as a first-class method (balance ledger + redemption rules) rather than “a coupon”.

3) **Represent warehouse reality**
- Receiving + inspection outcomes need their own state transitions and audit trail.

4) **Keep an “ops escape hatch”**
- Amount-level refund is a real ops need (Saleor’s orderRefund pattern).

---

## File pointers (for deeper mining later)

### Saleor (safe)
Return/refund mutations + orchestration:
- `saleor/graphql/order/mutations/fulfillment_return_products.py`
- `saleor/graphql/order/mutations/fulfillment_refund_products.py`
- `saleor/graphql/order/mutations/order_refund.py`
- `saleor/order/actions.py`

Granted refund (owed vs processed):
- `saleor/graphql/order/mutations/order_grant_refund_create.py`
- `saleor/graphql/order/mutations/order_grant_refund_update.py`
- `saleor/graphql/payment/mutations/transaction/transaction_request_refund_for_granted_refund.py`

Gift cards as store credit rail:
- `saleor/giftcard/models.py`
- `saleor/giftcard/events.py`
- `saleor/giftcard/gateway.py`

### Spree (reference-only; license verify)
Store credit ledger:
- `core/app/models/spree/store_credit.rb`
- `core/app/models/spree/store_credit_event.rb`
- `core/app/models/spree/store_credit_category.rb`
- `storefront/app/views/spree/checkout/_store_credit.html.erb`

Returns + receiving:
- `core/app/models/spree/return_authorization.rb`
- `core/app/models/spree/return_item.rb`
- `core/app/models/spree/return_item/eligibility_validator/*`
- `core/app/models/spree/customer_return.rb`
- `admin/app/controllers/spree/admin/orders/customer_returns_controller.rb`

Reimbursements:
- `core/app/models/spree/reimbursement.rb`
- `core/app/models/spree/reimbursement_type.rb`
- `core/app/models/spree/reimbursement_tax_calculator.rb`

### Solidus (reference-only; license verify)
Store credit ledger:
- `core/app/models/spree/store_credit.rb`
- `core/app/models/spree/store_credit_event.rb`
- `core/app/models/spree/store_credit_type.rb`
- `core/app/models/spree/payment_method/store_credit.rb`

Returns + receiving:
- `core/app/models/spree/return_authorization.rb`
- `core/app/models/spree/core/state_machines/return_authorization.rb`
- `core/app/models/spree/customer_return.rb`
- `core/app/models/spree/return_item.rb`
- `core/app/models/spree/return_item/eligibility_validator/*`

Reimbursements:
- `core/app/models/spree/reimbursement.rb`
- `core/app/models/spree/reimbursement_performer.rb`
- `core/app/models/spree/reimbursement_type.rb`
- `core/app/models/spree/reimbursement_type/credit.rb`
- `core/app/models/spree/reimbursement/credit.rb`

---

## Concrete “next build” recommendation (Lumelle primitives)

If we stop reading and start building, the smallest durable internal set looks like:

1) `ReturnCase`
- owner: customer/order
- states: `draft → submitted → approved/denied → in_transit → received → inspected → resolved → closed`
- links: shipments (return label/tracking), refund instructions, store credit ledger entries

2) `ReturnLine`
- order_line_id / fulfillment_line_id equivalent
- qty, reason_code, condition, disposition (`refund|exchange|repair|deny`)
- inspection outcome + restock/disposal decision

3) `RefundInstruction` (owed/authorized) + `RefundExecution` (processed)
- supports rails: `original_payment`, `store_credit`, `split`
- async retry/idempotency; produces audit events on every transition

4) `StoreCreditLedger`
- entries: `credit`, `debit`, `adjust`, `expire`
- actor + originator (return case / manual adjustment) + immutable event log

This aligns with Saleor’s “owed vs processed” split and Spree/Solidus’ store credit ledger + return item validators.
