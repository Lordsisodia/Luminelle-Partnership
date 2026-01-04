# OSS Project Entry

## Identity

- Name: posthog
- Repo: https://github.com/PostHog/posthog
- Full name: PostHog/posthog
- License: Mixed (MIT Expat + `ee/` directory under separate license)
- Stars (approx): 30571
- Forks (approx): 2149
- Primary language: Python
- Last updated: 2025-12-28T16:09:09Z
- Topics: ab-testing, ai-analytics, analytics, cdp, data-warehouse, experiments, feature-flags, javascript, product-analytics, python, react, session-replay, surveys, typescript, web-analytics

## What it gives us (plain English)

- A rich “events explorer” UI pattern we can borrow for product audit logs (filtering, time ranges, breakdowns)
- Session replay + event capture patterns (useful for debugging client/admin behavior)
- Feature flags + experimentation management UI (but licensing is mixed; scope carefully)
- A mature approach to “event schema, ingestion, and querying” (even if we don’t adopt the whole stack)

## What feature(s) it maps to

### Useful patterns to borrow (even if not adopting)

- Audit/event viewer UX: event list + filters + actor context + drill-down
- “Correlation ID” and “entity timeline” ideas (person/session history)
- Operational workflows around event ingestion and debugging

## License notes (evidence-first)

- Proof file: `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/license-proof-posthog-posthog.txt`
- Interpreting the repo LICENSE: content outside `ee/` is MIT Expat; `ee/` is under a separate license (see proof file + referenced `ee/LICENSE`).

- Takeaway: treat as **mixed-license**. Do not recommend “adopt PostHog as a platform component” without confirming the exact features we need are in MIT-licensed parts.

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): UI patterns are very relevant to our admin/audit viewer. Running the full product is a bigger commitment (ingestion pipeline, storage, privacy).
- Setup friction (self-host? SaaS? Docker?): High if we run the full platform; moderate if we only borrow UX patterns and event modeling ideas.
- Data model alignment: Strong for “append-only event streams”; we should still define our own canonical audit schema and redaction rules.

## Adoption path

- 1 day POC:
  - Read the license boundaries and confirm whether we are “pattern borrowing” vs “running PostHog”.
  - Define a minimal `audit_events` schema aligned to our admin needs (tenantId, actorId, action, resource, correlationId, diff ref).
  - Build a tiny “event explorer” UI in our admin inspired by PostHog UX: filters + time range + drill-down.
- 1 week integration:
  - If borrowing patterns: extract the key UX primitives we want (filters, saved views, drill-down) and implement them on our API.
  - If evaluating PostHog as a tool: run it internally to capture admin usage analytics and test session replay.
  - Add strict privacy controls and redaction rules (no PII leakage).
- 1 month hardening:
  - Avoid over-committing to PostHog as a dependency unless licensing and operational fit are explicitly approved.
  - If used internally, productionize ingestion and ensure data retention/compliance.

## Risks

- Maintenance risk: Medium–High if self-hosted; low if used for patterns only.
- Security risk: High. Event capture + replay can leak sensitive data without strict redaction and access controls.
- Scope mismatch: Medium. PostHog is a broad analytics platform; our core need is product audit logs and admin debugging.
- License risk: High. Mixed-license repo; treat as “scope carefully” and “flag unless approved” for platform adoption.

## Sources

- https://github.com/PostHog/posthog
- https://raw.githubusercontent.com/PostHog/posthog/master/LICENSE

## Score (0–100) + reasoning

- Score: 60
- Why: Extremely valuable UX and event modeling patterns, but mixed licensing and large operational footprint make it a cautious adoption; best as a reference/pattern source unless explicitly approved.

---

## Repo description (from GitHub)

🦔 PostHog is an all-in-one developer platform for building successful products. We offer product analytics, web analytics, session replay, error tracking, feature flags, experimentation, surveys, data warehouse, a CDP, and an AI product assistant to help debug your code, ship features faster, and keep all your usage and customer data in one stack.
