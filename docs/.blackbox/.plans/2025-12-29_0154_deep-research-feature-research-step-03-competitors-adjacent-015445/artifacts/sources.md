---
status: draft
last_reviewed: 2025-12-28
owner: agent
---

# Sources (Step 03 — Competitors Adjacent)

Format per source:
- URL
  - Supports: what claim/data this backs
  - Accessed: YYYY-MM-DD
  - Confidence: High | Medium | Low

## Adjacent tool pages

- https://launchdarkly.com/pricing
  - Supports: pricing exists for feature management control plane
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://posthog.com
  - Supports: positioning as a combined “build/test/measure/ship” toolset
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://www.growthbook.io
  - Supports: experimentation/feature management positioning (transferable patterns)
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://www.getunleash.io
  - Supports: OSS feature flags positioning (build vs integrate primitive)
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://flagsmith.com
  - Supports: OSS flags + remote config positioning (per-tenant config pattern)
  - Accessed: 2025-12-29
  - Confidence: Medium

## Tranche 1 — Workflow automation primitives

### Zapier

- https://help.zapier.com/hc/en-us/articles/8496223930381-What-is-a-Zap
  - Supports: Zap mental model (trigger + actions); core workflow builder vocabulary
  - Accessed: 2025-12-29
  - Confidence: High

- https://help.zapier.com/hc/en-us/articles/8496309473421-Use-multi-step-Zaps
  - Supports: multi-step automation (multiple actions in one Zap)
  - Accessed: 2025-12-29
  - Confidence: High

- https://help.zapier.com/hc/en-us/articles/8496223368085-Use-filters-in-Zaps
  - Supports: conditional logic (“Filters”) in workflows
  - Accessed: 2025-12-29
  - Confidence: High

- https://help.zapier.com/hc/en-us/articles/8496250107405-Use-Paths-by-Zapier
  - Supports: branching logic (“Paths”) in workflows
  - Accessed: 2025-12-29
  - Confidence: High

- https://help.zapier.com/hc/en-us/articles/8496354423693-Get-started-with-Approval-by-Zapier
  - Supports: human-in-the-loop approval step (approve/deny + route)
  - Accessed: 2025-12-29
  - Confidence: High

- https://help.zapier.com/hc/en-us/articles/8496257531797-View-your-Zap-history
  - Supports: run history/logs UX (status, errors, inspection)
  - Accessed: 2025-12-29
  - Confidence: High

### n8n

- https://docs.n8n.io/workflows/executions/
  - Supports: executions (run history) concept and UI surface
  - Accessed: 2025-12-29
  - Confidence: High

- https://docs.n8n.io/workflows/executions/all-executions/
  - Supports: “all executions” view (cross-workflow run log)
  - Accessed: 2025-12-29
  - Confidence: High

- https://docs.n8n.io/workflows/executions/workflow-executions/
  - Supports: per-workflow run history view
  - Accessed: 2025-12-29
  - Confidence: High

- https://docs.n8n.io/flow-logic/error-handling/
  - Supports: error-handling workflow patterns (error branches/handling)
  - Accessed: 2025-12-29
  - Confidence: High

- https://docs.n8n.io/flow-logic/execution/retries/
  - Supports: retry behavior as a first-class automation primitive
  - Accessed: 2025-12-29
  - Confidence: High

### Pipedream

- https://pipedream.com/docs/workflows/steps/triggers/
  - Supports: triggers as first step in workflows; trigger catalog concept
  - Accessed: 2025-12-29
  - Confidence: High

- https://pipedream.com/docs/environment-variables/
  - Supports: environment variables as workflow configuration (secrets/config separation)
  - Accessed: 2025-12-29
  - Confidence: High

### Temporal

- https://docs.temporal.io/workflows
  - Supports: “Workflows” as durable executions (workflow engine model)
  - Accessed: 2025-12-29
  - Confidence: High

- https://docs.temporal.io/visibility
  - Supports: visibility/observability (run visibility, queryable history) as a core admin surface
  - Accessed: 2025-12-29
  - Confidence: High

- https://docs.temporal.io/retry-policies
  - Supports: retry policies as a first-class reliability primitive
  - Accessed: 2025-12-29
  - Confidence: High

## Tranche 1 — Feature flags + experimentation primitives

### LaunchDarkly

- https://docs.launchdarkly.com/home/releases
  - Supports: release workflow / staged rollout framing (control-plane UX mental model)
  - Accessed: 2025-12-29
  - Confidence: High

- https://docs.launchdarkly.com/home/approvals
  - Supports: approvals as a first-class governance control for changes
  - Accessed: 2025-12-29
  - Confidence: High

### Unleash

- https://docs.getunleash.io/reference/unleash-overview
  - Supports: Unleash product positioning + core model (projects/environments/flags)
  - Accessed: 2025-12-29
  - Confidence: High

- https://docs.getunleash.io/reference/feature-toggles/feature-toggle-types
  - Supports: feature toggle types (release/experiment/ops/permission) taxonomy
  - Accessed: 2025-12-29
  - Confidence: High

- https://docs.getunleash.io/reference/feature-toggles/strategies
  - Supports: rollout/targeting “strategies” as composable rules
  - Accessed: 2025-12-29
  - Confidence: High

### GrowthBook

- https://docs.growthbook.io/features/feature-flags
  - Supports: GrowthBook feature flags and targeting/rollout primitives
  - Accessed: 2025-12-29
  - Confidence: High

- https://docs.growthbook.io/features/experiments
  - Supports: experiments as a first-class workflow (variants, assignment, results)
  - Accessed: 2025-12-29
  - Confidence: High

- https://docs.growthbook.io/features/feature-scheduling
  - Supports: scheduling as a first-class primitive (time-based releases)
  - Accessed: 2025-12-29
  - Confidence: High

### Flagsmith

- https://docs.flagsmith.com/advanced-use/remote-config
  - Supports: remote config concept and usage (key/value config beyond boolean flags)
  - Accessed: 2025-12-29
  - Confidence: High

- https://docs.flagsmith.com/platform-features/audit-logs
  - Supports: audit logs as governance/observability for config changes
  - Accessed: 2025-12-29
  - Confidence: High

## Tranche 2 — iPaaS / connectors / enterprise workflow primitives

### Workato (SaaS)

- https://docs.workato.com/en/recipes/managing-recipes.html
  - Supports: lifecycle/operations surfaces including environments + operations hub dashboard + activity audit log
  - Accessed: 2025-12-29
  - Confidence: High

- https://docs.workato.com/en/features/admin-dashboard.html
  - Supports: operations hub dashboard (monitoring and operational insights for running automations)
  - Accessed: 2025-12-29
  - Confidence: High

- https://docs.workato.com/en/features/activity-audit-log.html
  - Supports: activity audit log for changes across account/connections/recipes (governance primitive)
  - Accessed: 2025-12-29
  - Confidence: High

### Tines (SaaS)

- https://www.tines.com/docs/stories/story-runs/
  - Supports: “story runs” (run history) as a first-class operational surface
  - Accessed: 2025-12-29
  - Confidence: High

- https://www.tines.com/docs/cases/overview/
  - Supports: cases as a first-class object (human-in-the-loop / case-based work)
  - Accessed: 2025-12-29
  - Confidence: High

- https://www.tines.com/docs/cases/tasks/
  - Supports: tasks within cases (human tasks / work queue primitive)
  - Accessed: 2025-12-29
  - Confidence: High

- https://www.tines.com/docs/admin/audit-logs/
  - Supports: audit logs for admin/governance
  - Accessed: 2025-12-29
  - Confidence: High

### Kestra (OSS; license check required)

- https://kestra.io/docs/ui
  - Supports: web UI as a documented first-class surface (admin UX for orchestration)
  - Accessed: 2025-12-29
  - Confidence: High

- https://kestra.io/docs/ui/executions
  - Supports: executions/run history UI surface (drilldown, logs/graphs implied by the “executions” concept)
  - Accessed: 2025-12-29
  - Confidence: High

- https://kestra.io/docs/use-cases/approval-processes
  - Supports: “manual approval processes” as an explicit use case (human-in-the-loop automation)
  - Accessed: 2025-12-29
  - Confidence: High

- https://github.com/kestra-io/kestra/blob/develop/LICENSE
  - Supports: OSS license posture (verify permissive vs restrictive)
  - Accessed: 2025-12-29
  - Confidence: Medium

### Camunda (OSS; license check required)

- https://docs.camunda.org/manual/latest/user-guide/tasklist/
  - Supports: Tasklist webapp for human tasks (approvals/work queue primitive)
  - Accessed: 2025-12-29
  - Confidence: High

- https://docs.camunda.org/manual/latest/webapps/cockpit/
  - Supports: Cockpit webapp for operations/monitoring of processes (run visibility primitive)
  - Accessed: 2025-12-29
  - Confidence: High

- https://github.com/camunda/camunda-bpm-platform/blob/master/LICENSE
  - Supports: OSS license posture (verify permissive vs restrictive)
  - Accessed: 2025-12-29
  - Confidence: Medium

## Cycle 2 — Embedded integrations / unified APIs / connection lifecycle

### Apideck (SaaS)

- https://developers.apideck.com/guides/vault
  - Supports: embedded “Vault” patterns for authorizing customer connections (connection lifecycle + sessions)
  - Accessed: 2025-12-29
  - Confidence: High

- https://developers.apideck.com/guides/authorize-connections
  - Supports: authorize connection workflow (connection lifecycle patterns)
  - Accessed: 2025-12-29
  - Confidence: High

- https://developers.apideck.com/guides/connection-states
  - Supports: explicit “connection states” taxonomy (status model + UI mapping)
  - Accessed: 2025-12-29
  - Confidence: High

- https://developers.apideck.com/guides/refresh-token-race-condition
  - Supports: OAuth refresh token race condition guidance (hard-won edge case)
  - Accessed: 2025-12-29
  - Confidence: High

### Paragon (SaaS)

- https://docs.useparagon.com/connect-portal/overview
  - Supports: “Connect Portal” embedded UI for managing user connections
  - Accessed: 2025-12-29
  - Confidence: High

- https://docs.useparagon.com/getting-started/displaying-the-connect-portal
  - Supports: connect portal embedding workflow (how it appears in a product)
  - Accessed: 2025-12-29
  - Confidence: High

- https://docs.useparagon.com/monitoring/event-logs
  - Supports: event logs / monitoring surface (run history and debugging)
  - Accessed: 2025-12-29
  - Confidence: High

- https://docs.useparagon.com/apis/api-reference/multi-account-authorization
  - Supports: multi-account authorization (multiple connections per user/tenant)
  - Accessed: 2025-12-29
  - Confidence: High

### Nango (OSS, but **ELv2** license: flag as restrictive)

- https://nango.dev/docs/reference/api/connections/list
  - Supports: “connections” as a first-class API object (tenant-scoped connection management)
  - Accessed: 2025-12-29
  - Confidence: High

- https://nango.dev/docs/guides/use-cases/syncs
  - Supports: syncs as a product concept (ongoing data sync use case)
  - Accessed: 2025-12-29
  - Confidence: High

- https://nango.dev/docs/reference/api/sync/status
  - Supports: sync status API (run state / visibility)
  - Accessed: 2025-12-29
  - Confidence: High

- https://raw.githubusercontent.com/NangoHQ/nango/master/LICENSE
  - Supports: license posture is Elastic License 2.0 (ELv2) (not permissive)
  - Accessed: 2025-12-29
  - Confidence: High

### Airbyte (OSS, but **ELv2** license: flag as restrictive)

- https://docs.airbyte.com/platform/using-airbyte/getting-started/set-up-a-connection
  - Supports: step-by-step connection setup workflow (wizard mental model)
  - Accessed: 2025-12-29
  - Confidence: High

- https://docs.airbyte.com/platform/cloud/managing-airbyte-cloud/review-connection-timeline
  - Supports: connection timeline/history as a first-class operational surface
  - Accessed: 2025-12-29
  - Confidence: High

- https://docs.airbyte.com/platform/understanding-airbyte/jobs
  - Supports: jobs model (run types + job history mental model)
  - Accessed: 2025-12-29
  - Confidence: High

- https://raw.githubusercontent.com/airbytehq/airbyte/master/LICENSE
  - Supports: license posture is Elastic License 2.0 (ELv2) (not permissive)
  - Accessed: 2025-12-29
  - Confidence: High

## Cycle 3 — Embedded integrations platforms (portal + auth + logs)

### Codat (SaaS)

- https://docs.codat.io/auth-flow/overview
  - Supports: authorization/link flow as a first-class product surface
  - Accessed: 2025-12-29
  - Confidence: High

- https://docs.codat.io/auth-flow/authorize-embedded-link
  - Supports: embedded link authorization workflow (merchant connects their platform/account)
  - Accessed: 2025-12-29
  - Confidence: High

- https://docs.codat.io/core-concepts/connections
  - Supports: “connections” as a first-class concept (status model foundation)
  - Accessed: 2025-12-29
  - Confidence: High

- https://docs.codat.io/commerce/learn/monitoring-a-sync
  - Supports: monitoring a sync (sync observability surface)
  - Accessed: 2025-12-29
  - Confidence: High

- https://docs.codat.io/using-the-api/webhooks/overview
  - Supports: webhooks as part of integration lifecycle (events/notifications)
  - Accessed: 2025-12-29
  - Confidence: High

### Prismatic (SaaS)

- https://prismatic.io/docs/embed/marketplace/
  - Supports: embedded marketplace UI patterns for end-customer integrations
  - Accessed: 2025-12-29
  - Confidence: High

- https://prismatic.io/docs/instances/integration-marketplace/
  - Supports: integration marketplace instance patterns (customer-facing catalog mental model)
  - Accessed: 2025-12-29
  - Confidence: High

- https://prismatic.io/docs/integrations/connections/
  - Supports: connections as a first-class concept (auth/connection management)
  - Accessed: 2025-12-29
  - Confidence: High

- https://prismatic.io/docs/integrations/connections/oauth2/custom-redirects/
  - Supports: custom OAuth redirects (embedded/multi-tenant OAuth posture)
  - Accessed: 2025-12-29
  - Confidence: High

- https://prismatic.io/docs/integrations/data-sources/debugging/
  - Supports: debugging surface for integrations (operability primitive)
  - Accessed: 2025-12-29
  - Confidence: High

### Tray.io (SaaS)

- https://docs.tray.ai/platform/connectivity/authentications
  - Supports: “authentications” as first-class objects (credential management patterns)
  - Accessed: 2025-12-29
  - Confidence: High

- https://docs.tray.ai/platform/embedded/key-concepts/auth-only-dialog
  - Supports: auth-only dialog embedding pattern (connect credentials without full workflow UI)
  - Accessed: 2025-12-29
  - Confidence: High

- https://docs.tray.ai/platform/embedded/key-concepts/auth-slots
  - Supports: “auth slots” abstraction (credential reuse/slots concept)
  - Accessed: 2025-12-29
  - Confidence: High

- https://docs.tray.ai/platform/enterprise-core/logs-debugging/debug-logs
  - Supports: debug logs as an operability surface (run-time debugging)
  - Accessed: 2025-12-29
  - Confidence: High

- https://docs.tray.ai/platform/enterprise-core/logs-debugging/log-streaming
  - Supports: log streaming (observability integration pattern)
  - Accessed: 2025-12-29
  - Confidence: High

### Merge.dev (SaaS)

- https://docs.merge.dev/guides/merge-link/single-integration/
  - Supports: “Merge Link” single integration linking flow (connect portal/link flow pattern)
  - Accessed: 2025-12-29
  - Confidence: High

- https://docs.merge.dev/hris/linked-accounts/
  - Supports: linked accounts as first-class objects (multi-account/tenant linkage)
  - Accessed: 2025-12-29
  - Confidence: High

- https://docs.merge.dev/hris/sync-status/
  - Supports: sync status endpoint/surface (sync observability)
  - Accessed: 2025-12-29
  - Confidence: High

- https://docs.merge.dev/basics/webhooks/overview/
  - Supports: webhook primitives and setup overview
  - Accessed: 2025-12-29
  - Confidence: High

## Cycle 4 — credential governance + security primitives (adjacent)

### Infisical (OSS-ish + SaaS)

- https://infisical.com/docs/documentation/platform/audit-logs
  - Supports: audit logs as a first-class admin surface (governance primitive)
  - Accessed: 2025-12-29
  - Confidence: High

- https://infisical.com/docs/documentation/platform/access-controls
  - Supports: access controls / RBAC primitives (who can do what)
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://raw.githubusercontent.com/Infisical/infisical/main/LICENSE
  - Supports: license posture (MIT outside `ee/` per license text)
  - Accessed: 2025-12-29
  - Confidence: High

### HashiCorp Vault (BUSL; restrictive)

- https://developer.hashicorp.com/vault/docs/audit
  - Supports: audit devices + audit trail (governance + forensics primitive)
  - Accessed: 2025-12-29
  - Confidence: High

- https://developer.hashicorp.com/vault/docs/concepts/policies
  - Supports: policy-based access control (RBAC-like primitive)
  - Accessed: 2025-12-29
  - Confidence: High

- https://developer.hashicorp.com/vault/docs/concepts/tokens
  - Supports: tokens as a first-class lifecycle object (issue/revoke/renew)
  - Accessed: 2025-12-29
  - Confidence: High

- https://developer.hashicorp.com/vault/docs/concepts/lease
  - Supports: leases / TTL as a platform primitive (expiring credentials)
  - Accessed: 2025-12-29
  - Confidence: High

- https://raw.githubusercontent.com/hashicorp/vault/main/LICENSE
  - Supports: BUSL license proof (restrictive for embedding/hosting)
  - Accessed: 2025-12-29
  - Confidence: High

### Doppler (SaaS)

- https://docs.doppler.com/docs/service-tokens
  - Supports: service tokens + environment scoping patterns (credential lifecycle)
  - Accessed: 2025-12-29
  - Confidence: High

- https://docs.doppler.com/docs/activity-logs
  - Supports: activity logs as a first-class admin surface (governance primitive)
  - Accessed: 2025-12-29
  - Confidence: High

- https://docs.doppler.com/docs/custom-roles
  - Supports: custom roles / RBAC patterns
  - Accessed: 2025-12-29
  - Confidence: High

### Auth0 (SaaS)

- https://auth0.com/docs/secure/monitoring/logs
  - Supports: logs as a first-class admin surface (audit trail)
  - Accessed: 2025-12-29
  - Confidence: High

- https://auth0.com/docs/secure/monitoring/log-streams
  - Supports: log streaming export (SIEM/observability integration primitive)
  - Accessed: 2025-12-29
  - Confidence: High

- https://auth0.com/docs/manage-users/access-control/rbac
  - Supports: RBAC for APIs (roles/permissions management primitives)
  - Accessed: 2025-12-29
  - Confidence: High

- https://auth0.com/docs/secure/security-multifactor-authentication
  - Supports: MFA patterns for high-risk admin actions
  - Accessed: 2025-12-29
  - Confidence: Medium

### Okta (SaaS)

- https://developer.okta.com/docs/reference/api/system-log/
  - Supports: System Log (audit/event stream primitive)
  - Accessed: 2025-12-29
  - Confidence: High

- https://developer.okta.com/docs/reference/api/roles/
  - Supports: admin roles APIs (RBAC / admin delegation patterns)
  - Accessed: 2025-12-29
  - Confidence: High

- https://developer.okta.com/docs/reference/api/api-tokens/
  - Supports: API tokens lifecycle patterns (create/revoke/visibility)
  - Accessed: 2025-12-29
  - Confidence: High

## Cycle 5 — observability export + audit event streaming (adjacent)

### Datadog (SaaS)

- https://docs.datadoghq.com/logs/log_configuration/pipelines/
  - Supports: log processing pipelines (transform/redact/enrich before indexing/export)
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://docs.datadoghq.com/logs/log_configuration/archives/
  - Supports: log archives (retention/archiving patterns)
  - Accessed: 2025-12-29
  - Confidence: Medium

### Splunk (SaaS / enterprise)

- https://docs.splunk.com/Documentation/Splunk/latest/Data/UsetheHTTPEventCollector
  - Supports: HTTP Event Collector (token-based log ingestion primitive)
  - Accessed: 2025-12-29
  - Confidence: Medium

### Sentry (SaaS + OSS)

- https://docs.sentry.io/product/organization/audit-log/
  - Supports: audit log as a governance surface (org-level change history)
  - Accessed: 2025-12-29
  - Confidence: High

### OpenTelemetry Collector (standard + OSS)

- https://opentelemetry.io/docs/collector/
  - Supports: receive/process/export pipeline mental model (vendor-agnostic forwarding)
  - Accessed: 2025-12-29
  - Confidence: High

- https://raw.githubusercontent.com/open-telemetry/opentelemetry-collector/main/LICENSE
  - Supports: Apache-2.0 license proof (permissive)
  - Accessed: 2025-12-29
  - Confidence: High

### Elastic Stack (restrictive license mix)

- https://www.elastic.co/docs/reference/kibana/kibana-audit-events
  - Supports: Kibana audit events taxonomy (event model patterns)
  - Accessed: 2025-12-29
  - Confidence: High

- https://www.elastic.co/docs/reference/elasticsearch/elasticsearch-audit-events
  - Supports: Elasticsearch audit events taxonomy (event model patterns)
  - Accessed: 2025-12-29
  - Confidence: High

- https://raw.githubusercontent.com/elastic/kibana/main/LICENSE.txt
  - Supports: license posture proof (AGPLv3/SSPL/ELv2 mix; flag as restrictive/complex)
  - Accessed: 2025-12-29
  - Confidence: High

## Cycle 6 — step-up auth + approvals for sensitive actions (adjacent)

### GitHub (SaaS)

- https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/sudo-mode
  - Supports: step-up / re-auth before sensitive actions (“sudo mode”)
  - Accessed: 2025-12-29
  - Confidence: High

- https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches
  - Supports: protected actions / policy gates (branch protection rules)
  - Accessed: 2025-12-29
  - Confidence: High

- https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/manage-environments
  - Supports: required reviewers / deployment protection rules (approval gate pattern)
  - Accessed: 2025-12-29
  - Confidence: High

### GitLab (OSS-ish + SaaS)

- https://docs.gitlab.com/user/project/merge_requests/approvals/
  - Supports: required approvals for merge requests (approval rules primitive)
  - Accessed: 2025-12-29
  - Confidence: High

- https://docs.gitlab.com/user/project/protected_branches.html
  - Supports: protected branches / protected actions with policy gates
  - Accessed: 2025-12-29
  - Confidence: High

- https://gitlab.com/gitlab-org/gitlab/-/raw/master/LICENSE
  - Supports: license posture proof (MIT outside `ee/` per license text)
  - Accessed: 2025-12-29
  - Confidence: High

### Microsoft Entra Privileged Identity Management (PIM) (SaaS)

- https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-configure
  - Supports: time-based + approval-based role activation (JIT privilege + approvals)
  - Accessed: 2025-12-29
  - Confidence: High

### AWS IAM + CloudTrail (SaaS / platform)

- https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa.html
  - Supports: MFA requirement patterns for sensitive access
  - Accessed: 2025-12-29
  - Confidence: High

- https://docs.aws.amazon.com/awscloudtrail/latest/userguide/view-cloudtrail-events.html
  - Supports: audit trail / event history for governance investigations
  - Accessed: 2025-12-29
  - Confidence: High

- https://docs.aws.amazon.com/AmazonS3/latest/userguide/MultiFactorAuthenticationDelete.html
  - Supports: MFA-gated destructive action (delete) pattern (two-person-ish safety via MFA)
  - Accessed: 2025-12-29
  - Confidence: High

### Stripe (SaaS)

- https://support.stripe.com/questions/two-step-authentication
  - Supports: 2FA / step-up auth baseline for admin access
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://docs.stripe.com/keys
  - Supports: API keys management surface (credential governance patterns)
  - Accessed: 2025-12-29
  - Confidence: Medium

## Cycle 7 — approval UX + notifications/escalation (adjacent)

### Jira Service Management (SaaS)

- https://support.atlassian.com/jira-service-management-cloud/docs/set-up-approvals/
  - Supports: approval steps in workflows; approvers/groups/CAB patterns
  - Accessed: 2025-12-29
  - Confidence: High

- https://support.atlassian.com/jira-service-management-cloud/docs/what-are-slas/
  - Supports: SLAs as timers/goals for service workflows (overdue states + priority)
  - Accessed: 2025-12-29
  - Confidence: High

### PagerDuty (SaaS)

- https://support.pagerduty.com/main/docs/escalation-policies
  - Supports: escalation policies + escalation timeouts (notify backups until acknowledged)
  - Accessed: 2025-12-29
  - Confidence: High

### Power Automate Approvals (SaaS)

- https://learn.microsoft.com/en-us/power-automate/modern-approvals
  - Supports: approval workflow pattern (request → approve/deny) across systems
  - Accessed: 2025-12-29
  - Confidence: High

- https://learn.microsoft.com/en-us/connectors/approvals/
  - Supports: standard approvals connector (action surface for creating/handling approvals)
  - Accessed: 2025-12-29
  - Confidence: High

## Cycle 8 — approval inbox UX primitives (adjacent)

### GitLab (To-Do inbox + MR reviews)

- https://docs.gitlab.com/user/todos/
  - Supports: inbox tabs/states (To Do / Snoozed / Done), snooze mechanics, bulk edit UX
  - Accessed: 2025-12-29
  - Confidence: High

- https://docs.gitlab.com/user/project/merge_requests/reviews/
  - Supports: “start a review” pending/unpublished state; review submission outcomes; re-request creates to-do + email
  - Accessed: 2025-12-29
  - Confidence: High

### GitHub (PR reviews)

- https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews
  - Supports: standardized review outcomes (comment / approve / request changes) + resolved threads concept
  - Accessed: 2025-12-29
  - Confidence: High

- https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/reviewing-proposed-changes-in-a-pull-request
  - Supports: suggested changes + submit review outcomes; “request changes” semantics with branch protection notes
  - Accessed: 2025-12-29
  - Confidence: High

- https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/requesting-a-pull-request-review
  - Supports: requesting reviewers/teams + re-request review after changes
  - Accessed: 2025-12-29
  - Confidence: High

### Jira Service Management (approval stage)

- https://support.atlassian.com/jira-service-management-cloud/docs/set-up-an-approval-stage-for-a-request/
  - Supports: approval stages; external approvers (customers) without JSM license
  - Accessed: 2025-12-29
  - Confidence: High

## Cycle 9 — delegation/out-of-office + approval portal/email (adjacent)

### Power Automate (Approvals)

- https://learn.microsoft.com/en-us/power-automate/modern-approvals
  - Supports: approve from email inbox + approvals center + mobile; email completion status updates
  - Accessed: 2025-12-29
  - Confidence: High

- https://learn.microsoft.com/en-us/power-automate/approvals-howto
  - Supports: reassign approvals to another person (delegation/handoff); formatted approval emails
  - Accessed: 2025-12-29
  - Confidence: High

### Azure DevOps Pipelines (Approvals and checks)

- https://learn.microsoft.com/en-us/azure/devops/pipelines/process/approvals?view=azure-devops
  - Supports: approvers + instructions + timeout semantics; deferred approvals (approve now, effective later)
  - Accessed: 2025-12-29
  - Confidence: High

### Power Apps (Approval request screen)

- https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/add-screen-context-variables
  - Supports: approval request screen + stages timeline UX building blocks (reviewers gallery / stage details)
  - Accessed: 2025-12-29
  - Confidence: High

## Cycle 11 — policy / authorization primitives (adjacent; code-shaped patterns)

### Open Policy Agent (OPA) (OSS)

- https://openpolicyagent.org/docs/policy-language
  - Supports: policy-as-code via Rego; expressing rules/decisions as code
  - Accessed: 2025-12-30
  - Confidence: High

- https://openpolicyagent.org/docs
  - Supports: evaluation methods (CLI, server, library); loading policy/data; integrations list (Kubernetes/Envoy/HTTP APIs)
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://raw.githubusercontent.com/open-policy-agent/opa/main/LICENSE
  - Supports: Apache-2.0 license proof
  - Accessed: 2025-12-30
  - Confidence: High

### OpenFGA (OSS)

- https://openfga.dev/docs/fga
  - Supports: Zanzibar-inspired FGA positioning (fine-grained authorization)
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://openfga.dev/docs/modeling
  - Supports: modeling guides and patterns for defining authorization models
  - Accessed: 2025-12-30
  - Confidence: High

- https://openfga.dev/docs/modeling/getting-started
  - Supports: process for defining authorization models (object types, relations, define/test/iterate)
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/openfga/openfga/main/LICENSE
  - Supports: Apache-2.0 license proof
  - Accessed: 2025-12-30
  - Confidence: High

### SpiceDB (OSS)

- https://raw.githubusercontent.com/authzed/spicedb/main/README.md
  - Supports: Zanzibar inspiration; schema + relationships + permission checks; sample schema/relationships API calls
  - Accessed: 2025-12-30
  - Confidence: High

- https://docs.authzed.com/guides/schema
  - Supports: schema development guide reference (from SpiceDB README)
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://docs.authzed.com/reference/schema-lang
  - Supports: schema language reference (from SpiceDB README)
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://raw.githubusercontent.com/authzed/spicedb/main/LICENSE
  - Supports: Apache-2.0 license proof
  - Accessed: 2025-12-30
  - Confidence: High

### Casbin (OSS)

- https://casbin.org/docs/overview
  - Supports: authorization library + supported model categories (RBAC/ABAC/etc) and responsibilities (policy storage, role mappings)
  - Accessed: 2025-12-30
  - Confidence: High

- https://casbin.org/docs/supported-models
  - Supports: supported models + example model/policy files (links into repo)
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://raw.githubusercontent.com/casbin/casbin/master/LICENSE
  - Supports: Apache-2.0 license proof
  - Accessed: 2025-12-30
  - Confidence: High

## Cycle 12 — policy templates + policy simulator (adjacent; code + UX ideas)

### Cedar Policy Language (OSS)

- https://docs.cedarpolicy.com/
  - Supports: Cedar features + core concept framing; references Verified Permissions as a managed service using Cedar
  - Accessed: 2025-12-30
  - Confidence: High

- https://docs.cedarpolicy.com/bestpractices/bp-implementing-roles-templates.html
  - Supports: “Roles with policy templates” guidance (role assignment within policy store)
  - Accessed: 2025-12-30
  - Confidence: High

- https://docs.cedarpolicy.com/overview/terminology.html
  - Supports: core terms (principal/resource/action/context), schema concepts, groups/hierarchies
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/cedar-policy/cedar/main/LICENSE
  - Supports: Apache-2.0 license proof
  - Accessed: 2025-12-30
  - Confidence: High

### Amazon Verified Permissions (SaaS)

- https://docs.aws.amazon.com/verifiedpermissions/latest/userguide/what-is-avp.html
  - Supports: service overview (fine-grained permissions management + authorization service)
  - Accessed: 2025-12-30
  - Confidence: High

- https://docs.aws.amazon.com/verifiedpermissions/latest/userguide/getting-started-first-policy-store.html
  - Supports: policy store creation + policy creation + “test bench” decision testing via simulated authorization request
  - Accessed: 2025-12-30
  - Confidence: High

### Permit.io (SaaS)

- https://docs.permit.io/quickstart
  - Supports: policy editor setup; basic RBAC policy creation in UI
  - Accessed: 2025-12-30
  - Confidence: High

- https://docs.permit.io/how-to/use-audit-logs/types-and-filtering
  - Supports: decision logs + filtering; includes decision reason payload concept
  - Accessed: 2025-12-30
  - Confidence: High

- https://docs.permit.io/how-to/SDLC/CI-CD
  - Supports: policy lifecycle CI/CD; environments as policy branches; preview branches flow
  - Accessed: 2025-12-30
  - Confidence: High

### Open Policy Agent (OPA) (OSS)

- https://openpolicyagent.org/docs/latest/http-api-authorization/
  - Supports: HTTP API authorization patterns (API server asks OPA; allow/deny policies; optional JWT data transport)
  - Accessed: 2025-12-30
  - Confidence: High

## Cycle 13 — Feature flags + experimentation contracts (adjacent)

### OpenFeature (OSS standard)

- https://openfeature.dev/docs/specification/
  - Supports: OpenFeature spec overview
  - Accessed: 2025-12-30
  - Confidence: High

- https://openfeature.dev/docs/specification/sections/evaluation-api
  - Supports: standardized evaluation API contract for flag reads
  - Accessed: 2025-12-30
  - Confidence: High

- https://openfeature.dev/docs/specification/sections/providers
  - Supports: provider model (pluggable backends)
  - Accessed: 2025-12-30
  - Confidence: High

- https://openfeature.dev/docs/specification/sections/hooks
  - Supports: hooks extension point (pre/post evaluation)
  - Accessed: 2025-12-30
  - Confidence: High

- https://openfeature.dev/docs/specification/sections/evaluation-context
  - Supports: evaluation context shape/semantics
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/open-feature/spec/main/LICENSE
  - Supports: Apache-2.0 license proof
  - Accessed: 2025-12-30
  - Confidence: High

### Statsig (SaaS)

- https://docs.statsig.com/feature-gates
  - Supports: feature gates primitive
  - Accessed: 2025-12-30
  - Confidence: High

- https://docs.statsig.com/experiments
  - Supports: experiments primitive
  - Accessed: 2025-12-30
  - Confidence: High

- https://docs.statsig.com/metrics
  - Supports: metrics concept/docs
  - Accessed: 2025-12-30
  - Confidence: High

- https://docs.statsig.com/statsig-console/licenses-and-attribution
  - Supports: SDK open-source license statement (ISC)
  - Accessed: 2025-12-30
  - Confidence: Medium

### Firebase Remote Config / A-B testing (SaaS)

- https://firebase.google.com/docs/remote-config
  - Supports: remote config parameters/conditions targeting + rollout concept
  - Accessed: 2025-12-30
  - Confidence: High

- https://firebase.google.com/docs/remote-config/templates
  - Supports: Remote Config templates/versioning workflow
  - Accessed: 2025-12-30
  - Confidence: High

- https://firebase.google.com/docs/ab-testing
  - Supports: A/B testing workflow (experiment + apply winner)
  - Accessed: 2025-12-30
  - Confidence: High

### Optimizely Feature Experimentation (SaaS)

- https://docs.developers.optimizely.com/feature-experimentation/docs/audiences
  - Supports: audiences/targeting conditions documentation
  - Accessed: 2025-12-30
  - Confidence: High

- https://docs.developers.optimizely.com/feature-experimentation/docs/create-a-qa-audience-to-test-experiments
  - Supports: QA audience forcing assignment for testing/debugging
  - Accessed: 2025-12-30
  - Confidence: High

- https://support.optimizely.com/hc/en-us/articles/4410282697997-Feature-Test
  - Supports: Feature Test concept (experiment primitive)
  - Accessed: 2025-12-30
  - Confidence: Medium

### PostHog (OSS-ish + SaaS)

- https://posthog.com/docs/feature-flags
  - Supports: feature flags product docs
  - Accessed: 2025-12-30
  - Confidence: High

- https://posthog.com/docs/experiments
  - Supports: experiments docs
  - Accessed: 2025-12-30
  - Confidence: High

- https://posthog.com/docs/self-host
  - Supports: self-hosting + MIT license posture (docs statement)
  - Accessed: 2025-12-30
  - Confidence: Medium

## Cycle 14 — Feature flag telemetry + event envelope standards (adjacent)

### OpenTelemetry semantic conventions (feature flags) (OSS spec)

- https://opentelemetry.io/docs/specs/semconv/feature-flags/feature-flags-logs/
  - Supports: feature flag evaluation log semantic conventions (standard attributes)
  - Accessed: 2025-12-30
  - Confidence: High

- https://github.com/open-telemetry/semantic-conventions
  - Supports: versioned spec repo source of truth
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/open-telemetry/semantic-conventions/main/LICENSE
  - Supports: Apache-2.0 license proof
  - Accessed: 2025-12-30
  - Confidence: High

### CloudEvents (CNCF spec)

- https://cloudevents.io/
  - Supports: CloudEvents overview/positioning
  - Accessed: 2025-12-30
  - Confidence: High

- https://github.com/cloudevents/spec/blob/main/cloudevents/spec.md
  - Supports: CloudEvents core attributes and JSON/event format details
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/cloudevents/spec/main/cloudevents/spec.md
  - Supports: CloudEvents spec text (raw) for quoting/sectioning core attributes (`id`, `source`, `type`, etc.)
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/cloudevents/spec/main/LICENSE
  - Supports: Apache-2.0 license proof
  - Accessed: 2025-12-30
  - Confidence: High

### RudderStack tracking plans (product docs + OSS license)

- https://www.rudderstack.com/docs/profiles/tracking-plans/
  - Supports: tracking plans + versioning concept as governance surface
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/rudderlabs/rudder-server/master/LICENSE
  - Supports: AGPL-3.0 license proof (restrictive)
  - Accessed: 2025-12-30
  - Confidence: High

## Cycle 15 — Webhook delivery platform primitives (adjacent)

### Svix (OSS + SaaS)

- https://docs.svix.com/retries/
  - Supports: retry schedule with exponential backoff
  - Accessed: 2025-12-30
  - Confidence: High

- https://docs.svix.com/security
  - Supports: webhook security guidance (HMAC signing + timestamps + replay mitigation)
  - Accessed: 2025-12-30
  - Confidence: High

- https://docs.svix.com/receiving/verifying-payloads/
  - Supports: consumer verification workflow docs
  - Accessed: 2025-12-30
  - Confidence: High

- https://docs.svix.com/play/
  - Supports: webhook debugger workflow (Svix Play)
  - Accessed: 2025-12-30
  - Confidence: High

- https://docs.svix.com/opentelemetry-streaming
  - Supports: OpenTelemetry streaming model (spans + attributes) for webhook delivery attempts
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/svix/svix-webhooks/main/LICENSE
  - Supports: MIT license proof
  - Accessed: 2025-12-30
  - Confidence: High

## Cycle 20 — Audit taxonomy + delivery telemetry primitives (adjacent)

### AWS CloudTrail (audit record schema)

- https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-event-reference-record-contents.html
  - Supports: audit record fields (`userIdentity`, `eventTime`, `eventSource`, `eventName`, `sourceIPAddress`, `eventID`, etc.)
  - Accessed: 2025-12-30
  - Confidence: High

## Cycle 21 — Audit schema + correlation standards (adjacent)

### Google Cloud Audit Logs (schema + query workflows)

- https://docs.cloud.google.com/logging/docs/audit
  - Supports: audit log entries and how they use `protoPayload` with an `AuditLog` object; audit log categories/logName patterns
  - Accessed: 2025-12-30
  - Confidence: High

- https://docs.cloud.google.com/logging/docs/audit/understanding-audit-logs
  - Supports: audit payload field examples (`serviceName`, `methodName`, `authenticationInfo`) and interpretation workflow
  - Accessed: 2025-12-30
  - Confidence: High

### W3C Trace Context (traceparent + tracestate)

- https://www.w3.org/TR/trace-context/
  - Supports: standard trace context propagation headers (`traceparent`, `tracestate`)
  - Accessed: 2025-12-30
  - Confidence: High

### W3C Baggage (key-value propagation)

- https://www.w3.org/TR/baggage/
  - Supports: standard `baggage` header for key-value context propagation
  - Accessed: 2025-12-30
  - Confidence: High

## Cycle 22 — Audit log streaming + exports as product primitives (adjacent)

### GitHub Enterprise Cloud audit log (streaming + API)

- https://docs.github.com/api/article/body?pathname=/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/streaming-the-audit-log-for-your-enterprise
  - Supports: supported audit log streaming providers + “Check endpoint” validation + encrypted streaming notes
  - Accessed: 2025-12-30
  - Confidence: High

- https://docs.github.com/api/article/body?pathname=/en/enterprise-cloud@latest/rest/enterprise-admin/audit-log
  - Supports: stream key endpoint + CRUD endpoints for audit log stream configurations (provider abstraction)
  - Accessed: 2025-12-30
  - Confidence: High

- https://docs.github.com/api/article/body?pathname=/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/exporting-audit-log-activity-for-your-enterprise
  - Supports: JSON/CSV export workflow + export constraints + alternative API/streaming pointers
  - Accessed: 2025-12-30
  - Confidence: High

### GitLab audit events (UI + API constraints)

- https://docs.gitlab.com/ee/user/compliance/audit_events.html
  - Supports: role-based access + retention statement + API query window limits + filter constraints
  - Accessed: 2025-12-30
  - Confidence: High

### WorkOS audit logs (schema + exports + retention)

- https://workos.com/docs/reference/audit-logs
  - Supports: audit log schema registry + export endpoints + retention controls + configuration endpoints
  - Accessed: 2025-12-30
  - Confidence: High

## Cycle 23 — Code-shaped audit log APIs (adjacent)

### Okta System Log API + Log Streaming API (OpenAPI)

- https://developer.okta.com/docs/api/page-data/openapi/okta-management/management/tag/SystemLog/page-data.json
  - Supports: OpenAPI spec for `/api/v1/logs` (query params: since/until/after/filter/q/limit/sortOrder; pagination via `rel=next` link header)
  - Accessed: 2025-12-30
  - Confidence: High

- https://developer.okta.com/docs/api/page-data/openapi/okta-management/management/tag/LogStream/page-data.json
  - Supports: OpenAPI spec for `/api/v1/logStreams` (CRUD + activate/deactivate) + stated constraint (up to 2 integrations per org in pageContext description)
  - Accessed: 2025-12-30
  - Confidence: High

### GitHub Enterprise audit log streaming (REST config schema)

- https://docs.github.com/api/article/body?pathname=/en/enterprise-cloud@latest/rest/enterprise-admin/audit-log
  - Supports: stream config schemas (`stream_type` + `stream_details` + `enabled`/`paused_at`) + stream-key endpoint for encrypting secrets + config CRUD endpoints
  - Accessed: 2025-12-30
  - Confidence: High

### WorkOS audit logs (endpoint taxonomy)

- https://workos.com/docs/reference/audit-logs
  - Supports: endpoint taxonomy for audit-as-a-product (`/audit_logs/events`, `/audit_logs/actions`, `/audit_logs/actions/:name/schemas`, `/audit_logs/exports`, retention endpoints)
  - Accessed: 2025-12-30
  - Confidence: Medium (HTML is large/JS-heavy; endpoints visible in content)

## Cycle 24 — destination schemas + stream-only event taxonomy (adjacent)

### Okta Log Streaming (destination schema endpoints)

- https://developer.okta.com/docs/api/page-data/openapi/okta-management/management/tag/LogStream/page-data.json
  - Supports: destination types enum (`aws_eventbridge`, `splunk_cloud_logstreaming`) + schema endpoints (`/api/v1/meta/schemas/logStream*`) + lifecycle endpoints (activate/deactivate)
  - Accessed: 2025-12-30
  - Confidence: High

### GitHub audit log events (stream-only and export-only visibility)

- https://docs.github.com/api/article/body?pathname=/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/audit-log-events-for-your-enterprise
  - Supports: explicit “only available via audit log streaming” events (and per-event field lists)
  - Accessed: 2025-12-30
  - Confidence: High

- https://docs.github.com/api/article/body?pathname=/en/enterprise-cloud@latest/organizations/keeping-your-organization-secure/managing-security-settings-for-your-organization/audit-log-events-for-your-organization
  - Supports: explicit “not available in web interface, only via REST API / audit log streaming / exports” events (and per-event field lists)
  - Accessed: 2025-12-30
  - Confidence: High

## Cycle 25 — workflow automation primitives (n8n + ops/run UX) (adjacent)

### n8n (workflow executions + debugging)

- https://docs.n8n.io/workflows/executions/all-executions/
  - Supports: executions as a first-class list/ops surface (“All executions”)
  - Accessed: 2025-12-30
  - Confidence: High

- https://docs.n8n.io/workflows/executions/debug/
  - Supports: debugging executions (operator workflow for investigating failures)
  - Accessed: 2025-12-30
  - Confidence: High

### n8n (error handling + flow logic)

- https://docs.n8n.io/flow-logic/error-handling/
  - Supports: explicit error handling patterns as part of workflow design
  - Accessed: 2025-12-30
  - Confidence: High

### n8n (RBAC + projects)

- https://docs.n8n.io/user-management/rbac/
  - Supports: RBAC as an admin primitive (role types + access control framing)
  - Accessed: 2025-12-30
  - Confidence: High

- https://docs.n8n.io/user-management/rbac/projects/
  - Supports: “projects” as a scoping primitive for organizing work and access (ownership boundary)
  - Accessed: 2025-12-30
  - Confidence: High

### n8n license posture (adoption constraints)

- https://raw.githubusercontent.com/n8n-io/n8n/master/LICENSE.md
  - Supports: Sustainable Use License (restricts commercial redistribution/usage; not permissive OSS)
  - Accessed: 2025-12-30
  - Confidence: High

## Cycle 26 — templates/sharing + reusable building blocks + run logs exports (Slack + GitHub Actions + Retool Workflows) (adjacent)

### GitHub Actions (starter workflows + reuse + marketplace)

- https://docs.github.com/en/actions/using-workflows/using-starter-workflows
  - Supports: starter workflows (templates) as a first-class onboarding pattern
  - Accessed: 2025-12-30
  - Confidence: High

- https://docs.github.com/en/actions/learn-github-actions/reusing-workflows
  - Supports: reusable workflows (composable building blocks shared across workflows)
  - Accessed: 2025-12-30
  - Confidence: High

- https://github.com/marketplace?type=actions
  - Supports: marketplace distribution for reusable steps (ecosystem pattern)
  - Accessed: 2025-12-30
  - Confidence: High

### Retool Workflows (run logs + JSON export + triggers + env vars)

- https://docs.retool.com/workflows/
  - Supports: workflows positioning (“build, schedule, and monitor jobs, alerts, ETL tasks”)
  - Accessed: 2025-12-30
  - Confidence: Medium (statement visible in page description/heading)

- https://docs.retool.com/workflows/concepts/logs
  - Supports: run logs filtering + JSON download as an “export/debug” primitive
  - Accessed: 2025-12-30
  - Confidence: High

- https://docs.retool.com/workflows/guides/triggers/
  - Supports: trigger configuration UX as a first-class guide
  - Accessed: 2025-12-30
  - Confidence: Medium (doc page is JS-heavy but canonical)

- https://docs.retool.com/workflows/reference/environment-variables
  - Supports: environment variables for workflows (self-hosted config boundary)
  - Accessed: 2025-12-30
  - Confidence: High

### Slack Workflow Builder (in-chat workflow creation + governance toggle)

- https://slack.com/help/articles/17542172840595-Build-a-workflow--Create-a-workflow-in-Slack
  - Supports: Workflow Builder creation surface + governance note about who can create workflows (via Help Center article)
  - Accessed: 2025-12-30
  - Confidence: Medium (Help Center appears JS-rendered; meta description is accessible in HTML)

## Cycle 27 — template galleries + discovery UX + template taxonomy APIs (Zapier + n8n templates library + IFTTT) (adjacent)

### Zapier Templates (use-case categories + template detail pages)

- https://zapier.com/templates
  - Supports: templates catalog + use-case grouping + template detail URLs (templates as first-class objects)
  - Accessed: 2025-12-30
  - Confidence: High (HTML contains category and detail links)

### n8n templates library (public API endpoints)

- https://api.n8n.io/api/templates/search/filters
  - Supports: template search filters with categories + hit counts (faceted search primitive)
  - Accessed: 2025-12-30
  - Confidence: High

- https://api.n8n.io/api/templates/categories
  - Supports: category taxonomy for templates (including AI and subcategories)
  - Accessed: 2025-12-30
  - Confidence: High

- https://api.n8n.io/api/templates/workflows
  - Supports: templates/workflows catalog endpoint returning JSON (very large payload; confirms first-class catalog)
  - Accessed: 2025-12-30
  - Confidence: High (endpoint returns 200; payload size indicates full catalog)

- https://n8n.io/workflows
  - Supports: templates UI page embedding template search endpoints (productized template discovery)
  - Accessed: 2025-12-30
  - Confidence: High

### IFTTT Explore / Applets (public gallery + search + popularity signals)

- https://ifttt.com/explore
  - Supports: explore tabs (All/Applets/Services/Stories) + search (“Search Applets or services”) + applet cards with install counts
  - Accessed: 2025-12-30
  - Confidence: High

### Hookdeck (SaaS)

- https://hookdeck.com/docs/retries
  - Supports: retries (manual/scheduled/automatic) + best practices
  - Accessed: 2025-12-30
  - Confidence: High

- https://hookdeck.com/docs/destinations
  - Supports: destinations object model for delivery targets
  - Accessed: 2025-12-30
  - Confidence: High

### Stripe Webhooks (SaaS)

- https://docs.stripe.com/webhooks
  - Supports: webhook endpoints product surface
  - Accessed: 2025-12-30
  - Confidence: High

- https://docs.stripe.com/webhooks/signatures
  - Supports: signature verification guidance
  - Accessed: 2025-12-30
  - Confidence: High

- https://docs.stripe.com/webhooks/best-practices
  - Supports: webhook handling best practices
  - Accessed: 2025-12-30
  - Confidence: Medium

### GitHub Webhooks (SaaS)

- https://docs.github.com/en/webhooks/using-webhooks/handling-webhook-deliveries
  - Supports: receiver handling + response timing guidance
  - Accessed: 2025-12-30
  - Confidence: High

- https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries
  - Supports: webhook signature validation (secret token + HMAC SHA-256 header)
  - Accessed: 2025-12-30
  - Confidence: High

- https://docs.github.com/en/webhooks/testing-and-troubleshooting-webhooks/redelivering-webhooks
  - Supports: redelivery workflow
  - Accessed: 2025-12-30
  - Confidence: High

## Cycle 16 — Webhook deliveries UX: retention/redaction + idempotency + receiver SLAs (adjacent)

### Svix retention + object storage

- https://docs.svix.com/retention
  - Supports: payload retention period + optional delete-on-success behavior + tradeoff notes
  - Accessed: 2025-12-30
  - Confidence: High

- https://docs.svix.com/advanced-endpoints/object-storage
  - Supports: object storage endpoint type (S3/GCS/Azure Blob)
  - Accessed: 2025-12-30
  - Confidence: High

- https://docs.svix.com/receiving/verifying-payloads/how-manual
  - Supports: manual verification guidance (timestamp header checks, signature construction)
  - Accessed: 2025-12-30
  - Confidence: High

### Hookdeck idempotency guide

- https://hookdeck.com/webhooks/guides/implement-webhook-idempotency
  - Supports: “at least once” delivery + idempotency strategies (unique constraint; processed webhooks table; header examples)
  - Accessed: 2025-12-30
  - Confidence: High

### GitHub webhooks ops basics (markdown API)

- https://docs.github.com/api/article/body?pathname=/en/webhooks/using-webhooks/handling-webhook-deliveries
  - Supports: receiver SLA (2XX within 10 seconds) + handling guidance
  - Accessed: 2025-12-30
  - Confidence: High

- https://docs.github.com/api/article/body?pathname=/en/webhooks/using-webhooks/validating-webhook-deliveries
  - Supports: secret token + secure storage guidance + signature header details
  - Accessed: 2025-12-30
  - Confidence: High

- https://docs.github.com/api/article/body?pathname=/en/webhooks/testing-and-troubleshooting-webhooks/redelivering-webhooks
  - Supports: redelivery constraints + permission gating + time bounds
  - Accessed: 2025-12-30
  - Confidence: High

## Cycle 17 — Payload redaction + safe delivery viewer UX (adjacent)

### Svix transformations

- https://docs.svix.com/transformations
  - Supports: transformations modify method/URL/body in-flight via JS (payload shaping/redaction concepts)
  - Accessed: 2025-12-30
  - Confidence: High

### Hookdeck events viewer

- https://hookdeck.com/docs/events.md
  - Supports: event inspection (request/response payloads), custom columns, filtering constraints for large payloads
  - Accessed: 2025-12-30
  - Confidence: High

### OpenTelemetry Collector Contrib processors (OSS)

- https://raw.githubusercontent.com/open-telemetry/opentelemetry-collector-contrib/main/processor/attributesprocessor/README.md
  - Supports: `delete` + `hash` actions; explicitly mentions redacting sensitive information
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/open-telemetry/opentelemetry-collector-contrib/main/processor/transformprocessor/README.md
  - Supports: replace/truncate/delete-key functions for masking/redaction patterns
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/open-telemetry/opentelemetry-collector-contrib/main/LICENSE
  - Supports: Apache-2.0 license proof
  - Accessed: 2025-12-30
  - Confidence: High

## Cycle 18 — Payload viewing policy + operator recovery UX (adjacent)

### Svix App Portal (logs/replay/testing)

- https://docs.svix.com/receiving/using-app-portal/filtering-logs
  - Supports: log filtering UX (endpoint-scoped logs + date filter presets)
  - Accessed: 2025-12-30
  - Confidence: High

- https://docs.svix.com/receiving/using-app-portal/replaying-messages
  - Supports: resend single message and replay failures since timestamp
  - Accessed: 2025-12-30
  - Confidence: High

- https://docs.svix.com/receiving/using-app-portal/testing-events
  - Supports: testing tab to send example events and inspect payload + attempts
  - Accessed: 2025-12-30
  - Confidence: High

### Hookdeck issues + notifications

- https://hookdeck.com/docs/issues.md
  - Supports: issues + notifications + bulk retry workflow; notes that notifications contain payload of failed webhook
  - Accessed: 2025-12-30
  - Confidence: High

## Cycle 19 — Schema + taxonomy primitives (event registry, examples, grouping; issues as API objects)

### Svix event type schema + event catalog

- https://docs.svix.com/tutorials/event-type-schema
  - Supports: dot-delimited event type grouping in UI; attaching JSON Schema Draft 7; schema preview and example payload concepts
  - Accessed: 2025-12-30
  - Confidence: High

- https://docs.svix.com/receiving/using-app-portal/event-catalog
  - Supports: event catalog shows event definition and example payload per event type
  - Accessed: 2025-12-30
  - Confidence: High

### Hookdeck issues API references

- https://hookdeck.com/docs/issues.md
  - Supports: issues endpoints references (`GET /issues`, `GET/PUT/DELETE /issues/:id`) and notifications webhooks toggle
  - Accessed: 2025-12-30
  - Confidence: High

## Transfer pattern evidence (optional)

- <docs/blog that proves workflow>
  - Supports:
  - Accessed:
  - Confidence:
