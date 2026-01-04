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

## Saleor returns/refunds/store-credit mining (primary)

- https://github.com/saleor/saleor/blob/main/saleor/graphql/order/mutations/fulfillment_return_products.py
  - Supports: GraphQL mutation + input shape for returns (including optional refund + replacement).
  - Accessed: 2025-12-31
  - Confidence: High

- https://github.com/saleor/saleor/blob/main/saleor/graphql/order/mutations/fulfillment_refund_products.py
  - Supports: GraphQL mutation + input shape for line-level refunds (unfulfilled + fulfilled lines).
  - Accessed: 2025-12-31
  - Confidence: High

- https://github.com/saleor/saleor/blob/main/saleor/graphql/order/mutations/order_refund.py
  - Supports: Amount-based refund mutation (orderRefund) and fulfillment side effects.
  - Accessed: 2025-12-31
  - Confidence: High

- https://github.com/saleor/saleor/blob/main/saleor/graphql/order/schema.py
  - Supports: Which mutations exist and their GraphQL field names (`orderFulfillmentReturnProducts`, `orderFulfillmentRefundProducts`, `orderRefund`, grant refund).
  - Accessed: 2025-12-31
  - Confidence: High

- https://github.com/saleor/saleor/blob/main/saleor/order/actions.py
  - Supports: Return/refund execution logic (create return fulfillment, optional refund processing, replace order creation, webhook/event triggers).
  - Accessed: 2025-12-31
  - Confidence: Medium (file is large; we used targeted excerpts)

- https://github.com/saleor/saleor/blob/main/saleor/order/__init__.py
  - Supports: Fulfillment status enums and granted refund status enums.
  - Accessed: 2025-12-31
  - Confidence: High

## Saleor “granted refunds” → transaction refund request (store credit hook)

- https://github.com/saleor/saleor/blob/main/saleor/graphql/order/mutations/order_grant_refund_create.py
  - Supports: Granted refund creation (amount calculation, line association, shipping inclusion, transaction binding).
  - Accessed: 2025-12-31
  - Confidence: High

- https://github.com/saleor/saleor/blob/main/saleor/graphql/order/mutations/order_grant_refund_update.py
  - Supports: Granted refund update flow (add/remove lines, amount recalculation, transaction coverage validation).
  - Accessed: 2025-12-31
  - Confidence: High

- https://github.com/saleor/saleor/blob/main/saleor/graphql/payment/mutations/transaction/transaction_request_refund_for_granted_refund.py
  - Supports: How Saleor requests a refund against a transaction for a granted refund (including gift-card gateway path).
  - Accessed: 2025-12-31
  - Confidence: High

- https://github.com/saleor/saleor/blob/main/saleor/giftcard/gateway.py
  - Supports: Gift-card refund behavior (refund credits back to gift card balance; creates transaction events).
  - Accessed: 2025-12-31
  - Confidence: High

## Saleor tests (behavior examples)

- https://github.com/saleor/saleor/blob/main/saleor/graphql/order/tests/mutations/test_fulfillment_return_products.py
  - Supports: Example GraphQL call shapes and refund assertions (shipping included, amountToRefund handling, gift card restrictions).
  - Accessed: 2025-12-31
  - Confidence: Medium
