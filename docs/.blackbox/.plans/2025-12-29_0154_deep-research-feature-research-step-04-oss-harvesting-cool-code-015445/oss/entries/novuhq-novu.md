# OSS Project Entry

## Identity

- Name: novu
- Repo: https://github.com/novuhq/novu
- Full name: novuhq/novu
- License: MIT
- Stars (approx): 38348
- Forks (approx): 4189
- Primary language: TypeScript
- Last updated: 2025-12-28T19:37:20Z
- Topics: alternative, communication, email, hacktoberfest, inbox, javascript, nodejs, notification-center, notifications, novu, push-notifications, react, reactjs, sms, transactional, typescript

## What it gives us (plain English)

- A full notification infrastructure platform (multi-channel delivery + in-app inbox patterns)
- A way to centralize notification templates, routing, preferences, and provider integrations
- A strong “merchant admin” and “support admin” primitive:
  - notify merchants/admins when things happen
  - provide an in-app notification center/inbox UI
  - handle email/SMS/push connectors behind one system

## What feature(s) it maps to

- Notifications platform (email/SMS/push/Slack) + in-app inbox
- Admin operational messaging (integration warnings, billing reminders, workflow updates)
- Preference management (who gets notified for what)

## License notes (evidence-first)

- Proof file: `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/license-proof-novuhq-novu.txt`

- …

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Strong. TypeScript-first, with UI patterns that can integrate into a React admin.
- Setup friction (self-host? SaaS? Docker?): Medium–High. It’s a platform component (workers, storage, providers); great value, but non-trivial ops.
- Data model alignment: Good if we treat notifications as events and build a consistent event schema; multi-tenant separation must be explicit.

## Adoption path

- 1 day POC:
  - Run Novu locally and configure one channel (email or Slack).
  - Trigger one notification from our backend (e.g., “webhook endpoint down” or “sync failed”) with tenant context.
  - Verify template editing flow and delivery logs.
  - Decide whether we want to use Novu’s inbox UI patterns or only the delivery layer.
- 1 week integration:
  - Define our “notification event contract” (event names, payload schema, versioning, redaction).
  - Implement tenant-aware routing and preferences:
    - per-tenant notification settings
    - per-role routing (owner/admin/support)
  - Add audit logging for template and preference changes.
  - Add reliability patterns: retries, provider fallbacks, DLQ handling, alerting on failed deliveries.
- 1 month hardening:
  - Productionize ops (monitoring, backups, runbooks).
  - Add strict secrets governance for provider credentials and key rotation.
  - Add support tooling (resend, suppress, inspect delivery reasons).

## Risks

- Maintenance risk: Medium–High. A notification platform is a lot of moving parts; worth it if notifications are core to the product experience.
- Security risk: High. Template data + PII + provider credentials; enforce redaction, access controls, and environment separation.
- Scope mismatch: Medium. If we only need ops alerts, ntfy/apprise is cheaper; if we need merchant-facing inbox + preferences, Novu shines.
- License risk: Low (MIT).

## Sources

- https://github.com/novuhq/novu
- https://raw.githubusercontent.com/novuhq/novu/main/LICENSE

## Score (0–100) + reasoning

- Score: 78
- Why: High leverage if we need a real notification platform (inbox + preferences + multi-channel). Heavier ops than simple alerting primitives.

---

## Repo description (from GitHub)

The open-source notification Inbox infrastructure. E-mail, SMS, Push and Slack Integrations.
