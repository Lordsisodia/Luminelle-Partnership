# Notes / Revisions

- 2026-01-02: Picked WebhookInbox as the first reverse-engineering target (highest leverage).
- 2026-01-02: Confirmed canonical Shopify endpoints point to `/api/shopify/*` (from `shopify.app.toml` + `server/README.md` + `docs/02-engineering/technical/shopify-architecture.md`).
- 2026-01-02: Identified key drift signals:
  - Two parallel implementations exist (`api/` vs `functions/`).
  - Idempotency header selection is inconsistent (`x-shopify-delivery-id` vs `x-shopify-webhook-id` fallback).
  - Inbox storage schema is minimal (`ShopWebhookDeliveries`: id + received_at) which limits replay/diagnosis.
- 2026-01-02: Created a reusable reverse-engineering process doc and a first inventory snapshot under `artifacts/current-inventory.md`.
