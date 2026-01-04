# Work Queue

## Next actions (keep 5–10)
- [ ] Confirm production webhook ingress path(s): `api/shopify/webhooks/*` vs `functions/api/shopify/webhooks/*`
- [ ] Make an inventory table of current Shopify webhook topics → handler file → side effects (DB writes)
- [ ] Diff verification behavior (`api/shopify/webhooks/_verify.ts` vs `functions/_lib/shopifyWebhooks.ts`)
- [ ] Diff idempotency behavior (`api/_lib/webhooks.ts` vs `functions/_lib/webhooks.ts`)
- [ ] Draft canonical inbox schema (additive columns) + decide unique key: `(shop, webhook_id)` vs `webhook_id`
- [ ] Write “WebhookInbox Spec Pack” in `artifacts/summary.md` (invariants + failure modes + contracts)
- [ ] Identify 1–2 OSS upstream PR opportunities (tests/docs for webhook verification + idempotency)
