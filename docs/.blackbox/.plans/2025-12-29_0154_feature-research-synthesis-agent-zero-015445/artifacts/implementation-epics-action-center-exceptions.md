---
status: draft
last_reviewed: 2025-12-29
owner: agent-zero
---

# Implementation Epics (Build-Ready): Action Center + Exceptions Queue

Purpose: convert research into a **build plan** (screens, endpoints, tables, states, guardrails).

Scope posture:
- Start **read-only first** (show context) → then add **safe actions** with approvals + audit.
- Keep integrations behind a **service boundary** and mirror run status into our DB.

## 🎫 Epic A — Support Action Center (Ticket + Order Context + Safe Actions)

### A1) Screen: Ticket list (queue)

UI requirements:
- Filters: status, channel, priority, assigned_to, tags, SLA/age.
- Bulk actions: assign, tag, change status, snooze.
- Column patterns: subject, customer, last updated, status, assignee, “needs attention” reason.

Core data:
- Ticket summary + customer link + order link(s) + “last event”.

API endpoints (example shape):
- `GET /api/tickets?status=&assignee=&q=&tag=&page=`
- `GET /api/tickets/:id`
- `PATCH /api/tickets/:id` (status/assignee/tags/snooze)

Evidence anchors (patterns):
- `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/live-web-research-tranche-003.md`

### A2) Screen: Ticket detail (action center)

Layout:
- Left: conversation/thread + internal notes.
- Right: **Order Context Panel** (customer timeline, latest order snapshot, delivery/returns status).

Order Context Panel (read-only first):
- Customer identity: name/email/phone, tags, segment.
- Latest order: items, totals, payment status, shipping status.
- Tracking summary: carrier, last scan, ETA, exceptions.
- Returns summary: status + next action.

Safe actions (phase 2):
- Refund (partial/full) — gated by permission + approvals threshold.
- Reship — gated; requires reason + idempotency token.
- Cancel/unfulfill (if allowed) — gated; requires confirmation.
- Add internal task — safe default.

API endpoints:
- `GET /api/customers/:id/timeline` (events: orders, shipments, returns, tickets)
- `GET /api/orders/:id/summary`
- `GET /api/orders/:id/shipping`
- `GET /api/orders/:id/returns`
- `POST /api/action-center/tickets/:id/actions/refund`
- `POST /api/action-center/tickets/:id/actions/reship`
- `POST /api/action-center/tickets/:id/actions/cancel`
- `POST /api/action-center/tickets/:id/actions/create-task`

Guardrails:
- Every write action requires:
  - permission check (RBAC)
  - idempotency key
  - audit log record
  - optional approval workflow (amount/threshold based)

### A3) Primitive: Approval gating (for risky actions)

Rules:
- Refund > `$X` requires approval.
- Cancel after fulfillment started requires approval.

API endpoints:
- `POST /api/approvals`
- `GET /api/approvals?status=pending`
- `POST /api/approvals/:id/approve`
- `POST /api/approvals/:id/reject`

### A4) Primitive: Audit log (who changed what)

Must capture:
- Actor (user/service), action, target entity, before/after, timestamp, correlation_id.

API endpoints:
- `GET /api/audit?entity_type=&entity_id=&actor=&action=&from=&to=`

## 🚨 Epic B — Exceptions Queue (Shipping + Returns + Automation failures)

Goal: a single “needs attention” queue that can resolve failures with:
- clear reason
- next best action
- retry with idempotency
- audit trail

MVP scope note (important):
- Default MVP: implement “exceptions” only for *our* action runner failures (Option 1/2 in `artifacts/open-questions.md`), not a generalized Shopify-wide scan.
- Rationale: avoids queue-scoped scanning complexity and reduces scopes; still provides operator clarity on failed actions.

### B0) MVP exception reason codes + retry rules (our action runner failures only)

Goal: make failures actionable without building a generalized “scan Shopify for problems” system.

Definition: an “exception” is created when we attempted an action (we have `correlation_id` + `idempotency_key`) and it failed, or when required prerequisites are missing.

Minimum exception fields (must be present in `exceptions` / `exception_runs`):
- `domain`: `actions` | `returns` | `fulfillment` | `payments` | `integrations`
- `reason_code`: one of the enums below
- `entity_type` / `entity_id`: `order` / `return` / `ticket` / etc
- `correlation_id` / `idempotency_key`
- `retryable`: boolean (derived from reason_code + attempt count)
- `next_action`: short string shown to operator

#### Reason codes (v1) — recommend 8–12 to start

Integration / auth:
- `INTEGRATION_AUTH_EXPIRED` — connector token invalid/expired (Shopify or carrier)
- `INTEGRATION_RATE_LIMITED` — upstream throttled (retry with backoff)
- `INTEGRATION_TIMEOUT` — transient timeouts

Prerequisites / data:
- `MISSING_REQUIRED_ID` — missing Shopify GID (orderId, fulfillmentLineItemId, customerId, fulfillmentOrderId)
- `ORDER_STATE_NOT_ELIGIBLE` — action not allowed given current order/fulfillment/return status

Payments / money-moving:
- `REFUND_PROVIDER_ERROR` — refundCreate returned errors or gateway failure
- `STORE_CREDIT_ISSUE_FAILED` — giftCardCreate errors
- `APPROVAL_REQUIRED_BLOCKED` — action attempted without required approval (should usually be prevented before attempt)

Fulfillment / shipping:
- `FULFILLMENT_CREATE_FAILED` — fulfillmentCreate errors
- `FULFILLMENT_CANCEL_FAILED` — fulfillmentCancel errors

Returns:
- `RETURN_REQUEST_FAILED` — returnRequest/returnCreate errors
- `RETURN_PROCESS_FAILED` — returnProcess errors

#### Retry rules (v1) — deterministic and safe-by-default

Global limits:
- Max attempts: 5
- Backoff: exponential (e.g. 1m, 5m, 15m, 1h, 6h) with jitter
- If the same `idempotency_key` has a recorded SUCCESS, never retry (dedupe protection)

Per reason_code retryability:
- `INTEGRATION_TIMEOUT` / `INTEGRATION_RATE_LIMITED` → retryable (auto or one-click retry)
- `INTEGRATION_AUTH_EXPIRED` → not auto-retry; requires re-auth, then retry
- `MISSING_REQUIRED_ID` → not retryable until preflight runs and hydrates missing IDs (show “Run preflight” CTA)
- `ORDER_STATE_NOT_ELIGIBLE` → not retryable (operator must choose a different action)
- `APPROVAL_REQUIRED_BLOCKED` → not retryable until approval recorded (show “Request approval” CTA)
- `*_FAILED` (mutation errors) → retryable only if error is transient; otherwise require operator review (store the `userErrors` payload)

Operator CTAs (map to reason_code):
- “Re-auth integration” → `INTEGRATION_AUTH_EXPIRED`
- “Run preflight reads” → `MISSING_REQUIRED_ID`
- “Request approval” → `APPROVAL_REQUIRED_BLOCKED`
- “Retry now” → transient failures
- “Create manual task” → non-retryable business logic blocks

### B1) Exception state machine (v1)

Goal: make “what happens next?” explicit and auditable, without building a generalized cross-system scanner.

Exception status values (for `exceptions.status`):
- `OPEN` — created and awaiting operator action or retry eligibility
- `RETRYING` — a retry run is scheduled or in progress
- `NEEDS_MANUAL_REVIEW` — forced stop (risk flags, non-retryable reason, or UNKNOWN stop threshold)
- `RESOLVED` — no longer needs attention (action succeeded, was superseded, or operator closed)
- `CANCELED` — explicitly abandoned (e.g., order canceled, customer issue resolved elsewhere)

Core transitions (v1):
- Create exception: `OPEN`
- Operator clicks “Retry now” (or auto-retry triggers for retryable transient classes):
  - `OPEN` → `RETRYING` (create `exception_runs` attempt row)
  - `RETRYING` → `OPEN` if run failed but still retryable
  - `RETRYING` → `NEEDS_MANUAL_REVIEW` if:
    - `attempt >= exceptions.max_attempts`, OR
    - error class is `UNKNOWN` and `attempt >= exceptions.unknown_stop_after_attempts`, OR
    - any `severity=high` risk flag is present on the order context snapshot
  - `RETRYING` → `RESOLVED` if run succeeded (and we can confirm success via preflight or downstream event)
- Operator takes a “manual resolution” CTA (request approval, re-auth, create task, override):
  - `OPEN|NEEDS_MANUAL_REVIEW` → `RESOLVED` only when the underlying condition is cleared and/or the action is completed
- Operator abandons:
  - `OPEN|NEEDS_MANUAL_REVIEW` → `CANCELED` (must include a reason and actor)

Audit requirements (minimum):
- Every transition writes an `audit_log` entry (`ACTION_ATTEMPTED|SUCCEEDED|FAILED` plus exception status change).
- Every run attempt creates an `exception_runs` row with:
  - attempt number, started_at/ended_at
  - error_class + error payload (redacted)
  - connector identity (shopify, carrier, returns tool)

#### Error payload storage + redaction rules (v1)

Goal: make exceptions debuggable and auditable without storing sensitive customer/payment data.

Principles:
- Store “what happened” + “why it failed” + “what to do next” in a consistent structure.
- Prefer structured fields over raw blobs; keep raw payloads only when redacted.
- Treat all external payloads as untrusted; redact before persisting.

What to store (recommended schema for `exception_runs.payload_json`):
- `source`: `shopify_admin_graphql` | `carrier_api` | `internal`
- `operation`: mutation/query name (e.g. `refundCreate`, `returnRequest`, `fulfillmentCreate`)
- `http_status`: if applicable
- `request_id`: upstream request id if provided
- `user_errors`: array of `{ field, code, message }` (for Shopify GraphQL userErrors)
- `error_class`: short enum (e.g. `RATE_LIMITED`, `AUTH`, `VALIDATION`, `TRANSIENT`, `UNKNOWN`)
- `safe_context`: minimal non-sensitive identifiers:
  - `order_id` (Shopify GID)
  - `return_id` (Shopify GID)
  - `fulfillment_order_id` (Shopify GID)
  - `customer_id` (Shopify GID)
  - `action_type` (our enum)
  - `correlation_id`, `idempotency_key`

What NOT to store (redact/remove):
- Payment instrument details:
  - card numbers (even masked), bank account numbers, gateway tokens, payment receipts
- Customer PII beyond IDs:
  - email, phone, full address, message bodies
- Freeform customer notes/messages unless explicitly needed and separately permissioned

Redaction rules (implementation guidance):
- Strip any keys matching common sensitive patterns:
  - `*email*`, `*phone*`, `*address*`, `*receipt*`, `*card*`, `*accountNumber*`, `*token*`, `*password*`, `*secret*`
- For unknown blobs: keep at most:
  - first 2KB of text after redaction
  - and always include a “redacted=true” flag
- Hash (non-reversible) any accidental sensitive values you must correlate on (rare); prefer dropping entirely.

Operator display rules:
- UI should primarily show:
  - reason_code, next_action, last error message, and userErrors summary
- Deep “payload” view should require elevated permission and should show a redaction notice.

`error_class` enum (v1; canonical across integrations):
- `AUTH` — credentials invalid/expired; requires re-auth, do not auto-retry
- `RATE_LIMITED` — upstream throttled; retry with backoff
- `TRANSIENT` — timeouts/5xx/network issues; retry with backoff
- `VALIDATION` — malformed/invalid inputs; not retryable until inputs change
- `BUSINESS_RULE` — action not allowed due to state/policy; not retryable (choose different action)
- `UNKNOWN` — everything else; default to manual review

Mapping table (reason_code → error_class → CTA → retryability)

| reason_code | error_class | primary CTA | auto-retry? |
| - | - | - | - |
| INTEGRATION_AUTH_EXPIRED | AUTH | Re-auth integration | No |
| INTEGRATION_RATE_LIMITED | RATE_LIMITED | Retry now | Yes (backoff) |
| INTEGRATION_TIMEOUT | TRANSIENT | Retry now | Yes (backoff) |
| MISSING_REQUIRED_ID | VALIDATION | Run preflight reads | No (until hydrated) |
| ORDER_STATE_NOT_ELIGIBLE | BUSINESS_RULE | Create manual task | No |
| REFUND_PROVIDER_ERROR | UNKNOWN | Review + retry | Sometimes (manual) |
| STORE_CREDIT_ISSUE_FAILED | UNKNOWN | Review + retry | Sometimes (manual) |
| APPROVAL_REQUIRED_BLOCKED | BUSINESS_RULE | Request approval | No (until approved) |
| FULFILLMENT_CREATE_FAILED | UNKNOWN | Review + retry | Sometimes (manual) |
| FULFILLMENT_CANCEL_FAILED | UNKNOWN | Review + retry | Sometimes (manual) |
| RETURN_REQUEST_FAILED | UNKNOWN | Review + retry | Sometimes (manual) |
| RETURN_PROCESS_FAILED | UNKNOWN | Review + retry | Sometimes (manual) |

UNKNOWN handling rules + stop conditions (v1)

Goal: prevent infinite retries and make “manual review required” deterministic.

Definitions:
- “Stop” = mark exception as `needs_manual_review` and block auto-retry until a human changes inputs or explicitly overrides.

Stop conditions (any of these triggers STOP):
- `attempt >= 3` AND `error_class = UNKNOWN` (default)
- Any `user_errors` present where `field` is populated (strong indicator of invalid inputs)
- Repeated identical `user_errors.message` across 2 attempts (inputs unchanged)
- HTTP status is 4xx (except 429) from upstream
- The action runner detects a successful completion for the same `idempotency_key` (dedupe safeguard; close exception)

Retry conditions for `UNKNOWN` (allowed only when all are true):
- `attempt < 3`
- no `user_errors` with `field` set
- upstream status indicates possible transient failure (5xx or timeout)
- operator explicitly clicks “Retry now” (no auto-retry on UNKNOWN by default)

Operator UX for STOP state:
- Primary CTA: “Create manual task”
- Secondary CTA: “Override & retry” (requires elevated permission + reason)
- Show: last upstream status, last error message, and a redacted payload summary

Audit requirements:
- Every STOP transition writes an `audit_log` entry with:
  - exception_id, prior attempt count, actor (system), reason (“stop_condition”), and the last error summary

Evidence anchors:
- Shopify mutations return `userErrors` consistently (examples in this doc): see “Validated Shopify Admin GraphQL starter snippets (v1)” above.

Example `exception_runs.payload_json` objects (copy/paste)

1) Shopify GraphQL validation/user error (example: refundCreate failed)

```json
{
  "source": "shopify_admin_graphql",
  "operation": "refundCreate",
  "http_status": 200,
  "request_id": "shopify-gql-request-id-abc123",
  "error_class": "VALIDATION",
  "user_errors": [
    {
      "field": ["input", "transactions", "0", "parentId"],
      "code": null,
      "message": "Parent transaction is invalid."
    }
  ],
  "safe_context": {
    "order_id": "gid://shopify/Order/625362839",
    "customer_id": "gid://shopify/Customer/1234567890",
    "action_type": "REFUND_PAYMENT",
    "correlation_id": "corr_01JABCDEFG1234567890",
    "idempotency_key": "idem_01JABCDEFG1234567890"
  },
  "redacted": true
}
```

2) Timeout / upstream failure (example: carrier API timeout during label purchase)

```json
{
  "source": "carrier_api",
  "operation": "purchaseLabel",
  "http_status": 504,
  "request_id": "carrier-request-id-xyz789",
  "error_class": "TRANSIENT",
  "user_errors": [],
  "safe_context": {
    "order_id": "gid://shopify/Order/625362839",
    "action_type": "CREATE_RETURN_LABEL",
    "correlation_id": "corr_01JHIJKLMN1234567890",
    "idempotency_key": "idem_01JHIJKLMN1234567890"
  },
  "redacted": true,
  "notes": "Upstream timed out; safe to retry with backoff."
}
```

3) Auth expired (example: Shopify token invalid/expired)

```json
{
  "source": "shopify_admin_graphql",
  "operation": "refundCreate",
  "http_status": 401,
  "request_id": "shopify-gql-request-id-auth401",
  "error_class": "AUTH",
  "user_errors": [],
  "safe_context": {
    "order_id": "gid://shopify/Order/625362839",
    "action_type": "REFUND_PAYMENT",
    "correlation_id": "corr_01JOPQRSTU1234567890",
    "idempotency_key": "idem_01JOPQRSTU1234567890"
  },
  "redacted": true,
  "next_action_hint": "Re-auth integration (Shopify) then retry"
}
```

### B1) Screen: Exceptions queue list

Filters:
- domain: shipping | returns | automation | integrations
- status: open | snoozed | resolved
- severity: low | medium | high
- assigned_to
- created_at range

Columns:
- domain, reason, affected entity, last error, retry count, last attempted, owner.

API endpoints:
- `GET /api/exceptions?domain=&status=&severity=&q=&page=`
- `GET /api/exceptions/:id`
- `PATCH /api/exceptions/:id` (assign, snooze, resolve)

### B2) Screen: Exception detail + run log

Content:
- exception summary
- raw payload (redacted)
- run history (attempts)
- recommended next action(s)
- retry button(s)

API endpoints:
- `GET /api/exceptions/:id/runs`
- `POST /api/exceptions/:id/retry` (idempotent)

### B3) Shipping exceptions (domain model)

Common reasons:
- address validation failed
- label purchase failed
- carrier API timeout
- delivery exception

Suggested actions:
- fix address → retry
- switch carrier/service → retry
- generate new label → retry

### B4) Returns exceptions (domain model)

Common reasons:
- label created but never used
- package not received after N days
- refund stuck / payment provider failure

Suggested actions:
- contact customer template
- manual override (approval gated)
- re-trigger refund

### B5) Automation exceptions (domain model)

Common reasons:
- webhook failed
- action failed (provider)
- auth expired

Suggested actions:
- re-auth connector
- retry run
- disable automation + alert owner

## 🗃️ Tables / objects (minimum viable schema)

### `tickets`
- id, external_id, customer_id, subject, status, priority, assignee_id, tags, last_message_at

### `ticket_messages`
- id, ticket_id, author_type, author_id, body, created_at

### `customer_timeline_events`
- id, customer_id, type, ref_type, ref_id, created_at, summary_json

## 🧾 OrderEvent taxonomy (v1) — the “unified timeline” contract

Goal: make “single pane of glass” feasible by normalizing all systems into a single event model.

Minimal `OrderEvent` fields:
- `id`
- `occurred_at` (timestamp)
- `type` (enum; see below)
- `source` (enum: `shopify`, `support`, `returns`, `shipping`, `internal`)
- `customer_id`, `order_id`
- `entity_type`, `entity_id` (external or internal)
- `summary` (short display string)
- `payload_json` (raw-ish payload; redacted)
- `correlation_id` (joins events across systems/actions)

Suggested `OrderEvent.type` (v1):
- Order lifecycle: `ORDER_CREATED`, `ORDER_UPDATED`, `ORDER_CANCELED`
- Payment: `PAYMENT_AUTHORIZED`, `PAYMENT_CAPTURED`, `PAYMENT_FAILED`, `REFUND_ISSUED`, `CHARGEBACK_OPENED`
- Fulfillment: `FULFILLMENT_CREATED`, `FULFILLMENT_UPDATED`, `FULFILLMENT_CANCELED`
- Shipping: `LABEL_CREATED`, `SHIPMENT_IN_TRANSIT`, `SHIPMENT_OUT_FOR_DELIVERY`, `SHIPMENT_DELIVERED`, `DELIVERY_EXCEPTION`
- Support: `TICKET_CREATED`, `CUSTOMER_MESSAGE_RECEIVED`, `AGENT_MESSAGE_SENT`, `INTERNAL_NOTE_ADDED`
- Returns: `RETURN_REQUESTED`, `RETURN_APPROVED`, `RETURN_DENIED`, `RETURN_LABEL_CREATED`, `RETURN_IN_TRANSIT`, `RETURN_RECEIVED`
- Resolutions: `EXCHANGE_CREATED`, `EXCHANGE_SHIPPED`, `STORE_CREDIT_ISSUED`, `REFUND_REQUESTED`, `REFUND_APPROVED`, `REFUND_SENT`
- Guardrails: `APPROVAL_REQUESTED`, `APPROVAL_APPROVED`, `APPROVAL_REJECTED`
- System actions: `ACTION_ATTEMPTED`, `ACTION_SUCCEEDED`, `ACTION_FAILED`

Evidence anchors (why this matters / patterns in the wild):
- Support context + embedded actions: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/gorgias.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/re-amaze.md`
- Returns lifecycle events: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/loop-returns.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/returngo.md`

## 🚩 Risk flag taxonomy (v1) + sourcing rules

Goal: define a small, explainable set of risk flags that can drive:
- approval gating overrides (always require approval)
- Exceptions Queue routing (manual review)
- operator context chips (“why is this risky?”)

Rules:
- Flags must be explainable (include `reason` + `source`).
- Flags should not require heavy ML in MVP; start deterministic.

Recommended flag model (stored on the order context snapshot and emitted as `OrderEvent` when changed):
- `flag_key` (enum)
- `severity` (`low` | `medium` | `high`)
- `source` (`shopify` | `internal_rules` | `fraud_tool` | `returns_tool` | `support`)
- `reason` (short, operator-readable)
- `evidence_ref` (optional pointer: timeline event id / external id)
- `created_at`, `cleared_at` (nullable)

Flag set (v1; keep ≤10)

Fraud / payment risk:
- `HIGH_RISK_ORDER` (high)
  - Source options:
    - `shopify`: if Shopify surfaces a high risk recommendation in the admin risk analysis (if available via API surface for the tenant)
    - `fraud_tool`: if integrated (third-party fraud signal)
    - `internal_rules`: high-value + suspicious combo (below)
  - MVP internal heuristic (fallback; policy-keyed):
    - `order_total > risk.high_value_order_amount_threshold`
    - AND `new_customer` (first order within `risk.new_customer_days_threshold`)
    - AND `shipping_country != billing_country` (only if both countries present)

- `CHARGEBACK_OPEN` (high)
  - Source: Shopify payments/chargeback status where available; otherwise ingest from payment provider integration

Returns / abuse risk:
- `REPEAT_RETURNS` (medium/high depending on count)
  - Source: `internal_rules` computed from our return history cache (count returns per customer in window)
  - Rule: `returns_in_window >= returns.repeat_returns_count_threshold` (window: `returns.repeat_returns_window_days`)

- `RETURN_OUT_OF_WINDOW_REQUESTED` (medium)
  - Source: `internal_rules` derived from return request date vs policy window

Fulfillment / delivery risk:
- `DELIVERY_EXCEPTION` (medium)
  - Source: carrier tracking ingestion (timeline event `DELIVERY_EXCEPTION`)

- `ADDRESS_MISMATCH` (medium)
  - Source: `internal_rules` (billing != shipping) OR shipping validation failures from carrier/address validator

Operational / workflow risk:
- `MULTIPLE_RESHIPS` (high)
  - Source: `internal_rules` (reship_count >= 2 for same order or same customer in window)

- `MULTIPLE_REFUNDS` (high)
  - Source: `internal_rules` (refund_count >= 2 for same order)

Support signal:
- `CUSTOMER_ESCALATION` (low/medium)
  - Source: `support` (tag applied by agent; MVP: manual only)

How these flags affect behavior (MVP):
- Any `severity=high` flag:
  - require approval regardless of amount for refunds/store credit/reship/cancel fulfillment
  - block auto-retry for UNKNOWN errors → force manual review
- `severity=medium` flags:
  - require approval above the standard amount threshold
  - route certain actions (reship/refund) to “Request approval” CTA by default

Evidence anchor (why flags matter for guardrails):
- Support tools emphasize safe actions in context (pattern): `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/gorgias.md`

### `action_center_actions`
- id, ticket_id, action_type, payload_json, status, correlation_id, idempotency_key, created_at

### `approvals`
- id, requested_by, approved_by, status, policy_key, payload_json, created_at, decided_at

### `audit_log`
- id, actor_type, actor_id, action, entity_type, entity_id, before_json, after_json, correlation_id, created_at

### `exceptions`
- id, domain, status, severity, reason, entity_type, entity_id, assigned_to, created_at, resolved_at

### `exception_runs`
- id, exception_id, attempt, status, error, payload_json, created_at

## 🧰 Action catalog (v1) + approvals (risk-scored)

Goal: pick 5–7 actions that resolve the majority of issues while keeping risk manageable.

Action representation (minimum):
- `action_type` (enum)
- `requested_by` (actor)
- `target` (order_id, ticket_id, line_item_id(s), fulfillment_id(s), etc.)
- `risk_level` (low/med/high)
- `approval_required` (bool + why)
- `idempotency_key` (required)
- `correlation_id` (required)

Candidate actions (v1):

1) `ISSUE_STORE_CREDIT`
- Risk: medium (money value; can be abused)
- Preconditions: customer identified; amount within policy; not previously issued for same issue
- Approval policy: required above `$X` or if customer risk flags present
- External effects: create store credit / gift card / credit balance
- Evidence anchor (store credit framing as retention lever): `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/rise-ai.md`

2) `CREATE_RETURN_LABEL`
- Risk: low→medium (cost; fraud risk)
- Preconditions: return eligible by policy (window/conditions); address validated
- Approval policy: required if order risk flags / abuse signals
- External effects: carrier label purchase + tracking id
- Evidence anchors: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/loop-returns.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/returngo.md`

3) `START_EXCHANGE`
- Risk: medium (inventory/reship cost)
- Preconditions: item eligible; exchange variant available; return authorized (or “send-first” allowed by policy)
- Approval policy: required for “send-first” exchanges above `$X` value or with risk flags
- External effects: create replacement/exchange order/fulfillment
- Evidence anchors: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/loop-returns.md`

4) `RESHIP_ORDER` (replacement shipment)
- Risk: high (direct COGS impact; fraud vector)
- Preconditions: delivery exception or SLA breach; address verified; prior reship count < threshold
- Approval policy: always required above threshold; recommended for all reships in MVP until confidence grows
- External effects: create new fulfillment + label
- Evidence anchor (shipping batch ops + retries/exceptions): `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/shipstation.md`

5) `REFUND_PAYMENT` (partial/full)
- Risk: high (money movement; chargeback exposure)
- Preconditions: payment captured; refund window; line items eligible; not already refunded
- Approval policy: required above `$X` and/or for “high-risk customer/order” flags
- External effects: issue refund via payment provider, update order

6) `CANCEL_FULFILLMENT` / `CANCEL_ORDER`
- Risk: high (operational chaos if done late)
- Preconditions: fulfillment not in-transit (or explicit override path)
- Approval policy: required if fulfillment already started

7) `CREATE_INTERNAL_TASK`
- Risk: low (safe default)
- Preconditions: none
- Approval policy: none
- External effects: none (internal)

Evidence anchors (embedded actions in support tooling):
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/gorgias.md`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/re-amaze.md`

## 🛍️ Shopify integration surfaces checklist (Ops Action Center MVP)

Purpose: define the minimum Shopify Admin API surfaces we need to support read-only timeline + a small set of safe actions.

Rule: treat this as “integration boundary documentation” (we can swap implementations later), not a commitment to specific internal schemas.

### Read-only (Epic 1: unified timeline)

- Orders core data
  - Objects: `Order`, `LineItem`, `Customer`, `Fulfillment`, `OrderTransaction`, `Refund`
  - Evidence (Refund object + query): `https://shopify.dev/docs/api/admin-graphql/latest/objects/Refund`
  - Evidence (refund query): `https://shopify.dev/docs/api/admin-graphql/latest/queries/refund`
- Fulfillment + shipment tracking signals
  - Objects: `Fulfillment`, `FulfillmentEvent`, `FulfillmentOrder`
  - Evidence (Fulfillment object): `https://shopify.dev/docs/api/admin-graphql/latest/objects/Fulfillment`
- Returns / return eligibility primitives
  - Objects/Queries: `Return`, `returnableFulfillments`, `returnableFulfillment`
  - Evidence (Return object + links to return mutations): `https://shopify.dev/docs/api/admin-graphql/latest/objects/Return`
  - Evidence (ReturnableFulfillment object): `https://shopify.dev/docs/api/admin-graphql/latest/objects/ReturnableFulfillment`

### Write actions (Epic 2/3: safe actions + returns orchestration)

1) Refund payment
- Mutation: `refundCreate`
- Input type: `RefundInput`
- Evidence (refundCreate mutation): `https://shopify.dev/docs/api/admin-graphql/latest/mutations/refundCreate`
- Notes: requires `read_orders` + appropriate write scopes for refunds in the app configuration; enforce internal approvals + audit logging before calling.

2) Create/approve/decline/close returns
- Mutations:
  - `returnRequest` (customer request requiring approval)
  - `returnApproveRequest` / `returnDeclineRequest` (merchant decision)
  - `returnCreate` (create an OPEN return directly when approval is already handled externally)
  - `returnProcess` (process return)
  - `returnClose` (mark return complete)
- Evidence (returnRequest mutation): `https://shopify.dev/docs/api/admin-graphql/latest/mutations/returnRequest`
- Evidence (Return object lists return mutations): `https://shopify.dev/docs/api/admin-graphql/latest/objects/Return`
- Notes: these APIs imply our internal “return state machine” should map cleanly onto Shopify `Return.status` to avoid double-truth.

3) Fulfillment actions (reship / cancel fulfillment)
- Mutations:
  - `fulfillmentCreate` (reship path, when appropriate)
  - `fulfillmentCancel` (cancel a fulfillment)
- Evidence (Fulfillment object + mutation list): `https://shopify.dev/docs/api/admin-graphql/latest/objects/Fulfillment`
- Notes: fulfillment flows depend on fulfillment order assignment model; treat as high-risk actions in MVP (approval gated).

4) Store credit / gift card issuance (store-credit-first resolution)
- Mutation: `giftCardCreate`
- Evidence (giftCardCreate mutation): `https://shopify.dev/docs/api/admin-graphql/latest/mutations/giftCardCreate`
- Evidence (GiftCard object): `https://shopify.dev/docs/api/admin-graphql/latest/objects/GiftCard`
- Notes: some merchants may prefer “store credit” products; gift cards are a common mechanism. Keep this behind an internal `ISSUE_STORE_CREDIT` action contract so we can swap mechanisms later.

### Required OAuth scopes (minimum reminders; verify at integration time)

- Returns:
  - read: `read_returns` (and possibly `read_orders` depending on queries)
  - write: `write_returns`
  - Evidence: scopes listed alongside `Return` query/mutations in schema + docs: `https://shopify.dev/docs/api/admin-graphql/latest/objects/Return`
- Refunds:
  - read: `read_orders`
  - write: refund create access via mutation: `https://shopify.dev/docs/api/admin-graphql/latest/mutations/refundCreate`
- Gift cards:
  - read: `read_gift_cards`
  - write: `write_gift_cards` (and/or `write_customers` if issuing to a customer)
  - Evidence: scopes listed in GiftCard object docs: `https://shopify.dev/docs/api/admin-graphql/latest/objects/GiftCard`

### Per-action Shopify integration checklists (v1)

Goal: make each v1 action implementable by listing preflight reads, required IDs, mutation call(s), and audit/event outputs.

Principle: always emit:
- `ACTION_ATTEMPTED` → `ACTION_SUCCEEDED` / `ACTION_FAILED`
- plus a domain-specific event (refund/return/fulfillment/store credit) when applicable

#### Action: `REFUND_PAYMENT` (Shopify `refundCreate`)

- Preconditions (internal):
  - RBAC permission: `orders.refund:create`
  - Approval policy check (policy key: `refund.amount_threshold`)
  - Idempotency key required
- Preconditions (Shopify):
  - We have `orderId` (Shopify GID)
  - We can identify which line items / shipping lines (if partial)
- Preflight reads (Shopify):
  - Read `Order` financial state (transactions paid/captured) + refundable amount
  - Optional: fetch suggested refund breakdown via `SuggestedRefund` if using suggested calculations
  - Evidence (RefundInput + SuggestedRefund type): `https://shopify.dev/docs/api/admin-graphql/latest/objects/Refund`
- Required identifiers:
  - `orderId`
  - optionally `lineItemId` + quantities, shipping lines, duties
- Mutation:
  - `refundCreate(input: RefundInput!)`
  - Evidence: `https://shopify.dev/docs/api/admin-graphql/latest/mutations/refundCreate`
- Postconditions:
  - Persist an `action_center_actions` row with:
    - `action_type=REFUND_PAYMENT`, `correlation_id`, `idempotency_key`, `status`
  - Persist `audit_log` entry (attempt + result)
  - Emit `OrderEvent`:
    - `ACTION_ATTEMPTED` / `ACTION_SUCCEEDED|FAILED`
    - `REFUND_SENT` (on success)

#### Action: `ISSUE_STORE_CREDIT` (Shopify `giftCardCreate` as the default mechanism)

- Preconditions (internal):
  - RBAC permission: `store_credit.issue:create`
  - Approval policy check (policy key: `store_credit.amount_threshold`)
  - Idempotency key required (store credit should not double-issue)
- Preconditions (Shopify):
  - We have `customerId` (Shopify GID) OR we intentionally issue without attaching to a customer (merchant choice)
- Preflight reads (Shopify):
  - Fetch customer exists / is correct (avoid issuing to wrong customer)
- Required identifiers:
  - `customerId` (recommended)
  - `amount` (Decimal), currency handling strategy (see policy keys)
- Mutation:
  - `giftCardCreate(input: GiftCardCreateInput!)`
  - Evidence: `https://shopify.dev/docs/api/admin-graphql/latest/mutations/giftCardCreate`
- Postconditions:
  - Persist `audit_log` (attempt + result), including created gift card GID
  - Emit `OrderEvent`:
    - `ACTION_ATTEMPTED` / `ACTION_SUCCEEDED|FAILED`
    - `STORE_CREDIT_ISSUED` (on success)

#### Action: `START_RETURN_REQUEST` (Shopify `returnRequest` or `returnCreate`)

This is the “create return intent” path; we choose between:
- `returnRequest` when merchant approval is needed, or
- `returnCreate` when we treat the request as already approved (external approval path).

- Preconditions (internal):
  - RBAC permission: `returns.request:create`
  - Policy check: eligibility window / item eligibility / fraud gates
  - If in doubt: route to `NEEDS_REVIEW` (internal) before creating Shopify return
- Preconditions (Shopify):
  - We have `orderId` (Shopify GID)
  - We know eligible returnable fulfillment line items and quantities
- Preflight reads (Shopify):
  - `returnableFulfillments(orderId: ...)` to determine what can be returned
  - Evidence: `https://shopify.dev/docs/api/admin-graphql/latest/objects/ReturnableFulfillment`
- Required identifiers:
  - `orderId`
  - `fulfillmentLineItemId` + quantity + return reason + optional customer note
- Mutations:
  - `returnRequest(input: ReturnRequestInput!)` (creates `Return.status=REQUESTED`)
    - Evidence: `https://shopify.dev/docs/api/admin-graphql/latest/mutations/returnRequest`
  - `returnCreate(returnInput: ReturnInput!)` (creates OPEN return)
    - Evidence: `https://shopify.dev/docs/api/admin-graphql/latest/mutations/returnCreate`
- Postconditions:
  - Emit `OrderEvent`:
    - `RETURN_REQUESTED` (after `returnRequest`) OR `RETURN_APPROVED` (after `returnCreate` if treated as already approved)
  - Persist mapping: internal return record ↔ Shopify `Return.id`
  - Persist `audit_log` entries (attempt/result)

#### Action: `APPROVE_RETURN` / `DECLINE_RETURN` (Shopify `returnApproveRequest` / `returnDeclineRequest`)

- Preconditions (internal):
  - RBAC permission: `returns.request:approve|decline`
  - Approval required if decision is “high risk” (optional), but this is already an approval action itself
- Preconditions (Shopify):
  - We have `returnId` (Shopify GID)
- Mutation:
  - `returnApproveRequest(input: ReturnApproveRequestInput!)` or `returnDeclineRequest(input: ReturnDeclineRequestInput!)`
  - Evidence (mutation list): `https://shopify.dev/docs/api/admin-graphql/latest/objects/Return`
- Postconditions:
  - Emit `OrderEvent`:
    - `RETURN_APPROVED` OR `RETURN_DENIED`
  - Persist `audit_log` entries (attempt/result)

#### Action: `PROCESS_RETURN` (Shopify `returnProcess` + then `refundCreate` or `giftCardCreate` as applicable)

- Preconditions (internal):
  - Return is in a processable state (`APPROVED`, items received, etc.)
  - Approval policy for money-moving outcome (refund/store credit)
- Preconditions (Shopify):
  - We have `returnId` (Shopify GID)
- Mutation:
  - `returnProcess(input: ReturnProcessInput!)`
  - Evidence (mutation list): `https://shopify.dev/docs/api/admin-graphql/latest/objects/Return`
- Follow-on actions (depending on outcome):
  - refund path: `refundCreate`
  - store credit path: `giftCardCreate`
- Postconditions:
  - Emit `OrderEvent`:
    - `RETURN_RECEIVED` / `RETURN_PROCESSED` (if we model it) and `RESOLUTION_PENDING`
    - plus `REFUND_SENT` or `STORE_CREDIT_ISSUED`
  - Persist `audit_log` entries for each mutation

#### Action: `RESHIP_ORDER` (Shopify fulfillment flows: `fulfillmentCreate`)

- Preconditions (internal):
  - RBAC permission: `fulfillment.reship:create`
  - Approval policy check (policy key: `reship.always_requires_approval` default true in MVP)
  - Deduplication: ensure we aren’t creating multiple reships for the same “delivery exception”
- Preconditions (Shopify):
  - We can identify the relevant fulfillment order(s) and line items/quantities
- Preflight reads (Shopify):
  - Fetch fulfillment orders for an order, current status, and remaining fulfillable quantities
- Mutation:
  - `fulfillmentCreate(fulfillment: FulfillmentInput!, message: String)`
  - Evidence: `https://shopify.dev/docs/api/admin-graphql/latest/objects/Fulfillment`
- Postconditions:
  - Emit `OrderEvent`:
    - `ACTION_ATTEMPTED` / `ACTION_SUCCEEDED|FAILED`
    - `FULFILLMENT_CREATED` and/or `LABEL_CREATED` (if tracking info is provided)
  - Persist `audit_log` entries

#### Action: `CANCEL_FULFILLMENT` (Shopify `fulfillmentCancel`)

- Preconditions (internal):
  - RBAC permission: `fulfillment.cancel`
  - Approval policy check (policy key: `fulfillment.cancel_requires_approval` recommended true in MVP if fulfillment is already in progress)
- Preconditions (Shopify):
  - We have `fulfillmentId` (Shopify GID)
- Mutation:
  - `fulfillmentCancel(id: ID!)`
  - Evidence: `https://shopify.dev/docs/api/admin-graphql/latest/objects/Fulfillment`
- Postconditions:
  - Emit `OrderEvent`: `FULFILLMENT_CANCELED` + action attempt/success/fail events
  - Persist `audit_log` entries

### Policy keys (v1) — approvals/risk controls (config-driven)

Goal: turn “$X” and “always approval” into explicit keys that can be configured per tenant.

- `refund.amount_threshold` (money)
- `store_credit.amount_threshold` (money)
- `risk.high_value_order_amount_threshold` (money)
- `risk.new_customer_days_threshold` (int)
- `reship.always_requires_approval` (bool)
- `reship.max_reships_per_order` (int)
- `fulfillment.cancel_requires_approval` (bool)
- `returns.high_risk_requires_review` (bool)
- `returns.window_days` (int)
- `returns.max_returns_per_customer_window` (int)
- `returns.repeat_returns_window_days` (int)
- `returns.repeat_returns_count_threshold` (int)
- `returns.label_unused_days_threshold` (int)
- `returns.package_not_received_days_threshold` (int)
- `refund.max_refunds_per_order` (int)
- `exceptions.unknown_stop_after_attempts` (int)
- `exceptions.max_attempts` (int)
- `exceptions.auto_retry_enabled` (bool)
- `exceptions.auto_retry_backoff_schedule_minutes` (int[])

Recommended defaults (MVP)

Goal: ship safe-by-default behavior that doesn’t spam retries or create runaway loops.

Profile A — Conservative (recommended for first merchants)
- Approvals + risk heuristics:
  - `refund.amount_threshold`: 50
  - `store_credit.amount_threshold`: 50
  - `risk.high_value_order_amount_threshold`: 300
  - `risk.new_customer_days_threshold`: 30
  - `reship.always_requires_approval`: true
  - `reship.max_reships_per_order`: 1
  - `refund.max_refunds_per_order`: 1
  - `returns.window_days`: 30
  - `returns.max_returns_per_customer_window`: 3
  - `returns.repeat_returns_window_days`: 90
  - `returns.repeat_returns_count_threshold`: 2
- `exceptions.max_attempts`: 5
- `exceptions.unknown_stop_after_attempts`: 3
- `exceptions.auto_retry_enabled`: false
- `exceptions.auto_retry_backoff_schedule_minutes`: [1, 5, 15, 60, 360]
- Rationale:
  - UNKNOWN errors require operator-initiated retry only (prevents harmful loops)
  - auto-retry off avoids accidental “refund/fulfillment spam” while we harden idempotency + correlation

Profile B — Balanced (for mature ops teams after confidence)
- Approvals + risk heuristics:
  - `refund.amount_threshold`: 100
  - `store_credit.amount_threshold`: 100
  - `risk.high_value_order_amount_threshold`: 500
  - `risk.new_customer_days_threshold`: 14
  - `reship.always_requires_approval`: true
  - `reship.max_reships_per_order`: 2
  - `refund.max_refunds_per_order`: 2
  - `returns.window_days`: 45
  - `returns.max_returns_per_customer_window`: 5
  - `returns.repeat_returns_window_days`: 90
  - `returns.repeat_returns_count_threshold`: 3
- `exceptions.max_attempts`: 5
- `exceptions.unknown_stop_after_attempts`: 2
- `exceptions.auto_retry_enabled`: true (only for `RATE_LIMITED` and `TRANSIENT` classes)
- `exceptions.auto_retry_backoff_schedule_minutes`: [1, 10, 30, 120, 720]
- Guardrails:
  - Never auto-retry for `AUTH`, `VALIDATION`, `BUSINESS_RULE`, or `UNKNOWN`
  - Auto-retry must still honor idempotency (if an action succeeded for the same `idempotency_key`, close the exception)

Where to use these:
- Conservative defaults should be the “new tenant” baseline.
- Balanced defaults can be an opt-in toggle after we’ve validated idempotency + audit completeness on real traffic.

Notes:
- These defaults are intentionally simple and should be tuned per-merchant based on observed abuse/COGS.
- Even in “Balanced”, keep `reship.always_requires_approval=true` until we have strong delivery-exception evidence ingestion and per-tenant loss controls.

## ✅ Validated Shopify Admin GraphQL starter snippets (v1)

Purpose: copy/paste-ready operations for the first “safe actions”. These are schema-validated (no hallucinated fields).

Notes:
- Replace IDs with Shopify GIDs.
- Always pass idempotency/correlation at our app layer; Shopify mutations here won’t enforce those semantics for us.
- Evidence: Shopify Admin API schema validation (tool-based, not manual).

### Preflight reads → IDs produced (per action)

Purpose: make action execution deterministic by ensuring we have all required Shopify IDs before calling mutations.

Legend:
- “Preflight read” = Shopify query we run to gather/memoize IDs and current state.
- “IDs produced” = identifiers that should be persisted in our order context snapshot / timeline cache.

1) `REFUND_PAYMENT` (refundCreate)
- Preflight read: `order(id: ...)` including:
  - `transactions` to discover `OrderTransaction.id` and the correct `parentTransaction` chain
  - `lineItems` (if partial refunds are supported)
- IDs produced:
  - `orderId`
  - `orderTransactionId` (candidate parent transaction)
  - `lineItemId` (if partial)
- Reference:
  - Order query: `https://shopify.dev/docs/api/admin-graphql/latest/queries/order`
  - OrderTransaction object: `https://shopify.dev/docs/api/admin-graphql/latest/objects/OrderTransaction`

2) `START_RETURN_REQUEST` (returnRequest / returnCreate)
- Preflight read: `returnableFulfillments(orderId: ...)` to discover eligible return items
- IDs produced:
  - `orderId`
  - `fulfillmentLineItemId` (required by `ReturnRequestLineItemInput`)
- Reference:
  - returnableFulfillments query: `https://shopify.dev/docs/api/admin-graphql/latest/queries/returnableFulfillments`

3) `APPROVE_RETURN` / `DECLINE_RETURN`
- Preflight read: `return(id: ...)` (optional; to confirm current status = `REQUESTED` and to render context)
- IDs produced:
  - `returnId`
  - (optional) `returnLineItemId` / exchange ids for display
- Reference:
  - return query/object: `https://shopify.dev/docs/api/admin-graphql/latest/objects/Return`

4) `ISSUE_STORE_CREDIT` (giftCardCreate)
- Preflight read: `order(id: ...)` to fetch `customer { id }` (or lookup by email in support context)
- IDs produced:
  - `customerId`
  - `orderId` (for linking audit/timeline)
- Reference:
  - Order query: `https://shopify.dev/docs/api/admin-graphql/latest/queries/order`
  - GiftCard object: `https://shopify.dev/docs/api/admin-graphql/latest/objects/GiftCard`

5) `RESHIP_ORDER` (fulfillmentCreate)
- Preflight read (preferred): `order(id: ...) { fulfillmentOrders(...) }` to discover fulfillment order IDs and line items/remaining quantity for a specific order
- Preflight read (fallback): `fulfillmentOrders(query: ...)` for queue-style scans (by status/time/location), then filter client-side
- IDs produced:
  - `fulfillmentOrderId`
  - `fulfillmentOrderLineItemId` (if needed by fulfillment inputs)
  - `locationId` (via assigned location)
- Reference:
  - Order.fulfillmentOrders connection is available (schema validated)
  - fulfillmentOrders query: `https://shopify.dev/docs/api/admin-graphql/latest/queries/fulfillmentOrders`
  - FulfillmentOrder object: `https://shopify.dev/docs/api/admin-graphql/latest/objects/FulfillmentOrder`

6) `CANCEL_FULFILLMENT` (fulfillmentCancel)
- Preflight read: `order(id: ...)` including fulfillments list (or `fulfillmentOrder(id: ...)`) to locate the specific `Fulfillment.id`
- IDs produced:
  - `fulfillmentId`
  - `orderId`
- Reference:
  - Fulfillment object/mutations: `https://shopify.dev/docs/api/admin-graphql/latest/objects/Fulfillment`

### ✅ Validated preflight GraphQL query snippets (v1)

Purpose: copy/paste-ready preflight reads that hydrate IDs/state for the action runner. These are schema-validated.

#### Order context preflight: `order(id: ...)` (transactions + customer + line items)

```graphql
query OrderPreflight($id: ID!) {
  order(id: $id) {
    id
    customer {
      id
    }
    transactions(first: 10) {
      id
      kind
      status
      parentTransaction {
        id
      }
      amountSet {
        shopMoney {
          amount
          currencyCode
        }
      }
    }
    lineItems(first: 5) {
      nodes {
        id
        quantity
      }
    }
  }
}
```

Example variables:

```json
{ "id": "gid://shopify/Order/625362839" }
```

Docs: `https://shopify.dev/docs/api/admin-graphql/latest/queries/order`

#### Returns eligibility preflight: `returnableFulfillments(orderId: ...)`

```graphql
query ReturnableFulfillmentsPreflight($orderId: ID!) {
  returnableFulfillments(orderId: $orderId, first: 10) {
    nodes {
      id
      fulfillment {
        id
      }
      returnableFulfillmentLineItems(first: 50) {
        nodes {
          quantity
          fulfillmentLineItem {
            id
            quantity
          }
        }
      }
    }
  }
}
```

Example variables:

```json
{ "orderId": "gid://shopify/Order/625362839" }
```

Docs: `https://shopify.dev/docs/api/admin-graphql/latest/queries/returnableFulfillments`

#### Fulfillment order preflight (preferred): `order(id: ...) { fulfillmentOrders(...) }`

```graphql
query OrderFulfillmentOrdersPreflight($id: ID!) {
  order(id: $id) {
    id
    fulfillmentOrders(first: 10) {
      nodes {
        id
        status
        requestStatus
        assignedLocation {
          location {
            id
          }
        }
        lineItems(first: 10) {
          nodes {
            id
            remainingQuantity
            totalQuantity
            lineItem {
              id
            }
          }
        }
        supportedActions {
          action
        }
      }
    }
  }
}
```

Example variables:

```json
{ "id": "gid://shopify/Order/625362839" }
```

Docs: `https://shopify.dev/docs/api/admin-graphql/latest/queries/order`

#### Fulfillment order scan (fallback): `fulfillmentOrders(query: ...)` (queue view)

Notes:
- The searchable fields for `fulfillmentOrders(query: ...)` are limited (for example: `status`, `updated_at`, `assigned_location_id`, id range). See the query docs for the canonical list.
- Prefer this only when you intentionally want a cross-order queue (for example: “all OPEN fulfillment orders at location X”).

```graphql
query FulfillmentOrdersQueuePreflight($query: String!) {
  fulfillmentOrders(first: 10, query: $query) {
    nodes {
      id
      status
      orderId
      assignedLocation {
        location {
          id
        }
      }
      lineItems(first: 10) {
        nodes {
          id
          remainingQuantity
          totalQuantity
          lineItem {
            id
          }
        }
      }
      supportedActions {
        action
      }
    }
  }
}
```

Example variables (pick from supported fields; these are safe templates):

```json
{ "query": "status:OPEN" }
```

```json
{ "query": "status:OPEN updated_at:>'2025-01-01T00:00:00Z'" }
```

Docs: `https://shopify.dev/docs/api/admin-graphql/latest/queries/fulfillmentOrders`

#### Return context preflight: `return(id: ...)` (status + line items)

```graphql
query ReturnPreflight($id: ID!) {
  return(id: $id) {
    id
    status
    order {
      id
    }
    totalQuantity
    returnLineItems(first: 10) {
      nodes {
        ... on ReturnLineItem {
          id
          quantity
          refundableQuantity
          fulfillmentLineItem {
            id
          }
        }
      }
    }
  }
}
```

Example variables:

```json
{ "id": "gid://shopify/Return/945000961" }
```

Docs: `https://shopify.dev/docs/api/admin-graphql/latest/objects/Return`

### Refund: `refundCreate`

```graphql
mutation RefundCreate($input: RefundInput!) {
  refundCreate(input: $input) {
    refund {
      id
      createdAt
      totalRefundedSet {
        shopMoney {
          amount
          currencyCode
        }
      }
    }
    order {
      id
    }
    userErrors {
      field
      message
    }
  }
}
```

Example variables (minimal; adjust to your refund logic):

```json
{
  "input": {
    "orderId": "gid://shopify/Order/625362839",
    "notify": false,
    "note": "Refund issued via Ops Action Center",
    "transactions": [
      {
        "parentId": "gid://shopify/OrderTransaction/1234567890",
        "amount": "10.00",
        "kind": "REFUND"
      }
    ]
  }
}
```

ID provenance (where these IDs come from in our system):
- `orderId`: from Order timeline ingestion (Shopify `Order.id`), stored in our canonical order record and referenced by `customer_timeline_events` / `OrderEvent`.
- `parentId` (transaction): from Order payments/transactions ingestion; store as part of our “payment context” for the order so the action runner can select the correct parent transaction deterministically.

Docs: `https://shopify.dev/docs/api/admin-graphql/latest/mutations/refundCreate`

### Returns: `returnRequest` (creates `Return.status = REQUESTED`)

```graphql
mutation ReturnRequest($input: ReturnRequestInput!) {
  returnRequest(input: $input) {
    return {
      id
      status
      totalQuantity
      order {
        id
      }
    }
    userErrors {
      field
      message
      code
    }
  }
}
```

Example variables (minimal; note `fulfillmentLineItemId` is required):

```json
{
  "input": {
    "orderId": "gid://shopify/Order/625362839",
    "returnLineItems": [
      {
        "fulfillmentLineItemId": "gid://shopify/FulfillmentLineItem/820022594",
        "quantity": 1,
        "returnReason": "WRONG_ITEM",
        "customerNote": "Ordered the wrong size; would like to exchange."
      }
    ]
  }
}
```

ID provenance (where these IDs come from in our system):
- `orderId`: from Order timeline ingestion (Shopify `Order.id`).
- `fulfillmentLineItemId`: from the returns preflight read (`returnableFulfillments(orderId: ...)`) and/or fulfillment ingestion; we should persist this mapping on the order so return initiation doesn’t require re-deriving IDs from UI selections.
- `returnReason` / `customerNote`: from the returns portal request (customer) or agent-entered notes in the action center; store in our internal return request record and mirror onto Shopify mutation inputs.

Docs: `https://shopify.dev/docs/api/admin-graphql/latest/mutations/returnRequest`

### Store credit mechanism: `giftCardCreate`

```graphql
mutation GiftCardCreate($input: GiftCardCreateInput!) {
  giftCardCreate(input: $input) {
    giftCard {
      id
      initialValue {
        amount
        currencyCode
      }
      balance {
        amount
        currencyCode
      }
      customer {
        id
      }
      createdAt
    }
    giftCardCode
    userErrors {
      field
      message
      code
    }
  }
}
```

Example variables (attach to a customer to keep it auditable):

```json
{
  "input": {
    "initialValue": "25.00",
    "customerId": "gid://shopify/Customer/1234567890",
    "note": "Store credit issued for return resolution"
  }
}
```

ID provenance (where these IDs come from in our system):
- `customerId`: from Order timeline ingestion (Shopify `Customer.id`) linked to the order; also resolvable from the support ticket’s customer identity match.
- `initialValue` / `note`: derived from the internal resolution decision (policy outcome + approvals); store in `action_center_actions.payload_json` and mirror into the mutation input after approval.

Docs: `https://shopify.dev/docs/api/admin-graphql/latest/mutations/giftCardCreate`

### Reship / fulfillment: `fulfillmentCreate`

```graphql
mutation FulfillmentCreate($fulfillment: FulfillmentInput!, $message: String) {
  fulfillmentCreate(fulfillment: $fulfillment, message: $message) {
    fulfillment {
      id
      status
      trackingInfo(first: 1) {
        number
        company
        url
      }
      createdAt
    }
    userErrors {
      field
      message
    }
  }
}
```

Example variables (illustrative; actual `FulfillmentInput` is fulfillment-order-driven):

```json
{
  "fulfillment": {
    "notifyCustomer": false,
    "trackingInfo": {
      "number": "1Z999AA10123456784",
      "company": "UPS",
      "url": "https://www.ups.com/track?loc=en_US&tracknum=1Z999AA10123456784"
    }
  },
  "message": "Reship created via Ops Action Center"
}
```

ID provenance (where these IDs come from in our system):
- `fulfillment` payload details: built from the reship decision (which items/quantities) + fulfillment-order context; in practice, reship requires knowing fulfillment orders/line items from Shopify fulfillment ingestion.
- `trackingInfo`: comes from the label purchase step (carrier integration) OR is left blank if Shopify generates it later; persist the label/tracking metadata as timeline events (`LABEL_CREATED`, `SHIPMENT_IN_TRANSIT`, etc.).

Docs: `https://shopify.dev/docs/api/admin-graphql/latest/mutations/fulfillmentCreate`

## 🔁 Return request state machine (v1) + exception reasons

Goal: make returns operationally “queue-first” with clear status and next actions.

States (suggested):
- `DRAFT` (created but not submitted)
- `REQUESTED` (customer submitted)
- `NEEDS_REVIEW` (manual review queue; risk/policy exceptions)
- `APPROVED`
- `DENIED`
- `LABEL_ISSUED`
- `IN_TRANSIT`
- `RECEIVED`
- `INSPECTED` (optional; if condition checks matter)
- `RESOLUTION_PENDING` (waiting on refund/exchange/credit execution)
- `RESOLVED`
- `CANCELED`
- `EXPIRED` (label unused / window passed)

Core transitions (examples):
- `REQUESTED` → `APPROVED` (policy pass) OR → `NEEDS_REVIEW` (risk flags) OR → `DENIED` (policy fail)
- `APPROVED` → `LABEL_ISSUED` (label created)
- `LABEL_ISSUED` → `IN_TRANSIT` (carrier scan)
- `IN_TRANSIT` → `RECEIVED` (delivered to warehouse)
- `RECEIVED` → `INSPECTED` (if inspection required) OR → `RESOLUTION_PENDING`
- `RESOLUTION_PENDING` → `RESOLVED` (refund/exchange/credit done)

Resolution types (v1):
- `EXCHANGE`
- `STORE_CREDIT`
- `REFUND`

Exception reasons (drive the exception queue):
- Eligibility: `OUT_OF_WINDOW`, `FINAL_SALE`, `NON_RETURNABLE_ITEM`, `MISSING_ITEM_DATA`
- Risk/abuse: `HIGH_RISK_ORDER`, `REPEAT_RETURNS`, `ADDRESS_MISMATCH`
- Shipping/label: `LABEL_PURCHASE_FAILED`, `NO_CARRIER_RATE`, `ADDRESS_VALIDATION_FAILED`
- Lifecycle: `LABEL_UNUSED_N_DAYS`, `PACKAGE_NOT_RECEIVED_N_DAYS`, `RETURN_RECEIVED_BUT_UNINSPECTED`
- Refund: `REFUND_PROVIDER_ERROR`, `REFUND_REQUIRES_APPROVAL`, `REFUND_STUCK`

Evidence anchors:
- Returns routing/policy framing: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/returngo.md`
- Exchange-first customer journey framing: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/loop-returns.md`

## ✅ Definition of “done” (for a 1-week MVP)

- Ticket list + ticket detail + read-only order context panel shipped.
- Exceptions queue list + exception detail + run history shipped.
- One safe action shipped (create internal task) + full audit log.
- Retry flow shipped for one exception type (automation webhook retry).
