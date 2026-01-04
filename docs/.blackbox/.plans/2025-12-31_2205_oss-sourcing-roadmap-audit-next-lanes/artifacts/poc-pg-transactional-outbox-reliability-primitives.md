# POC notes — Transactional outbox/inbox primitives (Postgres reliability)

Repo: `Zehelein/pg-transactional-outbox` (MIT)

Goal (2 days): extract a **minimal, implementable reliability blueprint** for Lumelle’s webhook/workflow runtime:
- transactional outbox schema + worker loop
- transactional inbox schema (dedupe + exactly-once handler semantics)
- concurrency rules (per-segment sequential vs parallel)
- retry + poison handling + cleanup/retention knobs

Guardrails:
- Pattern mining + schema extraction only (no vendoring).
- Prefer the **polling** approach for our first implementation (lower operational burden than logical replication).

---

## Key file pointers (no cloning)

### Concepts + operational considerations
- `lib/README.md`
  - Explains outbox + inbox patterns, and compares logical replication vs polling.
  - Calls out operational issues (replication slots, migrations, cleanup, retries).

### Polling setup (recommended for v1)
- `examples/setup/out/example-trx-polling.sql`
  - Table schemas: `public.outbox` + `public.inbox`
  - Polling functions: `next_outbox_messages(max_size, lock_ms)` and `next_inbox_messages(max_size, lock_ms)`
  - Indexes for polling performance

### Replication setup (reference / later)
- `examples/setup/out/example-trx-replication.sql`
  - Publication + replication slot wiring

### Generated SQL helper (useful blueprint)
- `lib/src/setup/database-setup-exporter.ts` + `lib/src/setup/database-setup.ts`
  - Generates the setup SQL for both polling and replication modes.

### Message model + lifecycle
- `lib/src/message/transactional-message.ts`
  - Core message fields: `aggregateType`, `aggregateId`, `messageType`, optional `segment`, optional `concurrency`, `payload`, optional `metadata`
  - Stored fields include `processedAt`, `abandonedAt`, attempts counters
- `lib/src/message/mark-message-completed.ts` (sets `processed_at` + increments `finished_attempts`)
- `lib/src/message/mark-message-abandoned.ts` (sets `abandoned_at` + increments `finished_attempts`)
- `lib/src/message/message-cleanup.ts` (delete processed/abandoned by retention windows)

### Listener loops (implementation reference)
- Polling:
  - `lib/src/polling/polling-message-listener.ts`
  - `lib/src/polling/next-messages.ts`
- Logical replication:
  - `lib/src/replication/logical-replication-listener.ts`
  - `lib/src/replication/acknowledge-manager.ts` (acks WAL LSN only when all prior LSNs finished)

---

## Extracted schema (what we should copy conceptually)

The example uses identical schemas for outbox and inbox:
- Primary key: `id uuid`
- Business routing fields:
  - `aggregate_type text` (service/domain aggregate type)
  - `aggregate_id text` (aggregate id)
  - `message_type text` (event/command type)
- Concurrency controls:
  - `segment text` (optional group key)
  - `concurrency text` in `('sequential','parallel')`
- Payload:
  - `payload jsonb` (required)
  - `metadata jsonb` (optional)
- Worker state:
  - `locked_until timestamptz`
  - `created_at timestamptz`
  - `processed_at timestamptz` (null until complete)
  - `abandoned_at timestamptz` (null until poison/abandoned)
  - `started_attempts smallint`
  - `finished_attempts smallint`

Notes:
- `locked_until` is the core “lease” mechanism for multi-worker concurrency.
- Attempts counters make retries observable and allow poison thresholds.

---

## Polling function semantics (why this matters)

The polling function (`next_outbox_messages`) implements two important policies:
1) **Sequential per segment**: return only the oldest unprocessed message per `segment` (ordered by `created_at`).
2) **Parallel messages**: also allow fetching messages where `concurrency='parallel'`.

It uses:
- row-level locks (`FOR NO KEY UPDATE NOWAIT`) to avoid double-claiming
- a short lease (`locked_until = now + lock_ms`) so stuck workers self-heal
- `started_attempts++` when claiming

This is a strong blueprint for our own “webhook inbox + workflow outbox” loops.

---

## Mapping → Lumelle runtime primitives

### Webhook inbox (dedupe + exactly-once handler)
- We should store every incoming webhook “envelope” in an inbox table keyed by a stable idempotency key:
  - `{tenant_id, source, topic, external_event_id}` (or derived hash if external id is missing)
- The inbox handler:
  - **writes** the inbox row first (unique constraint ensures dedupe)
  - executes business logic idempotently
  - marks `processed_at` on success
  - marks `abandoned_at` after poison threshold (and emits an audit event)

### Outbox (effects + downstream notifications)
- In the same DB transaction as a state change:
  - write state change
  - insert outbox message (event) with `aggregate_*` fields and a dedupe key in payload/metadata
- Worker publishes outbox rows to our bus (or to a webhook delivery subsystem) and marks `processed_at`.

### Concurrency/ordering
- Use `segment` as our “ordering key”:
  - e.g., `segment = order_id` for order-scoped workflows
  - sequential per order, parallel across orders

---

## POC plan (2 days)

Day 1:
- Write down the exact v1 table schema (in our style) for:
  - `webhook_inbox`
  - `outbox_events`
- Define message types we need immediately (Shopify-first):
  - `shopify.webhook.received`
  - `workflow.run.requested`
  - `workflow.run.completed`
- Decide on segment strategy (likely `order_id` / `customer_id`).

Day 2:
- Implement a minimal polling worker design (even as pseudocode/spec):
  - claim batch (lease + attempts)
  - execute handler with timeout
  - mark processed / abandoned
  - cleanup policy (retention windows)
- Produce a “failure modes” checklist:
  - worker crash mid-flight
  - poison message
  - DB slowdown / lock contention
  - replay/backfill

---

## Risks + mitigations

- Risk: logical replication adds operational complexity (wal_level, slots, failover).
  - Mitigation: start with polling; revisit replication only if polling load becomes a proven issue.
- Risk: undefined idempotency keys from Shopify for some topics.
  - Mitigation: derive stable keys from payload hash + topic + shop + timestamp window; store raw payload hash for debug.
- Risk: concurrency bugs (out-of-order actions per order).
  - Mitigation: enforce `segment=order_id` and treat the segment queue as sequential by default.

