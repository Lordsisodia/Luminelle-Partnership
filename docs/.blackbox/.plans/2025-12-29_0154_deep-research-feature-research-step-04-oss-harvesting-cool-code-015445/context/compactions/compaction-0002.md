---
compaction: 0002
created_at: "2025-12-30 18:01"
range: "0011-0020"
max_bytes: 1048576
per_step_budget_bytes: 98304
---

# Compaction 0002 (0011–0020)

## ✅ Summary (fill this after compaction)

- <3–7 bullets capturing the durable takeaways>

## 🧩 Patterns / heuristics (fill this after compaction)

- Prompt improvements:
- Checklist improvements:
- Better stop conditions:

## Steps compacted (trimmed)

### 0011_checkpoint-added-shared-api-conventions-week-1-backlog-artifact-to-synthesis-plan.md

---
step: 0011
created_at: "2025-12-29 06:08"
title: "Checkpoint: added shared API conventions + week-1 backlog artifact to synthesis plan"
---

# Step 0011: Checkpoint: added shared API conventions + week-1 backlog artifact to synthesis plan

## ✅ What I did (facts)

- <fill>

## 🧠 What I learned (new information)

- <fill>

## 🧭 What changes because of this

- <fill>

## ➡️ Next step

- <fill>

## 🔗 Links / references

- <fill>

---

### 0012_checkpoint-added-api-conventions-week-2-backlog-and-tightened-thin-slice-specs-with-concrete-endpoints.md

---
step: 0012
created_at: "2025-12-29 06:13"
title: "Checkpoint: added api-conventions + week-2-backlog and tightened thin-slice specs with concrete endpoints"
---

# Step 0012: Checkpoint: added api-conventions + week-2-backlog and tightened thin-slice specs with concrete endpoints

## ✅ What I did (facts)

- <fill>

## 🧠 What I learned (new information)

- <fill>

## 🧭 What changes because of this

- <fill>

## ➡️ Next step

- <fill>

## 🔗 Links / references

- <fill>

---

### 0013_checkpoint-deepened-tranche-1-n-5-repos-unleash-casbin-temporal-growthbook-activepieces-w-adoption-plans-license-notes-updated-oss-candidates-build-vs-buy-sources-summary.md

---
step: 0013
created_at: "2025-12-29 19:15"
title: "Checkpoint: Deepened tranche-1 N=5 repos (Unleash, Casbin, Temporal, GrowthBook, Activepieces) w/ adoption plans + license notes; updated oss-candidates/build-vs-buy/sources/summary"
---

# Step 0013: Checkpoint: Deepened tranche-1 N=5 repos (Unleash, Casbin, Temporal, GrowthBook, Activepieces) w/ adoption plans + license notes; updated oss-candidates/build-vs-buy/sources/summary

## ✅ What I did (facts)

- Deepened exactly **N=5** OSS repos into “adoption-ready” notes (what it does, 1-day POC, 1-week integration, risks, score):
  - Unleash (feature flags)
  - Casbin (RBAC/ABAC enforcement)
  - Temporal (durable workflow engine)
  - GrowthBook (experiments + flags)
  - Activepieces (workflow automation)
- Verified and corrected **license posture** where “GitHub metadata license” can be misleading:
  - Marked GrowthBook and Activepieces as **mixed-license** based on their `LICENSE` files (MIT for most code + enterprise/EE directories under different terms).
- Updated tranche outputs in the Step-04 artifacts so the research is usable without reading every repo entry:
  - Added tranche-1 deep-dive section to `artifacts/summary.md`
  - Updated longlist and “winners deepened” pointers in `artifacts/oss-candidates.md`
  - Added build-vs-integrate recommendations for the 5 admin primitives in `artifacts/build-vs-buy.md`
  - Added primary repo sources + license URLs in `artifacts/sources.md`
  - Corrected `artifacts/oss-index.md` to reflect **MIXED** license risk for GrowthBook/Activepieces
- Logged progress in `progress-log.md` and created this checkpoint step file via `./.blackbox/scripts/new-step.sh`.

## 🧠 What I learned (new information)

- “License asserted” from APIs is not always enough: both GrowthBook and Activepieces have **repo-level license text that explicitly splits OSS vs enterprise code by directory**.
- For admin primitives, the safest “low-regret” path is to **integrate primitives** (feature flags, RBAC enforcement) while keeping our own thin abstraction layer to reduce lock-in.
- Workflow tooling splits into two distinct bets:
  - **Temporal** = durable orchestration primitive (high reliability, higher ops cost)
  - **Activepieces** = full automation platform (bigger security/governance surface; best first use is internal ops)

## 🧭 What changes because of this

- We now have a license-aware shortlist for tranche-1 primitives:
  - ✅ “Permissive + integration-friendly”: Unleash (Apache-2.0), Casbin (Apache-2.0), Temporal (MIT)
  - ⚠️ “Mixed-license, proceed only with scoped adoption”: GrowthBook, Activepieces
- The build-vs-buy decision is clearer:
  - Feature flags: integrate OSS (Unleash/Flagsmith) rather than build
  - RBAC enforcement: integrate OSS (Casbin/OPA) rather than build the engine (but still build our admin UX + audit)
  - Workflows: choose based on whether we truly need durability (Temporal) or internal automation (Activepieces/n8n class)
- The Step-04 artifacts now contain enough context to audit decisions quickly (without re-reading raw repos).

## ➡️ Next step

- Tranche 2 (next N=3–10) suggestion: cover remaining “admin primitives” not yet deepened:
  - Audit logs / event log viewer (UI + storage pattern)
  - Policy engine alternative: OPA (if we want policy-as-code) vs Casbin (policy-as-data)
  - Integration connector framework (Airbyte/Windmill/n8n-class) **but pre-filter by license**
- If we want this plan folder to be self-auditable, fill `context/steps/0011_...md` and `context/steps/0012_...md` (they are currently template placeholders).

## 🔗 Links / references

- Repo entries (deep dives):
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/unleash-unleash.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/casbin-casbin.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/temporalio-temporal.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/growthbook-growthbook.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/activepieces-activepieces.md`
- Artifacts updated:
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/artifacts/summary.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/artifacts/oss-candidates.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/artifacts/build-vs-buy.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/artifacts/sources.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/artifacts/oss-index.md`
- License text (evidence for “mixed-license” flags):
  - `https://raw.githubusercontent.com/growthbook/growthbook/main/LICENSE` (accessed 2025-12-29)
  - `https://raw.githubusercontent.com/activepieces/activepieces/main/LICENSE` (accessed 2025-12-29)

---

### 0014_checkpoint-tranche-2-n-5-deep-dives-opa-openfga-opensearch-opensearch-dashboards-nango-w-adoption-plans-license-flags-updated-oss-candidates-build-vs-buy-sources-summary-oss-index.md

---
step: 0014
created_at: "2025-12-30 17:21"
title: "Checkpoint: Tranche-2 N=5 deep dives (OPA, OpenFGA, OpenSearch, OpenSearch Dashboards, Nango) w/ adoption plans + license flags; updated oss-candidates/build-vs-buy/sources/summary/oss-index"
---

# Step 0014: Checkpoint: Tranche-2 N=5 deep dives (OPA, OpenFGA, OpenSearch, OpenSearch Dashboards, Nango) w/ adoption plans + license flags; updated oss-candidates/build-vs-buy/sources/summary/oss-index

## ✅ What I did (facts)

- Selected and deepened exactly **N=5** repos in tranche-2 (admin primitives + audit/event tooling + connectors):
  - OPA (open-policy-agent/opa) — policy engine (policy-as-code)
  - OpenFGA (openfga/openfga) — Zanzibar-style authorization service
  - OpenSearch (opensearch-project/OpenSearch) — index/query backend (audit/event storage candidate)
  - OpenSearch Dashboards (opensearch-project/OpenSearch-Dashboards) — event viewer UI
  - Nango (NangoHQ/nango) — OAuth connector platform (license flagged)
- Added missing OSS entry files for new repos:
  - `oss/entries/openfga-openfga.json` + `.md`
  - `oss/entries/opensearch-project-opensearch-dashboards.json` + `.md`
  - `oss/entries/nangohq-nango.json` + `.md`
- Completed adoption notes for existing placeholders:
  - `oss/entries/open-policy-agent-opa.md` (filled what/POC/week/risks/score)
  - `oss/entries/opensearch-project-opensearch.md` (expanded toward audit/event use case; added score)
- Updated the plan artifacts so tranche-2 is visible without opening every repo entry:
  - `artifacts/summary.md` (added tranche-2 section + updated guidance)
  - `artifacts/oss-candidates.md` (added tranche-2 repos + deepened pointers)
  - `artifacts/build-vs-buy.md` (added rows for audit logs + OAuth connector platform + OpenFGA)
  - `artifacts/sources.md` (added repo URLs + Nango license URL)
  - `artifacts/oss-index.md` (added rows for OpenSearch/OpenFGA/OpenSearch Dashboards/Nango)

## 🧠 What I learned (new information)

- There’s a clear “authz primitive ladder” emerging:
  - Casbin = best “start simple, ship RBAC” option (policy-as-data)
  - OPA = best when rules become complex and want policy-as-code + review gates
  - OpenFGA = best when permissions become relationship-heavy (sharing, delegation, per-resource grants)
- Audit/event logs are better treated as two layers:
  - Canonical app audit log API + redaction + permissions (we likely build)
  - Index/query + internal visualization (OpenSearch + Dashboards can provide this quickly, at ops cost)
- Nango is an excellent “connector patterns” repo, but its ELv2 license is a major blocker for using it as part of a managed service offering.

## 🧭 What changes because of this

- We can now make a sharper build vs integrate call for audit logs:
  - Build the canonical audit event schema + API + UI
  - Optionally integrate OpenSearch for fast querying and OpenSearch Dashboards for internal ops investigations
- We have a clearer “permissions roadmap”:
  - Start with Casbin (and a clean `AuthorizationService` boundary)
  - Graduate to OPA/OpenFGA only if/when needs justify the complexity and service footprint
- Integration connectors remain a key gap, but many “best of breed” options are source-available/restrictive; we should expect either:
  - buying a managed vendor, or
  - building a minimal internal connector runtime using patterns borrowed from Nango-like tools

## ➡️ Next step

- Tranche 3 (next N=3–10) recommendation: focus on the remaining admin primitives we still haven’t deepened:
  - Audit log UX primitives (diff viewer / change history / timeline) and event schema conventions
  - “Integration runtime” alternatives with permissive licenses (if any), plus lightweight patterns (outbox, retries, DLQ)
  - Admin UI scaffolds that support multi-tenant + permissions cleanly (if we want to accelerate internal tooling)
- Add a short “audit log v1 spec” artifact (schema + retention + redaction + permissions) so future OSS picks can be evaluated against concrete requirements.

## 🔗 Links / references

- Repo entries (tranche-2 deep dives):
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/open-policy-agent-opa.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/openfga-openfga.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/opensearch-project-opensearch.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/opensearch-project-opensearch-dashboards.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/nangohq-nango.md`
- Artifacts updated:
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/artifacts/summary.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/artifacts/oss-candidates.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/artifacts/build-vs-buy.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/artifacts/sources.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/artifacts/oss-index.md`
- License evidence (restrictive):
  - `https://raw.githubusercontent.com/NangoHQ/nango/master/LICENSE` (accessed 2025-12-30)

---

### 0015_checkpoint-tranche-3-n-5-deep-dives-graphile-worker-pg-boss-pgaudit-jsondiffpatch-clickhouse-w-adoption-plans-license-notes-updated-oss-candidates-build-vs-buy-sources-summary-oss-index.md

---
step: 0015
created_at: "2025-12-30 17:29"
title: "Checkpoint: Tranche-3 N=5 deep dives (Graphile Worker, pg-boss, pgaudit, jsondiffpatch, ClickHouse) w/ adoption plans + license notes; updated oss-candidates/build-vs-buy/sources/summary/oss-index"
---

# Step 0015: Checkpoint: Tranche-3 N=5 deep dives (Graphile Worker, pg-boss, pgaudit, jsondiffpatch, ClickHouse) w/ adoption plans + license notes; updated oss-candidates/build-vs-buy/sources/summary/oss-index

## ✅ What I did (facts)

- Selected and deepened exactly **N=5** repos in tranche-3, targeting audit log “diff UX”, DB auditing, and Postgres-first integration runtimes:
  - graphile/worker (Graphile Worker) — Postgres-backed job queue
  - timgit/pg-boss — Postgres-backed job queue
  - pgaudit/pgaudit — Postgres auditing extension
  - benjamine/jsondiffpatch — JSON diff/patch + render helpers
  - ClickHouse/ClickHouse — OLAP analytics DB for event/audit data at scale
- Fetched GitHub metadata JSON and saved into `oss/entries/*.json` for each repo.
- Created/filled adoption entries with required sections (what it does, 1-day POC, 1-week plan, license note, risks, score):
  - `oss/entries/graphile-worker.md`
  - `oss/entries/timgit-pg-boss.md`
  - `oss/entries/pgaudit-pgaudit.md`
  - `oss/entries/benjamine-jsondiffpatch.md`
  - `oss/entries/clickhouse-clickhouse.md`
- Updated Step-04 artifacts to reflect tranche-3:
  - `artifacts/summary.md` (added tranche-3 section + updated guidance)
  - `artifacts/oss-candidates.md` (added tranche-3 items + deepened pointers)
  - `artifacts/build-vs-buy.md` (added rows for Postgres job queues, diff view, DB auditing, event analytics DB)
  - `artifacts/sources.md` (added repo URLs + license proof URLs, including pgaudit’s PostgreSQL license note)
  - `artifacts/oss-index.md` (added rows for the new repos)

## 🧠 What I learned (new information)

- There’s a highly “vibe-coding friendly” path to a solid integration runtime without new infra:
  - Postgres-backed job queues (Graphile Worker / pg-boss) are a practical default before adopting bigger workflow engines.
- A product audit log needs two complementary layers:
  - **Diff UX** (jsondiffpatch) for human-readable “what changed”
  - **Storage/query** (Postgres → OpenSearch/ClickHouse later) for filtering and long retention
- DB-level auditing (pgaudit) is explicitly **PostgreSQL-licensed** (even though GitHub metadata may not assert it), and it should be treated as compliance/forensics tooling—not the primary product audit log.
- ClickHouse is the strongest “scale path” for event/audit analytics, but likely premature unless event volume/retention demands justify the ops cost.

## 🧭 What changes because of this

- We now have concrete, permissive building blocks for the admin primitives we were missing:
  - Integration runtime: pick Graphile Worker *or* pg-boss to power sync/retry/backfill pipelines
  - Audit UX: jsondiffpatch enables first-class change diffs in the admin audit viewer
  - Compliance/forensics: pgaudit can provide DB-level audit trails as a safety net
  - Analytics-at-scale: ClickHouse is a future-proof option if audit/event volume grows beyond Postgres/OpenSearch comfort
- This strengthens the build-vs-buy guidance:
  - “Build audit log UX + schema” remains the core, but we can integrate small primitives to accelerate significantly.

## ➡️ Next step

- Decide which Postgres job queue to standardize on (Graphile Worker vs pg-boss) so we don’t fragment the runtime.
- Draft a minimal “Audit Log v1” spec (schema + redaction + retention + diff rules) to guide future OSS picks and implementation.
- Next tranche (N=3–10) candidates (if continuing):
  - Admin audit log viewer UI patterns (timeline, diff rendering, search filters)
  - Webhook delivery tooling (retries, signing, replay protection) with permissive licenses
  - Lightweight ETL/event ingestion patterns that keep “managed app” operations safe and observable

## 🔗 Links / references

- Repo entries (tranche-3):
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/graphile-worker.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/timgit-pg-boss.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/pgaudit-pgaudit.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/benjamine-jsondiffpatch.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/clickhouse-clickhouse.md`
- Artifacts updated:
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/artifacts/summary.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/artifacts/oss-candidates.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/artifacts/build-vs-buy.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/artifacts/sources.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/artifacts/oss-index.md`
- License proof URLs:
  - `https://raw.githubusercontent.com/pgaudit/pgaudit/main/LICENSE` (PostgreSQL License; accessed 2025-12-30)
  - `https://raw.githubusercontent.com/graphile/worker/main/LICENSE.md` (MIT; accessed 2025-12-30)
  - `https://raw.githubusercontent.com/timgit/pg-boss/master/LICENSE` (MIT; accessed 2025-12-30)
  - `https://raw.githubusercontent.com/benjamine/jsondiffpatch/master/MIT-LICENSE.txt` (MIT; accessed 2025-12-30)
  - `https://raw.githubusercontent.com/ClickHouse/ClickHouse/master/LICENSE` (Apache-2.0; accessed 2025-12-30)

---

### 0016_checkpoint-tranche-4-n-5-deep-dives-svix-webhooks-convoy-go-playground-webhooks-adnanh-webhook-smee-client-w-adoption-plans-license-notes-updated-oss-candidates-build-vs-buy-sources-summary-oss-index.md

---
step: 0016
created_at: "2025-12-30 17:37"
title: "Checkpoint: Tranche-4 N=5 deep dives (Svix Webhooks, Convoy, go-playground/webhooks, adnanh/webhook, smee-client) w/ adoption plans + license notes; updated oss-candidates/build-vs-buy/sources/summary/oss-index"
---

# Step 0016: Checkpoint: Tranche-4 N=5 deep dives (Svix Webhooks, Convoy, go-playground/webhooks, adnanh/webhook, smee-client) w/ adoption plans + license notes; updated oss-candidates/build-vs-buy/sources/summary/oss-index

## ✅ What I did (facts)

- Selected and deepened exactly **N=5** webhook-related repos (outbound delivery, inbound tooling, dev ergonomics):
  - svix/svix-webhooks (MIT) — outbound webhook sending service
  - frain-dev/convoy (ELv2) — webhook gateway (license flagged)
  - go-playground/webhooks (MIT) — inbound webhook parsing/validation library
  - adnanh/webhook (MIT) — webhook trigger server (internal ops utility)
  - probot/smee-client (ISC) — webhook dev proxy client
- Saved GitHub metadata into `oss/entries/*.json`:
  - `oss/entries/svix-svix-webhooks.json`
  - `oss/entries/frain-dev-convoy.json`
  - `oss/entries/go-playground-webhooks.json`
  - `oss/entries/adnanh-webhook.json`
  - `oss/entries/probot-smee-client.json`
- Created adoption entries with required sections (what/1-day/1-week/license/risks/score):
  - `oss/entries/svix-svix-webhooks.md`
  - `oss/entries/frain-dev-convoy.md`
  - `oss/entries/go-playground-webhooks.md`
  - `oss/entries/adnanh-webhook.md`
  - `oss/entries/probot-smee-client.md`
- Updated the Step-04 artifacts to reflect tranche-4:
  - `artifacts/oss-candidates.md` (added tranche-4 + deepened pointers)
  - `artifacts/build-vs-buy.md` (added webhook delivery + proxy patterns, and flagged ELv2 gateways)
  - `artifacts/sources.md` (added repos + license proof URLs for Convoy/Svix/etc.)
  - `artifacts/summary.md` (added tranche-4 section and updated guidance)
  - `artifacts/oss-index.md` (added table rows for tranche-4 repos)

## 🧠 What I learned (new information)

- Webhook gateways and “delivery platforms” increasingly adopt **source-available licenses** (Convoy is ELv2), which is likely incompatible with offering “managed webhook delivery” as part of our managed client app.
- Svix Webhooks is a rare case here: it is **MIT**, making it a safer candidate either as a component or as a reference implementation.
- The “developer ergonomics” layer matters a lot for integration speed:
  - smee-client-style proxying and replay patterns significantly reduce time-to-debug for inbound webhooks.

## 🧭 What changes because of this

- Our “webhook platform” blueprint is now clearer and can be implemented in layers:
  - v1 (minimal): durable ingestion + delivery using Postgres job queue + signing + retries + logs
  - v2: replay tooling + endpoint management UI + DLQ workflows
  - optional: adopt a dedicated delivery component (Svix) if the service boundary is worth it
- License policy implication: treat ELv2 webhook gateways as “patterns only” unless legal explicitly approves.

## ➡️ Next step

- Draft a short internal “Webhook v1 spec” (events, signing, retries, delivery logs, replay policy, payload redaction) so future repo picks can be evaluated against concrete requirements.
- Tranche 5 (N=3–10) recommendation: focus on more permissive primitives to implement webhook v1 safely:
  - request signing + idempotency patterns
  - durable inbound envelope storage + replay
  - admin viewer UX for deliveries (filters, statuses, correlation IDs)

## 🔗 Links / references

- Repo entries (tranche-4):
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/svix-svix-webhooks.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/frain-dev-convoy.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/go-playground-webhooks.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/adnanh-webhook.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/probot-smee-client.md`
- Artifacts updated:
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/artifacts/summary.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/artifacts/oss-candidates.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/artifacts/build-vs-buy.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/artifacts/sources.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/artifacts/oss-index.md`
- License proof URLs:
  - `https://raw.githubusercontent.com/frain-dev/convoy/main/LICENSE` (ELv2; accessed 2025-12-30)
  - `https://raw.githubusercontent.com/svix/svix-webhooks/main/LICENSE` (MIT; accessed 2025-12-30)
  - `https://raw.githubusercontent.com/go-playground/webhooks/master/LICENSE` (MIT; accessed 2025-12-30)
  - `https://raw.githubusercontent.com/adnanh/webhook/master/LICENSE` (MIT; accessed 2025-12-30)
  - `https://raw.githubusercontent.com/probot/smee-client/master/LICENSE` (ISC; accessed 2025-12-30)

---

### 0017_checkpoint-tranche-5-n-5-deep-dives-ntfy-apprise-gotify-novu-karrio-w-adoption-plans-license-flags-updated-oss-candidates-build-vs-buy-sources-summary.md

---
step: 0017
created_at: "2025-12-30 17:44"
title: "Checkpoint: Tranche-5 N=5 deep dives (ntfy, Apprise, Gotify, Novu, Karrio) w/ adoption plans + license flags; updated oss-candidates/build-vs-buy/sources/summary"
---

# Step 0017: Checkpoint: Tranche-5 N=5 deep dives (ntfy, Apprise, Gotify, Novu, Karrio) w/ adoption plans + license flags; updated oss-candidates/build-vs-buy/sources/summary

## ✅ What I did (facts)

- Deepened exactly **N=5** repos already present in `oss/entries/` (avoided new GitHub API harvesting due to rate limits) focused on closing the “webhooks → alerting → notification center” loop:
  - binwiederhier/ntfy — ops alerting via HTTP topics (Apache-2.0)
  - caronc/apprise — unified notifications dispatch library (BSD-2-Clause)
  - gotify/server — self-hosted notifications server + UI (MIT; logo assets separately licensed)
  - novuhq/novu — full notification platform + inbox (MIT)
  - karrioapi/karrio — shipping API abstraction (LGPL-3.0 + EE directory flagged)
- Filled the required adoption plan sections (what it does, 1-day POC, 1-week integration, risks, license notes, score) in:
  - `oss/entries/binwiederhier-ntfy.md`
  - `oss/entries/caronc-apprise.md`
  - `oss/entries/gotify-server.md`
  - `oss/entries/novuhq-novu.md`
  - `oss/entries/karrioapi-karrio.md`
- Updated tranche-5 visibility in Step-04 artifacts:
  - `artifacts/summary.md` (added tranche-5 section)
  - `artifacts/oss-candidates.md` (added repos + deepened pointers)
  - `artifacts/build-vs-buy.md` (added rows for ops alerting + full notifications)
  - `artifacts/sources.md` (added repo + license proof URLs)
- Logged tranche-5 in `progress-log.md`.

## 🧠 What I learned (new information)

- There’s a clean split between “ops alerting” and “product notifications”:
  - Ops alerting can be solved cheaply with lightweight primitives (ntfy/Gotify/Apprise) without committing to a big platform.
  - Merchant-facing notifications (preferences, templates, inbox) quickly become a platform problem—Novu is the OSS option in this set, but it carries a heavier ops footprint.
- Some “integration-heavy” capability repos (shipping connectors like Karrio) are valuable pattern sources, but can carry non-permissive licensing and high PII/security obligations.

## 🧭 What changes because of this

- We now have an OSS-backed path to improve operational reliability of managed client apps:
  - Alert on webhook/integration failures quickly (ntfy/Gotify/Apprise)
  - Later evolve toward a first-class notification center (Novu or buy)
- Licensing guidance tightens:
  - Prefer permissive for core platform components; treat LGPL connector suites as “flag unless approved”.

## ➡️ Next step

- Decide whether we want:
  - a lightweight ops-only alerting solution (start now), or
  - a product-grade notifications platform (commit to inbox + preferences) — which implies a multi-tenant notifications event contract.
- Tranche 6 (next N=3–10) recommendation (if continuing):
  - concrete “notification event contract” patterns (schemas, redaction, preferences)
  - audit/event viewer UI patterns for notifications + deliveries (filters, correlation IDs)
  - more permissive connector runtimes (to reduce reliance on source-available platforms)

## 🔗 Links / references

- Repo entries (tranche-5):
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/binwiederhier-ntfy.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/caronc-apprise.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/gotify-server.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/novuhq-novu.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/karrioapi-karrio.md`
- Artifacts updated:
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/artifacts/summary.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/artifacts/oss-candidates.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/artifacts/build-vs-buy.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/artifacts/sources.md`
- License proof URLs (as captured in sources):
  - `https://raw.githubusercontent.com/binwiederhier/ntfy/main/LICENSE` (Apache-2.0; accessed 2025-12-30)
  - `https://raw.githubusercontent.com/caronc/apprise/master/LICENSE` (BSD-2-Clause; accessed 2025-12-30)
  - `https://raw.githubusercontent.com/gotify/server/master/LICENSE` (MIT; accessed 2025-12-30)
  - `https://raw.githubusercontent.com/novuhq/novu/main/LICENSE` (MIT; accessed 2025-12-30)

---

### 0018_checkpoint-tranche-6-n-5-deep-dives-react-admin-refine-appsmith-payload-strapi-w-adoption-plans-license-flags-updated-oss-candidates-build-vs-buy-sources-summary.md

---
step: 0018
created_at: "2025-12-30 17:50"
title: "Checkpoint: Tranche-6 N=5 deep dives (React Admin, Refine, Appsmith, Payload, Strapi) w/ adoption plans + license flags; updated oss-candidates/build-vs-buy/sources/summary"
---

# Step 0018: Checkpoint: Tranche-6 N=5 deep dives (React Admin, Refine, Appsmith, Payload, Strapi) w/ adoption plans + license flags; updated oss-candidates/build-vs-buy/sources/summary

## ✅ What I did (facts)

- Deepened exactly **N=5** permissive (or scoped) “admin scaffolding + content ops” repos by filling adoption plans (what it does, 1‑day POC, 1‑week integration, risks, license notes, score):
  - marmelab/react-admin (MIT)
  - refinedev/refine (MIT)
  - appsmithorg/appsmith (Apache-2.0)
  - payloadcms/payload (MIT)
  - strapi/strapi (MIXED: MIT + `ee/` paths)
- Updated the Step-04 artifacts so tranche-6 is visible without opening each entry:
  - `artifacts/summary.md` (added tranche-6 section + updated guidance)
  - `artifacts/oss-candidates.md` (added tranche-6 repos + deepened pointers)
  - `artifacts/build-vs-buy.md` (added rows for admin UI scaffolding + CMS/content ops)
  - `artifacts/sources.md` (added repo URLs + license URLs)
- Logged tranche-6 in `progress-log.md`.

## 🧠 What I learned (new information)

- Admin tooling splits into two “low-regret” tracks:
  - **Custom admin app scaffolding** (React Admin / Refine): fastest path to a branded merchant/support admin if we have a stable API contract
  - **Low-code internal ops tooling** (Appsmith): fastest path to support dashboards and one-off ops utilities, but governance/security is the big risk
- CMS/content ops is best treated as a separate service boundary:
  - Payload is a strong TS-first option when we want tight alignment with a TS stack
  - Strapi is very capable, but repo-level mixed licensing means we must confirm we’re staying in MIT-only surfaces
- The “managed app” model benefits from both:
  - a real merchant admin (custom app) and
  - a fast internal ops console (low-code) for break-glass operations and debugging

## 🧭 What changes because of this

- We now have a concrete, license-aware adoption path for building/administering client storefronts:
  - Use React Admin or Refine for the primary merchant/support admin UI
  - Use Appsmith as an internal ops console (only) with a dedicated “ops API surface” and full auditing
  - Use Payload/Strapi for content/template management if storefront generation needs strong editorial workflows
- License posture tightens:
  - Prefer MIT/Apache for core admin UI pieces
  - Treat mixed-license CMS repos as “scope carefully” (explicitly avoid EE paths)

## ➡️ Next step

- Decide which admin UI scaffolding approach to standardize on (React Admin vs Refine) so we don’t split patterns.
- Draft a minimal “admin API contract” (filter/sort/pagination conventions + error format) because admin scaffolding only works well when APIs are predictable.
- If continuing with tranche-7 (N=3–10): focus on **audit log viewer UX** and **admin navigation/layout patterns** to complement the scaffolding choice.

## 🔗 Links / references

- Repo entries (tranche-6):
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/marmelab-react-admin.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/refinedev-refine.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/appsmithorg-appsmith.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/payloadcms-payload.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/strapi-strapi.md`
- Artifacts updated:
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/artifacts/summary.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/artifacts/oss-candidates.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/artifacts/build-vs-buy.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/artifacts/sources.md`

---

### 0019_checkpoint-tranche-7-n-5-deep-dives-superset-redash-grafana-metabase-matomo-w-adoption-plans-license-flags-updated-oss-candidates-build-vs-buy-sources-summary.md

---
step: 0019
created_at: "2025-12-30 17:55"
title: "Checkpoint: Tranche-7 N=5 deep dives (Superset, Redash, Grafana, Metabase, Matomo) w/ adoption plans + license flags; updated oss-candidates/build-vs-buy/sources/summary"
---

# Step 0019: Checkpoint: Tranche-7 N=5 deep dives (Superset, Redash, Grafana, Metabase, Matomo) w/ adoption plans + license flags; updated oss-candidates/build-vs-buy/sources/summary

## ✅ What I did (facts)

- Deepened exactly **N=5** “investigations + dashboards” repos by filling out adoption sections (what/POC/week/risks/license/score):
  - apache/superset (Apache-2.0)
  - getredash/redash (BSD-2-Clause)
  - grafana/grafana (AGPL-3.0; flagged)
  - metabase/metabase (AGPL-3.0; flagged)
  - matomo-org/matomo (GPL-3.0; flagged)
- Updated the per-repo entries:
  - `oss/entries/apache-superset.md`
  - `oss/entries/getredash-redash.md`
  - `oss/entries/grafana-grafana.md`
  - `oss/entries/metabase-metabase.md`
  - `oss/entries/matomo-org-matomo.md`
- Updated Step-04 artifacts so tranche-7 is visible and license posture is explicit:
  - `artifacts/summary.md` (added tranche-7 section)
  - `artifacts/oss-candidates.md` (added tranche-7 repos + deepened pointers)
  - `artifacts/build-vs-buy.md` (added a row for internal investigations dashboards)
  - `artifacts/sources.md` (added repo URLs + license proof URLs)
- Logged tranche-7 in `progress-log.md`.

## 🧠 What I learned (new information)

- “Audit log viewer UX” is best treated as two complementary surfaces:
  - Product audit viewer (merchant/support-facing) that we likely build for correct RBAC + redaction + tenancy
  - Internal investigations tooling (Superset/Redash class) that accelerates support/engineering queries when events are in tables/views
- Many popular dashboard tools are copyleft now (Grafana/Metabase AGPL; Matomo GPL), so permissive-first adoption should bias toward Apache/BSD options (Superset/Redash) for production/internal use.

## 🧭 What changes because of this

- We have a clearer “internal investigations” option set:
  - Prefer Superset/Redash for permissive internal dashboards over copyleft tools
  - Use copyleft tools only if explicitly approved and strictly internal
- This tranche reinforces the need to define a canonical event schema and stable SQL views; dashboards are only as good as the underlying event modeling.

## ➡️ Next step

- Draft an “Audit/Event Views v1” spec: which tables/views we maintain (`audit_events`, `webhook_deliveries`, `job_runs`), required columns (tenantId, actorId, correlationId), and redaction rules.
- Tranche 8 (N=3–10) recommendation: focus on *product* audit log viewer UX primitives (timeline UI, filtering, diff renderer integration, export), ideally permissive React components/utilities.

## 🔗 Links / references

- Repo entries (tranche-7):
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/apache-superset.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/getredash-redash.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/grafana-grafana.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/metabase-metabase.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/matomo-org-matomo.md`
- Artifacts updated:
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/artifacts/summary.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/artifacts/oss-candidates.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/artifacts/build-vs-buy.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/artifacts/sources.md`

---

### 0020_checkpoint-tranche-8-n-5-deep-dives-posthog-supabase-directus-appwrite-umami-w-adoption-notes-license-flags-updated-oss-candidates-build-vs-buy-sources-summary-oss-index.md

---
step: 0020
created_at: "2025-12-30 18:01"
title: "Checkpoint: Tranche-8 N=5 deep dives (PostHog, Supabase, Directus, Appwrite, Umami) w/ adoption notes + license flags; updated oss-candidates/build-vs-buy/sources/summary/oss-index"
---

# Step 0020: Checkpoint: Tranche-8 N=5 deep dives (PostHog, Supabase, Directus, Appwrite, Umami) w/ adoption notes + license flags; updated oss-candidates/build-vs-buy/sources/summary/oss-index

## ✅ What I did (facts)

- Deepened exactly **N=5** repos focused on “product-grade event/log explorer UX” and control-plane patterns:
  - PostHog/posthog (mixed license) — events explorer UX patterns
  - supabase/supabase (Apache-2.0) — control-plane dashboard patterns
  - directus/directus (BUSL-1.1) — activity log + revisions patterns (flagged)
  - appwrite/appwrite (BSD-3-Clause) — console/control-plane patterns
  - umami-software/umami (MIT) — analytics dashboard UX patterns
- Filled adoption notes in the repo entry markdowns:
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/posthog-posthog.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/supabase-supabase.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/directus-directus.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/appwrite-appwrite.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/umami-software-umami.md`
- Updated artifacts to reflect tranche-8:
  - `artifacts/summary.md` (added tranche-8 section)
  - `artifacts/oss-candidates.md` (added tranche-8 + deepened pointers)
  - `artifacts/build-vs-buy.md` (added rows for telemetry/control-plane patterns)
  - `artifacts/sources.md` (added repo URLs + license URLs)
  - `artifacts/oss-index.md` (corrected PostHog license to MIXED)

## 🧠 What I learned (new information)

- Many of the best “activity log / revisions” admin products are now **source-available** (BUSL) or mixed-license; we should assume we’ll **build the audit viewer UX** but borrow patterns.
- There’s a consistent “control-plane IA” pattern worth copying across tools (Supabase/Appwrite):
  - project/environment selection → settings/keys → logs → resources
- Analytics dashboards (Umami) are useful for “admin telemetry” but must be treated as **strictly no-PII** and internal-only by default.

## 🧭 What changes because of this

- We have a clearer direction for the product audit/event viewer:
  - Build our own viewer (correct RBAC/redaction/tenant isolation)
  - Borrow UX patterns from PostHog (filters/drill-down), Directus (revisions), and Supabase/Appwrite (control-plane navigation)
- License posture is now more explicit in the index and candidates list (PostHog mixed, Directus BUSL flagged).

## ➡️ Next step

- Draft an “Audit/Event Viewer v1” UX spec (filters, drill-down, diff rendering, saved views, exports) tied to our canonical `audit_events` schema.
- Identify 3–5 permissive UI utilities/components we can use directly (tables, timelines, virtualized lists) and deepen those in the next tranche if we can avoid GitHub API rate limits.

## 🔗 Links / references

- `artifacts/summary.md`
- `artifacts/oss-candidates.md`
- `artifacts/build-vs-buy.md`
- `artifacts/sources.md`
- `artifacts/oss-index.md`

---

## Cleanup notes

- Step files compacted: 10 (and removed from steps/)
- Compaction file is capped at ~1048576 bytes (configurable via BLACKBOX_CONTEXT_MAX_BYTES).
