---
compaction: 0001
created_at: "2025-12-29 20:37"
range: "0001-0010"
max_bytes: 1048576
per_step_budget_bytes: 98304
---

# Compaction 0001 (0001–0010)

## ✅ Summary (fill this after compaction)

- Automation control plane pattern repeats across tools: trigger → actions → approvals → run history → audit trail (Zapier/n8n/Pipedream/Workato patterns referenced in artifacts).
- Feature flags/experiments converge on governance primitives: environments, approvals, staged rollout, and auditability (LaunchDarkly/Unleash/GrowthBook patterns).
- “Connections” are a first-class platform object for embedded integrations: explicit states + connect portal + logs/timeline reduces support burden (Apideck/Paragon/Codat/Merge patterns).
- Credential governance is a shared admin primitive: inventory → rotate/revoke → audit log → export (Infisical/Doppler/Auth0/Okta patterns).
- Audit/event exporting benefits from an explicit pipeline model (receivers/processors/exporters) and documented taxonomy (OpenTelemetry + Elastic event taxonomy references).
- Step-up auth + approvals are complementary: step-up confirms identity; approvals confirm intent/oversight; JIT elevation reduces permanent admin sprawl (GitHub sudo mode + Entra PIM patterns).

## 🧩 Patterns / heuristics (fill this after compaction)

- Prompt improvements: default to vendor “docs” URLs that describe primitives (approval rules, audit logs, token lifecycle) vs marketing pages.
- Checklist improvements: for each competitor, always capture (1) governance (RBAC/approvals) + (2) runtime observability (runs/logs/timelines) + (3) export/retention as separate concerns.
- Better stop conditions: if evidence pages are JS-only / blocked, switch to alternative docs URLs or mark as `blocked_evidence` and replace competitor with a better-documented adjacent.

## Steps compacted (trimmed)

### 0001_checkpoint-seeded-49-adjacent-tools-generated-stubs-snapped-20-homepages-triage-report.md

---
step: 0001
created_at: "2025-12-29 02:13"
title: "Checkpoint: seeded 49 adjacent tools + generated stubs + snapped 20 homepages + triage report"
---

# Step 0001: Checkpoint: seeded 49 adjacent tools + generated stubs + snapped 20 homepages + triage report

## ✅ What I did (facts)

- Seeded a longlist of adjacent competitors and generated initial evidence stubs for later deepening.
- Captured homepage snapshots and created a first-pass triage report to prioritize which platforms to deepen.

## 🧠 What I learned (new information)

- Early filtering should bias toward platforms with strong “platform primitives” docs (approvals, audit logs, RBAC, run history), not just marketing claims.

## 🧭 What changes because of this

- Established a working longlist + artifact scaffolding so later cycles could focus on evidence-backed deep dives.

## ➡️ Next step

- Deepen the highest-leverage adjacent platforms first (automation, flags, embedded integrations), using evidence links instead of general commentary.

## 🔗 Links / references

- `artifacts/competitor-matrix.md`
- `artifacts/sources.md`
- `competitors/evidence/`

---

### 0002_checkpoint-snapped-extracted-evidence-for-additional-10-adjacent-winners-hotjar-fullstory-logrocket-amplitude-mixpanel-retool-appsmith-tooljet-budibase-plausible.md

---
step: 0002
created_at: "2025-12-29 02:33"
title: "Checkpoint: snapped + extracted evidence for additional 10 adjacent winners (Hotjar/FullStory/LogRocket/Amplitude/Mixpanel/Retool/Appsmith/ToolJet/Budibase/Plausible)"
---

# Step 0002: Checkpoint: snapped + extracted evidence for additional 10 adjacent winners (Hotjar/FullStory/LogRocket/Amplitude/Mixpanel/Retool/Appsmith/ToolJet/Budibase/Plausible)

## ✅ What I did (facts)

- Captured additional snapshots and evidence extracts for a second batch of adjacent competitors (analytics/session replay/BI/low-code).
- Appended the resulting deepened notes into `artifacts/competitor-matrix.md` to keep the master matrix current.

## 🧠 What I learned (new information)

- Product analytics and replay vendors emphasize “capture everything” + “privacy” framing, which maps to admin observability and governance needs.

## 🧭 What changes because of this

- Expanded the adjacent matrix breadth beyond automation/flags into observability + admin tooling patterns.

## ➡️ Next step

- Pivot from breadth to depth on the primitives most transplantable to an ecommerce admin: approvals, run history, connections, audit logs, RBAC.

## 🔗 Links / references

- `artifacts/competitor-matrix.md`
- `competitors/evidence/`

---

### 0003_checkpoint-deepened-10-more-adjacent-competitors.md

---
step: 0003
created_at: "2025-12-29 02:51"
title: "Checkpoint: deepened 10 more adjacent competitors"
---

# Step 0003: Checkpoint: deepened 10 more adjacent competitors

## ✅ What I did (facts)

- Captured additional homepage snapshots (stable filenames) for the next batch of adjacent competitors.
- Captured additional pricing/docs/features variant snapshots for the same batch (stable filenames; skip-existing enabled).
- Generated 10 new evidence extracts and appended a “batch 2” section to `artifacts/competitor-matrix.md`.

## 🧠 What I learned (new information)

- Analytics vendors (Matomo, Heap) emphasize “capture breadth” and “privacy-first” as major differentiators; those translate into patterns for how we present admin telemetry and privacy controls.
- Feature flag competitors differ sharply in packaging: “enterprise suite” (Split/Harness) vs “simple + affordable + unlimited seats” (ConfigCat).
- Some experimentation competitors remain hard to snapshot (AB Tasty pages returned “Just a moment…”), so “blocked evidence” needs to be tracked explicitly.

## 🧭 What changes because of this

- The adjacent matrix now includes concrete evidence-backed workflows for analytics/CDP/flags/experimentation, which is directly reusable for our admin platform primitives.

## ➡️ Next step

- Use the adjacent evidence to seed a ranked “platform primitives” shortlist (flags, analytics, dashboards) for fastest integration.

## 🔗 Links / references

- `artifacts/competitor-matrix.md`
- `competitors/evidence/` (new evidence extracts for this batch)

---

### 0004_checkpoint-tranche-1-deepened-automation-feature-flags-zapier-n8n-pipedream-temporal-launchdarkly-unleash-growthbook-flagsmith-added-evidence-links-12-reusable-primitives.md

---
step: 0004
created_at: "2025-12-29 19:20"
title: "Checkpoint: Tranche 1 deepened automation + feature flags (Zapier/n8n/Pipedream/Temporal + LaunchDarkly/Unleash/GrowthBook/Flagsmith); added evidence links + 12 reusable primitives"
---

# Step 0004: Checkpoint: Tranche 1 deepened automation + feature flags (Zapier/n8n/Pipedream/Temporal + LaunchDarkly/Unleash/GrowthBook/Flagsmith); added evidence links + 12 reusable primitives

## ✅ What I did (facts)

- Added tranche #1 evidence-backed primitives + thin-slice plans for 8 adjacent competitors:
  - Workflow automation: Zapier, n8n, Pipedream, Temporal
  - Feature flags/experimentation: LaunchDarkly, Unleash, GrowthBook, Flagsmith
- Updated plan artifacts with URLs supporting specific workflow/feature claims:
  - `artifacts/sources.md` (added doc URLs per competitor)
  - `artifacts/competitor-matrix.md` (added evidence-backed feature/workflow bullets + thin slices)
  - `artifacts/summary.md` (added 12 reusable primitives list with evidence links)
- Wrote/updated per-competitor evidence notes with:
  - 3 notable features + 2 workflows + 3 steal ideas (easy/medium/hard)
  - “how we would implement thin slice in 1–3 days”
  - Files: `competitors/evidence/{zapier,n8n,pipedream,temporal,launchdarkly,unleash,growthbook,flagsmith}.md`

## 🧠 What I learned (new information)

- Automation UX “moat” patterns repeat across Zapier/n8n/Pipedream:
  - Trigger/action mental model + “test run” preview
  - Run history (“executions”) as a first-class object (global + per-workflow views)
  - Reliability controls (retries, error routes) reduce operational load
- Governance patterns repeat across LaunchDarkly/Flagsmith:
  - Approvals + audit logs are the critical primitive for non-engineers operating safely
  - “Release workflow” framing is reusable for any sensitive admin change, not just code releases
- Unleash’s toggle taxonomy (release/ops/permission/experiment) is a clean way to drive safer defaults and warnings in our admin.

## 🧭 What changes because of this

- We can design “automation rules” and “safe changes” as a shared control-plane surface:
  - Change request + approvals + audit log + staged rollout preview
  - Run history + retries/error handling for any automation or background job
- Thin-slice path looks viable:
  - Start with limited triggers/actions + approvals + run history (no generic builder yet)
  - Layer in rollout strategies and scheduling as reusable primitives across admin objects

## ➡️ Next step

- Tranche #2: deepen adjacent “iPaaS / connectors / enterprise automation” competitors that emphasize approvals, credential management, and operational monitoring (N=3–6).
- Fill the remaining gap: capture blocked competitors as `blocked_evidence` where applicable and move on (efficiency > completeness).

## 🔗 Links / references

- Evidence notes: `competitors/evidence/` (see tranche #1 files named above)
- Sources list: `artifacts/sources.md`
- Matrix: `artifacts/competitor-matrix.md`
- Summary (12 reusable primitives): `artifacts/summary.md`

---

### 0005_checkpoint-cycle-1-added-tranche-2-ipaas-cases-orchestration-ui-workato-tines-kestra-camunda-with-evidence-thin-slices.md

---
step: 0005
created_at: "2025-12-29 19:53"
title: "Checkpoint: Cycle 1 added tranche 2 iPaaS/cases/orchestration UI (Workato/Tines/Kestra/Camunda) with evidence + thin slices"
---

# Step 0005: Checkpoint: Cycle 1 added tranche 2 iPaaS/cases/orchestration UI (Workato/Tines/Kestra/Camunda) with evidence + thin slices

## ✅ What I did (facts)

- Initialized autopilot-required logs for this plan:
  - `artifacts/agent-plan.md`, `artifacts/prompt-log.md`, `artifacts/output-index.md`, `artifacts/skills-log.md`
- Filled previously placeholder-only context files so future cycles start with real state:
  - `context/context.md`
  - `context/steps/0004_...md`
- Deepened tranche 2 adjacent competitors (N=4) with evidence-backed primitives and 1–3 day thin slices:
  - Workato (environments + ops hub dashboard + audit log)
  - Tines (cases + tasks + story runs + audit logs)
  - Kestra (UI + executions + approval processes; Apache-2.0 license evidence)
  - Camunda Platform 7 (tasklist + cockpit; Apache-2.0 license evidence)
- Updated plan artifacts:
  - `artifacts/sources.md` (added tranche 2 URLs + license proofs)
  - `artifacts/competitor-matrix.md` (added batch 5 deepened sections)
  - `artifacts/summary.md` (added tranche 2 primitives + durable insights)
- Created per-competitor evidence notes:
  - `competitors/evidence/{workato,tines,kestra,camunda}.md`

## 🧠 What I learned (new information)

- Workato explicitly documents the three “ops primitives” we need for safe merchant-admin automation:
  - environments (promotion workflow), operations hub dashboard (health/monitoring), and activity audit logs.
  - Evidence: https://docs.workato.com/en/recipes/managing-recipes.html
- Tines uses a clean “automation + case work” split:
  - automations produce runs; exceptions become cases; cases contain tasks.
  - Evidence: https://www.tines.com/docs/cases/overview/
- Kestra provides a strong OSS reference for “executions” UI as a reusable admin primitive (run history + drilldowns).
  - Evidence: https://kestra.io/docs/ui/executions
- Camunda’s Tasklist + Cockpit pairing is a canonical UX blueprint:
  - approvals inbox for humans + operational monitoring for operators.
  - Evidence: https://docs.camunda.org/manual/latest/user-guide/tasklist/ and https://docs.camunda.org/manual/latest/webapps/cockpit/

## 🧭 What changes because of this

- We can treat “automation reliability” as a product surface, not an implementation detail:
  - ops hub + executions + audit logs should be first-class in our admin from day 1 of automation.
- For approvals/human workflows, “cases + tasks” is a transferable pattern that avoids overfitting branching logic.
- License posture improved for tranche 2 OSS references:
  - Kestra and Camunda platform repo licenses are Apache-2.0 (per LICENSE text).

## ➡️ Next step

- Cycle 2: deepen “connectors / credentials / integration setup wizard” primitives (N=3–6) with evidence (e.g., Airbyte-style connection wizards + run logs + retries).
- Fill remaining gaps:
  - tag any blocked pages as `blocked_evidence` and move on (efficiency).
  - convert top primitives into a thin-slice backlog for the ecommerce admin.

## 🔗 Links / references

- Sources list: `artifacts/sources.md` (tranche 2 section)
- Matrix: `artifacts/competitor-matrix.md` (batch 5)
- Summary: `artifacts/summary.md` (tranche 2 primitives)
- Evidence notes: `competitors/evidence/{workato,tines,kestra,camunda}.md`

---

### 0006_checkpoint-cycle-2-deepened-embedded-integrations-primitives-apideck-paragon-nango-airbyte-incl-connection-states-portals-logs-license-flags.md

---
step: 0006
created_at: "2025-12-29 20:00"
title: "Checkpoint: Cycle 2 deepened embedded integrations primitives (Apideck/Paragon/Nango/Airbyte) incl. connection states, portals, logs, license flags"
---

# Step 0006: Checkpoint: Cycle 2 deepened embedded integrations primitives (Apideck/Paragon/Nango/Airbyte) incl. connection states, portals, logs, license flags

## ✅ What I did (facts)

- Deepened embedded integrations / unified API adjacent competitors (N=4) with evidence-backed primitives:
  - Apideck (Vault + connection states + token refresh edge case)
  - Paragon (Connect Portal + event logs + multi-account auth)
  - Nango (connections API + sync status + environments; **ELv2** license flagged)
  - Airbyte (connection setup wizard + connection timeline + jobs model; **ELv2** license flagged)
- Updated artifacts:
  - `artifacts/sources.md` (added Cycle 2 URLs + license proofs)
  - `artifacts/competitor-matrix.md` (added batch 6 deepened entries + thin slices)
  - `artifacts/summary.md` (added Cycle 2 reusable primitives + durable insights)
- Wrote per-competitor evidence notes:
  - `competitors/evidence/{apideck,paragon,nango,airbyte}.md`

## 🧠 What I learned (new information)

- Connection management has repeatable “platform primitives” across vendors:
  - explicit connection state taxonomy (connected/expired/needs_reauth/etc)
  - embedded connect portal UX (catalog + connect CTA)
  - event logs / run logs for debugging
  - multi-account authorization is common (not an edge case)
- OAuth token refresh race conditions are common enough to deserve a platform-level lock/coordination strategy.  
  Evidence: https://developers.apideck.com/guides/refresh-token-race-condition
- License posture constraint: both Nango and Airbyte use ELv2, which is not permissive and can restrict hosted/managed service use.  
  Evidence: https://raw.githubusercontent.com/NangoHQ/nango/master/LICENSE  
  Evidence: https://raw.githubusercontent.com/airbytehq/airbyte/master/LICENSE

## 🧭 What changes because of this

- “Integrations settings” can be modeled as a portal + state-driven actions + logs:
  - if state is explicit, UI can guide the user (“Reconnect”, “Fix credentials”) without support escalation
  - logs/timeline enables support and self-serve debugging
- Multi-account support should be designed in early (store A/store B) to avoid painful retrofits.  
  Evidence: https://docs.useparagon.com/apis/api-reference/multi-account-authorization
- OSS adoption candidates in this space require license screening before engineering commits.

## ➡️ Next step

- Cycle 3: deepen more “connectors/wizard/credentials” adjacent competitors with permissive posture or SaaS-only patterns (N=3–6).
- Optional: convert top Cycle 2 primitives into a thin-slice backlog for ecommerce admin (integration catalog + connection states + logs + multi-account).

## 🔗 Links / references

- Matrix: `artifacts/competitor-matrix.md` (batch 6)
- Sources: `artifacts/sources.md` (Cycle 2 section)
- Summary: `artifacts/summary.md` (Cycle 2 section)
- Evidence notes: `competitors/evidence/{apideck,paragon,nango,airbyte}.md`

---

### 0007_checkpoint-cycle-3-deepened-embedded-integrations-platforms-codat-prismatic-tray-merge-focusing-on-portals-auth-logs-sync-monitoring.md

---
step: 0007
created_at: "2025-12-29 20:09"
title: "Checkpoint: Cycle 3 deepened embedded integrations platforms (Codat/Prismatic/Tray/Merge) focusing on portals, auth, logs, sync monitoring"
---

# Step 0007: Checkpoint: Cycle 3 deepened embedded integrations platforms (Codat/Prismatic/Tray/Merge) focusing on portals, auth, logs, sync monitoring

## ✅ What I did (facts)

- Deepened embedded integrations platform competitors (N=4) with evidence-backed primitives:
  - Codat (embedded link flow, connections, sync monitoring, webhooks)
  - Prismatic (embedded marketplace, connections, OAuth custom redirects, debugging)
  - Tray.io (authentications objects, embedded auth-only dialog, debug logs, log streaming)
  - Merge.dev (link flow, linked accounts, sync status, webhooks)
- Updated plan artifacts:
  - `artifacts/sources.md` (added Cycle 3 URLs)
  - `artifacts/competitor-matrix.md` (added batch 7 deepened entries with thin slices)
  - `artifacts/summary.md` (added Cycle 3 reusable primitives + durable insights)
- Created per-competitor evidence notes:
  - `competitors/evidence/{codat,prismatic,tray-io,merge-dev}.md`
- Updated rolling context so next cycles start from current state:
  - `context/context.md` (recent progress bullets for cycles 1–3)

## 🧠 What I learned (new information)

- Embedded integrations platforms converge on the same primitives:
  - portal/catalog UI (marketplace)
  - first-class connection/auth objects
  - sync monitoring + timelines/job history
  - logs + optional log export/streaming
- “Auth-only” embedding is an explicit pattern (connect credentials without exposing automation UI).  
  Evidence: https://docs.tray.ai/platform/embedded/key-concepts/auth-only-dialog
- Multi-tenant OAuth is a platform-level concern (custom redirects + account-level connections).  
  Evidence: https://prismatic.io/docs/integrations/connections/oauth2/custom-redirects/ and https://docs.merge.dev/hris/linked-accounts/

## 🧭 What changes because of this

- Our ecommerce admin can ship an “integrations control plane” without building a full iPaaS:
  - catalog → connect/reauthorize → status/timeline → logs → retry
- Observability UX is part of product scope (sync monitor + debug logs), not a backend-only concern.
- We can model credentials as shareable objects (“saved connections”) to simplify multi-integration setups.  
  Evidence: https://docs.tray.ai/platform/connectivity/authentications

## ➡️ Next step

- Cycle 4: pick 3–6 competitors focused specifically on credential governance + security (RBAC, audit logs, secrets rotation) for integrations/admin.
- Optional: convert the “integrations control plane” into a thin-slice backlog (1–3 day increments) across our admin.

## 🔗 Links / references

- Matrix: `artifacts/competitor-matrix.md` (batch 7)
- Sources: `artifacts/sources.md` (Cycle 3 section)
- Summary: `artifacts/summary.md` (Cycle 3 section)
- Evidence notes: `competitors/evidence/{codat,prismatic,tray-io,merge-dev}.md`

---

### 0008_checkpoint-cycle-4-deepened-credential-governance-primitives-infisical-vault-doppler-auth0-okta.md

---
step: 0008
created_at: "2025-12-29 20:22"
title: "Checkpoint: Cycle 4 deepened credential governance primitives (Infisical/Vault/Doppler/Auth0/Okta)"
---

# Step 0008: Checkpoint: Cycle 4 deepened credential governance primitives (Infisical/Vault/Doppler/Auth0/Okta)

## ✅ What I did (facts)

- Added Cycle 4 plan targeting credential governance primitives (RBAC, audit logs, token lifecycle, log streaming).
- Captured evidence-backed notes for 5 adjacent platforms: Infisical, HashiCorp Vault, Doppler, Auth0, Okta.
- Appended a new batch to the competitor matrix with copyable workflows + “steal ideas” + 1–3 day thin slices.
- Updated sources ledger with stable doc URLs and explicit license proof links where relevant.

## 🧠 What I learned (new information)

- “Audit logs” is the common denominator across secrets + identity + automation: it’s a product surface, not a backend afterthought.
- Log export/streaming is a recurring enterprise primitive (Auth0 Log Streams; Vault audit devices), and it generalizes to “integration/credential events”.
- Token lifecycle UX (show-once secret, inventory, revoke/rotate) is a highly transferable admin pattern (Doppler + Okta).
- Vault’s BUSL license posture is restrictive for embedding/hosting; best treated as a pattern reference unless legal approves.
- Infisical repository LICENSE explicitly states MIT outside `ee/` (useful as OSS reference/adoption candidate pending requirements).

## 🧭 What changes because of this

- Adds a clear “credential governance” control plane concept we can transplant into the ecommerce admin: credential inventory → rotate/revoke → audit trail → export.
- Suggests we should design audit logs as an event stream schema early (actor/target/action/outcome) to support both UI filters and exports.
- Clarifies which OSS references are safe vs risky by license (Infisical more permissive-ish; Vault restrictive).

## ➡️ Next step

- Consider a follow-on tranche for “observability exports + governance”: Datadog log pipelines, Splunk HEC, Sentry audit events, OpenTelemetry log export patterns (N=3–6).
- Alternatively, deepen “approvals for sensitive admin actions” (Step-up auth / MFA prompts / break-glass flows) using adjacent patterns from Auth providers (Okta/Auth0) + admin consoles.

## 🔗 Links / references

- Evidence notes: `competitors/evidence/infisical.md`
- Evidence notes: `competitors/evidence/hashicorp-vault.md`
- Evidence notes: `competitors/evidence/doppler.md`
- Evidence notes: `competitors/evidence/auth0.md`
- Evidence notes: `competitors/evidence/okta.md`
- Sources ledger: `artifacts/sources.md`

---

### 0009_checkpoint-cycle-5-deepened-observability-export-primitives-datadog-splunk-sentry-opentelemetry-elastic.md

---
step: 0009
created_at: "2025-12-29 20:28"
title: "Checkpoint: Cycle 5 deepened observability export primitives (Datadog/Splunk/Sentry/OpenTelemetry/Elastic)"
---

# Step 0009: Checkpoint: Cycle 5 deepened observability export primitives (Datadog/Splunk/Sentry/OpenTelemetry/Elastic)

## ✅ What I did (facts)

- Picked Cycle 5 tranche focused on “audit event export” patterns (pipelines, sinks, retention) adjacent to ecommerce admin governance.
- Added 5 competitor/standard entries with evidence-backed notes: Datadog, Splunk (HEC), Sentry, OpenTelemetry Collector, Elastic Stack.
- Updated the competitor matrix with notable features + copyable workflows + steal ideas + 1–3 day thin slices.
- Updated the sources ledger with stable doc URLs and license posture links where needed (OTEL Apache-2.0; Elastic restrictive mix).

## 🧠 What I learned (new information)

- The “receivers → processors → exporters” mental model (OpenTelemetry Collector) is a crisp reference architecture for audit event exporting.
- “Pipelines” are the missing product layer for audit logs: they centralize redaction/enrichment and prevent per-feature PII drift.
- External sinks (like Splunk HEC) are fundamentally “token + endpoint + health checks” — which maps well to an admin setup wizard.
- A documented audit event taxonomy (Elastic/Kibana) is a lever: it stabilizes UI filters and makes sink mappings predictable.
- Elastic’s license posture is complex (AGPL/SSPL/ELv2 mix) so it’s safer as a pattern reference unless adoption is explicitly approved.

## 🧭 What changes because of this

- Strengthens the recommendation that audit logs should be built as an event stream + export pipeline from day 1 (not bolted on later).
- Suggests a minimal product surface for export: sinks list + test event + delivery health + processor configuration + retention/archive toggle.
- Clarifies a near-term thin slice: webhook exporter first, then add “Splunk HEC-style” exporter template.

## ➡️ Next step

- Deepen “step-up auth / approvals for sensitive actions” patterns (N=3–6) using adjacent identity/admin consoles (Okta/Auth0) plus admin UX patterns.
- Alternatively, deepen 3–5 “export sink” targets (Datadog intake, Splunk HEC, generic webhook, S3 archive) and specify a canonical audit event schema.

## 🔗 Links / references

- Evidence notes: `competitors/evidence/datadog.md`
- Evidence notes: `competitors/evidence/splunk.md`
- Evidence notes: `competitors/evidence/sentry.md`
- Evidence notes: `competitors/evidence/opentelemetry-collector.md`
- Evidence notes: `competitors/evidence/elastic-stack.md`
- Sources ledger: `artifacts/sources.md`

---

### 0010_checkpoint-cycle-6-deepened-step-up-auth-approvals-github-gitlab-entra-pim-aws-stripe.md

---
step: 0010
created_at: "2025-12-29 20:37"
title: "Checkpoint: Cycle 6 deepened step-up auth + approvals (GitHub/GitLab/Entra PIM/AWS/Stripe)"
---

# Step 0010: Checkpoint: Cycle 6 deepened step-up auth + approvals (GitHub/GitLab/Entra PIM/AWS/Stripe)

## ✅ What I did (facts)

- Picked Cycle 6 tranche focused on “step-up auth + approvals for sensitive actions” primitives that can transplant into an ecommerce admin.
- Captured evidence-backed notes for 5 adjacent platforms: GitHub, GitLab, Microsoft Entra PIM, AWS IAM/CloudTrail, Stripe.
- Appended a new batch to the competitor matrix with copyable workflows + steal ideas + thin-slice plans.
- Updated sources ledger with URLs supporting step-up sessions, required reviewers/approvals, JIT elevation, MFA, and audit trails.

## 🧠 What I learned (new information)

- Step-up auth (“sudo mode”) is a productized session concept: re-auth once, then temporarily allow sensitive actions, with a timer reset on each sensitive action.
- Approvals are a separate governance layer from step-up: approvals confirm intent/oversight; step-up confirms identity.
- JIT elevation (Entra PIM) reduces “permanent admin sprawl” by making privilege time-bounded and optionally approval-gated.
- MFA + audit trail pairing (AWS IAM + CloudTrail) is a baseline blueprint for security reviews and incident response.
- GitLab’s licensing text explicitly states MIT outside enterprise directories (useful as reference/adoption candidate depending on scope).

## 🧭 What changes because of this

- Strengthens recommendation that our admin should have three shared primitives: step-up sessions, approvals inbox, and protected resources registry.
- Clarifies a minimal implementation order: step-up + audit first, then approvals for the highest-risk actions, then time-bounded elevation for privileged areas.
- Adds concrete evidence-backed references we can cite when designing dual-control for payouts, bank changes, integration disconnects, and key rotations.

## ➡️ Next step

- Deepen “approval UX + notification” patterns (N=3–6): escalation rules, reminders, SLA timers, auto-cancel of stale approval requests.
- Or deepen “break-glass” access patterns (N=3–6): emergency elevation, explicit reason, post-incident review, strict auditing.

## 🔗 Links / references

- Evidence notes: `competitors/evidence/github.md`
- Evidence notes: `competitors/evidence/gitlab.md`
- Evidence notes: `competitors/evidence/microsoft-entra-pim.md`
- Evidence notes: `competitors/evidence/aws-iam-cloudtrail.md`
- Evidence notes: `competitors/evidence/stripe.md`
- Sources ledger: `artifacts/sources.md`

---

## Cleanup notes

- Step files compacted: 10 (and removed from steps/)
- Compaction file is capped at ~1048576 bytes (configurable via BLACKBOX_CONTEXT_MAX_BYTES).
