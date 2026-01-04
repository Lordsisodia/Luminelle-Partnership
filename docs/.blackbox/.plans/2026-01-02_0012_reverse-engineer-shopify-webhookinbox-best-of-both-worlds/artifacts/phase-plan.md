# Phase plan (WebhookInbox) — best-of-both-worlds

Captured: `2026-01-02`

This is the long-term rollout plan that keeps the app stable while we upgrade the system.

---

## Phase 0 — Baseline + parity map (1–2 days)

Goals:
- Make the current behavior explicit (no hidden assumptions).
- Stop drift by writing down invariants + contracts + tests.

Deliverables:
- `artifacts/current-inventory.md` (done)
- `artifacts/gap-list.md` (done)
- A “golden fixtures” set (valid/invalid signature + replay)

---

## Phase 1 — Additive inbox records (Week 1)

Goals:
- Turn `ShopWebhookDeliveries` into a real inbox record without breaking existing code.
- Capture outcomes and reasons.

Changes:
- Add columns (nullable) to `ShopWebhookDeliveries`:
  - `shop`, `topic`, `payload_hash`, `status`, `attempts`, `last_error`, `processed_at`
- Keep current `id`-only usage working.

Success:
- For every delivery: we can see `received` → `processed|failed` with timestamps.

---

## Phase 2 — Verification + idempotency parity (Weeks 2–3)

Goals:
- Make `api/` and `functions/` behave the same.

Changes:
- Standardize on the idempotency key:
  - primary: `X-Shopify-Webhook-Id`
  - uniqueness: `(shop, webhook_id)`
- Keep `delivery-id` stored as metadata only.

Success:
- Replayed delivery never duplicates side effects.
- Logs clearly show why verification failed (without secrets).

---

## Phase 3 — Replay tooling + ops surface (Weeks 3–6)

Goals:
- Give humans safe ways to recover from failures/outages.

Changes:
- Add replay endpoints / scripts:
  - replay by webhook id
  - replay by topic/time window
- Add a lightweight “failed deliveries” report/view.

Success:
- On-call can resolve webhook failures without guessing.

---

## Phase 4 — Split ingress from processing (when ready)

Goals:
- Fast 200 responses to Shopify; async processing with retries and dead-letter.

Changes:
- Ingress does: verify + store + enqueue
- Worker/job does: dispatch handler + mark processed/failed + retry policy

Success:
- Timeouts drop; retries are controlled; processing is observable.

---

## Phase 5 — Upstream PRs to OSS references (optional, ongoing)

Goal:
- Upgrade the ecosystem and keep our patterns aligned with community best practices.

Safe upstream candidates:
- tests for HMAC verification edge cases
- docs for idempotency/replay patterns
- optional idempotency helper abstractions

