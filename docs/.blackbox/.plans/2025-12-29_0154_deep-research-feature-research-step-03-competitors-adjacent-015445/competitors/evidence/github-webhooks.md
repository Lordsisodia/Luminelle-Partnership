# Evidence Extract — GitHub Webhooks

- slug: `github-webhooks`
- category: webhooks delivery + validation + redelivery patterns
- license: proprietary docs/service (GitHub)

## Cycle 15 — Evidence-backed primitives (delivery SLAs + secret validation + redelivery)

### Notable features (3)

1) Receiver SLA guidance: webhook receivers should respond with a 2XX quickly; GitHub terminates slow connections and marks delivery as failure  
Evidence: https://docs.github.com/en/webhooks/using-webhooks/handling-webhook-deliveries

2) Secret-based signature validation (HMAC SHA-256) with documented header and examples  
Evidence: https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries

3) Redelivery is a first-class workflow (support/debug primitive)  
Evidence: https://docs.github.com/en/webhooks/testing-and-troubleshooting-webhooks/redelivering-webhooks

### Copyable workflows (2)

1) Validate deliveries workflow: configure secret → verify signature per request → reject invalid payloads  
Evidence: https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries

2) Debug/ops workflow: inspect deliveries → redeliver a previous delivery after fixing receiver issues  
Evidence: https://docs.github.com/en/webhooks/testing-and-troubleshooting-webhooks/redelivering-webhooks

### 3 steal ideas (easy / medium / hard)

- Easy: publish a “receiver checklist” inside our docs/UI (respond quickly, idempotency, signature verification).
- Medium: include a redelivery UI that lets admins resend a past event, with correlation IDs for debugging.
- Hard: build an equivalent “delivery viewer” UX with full request/response capture (privacy redaction needed).

### Thin-slice implementation (1–3 days)

- Day 1: webhook endpoint model + signing secret; implement request signing on outbound.
- Day 2: delivery attempts log (status, response time, response code) + redeliver button.
- Day 3: add “receiver health” state (auto-disable after N failures) + approval to re-enable.

