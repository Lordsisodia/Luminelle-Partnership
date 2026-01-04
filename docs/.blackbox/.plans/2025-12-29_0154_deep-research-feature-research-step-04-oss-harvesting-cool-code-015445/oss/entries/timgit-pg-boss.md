# OSS Project Entry

## Identity

- Name: pg-boss
- Repo: https://github.com/timgit/pg-boss
- Full name: timgit/pg-boss
- License: MIT
- Stars (approx): 3037
- Forks (approx): 225
- Primary language: TypeScript
- Last updated: 2025-12-30T08:49:05Z
- Topics: background-jobs, job-queue, nodejs, postgres, postgresql, queue, scheduling

## What it gives us (plain English)

- A Postgres-native job queue for Node.js with scheduling, retries, and concurrency controls
- “Good enough” reliability for most integration work (polling, sync, retries, backfills) without adding a new datastore
- A clear operational model we can expose in an internal admin panel (“why is this integration failing?”)
- A building block for webhooks + retry queues (especially for outbound deliveries)

## What feature(s) it maps to

- Integration connector runtime (polling syncs, backfills, periodic refresh)
- Workflow-lite automation (scheduled jobs, delayed jobs, retries)
- Operational tooling (job inspection, requeue, cancel)

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Excellent for Node/TS stacks already using Postgres; clean mental model for small teams.
- Setup friction (self-host? SaaS? Docker?): Low. Run migrations + worker process; no Redis required.
- Data model alignment: Strong. Jobs live in DB, which makes debugging and audit logging much easier than opaque queues.

## Adoption path

- 1 day POC:
  - Stand up pg-boss in a service connected to Postgres.
  - Implement 1 scheduled job (`integration.sync_all(tenantId)`) + 1 event-triggered job (`webhook.deliver(eventId)`).
  - Force a failure to validate retry policy + backoff.
  - Capture job events to our audit/event stream for observability.
- 1 week integration:
  - Standardize job names and payload schema (include `tenantId`, `integrationId`, `correlationId`).
  - Add per-tenant throttling and per-integration concurrency limits.
  - Implement a DLQ-style workflow: after N failures, mark integration “needs attention” and notify support.
  - Add internal admin tooling: view failed jobs, retry, cancel, inspect last error.
  - Add metrics + alerts (failure rate, backlog depth, runtime).
- 1 month hardening:
  - Add payload versioning and safe deploy strategy.
  - Add runbooks and maintenance (vacuum/bloat, retention cleanup).
  - Evaluate whether critical multi-step flows should move to Temporal.

## Risks

- Maintenance risk: Low–Medium. Postgres queues are simpler than distributed workflow engines but still require DB hygiene.
- Security risk: Medium. Ensure payloads don’t leak secrets; store references instead of raw tokens.
- Scope mismatch: Medium. Great for jobs; not ideal for complex, long-running orchestrations.
- License risk: Low (MIT).

## Sources

- https://github.com/timgit/pg-boss
- https://raw.githubusercontent.com/timgit/pg-boss/master/LICENSE

## Score (0–100) + reasoning

- Score: 82
- Why: Extremely practical Postgres-first job queue; best value when we want “reliable background work” without additional infrastructure.

---

## Repo description (from GitHub)

Postgres-backed job queue for Node.js.
