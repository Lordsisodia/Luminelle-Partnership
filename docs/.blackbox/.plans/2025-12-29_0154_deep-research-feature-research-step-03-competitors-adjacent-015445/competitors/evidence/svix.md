# Evidence Extract — Svix

- slug: `svix`
- category: webhook sending + reliability + security + debugging
- license: MIT (svix-webhooks OSS server) + SaaS offering

## Cycle 15 — Evidence-backed primitives (webhook delivery platform)

### Notable features (3)

1) Delivery retries with exponential backoff (documented retry schedule)  
Evidence: https://docs.svix.com/retries/

2) Webhook security guidance (HMAC-SHA256 signing, timestamps, replay attack prevention)  
Evidence: https://docs.svix.com/security

3) Webhook verification docs exist for consumers (signature verification of payloads)  
Evidence: https://docs.svix.com/receiving/verifying-payloads/

### Copyable workflows (2)

1) Consumer verification workflow: receive webhook → validate signature + timestamp tolerance → reject invalid / replayed payloads  
Evidence: https://docs.svix.com/receiving/verifying-payloads/

2) Debug workflow: use a webhook playground/debugger to inspect requests and validate integration behavior quickly  
Evidence: https://docs.svix.com/play/

### 3 steal ideas (easy / medium / hard)

- Easy: ship a “delivery attempts” table per webhook endpoint (status code, latency, response body snippet, headers).
- Medium: default signing scheme includes timestamp + idempotency key; enforce verification in SDK snippets (reduces insecure consumers).  
  Evidence: signing + timestamp guidance: https://docs.svix.com/security
- Hard: make webhook delivery a first-class platform primitive (retry schedules, rate limits, endpoint health scoring, and replay protection) rather than ad-hoc webhooks.

### Thin-slice implementation (1–3 days)

- Day 1: implement outbound webhooks with signing (HMAC) + timestamp + delivery log table.
- Day 2: add retries with exponential backoff + “disable endpoint after N consecutive failures”.
- Day 3: add “debugger mode” (inspect last 50 deliveries) + manual “redeliver event” button.

## License evidence

- MIT license (svix-webhooks): https://raw.githubusercontent.com/svix/svix-webhooks/main/LICENSE

