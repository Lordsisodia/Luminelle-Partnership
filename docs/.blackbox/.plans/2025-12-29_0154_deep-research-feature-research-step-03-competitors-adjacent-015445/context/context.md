# Rolling Context (read first)

Keep this compact and current. This file is the “always read” memory.

## Current goal

- Deepen adjacent competitors for reusable “platform primitives” (workflow automation + approvals + run history + feature flags/experimentation).
- Keep outputs transplantable into an ecommerce admin/dashboard (merchant admins primary; internal ops secondary).

## Current assumptions / constraints

- Evidence-first: every claim must include a URL or a snapshot/evidence file path.
- Prefer low-cost, thin-slice-able patterns (1–3 day implementation wedges).
- License posture: prefer permissive OSS (MIT/Apache/BSD); explicitly flag GPL/AGPL/BUSL/ELv2/unknown.

## Current best candidates / hypotheses

- “Automation rules” in admin should look like Zapier/n8n: trigger → actions → conditions → approvals → run history.
- “Safe changes” should look like LaunchDarkly: releases + approvals + staged rollout + auditability.
- “Tenant config” should look like Flagsmith: typed remote config + audit logs + rollout preview.

## Open questions / decisions needed

1) Should we build an in-admin automation primitive (limited triggers/actions) vs integrate external automation (Zapier/n8n/Pipedream)?
2) Should “approvals” be a shared primitive across admin (refunds, content publish, price rules) or only within automation rules?

## Recent progress (latest 3–5)

- Deepened tranche #1: Zapier/n8n/Pipedream/Temporal + LaunchDarkly/Unleash/GrowthBook/Flagsmith with evidence links and thin-slice plans.
- Cycle 1: added tranche 2 iPaaS/cases/orchestration UI (Workato/Tines/Kestra/Camunda) with evidence + thin slices.
- Cycle 2: deepened embedded integrations primitives (Apideck/Paragon/Nango/Airbyte), flagged ELv2 licenses for Nango/Airbyte.
- Cycle 3: deepened embedded integrations platforms (Codat/Prismatic/Tray/Merge) with evidence, focusing on link flows, portals, logs, and sync monitoring.
- Cycle 4: deepened credential governance primitives (Infisical/Vault/Doppler/Auth0/Okta) emphasizing RBAC, audit logs, token lifecycle, and log streaming exports.
- Cycle 5: deepened audit export/observability patterns (Datadog/Splunk/Sentry/OpenTelemetry/Elastic) for pipelines, sinks, retention, and event taxonomies.
- Cycle 6: deepened step-up auth + approvals patterns (GitHub/GitLab/Entra PIM/AWS/Stripe) for JIT elevation, protected resources, required reviewers, and MFA/audit trail pairing.
- Cycle 7: deepened approval UX + notification/escalation patterns (Jira Service Management/PagerDuty/Power Automate + reused GitHub patterns) focusing on approval inboxes, SLAs/timers, reminders, and escalation chains.
- Cycle 8: deepened approval inbox UX primitives (GitLab To-Do tabs/snooze/bulk edit; GitHub PR review outcomes + resolved threads; JSM approval stage + license-less approvers).
- Cycle 9: deepened delegation/out-of-office + approval portal/email patterns (Power Automate reassign + email approvals; Azure DevOps deferred approvals + instructions + timeouts; Power Apps approval request screen stages timeline).
- Cycle 11: deepened policy/authorization primitives (OPA policy-as-code; OpenFGA/SpiceDB Zanzibar-style ReBAC; Casbin RBAC/ABAC library) to support protected resources + approvals.
- Cycle 12: deepened policy templates + simulator patterns (Cedar policy templates; Verified Permissions test bench; Permit audit decision reasons + policy CI/CD; OPA HTTP API authorization wiring).
- Cycle 13: deepened feature flags + experimentation primitives (OpenFeature evaluation API/providers/hooks; Statsig gates/experiments/metrics; Firebase Remote Config templates + A/B testing; Optimizely audiences + QA overrides; PostHog flags + experiments) to support release control + auditability in admin.
- Cycle 14: deepened standards for event export + feature flag telemetry (CloudEvents envelope; OpenTelemetry semantic conventions for feature flag evaluation logs; RudderStack tracking plan governance patterns) to align audit/experimentation events with customer observability stacks.
- Cycle 15: deepened webhook delivery platform primitives (Svix/Hookdeck/Stripe/GitHub) focusing on signing verification, retries, redelivery, endpoint health/disable flows, and delivery logs as a core admin primitive.
- Cycle 16: deepened webhook deliveries UX primitives (payload retention + delete-on-success tradeoffs, object storage delivery targets, receiver idempotency strategies, explicit receiver SLAs, and time-bounded redelivery constraints) for a supportable integration export system.
- Cycle 17: deepened payload redaction + safe delivery viewer UX (Svix transformations, Hookdeck event inspection + custom columns, OTel Collector delete/hash/replace/truncate processors) for privacy-aware delivery logs and exports.
- Cycle 18: deepened payload viewing policy + recovery UX (Svix filtering logs + replay all failed since time + testing events; Hookdeck issues/notifications/bulk retry with note that notifications include failed payloads) to shape RBAC/step-up and redaction requirements.
- Cycle 19: deepened schema + taxonomy primitives (Svix dot-delimited event type grouping, JSON Schema Draft 7 per event type, event catalog schema/example payload views; Hookdeck issues as API objects + notifications config endpoints) to drive our `event_types` registry and ops object models.
- Cycle 20: deepened audit + telemetry taxonomy primitives (CloudEvents envelope + versioned `type` naming; Svix OTel “message_attempt/http_attempt” span model + attribute taxonomy; AWS CloudTrail audit record schema fields) to shape auditable admin ops + export interoperability.
- Cycle 21: deepened audit schema + correlation standards (GCP Audit Logs `protoPayload`/AuditLog patterns + category query workflows; W3C Trace Context `traceparent/tracestate` headers; W3C Baggage allowlisted key-value propagation) to harden correlation and audit export design.
- Cycle 22: deepened audit export as product primitives (GitHub audit log streaming destinations + “Check endpoint” + config APIs; WorkOS audit logs schema/export/retention surfaces; GitLab audit event constraints like API window limits and intentionally limited search) to shape buildable audit/export UX for merchant admins.
- Cycle 23: deepened code-shaped audit export APIs (Okta System Log OpenAPI query/pagination model + LogStreams config objects; GitHub stream config schema + encryption workflow; WorkOS endpoint taxonomy for actions/schemas/exports/retention) to inform our audit exports + destination configs.
- Cycle 24: deepened destination schema endpoints + stream-only event taxonomy (Okta LogStreamType enum + meta schema endpoints + activate/deactivate lifecycle; GitHub audit event docs showing stream-only/export-only visibility gates and fields-per-event lists) to shape schema-driven destination UI and channel-gated audit visibility.
- Cycle 25: deepened workflow automation governance + run ops primitives (Zapier approvals + branching + history; Workato environments + admin dashboard + audit log; Pipedream trigger catalog + per-step logs + env vars; n8n executions/debug + error handling + RBAC/projects) to shape an “automation platform” triangle (builder + ops + governance).
- Cycle 26: deepened templates/sharing + reusable building blocks + exportable run logs (GitHub Actions starter workflows + reusable workflows + marketplace; Retool Workflows run logs filters + JSON export + env vars; Slack Workflow Builder creation governance as a sprawl-control pattern) to inform our “template gallery + shared steps + run exports” roadmap.
