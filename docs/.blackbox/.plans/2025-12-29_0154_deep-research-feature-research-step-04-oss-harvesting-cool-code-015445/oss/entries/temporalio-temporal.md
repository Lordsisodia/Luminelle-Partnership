# OSS Project Entry

## Identity

- Name: temporal
- Repo: https://github.com/temporalio/temporal
- Full name: temporalio/temporal
- License: MIT
- Stars (approx): 17281
- Forks (approx): 1246
- Primary language: Go
- Last updated: 2025-12-28T16:50:34Z
- Topics: cronjob-scheduler, distributed-cron, distributed-systems, golang, microservice-framework, microservice-orchestration, microservices-architecture, orchestrator, service-bus, service-fabric, workflow-automation, workflow-engine, workflow-management, workflow-management-system, workflows

## What it gives us (plain English)

- A durable workflow engine for long-running business processes (days/weeks) with retries and state
- Strong primitives for distributed reliability: retries, timeouts, heartbeats, idempotency patterns
- A clean “worker” model: application code executes workflows/activities while Temporal handles orchestration
- Visibility tooling (web UI + APIs) to inspect workflow state, failures, and history
- A path to unify async jobs, cron-like schedules, and sagas/compensations under one system

## What feature(s) it maps to

- Workflow engine (core automation) for backend processes
- Reliable async jobs (queues + retries) for integrations and background processing
- Human-in-the-loop flows (with signals) for approvals/escalations (future)
- Event-driven orchestration: respond to domain events, run compensations on failure

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Temporal is backend-first. Frontend/admin can link to workflow IDs and display status via a small API.
- Setup friction (self-host? SaaS? Docker?): Moderate. Running Temporal requires its services (or Temporal Cloud). Docker Compose works for POC; production needs real ops.
- Data model alignment: Very good if we model “business processes” explicitly (order lifecycle, refunds, fulfillment, integrations) rather than a pile of ad-hoc queues.

## Adoption path

- 1 day POC:
  - Run Temporal locally (Docker Compose).
  - Implement one workflow + a few activities (e.g., “integration sync” or “refund processing”) with retries/timeouts.
  - Demonstrate a failure + replay: break an activity, redeploy worker, see Temporal resume correctly.
  - Add a minimal “workflow status” endpoint that queries Temporal and returns a UI-friendly shape.
- 1 week integration:
  - Pick 1–2 real workflows worth making durable (highest pain: retries, rate limits, partial failures).
  - Build a small internal workflow SDK: naming conventions, workflow IDs, consistent logging/tracing, error taxonomy.
  - Add “signals” for control-plane actions (cancel, retry now, pause) and wire into admin UI buttons.
  - Add deployment/infra approach (K8s + Helm or Temporal Cloud), plus secrets and network policy.
  - Add observability: metrics + logs + traces correlated by workflow/run IDs.
- 1 month hardening:
  - Add multi-tenant isolation approach (namespace per env; consider per-tenant routing only if needed).
  - Define SLOs and runbooks (stuck workflows, queue backlogs, DB issues).
  - Standardize idempotency keys and outbox patterns around activities that touch external systems.

## Risks

- Maintenance risk: Medium. Operating Temporal is non-trivial; mitigated if we use Temporal Cloud.
- Security risk: Medium. Needs careful network/access controls; workflow history can contain sensitive payloads if we’re careless.
- Scope mismatch: Medium. If we only need a simple job queue, Temporal may be overkill; pick a thin slice that truly needs durability.
- License risk: Low (MIT).

## Sources

- https://github.com/temporalio/temporal

## Score (0–100) + reasoning

- Score: 82
- Why: High leverage for reliability and complex workflows; integration cost is mostly ops + mental model, so start with one “must be durable” workflow.

---

## Repo description (from GitHub)

Temporal service
