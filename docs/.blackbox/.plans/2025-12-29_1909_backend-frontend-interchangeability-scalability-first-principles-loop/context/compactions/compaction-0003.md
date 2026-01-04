---
compaction: 0003
created_at: "2025-12-31 06:05"
range: "0021-0030"
max_bytes: 1048576
per_step_budget_bytes: 98304
---

# Compaction 0003 (0021–0030)

## ✅ Summary (fill this after compaction)

- <3–7 bullets capturing the durable takeaways>

## 🧩 Patterns / heuristics (fill this after compaction)

- Prompt improvements:
- Checklist improvements:
- Better stop conditions:

## Steps compacted (trimmed)

### 0021_checkpoint-expanded-external-research-notes-with-plugin-ports-key-mapping-multitenancy.md

---
step: 0021
created_at: "2025-12-30 23:15"
title: "Checkpoint: expanded external research notes with plugin/ports/key-mapping/multitenancy"
---

# Step 0021: Checkpoint: expanded external research notes with plugin/ports/key-mapping/multitenancy

## ✅ What I did (facts)

- Expanded `external-research-notes.md` to include the key research primitives that directly influence architecture decisions:
  - plugin architecture (providers as pluggable implementations behind ports)
  - internal API first (why `/api/*` is the seam for swappable UIs)
  - key mapping (why vendor IDs must not leak above adapters)
  - Supabase multitenancy posture (host-first tenancy + config in DB)
- Ensured every research claim is backed by an in-plan snapshot (so the plan stays self-contained and evidence-first).

## 🧠 What I learned (new information)

- The “swap-ability” plan is strongest when it stays anchored to 4 research-backed mechanisms:
  - stable contract boundary (`/api/*`)
  - ports/adapters separation (plugin model)
  - internal keys (mapping layer)
  - tenant resolution + per-tenant config (avoid env sprawl)

## 🧭 What changes because of this

- Implementation planning can now reference one compact research ledger (`external-research-notes.md`) instead of requiring you to remember which research file proved which decision.
- Future docs expansions are less likely to drift into “product brainstorming” because research is scoped to architecture-relevant primitives and backed by snapshots.

## ➡️ Next step

- Expand the “P0.3 boundary consolidation” plan into a PR-style evidence diff template (so the first real code PR has a ready-made evidence checklist and shrink-target for `api_only`).

## 🔗 Links / references

- Research ledger: `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/external-research-notes.md`
- Evidence snapshots used:
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/research-ui-infra-plugin-architecture.md.head220.txt`
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/research-ui-infra-port-implementation-strategy.md.head220.txt`
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/research-ui-infra-key-mapping-strategy.md.head220.txt`
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/research-supabase-multitenancy-decoupled-backend.md.head220.txt`

---

### 0022_checkpoint-dashboard-now-tracks-p0-3-pr-diff-template-includes-drift-signals.md

---
step: 0022
created_at: "2025-12-30 23:17"
title: "Checkpoint: dashboard now tracks P0.3 + PR diff template includes drift signals"
---

# Step 0022: Checkpoint: dashboard now tracks P0.3 + PR diff template includes drift signals

## ✅ What I did (facts)

- Updated the stop-point dashboard generator to track P0.3 completion separately from numbered PRs (via `*_p0-3_*.md` diff files).  
  Evidence:  
  - `docs/.blackbox/scripts/refresh-1909-stop-point-dashboard.sh`  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/stop-point-status-dashboard.md`
- Updated the PR evidence diff template to include the drift signal files needed for P0.3 (`api_only` shrink target).  
  Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/pr-evidence-diff-summary-template.md`
- Updated the PR diffs README to document P0.3 filename convention (`YYYY-MM-DD_p0-3_*.md`).  
  Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/context/pr-diffs/README.md`
- Re-ran gates + dashboard so the script-head snapshots and new dashboard rendering are verified.  
  Evidence logs:  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/refresh-1909-all-gates.2025-12-30_161738.log.txt`  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/refresh-1909-stop-point-dashboard.2025-12-30_161739.log.txt`

## 🧠 What I learned (new information)

- Treating P0.3 as a first-class stop point reduces ambiguity: it’s the one prerequisite that makes “canonical `/api/*` boundary” operational (before auth/tenant/cache wiring work).

## 🧭 What changes because of this

- The dashboard now matches the plan’s sequencing (P0.3 → PR1 → PR2…), so it won’t “look wrong” during real execution.
- The first implementation PR can be written with an evidence diff that explicitly targets reducing `api_only` and shrinking `api-only-endpoints.txt`.

## ➡️ Next step

- Draft a P0.3 diff file template (not “completed”, just prefilled) under `context/pr-diffs/` so execution is copy/paste when code changes begin.

## 🔗 Links / references

- Dashboard script: `docs/.blackbox/scripts/refresh-1909-stop-point-dashboard.sh`
- Dashboard output: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/stop-point-status-dashboard.md`

---

### 0023_checkpoint-added-p0-3-diff-template-improved-dashboard-p0-3-linking.md

---
step: 0023
created_at: "2025-12-30 23:20"
title: "Checkpoint: added P0.3 diff template + improved dashboard P0.3 linking"
---

# Step 0023: Checkpoint: added P0.3 diff template + improved dashboard P0.3 linking

## ✅ What I did (facts)

- Added a P0.3 evidence diff template under `context/pr-diffs/` (intentionally ignored by the dashboard because filename contains `template`).  
  Evidence: `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/context/pr-diffs/2025-12-30_p0-3_template_boundary-consolidation.md`
- Updated the dashboard generator to prefer non-template P0.3 diffs when linking (so a real completion file will supersede the template).  
  Evidence: `.blackbox/scripts/refresh-1909-stop-point-dashboard.sh`
- Re-ran gates + dashboard refresh to snapshot the updated scripts and confirm rendering.  
  Evidence logs:  
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/refresh-1909-all-gates.2025-12-30_161958.log.txt`  
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/refresh-1909-stop-point-dashboard.2025-12-30_161958.log.txt`

## 🧠 What I learned (new information)

- Separating “templates” from “done” evidence diff files avoids accidental progress misreporting while still keeping copy/paste execution artifacts close to where they’re used.

## 🧭 What changes because of this

- P0.3 now has a copy/paste evidence checklist ready *before* code changes start, which reduces friction for the first implementation PR and makes drift reduction measurable immediately.

## ➡️ Next step

- Continue expanding the P0.3 plan into an endpoint-by-endpoint “parity table” (so every `api_only` endpoint has an explicit fate: migrate / delete / archive / keep legacy temporarily).

## 🔗 Links / references

- Dashboard: `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/stop-point-status-dashboard.md`
- Drift summary: `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-vs-functions.summary.txt`

---

### 0024_checkpoint-fixed-drift-metric-to-exclude-api-helper-modules-pkce-utils-verify.md

---
step: 0024
created_at: "2025-12-30 23:23"
title: "Checkpoint: fixed drift metric to exclude api helper modules (pkce/utils/_verify)"
---

# Step 0024: Checkpoint: fixed drift metric to exclude api helper modules (pkce/utils/_verify)

## ✅ What I did (facts)

- Added a more accurate filter to the `api/**` endpoint normalization step so helper modules are not counted as “api-only endpoints” drift.
  - Excluded: `customer-auth/pkce`, `customer-auth/utils`, `shopify/webhooks/_verify` (these are helpers, not route handlers).
  - Change location: `docs/.blackbox/scripts/refresh-1909-all-gates.sh`
- Captured a single snapshot file containing the heads of every api-only file so future triage can be evidence-backed without opening the repo manually:
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-only-endpoints.handlers.head80.txt`
- Re-ran the gate refresh + dashboard refresh so the drift metric, dashboards, and script head snapshots are consistent.
  - Evidence logs:
    - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/refresh-1909-all-gates.2025-12-30_162239.log.txt`
    - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/refresh-1909-stop-point-dashboard.2025-12-30_162247.log.txt`

## 🧠 What I learned (new information)

- The legacy `api/**` tree contains both endpoint handlers and internal helper modules; naive “file path diff” overcounts drift unless we filter those helpers out.
  - Evidence (helpers export functions, not handlers):
    - `api/customer-auth/pkce.ts` and `api/customer-auth/utils.ts` excerpts in `api-only-endpoints.handlers.head80.txt`
    - `api/shopify/webhooks/_verify.ts` excerpt in `api-only-endpoints.handlers.head80.txt`

## 🧭 What changes because of this

- The drift signal now better matches the real migration workload (endpoint parity), so “progress” won’t be confused with “measurement noise”.
- The stop-point dashboard now shows the corrected drift count (`api_only=19`) and a delta of `Δ-3` that is attributable to the measurement fix (not endpoint migration).
  - Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/stop-point-status-dashboard.md`

## ➡️ Next step

- Update the P0.3 plan to include a parity table for the remaining `api_only` endpoints (19 items) with a decided fate per endpoint: migrate / delete / archive / keep legacy temporarily.

## 🔗 Links / references

- Drift summary (corrected): `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-vs-functions.summary.txt`
- Api-only endpoints list (corrected): `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-only-endpoints.txt`

---

### 0025_checkpoint-added-api-only-parity-table-to-p0-3-plan-regenerated-usage-scan.md

---
step: 0025
created_at: "2025-12-30 23:26"
title: "Checkpoint: added api_only parity table to P0.3 plan + regenerated usage scan"
---

# Step 0025: Checkpoint: added api_only parity table to P0.3 plan + regenerated usage scan

## ✅ What I did (facts)

- Regenerated the api-only endpoint usage scan so it matches the corrected `api-only-endpoints.txt` list (19 items) and updated the `.latest` copy.
  - Evidence:
    - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-only-endpoints.exact-usage.2025-12-30_162511.txt`
    - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-only-endpoints.exact-usage.latest.txt`
- Added a “parity table” section to the P0.3 plan that assigns a default fate (migrate now/later/defer/investigate) for every remaining api-only endpoint.
  - Evidence:
    - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/p0-3-boundary-consolidation-detailed-plan.md`
- Captured a single “heads bundle” snapshot for all api-only endpoints (helps future triage stay evidence-first).
  - Evidence:
    - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-only-endpoints.handlers.head80.txt`

## 🧠 What I learned (new information)

- Most remaining `api_only` endpoints are not called by the current UI; only two are directly blocking Cloudflare-first operation:
  - `/api/newsletter/subscribe`
  - `/api/cloudinary/sign`
  Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-only-endpoints.exact-usage.latest.txt`

## 🧭 What changes because of this

- P0.3 is now “execution shaped”: you can implement it incrementally without re-triaging drift every time, because each endpoint has an explicit default fate and supporting evidence.

## ➡️ Next step

- Update the P0.3 plan to explicitly call out that the drift metric dropped from 22 → 19 due to a measurement fix (not migration), so future readers don’t misinterpret the dashboard delta.

## 🔗 Links / references

- P0.3 plan: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/p0-3-boundary-consolidation-detailed-plan.md`
- Drift summary: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-vs-functions.summary.txt`

---

### 0026_checkpoint-refresh-all-gates-now-auto-generates-api-only-triage-snapshots.md

---
step: 0026
created_at: "2025-12-30 23:28"
title: "Checkpoint: refresh-all-gates now auto-generates api_only triage snapshots"
---

# Step 0026: Checkpoint: refresh-all-gates now auto-generates api_only triage snapshots

## ✅ What I did (facts)

- Extended `docs/.blackbox/scripts/refresh-1909-all-gates.sh` so it not only computes the drift diff, but also automatically produces two triage snapshots for P0.3:
  - `artifacts/snapshots/api-only-endpoints.exact-usage.latest.txt` (UI/script/docs usage scan)
  - `artifacts/snapshots/api-only-endpoints.handlers.head80.txt` (handler heads bundle for the api-only set)
- Re-ran `refresh-1909-all-gates.sh` to verify the new triage snapshots are generated and stable.
  - Evidence log: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/refresh-1909-all-gates.2025-12-30_162838.log.txt`

## 🧠 What I learned (new information)

- Generating P0.3 triage snapshots inside the main gate refresh reduces “manual glue work” and prevents the drift list and usage scan from getting out of sync (which previously happened when the drift filter changed).

## 🧭 What changes because of this

- One command now produces the full P0.3 input set (drift list + usage + handler heads), which makes boundary consolidation more functional and less error-prone.

## ➡️ Next step

- Update the acceptance gates runbook and/or gate pack to explicitly reference these newly auto-generated P0.3 triage snapshots (so operators know they exist).

## 🔗 Links / references

- Gate script: `docs/.blackbox/scripts/refresh-1909-all-gates.sh`
- Triage outputs:
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-only-endpoints.exact-usage.latest.txt`
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-only-endpoints.handlers.head80.txt`

---

### 0027_checkpoint-runbook-gate-pack-now-reference-auto-generated-p0-3-triage-snapshots.md

---
step: 0027
created_at: "2025-12-30 23:30"
title: "Checkpoint: runbook + gate pack now reference auto-generated P0.3 triage snapshots"
---

# Step 0027: Checkpoint: runbook + gate pack now reference auto-generated P0.3 triage snapshots

## ✅ What I did (facts)

- Updated the acceptance gates runbook drift gate (Gate A.1) to explicitly reference the two P0.3 triage snapshots that are now auto-generated by `refresh-1909-all-gates.sh`:
  - `api-only-endpoints.exact-usage.latest.txt`
  - `api-only-endpoints.handlers.head80.txt`
- Updated the PR stop-point gate pack’s P0.3 section to mention those same snapshots as expected evidence outputs (so operators don’t miss them).

## 🧠 What I learned (new information)

- Operator docs are easiest to follow when they list *exactly* what files will appear after running the “one-command” refresh scripts (rather than requiring manual discovery in `_snapshot-index.ls.txt`).

## 🧭 What changes because of this

- P0.3 execution is now more “single command → all evidence appears”:
  - Drift list + usage scan + handler heads are all explicitly discoverable from the runbook and gate pack.

## ➡️ Next step

- Run a fresh gate refresh after the documentation changes so the snapshot index and latest logs reflect the updated scripts/runbooks.

## 🔗 Links / references

- Runbook: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/acceptance-gates-runbook.md`
- Gate pack: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/pr-stop-point-gate-pack.md`

---

### 0028_checkpoint-p0-3-investigate-endpoints-resolved-swap-matrix-added.md

---
step: 0028
created_at: "2025-12-31 05:54"
title: "Checkpoint: P0.3 investigate endpoints resolved; swap matrix added"
---

# Step 0028: Checkpoint: P0.3 investigate endpoints resolved; swap matrix added

## ✅ What I did (facts)

- Refreshed 1909 evidence gates (contract inventories, drift, vendor leak scan, adapter import scan) and wrote timestamped logs into `artifacts/snapshots/`.
- Investigated the remaining P0.3 parity-table “INVESTIGATE” endpoints using repo-only evidence (Shopify config + webhook registration code + usage scans).
- Captured additional evidence snapshots for Shopify config + webhook registration + legacy handlers into `artifacts/snapshots/`.
- Updated `p0-3-boundary-consolidation-detailed-plan.md` to remove ambiguity: all previously `INVESTIGATE` endpoints are now `DEFER` with explicit evidence links.
- Added a “Swap matrix (at a glance)” section to `architecture-component-catalog.md` so the interchangeable seams are visible without reading the whole plan.

## 🧠 What I learned (new information)

- `shopify.app.toml` does not declare any webhook topics (it only pins an API version), so webhook topics must be registered elsewhere or managed externally.
- The current Shopify install flow (`functions/api/shopify/auth/callback.ts`) registers only customers/orders/fulfillments/uninstall topics — not checkout topics.
- `scripts/register-webhooks.mjs` confirms the intended webhook set matches the install-flow topics (no `CHECKOUTS_*`), so `api/shopify/webhooks/checkouts-*` appears to be legacy/unused in current flows.
- `api/shopify/billing/create`, `api/shopify/settings`, and `api/shopify/sync` are internal-auth + legacy PG endpoints with no runtime/UI callsites found in the current tree; they’re best treated as deferred legacy helpers.
- `api/og.ts` is a Vercel OG image handler referenced in docs but not in runtime callsites; migrating it to Cloudflare would require a different implementation.

## 🧭 What changes because of this

- P0.3 boundary consolidation is now more mechanical: the parity table has no “unknown” endpoints left, so implementation can focus on the truly required surface (`MIGRATE_NOW` + a small `MIGRATE_LATER` set).
- Checkout webhook legacy endpoints are no longer treated as a likely parity requirement; they’re explicitly deferred unless the webhook registration set changes in the future.
- The overall “swappable components” story is clearer and less hand-wavy due to the new swap matrix.

## ➡️ Next step

- Continue: yes.
- Next micro-goal: update P0.3 plan’s “Low priority items” section to explicitly group the deferred Shopify/OG endpoints as “legacy embedded app + doc-only stubs” (so P0.3 execution stays focused on the two UI-required endpoints).

## 🔗 Links / references

- Updated P0.3 parity plan: `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/p0-3-boundary-consolidation-detailed-plan.md`
- Updated component catalog (+ swap matrix): `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/architecture-component-catalog.md`
- Evidence: `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/shopify.app.toml.head240.txt`
- Evidence: `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-shopify-auth-callback.ts.head240.txt`
- Evidence: `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/scripts-register-webhooks.mjs.head220.txt`
- Evidence: `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/p0-3_investigate_checkouts_webhooks.rg.txt`
- Evidence: `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/p0-3_investigate_og_usage.rg.txt`

---

### 0029_checkpoint-p0-3-migrate-now-contracts-execution-checklist-delta-expectations.md

---
step: 0029
created_at: "2025-12-31 06:03"
title: "Checkpoint: P0.3 migrate-now contracts + execution checklist + delta expectations"
---

# Step 0029: Checkpoint: P0.3 migrate-now contracts + execution checklist + delta expectations

## ✅ What I did (facts)

- Captured new evidence snapshots for the P0.3 “MIGRATE_NOW” endpoints (newsletter + Cloudinary) including usage scans, env snippet, and DB migration context.
- Updated the P0.3 detailed plan to include:
  - explicit legacy request/response contracts to preserve
  - a copy/paste execution checklist for implementing P0.3 safely
- Updated the PR stop-point gate pack to include explicit “expected drift deltas” after migrating the two `MIGRATE_NOW` endpoints.

## 🧠 What I learned (new information)

- Newsletter signup currently relies on runtime DDL (`CREATE TABLE IF NOT EXISTS public.newsletter_signups`) in the legacy `api/**` handler, and there is no corresponding `server/migrations/**` mention today.
- Cloudinary signing is used by the admin product upload widget and depends on specific env vars (server-side Cloudinary secret + Vite public Cloudinary config).
- P0.3 should preserve parity first (contract shapes), and only later (PR 2) harden auth tiers consistently across admin endpoints.

## 🧭 What changes because of this

- P0.3 implementation is now more “mechanical”: the two required endpoints have explicit contracts and an execution checklist, reducing the risk of accidental UI breakage.
- Success for the thin-slice P0.3 milestone is now measurable with an explicit drift delta expectation (api_only decreases by 2 after migrating newsletter+cloudinary to `functions/api/**`).

## ➡️ Next step

- Continue: yes.
- Next micro-goal: add a concrete SQL migration draft for `public.newsletter_signups` (Supabase posture + RLS) so P0.3 doesn’t depend on runtime DDL.

## 🔗 Links / references

- P0.3 detailed plan (updated): `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/p0-3-boundary-consolidation-detailed-plan.md`
- PR gate pack (updated): `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/pr-stop-point-gate-pack.md`
- Evidence: `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/p0-3_newsletter_usage.rg.head120.txt`
- Evidence: `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/p0-3_cloudinary_usage.rg.head120.txt`
- Evidence: `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/env-example.cloudinary.L90-140.txt`
- Evidence: `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/server-migrations-2025-12-16_cms_product_media.sql.head120.txt`

---

### 0030_checkpoint-drafted-supabase-migration-for-newsletter-signups-docs-only.md

---
step: 0030
created_at: "2025-12-31 06:05"
title: "Checkpoint: drafted Supabase migration for newsletter_signups (docs-only)"
---

# Step 0030: Checkpoint: drafted Supabase migration for newsletter_signups (docs-only)

## ✅ What I did (facts)

- Added a concrete SQL migration draft for `public.newsletter_signups` to the P0.3 plan so the Cloudflare migration doesn’t rely on runtime DDL.
- Documented a default RLS posture (service-role insert/read) aligned with “backend-first Supabase access”.

## 🧠 What I learned (new information)

- The legacy newsletter endpoint’s behavior is simple and can be preserved by:
  - lowercasing/validating email in the handler (as today), and
  - inserting into a Supabase-backed `newsletter_signups` table with `ON CONFLICT DO NOTHING` semantics at the SQL level.

## 🧭 What changes because of this

- P0.3 now has a concrete “do this first” DB step, removing a major source of ambiguity for the newsletter migration.

## ➡️ Next step

- Continue: yes.
- Next micro-goal: add a Cloudflare-compatible Cloudinary signing implementation note (SHA1 on Web Crypto) to further de-risk the second MIGRATE_NOW endpoint.

## 🔗 Links / references

- P0.3 plan (updated): `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/p0-3-boundary-consolidation-detailed-plan.md`
- Evidence (legacy behavior): `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-newsletter-subscribe.ts.head260.txt`

---

## Cleanup notes

- Step files compacted: 10 (and removed from steps/)
- Compaction file is capped at ~1048576 bytes (configurable via BLACKBOX_CONTEXT_MAX_BYTES).
