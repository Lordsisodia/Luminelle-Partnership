---
status: active
last_reviewed: 2025-12-29
owner: agent-zero
---

# Week 2 Backlog (scale the primitives into “real product”)

Goal: add approvals + one money-moving action (refund OR store credit) with deterministic preflight + exceptions.

References:
- `artifacts/week-1-backlog.md`
- `artifacts/implementation-epics-action-center-exceptions.md`
- `artifacts/open-questions.md`
- `artifacts/api-conventions.md`

## ✅ Track A: Approvals primitive (generic, reused everywhere)

### 1) Approvals tables + endpoints

- Create tables:
  - `approvals` (tenant_id, entity_type, entity_id, requested_by_actor_id, status, created_at)
  - `approval_events` (approval_id, actor_id, action, created_at)
- Add endpoints:
  - `POST /admin/approvals/:id/actions/approve`
  - `POST /admin/approvals/:id/actions/reject`
- Enforce policy-keyed thresholds (no hardcoded `$X`):
  - `refund.amount_threshold`
  - `store_credit.amount_threshold`
  - “always require approval” overrides for high risk flags

Definition of done:
- An approval request/approve/reject flow exists with full audit entries.

## ✅ Track B: Money-moving action v1 (pick one; don’t do both in Week‑2)

### Option 1 (recommended): `ISSUE_STORE_CREDIT` (Shopify `giftCardCreate`)

- UX:
  - In ticket detail, button: “Issue store credit”
  - If approval required: “Request approval” → creates approval request
- Backend:
  - Preflight read: `order(id: ...) { customer { id } }`
  - Mutation: `giftCardCreate`
  - On failure: create exception with reason_code + payload (redacted)

Definition of done:
- Store credit issuance is:
  - RBAC gated
  - approval gated above threshold or high-risk
  - idempotent at our layer
  - fully auditable + exception-safe

### Option 2: `REFUND_PAYMENT` (Shopify `refundCreate`)

- UX:
  - In ticket detail, button: “Refund”
  - If approval required: “Request approval” first
- Backend:
  - Preflight read: order transactions (parent transaction selection)
  - Mutation: `refundCreate`
  - On failure: exception with reason_code + payload (redacted)

Definition of done:
- One refund path works for at least one “happy path” Shopify order with correct parent transaction.

## ✅ Track B: Returns workflow expansion (exchange-first)

### 3) Returns states + exchange routing

- Extend `returns.status` to include:
  - `requested|approved|label_sent|in_transit|received|resolved`
- Add `resolution_kind` (`exchange|refund|store_credit`)
- Add endpoints:
  - `POST /admin/returns/:id/actions/send-label`
  - `POST /admin/returns/:id/actions/mark-received`
  - `POST /admin/returns/:id/actions/resolve`

Definition of done:
- Operator can process a return request end-to-end internally (no customer portal required yet).

## ✅ Track C: Search + merchandising (operator UX)

### 4) Merch rules v1 (boost/bury)

- Create `search_rules`:
  - `id`, `tenant_id`, `status` (`draft|published`), `rules_json`, `created_at`, `updated_at`
- Endpoints:
  - `GET /admin/search/rules`
  - `POST /admin/search/rules` (create draft)
  - `POST /admin/search/rules/:id/actions/publish` (approval optional)
- UI:
  - “Rules editor” with 1 rule type: boost product IDs

Definition of done:
- A minimal “search rules” UI exists with publish flow.

## ✅ Track D: Analytics (admin usage → decisions)

### 5) Funnels v1

- Define one funnel:
  - “Setup started → Setup finished → First value action”
- Implement:
  - `GET /admin/analytics/funnels/setup`
- UI:
  - simple funnel chart + conversion %

## ✅ Track E: Integration setup wizard (connectors primitive)

### 6) One connector with runs + retries

- Pick one integration (example: helpdesk or shipping provider)
- Implement setup wizard:
  - auth step → test connection → enable sync
- Ensure all sync attempts create `runs` rows and failures are retryable.

## 🧾 Guardrails (keep it safe)

- Every write action:
  - RBAC scope check
  - audit log record
  - idempotency key required
- Any “money-moving” actions:
  - approvals required above policy thresholds and/or when high-risk flags are present
