# Whole-run synthesis (Step-03 adjacent competitors) — Cycles 1–9

## Goal

- Extract reusable “platform primitives” from adjacent platforms (automation, flags/experimentation, integrations/connectors, governance/RBAC, audit/export, approvals) and translate them into ecommerce-admin-ready thin slices.

## The 6 core primitives to transplant (ranked by leverage)

1) Approvals primitive (shared across the admin)
   - Inbox states: `Pending / Snoozed / Done`
   - Outcomes: `Approve / Decline / Request changes / Comment`
   - Delegation: `Reassign` + handoff audit chain
   - SLA + escalation: `due_at`, overdue, reminders, fallback approver chain
   - Portal delivery: email deep links + limited approver seats (non-admin approvers)
   - Evidence (selection):
     - GitLab To-Do inbox tabs/snooze/bulk: https://docs.gitlab.com/user/todos/
     - GitHub review outcomes + resolved threads: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews
     - PagerDuty escalation policies: https://support.pagerduty.com/main/docs/escalation-policies
     - Power Automate reassign approvals + email approvals: https://learn.microsoft.com/en-us/power-automate/approvals-howto and https://learn.microsoft.com/en-us/power-automate/modern-approvals
     - Azure DevOps deferred approvals + timeouts/instructions: https://learn.microsoft.com/en-us/azure/devops/pipelines/process/approvals?view=azure-devops
     - JSM approval stages + license-less approvers: https://support.atlassian.com/jira-service-management-cloud/docs/set-up-an-approval-stage-for-a-request/

2) Protected resources + step-up auth primitive (gating high-risk actions)
   - “Protected targets” registry: payout settings, tax settings, production integrations, key rotation, refunds over threshold
   - Policy gates: required reviewers/approvals + “step-up session”
   - JIT elevation: time-bounded privileges (reduce permanent admin sprawl)
   - Evidence (selection):
     - GitHub sudo mode (step-up): https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/sudo-mode
     - GitHub protected branches: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches
     - GitLab MR approvals: https://docs.gitlab.com/user/project/merge_requests/approvals/
     - Entra PIM: https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-configure

3) Audit event model + export pipeline (first-class, not support-only)
   - Treat audit logs as an event stream with documented taxonomy early
   - Export to sinks via a pipeline mental model: receivers/processors/exporters
   - Redaction/enrichment in the pipeline, not per feature
   - Evidence (selection):
     - OpenTelemetry Collector (pipeline mental model): https://opentelemetry.io/docs/collector/
     - Splunk HEC ingestion: https://docs.splunk.com/Documentation/Splunk/latest/Data/UsetheHTTPEventCollector
     - Datadog pipelines: https://docs.datadoghq.com/logs/log_configuration/pipelines/

4) Integration connection control plane (embedded connectors)
   - “Connect account” portal/link flow + connection state machine
   - Sync monitoring: last sync time, failures, retries, logs
   - Multi-account support (per channel, per store, per warehouse)
   - Evidence is captured in the plan’s connector/platform competitor entries and evidence files (Apideck/Paragon/Nango/Airbyte; Codat/Tray/Merge/Prismatic).

5) Automation rules / trigger-action system (in-admin automation)
   - Trigger → conditions → actions → approvals → run history
   - Templates/gallery for common merchant workflows
   - Error handling: retries, alerts, manual re-run, idempotency
   - Evidence is captured in the plan’s automation/orchestration competitor entries and evidence files (Zapier/n8n/Pipedream/Temporal; Workato/Tines/Kestra/Camunda).

6) Feature flags / remote config / experimentation (rollouts + guardrails)
   - Per-tenant and segment targeting, gradual rollouts, rollback
   - Experiments attached to metrics
   - Auditability of config changes
   - Evidence is captured in the plan’s feature flag/experimentation competitor entries and evidence files (LaunchDarkly/Unleash/GrowthBook/Flagsmith/Split).

## Suggested build order (thin slices)

- Slice A (1–3 days): approvals MVP
  - Inbox list + `Approve / Decline` + audit events + notifications
  - Evidence pointers: GitHub review outcomes; JSM approval stage

- Slice B (1–3 days): inbox productivity
  - Tabs + snooze presets + bulk actions
  - Evidence pointers: GitLab To-Do snooze/bulk edit

- Slice C (1–3 days): SLA + escalation
  - `due_at`, overdue filters, reminders, fallback approver chain
  - Evidence pointers: JSM SLAs; PagerDuty escalation policies

- Slice D (1–3 days): delegation + email portal
  - Reassign approval + email deep links; anti-stale completion messaging
  - Evidence pointers: Power Automate approvals + reassign; email completion updates

- Slice E (1–3 days): protected resources + step-up
  - Add protected targets registry + require step-up/approval on 2–3 actions
  - Evidence pointers: GitHub sudo mode; protected branches; Entra PIM

- Slice F (1–3 days): audit export sink
  - Implement export pipeline skeleton (receiver → processors → sink)
  - Evidence pointers: OTel Collector; Splunk HEC; Datadog pipelines

## Key design decisions (what must be decided)

- “Build approvals in-app” vs “integrate external approvals” (email portal suggests build is feasible; escalation suggests productized timers needed)
- “Approver seat” model (limited role) vs requiring full admin accounts for approvers
- Whether automation rules are first-party vs delegated to external iPaaS (Zapier/n8n), given merchant simplicity constraints
- Audit event taxonomy ownership (stability needed for exports and filtering)

