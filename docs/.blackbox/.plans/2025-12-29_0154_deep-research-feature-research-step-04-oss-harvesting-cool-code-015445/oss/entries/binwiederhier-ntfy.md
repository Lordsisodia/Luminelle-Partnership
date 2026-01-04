# OSS Project Entry

## Identity

- Name: ntfy
- Repo: https://github.com/binwiederhier/ntfy
- Full name: binwiederhier/ntfy
- License: Apache-2.0
- Stars (approx): 27919
- Forks (approx): 1136
- Primary language: Go
- Last updated: 2025-12-28T22:02:16Z
- Topics: curl, notifications, ntfy, ntfysh, pubsub, push-notifications, rest-api

## What it gives us (plain English)

- A simple HTTP-first notification server (publish/subscribe by topic) we can self-host
- A “cheap ops alerting” channel for internal teams (integration failures, webhook DLQs, stuck jobs)
- A lightweight way to offer “push notifications” for internal admin tooling without adopting a full notification platform
- A clean integration surface: `POST`/`PUT` an event → message shows up in clients (mobile/desktop/web)

## What feature(s) it maps to

- Ops alerting + incident response for managed client apps
- Webhook/integration failure notifications (DLQ, repeated retries, endpoint down)
- Admin event stream “notify me when X happens”

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Great as a sidecar service. Our app emits notifications from background jobs (Postgres queue/Temporal).
- Setup friction (self-host? SaaS? Docker?): Low. Single Go service; straightforward Docker deployment.
- Data model alignment: Topic-based model maps well to environment + tenant + severity (e.g., `ops.prod.webhooks`, `ops.tenant.<id>`).

## Adoption path

- 1 day POC:
  - Run ntfy locally (Docker) and create a few topics (`ops-dev`, `ops-staging`, `ops-prod`).
  - Add one “integration failure” notifier in our backend: on repeated job failure, publish a message to a topic.
  - Validate auth mode (basic auth/token) and ensure topics aren’t world-readable.
- 1 week integration:
  - Define alert taxonomy: severity levels, routing rules, and message templates.
  - Add per-env routing and rate limiting to prevent alert storms.
  - Integrate with the admin UI:
    - link notifications to a filtered “event log viewer” page (correlationId, jobId)
  - Add on-call integration patterns (forward ntfy to Slack/email if needed).
- 1 month hardening:
  - Add runbooks for incidents (endpoint down, backlog spikes).
  - Add retention strategy and privacy controls (avoid PII in notifications).

## Risks

- Maintenance risk: Low. Simple service.
- Security risk: Medium. Misconfigured topics can leak operational data; enforce auth + network isolation.
- Scope mismatch: Low. It’s an ops primitive, not a full notification platform with templates/preferences.
- License risk: Low (Apache-2.0).

## Sources

- https://github.com/binwiederhier/ntfy

## Score (0–100) + reasoning

- Score: 75
- Why: Very practical “ops alerting” primitive with a permissive license and minimal setup; best used for internal/on-call workflows.

---

## Repo description (from GitHub)

Send push notifications to your phone or desktop using PUT/POST
