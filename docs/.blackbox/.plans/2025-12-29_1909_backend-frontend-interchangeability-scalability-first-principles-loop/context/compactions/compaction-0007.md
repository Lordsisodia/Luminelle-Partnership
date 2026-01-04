---
compaction: 0007
created_at: "2025-12-31 22:07"
range: "0061-0070"
max_bytes: 1048576
per_step_budget_bytes: 98304
---

# Compaction 0007 (0061–0070)

## ✅ Summary (fill this after compaction)

- The evidence loop was hardened (auto-refresh plan head snapshots + check-blackbox + blackbox listings) so “current state” citations can’t silently rot.
- Canonical-path drift was reduced by converting duplicate artifact docs into explicit pointer files (single source of truth, old links still work).
- Storefront primitives + Blocks Kit research was ingested into the 1909 plan with local snapshots, and used to expand the architecture docs (kit-first posture + DTO-first posture).
- A concrete storefront endpoint → DTO mapping was written so storefront swappability is now spec’d endpoint-by-endpoint (not hand-wavy).
- PR10 (storefront DTO normalization) was added to the PR roadmap to bridge “ports/adapters + internal keys” into a provider-neutral storefront boundary for future swappable UIs.
- The backend boundary contract + acceptance gates were updated to explicitly treat storefront DTO normalization as a measurable milestone (Gate G7 future/PR10).

## 🧩 Patterns / heuristics (fill this after compaction)

- Prompt improvements:
  - Prefer “evidence excerpt pinned into 1909 snapshots” over “link to other plan folder”, so the plan stays self-contained and auditable.
  - When a new concept becomes important (identity seam, storefront kit), add a stop-point metric or future gate to keep it measurable.
- Checklist improvements:
  - Always add a navigation hook (`artifact-map.md` + `CANONICAL.md`) when creating a new “important doc”, or it will get lost.
  - Prefer adding mapping docs + PR plans over adding more discovery/benchmarking when the bottleneck is contract normalization.
- Better stop conditions:
  - If `plan-snapshot-reference-audit.latest.txt` is OK and the dashboard is refreshed, stop and checkpoint; don’t keep “polishing” without new evidence.

## Steps compacted (trimmed)

### 0061_checkpoint-captured-auth-context-evidence-documented-identity-swap-readiness.md

---
step: 0061
created_at: "2025-12-31 18:48"
title: "Checkpoint: captured auth context evidence + documented identity swap readiness"
---

# Step 0061: Checkpoint: captured auth context evidence + documented identity swap readiness

## ✅ What I did (facts)

- Extended the gate refresh script to capture targeted auth/identity evidence heads (and mirrored the change into the template):
  - `.blackbox/scripts/refresh-1909-all-gates.sh`
  - `.blackbox/_template/scripts/refresh-1909-all-gates.sh`
- Ran the gate refresh so the new evidence snapshots exist in the 1909 plan:
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-auth-providers-AuthContext.impl.tsx.head240.txt`
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-shells-ClerkShell.tsx.head200.txt`
- Updated the provider swap playbook to include an identity provider coupling posture and a concrete “swap-ready target” metric:
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/provider-swap-playbook.md`

## 🧠 What I learned (new information)

- The repo already has a minimal internal `AuthProvider` shim in `platform/auth` that wraps Clerk (meaning we have a natural “identity adapter boundary” to grow into):
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-auth-providers-AuthContext.impl.tsx.head240.txt`
- Clerk usage is still present outside platform domains (baseline report), so identity swaps are not “mechanical” yet:
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/boundary-vendor-sdk-imports.nonplatform.rg.txt`

## 🧭 What changes because of this

- Identity/provider swap readiness is now evidence-backed and measurable:
  - Target: `vendor_sdk_imports_nonplatform_clerk → 0` (Clerk imports only inside `platform/auth`).
  - This reduces the future cost of client-by-client identity differences (Clerk vs something else).

## ➡️ Next step

- If we continue expanding the docs-only loop: add a short “identity swap” remediation plan (PR stub) that lists the concrete Clerk import sites (from the vendor SDK drift snapshot) and the intended migration path into `platform/auth` wrappers.

## 🔗 Links / references

- Auth context evidence: `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-auth-providers-AuthContext.impl.tsx.head240.txt`
- Vendor SDK drift snapshot (shows non-platform Clerk usage): `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/boundary-vendor-sdk-imports.nonplatform.rg.txt`
- Provider swap playbook: `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/provider-swap-playbook.md`

---

### 0062_checkpoint-identity-seam-research-index-expansion.md

---
step: 0062
created_at: "2025-12-31 19:12"
title: "Checkpoint: identity seam + research index expansion"
---

# Step 0062: Checkpoint: identity seam + research index expansion

## ✅ What I did (facts)

- Ran the full evidence + dashboard refresh loop to keep all claims grounded in fresh snapshots:
  - `.blackbox/scripts/run-1909-loop.sh`
  - Evidence logs:
    - `artifacts/snapshots/refresh-1909-all-gates.2025-12-31_121152.log.txt`
    - `artifacts/snapshots/refresh-1909-contract-evidence.2025-12-31_121152.log.txt`
    - `artifacts/snapshots/refresh-1909-stop-point-dashboard.2025-12-31_121153.log.txt`
  - Latest metrics: `artifacts/snapshots/stop-point-metrics.latest.txt`
- Synced canonical invariants so “vendor SDK imports outside platform” is an explicit acceptance signal:
  - `artifacts/invariants-and-acceptance.md`
- Reduced path ambiguity by updating plan references to point to the canonical invariants doc:
  - `work-queue.md`
  - `docs-to-read.md`
  - `migration-stages.md`
  - `artifacts/sources.md`
- Expanded the “inspect first” list to include the identity/auth seam and synced the artifact copy:
  - `inspect-first.md`
  - `artifacts/inspect-first.md`
- Added an explicit identity seam section to the architecture atlas so “auth is swappable” is mapped like commerce/payments:
  - `architecture-atlas.md`
- Expanded the research index by:
  - ingesting a historical architecture/coupling run (1844) into local snapshots
  - adding a “related plan folders” name-only scan snapshot to reduce browsing noise
  - updating `research-index.md` to reference both
  - Snapshots:
    - `artifacts/snapshots/research-plan-1844-architecture-map-improvements.final-report.head220.txt`
    - `artifacts/snapshots/research-plan-1844-architecture-map-improvements.coupling-report.head200.txt`
    - `artifacts/snapshots/research-plan-folders.related.latest.txt`
- Updated the component catalog’s identity section to point at the concrete auth wrapper and tracked coupling metric:
  - `architecture-component-catalog.md`

## 🧠 What I learned (new information)

- Identity swap readiness is easiest to reason about when it’s treated like every other platform seam (ports/context + backend webhooks), not as “random Clerk usage” scattered through UI.
- A lightweight “plan-folder scan” snapshot is enough to make research discoverable without dragging all plan runs into the canonical 1909 folder.
- The earlier 1844 architecture map work largely agrees with the 1909 plan (vendor IDs/copy/shims as key coupling blockers), so pinning it as a cross-check is valuable but doesn’t change the core boundary decisions.

## 🧭 What changes because of this

- The architecture map now explicitly documents the identity seam alongside commerce/cart/checkout/payments, which makes “swap auth provider later” an on-rails operation (docs + evidence) instead of a vague future refactor.
- The invariants doc now treats “vendor SDK imports outside platform” as a first-class signal (exception posture is explicit and measurable).
- The research index is now easier to extend safely: new research can be referenced via local snapshots, keeping the 1909 evidence rule intact.

## ➡️ Next step

- Docs-only hygiene pass: audit `.blackbox/` for duplicated/misplaced docs and tighten canonical paths so the loop stays simple as it grows (then re-run `run-1909-loop` to verify snapshots stay consistent).

## 🔗 Links / references

- Invariants: `artifacts/invariants-and-acceptance.md`
- Inspect-first (src): `inspect-first.md`
- Architecture atlas: `architecture-atlas.md`
- Research index: `research-index.md`
- Identity decoupling execution plan: `pr-9-identity-decoupling-detailed-plan.md`
- Latest dashboard: `stop-point-status-dashboard.md`

---

### 0063_checkpoint-auto-refresh-plan-head-snapshots-pinned-plans-index.md

---
step: 0063
created_at: "2025-12-31 19:22"
title: "Checkpoint: auto-refresh plan head snapshots + pinned plans index"
---

# Step 0063: Checkpoint: auto-refresh plan head snapshots + pinned plans index

## ✅ What I did (facts)

- Made evidence anchors self-updating by regenerating the `plan-*.head*.txt` snapshots on every gate run:
  - Updated: `docs/.blackbox/scripts/refresh-1909-all-gates.sh`
  - Template mirror: `docs/.blackbox/_template/scripts/refresh-1909-all-gates.sh`
  - Evidence (log shows new stage `[0b/5]`): `artifacts/snapshots/refresh-1909-all-gates.2025-12-31_121847.log.txt`
- Ran the full loop to refresh all evidence + dashboard after the script change:
  - `.blackbox/scripts/run-1909-loop.sh`
  - Evidence:
    - `artifacts/snapshots/refresh-1909-all-gates.2025-12-31_121847.log.txt`
    - `artifacts/snapshots/refresh-1909-stop-point-dashboard.2025-12-31_121848.log.txt`
    - `artifacts/snapshots/stop-point-metrics.latest.txt`
- Verified an actual freshness win: the migration stages snapshot now reflects the updated invariants path:
  - `artifacts/snapshots/plan-migration-stages.md.head120.txt`
- Captured a docs-only hygiene audit bundle for the blackbox layout:
  - `artifacts/snapshots/check-blackbox.latest.txt`
  - `artifacts/snapshots/docs-blackbox-root.ls.latest.txt`
  - `artifacts/snapshots/docs-blackbox-plans.ls.latest.txt`
  - Wrote: `blackbox-hygiene-audit.md`
- Reduced human browsing overhead by adding a pinned-plan list to:
  - `docs/.blackbox/.plans/README.md`

## 🧠 What I learned (new information)

- The plan uses “plan doc head snapshots” as evidence anchors in multiple places; without refreshing them, it’s easy for citations to drift even when the plan itself is consistent.
- Adding a small pinned-plan list improves operator UX more than aggressive file moving/renaming, and avoids breaking links.

## 🧭 What changes because of this

- Evidence anchors can’t silently rot anymore: if a plan doc changes, its `plan-*.head*.txt` snapshot updates on the next run.
- “Where do I start?” inside `.blackbox/.plans/` is now obvious without directory archaeology.

## ➡️ Next step

- Continue docs-only hygiene inside the 1909 plan: reduce duplication/ambiguity where possible (prefer canonical pointers) and keep the dashboard/gates stable after each cleanup step.

## 🔗 Links / references

- Gate refresh: `docs/.blackbox/scripts/refresh-1909-all-gates.sh`
- Latest dashboard: `stop-point-status-dashboard.md`
- Hygiene audit: `blackbox-hygiene-audit.md`

---

### 0064_checkpoint-gate-refresh-now-snapshots-plan-heads-check-blackbox.md

---
step: 0064
created_at: "2025-12-31 19:24"
title: "Checkpoint: gate refresh now snapshots plan heads + check-blackbox"
---

# Step 0064: Checkpoint: gate refresh now snapshots plan heads + check-blackbox

## ✅ What I did (facts)

- Extended the full gate refresh so it always snapshots a structural blackbox validation run:
  - Updated: `docs/.blackbox/scripts/refresh-1909-all-gates.sh`
  - Template mirror: `docs/.blackbox/_template/scripts/refresh-1909-all-gates.sh`
  - Output (stable): `artifacts/snapshots/check-blackbox.latest.txt`
- Re-ran the full loop to regenerate evidence + dashboard after the script changes:
  - `.blackbox/scripts/run-1909-loop.sh`
  - Evidence:
    - `artifacts/snapshots/refresh-1909-all-gates.2025-12-31_122432.log.txt`
    - `artifacts/snapshots/refresh-1909-stop-point-dashboard.2025-12-31_122433.log.txt`
    - `stop-point-status-dashboard.md`

## 🧠 What I learned (new information)

- Keeping “meta health” (blackbox structure and template parity) in the same evidence stream as boundary/gate metrics reduces operator error during long runs.

## 🧭 What changes because of this

- `run-1909-loop` now produces a single evidence bundle that covers both:
  - architecture swap readiness signals (vendor leaks, boundary drift, auth/cache gaps)
  - blackbox runtime integrity (templates/scripts/structure)

## ➡️ Next step

- Continue the docs-only cleanup loop by tightening plan navigation where it reduces cognitive load (prefer canonical pointers, avoid duplicate “source of truth” docs).

## 🔗 Links / references

- Hygiene audit summary: `blackbox-hygiene-audit.md`
- Latest structural check: `artifacts/snapshots/check-blackbox.latest.txt`

---

### 0065_checkpoint-canonical-pointers-for-duplicate-artifact-docs.md

---
step: 0065
created_at: "2025-12-31 21:36"
title: "Checkpoint: canonical pointers for duplicate artifact docs"
---

# Step 0065: Checkpoint: canonical pointers for duplicate artifact docs

## ✅ What I did (facts)

- Audited the 1909 plan folder for “same doc in two places” duplicates:
  - Plan root contains `inspect-first.md`, `inspect-first-backend.md`, `RUN-NOW.md`, and `invariants-and-acceptance.md`.
  - `artifacts/` also contained duplicates of some of those.
- Made the duplicates explicit pointers so we have a single canonical copy (prevents drift):
  - `artifacts/inspect-first.md` → points to `../inspect-first.md`
  - `artifacts/inspect-first-backend.md` → points to `../inspect-first-backend.md`
  - `artifacts/RUN-NOW.md` → points to `../RUN-NOW.md`
  - `invariants-and-acceptance.md` (plan root) → points to `artifacts/invariants-and-acceptance.md`
- Updated the canonical run summary to reference the canonical backend inspect doc location:
  - `artifacts/summary.md` now cites `inspect-first-backend.md`
- Re-ran the full evidence + dashboard loop to ensure nothing regressed:
  - `.blackbox/scripts/run-1909-loop.sh`
  - Evidence:
    - `artifacts/snapshots/refresh-1909-all-gates.2025-12-31_143548.log.txt`
    - `artifacts/snapshots/plan-snapshot-reference-audit.latest.txt`
    - `stop-point-status-dashboard.md`

## 🧠 What I learned (new information)

- The most common way the plan “gets worse over time” is not lack of content—it’s multiple near-identical docs that slowly diverge.
- Pointer files are the lowest-risk way to simplify without breaking older links (steps/compactions can keep referencing old paths).

## 🧭 What changes because of this

- There’s now one obvious source of truth for each of these docs:
  - invariants: `artifacts/invariants-and-acceptance.md`
  - inspect lists + runbook: plan root
- The plan becomes easier to maintain during long runs (less chance of updating the wrong copy).

## ➡️ Next step

- Continue tightening plan navigation by removing any remaining “two copies” patterns and ensuring `CANONICAL.md` + `START-HERE.md` always point to the canonical copy (then rerun `run-1909-loop` after each change).

## 🔗 Links / references

- Canonical map: `CANONICAL.md`
- Entry point: `START-HERE.md`
- Canonical invariants: `artifacts/invariants-and-acceptance.md`
- Latest dashboard: `stop-point-status-dashboard.md`

---

### 0066_checkpoint-gate-refresh-now-snapshots-blackbox-root-plans-listings.md

---
step: 0066
created_at: "2025-12-31 21:39"
title: "Checkpoint: gate refresh now snapshots blackbox root/plans listings"
---

# Step 0066: Checkpoint: gate refresh now snapshots blackbox root/plans listings

## ✅ What I did (facts)

- Extended the 1909 gate refresh to snapshot `.blackbox` structural directory listings into the plan evidence bundle:
  - Updated: `docs/.blackbox/scripts/refresh-1909-all-gates.sh`
  - Template mirror: `docs/.blackbox/_template/scripts/refresh-1909-all-gates.sh`
  - Outputs (stable):
    - `artifacts/snapshots/docs-blackbox-root.ls.latest.txt`
    - `artifacts/snapshots/docs-blackbox-plans.ls.latest.txt`
- Re-ran the full loop to regenerate evidence + dashboard after the change:
  - `.blackbox/scripts/run-1909-loop.sh`
  - Evidence:
    - `artifacts/snapshots/refresh-1909-all-gates.2025-12-31_143910.log.txt`
    - `artifacts/snapshots/docs-blackbox-root.ls.2025-12-31_143910.txt`
    - `artifacts/snapshots/docs-blackbox-plans.ls.2025-12-31_143910.txt`
    - `stop-point-status-dashboard.md`

## 🧠 What I learned (new information)

- Capturing “what exists right now” in `.blackbox` is useful during long runs because it makes file-move/cleanup work auditable and reversible (we can diff listings between checkpoints).

## 🧭 What changes because of this

- The 1909 evidence bundle now covers:
  - swap readiness signals (vendor leaks, boundary drift, auth/cache gaps)
  - runtime health (check-blackbox)
  - blackbox layout visibility (root + plans listings)

## ➡️ Next step

- Continue reducing plan cognitive load by keeping canonical paths obvious (pointers where needed) and avoiding any new duplicated “source of truth” docs.

## 🔗 Links / references

- Latest blackbox listings:
  - `artifacts/snapshots/docs-blackbox-root.ls.latest.txt`
  - `artifacts/snapshots/docs-blackbox-plans.ls.latest.txt`

---

### 0067_checkpoint-ingest-storefront-kit-research-into-dto-kit-architecture.md

---
step: 0067
created_at: "2025-12-31 21:52"
title: "Checkpoint: ingest storefront kit research into DTO/kit architecture"
---

# Step 0067: Checkpoint: ingest storefront kit research into DTO/kit architecture

## ✅ What I did (facts)

- Ingested storefront-primitives-kit research into the 1909 plan as locally citable evidence snapshots:
  - `artifacts/snapshots/research-plan-0647-storefront-kit.step0001.head220.txt`
  - `artifacts/snapshots/research-plan-0647-storefront-kit.step0002.head220.txt`
  - `artifacts/snapshots/oss-catalog-blocks-inventory.storefront-v1.5.150-270.txt`
  - `artifacts/snapshots/oss-catalog-storefront-reference-set.head170.txt`
  - `artifacts/snapshots/oss-catalog-blocks-kit-contracts.head200.txt`
  - `artifacts/snapshots/oss-catalog-component-source-map.head200.txt`
- Updated plan docs to incorporate the storefront primitives/Blocks Kit outputs:
  - `research-index.md` (new “storefront kit + blocks kit” ingested section)
  - `architecture-expansion-from-research.md` (new storefront primitives kit section)
  - `dto-and-capabilities-spec-v0.1.md` (new proposed storefront DTO thin-slice)
  - `client-project-modularity-blueprint.md` (evidence that Blocks Kit contracts + source map exist)
  - `architecture-component-catalog.md` (new “Storefront primitives kit + Blocks Kit” component)
- Ran the standard loop to refresh gates, dashboards, and snapshot audits:
  - `./.blackbox/scripts/run-1909-loop.sh`
  - Confirmed no missing snapshot references: `artifacts/snapshots/plan-snapshot-reference-audit.latest.txt`

## 🧠 What I learned (new information)

- The most leverage for storefront interchangeability is contract normalization (DTOs + UI state semantics), not additional repo discovery.  
  Evidence: `artifacts/snapshots/research-plan-0647-storefront-kit.step0001.head220.txt`
- URL-synced state should be treated as a reusable primitive (filters/pagination/saved views), not “page glue”.  
  Evidence: `artifacts/snapshots/research-plan-0647-storefront-kit.step0001.head220.txt`
- We already have a docs-level “UI kit contract” foundation (Blocks Kit + acceptance criteria + OSS file pointers) that can map cleanly to a future `@lumelle/ui-core` package.  
  Evidence: `artifacts/snapshots/oss-catalog-blocks-kit-contracts.head200.txt`, `artifacts/snapshots/oss-catalog-component-source-map.head200.txt`

## 🧭 What changes because of this

- The “frontend swappable” posture is now concretely extended for storefront UI:
  - stable DTO shapes are now explicitly proposed in `dto-and-capabilities-spec-v0.1.md`
  - storefront primitives have acceptance criteria in the Blocks Inventory
  - canonical mining references are pinned (so kit work doesn’t regress to discovery churn)
- The plan can now drive implementation in two parallel tracks (when code changes are allowed):
  - backend: ensure `/api/storefront/*` endpoints emit the proposed DTOs consistently
  - frontend: implement primitives against DTOs (no vendor IDs/SDKs)

## ➡️ Next step

- Align proposed storefront DTOs to current endpoint behavior by:
  - mapping `functions/api/storefront/product/by-handle.ts` and `functions/api/storefront/cart/*` snapshots to the DTO proposal
  - expanding `backend-boundary-contract-v1.1-endpoint-table.md` with “DTO family” annotations (docs-only)
- Optional (docs-only): add one small ADR that standardizes “URL state is a primitive” for both storefront and admin.

## 🔗 Links / references

- Research ingestion:
  - `research-index.md`
  - `artifacts/snapshots/research-plan-0647-storefront-kit.step0001.head220.txt`
  - `artifacts/snapshots/research-plan-0647-storefront-kit.step0002.head220.txt`
- Kit artifacts (internal):
  - `artifacts/snapshots/oss-catalog-blocks-inventory.storefront-v1.5.150-270.txt`
  - `artifacts/snapshots/oss-catalog-storefront-reference-set.head170.txt`
  - `artifacts/snapshots/oss-catalog-blocks-kit-contracts.head200.txt`
  - `artifacts/snapshots/oss-catalog-component-source-map.head200.txt`
- Architecture docs updated:
  - `architecture-expansion-from-research.md`
  - `dto-and-capabilities-spec-v0.1.md`
  - `client-project-modularity-blueprint.md`
  - `architecture-component-catalog.md`

---

### 0068_checkpoint-map-api-storefront-endpoints-to-provider-neutral-dtos.md

---
step: 0068
created_at: "2025-12-31 22:00"
title: "Checkpoint: map /api/storefront endpoints to provider-neutral DTOs"
---

# Step 0068: Checkpoint: map /api/storefront endpoints to provider-neutral DTOs

## ✅ What I did (facts)

- Captured missing storefront cart endpoint snapshots into the 1909 plan evidence bundle:
  - `artifacts/snapshots/functions-api-storefront-cart-add-lines.ts.head220.txt`
  - `artifacts/snapshots/functions-api-storefront-cart-update-line.ts.head220.txt`
  - `artifacts/snapshots/functions-api-storefront-cart-remove-lines.ts.head220.txt`
  - `artifacts/snapshots/functions-api-storefront-cart-attributes-update.ts.head220.txt`
  - `artifacts/snapshots/functions-api-storefront-cart-discount-codes-update.ts.head220.txt`
  - `artifacts/snapshots/functions-api-storefront-cart-set-buyer-identity.ts.head220.txt`
- Wrote an evidence-backed mapping doc from `/api/storefront/*` endpoints → target provider-neutral storefront DTOs:
  - `storefront-contract-dto-mapping-v0.1.md`
- Updated plan navigation so the new mapping doc is discoverable:
  - `artifact-map.md`
  - `CANONICAL.md`
- Refreshed the full 1909 gate bundle + dashboard:
  - `./.blackbox/scripts/run-1909-loop.sh`
  - Evidence: `artifacts/snapshots/refresh-1909-all-gates.2025-12-31_150036.log.txt`
  - Verified snapshot citation audit: `artifacts/snapshots/plan-snapshot-reference-audit.latest.txt`

## 🧠 What I learned (new information)

- The storefront boundary is currently “Shopify object passthrough” for product + cart:
  - Product endpoint returns Shopify `product.id` and `variant.id` (GIDs): `artifacts/snapshots/functions-api-storefront-product-by-handle.ts.head220.txt`
  - Cart endpoints return `CartFields` which includes Shopify IDs and `checkoutUrl`: `artifacts/snapshots/functions-_lib-storefront.ts.head280.txt`
- This makes the next real swappability milestone very clear: transform these responses into internal keys + DTOs so UIs never need to see Shopify identifiers.

## 🧭 What changes because of this

- The plan now has a concrete, endpoint-by-endpoint “translation checklist” for implementation phase:
  - which request params must switch from provider IDs → internal keys
  - which response payloads must switch from provider objects → DTOs
- This reduces ambiguity for future work: “frontend swap readiness” now includes storefront DTO normalization (not just generic boundary rules).

## ➡️ Next step

- Tighten the mapping by annotating the backend contract by DTO family (docs-only), and then:
  - update `backend-boundary-contract-v1.md` with “storefront DTO requirements” per endpoint family, or
  - create a small companion table that lists `/api/storefront/*` → required DTO(s) + cache/auth expectations.

## 🔗 Links / references

- Mapping doc: `storefront-contract-dto-mapping-v0.1.md`
- Evidence (current storefront behavior):
  - `artifacts/snapshots/functions-api-storefront-product-by-handle.ts.head220.txt`
  - `artifacts/snapshots/functions-api-storefront-cart-fetch.ts.head220.txt`
  - `artifacts/snapshots/functions-_lib-storefront.ts.head280.txt`
- Evidence (new cart endpoint snapshots):
  - `artifacts/snapshots/functions-api-storefront-cart-add-lines.ts.head220.txt`
  - `artifacts/snapshots/functions-api-storefront-cart-update-line.ts.head220.txt`
  - `artifacts/snapshots/functions-api-storefront-cart-remove-lines.ts.head220.txt`

---

### 0069_checkpoint-add-pr10-storefront-dto-normalization-plan.md

---
step: 0069
created_at: "2025-12-31 22:05"
title: "Checkpoint: add PR10 storefront DTO normalization plan"
---

# Step 0069: Checkpoint: add PR10 storefront DTO normalization plan

## ✅ What I did (facts)

- Captured evidence that `/api/storefront/*` endpoints are currently consumed by Shopify platform adapters (not random UI modules):
  - `artifacts/snapshots/rg-src-api-storefront-usage.latest.txt`
- Drafted an implementation-ready plan to normalize storefront boundary responses into provider-neutral DTOs:
  - `pr-10-storefront-dto-normalization-detailed-plan.md`
- Wired PR10 into the execution roadmap and canonical maps:
  - `pr-by-pr-stop-points-plan.md`
  - `artifact-map.md`
  - `CANONICAL.md`
- Refreshed the full evidence bundle + dashboard:
  - `./.blackbox/scripts/run-1909-loop.sh`
  - Evidence: `artifacts/snapshots/refresh-1909-all-gates.2025-12-31_150500.log.txt`

## 🧠 What I learned (new information)

- Storefront boundary normalization is now “mechanically spec’d” at two levels:
  - exact endpoint → DTO mapping: `storefront-contract-dto-mapping-v0.1.md`
  - an implementation sequence with a low-risk versioned option (`/api/storefront/v2/*`): `pr-10-storefront-dto-normalization-detailed-plan.md`

## 🧭 What changes because of this

- The roadmap now explicitly covers the missing link between “internal keys + ports/adapters” and “storefront UI primitives”:
  - a new UI can eventually integrate storefront primitives using only HTTP+JSON + DTOs, without Shopify object shapes or Shopify IDs.

## ➡️ Next step

- Optional docs-only follow-up:
  - add a small acceptance gate spec for “storefront response vendor-id leak” (responses must not contain `gid://shopify/`) and park it in `acceptance-gates.md` as an implementation-phase gate to add later.

## 🔗 Links / references

- Evidence of current coupling (storefront usage in platform adapters):
  - `artifacts/snapshots/rg-src-api-storefront-usage.latest.txt`
- New docs:
  - `pr-10-storefront-dto-normalization-detailed-plan.md`
  - `storefront-contract-dto-mapping-v0.1.md`

---

### 0070_checkpoint-wire-storefront-dto-mapping-into-boundary-contract-gates.md

---
step: 0070
created_at: "2025-12-31 22:07"
title: "Checkpoint: wire storefront DTO mapping into boundary contract + gates"
---

# Step 0070: Checkpoint: wire storefront DTO mapping into boundary contract + gates

## ✅ What I did (facts)

- Wired storefront DTO normalization work into the canonical boundary contract doc so “storefront swappability” is explicit at the contract level:
  - `backend-boundary-contract-v1.md`
  - Added links to `storefront-contract-dto-mapping-v0.1.md` and `pr-10-storefront-dto-normalization-detailed-plan.md`
  - Included evidence anchors showing current provider passthrough behavior:
    - Product endpoint returns Shopify IDs: `artifacts/snapshots/functions-api-storefront-product-by-handle.ts.head220.txt`
    - Cart fragment includes Shopify IDs + checkoutUrl: `artifacts/snapshots/functions-_lib-storefront.ts.head280.txt`
- Added a future acceptance gate for storefront DTO neutrality (to enable after PR10):
  - `acceptance-gates.md` (Gate G7)
- Refreshed the full 1909 evidence bundle + dashboard:
  - `./.blackbox/scripts/run-1909-loop.sh`
  - Evidence: `artifacts/snapshots/refresh-1909-all-gates.2025-12-31_150716.log.txt`

## 🧠 What I learned (new information)

- The boundary contract doc is now “end-to-end swappability aware”: it calls out not only auth/tenant/cache tiers but also the DTO shape expectation for storefront product/cart, with a concrete mapping and PR plan to execute later.

## 🧭 What changes because of this

- The plan is less ambiguous for future execution: PR10 is now clearly tied into the contract/gates, so storefront DTO normalization is not an “optional nice-to-have”, it’s a measurable swap boundary milestone.

## ➡️ Next step

- Optional docs-only follow-up:
  - Add a short note to `acceptance-gates-runbook.md` explaining when/how to run Gate G7 during PR10 (runtime check + evidence capture).

## 🔗 Links / references

- Updated contract: `backend-boundary-contract-v1.md`
- Mapping + PR plan:
  - `storefront-contract-dto-mapping-v0.1.md`
  - `pr-10-storefront-dto-normalization-detailed-plan.md`
- Evidence:
  - `artifacts/snapshots/functions-api-storefront-product-by-handle.ts.head220.txt`
  - `artifacts/snapshots/functions-_lib-storefront.ts.head280.txt`

---

## Cleanup notes

- Step files compacted: 10 (and removed from steps/)
- Compaction file is capped at ~1048576 bytes (configurable via BLACKBOX_CONTEXT_MAX_BYTES).
