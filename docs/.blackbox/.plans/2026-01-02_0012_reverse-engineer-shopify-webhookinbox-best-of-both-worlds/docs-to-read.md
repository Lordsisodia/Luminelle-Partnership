# Docs To Read (and why)

- [ ] `docs/.blackbox/oss-catalog/shopify-app-primitives.md` — reference blueprint + file pointers (OAuth/sessions/webhooks)
- [ ] `docs/.blackbox/oss-catalog/lanes/reliability-webhooks-idempotency.md` — inbox/outbox/idempotency framing + terminology
- [ ] `docs/.blackbox/oss-catalog/component-source-map.md` — exact OSS file pointers (webhooks + outbox references)
- [ ] `docs/.blackbox/oss-catalog/search-focus.md` — why webhooks matter in the platform primitives stack

## In-repo code (baseline inventory)

### Node/Vercel (`api/`)
- [ ] `api/shopify/webhooks/_verify.ts` — HMAC verification + raw body reading behavior
- [ ] `api/_lib/webhooks.ts` — current idempotency storage (ShopWebhookDeliveries)
- [ ] `api/shopify/auth/callback.ts` — webhook registration on install (topics + callback paths)
- [ ] `api/shopify/webhooks/orders-create.ts` — one end-to-end handler to trace

### Workers/Functions (`functions/`)
- [ ] `functions/_lib/shopifyWebhooks.ts` — current verify logic (supports API secret + webhook secret)
- [ ] `functions/_lib/webhooks.ts` — current idempotency storage (ShopWebhookDeliveries via Supabase)
- [ ] `functions/api/shopify/auth/callback.ts` — webhook registration (topics + callback paths)
- [ ] `functions/api/shopify/webhooks/orders-create.ts` — one end-to-end handler to trace
