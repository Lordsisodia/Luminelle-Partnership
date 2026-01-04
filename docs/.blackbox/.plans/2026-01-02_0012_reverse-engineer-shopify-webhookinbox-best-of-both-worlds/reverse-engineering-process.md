# Reverse-engineering process (best-of-both-worlds)

Purpose:
- Reverse engineer **OSS reference code** (structure + invariants, not copied code)
- Reverse engineer **our existing implementation** (what’s already built, where it lives, how it behaves)
- Merge both into a **canonical spec + upgrades** with minimal production risk

This process is designed to be reused for:
- Shopify WebhookInbox (this plan)
- Shopify Auth/Sessions
- Storefront primitives (VariantSelector, CartDrawer)
- Blocks Kit UI sections

---

## 0) Pick the primitive (and lock the scope)

Checklist:
- Define the primitive name (1 sentence).
- Define the boundaries (what it owns / what it calls).
- Define the “done” signal (what outcome improves in production).

Output:
- A short `Scope` section inside `notes.md` or `artifacts/summary.md`.

---

## 1) Collect sources (ours + theirs)

### Ours (in-repo anchors)

For each primitive, list:
- Runtime(s): `api/`, `functions/`, `server/`, `src/`
- Entry routes (HTTP endpoints)
- Shared libs/modules
- Storage tables/collections involved
- Environment variables used

Example (WebhookInbox):
- `api/shopify/webhooks/*`
- `api/shopify/webhooks/_verify.ts`
- `api/_lib/webhooks.ts`
- `functions/api/shopify/webhooks/*`
- `functions/_lib/shopifyWebhooks.ts`
- `functions/_lib/webhooks.ts`

### Theirs (OSS references)

Record repo + file pointers (no cloning):
- Repo: `<owner>/<repo>`
  - `<path>` — what it shows (verification, routing, session, etc.)

Where to find pointers:
- `docs/.blackbox/oss-catalog/component-source-map.md`
- `docs/.blackbox/oss-catalog/shopify-app-primitives.md`

Output:
- Fill `artifacts/sources.md` (this plan folder).

---

## 2) Build a “flow map” (ingress → decision → side effects)

Do this once per runtime:
- Node/Vercel (`api/`) flow
- Worker/Functions (`functions/`) flow

Flow template:
1) Receive request
2) Extract headers (which ones?)
3) Read raw body (how?)
4) Verify signature (algorithm + secret selection)
5) Derive idempotency key
6) Check inbox/dedupe store
7) Dispatch to handler
8) Persist side effects
9) Mark processed / mark failed
10) Emit logs/metrics/audit event

Output:
- Add a short flow section to `artifacts/summary.md` (bullets are enough).

---

## 3) Extract invariants (the rules that must always hold)

Think like: “what properties make this safe in production?”

WebhookInbox invariants example:
- If signature is invalid → **no side effects**, store minimal failure info
- If `(shop, webhook_id)` already processed → **no side effects**
- If handler throws → mark failed + allow replay without duplicating side effects
- Every delivery has an outcome: received/processed/failed (+ timestamps)

Output:
- Put invariants in `artifacts/summary.md` under “Invariants”.

---

## 4) Build a “gap list” (ours vs invariants)

For each invariant:
- ✅ already satisfied (where)
- 🟡 partially satisfied (what’s missing)
- ❌ missing (why it matters + what breaks)

Output:
- Add a `Gap list` section to `artifacts/summary.md`.

---

## 5) Design the canonical contract (spec-first)

Write the smallest stable interface(s) we’ll implement everywhere.

WebhookInbox example contracts:
- `verifyShopifyWebhook(rawBody, headers, secret) → {ok, body, rawBody, reason}`
- `WebhookInboxStore.tryBegin(shop, webhookId, topic, payloadHash) → {shouldProcess}`
- `WebhookInboxStore.markProcessed(...) / markFailed(...)`
- `dispatch(topic, payload) → {ok}` (registry-based)

Output:
- Add the contract sketch to `artifacts/summary.md`.

---

## 6) Implement upgrades in phases (safe rollout)

### Phase 0 (no behavior change)
- Add logging/metrics + richer stored metadata (additive columns)
- Keep existing handler behavior

### Phase 1 (behavior parity)
- Unify verification logic across runtimes
- Enforce consistent idempotency key rules

### Phase 2 (best-of-both-worlds)
- Ingress vs processing split
- Retries + dead-letter + replay tooling
- Audit timeline integration

Output:
- Fill `work-queue.md` with the next 5–10 actions.

---

## 7) “Upgrade theirs” (upstream) without leaking anything

Allowed upstream work:
- Tests (fixtures for signature verification + replay)
- Docs (clearer instructions, pitfalls, headers)
- Optional idempotency helpers (generic)

Not allowed:
- Proprietary business logic
- Internal URLs, keys, or customer data
- Tight coupling to our architecture

Output:
- Add upstream PR candidates to `notes.md`.

