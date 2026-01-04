---
compaction: 0002
created_at: "2025-12-30 17:52"
range: "0010-0019"
max_bytes: 1048576
per_step_budget_bytes: 98304
---

# Compaction 0002 (0010–0019)

## ✅ Summary (fill this after compaction)

- Step-up auth (“sudo mode”) and approvals are distinct primitives: step-up proves identity for a time window; approvals add dual-control/oversight for high-risk actions.
- A practical “approvals inbox” needs SLA timers + escalation + reminders + delegation; otherwise approvals exist but don’t clear quickly enough for operations.
- Policy-as-code (OPA/Rego, Cedar, OpenFGA/SpiceDB-style relationship auth, Casbin) is most reusable when paired with: a policy simulator, templates, and explicit audit events for allow/deny decisions.
- Export/observability primitives (SIEM/log export, audit logs) need governed schemas + destinations + lifecycle states, not ad-hoc “download CSV” UX.
- License posture matters for adoption: treat AGPL/GPL/BUSL as constraints; prefer permissive code, and treat restrictive licenses as “pattern reference only.”

## 🧩 Patterns / heuristics (fill this after compaction)

- Prompt improvements: force “thin-slice in 1–3 days” bullets per primitive so findings translate into buildable backlog items.
- Checklist improvements: for every “approval” claim, capture evidence for (a) notification/escalation, (b) delegation/override, (c) audit event emission.
- Better stop conditions: stop a tranche once we have 2–3 concrete workflows + 8–12 reusable primitives with URLs (even if competitors remain).

## Steps compacted (trimmed)

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

### 0011_checkpoint-cycle-7-deepened-approval-inbox-sla-escalation-patterns-jsm-pagerduty-power-automate.md

---
step: 0011
created_at: "2025-12-29 20:48"
title: "Checkpoint: Cycle 7 deepened approval inbox + SLA/escalation patterns (JSM/PagerDuty/Power Automate)"
---

# Step 0011: Checkpoint: Cycle 7 deepened approval inbox + SLA/escalation patterns (JSM/PagerDuty/Power Automate)

## ✅ What I did (facts)

- Picked Cycle 7 tranche focused on approval UX + notification/escalation patterns transplantable into an ecommerce admin.
- Deepened 3 adjacent platforms with evidence pages: Jira Service Management (approvals + SLAs), PagerDuty (escalation policies/timeouts), Power Automate (approval workflow + approvals connector).
- Appended the new competitors to `artifacts/competitor-matrix.md` (features + workflows + steal ideas + thin slices).
- Updated `artifacts/sources.md` and created evidence notes under `competitors/evidence/`.

## 🧠 What I learned (new information)

- SLAs are a productized timer model (start/pause/stop conditions, calendars) that translates directly into “approval due_at + overdue” states.
- Escalation policies are essentially “fallback approver chains” with timeouts; they generalize cleanly from incidents to approvals.
- Treating approvals as a standardized action surface (“connector”) reduces fragmentation across workflows and features.

## 🧭 What changes because of this

- Strengthens recommendation that approvals need three system primitives: inbox, timer/SLA, and escalation chain.
- Suggests a minimal scope that’s buildable quickly: approvals inbox + due_at + reminders, then add escalation to a backup approver.
- Provides evidence-backed reference URLs to justify building reminders/escalations as product features (not ad-hoc cron jobs).

## ➡️ Next step

- Deepen “approval inbox UX” patterns (N=3–6): delegation, bulk actions, snooze, comment threads, and audit exports for approvals.
- Or deepen “policy templates” for high-risk ecommerce actions (payout changes, refunds > threshold, integration disconnect) using approval + step-up patterns from Cycle 6.

## 🔗 Links / references

- Evidence notes: `competitors/evidence/jira-service-management.md`
- Evidence notes: `competitors/evidence/pagerduty.md`
- Evidence notes: `competitors/evidence/power-automate-approvals.md`
- Sources ledger: `artifacts/sources.md`

---

### 0012_checkpoint-cycle-8-deepened-approval-inbox-ux-gitlab-github-jsm.md

---
step: 0012
created_at: "2025-12-29 21:00"
title: "Checkpoint: Cycle 8 deepened approval inbox UX (GitLab/GitHub/JSM)"
---

# Step 0012: Checkpoint: Cycle 8 deepened approval inbox UX (GitLab/GitHub/JSM)

## ✅ What I did (facts)

- Picked Cycle 8 tranche focused on “approval inbox UX” primitives (tabs/states, snooze/deferral, bulk actions, threaded resolution, approver-seat model).
- Collected evidence from GitLab docs (To-Do list + MR reviews), GitHub PR review docs, and Jira Service Management approval stage docs.
- Created 3 evidence extracts and linked them into the matrix and sources:
  - `competitors/evidence/gitlab-inbox.md`
  - `competitors/evidence/github-pull-request-reviews.md`
  - `competitors/evidence/jira-service-management-approval-stage.md`
- Appended Cycle 8 entries to `artifacts/competitor-matrix.md`, updated `artifacts/sources.md`, and added Cycle 8 primitives + insights to `artifacts/summary.md`.

## 🧠 What I learned (new information)

- “Snooze” is more than a UI control: it implies a state transition (`pending → snoozed → pending`) plus `unsnooze_at` + special sorting/ranking rules.  
  Evidence: GitLab To-Do snooze + sorting semantics: https://docs.gitlab.com/user/todos/
- Bulk actions are an essential inbox primitive (select rows, select all on page) once approvals volume increases.  
  Evidence: GitLab bulk edit: https://docs.gitlab.com/user/todos/
- Standardized decision outcomes (approve / request changes / comment) make “approvals” reusable across many feature screens with consistent semantics.  
  Evidence: GitHub PR review outcomes: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews
- A separate “approver seat” can exist without a full admin license/role, enabling external approvals with minimal access.  
  Evidence: JSM approval stage (approvers don’t need JSM license): https://support.atlassian.com/jira-service-management-cloud/docs/set-up-an-approval-stage-for-a-request/

## 🧭 What changes because of this

- Strengthens recommendation that approvals should ship with an “inbox state machine” (`Pending/Snoozed/Done`) before adding complex policy engines.
- Suggests a thin-slice roadmap: inbox tabs + snooze + bulk actions first, then threaded rationale + resolution tracking.
- Adds support for a “limited approver role” concept (approver seats) to reduce over-privileging.

## ➡️ Next step

- Deepen delegation + out-of-office patterns for approvals (delegate approver, temporary delegation, audit trail).
- Deepen “approval portal” patterns (email link → approve/deny) with strict scoping and full audit export.

## 🔗 Links / references

- Evidence notes: `competitors/evidence/gitlab-inbox.md`
- Evidence notes: `competitors/evidence/github-pull-request-reviews.md`
- Evidence notes: `competitors/evidence/jira-service-management-approval-stage.md`
- Sources ledger: `artifacts/sources.md`
- Matrix: `artifacts/competitor-matrix.md`
- Summary: `artifacts/summary.md`

---

### 0013_checkpoint-cycle-9-delegation-approval-portal-email-patterns-power-automate-azure-devops-power-apps.md

---
step: 0013
created_at: "2025-12-29 21:10"
title: "Checkpoint: Cycle 9 delegation + approval portal/email patterns (Power Automate/Azure DevOps/Power Apps)"
---

# Step 0013: Checkpoint: Cycle 9 delegation + approval portal/email patterns (Power Automate/Azure DevOps/Power Apps)

## ✅ What I did (facts)

- Picked Cycle 9 tranche focused on delegation/out-of-office + approval portal/email primitives (handoff, effective_at, email approvals, stage timeline UI).
- Deepened 3 adjacent platforms with evidence pages:
  - Power Automate Approvals (reassign + email approvals)
  - Azure DevOps approvals & checks (deferred approvals + instructions + timeouts)
  - Power Apps approval request screen (approval stages timeline UI template)
- Created 3 new evidence notes and linked them into `artifacts/competitor-matrix.md`, `artifacts/sources.md`, and `artifacts/summary.md`:
  - `competitors/evidence/power-automate-approvals-delegation-email.md`
  - `competitors/evidence/azure-devops-approvals-checks.md`
  - `competitors/evidence/power-apps-approval-request-screen.md`

## 🧠 What I learned (new information)

- Delegation/handoff is a productized approval action (“Reassign”) — this is the minimal out-of-office primitive to prevent approval queues from stalling.  
  Evidence: Power Automate reassign: https://learn.microsoft.com/en-us/power-automate/approvals-howto
- Email approvals need anti-staleness: approvals can be acted on from email inbox and the email can reflect completion to reduce confusion.  
  Evidence: approve from email inbox + email updates: https://learn.microsoft.com/en-us/power-automate/modern-approvals
- Deferring an approval (effective later) is distinct from snoozing: it’s about controlled change windows (approve now, execute later).  
  Evidence: Azure DevOps deferred approvals: https://learn.microsoft.com/en-us/azure/devops/pipelines/process/approvals?view=azure-devops

## 🧭 What changes because of this

- Strengthens recommendation to ship delegation + effective_at early in the approvals primitive, alongside inbox states and SLAs from prior cycles.
- Suggests two “portal” surfaces: (1) email deep link approval, (2) approval request detail page with stages timeline.
- Adds a concrete UI reference for an “approval stages timeline” component to improve explainability for non-admin approvers.

## ➡️ Next step

- Deepen “temporary delegation / OOO schedules” (date-bounded delegation + audit trail) and “approver groups with fallback” patterns.
- Deepen “signed link security model” for external approvers (scope-limited access + replay protection) with evidence.

## 🔗 Links / references

- Evidence: Power Automate reassign approvals: https://learn.microsoft.com/en-us/power-automate/approvals-howto
- Evidence: Power Automate email approvals: https://learn.microsoft.com/en-us/power-automate/modern-approvals
- Evidence: Azure DevOps approvals and checks: https://learn.microsoft.com/en-us/azure/devops/pipelines/process/approvals?view=azure-devops
- Evidence: Power Apps approval request screen: https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/add-screen-context-variables
- Evidence notes: `competitors/evidence/power-automate-approvals-delegation-email.md`
- Evidence notes: `competitors/evidence/azure-devops-approvals-checks.md`
- Evidence notes: `competitors/evidence/power-apps-approval-request-screen.md`
- Sources ledger: `artifacts/sources.md`

---

### 0014_checkpoint-cycle-10-capstone-synthesis-next-actions-cycles-1-9.md

---
step: 0014
created_at: "2025-12-30 17:12"
title: "Checkpoint: Cycle 10 capstone synthesis + next actions (Cycles 1–9)"
---

# Step 0014: Checkpoint: Cycle 10 capstone synthesis + next actions (Cycles 1–9)

## ✅ What I did (facts)

- Consolidated all Step-03 findings across Cycles 1–9 into a single capstone synthesis document with evidence pointers.
- Created a build-ready next-actions backlog that sequences thin slices and highlights key design decisions.
- Linked the capstone artifacts from `artifacts/summary.md` so the run has a single entrypoint for “what to do next”.

## 🧠 What I learned (new information)

- The work coheres into a small set of system primitives (approvals, protected resources + step-up, audit/export pipeline, integrations control plane, automation rules, feature flags) rather than a long list of competitor features.
- “Approvals” is the highest-leverage primitive because it composes with the others: it gates protected actions, it needs audit export, it benefits from automation rules, and it benefits from limited approver seats + email portal delivery.

## 🧭 What changes because of this

- The run is now actionable as a roadmap: the next slice can be picked from `artifacts/next-actions.md` without rereading all competitor entries.
- Engineering can start by defining shared primitives (approval request schema + audit event taxonomy) before building UI, reducing rework.

## ➡️ Next step

- Hand off to Step-04 (OSS mapping) to identify concrete permissive-license components that can implement these primitives (feature flags, audit pipeline/export, workflow engine, connectors).
- Or start a synthesis/PM backlog pass to convert `artifacts/next-actions.md` into tickets with owners, milestones, and acceptance criteria.

## 🔗 Links / references

- Capstone synthesis: `artifacts/whole-run-synthesis.md`
- Backlog / next actions: `artifacts/next-actions.md`
- Summary index: `artifacts/summary.md`
- Matrix (full evidence trail): `artifacts/competitor-matrix.md`

---

### 0015_checkpoint-cycle-11-policy-authorization-primitives-opa-openfga-spicedb-casbin.md

---
step: 0015
created_at: "2025-12-30 17:19"
title: "Checkpoint: Cycle 11 policy/authorization primitives (OPA/OpenFGA/SpiceDB/Casbin)"
---

# Step 0015: Checkpoint: Cycle 11 policy/authorization primitives (OPA/OpenFGA/SpiceDB/Casbin)

## ✅ What I did (facts)

- Ran Cycle 11 focusing on “policy/authorization primitives” to support protected resources + approvals in an ecommerce admin.
- Gathered evidence URLs + Apache-2.0 license proofs for OPA, OpenFGA, SpiceDB, and Casbin.
- Created 4 evidence extracts and wired them into the matrix and summary:
  - `competitors/evidence/open-policy-agent.md`
  - `competitors/evidence/openfga.md`
  - `competitors/evidence/spicedb.md`
  - `competitors/evidence/casbin.md`
- Updated `artifacts/sources.md`, appended Cycle 11 entries to `artifacts/competitor-matrix.md`, and added Cycle 11 primitives/insights to `artifacts/summary.md`.

## 🧠 What I learned (new information)

- Policy engines (OPA/Rego) and Zanzibar-style authorization engines (OpenFGA/SpiceDB) are “code-shaped primitives” that can unify protected resources, approvals, and auditability behind a single decision function.
  - Evidence (OPA Rego as decisions-as-code): https://openpolicyagent.org/docs/policy-language
  - Evidence (OpenFGA modeling process): https://openfga.dev/docs/modeling/getting-started
- SpiceDB’s README is unusually actionable: it frames authorization as schema + relationships + permission checks, with examples for writing schemas and relationships and then checking permissions.
  - Evidence: https://raw.githubusercontent.com/authzed/spicedb/main/README.md
- All four candidates have permissive Apache-2.0 license posture (good downstream adoption path if we later move to Step-04 OSS mapping).
  - Evidence: https://raw.githubusercontent.com/open-policy-agent/opa/main/LICENSE and https://raw.githubusercontent.com/openfga/openfga/main/LICENSE and https://raw.githubusercontent.com/authzed/spicedb/main/LICENSE and https://raw.githubusercontent.com/casbin/casbin/master/LICENSE

## 🧭 What changes because of this

- Strengthens roadmap: “protected resources + approvals” should be designed around a single `authorize()` decision point that can return allow/deny/needs_approval + reason + policy/version info.
- Reduces future rework: if we standardize authorization decisions now, we can attach audit events and exports uniformly across every high-risk action.
- Provides a clear candidate set to hand off to Step-04 for deeper OSS adoption planning (SpiceDB/OpenFGA/OPA/Casbin are all permissive).

## ➡️ Next step

- Deepen “policy templates” for ecommerce actions (refund > threshold, payout changes, integration disconnect) and map them to policy outcomes + approvals.
- Or hand off to Step-04: map these OSS candidates into concrete adoption plans and integration points.

## 🔗 Links / references

- Evidence notes: `competitors/evidence/open-policy-agent.md`
- Evidence notes: `competitors/evidence/openfga.md`
- Evidence notes: `competitors/evidence/spicedb.md`
- Evidence notes: `competitors/evidence/casbin.md`
- Sources ledger: `artifacts/sources.md`
- Matrix: `artifacts/competitor-matrix.md`
- Summary: `artifacts/summary.md`

---

### 0016_checkpoint-cycle-12-policy-templates-simulator-patterns-cedar-verified-permissions-permit-opa.md

---
step: 0016
created_at: "2025-12-30 17:25"
title: "Checkpoint: Cycle 12 policy templates + simulator patterns (Cedar/Verified Permissions/Permit/OPA)"
---

# Step 0016: Checkpoint: Cycle 12 policy templates + simulator patterns (Cedar/Verified Permissions/Permit/OPA)

## ✅ What I did (facts)

- Picked Cycle 12 tranche focused on “policy templates + policy simulator” patterns for ecommerce admin protected actions and approvals.
- Collected evidence from Cedar docs (policy templates + terminology/schema), AWS Verified Permissions docs (policy store + simulated auth request testing), Permit docs (RBAC onboarding + decision logs with reasons + policy CI/CD), and OPA HTTP API authorization tutorial (API server asks policy engine for allow/deny).
- Created 4 evidence extracts and linked them into the matrix and sources:
  - `competitors/evidence/cedar-policy-language.md`
  - `competitors/evidence/aws-verified-permissions.md`
  - `competitors/evidence/permit-io.md`
  - `competitors/evidence/opa-http-api-authorization.md`
- Updated `artifacts/sources.md`, appended Cycle 12 entries to `artifacts/competitor-matrix.md`, and added Cycle 12 primitives/insights to `artifacts/summary.md`.

## 🧠 What I learned (new information)

- “Policy templates” are a documented best-practice approach: use templates for role assignment inside a policy store when IdP group mappings aren’t available.  
  Evidence: https://docs.cedarpolicy.com/bestpractices/bp-implementing-roles-templates.html
- “Policy store + test bench” is a productized workflow: create policies, then run simulated authorization requests to confirm decisions before rollout.  
  Evidence: https://docs.aws.amazon.com/verifiedpermissions/latest/userguide/getting-started-first-policy-store.html
- Decision logs should include a human-readable `reason` field and be filterable; it’s a UX primitive, not just backend telemetry.  
  Evidence: https://docs.permit.io/how-to/use-audit-logs/types-and-filtering

## 🧭 What changes because of this

- Strengthens build order: ship “policy templates + simulator + reason strings” before a general-purpose policy DSL.
- “Reason strings” become required metadata for every deny/needs_approval decision, feeding both approval UX and audit export.
- Suggests policy change management needs environments-as-branches (preview/draft vs prod) and should itself be gated by approvals.
  Evidence: Permit CI/CD environments/preview branches: https://docs.permit.io/how-to/SDLC/CI-CD

## ➡️ Next step

- Deepen ecommerce-specific policy templates (refund thresholds, payout settings changes, integration disconnect) and map each template to approvals + step-up auth.
- Or shift to Step-04 OSS mapping to convert these policy/template/simulator patterns into concrete adoption plans and code candidates.

## 🔗 Links / references

- Evidence notes: `competitors/evidence/cedar-policy-language.md`
- Evidence notes: `competitors/evidence/aws-verified-permissions.md`
- Evidence notes: `competitors/evidence/permit-io.md`
- Evidence notes: `competitors/evidence/opa-http-api-authorization.md`
- Sources ledger: `artifacts/sources.md`
- Matrix: `artifacts/competitor-matrix.md`
- Summary: `artifacts/summary.md`

---

### 0017_checkpoint-cycle-13-feature-flags-experimentation-contracts-openfeature-statsig-firebase-optimizely-posthog.md

---
step: 0017
created_at: "2025-12-30 17:40"
title: "Checkpoint: Cycle 13 feature flags + experimentation contracts (OpenFeature/Statsig/Firebase/Optimizely/PostHog)"
---

# Step 0017: Checkpoint: Cycle 13 feature flags + experimentation contracts (OpenFeature/Statsig/Firebase/Optimizely/PostHog)

## ✅ What I did (facts)

- Picked Cycle 13 tranche focused on “feature flags + experimentation primitives” that are transplantable into our ecommerce admin (release control + auditability + approvals).
- Collected evidence from OpenFeature spec pages (evaluation API, providers, hooks, evaluation context), Statsig docs (feature gates, experiments, metrics + license/attribution), Firebase docs (Remote Config templates/versioning + A/B testing), Optimizely docs (audiences/targeting + QA audience), and PostHog docs (feature flags, experiments, self-host posture).
- Created 5 evidence extracts and linked them into the matrix and sources:
  - `competitors/evidence/openfeature.md`
  - `competitors/evidence/statsig.md`
  - `competitors/evidence/firebase-remote-config.md`
  - `competitors/evidence/optimizely-feature-experimentation.md`
  - `competitors/evidence/posthog-feature-flags.md`
- Updated `artifacts/sources.md`, added Cycle 13 entries to `artifacts/competitor-matrix.md`, and appended Cycle 13 insights to `artifacts/summary.md`.

## 🧠 What I learned (new information)

- A vendor-neutral feature flag spec exists with explicit “provider” and “hook” concepts, meaning we can design our admin + backend around a stable evaluation contract and swap backends later.  
  Evidence: https://openfeature.dev/docs/specification/sections/providers and https://openfeature.dev/docs/specification/sections/hooks
- “Templates/versioning + rollback” is a productized workflow for remote configuration (strong release-control primitive, not just a KV store).  
  Evidence: https://firebase.google.com/docs/remote-config/templates
- QA/debugging for experiments is an explicit primitive (“QA audience” to force assignment), which we should mirror for support/internal validation.  
  Evidence: https://docs.developers.optimizely.com/feature-experimentation/docs/create-a-qa-audience-to-test-experiments

## 🧭 What changes because of this

- Feature flags should be treated as a governed platform primitive: evaluation context schema + audit hooks + publish/rollback workflows, not “random conditionals”.
- Targeting/audience builder is reusable across systems: flags/experiments, approvals routing, and automation triggers.
- “Promote experiment winner” becomes a sensitive action that should produce an approval request + audit reason string (ties directly into our approvals primitive).

## ➡️ Next step

- Deepen “targeting builder + preview” patterns further (how to design nested AND/OR, QA overrides, and evaluation previews without footguns).
- Optional: add more OSS-adjacent standard candidates to evidence (e.g., OpenTelemetry semantic conventions for feature-flag evaluation events, if relevant to our audit/export pipeline).
- Or hand off to Step-04 to map these Cycle 13 primitives to OSS building blocks (OpenFeature SDK/provider patterns, PostHog self-host posture) and licensing.

## 🔗 Links / references

- Evidence notes: `competitors/evidence/openfeature.md`
- Evidence notes: `competitors/evidence/statsig.md`
- Evidence notes: `competitors/evidence/firebase-remote-config.md`
- Evidence notes: `competitors/evidence/optimizely-feature-experimentation.md`
- Evidence notes: `competitors/evidence/posthog-feature-flags.md`
- Sources ledger: `artifacts/sources.md`
- Matrix: `artifacts/competitor-matrix.md`
- Summary: `artifacts/summary.md`

---

### 0018_checkpoint-cycle-14-event-envelopes-feature-flag-telemetry-standards-cloudevents-otel-semconv-rudderstack.md

---
step: 0018
created_at: "2025-12-30 17:45"
title: "Checkpoint: Cycle 14 event envelopes + feature-flag telemetry standards (CloudEvents/OTel semconv/RudderStack)"
---

# Step 0018: Checkpoint: Cycle 14 event envelopes + feature-flag telemetry standards (CloudEvents/OTel semconv/RudderStack)

## ✅ What I did (facts)

- Picked Cycle 14 tranche focused on “event export envelope + feature-flag evaluation telemetry standards” to reduce schema drift and improve customer interoperability (audit + observability).
- Collected evidence from OpenTelemetry semconv docs for feature flag evaluation logs, CloudEvents spec pages for the event envelope attributes, and RudderStack tracking plans docs for event taxonomy governance/versioning.
- Created 3 evidence extracts and linked them into the matrix and sources:
  - `competitors/evidence/opentelemetry-feature-flag-semconv.md`
  - `competitors/evidence/cloudevents.md`
  - `competitors/evidence/rudderstack-tracking-plans.md`
- Updated `artifacts/sources.md`, appended Cycle 14 entries to `artifacts/competitor-matrix.md`, and added Cycle 14 insights to `artifacts/summary.md`.

## 🧠 What I learned (new information)

- OpenTelemetry has explicit semantic conventions for feature flag evaluation logs, so we can align our “exposure/audit” events to a known field set instead of inventing one.  
  Evidence: https://opentelemetry.io/docs/specs/semconv/feature-flags/feature-flags-logs/
- CloudEvents provides a stable event envelope contract (id/source/type/etc.) that fits well for audit exports and automation triggers.  
  Evidence: https://github.com/cloudevents/spec/blob/main/cloudevents/spec.md
- RudderStack treats tracking plans as versioned governance; the UX idea is valuable, but the core OSS license (AGPL) is restrictive if we were to adopt code.  
  Evidence: https://raw.githubusercontent.com/rudderlabs/rudder-server/master/LICENSE

## 🧭 What changes because of this

- We should define two explicit standards in our platform primitives:
  - Outbound event envelope: CloudEvents JSON for webhooks/exports.
  - Feature flag evaluation telemetry: align `flag_evaluated` events to OTel semconv.
- This gives us a concrete “schema contract” layer that makes audit exports and enterprise integrations significantly easier.
- Stronger reason to build an “event taxonomy registry” page in admin (list event types, versions, required fields, sample payloads).

## ➡️ Next step

- Decide if we want the “event taxonomy registry” to live in product (customer-facing) or just internal tooling first.
- If continuing Step-03: deepen “delivery + signing” patterns for event exports (retry/backoff, disable on failures, key rotation).
- If shifting to Step-04: map Cycle 14 patterns to OSS building blocks (CloudEvents libraries, OTel SDK/collector wiring) with licensing.

## 🔗 Links / references

- Evidence notes: `competitors/evidence/opentelemetry-feature-flag-semconv.md`
- Evidence notes: `competitors/evidence/cloudevents.md`
- Evidence notes: `competitors/evidence/rudderstack-tracking-plans.md`
- Sources ledger: `artifacts/sources.md`
- Matrix: `artifacts/competitor-matrix.md`
- Summary: `artifacts/summary.md`

---

### 0019_checkpoint-cycle-15-webhook-delivery-primitives-svix-hookdeck-stripe-github.md

---
step: 0019
created_at: "2025-12-30 17:52"
title: "Checkpoint: Cycle 15 webhook delivery primitives (Svix/Hookdeck/Stripe/GitHub)"
---

# Step 0019: Checkpoint: Cycle 15 webhook delivery primitives (Svix/Hookdeck/Stripe/GitHub)

## ✅ What I did (facts)

- Picked a tranche focused on “webhook delivery platform primitives” (signing/verification, retries, redelivery, endpoint health, delivery logs) that we can transplant into our ecommerce admin.
- Collected evidence from Svix, Hookdeck, Stripe, and GitHub docs (retry behavior, security/signatures, delivery logs, and redelivery workflows).
- Created evidence extracts and linked them into the matrix and sources ledger (see links below).

## 🧠 What I learned (new information)

- Mature webhook platforms treat retries/backoff schedules as explicit documented behavior, not an implementation detail.
- Good webhook security patterns include timestamps in signatures and explicit replay-attack mitigation guidance.
- Redelivery is a first-class operator workflow (debugging + recovery) and should be permission-gated and auditable.

## 🧭 What changes because of this

- Webhooks should be modeled as governed integration objects in admin (enabled/disabled, signing secret lifecycle, delivery logs, retries) instead of “just send HTTP POST”.
- Delivery logs + redeliver controls should ship early to avoid support becoming the “delivery UI”.
- Endpoint health (auto-disable after repeated failures) should connect to approvals + step-up auth for safe re-enablement.

## ➡️ Next step

- Deepen payload retention + redaction patterns (what to store, for how long, and who can view raw payloads).
- Draft a thin-slice schema for `webhook_endpoints`, `delivery_attempts`, and `delivery_logs` plus “redeliver with reason” audit events.

## 🔗 Links / references

- Svix retries: https://docs.svix.com/retries/
- Svix security: https://docs.svix.com/security
- GitHub redelivering webhooks: https://docs.github.com/en/webhooks/testing-and-troubleshooting-webhooks/redelivering-webhooks
- Evidence notes: `competitors/evidence/svix.md`
- Evidence notes: `competitors/evidence/hookdeck.md`
- Evidence notes: `competitors/evidence/stripe-webhooks.md`
- Evidence notes: `competitors/evidence/github-webhooks.md`
- Sources ledger: `artifacts/sources.md`

---

## Cleanup notes

- Step files compacted: 10 (and removed from steps/)
- Compaction file is capped at ~1048576 bytes (configurable via BLACKBOX_CONTEXT_MAX_BYTES).
