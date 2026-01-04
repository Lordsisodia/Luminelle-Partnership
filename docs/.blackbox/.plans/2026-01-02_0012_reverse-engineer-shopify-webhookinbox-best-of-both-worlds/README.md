# Plan: Reverse-engineer Shopify WebhookInbox (best-of-both-worlds)

## Goal
Build a **canonical, testable WebhookInbox** subsystem for Shopify that:
- works the same across our two runtimes (`api/` + `functions/`)
- guarantees **at-most-once side effects** via idempotency (dedupe + safe handlers)
- records **outcomes** (processed/failed + attempts + error) so we can replay safely
- is easy to reason about (clear contracts, adapters, and docs)
- can be partially upstreamed as generic improvements to OSS references (docs/tests), without leaking proprietary logic

## Created
2026-01-02 00:12

## Target (optional)
Timebox:
- **48 hours**: reverse-engineering pack + spec + gap list (no risky refactors)
- **2 weeks**: ship Phase 1 upgrades safely (schema + verification parity + observability)
- **6 weeks**: “best-of-both-worlds” mature pipeline (replay tooling + async processing + upstream PRs)

## Context
- What prompted this work?
  - We already run Shopify webhooks in-prod, but we have **two parallel implementations**:
    - `api/shopify/webhooks/*` (+ `api/_lib/webhooks.ts`, `api/shopify/webhooks/_verify.ts`)
    - `functions/api/shopify/webhooks/*` (+ `functions/_lib/webhooks.ts`, `functions/_lib/shopifyWebhooks.ts`)
  - We also found high-signal OSS references that encode “battle-tested” patterns:
    - `kinngh/shopify-nextjs-prisma-app` and `carstenlebek/shopify-node-app-starter`
  - We want **the best of both worlds**: our working system + their proven structure, without copying blindly.

- Constraints
  - We have a fully functioning app → upgrades must be **additive, low-risk, and observable**.
  - No token leaks in docs/logs; never paste secrets.
  - Don’t vendor/copy OSS repos into this repo; we mine patterns + file pointers only.

- “Done” definition (Phase 1)
  - Verification behavior is consistent across runtimes (same header parsing + secret rules).
  - Inbox records more than “just IDs”: at least shop/topic/status/attempts/error/payload hash.
  - We can answer for any webhook delivery:
    - did we receive it?
    - did we process it?
    - if not, why, and can we replay it safely?
  - We have a repeatable reverse-engineering process we can reuse for other primitives.

## Docs To Read (and why)
- [ ] `docs/.blackbox/oss-catalog/shopify-app-primitives.md` — canonical “what to build” blueprint for Shopify primitives
- [ ] `docs/.blackbox/oss-catalog/lanes/reliability-webhooks-idempotency.md` — inbox/outbox/idempotency lane framing
- [ ] `docs/.blackbox/oss-catalog/component-source-map.md` — OSS file pointers for webhooks + reliability primitives
- [ ] `api/shopify/webhooks/_verify.ts` — current Node/Vercel webhook verification (baseline)
- [ ] `api/_lib/webhooks.ts` — current Node idempotency store (baseline)
- [ ] `functions/_lib/shopifyWebhooks.ts` — current Worker webhook verification (stronger baseline)
- [ ] `functions/_lib/webhooks.ts` — current Worker idempotency store (baseline)

## Plan Steps
- [ ] Step 1: Inventory “what we have” (routes, headers, envs, DB tables, side effects)
- [ ] Step 2: Reverse-engineer OSS references into invariants + failure modes (no copying)
- [ ] Step 3: Write the **WebhookInbox Spec Pack** (contracts + state machine + golden tests)
- [ ] Step 4: Produce a gap list + phased upgrade plan (safe → stronger → best-in-class)
- [ ] Step 5: Implement Phase 1 upgrades behind flags + validate with fixtures
- [ ] Step 6: Upstream generic improvements to OSS refs (docs/tests) where useful

## High-priority worklist (ordered)

1) **Choose the canonical runtime + contract**
   - Decide whether `api/` or `functions/` is the “source of truth” for Shopify webhooks.
   - Outcome: one spec, two adapters (no drift).

2) **Unify webhook verification behavior**
   - Same header normalization, secret selection rules, and error reporting everywhere.

3) **Upgrade idempotency from “dedupe IDs” → “WebhookInbox records”**
   - Store: `shop`, `topic`, `webhook_id`, `payload_hash`, `status`, `attempts`, `last_error`, timestamps.

4) **Add observability + audit events**
   - Record processed/failed + timing + handler name; emit a timeline/audit event.

5) **Build safe replay tooling**
   - Replay by `webhook_id`, by topic, or by time window; idempotent by design.

6) **Separate ingress from processing (when ready)**
   - Fast ACK + async processing + retries + dead-letter queue.

7) **Normalize handler structure**
   - Topic registry → handler; consistent return values; consistent failure handling.

8) **Upstream improvements to OSS refs**
   - Generic tests/docs around idempotency and verification (no proprietary logic).

## Artifacts (created/updated)
- `reverse-engineering-process.md` — reusable process (reverse engineer OSS + audit our code)
- `artifacts/summary.md` — ordered priorities + Phase 0/1 plan
- `artifacts/sources.md` — OSS repos + exact file pointers + our in-repo anchors
- `success-metrics.md` — how we’ll know the inbox is “good”

## Information Routing (where outputs should live)
- Run artifacts (raw/sources/extractions): keep inside this plan folder under `artifacts/`
- Reusable knowledge: promote into `docs/.blackbox/deepresearch/`
- Docs-wide deliverables: place under the correct `docs/0X-*/` category and add a link in the nearest folder `README.md` or `INDEX.md`

## Open Questions / Risks
- Which runtime currently receives Shopify webhooks in production: `api/` or `functions/` (or both)?
- What is the desired canonical inbox store: Supabase table, Postgres, or both?
- Do Shopify webhook ids need to be unique per shop (recommended: unique `(shop, webhook_id)`)?
- How do we want to handle “verify secret mismatch” across environments (explicit error vs silent fail)?
- Rollout safety: what’s our feature flag mechanism for “new inbox semantics”?

## Notes / Revisions
- 2026-01-02: plan scaffolded; priorities + reverse-engineering process added.
