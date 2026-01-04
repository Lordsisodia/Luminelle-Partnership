# Status (frequently updated)

## Timestamp
2025-12-31 17:51Z (docs-only)

## Phase
consolidation + execution-ready (docs stabilized; ready to start PRs when code changes are allowed)

## What changed since last update
- Refreshed the 1909 gate bundle + dashboard, updated P0.3 docs to match the latest drift list (`api_only=13`, scripts usage `1`), and made `run-1909-loop.sh` persist its output to `run-1909-loop.latest.txt`.  
  Evidence: `artifacts/snapshots/stop-point-metrics.latest.txt`, `artifacts/snapshots/api-only-endpoints.txt`, `artifacts/snapshots/run-1909-loop.latest.txt`
- Added `NEXT.md` as a single short “what now?” entrypoint (linked from `START-HERE.md` + `CANONICAL.md`) to reduce loop thrash and make resuming the plan one click.  
  Docs: `NEXT.md`
- Refreshed the 1909 gate bundle + dashboard (evidence + stop-point metrics are current; next PR remains P0.3).  
  Evidence: `stop-point-status-dashboard.md`, `artifacts/snapshots/stop-point-metrics.latest.txt`, `artifacts/snapshots/refresh-1909-all-gates.2025-12-31_161058.log.txt`
- Refreshed the 1909 gate bundle + dashboard and recorded a stable baseline snapshot for the current stop-point metrics and recommended next PR (P0.3).  
  Evidence: `artifacts/snapshots/run-1909-loop.latest.txt`, `stop-point-status-dashboard.md`
- Added a deterministic 6–10 hour / ~50 prompt agent cycle script so long-running “first principles” loops don’t thrash.  
  Docs: `agent-cycle-prompts-50.md` (linked from `agent-cycle.md` + `START-HERE.md`)
- Ingested the “Blog Page Kit” research checklist as a first-class UI modularity input (content pages tend to fork early in client work).  
  Evidence anchor: `artifacts/snapshots/research-plan-0551-blog-kit.step0002.head220.txt`
- Added a report-only “vendor SDK import isolation” gate and updated the swap/scalability docs to treat identity UI + capability-gated embedded flows as explicit exceptions (keeps coupling intentional without pretending it is zero):
  - Gate refresh log: `artifacts/snapshots/refresh-1909-all-gates.2025-12-31_112121.log.txt`
  - Dashboard refresh log: `artifacts/snapshots/refresh-1909-stop-point-dashboard.2025-12-31_112122.log.txt`
  - Vendor SDK imports baseline: `artifacts/snapshots/boundary-vendor-sdk-imports.nonplatform.rg.txt`
- Promoted the vendor SDK import signal into the stop-point dashboard metrics so it trends over time alongside the core swap blockers:
  - Latest metrics: `artifacts/snapshots/stop-point-metrics.latest.txt`
  - Dashboard: `stop-point-status-dashboard.md`
- Made `refresh-1909-all-gates.sh` capture additional architecture evidence on every run (src topology + key file heads + provider env reads), and added an automated audit to ensure all snapshot citations in plan markdown resolve to real files:
  - Gate refresh log: `artifacts/snapshots/refresh-1909-all-gates.2025-12-31_064038.log.txt`
  - Dashboard refresh log: `artifacts/snapshots/refresh-1909-stop-point-dashboard.2025-12-31_064039.log.txt`
  - Snapshot reference audit (latest): `artifacts/snapshots/plan-snapshot-reference-audit.latest.txt`
- Refreshed the full 1909 evidence bundle + regenerated the stop-point dashboard using the one-command wrapper, then added additional repo topology snapshots to ground the next architecture writeups:
  - Wrapper stdout (includes metrics + recommended PR): `artifacts/snapshots/run-1909-loop.2025-12-31_122926.log.txt`
  - Evidence refresh logs:
    - `artifacts/snapshots/refresh-1909-all-gates.2025-12-31_052926.log.txt`
    - `artifacts/snapshots/refresh-1909-contract-evidence.2025-12-31_052926.log.txt`
    - `artifacts/snapshots/refresh-1909-stop-point-dashboard.2025-12-31_052927.log.txt`
  - Repo/topology snapshots added:
    - `artifacts/snapshots/repo-structure.src-overview.2025-12-31_122954.txt`
    - `artifacts/snapshots/src-domains.overview.2025-12-31_123109.txt`
    - `artifacts/snapshots/src-domains.platform.files.2025-12-31_123126.txt`
    - `artifacts/snapshots/src-key-files.extract.2025-12-31_123223.txt`
  - Blackbox hygiene check (still passing): `artifacts/snapshots/check-blackbox.2025-12-31_123654.txt`
- Added a provider swap playbook (Shopify/Stripe/etc.) and a platform domain readiness matrix, then refreshed gates + dashboard so evidence is current:
  - Docs:
    - `provider-swap-playbook.md`
    - `architecture-component-catalog.md`
  - Evidence:
    - `artifacts/snapshots/refresh-1909-all-gates.2025-12-31_050237.log.txt`
    - `artifacts/snapshots/refresh-1909-stop-point-dashboard.2025-12-31_050244.log.txt`
    - `artifacts/snapshots/stop-point-metrics.latest.txt`
- Re-ran the full gate/evidence suite and refreshed the stop-point dashboard so evidence + indices are current:
  - Evidence:
    - `artifacts/snapshots/refresh-1909-all-gates.2025-12-31_024849.log.txt`
    - `artifacts/snapshots/refresh-1909-stop-point-dashboard.2025-12-31_024859.log.txt`
- Linked the OSS accelerators map into canonical indices and recorded the pinned OSS shortlist excerpts in the research index:
  - `oss-platform-primitives-map.md`
  - `research-index.md`
  - Indices: `START-HERE.md`, `CANONICAL.md`, `artifact-map.md`
- Removed remaining `<fill>` placeholders from compaction context and fixed a duplication bug in the invariants doc:
  - `context/compactions/compaction-0001.md`
  - `context/compactions/compaction-0004.md`
  - `artifacts/invariants-and-acceptance.md`
- Refreshed the full evidence/gates suite and regenerated the stop-point dashboard (logs are captured under snapshots for traceability):
  - `.blackbox/scripts/refresh-1909-all-gates.sh`
  - `.blackbox/scripts/refresh-1909-stop-point-dashboard.sh`
  - Evidence:
    - `artifacts/snapshots/refresh-1909-all-gates.2025-12-31_020027.log.txt`
    - `artifacts/snapshots/refresh-1909-stop-point-dashboard.2025-12-31_020035.log.txt`
- Added “conventions” docs to make the repo’s swappable seams easier to understand at a glance (layer-specific maps):
  - `domain-module-conventions.md` (how `src/domains/**` stays swappable)
  - `backend-boundary-conventions.md` (how `/api/*` stays stable and swappable)
  - `data-layer-conventions.md` (Supabase posture + migrations + multitenancy readiness)
- Expanded the client-project modularity blueprint with a pragmatic `apps/*` + `packages/*` future layout (docs-first, no code changes):
  - `client-project-modularity-blueprint.md`
- Updated plan navigation so the new docs are discoverable without increasing plan sprawl:
  - `START-HERE.md`
  - `CANONICAL.md`
  - `artifact-map.md`
- Performed a `.blackbox/.plans` hygiene cleanup by archiving excess OSS discovery run folders (kept latest OSS runs + ledger-referenced runs) so active plans are readable:
  - Evidence:
    - `artifacts/snapshots/blackbox-plans.oss-archive-plan.txt`
    - `artifacts/snapshots/blackbox-plans.oss-archive-moves.2025-12-31_021943Z.txt`
    - `artifacts/snapshots/blackbox-plans.dirlist.before.txt`
    - `artifacts/snapshots/blackbox-plans.dirlist.after.txt`
- Added a reusable maintenance script for future OSS run cleanup (archive by count, not age) and wired it into template drift checks:
  - Script: `docs/.blackbox/scripts/archive-oss-plans.py`
  - Template: `docs/.blackbox/_template/scripts/archive-oss-plans.py`
  - Drift check updated: `docs/.blackbox/scripts/check-blackbox.sh`
- Added a research ingestion index and pinned upstream excerpts into this plan’s snapshot folder so “research claims” remain evidence-backed and local:
  - `research-index.md`
  - Evidence snapshots:
    - `artifacts/snapshots/research-plan-2014-ui-infra-plugin.final-report.head140.txt`
    - `artifacts/snapshots/research-plan-0741-key-mapping.final-report.head200.txt`
    - `artifacts/snapshots/research-plan-feature-research-step01.summary.head120.txt`
- Promoted the checkout proxy/handoff seam to a first-class invariant in the acceptance gates and made the gate refresh script auto-snapshot it:
  - `acceptance-gates.md` + `acceptance-gates-runbook.md`
  - `.blackbox/scripts/refresh-1909-all-gates.sh`
  - Evidence snapshots:
    - `artifacts/snapshots/functions-cart-c-catchall.ts.head200.txt`
    - `artifacts/snapshots/functions-checkouts-catchall.ts.head200.txt`
    - `artifacts/snapshots/functions-_lib-shopifyCheckoutProxy.ts.head240.txt`
- Made the stop-point dashboard track the checkout proxy seam as a metric so regressions show up immediately:
  - `.blackbox/scripts/refresh-1909-stop-point-dashboard.sh`
  - `stop-point-status-dashboard.md`
- Updated the PR stop-point gate pack + PR evidence diff template to explicitly include checkout proxy seam deltas alongside drift/vendor-leak metrics:
  - `pr-stop-point-gate-pack.md`
  - `pr-evidence-diff-summary-template.md`
- Added a canonical docs map to reduce drift and clarify what is authoritative vs supporting:
  - `CANONICAL.md`
- Converted placeholder template docs into explicit “template/deprecated” notes and filled the artifact map:
  - `artifact-map.md`
- Added execution bridge artifacts (event vocabulary, paths-only skeletons, frontend test kit) to make the plan implementation-ready:
  - `platform-events-catalog-v0.1.md`
  - `implementation-skeletons-v0.1.md`
  - `frontend-contract-test-kit.md`
- Added ADRs to pin key decisions:
  - `adrs/README.md`
- Fixed the contract “auth cue” heuristic to recognize `requireInternalAuth(` and refreshed gate outputs to reduce false positives:
  - `.blackbox/scripts/refresh-1909-contract-evidence.sh`
  - `contract-gaps-report-v1.1.md`
- Added a detailed PR 2 plan (auth guard wiring) and linked it from entrypoints:
  - `pr-2-auth-guards-detailed-plan.md`
- Added a detailed PR 3 plan (tenant resolution wiring) and linked it from entrypoints:
  - `pr-3-tenant-resolution-detailed-plan.md`
- Refined cache gap heuristics to require an explicit cache policy (not just an `ETag`) and refreshed contract evidence/dashboard:
  - `contract-gaps-report-v1.1.md`
  - `stop-point-status-dashboard.md`
- Added a detailed PR 4 plan (cache headers normalization) and linked it from entrypoints:
  - `pr-4-cache-headers-detailed-plan.md`
- Added detailed PR 5/6 plans to make multitenancy operational (Supabase tenancy tables + tenant integration config lookup):
  - `pr-5-tenancy-tables-detailed-plan.md`
  - `pr-6-tenant-integration-config-lookup-detailed-plan.md`
- Captured a functions→Supabase call inventory to ground tenancy work in current table usage:
  - `artifacts/snapshots/functions-supabase-calls.rg.txt`
- Added a detailed PR 7 plan to eliminate Shopify GIDs from UI/client code by migrating to internal keys + adapter-level mapping:
  - `pr-7-vendor-key-mapping-detailed-plan.md`
- Added a detailed PR 8 plan to onboard tenant #2 as an operational proof (no cross-tenant leaks, no per-tenant env sprawl):
  - `pr-8-tenant-2-onboarding-detailed-plan.md`
- Captured stable inventories for legacy/aux repo surfaces (`api/**`, `server/**`, repo top-level) and clarified the “canonical boundary” stance in the architecture atlas/backlog/risk register:
  - `artifacts/snapshots/repo-top-level.ls.txt`
  - `artifacts/snapshots/api-files.find.txt`
  - `artifacts/snapshots/server-files.find.txt`
  - `architecture-atlas.md`
  - `architecture-backlog.md`
  - `risk-register.md`
- Added a quantified drift signal between `api/**` and `functions/api/**` (and surfaced it in the stop-point dashboard) so boundary consolidation can be executed as an evidence-backed stop point:
  - `artifacts/snapshots/api-vs-functions.summary.txt`
  - `artifacts/snapshots/api-only-endpoints.txt`
  - `artifacts/snapshots/functions-only-endpoints.txt`
  - `stop-point-status-dashboard.md`
- Captured heads of the highest-impact legacy `api/**` endpoint implementations so P0.3 migration work can proceed without guesswork:
  - `artifacts/snapshots/api-newsletter-subscribe.ts.head260.txt`
  - `artifacts/snapshots/api-cloudinary-sign.ts.head260.txt`
  - `artifacts/snapshots/api-admin-media-upsert.ts.head260.txt`
- Filled the rolling plan memory file so “resume the loop” is no longer blocked by placeholders:
  - `context/context.md`
- Added a detailed P0.3 consolidation plan (migration recipes + acceptance checklist):
  - `p0-3-boundary-consolidation-detailed-plan.md`
- Made the gate refresh scripts automatically write timestamped logs into `artifacts/snapshots/` (improves evidence traceability per run):
  - `.blackbox/scripts/refresh-1909-all-gates.sh`
  - `.blackbox/scripts/refresh-1909-contract-evidence.sh`
  - `.blackbox/scripts/refresh-1909-stop-point-dashboard.sh`
- Made the drift dashboard track P0.3 as a first-class stop point (separate from PR 0/1/2/…):
  - `.blackbox/scripts/refresh-1909-stop-point-dashboard.sh`
  - `stop-point-status-dashboard.md`
- Corrected the backend surface drift metric to exclude legacy `api/**` helper modules (so `api_only` reflects real endpoint parity work):
  - `.blackbox/scripts/refresh-1909-all-gates.sh`
  - `artifacts/snapshots/api-only-endpoints.handlers.head80.txt`
- Extended the one-command gate refresh to auto-generate P0.3 triage snapshots (keeps drift list + usage triage in sync):
  - `artifacts/snapshots/api-only-endpoints.exact-usage.latest.txt`
  - `artifacts/snapshots/api-only-endpoints.handlers.head80.txt`
- Expanded external research carry-in to explicitly include the core primitives that shaped this architecture (plugin model, internal API first, key mapping, multitenancy):
  - `external-research-notes.md`
- Resolved the remaining P0.3 “INVESTIGATE” endpoints using repo evidence (Shopify auth callback + register-webhooks script + usage scans), and updated the parity table to explicitly defer them:
  - `p0-3-boundary-consolidation-detailed-plan.md`
  - Evidence snapshots: `artifacts/snapshots/functions-api-shopify-auth-callback.ts.head240.txt`, `artifacts/snapshots/scripts-register-webhooks.mjs.head220.txt`, `artifacts/snapshots/shopify.app.toml.head240.txt`
- Added a one-glance swap matrix so the swappable seams are visible without reading the whole plan:
  - `architecture-component-catalog.md`
- Tightened P0.3 execution readiness by documenting the legacy request/response contracts for the two MIGRATE_NOW endpoints (newsletter + cloudinary), adding a copy/paste execution checklist, and adding expected drift deltas for the first thin-slice milestone:
  - `p0-3-boundary-consolidation-detailed-plan.md`
  - `pr-stop-point-gate-pack.md`
- Added a concrete Supabase SQL migration draft for `public.newsletter_signups` so migrating `/api/newsletter/subscribe` to Cloudflare does not rely on runtime DDL:
  - `p0-3-boundary-consolidation-detailed-plan.md`
- Added Cloudflare-compatible SHA1 signing guidance for `/api/cloudinary/sign` migration (Web Crypto snippet) to remove Node `crypto` as an implementation blocker:
  - `p0-3-boundary-consolidation-detailed-plan.md`
- Made PR 7 (vendor key mapping) more mechanical by snapshotting the exact leak lines and proposing deterministic internal VariantKeys (handle-based) for the two unique leaked variant IDs:
  - `pr-7-vendor-key-mapping-detailed-plan.md`
- Reconciled key mapping docs with current Shopify adapter behavior (reversible base64url encoding of GIDs) and clarified that true provider swaps require stable keys + an adapter-owned mapping registry:
  - `key-mapping-spec-v1.md`
  - `pr-7-vendor-key-mapping-detailed-plan.md`
- Hardened the vendor leak scan so it also flags base64url-encoded Shopify GIDs embedded in `variant.<token>` strings in UI/client/lib (prevents “obfuscated vendor IDs” from bypassing the gate):
  - `.blackbox/scripts/check-vendor-leaks.sh`

## Next actions (1–3)
1) Use the dashboard to pick the next implementation PR (currently recommends boundary consolidation first):
   - `stop-point-status-dashboard.md`
   - `p0-3-boundary-consolidation-detailed-plan.md`
   - `pr-2-auth-guards-detailed-plan.md`
   - `pr-3-tenant-resolution-detailed-plan.md` (next after PR 2)
   - `pr-4-cache-headers-detailed-plan.md` (next after PR 3)
   - `pr-5-tenancy-tables-detailed-plan.md` (next after PR 4)
   - `pr-6-tenant-integration-config-lookup-detailed-plan.md` (next after PR 5)
   - `pr-7-vendor-key-mapping-detailed-plan.md` (next after PR 6)
   - `pr-8-tenant-2-onboarding-detailed-plan.md` (next after PR 7)
2) After each PR, refresh gates and capture evidence under `context/pr-diffs/`:
   - `./.blackbox/scripts/refresh-1909-all-gates.sh`
   - `./.blackbox/scripts/refresh-1909-stop-point-dashboard.sh`
3) Keep docs stable while implementing (avoid adding new “plan files” unless they remove a concrete blocker).

## Pointers
- Plan folder: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop`
- Entry point: `START-HERE.md`
- Canonical map: `CANONICAL.md`
- Artifact map: `artifact-map.md`
- Dashboard: `stop-point-status-dashboard.md`
