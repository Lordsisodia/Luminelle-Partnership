# OSS Project Entry

## Identity

- Name: worker
- Repo: https://github.com/graphile/worker
- Full name: graphile/worker
- License: MIT
- Stars (approx): 2094
- Forks (approx): 210
- Primary language: TypeScript
- Last updated: 2025-12-27T01:28:17Z
- Topics: job-queue, nodejs, postgresql, typescript, worker

## What it gives us (plain English)

- A Postgres-backed job queue + worker runtime we can embed into our Node/TS services
- A simple way to run reliable background work (sync jobs, webhooks, retries) without introducing Redis/Kafka early
- A good “integration runtime primitive” for the managed-app model (per-merchant jobs, retries, rate limits)
- Pragmatic operational patterns (idempotency keys, scheduling, concurrency) that align with “vibe coding” speed

## What feature(s) it maps to

- Integration connector runtime (syncs, polling, retries, backfills)
- Background jobs (emails, webhooks, fulfillment, indexing)
- Audit/event pipeline (async ingestion into event store/search index)

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Great if our backend is Node/TS and we already depend on Postgres (typical with Supabase).
- Setup friction (self-host? SaaS? Docker?): Low–Medium. Requires DB migrations and a worker process; no extra infra beyond Postgres.
- Data model alignment: Good. Jobs are rows in Postgres, which makes them inspectable/auditable and easy to operate in dev/stage/prod.

## Adoption path

- 1 day POC:
  - Add Graphile Worker to a small service and run the worker locally.
  - Implement 2 jobs:
    - `integration.sync_customer_list(tenantId, integrationId)`
    - `audit.ingest_event(eventId)`
  - Prove retries + backoff with a forced failure and verify idempotency behavior.
  - Build a minimal “jobs viewer” endpoint (or SQL view) for support visibility.
- 1 week integration:
  - Define job taxonomy: naming, payload schema, idempotency key format, retry policy per job.
  - Add a small admin UI panel for internal ops (queued/running/failed, retry, cancel).
  - Integrate rate limiting per tenant/integration to avoid API bans.
  - Add tracing/log correlation (jobId ↔ requestId/correlationId).
  - Add safety rails: max concurrency, dead-letter patterns, alerting on repeated failures.
- 1 month hardening:
  - Add migrations + versioning strategy for job payloads.
  - Formalize runbooks (stuck jobs, backlog, DB bloat).
  - Consider when to graduate to Temporal if we need durable multi-step workflows.

## Risks

- Maintenance risk: Low–Medium. Postgres-backed queues are simpler than full workflow engines, but still require operational discipline.
- Security risk: Medium. Job payloads can contain sensitive data; enforce encryption/redaction and limit payload size.
- Scope mismatch: Medium. Great for background jobs; not a full workflow engine with history/sagas (Temporal).
- License risk: Low (MIT).

## Sources

- https://github.com/graphile/worker
- https://raw.githubusercontent.com/graphile/worker/main/LICENSE.md

## Score (0–100) + reasoning

- Score: 83
- Why: Permissive + low-infra job queue that’s very compatible with Postgres-first stacks and fast iteration; a strong “managed app” primitive.

---

## Repo description (from GitHub)

Graphile Worker: High performance Node.js/PostgreSQL job queue.
