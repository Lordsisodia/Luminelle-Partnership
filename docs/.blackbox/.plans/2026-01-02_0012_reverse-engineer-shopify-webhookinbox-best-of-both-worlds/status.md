# Status (frequently updated)

## Timestamp
2026-01-02 00:12

## Phase
explore

## What changed since last update
- Confirmed canonical ingress is `/api/shopify/webhooks/*` (Shopify config + docs).
- Captured current webhook inventory + drift signals (id header selection, schema minimalism, runtime duplication).

## Next actions (1–3)
1) Confirm production webhook runtime(s) (api vs functions) and which headers Shopify actually sends (`Webhook-Id` vs `Delivery-Id`).
2) Write a gap list + Phase 1 upgrade scope (schema additions + verification parity).
3) Add golden tests/fixtures for verification + replay.

## Pointers
- Plan folder: `docs/.blackbox/.plans/2026-01-02_0012_reverse-engineer-shopify-webhookinbox-best-of-both-worlds/`
- Rankings: `rankings.md`
- Artifact map: `artifact-map.md`
