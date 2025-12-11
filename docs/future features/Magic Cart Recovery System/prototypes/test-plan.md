# Magic Cart Recovery — Prototype Test Plan (unit-level)
Scope: Tests can live in `docs/.../prototypes/tests` or be copied into app tests later. No runtime impact now.

## Units
1) Token
   - sign/verify round-trip succeeds.
   - expired token rejected.
   - tampered token rejected (body or sig).
2) StoreV2 migrate
   - legacy `lumelle_cart` + `lumelle_shopify_cart_id` migrates to v2 state.
   - TTL expiry forces empty state.
3) Reconcile
   - qty/price adjustments flagged.
   - removed lines flagged.
   - lines present only on Shopify are added.
4) Queue
   - enqueue adds UUID and ts.
   - markSuccess pops head.
   - markFailure retries until max, then drops.
5) Share/restore handlers
   - return 404 when flag off (test added).
   - missing token/cart returns 400 (test added).
   - invalid/expired token returns 401 (test added).
   - valid token returns 200 (test added).
6) Cron logic
   - no-op when flag off.
   - processes a due job, schedules next cadence, logs events.
   - on send failure, backoff and eventually marks failed.

## Integration (later, optional)
- Restore API replays snapshot into mocked Shopify client and returns checkoutUrl.
- Cron + Supabase mock + Resend mock end-to-end for one job.

## Tooling notes
- Can be run with Vitest/Jest in isolation; mocks for crypto, Date.now, supabase, resend.
- Keep tests in docs/prototypes until we’re ready to wire to the app.
