# Success Metrics

Define what “good” looks like for this run.

- Decision(s) enabled:
  - ✅ Which runtime(s) are canonical for Shopify webhooks (and why)
  - ✅ Canonical inbox storage choice (Supabase vs Postgres vs both)
  - ✅ Canonical idempotency key (recommended: `(shop, webhook_id)`)
  - ✅ Phase 1 upgrade scope + rollout plan
- Quality bar:
  - 🔐 Verification parity: same behavior across runtimes (headers + secrets + raw body)
  - 🧾 Inbox completeness: 100% of deliveries persist an outcome (received/processed/failed)
  - 🔁 Idempotency: replaying the same webhook id produces **no duplicate side effects**
  - 🧯 Failure visibility: failed deliveries record `last_error` + `attempts` + timestamps
  - 🧪 Golden tests: fixtures cover valid/invalid signature + replay + handler throw
  - 📈 Observability: per-topic counts + latency + error rate can be tracked over time
