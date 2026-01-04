# Gap list (WebhookInbox) — ours vs “best-of-both-worlds”

Captured: `2026-01-02`

This is the actionable delta between:
- what we have today (works, but drift-prone), and
- a durable “WebhookInbox” subsystem (safe replay, clear outcomes, consistent behavior).

---

## 1) Idempotency key: `delivery-id` vs `webhook-id` (HIGH)

### Current
- Node handlers often use `x-shopify-delivery-id` only.
- Functions handlers sometimes fall back to `x-shopify-webhook-id` / `X-Shopify-Webhook-Id`.

### Risk
- If `delivery-id` changes per retry attempt (likely), we can duplicate side effects (emails, ledger writes, etc.).

### Recommendation
- Standardize on:
  - Primary key: `X-Shopify-Webhook-Id`
  - Uniqueness: `(shop, webhook_id)`
- Keep `delivery-id` as metadata for tracing/debug, not idempotency.

---

## 2) Inbox schema is “IDs only” (HIGH)

### Current
- `ShopWebhookDeliveries(id, received_at)` only.

### Pain
- Can’t answer “did we process it or just receive it?”
- No structured failure reasons or retry count.
- Replay tooling is hard (no status).

### Recommendation (additive)
Add columns (nullable initially):
- `shop text`
- `topic text`
- `payload_hash text`
- `status text` (`received|processed|failed`)
- `attempts int`
- `last_error text`
- `processed_at timestamptz`

Then incrementally wire code to populate them.

---

## 3) Parallel implementations drift (`api/` vs `functions/`) (HIGH)

### Current
- Shopify is configured to hit `/api/shopify/*`, but we have a second parallel implementation in `functions/`.

### Risk
- Fixes get applied to one runtime but not the other.

### Recommendation
- Keep one canonical spec + shared test fixtures.
- Implement two thin adapters if both runtimes stay alive.
- Otherwise deprecate one intentionally (decision required).

---

## 4) Non-critical work might block Shopify response (MEDIUM → HIGH)

### Observed
- In Workers we use `waitUntil(...)` for PostHog.
- In Node we often `await` network calls (PostHog, email) before responding.

### Risk
- Slow responses trigger webhook retries → amplifies idempotency risks.

### Recommendation
- Make non-critical effects best-effort and avoid holding the 200 response where possible.
- If Node runtime can’t guarantee post-response work, keep it fast + move heavy work to async processing later.

---

## 5) Topic coverage / registration drift (MEDIUM)

### Observed
- OAuth callback registers only 7 topics, but `api/shopify/webhooks/` contains additional handlers (checkouts/products).

### Risk
- Dead code + confusion, or missing subscriptions that we expect.

### Recommendation
- Confirm real subscriptions in Shopify admin (source of truth).
- Either:
  - register these topics intentionally, or
  - delete/retire the handlers (after verifying unused).

---

## 6) Table creation in request path (LOW → MEDIUM)

### Observed
- Node `api/_lib/webhooks.ts` calls `CREATE TABLE IF NOT EXISTS` during `isProcessed/markProcessed`.

### Risk
- Extra DB overhead on hot path; also masks migration drift.

### Recommendation
- If migrations are authoritative, remove runtime table creation (or run once at startup).
  - Keep only if we truly need “self-healing” in ephemeral environments.

