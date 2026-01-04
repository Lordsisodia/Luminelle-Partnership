# Evidence Extract — GitHub Webhooks (Ops basics: receiver SLA + secrets + redelivery)

- slug: `github-webhooks-ops-basics`
- category: webhook operational UX primitives (SLA, validation, redelivery, access control)
- license: proprietary docs/service (GitHub)

## Cycle 16 — Evidence-backed primitives (receiver SLAs + validation + redelivery)

### Notable features (3)

1) Receiver SLA is explicit: respond with 2XX within 10 seconds or GitHub treats it as failure  
Evidence: https://docs.github.com/api/article/body?pathname=/en/webhooks/using-webhooks/handling-webhook-deliveries

2) Secret token guidance: choose high-entropy secret; store securely; never hardcode  
Evidence: https://docs.github.com/api/article/body?pathname=/en/webhooks/using-webhooks/validating-webhook-deliveries

3) Redelivery is time-bounded and permission-gated (admin access required; deliveries within past 3 days)  
Evidence: https://docs.github.com/api/article/body?pathname=/en/webhooks/testing-and-troubleshooting-webhooks/redelivering-webhooks

### Copyable workflows (2)

1) Delivery handling workflow: validate signature → enqueue work → respond 2XX quickly → process asynchronously  
Evidence: receiver SLA docs: https://docs.github.com/api/article/body?pathname=/en/webhooks/using-webhooks/handling-webhook-deliveries

2) Recovery workflow: inspect past deliveries → redeliver a prior event after receiver fix (time-bounded redrive)  
Evidence: https://docs.github.com/api/article/body?pathname=/en/webhooks/testing-and-troubleshooting-webhooks/redelivering-webhooks

### 3 steal ideas (easy / medium / hard)

- Easy: “receiver checklist” in our docs/UI: verify signature, respond quickly, process asynchronously, idempotency.
- Medium: permission-gated redelivery in admin with time bounds (e.g., last 3–7 days), plus audit log of who redrove what.
- Hard: build a rich delivery viewer with payload redaction/retention controls (privacy + compliance heavy).

### Thin-slice implementation (1–3 days)

- Day 1: standard receiver contract: always enqueue then 2XX; publish code snippets and warnings.
- Day 2: add redelivery button for last N days + audit event on every redelivery.
- Day 3: add per-endpoint secret rotation + enforce secure secret storage and “never hardcode” guidance in docs.

