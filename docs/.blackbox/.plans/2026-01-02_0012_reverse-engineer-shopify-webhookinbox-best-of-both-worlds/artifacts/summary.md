# Summary

## Key takeaways
- We already have a functioning Shopify webhook system, but it exists in **two parallel implementations**:
  - Node/Vercel-style: `api/shopify/webhooks/*`
  - Worker/Functions-style: `functions/api/shopify/webhooks/*`
- Both implementations already do the “core job” (verify + process + dedupe), but:
  - verification logic is duplicated (risk: drift)
  - idempotency store is minimal (“IDs only”) (risk: weak replay/debuggability)
  - id header selection is inconsistent (`delivery-id` vs `webhook-id` fallback) (risk: duplicate side effects)
- OSS references provide structure we can mine (no copying):
  - registry-based routing
  - explicit session/auth separation (online vs offline)
  - clearer webhook ingress patterns (raw body + HMAC + topic dispatch)

## Recommendation
- Treat **WebhookInbox** as a first-class subsystem and upgrade it in phases:
  1) Spec-first: write invariants + contracts + tests (no risky refactors)
  2) Additive schema: enrich `ShopWebhookDeliveries` into a real inbox record (status/attempts/errors)
  3) Verification parity: unify behavior across `api/` + `functions/` (including which id header we treat as canonical)
  4) Replay tooling: safe reprocessing by design (idempotency + recorded outcomes)
  5) Mature pipeline: ingress/processing split + retries/dead-letter + audit timeline integration

## Links
- Run folder: `docs/.blackbox/.plans/2026-01-02_0012_reverse-engineer-shopify-webhookinbox-best-of-both-worlds/`
- Process: `docs/.blackbox/.plans/2026-01-02_0012_reverse-engineer-shopify-webhookinbox-best-of-both-worlds/reverse-engineering-process.md`
- OSS pointers: `docs/.blackbox/oss-catalog/shopify-app-primitives.md`
