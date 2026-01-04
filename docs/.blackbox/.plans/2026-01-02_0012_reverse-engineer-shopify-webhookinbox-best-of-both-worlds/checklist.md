# Checklist

## Phase 0 — Orientation (fast, no code changes)

- [ ] Confirm which runtime receives Shopify webhooks in prod (`api/` vs `functions/`, or both)
- [ ] Inventory current webhook topics + routes + handlers (one table)
- [ ] Inventory storage: where idempotency lives today (`ShopWebhookDeliveries` schema + owner)
- [ ] Inventory secrets + header expectations (what env vars, what headers)

## Phase 1 — Reverse engineer (ours + OSS)

- [ ] Fill `artifacts/sources.md` with OSS repos + file pointers + our in-repo anchors
- [ ] Produce flow maps for both runtimes (ingress → verify → dedupe → dispatch → side effects)
- [ ] Write invariants + failure modes (what must always hold)
- [ ] Write the canonical contract sketch (verify + inbox store + dispatcher)
- [ ] Create a gap list (where we drift today, what breaks, what to upgrade first)

## Phase 2 — Ship upgrades safely (incremental)

- [ ] Phase 2a: Additive inbox metadata (shop/topic/status/attempts/error/payload hash) without breaking handlers
- [ ] Phase 2b: Verification parity across runtimes (same behavior everywhere)
- [ ] Phase 2c: Replay tooling (by webhook id/topic/time window) + “safe to replay” guarantees
- [ ] Phase 2d: Observability + audit events for every delivery (received/processed/failed)

## Phase 3 — Best-of-both-worlds (mature pipeline)

- [ ] Separate ingress from processing (fast ACK + async worker) with retries + dead-letter
- [ ] Upstream generic docs/tests improvements to OSS references (optional, high leverage)

## Artifacts (required)
- [ ] Fill `artifacts/run-meta.yaml` (inputs + outputs pointers)
- [ ] Capture sources in `artifacts/sources.md` (OSS + our repo files)
- [ ] Write a short synthesis in `artifacts/summary.md` (priorities + invariants + gaps)

## Promotion (required when reusable)
- [ ] If this becomes a reusable playbook, promote to `.blackbox/deepresearch/YYYY-MM-DD_shopify-webhookinbox-playbook.md`
- [ ] Link the run folder from the evergreen note
- [ ] Update `.blackbox/journal.md` with what changed + why

## Docs routing (required when creating/updating docs outside `.blackbox`)
- [ ] Put docs in the correct `docs/0X-*/` section (see `docs/README.md`)
- [ ] Update the nearest folder `README.md` or `INDEX.md` with a link (so it’s discoverable)
- [ ] Add an entry to `docs/.blackbox/docs-ledger.md` (so we can always find it)
