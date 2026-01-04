# OSS Project Entry

## Identity

- Name: convoy
- Repo: https://github.com/frain-dev/convoy
- Full name: frain-dev/convoy
- License: Elastic License 2.0 (ELv2) (source-available; restrictive)
- Stars (approx): 2731
- Forks (approx): 164
- Primary language: Go
- Last updated: 2025-12-30T03:26:41Z
- Topics: api, broker, event, golang, webhook, webhooks

## What it gives us (plain English)

- A “webhook gateway” / event delivery platform: ingest events, manage endpoints, deliver with retries, and observe failures
- A strong pattern library for how to structure:
  - event types and payload versioning
  - endpoint credentials + signing
  - replay tooling
  - delivery logs + DLQ handling
- Useful even if not adoptable: we can borrow the architecture and product surface ideas

## What feature(s) it maps to

- Webhook delivery (outbound) as part of managed client apps
- Integration reliability and operational tooling
- Audit/event viewer for integration events

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Typically a standalone service. If we want a service boundary for webhooks (separate from app runtime), this is the kind of product shape.
- Setup friction (self-host? SaaS? Docker?): Medium. Operationally similar to “run a small platform service”.
- Data model alignment: Strong. Endpoints/deliveries map well to tenant integrations.

## Adoption path

- 1 day POC:
  - Read and confirm ELv2 restrictions (hosting/managed-service limitations).
  - Run locally and configure 1 endpoint, deliver 1 event, inspect logs/retries.
  - Identify which product surfaces are “must-have” for us: replay, DLQ, signing, rate limiting, event versioning.
- 1 week integration:
  - Only proceed if legal explicitly approves ELv2 constraints for our intended distribution/hosting model.
  - Otherwise: implement a minimal in-house webhook delivery service using the patterns learned (job queue + signing + logs).
  - Define operational UX requirements (delivery logs, replay, disable endpoint, alerting).
- 1 month hardening:
  - Add full event contract governance (schemas, versioning, deprecation, replay rules).

## Risks

- Maintenance risk: Medium. Webhook delivery is core infrastructure; needs high reliability.
- Security risk: High. Signing secrets, payload redaction, and replay prevention must be correct.
- Scope mismatch: Medium. Easy to overbuild; start with “deliver reliably + inspect failures”.
- License risk: Very High. ELv2 restricts offering as a hosted/managed service with substantial functionality; likely incompatible with “we manage the app for merchant clients” unless we’re strictly internal.

## Sources

- https://github.com/frain-dev/convoy
- https://raw.githubusercontent.com/frain-dev/convoy/main/LICENSE

## Score (0–100) + reasoning

- Score: 35
- Why: Great patterns and product surface, but ELv2 is a major blocker for adopting in a managed-service context; treat as “ideas/patterns” unless approved.

---

## Repo description (from GitHub)

Fast and secure webhook delivery system.
