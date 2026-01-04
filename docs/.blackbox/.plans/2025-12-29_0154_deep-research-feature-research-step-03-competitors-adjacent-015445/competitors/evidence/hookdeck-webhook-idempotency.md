# Evidence Extract — Hookdeck (Webhook Idempotency)

- slug: `hookdeck-webhook-idempotency`
- category: receiver reliability primitives (dedupe + side-effect ordering)
- license: proprietary docs/service (Hookdeck)

## Cycle 16 — Evidence-backed primitives (idempotency strategies for “at least once” delivery)

### Notable features (3)

1) “At least once” delivery implies duplicates; receivers must be idempotent  
Evidence: https://hookdeck.com/webhooks/guides/implement-webhook-idempotency

2) Strategy: enforce a unique constraint using a stable ID from event data (e.g., `order_id`) before side effects  
Evidence: https://hookdeck.com/webhooks/guides/implement-webhook-idempotency

3) Strategy: track webhook history using a webhook identifier header (example: `X-Shopify-Webhook-Id`) with a `processed_webhooks` table + unique constraint  
Evidence: https://hookdeck.com/webhooks/guides/implement-webhook-idempotency

### Copyable workflows (2)

1) Safe side-effects ordering: write idempotency record first → then perform side effects (email, fulfillment) → return 2XX even for duplicates  
Evidence: https://hookdeck.com/webhooks/guides/implement-webhook-idempotency

2) Receiver debugging: maintain `processed_webhooks` status table (received/processed/failed) and use it to power internal admin debugging + replay safety  
Evidence: https://hookdeck.com/webhooks/guides/implement-webhook-idempotency

### 3 steal ideas (easy / medium / hard)

- Easy: require every webhook/event handler to declare its idempotency key strategy (event-id vs resource-id).
- Medium: build a shared “idempotency middleware” that stores the idempotency key and prevents duplicate side effects.
- Hard: expose an admin “processed events” table for operators with replay and status transitions (ties to approvals + audit).

### Thin-slice implementation (1–3 days)

- Day 1: create `processed_events` table with unique constraint on `(tenant_id, idempotency_key)` and a status field.
- Day 2: add handler wrapper: if insert fails (duplicate) → short-circuit to `2XX already_processed`.
- Day 3: add admin UI for `processed_events` + link to delivery attempts log + manual “replay” action.

