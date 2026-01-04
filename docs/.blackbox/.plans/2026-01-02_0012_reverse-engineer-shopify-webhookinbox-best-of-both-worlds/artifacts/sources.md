# Sources

## In-repo (our current implementation)

- `shopify.app.toml`
  - Supports: Shopify app is configured to use `/api/shopify/*` paths (redirect + proxy), implying canonical ingress
  - Accessed: 2026-01-02
  - Confidence: High

- `server/README.md`
  - Supports: statement that Shopify webhooks live under `api/shopify/webhooks/*`
  - Accessed: 2026-01-02
  - Confidence: High

- `docs/02-engineering/technical/shopify-architecture.md`
  - Supports: architectural statement that all Shopify server logic lives under `/api/shopify/*`
  - Accessed: 2026-01-02
  - Confidence: High

- `api/shopify/webhooks/_verify.ts`
  - Supports: current Node/Vercel webhook raw body + HMAC verification logic
  - Accessed: 2026-01-02
  - Confidence: High

- `api/_lib/webhooks.ts`
  - Supports: current Node idempotency store (ShopWebhookDeliveries: id + received_at)
  - Accessed: 2026-01-02
  - Confidence: High

- `functions/_lib/shopifyWebhooks.ts`
  - Supports: current Worker/Functions webhook verification logic (supports SHOPIFY_API_SECRET + SHOPIFY_WEBHOOK_SECRET)
  - Accessed: 2026-01-02
  - Confidence: High

- `functions/_lib/webhooks.ts`
  - Supports: current Worker/Functions idempotency store (Supabase table ShopWebhookDeliveries)
  - Accessed: 2026-01-02
  - Confidence: High

- `server/migrations/2025-12-14_shopify_tables_and_metrics.sql`
  - Supports: canonical Supabase schema for `ShopWebhookDeliveries` and related Shopify mirrors
  - Accessed: 2026-01-02
  - Confidence: High

- `api/shopify/auth/callback.ts` and `functions/api/shopify/auth/callback.ts`
  - Supports: webhook registration patterns (topics + callback URLs)
  - Accessed: 2026-01-02
  - Confidence: Medium

## Internal docs (mined OSS pointers + intended primitives)

- `docs/.blackbox/oss-catalog/shopify-app-primitives.md`
  - Supports: canonical set of Shopify primitives to build (Auth, SessionStore, WebhookInbox, Proxy verifier)
  - Accessed: 2026-01-02
  - Confidence: High

- `docs/.blackbox/oss-catalog/component-source-map.md`
  - Supports: exact OSS file pointers to mine for webhook/auth patterns
  - Accessed: 2026-01-02
  - Confidence: High

- `docs/.blackbox/oss-catalog/lanes/reliability-webhooks-idempotency.md`
  - Supports: reliability lane framing (idempotency/outbox/inbox semantics)
  - Accessed: 2026-01-02
  - Confidence: Medium

## OSS references (pattern mining, no cloning)

- https://github.com/kinngh/shopify-nextjs-prisma-app
  - Supports: request verification + session storage patterns + webhook handler routing
  - Accessed: 2026-01-02
  - Confidence: Medium

- https://github.com/carstenlebek/shopify-node-app-starter
  - Supports: middleware + registry-style webhook processing + session storage patterns
  - Accessed: 2026-01-02
  - Confidence: Medium
