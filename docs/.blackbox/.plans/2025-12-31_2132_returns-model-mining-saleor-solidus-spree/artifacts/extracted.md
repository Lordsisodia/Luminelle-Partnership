# Extracted notes (returns/refunds/store credit mining)

Created: `2025-12-31`

Guardrails:
- metadata + file pointers only (no cloning)
- only copy/adapt snippets from `license_bucket=safe` with attribution

---

## Saleor (`saleor/saleor`) — BSD-3-Clause (safe)

Primary evergreen notes:
- `docs/.blackbox/deepresearch/2025-12-31_saleor-returns-refunds-store-credit-domain-model.md`

Verified file pointers (as of `main` @ `9de3f4d...`):

Returns/refunds mutations:
- `saleor/graphql/order/mutations/fulfillment_return_products.py`
- `saleor/graphql/order/mutations/fulfillment_refund_products.py`
- `saleor/graphql/order/mutations/order_refund.py`
- `saleor/graphql/order/mutations/order_grant_refund_create.py`
- `saleor/graphql/order/mutations/order_grant_refund_update.py`

Refund processing (transaction rail):
- `saleor/graphql/payment/mutations/transaction/transaction_request_refund_for_granted_refund.py`

Orchestration core:
- `saleor/order/actions.py`

Gift cards as “store credit” rail:
- `saleor/giftcard/const.py` (`GIFT_CARD_PAYMENT_GATEWAY_ID`)
- `saleor/giftcard/models.py` (GiftCard balance/expiry model)
- `saleor/giftcard/events.py` (events/history hooks)
- `saleor/giftcard/gateway.py` (refund-to-gift-card behavior)

Behavior tests:
- `saleor/graphql/order/tests/mutations/test_fulfillment_return_products.py`

Key pattern to carry forward:
- Separate “refund owed” (`grant refund`) from “refund executed” (transaction request + async status).

---

## Solidus (`solidusio/solidus`) — BSD-3-Clause (safe, but GitHub license detection is `NOASSERTION`)

Evidence (manual verification):
- `LICENSE.md` contains BSD-3-Clause style license text (same “Spree License” lineage).

Core return + store credit primitives (file pointers verified via `gh api`):

Store credit ledger model:
- `core/app/models/spree/store_credit.rb`
- `core/app/models/spree/store_credit_event.rb`
- `core/app/models/spree/store_credit_type.rb`
- `core/app/models/spree/store_credit_category.rb`
- `core/app/models/spree/store_credit_reason.rb`
- `core/app/models/spree/payment_method/store_credit.rb` (store credit as a payment method)

Returns core:
- `core/app/models/spree/return_authorization.rb`
- `core/app/models/spree/core/state_machines/return_authorization.rb` (state transitions)
- `core/app/models/spree/customer_return.rb`
- `core/app/models/spree/return_item.rb`
- `core/app/models/spree/return_item/eligibility_validator/*` (policy-like gates, e.g. `time_since_purchase`, `rma_required`)

Reimbursements (bridges returns → refund/store credit):
- `core/app/models/spree/reimbursement.rb`
- `core/app/models/spree/reimbursement_type.rb`
- `core/app/models/spree/reimbursement_type/store_credit.rb`
- `core/app/models/spree/reimbursement_type/original_payment.rb`

Admin surfaces (helpful for ops workflow UX):
- `backend/app/controllers/spree/admin/customer_returns_controller.rb`
- `backend/app/controllers/spree/admin/store_credits_controller.rb`
- `admin/app/controllers/solidus_admin/store_credits_controller.rb` (newer admin UI)

Key pattern to carry forward:
- “Store credit” is a real ledger with events and reason codes, and it is treated as a payment method for reimbursements.

---

## Spree (`spree/spree`) — dual license; treat as copyleft/flagged reference

License reality (from `license.md`):
- Spree 4.10+ requires complying with AGPL-3.0 for newer contributions (in addition to BSD-style license text).
- Conclusion: keep **reference-only** for architecture/model patterns.

Useful model pointers (verified existence via `gh api`):
- `core/app/models/spree/store_credit.rb`
- `core/app/models/spree/store_credit_event.rb`
- `core/app/models/spree/return_authorization.rb`
- `core/app/models/spree/return_item.rb`
- `core/app/models/spree/customer_return.rb`
- `core/app/models/spree/reimbursement.rb`
- `core/app/models/spree/reimbursement_type.rb`
- `admin/app/controllers/spree/admin/orders/customer_returns_controller.rb` (admin return workflows)
- `storefront/app/views/spree/checkout/_store_credit.html.erb` (checkout store credit UX)
