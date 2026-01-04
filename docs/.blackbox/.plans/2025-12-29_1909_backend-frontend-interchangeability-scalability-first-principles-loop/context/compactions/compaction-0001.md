---
compaction: 0001
created_at: "2025-12-30 21:30"
range: "0001-0010"
max_bytes: 1048576
per_step_budget_bytes: 98304
---

# Compaction 0001 (0001–0010)

## ✅ Summary (fill this after compaction)

- Luminelle already has a strong “ports → runtime → adapters” shape; the main work is enforcing and expanding it with a stable `/api/*` contract so the frontend can be swapped safely.
- The architecture loop is evidence-first: gate scripts generate inventories/cue scans/vendor leak scans under `artifacts/snapshots/` and the stop-point dashboard uses those signals to recommend the next PR.
- Multi-tenant readiness is host-first and backend-owned: tenant context resolution is deterministic and cache-safe; per-tenant integration config + secrets should live in Supabase tables, not env sprawl.
- Security surfaced as a prerequisite for swappability: sensitive endpoint families must have consistent auth guards; internal bearer auth exists and is the current “minimum viable” guard for admin flows.
- Vendor coupling is measurable: the vendor leak scan is the baseline to drive toward 0 and later hard-gate in CI.

## 🧩 Patterns / heuristics (fill this after compaction)

- Prompt improvements:
  - Require file-path evidence for every “current state” claim; link to snapshots, not memory.
  - Prefer updating canonical docs and indices (`CANONICAL.md`, `START-HERE.md`) over adding new plan files.
- Checklist improvements:
  - Keep heuristic scans aligned with real auth helpers (e.g., include `requireInternalAuth(` in auth cue scans).
  - After any meaningful doc/script change, refresh evidence and update `_snapshot-index.ls.txt`.
- Better stop conditions:
  - Stop a cycle once (a) evidence is refreshed, (b) the next PR is unambiguous, and (c) the acceptance checks for that PR are explicit.

## Steps compacted (trimmed)

### 0001_checkpoint-prompt-05-tenancy-rules-evidence-citations.md

---
step: 0001
created_at: "2025-12-29 19:58"
title: "Checkpoint: prompt-05 tenancy rules + evidence citations"
---

# Step 0001: Checkpoint: prompt-05 tenancy rules + evidence citations

## ✅ What I did (facts)

- Added “Prompt 5” tenancy resolution + propagation rules as a dedicated doc: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/tenancy-context-rules.md`.
- Updated the backend boundary contract to reference tenancy rules and require tenant-aware caching behavior: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/backend-boundary-contract-v0.md`.
- Captured additional evidence snapshots for boundary files + coupling hotspots and indexed them: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/_snapshot-index.ls.txt`.
- Tightened Prompt 1 docs so “why/acceptance” statements are anchored to snapshot evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/invariants-and-acceptance.md` and `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/inspect-first.md`.

## 🧠 What I learned (new information)

- The repo has a clear platform boundary surface (ports + runtimes) that is stable enough to align a `/api/*` BFF contract to: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/platform-ports-files.txt` and `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/platform-runtime-files.txt`.
- There are measurable enforcement points already (adapter import scans, vendor leak scans) that can become acceptance gates once code changes are allowed: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/boundary-adapter-imports.rg.txt` and `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/check-vendor-leaks.txt`.

## 🧭 What changes because of this

- “Multi-tenant readiness” becomes an explicit boundary requirement (tenant context is resolved server-side, not in UI), which tightens the definition of “frontend swappable”: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/tenancy-context-rules.md`.
- The backend contract v0 now has an explicit place to put caching + tenant separation guardrails, reducing the risk of cross-tenant leaks as traffic grows: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/backend-boundary-contract-v0.md`.

## ➡️ Next step

- Write the phased migration plan that ties together: vendor ID cleanup → `/api/*` contract implementation → tenancy tables/RLS strategy → onboarding tenant #2: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/work-queue.md`.

## 🔗 Links / references

- Snapshot index (all evidence files): `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/_snapshot-index.ls.txt`.
- Coupling scans (informative): `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/coupling-shopify-gid-matches.txt` and `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/coupling-supabase-matches.txt`.

---

### 0002_checkpoint-add-atlas-dto-spec-security-first-dashboard.md

---
step: 0002
created_at: "2025-12-30 18:18"
title: "Checkpoint: add atlas + DTO spec + security-first dashboard"
---

# Step 0002: Checkpoint: add atlas + DTO spec + security-first dashboard

## ✅ What I did (facts)

- Refreshed evidence snapshots and gate outputs via `./.blackbox/scripts/refresh-1909-all-gates.sh`, which updates `/api/*` inventories, cue scans, vendor-leak scan, and platform inventories under `artifacts/snapshots/`.
- Regenerated the stop-point dashboard via `./.blackbox/scripts/refresh-1909-stop-point-dashboard.sh` and then improved the dashboard script to recommend auth work first when sensitive endpoints show auth gaps.
- Added an evidence-first repo “map” doc: `architecture-atlas.md`.
- Added a DTO + capabilities boundary spec to make frontend swapping concrete: `dto-and-capabilities-spec-v0.1.md`.
- Added a deployment topologies doc clarifying how “one Supabase project → many clients” can work with either one UI or many UIs: `multitenant-deployment-topologies.md`.
- Updated the main entrypoint to include these docs: `START-HERE.md`.

## 🧠 What I learned (new information)

- The contract gap scan explicitly lists admin/exports/metrics/orders endpoints as “missing auth cues” (heuristic), so security work should be prioritized before vendor-leak cleanup. Source: `contract-gaps-report-v1.1.md`.
- The current “swap risk” remains measurable as vendor ID leakage above adapters (still non-zero). Source: `artifacts/snapshots/check-vendor-leaks.txt`.

## 🧭 What changes because of this

- We now have a documented “layer map” and swap points tied to repo topology, so new contributors can reason about what is allowed to depend on what without reading the entire codebase first: `architecture-atlas.md`.
- We now have a single place defining what crosses the `/api/*` boundary (DTOs, error envelopes, capabilities), which is the prerequisite for a truly swappable frontend: `dto-and-capabilities-spec-v0.1.md`.
- The dashboard now recommends **PR 2** when auth gaps hit sensitive endpoint families (admin/exports/metrics/orders), instead of defaulting to vendor-leak cleanup. Source: `stop-point-status-dashboard.md`.

## ➡️ Next step

- If/when `src/` and `functions/` changes are allowed, execute PR 2 (auth guards) first, then re-run `./.blackbox/scripts/refresh-1909-all-gates.sh` and record a PR diff under `context/pr-diffs/`.
- After PR 2, revisit PR ordering between PR 3 (tenant resolution wiring) and PR 7 (vendor ID elimination) based on the updated gate metrics in `stop-point-status-dashboard.md`.

## 🔗 Links / references

- Dashboard: `stop-point-status-dashboard.md`
- Gaps report: `contract-gaps-report-v1.1.md`
- Evidence snapshots index: `artifacts/snapshots/_snapshot-index.ls.txt`
- “Run gates” command: `./.blackbox/scripts/refresh-1909-all-gates.sh`

---

### 0003_checkpoint-incorporate-feature-research-into-modular-platform-expansion.md

---
step: 0003
created_at: "2025-12-30 18:24"
title: "Checkpoint: incorporate feature research into modular platform expansion"
---

# Step 0003: Checkpoint: incorporate feature research into modular platform expansion

## ✅ What I did (facts)

- Read the gathered research excerpts already snapshotted into this plan (feature research synthesis, SAFE-only OSS shortlist, plugin architecture notes, and “internal API first” port strategy).  
  Evidence:  
  - `artifacts/snapshots/feature-research-summary.head220.txt`  
  - `artifacts/snapshots/feature-research-oss-ranked-safe-only.head160.txt`  
  - `artifacts/snapshots/research-ui-infra-plugin-architecture.md.head220.txt`  
  - `artifacts/snapshots/research-ui-infra-port-implementation-strategy.md.head220.txt`
- Expanded the architecture plan with a research-to-architecture mapping doc and a repeatable domain template (ports/adapters/runtime/api).  
  Outputs:  
  - `architecture-expansion-from-research.md`  
  - `platform-domain-template.md`
- Added v0.1 modular domain specs for the highest-leverage “safety rail” primitives highlighted by the research: RBAC, audit log, and feature flags.  
  Outputs:  
  - `authz-rbac-design-v0.1.md`  
  - `audit-log-design-v0.1.md`  
  - `feature-flags-per-tenant-design-v0.1.md`
- Added ops/scalability docs that connect directly to the existing `/api/*` contract and gap scans: observability/telemetry and cache invalidation.  
  Outputs:  
  - `observability-and-telemetry-plan-v0.1.md`  
  - `cache-invalidation-playbook-v0.1.md`
- Updated the plan entrypoint so these docs are in the primary reading order.  
  Output: `START-HERE.md`

## 🧠 What I learned (new information)

- The research strongly supports making “safety rails” (feature flags, audit log, RBAC) early platform primitives, because they reduce risk across *every* admin action, not just one feature.  
  Evidence: `artifacts/snapshots/feature-research-summary.head220.txt`
- The recommended port implementation default matches this repo’s current direction: “internal API first” keeps vendors and secrets out of UI and makes frontends truly swappable.  
  Evidence: `artifacts/snapshots/research-ui-infra-port-implementation-strategy.md.head220.txt`

## 🧭 What changes because of this

- The architecture plan now has a concrete “how to add a new domain” recipe that preserves the UI/backend/provider swap boundaries, instead of leaving feature expansion as ad-hoc additions.  
  Output: `platform-domain-template.md`
- We now have a clear path to grow beyond “Shopify storefront + basic admin” into a reusable client-project platform by adding modular domains (authz/audit/flags) behind `/api/*` and tenant rules.  
  Outputs:  
  - `architecture-expansion-from-research.md`  
  - `authz-rbac-design-v0.1.md`  
  - `audit-log-design-v0.1.md`  
  - `feature-flags-per-tenant-design-v0.1.md`

## ➡️ Next step

- If we remain docs-only: add a “workflow automation hooks” domain spec (`platform/automation`) using the same template, since it’s also top-ranked in the research.  
  Evidence driver: `artifacts/snapshots/feature-research-summary.head220.txt`
- If code changes are allowed: execute PR 2 (auth guards on sensitive `/api/*` families) before vendor-ID cleanup, then re-run gates and record the PR diff under `context/pr-diffs/`.

## 🔗 Links / references

- Entry point: `START-HERE.md`
- Research excerpt: `artifacts/snapshots/feature-research-summary.head220.txt`
- Domain recipe: `platform-domain-template.md`

---

### 0004_checkpoint-expand-plan-with-automation-cms-analytics-adrs-backlog.md

---
step: 0004
created_at: "2025-12-30 18:28"
title: "Checkpoint: expand plan with automation/CMS/analytics + ADRs + backlog"
---

# Step 0004: Checkpoint: expand plan with automation/CMS/analytics + ADRs + backlog

## ✅ What I did (facts)

- Read the existing research snapshots that were already gathered into this plan and used them as the evidence basis for new modular domain specs.  
  Evidence:  
  - `artifacts/snapshots/feature-research-summary.head220.txt`  
  - `artifacts/snapshots/research-ui-infra-plugin-architecture.md.head220.txt`  
  - `artifacts/snapshots/research-ui-infra-port-implementation-strategy.md.head220.txt`
- Added new “platform domain” v0.1 design docs that extend the architecture plan beyond the core swap-boundary work:
  - `workflow-automation-hooks-design-v0.1.md`
  - `cms-content-ops-design-v0.1.md`
  - `admin-usage-analytics-design-v0.1.md`
- Added ADRs to make the core architectural choices explicit and reviewable:
  - `adrs/0001-internal-api-first.md`
  - `adrs/0002-capability-driven-ui.md`
  - `adrs/0003-host-first-tenancy.md`
  - `adrs/README.md`
- Updated the main entrypoint doc and backlog so these expansions are part of the official reading order and execution queue:
  - `START-HERE.md`
  - `architecture-backlog.md`

## 🧠 What I learned (new information)

- The gathered research strongly emphasizes “safety rails” (feature flags, audit log, RBAC) and workflow hooks as early primitives; mapping these to modular platform domains keeps them interchangeable for client projects.  
  Evidence: `artifacts/snapshots/feature-research-summary.head220.txt`
- The plugin architecture research supports capability-driven UIs and “internal API first” port implementations, which aligns with the plan’s backend boundary contract approach.  
  Evidence:  
  - `artifacts/snapshots/research-ui-infra-plugin-architecture.md.head220.txt`  
  - `artifacts/snapshots/research-ui-infra-port-implementation-strategy.md.head220.txt`

## 🧭 What changes because of this

- The plan now contains a concrete, repeatable method for expanding the platform with new domains without breaking the swap boundaries:
  - domain template: `platform-domain-template.md`
  - ADRs: `adrs/README.md`
- The execution backlog now includes a “P5: research-driven platform expansion” section so growth is structured instead of ad-hoc:
  - `architecture-backlog.md`

## ➡️ Next step

- Docs-only: create a “platform/automation” port/API template file stub list (paths-only) using `platform-domain-template.md` so the eventual PR can be executed quickly and consistently.
- If code changes are allowed: proceed with PR 2 (auth guards) first, then re-run gates and capture PR evidence under `context/pr-diffs/`.

## 🔗 Links / references

- Plan entrypoint: `START-HERE.md`
- Domain template: `platform-domain-template.md`
- Research → architecture mapping: `architecture-expansion-from-research.md`

---

### 0005_checkpoint-add-platform-events-skeletons-frontend-test-kit-adrs.md

---
step: 0005
created_at: "2025-12-30 18:32"
title: "Checkpoint: add platform events + skeletons + frontend test kit + ADRs"
---

# Step 0005: Checkpoint: add platform events + skeletons + frontend test kit + ADRs

## ✅ What I did (facts)

- Converted existing research outputs into more executable architecture artifacts (still docs-only; no `src/`/`functions/` edits).
- Added a shared platform event vocabulary so automation/audit/analytics can use consistent names and remain provider-agnostic:
  - `platform-events-catalog-v0.1.md`
- Added a “paths-only” implementation skeleton document to make future PRs fast and consistent:
  - `implementation-skeletons-v0.1.md`
- Added a CLI-first “frontend contract test kit” to validate frontend swappability against `/api/*`:
  - `frontend-contract-test-kit.md`
- Added ADRs to lock in additional core decisions:
  - `adrs/0004-versioned-contract-and-error-envelope.md`
  - `adrs/0005-backend-first-supabase-access.md`
- Updated the plan entrypoint to include these new docs:
  - `START-HERE.md`

## 🧠 What I learned (new information)

- To keep “workflow hooks + audit log + analytics” interchangeable across client projects, we need a single event vocabulary (platform events) that is explicitly *not* vendor webhook types.
- Frontend swappability needs a “test kit” (even if docs-only) so teams don’t accidentally slip vendor IDs or adapter imports back into UI/client code.

## 🧭 What changes because of this

- The plan now has a concrete “execution bridge” from docs → PRs via `implementation-skeletons-v0.1.md` and a repeatable `frontend-contract-test-kit.md`.
- Contract consistency is now captured as ADRs (versioned envelopes + backend-first Supabase), which reduces future architectural drift when new domains are added.

## ➡️ Next step

- Docs-only: add a “tenant-aware config + secrets strategy” ADR (how `tenant_integrations.secret_ref` is implemented, and what is allowed to be returned via `/api/config/public`).
- If code changes are allowed: proceed with PR 2 (auth guards) first (dashboard recommends it) and record a PR diff under `context/pr-diffs/`.

## 🔗 Links / references

- Entry point: `START-HERE.md`
- Events: `platform-events-catalog-v0.1.md`
- Skeletons: `implementation-skeletons-v0.1.md`
- Frontend test kit: `frontend-contract-test-kit.md`

---

### 0006_checkpoint-consolidate-docs-and-reduce-plan-drift.md

---
step: 0006
created_at: "2025-12-30 20:54"
title: "Checkpoint: consolidate docs and reduce plan drift"
---

# Step 0006: Checkpoint: consolidate docs and reduce plan drift

## ✅ What I did (facts)

- Created a canonical docs map so it’s clear what is authoritative vs supporting:
  - `CANONICAL.md`
- Marked the old backend contract v0 as historical/superseded and pointed to v1/v1.1 artifacts:
  - `backend-boundary-contract-v0.md`
- Replaced placeholder/template docs with explicit “template/deprecated” notes to reduce confusion:
  - `artifacts.md`
  - `rankings.md`
  - `checklist.md`
  - `notes.md`
- Filled the artifact index so humans can quickly find plan outputs without spelunking:
  - `artifact-map.md`
- Updated entrypoints and “status” docs so the plan reads cleanly end-to-end:
  - `START-HERE.md`
  - `README.md`
  - `status.md`
  - `work-queue.md`

## 🧠 What I learned (new information)

- Placeholder “template” docs create plan drift and make it harder to know what to follow; explicitly marking them as templates (or replacing them with real maps) immediately improves execution readiness.
- The plan is now at diminishing returns for “new docs”: the best next improvements are only those that unblock implementation sequencing and multitenant readiness.

## 🧭 What changes because of this

- The plan now has a “single source of truth” for what to read and what to treat as supporting/historical, which should prevent the plan quality from degrading as new work happens:
  - `CANONICAL.md`
- Future contributions can be constrained: new docs should only exist if they remove a concrete blocker; otherwise update existing canonical docs.

## ➡️ Next step

- Fill the remaining docs-only gap that will otherwise block multi-tenant execution: define tenant secrets/config strategy (how `tenant_integrations.secret_ref` is implemented and what can be returned via `/api/config/public`).
- After that, stop expanding docs and switch fully to executing the PR stop-point plan when code changes are allowed:
  - `stop-point-status-dashboard.md`
  - `pr-by-pr-stop-points-plan.md`

## 🔗 Links / references

- Canonical map: `CANONICAL.md`
- Entry point: `START-HERE.md`
- Dashboard: `stop-point-status-dashboard.md`

---

### 0007_checkpoint-tenant-secrets-strategy-public-config-allowlist.md

---
step: 0007
created_at: "2025-12-30 20:58"
title: "Checkpoint: tenant secrets strategy + public config allowlist"
---

# Step 0007: Checkpoint: tenant secrets strategy + public config allowlist

## ✅ What I did (facts)

- Added an ADR that defines how per-tenant secrets are handled (so multitenancy doesn’t require per-tenant env vars) and how a tenant-scoped `/api/config/public` allowlist works:
  - `adrs/0006-tenant-secrets-and-public-config.md`
- Added a concrete v0.1 spec for:
  - encrypted secret storage in Supabase (referenced by `tenant_integrations.secret_ref`)
  - request-time resolution algorithm
  - `/api/config/public` and optional `/api/config/admin` endpoint behavior
  - `tenant-secrets-and-public-config-spec-v0.1.md`
- Updated canonical pointers so this new blocker-removal doc is discoverable:
  - `START-HERE.md`
  - `CANONICAL.md`
  - `artifact-map.md`
  - `adrs/README.md`

## 🧠 What I learned (new information)

- The existing functions environment bindings are global (single-tenant friendly) but not a viable mechanism for per-tenant provider secrets; this makes a database-backed secret strategy a necessary prerequisite for “one Supabase project for many tenants.”  
  Evidence: `artifacts/snapshots/functions-_lib-types.ts.head160.txt`
- The repo already has the required foundation for backend-first secret resolution (service-role Supabase client in Functions), which supports this approach without changing the UI boundary assumptions.  
  Evidence: `artifacts/snapshots/functions-_lib-supabase.ts.head160.txt`

## 🧭 What changes because of this

- The plan now has a defined answer for “where do tenant secrets live” and “what can the frontend read,” which removes a key ambiguity that would otherwise block tenant #2 onboarding and provider swaps.
- The docs-only plan is closer to being “done”: remaining work should focus on implementation PRs (auth guards, tenant resolution wiring, vendor ID cleanup) instead of adding more architecture docs.

## ➡️ Next step

- Decide whether any further docs work is net-positive; default to “stop docs, start PRs” unless a new blocker appears.
- If implementation begins, follow the dashboard recommendation and PR plan:
  - `stop-point-status-dashboard.md`
  - `pr-by-pr-stop-points-plan.md`

## 🔗 Links / references

- ADR: `adrs/0006-tenant-secrets-and-public-config.md`
- Spec: `tenant-secrets-and-public-config-spec-v0.1.md`
- Evidence anchors:
  - `artifacts/snapshots/functions-_lib-types.ts.head160.txt`
  - `artifacts/snapshots/functions-_lib-supabase.ts.head160.txt`

---

### 0008_checkpoint-stabilize-tracking-docs-next-actions-progress-log.md

---
step: 0008
created_at: "2025-12-30 21:00"
title: "Checkpoint: stabilize tracking docs (next actions + progress log)"
---

# Step 0008: Checkpoint: stabilize tracking docs (next actions + progress log)

## ✅ What I did (facts)

- Updated the plan’s “next actions” artifact to reflect the current state (docs stabilized; implementation-ready workflow):
  - `artifacts/next-actions.md`
- Updated the high-level progress log to include major milestones beyond the first prompt set:
  - `progress-log.md`

## 🧠 What I learned (new information)

- The plan now has enough structure that the main risk is no longer “missing docs,” it’s “docs drift” and execution not being evidence-backed; keeping `artifacts/next-actions.md` aligned avoids that.

## 🧭 What changes because of this

- The plan’s “what to do next” is now consistent with the canonical maps and dashboards, so it should be harder to accidentally go backwards into old tasks or placeholder docs.

## ➡️ Next step

- Stop expanding docs unless a new blocker is discovered; shift to executing the PR stop-point plan when code changes are allowed.

## 🔗 Links / references

- Next actions: `artifacts/next-actions.md`
- Canonical map: `CANONICAL.md`

---

### 0009_checkpoint-finalize-consolidation-update-final-report.md

---
step: 0009
created_at: "2025-12-30 21:05"
title: "Checkpoint: finalize consolidation + update final report"
---

# Step 0009: Checkpoint: finalize consolidation + update final report

## ✅ What I did (facts)

- Refreshed evidence and dashboard outputs to keep “current state” claims grounded:
  - `./.blackbox/scripts/refresh-1909-all-gates.sh`
  - `./.blackbox/scripts/refresh-1909-stop-point-dashboard.sh`
- Updated the final narrative so it reflects the current consolidated plan state (removed outdated “docs-only remaining” list, added canonical pointers, and reframed next actions as implementation-ready):
  - `final-report.md`
- Updated `docs-to-read.md` so it points to the real plan entrypoints first (`START-HERE.md`, `CANONICAL.md`) and treats older external docs as optional background:
  - `docs-to-read.md`

## 🧠 What I learned (new information)

- The biggest remaining sources of “plan getting worse” are:
  - outdated “next steps” sections that no longer match reality
  - docs that point to external prompt packs instead of the canonical plan entrypoints
- Keeping `final-report.md` and `docs-to-read.md` aligned to `CANONICAL.md` prevents drift as implementation begins.

## 🧭 What changes because of this

- The plan now reads cleanly from entrypoint → canonical map → final report → execution plan, without suggesting already-completed docs-only tasks.
- The plan is now explicitly in “implementation-ready” posture: the remaining work is PR execution (auth guards, tenant wiring, vendor leak elimination), not more architecture documents.

## ➡️ Next step

- Stop expanding docs by default.
- When code changes are allowed, execute the PR stop-point plan starting from the dashboard recommendation:
  - `stop-point-status-dashboard.md`
  - `pr-by-pr-stop-points-plan.md`

## 🔗 Links / references

- Canonical map: `CANONICAL.md`
- Entrypoint: `START-HERE.md`
- Final narrative: `final-report.md`

---

### 0010_checkpoint-fix-auth-gap-heuristics-pr2-detailed-plan.md

---
step: 0010
created_at: "2025-12-30 21:30"
title: "Checkpoint: Fix auth-gap heuristics + PR2 detailed plan"
---

# Step 0010: Checkpoint: Fix auth-gap heuristics + PR2 detailed plan

## ✅ What I did (facts)

- Updated the contract-evidence heuristic to treat `requireInternalAuth(` as an “auth cue” so the auth-gap report stops flagging false positives.
  - Evidence (script head): `artifacts/snapshots/docs-blackbox-scripts-refresh-1909-contract-evidence.sh.head200.txt`
- Re-ran the contract evidence refresh to regenerate the endpoint table + gaps report with the improved auth cue detection.
  - Evidence (run log): `artifacts/snapshots/refresh-1909-contract-evidence.2025-12-30_225358.log.txt`
  - Output docs: `backend-boundary-contract-v1.1-endpoint-table.md`, `contract-gaps-report-v1.1.md`
- Wrote the implementation-ready PR2 plan that wires consistent auth guards across `/api/*` endpoint families.
  - Plan doc: `pr-2-auth-guards-detailed-plan.md`

## 🧠 What I learned (new information)

- The main reason `contract_gaps_missing_auth` can be noisy is “auth exists but isn’t detected”; improving cue detection (vs hand-labeling endpoints) keeps the plan scalable as endpoints grow.
  - Evidence anchor (heuristic source): `artifacts/snapshots/docs-blackbox-scripts-refresh-1909-contract-evidence.sh.head200.txt`
- With better auth-cue detection, the gaps report becomes a more reliable prioritization tool for PR sequencing (rather than a brittle static checklist).
  - Evidence anchor (gaps output): `contract-gaps-report-v1.1.md`

## 🧭 What changes because of this

- The contract gaps signal is now closer to “real missing auth” instead of “missing heuristics”, so the stop-point dashboard can safely recommend PR2 without chasing false positives.
  - Evidence: `stop-point-status-dashboard.md`
- PR2 is now execution-ready (wiring plan exists) and can be implemented once code changes are allowed.
  - Evidence: `pr-2-auth-guards-detailed-plan.md`

## ➡️ Next step

- Continue: yes.
- Next: keep using the refreshed gaps report to drive the PR-by-PR stop-point plan (PR2 → PR3 → PR4), regenerating evidence after each PR.
  - Evidence: `pr-by-pr-stop-points-plan.md`, `acceptance-gates-runbook.md`

## 🔗 Links / references

- Auth cue heuristic source: `artifacts/snapshots/docs-blackbox-scripts-refresh-1909-contract-evidence.sh.head200.txt`
- Contract evidence refresh log: `artifacts/snapshots/refresh-1909-contract-evidence.2025-12-30_225358.log.txt`
- Endpoint table + gaps output: `backend-boundary-contract-v1.1-endpoint-table.md`, `contract-gaps-report-v1.1.md`
- PR2 detailed plan: `pr-2-auth-guards-detailed-plan.md`

---

## Cleanup notes

- Step files compacted: 10 (and removed from steps/)
- Compaction file is capped at ~1048576 bytes (configurable via BLACKBOX_CONTEXT_MAX_BYTES).
