# Summary

## Key takeaways
- Shopify “AI to GitHub” discovery is now less valuable than **mining + contracts**: the biggest wins come from turning a few high-signal repos into stable primitives.
- Shopify integration should be treated as a small set of primitives we implement once:
  - `ShopifyAuth` (install + re-auth)
  - `SessionStore` (encrypted, durable)
  - `RequestVerifier` (session token/JWT validation + CSP)
  - `WebhookInbox` (raw body, HMAC, dedupe, replay)
  - `AppProxyVerifier` (query-string signature verification)
  - `AdminGraphQLProxy` (optional, but pragmatic)
- `kinngh/shopify-nextjs-prisma-app` is the clearest end-to-end reference for: token exchange (online/offline), Prisma session storage, and webhook/proxy routes.
- `carstenlebek/shopify-node-app-starter` is the cleanest TypeScript reference for: Next.js middleware gating, webhook registry processing, and Redis-backed session storage.

## Recommendation
- Stop running broad discovery loops for this domain.
- Execute 1-day “mining POCs” for the two Shopify app starter repos and write the extracted primitives into our own internal interfaces + DB schema.
- Keep license-gating early: do not promote `verify/NOASSERTION` to `poc` without a verification report.

## Links
- Run folder: `docs/.blackbox/.plans/2025-12-31_2022_shopify-app-primitives-mining-oauth-sessions-webhooks/`
- Blueprint: `docs/.blackbox/oss-catalog/shopify-app-primitives.md`
- Source map: `docs/.blackbox/oss-catalog/component-source-map.md`
- Reliability lane: `docs/.blackbox/oss-catalog/lanes/reliability-webhooks-idempotency.md`
