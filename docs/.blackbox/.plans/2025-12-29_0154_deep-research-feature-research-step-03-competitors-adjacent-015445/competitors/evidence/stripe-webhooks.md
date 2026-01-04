# Evidence Extract — Stripe Webhooks

- slug: `stripe-webhooks`
- category: webhook signing + endpoint configuration + best practices (gold standard UX patterns)
- license: proprietary docs/service (Stripe)

## Cycle 15 — Evidence-backed primitives (security + operational best practices)

### Notable features (3)

1) Webhook endpoints are a productized integration surface (events to an HTTPS endpoint)  
Evidence: https://docs.stripe.com/webhooks

2) Signature verification is explicitly documented (signatures endpoint)  
Evidence: https://docs.stripe.com/webhooks/signatures

3) Best practices guidance exists for webhook handling (operational guidance is part of product surface)  
Evidence: https://docs.stripe.com/webhooks/best-practices

### Copyable workflows (2)

1) Secure receiving workflow: receive event → verify signature → process event → respond quickly (avoid delivery failures)  
Evidence: https://docs.stripe.com/webhooks/signatures and https://docs.stripe.com/webhooks/best-practices

2) Integrations UX workflow: create endpoint → select events → monitor deliveries → rotate secrets when needed  
Evidence: https://docs.stripe.com/webhooks

### 3 steal ideas (easy / medium / hard)

- Easy: document signature verification as “default” for consumers (include code snippets + failure modes).
- Medium: include event selection UI + per-endpoint secret rotation and surfacing the secret lifecycle.
- Hard: build a Stripe-like “events/deliveries explorer” inside admin (powerful but more build time).

### Thin-slice implementation (1–3 days)

- Day 1: implement webhook endpoints (URL + enabled/disabled + event types) and signing secret.
- Day 2: implement delivery logs + retries + redelivery button.
- Day 3: implement secret rotation workflow + audit events for all webhook config changes.

