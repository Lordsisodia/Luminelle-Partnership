# Agent Cycle Prompts (50 prompts / ~6–10 hours, CLI-only)

Purpose:
- Run a long “first principles” loop without getting lost.
- Keep work docs-only and evidence-first until we explicitly switch to implementation.

Non‑negotiables:
- No `src/**` code changes in this cycle.
- Every “current state” claim must cite a snapshot in `artifacts/snapshots/`.
- Start each prompt by refreshing evidence: `./.blackbox/scripts/run-1909-loop.sh`
- End each prompt by writing a checkpoint step file:
  - `./.blackbox/scripts/new-step.sh --plan .blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop "Checkpoint: <what changed>"`

Default “decision rule” (keeps the loop honest):
- If the stop-point dashboard still recommends **P0.3**, keep the cycle focused on making P0.3 implementation‑ready (docs, gates, runbooks, risk mitigations).
- Only switch to other PRs when P0.3 is fully specified and “no open questions remain”.

Evidence anchors to use repeatedly:
- Loop run output: `artifacts/snapshots/run-1909-loop.latest.txt`
- Dashboard: `stop-point-status-dashboard.md`
- Canonical map: `CANONICAL.md`
- Contract: `backend-boundary-contract-v1.md` + `backend-boundary-contract-v1.1-endpoint-table.md`
- Drift: `artifacts/snapshots/api-vs-functions.summary.txt` + `artifacts/snapshots/api-only-endpoints.exact-usage.latest.txt`
- Vendor leaks: `artifacts/snapshots/check-vendor-leaks.txt`

---

## Phase A — Baseline + tighten “single source of truth” (Prompts 1–8)

1) Refresh gates + record baseline metrics delta (if any); ensure snapshot index updated.
2) Read `stop-point-status-dashboard.md` and confirm the recommended next PR is still P0.3; if not, document why.
3) Reconcile `CANONICAL.md` with any drift (add/remove docs from canonical set if needed).
4) Re-skim `final-report.md` and ensure “what’s next” matches the dashboard recommendation.
5) Verify `backend-boundary-contract-v1.1-endpoint-table.md` aligns with `backend-boundary-contract-v1.md`; add a short note if any tiers/caching expectations are inconsistent.
6) Confirm the drift signal is meaningful (validate `api_only` count and list); add a note to `p0-3-boundary-consolidation-detailed-plan.md` if the drift scan is catching noise.
7) Confirm the vendor leak baseline count (disallowed lines) is stable; add “top 5 leak locations” note to `key-mapping-spec-v1.md` if missing.
8) Run `.blackbox/scripts/check-blackbox.sh` and record a checkpoint if any structural issues appear.

## Phase B — P0.3 deepening: migrate `api/**` → `functions/api/**` (Prompts 9–20)

9) Re-read `p0-3-boundary-consolidation-detailed-plan.md`; turn any “Suggested” language into concrete checklists (still docs-only).
10) Produce a P0.3 “PR evidence diff skeleton” file under `context/pr-diffs/` (empty template ready for future implementation).
11) Tighten the “must migrate first” list using `api-only-endpoints.exact-usage.latest.txt`; ensure it’s referenced in P0.3 doc.
12) Add a short “security posture note” to P0.3: what will be intentionally insecure until PR2, and why (avoid accidental production hardening regressions).
13) Add a short “migration risks + mitigations” subsection to P0.3 (timeouts, env var differences, DB access from edge).
14) Validate the Cloudflare Pages Functions handler pattern (`export const onRequest`) is correctly described in `backend-boundary-conventions.md`.
15) Ensure `contract-gaps-report-v1.1.md` references P0.3 as a prerequisite when gaps are caused by drift/duplication.
16) Add a “post‑P0.3 smoke checklist” to `acceptance-gates-runbook.md` (how to confirm Cloudflare boundary is canonical).
17) Add a “P0.3 stop condition” checklist (when to pause, what evidence to capture) to `pr-stop-point-gate-pack.md`.
18) Re-run gates and confirm metrics are unchanged (docs-only); record checkpoint and note any unexpected changes.
19) Review `inspect-first-backend.md` for missing “drift hotspots” and add if needed (docs-only).
20) Review `.env.example` snapshot references for P0.3 endpoints (newsletter + cloudinary); ensure evidence anchors are present.

## Phase C — Tenancy readiness (Prompts 21–30)

21) Re-read `tenancy-context-rules.md` and ensure it is referenced by the backend contract (v1) in the right places.
22) Add a “tenant resolution acceptance gate” stub (docs-only) to `acceptance-gates.md` if any tenant gating is missing.
23) Expand `tenant-secrets-and-public-config-spec-v0.1.md` with explicit “what is safe to expose to browser” rules (docs-only).
24) Ensure `tenant-data-model-proposal.md` matches the “one Supabase project many clients” direction; add a brief “migration note” if ambiguous.
25) Tighten `multitenant-deployment-topologies.md` with a quick decision matrix (shared UI vs per‑client UI) and evidence anchors.
26) Ensure `tenant-2-onboarding-runbook.md` is consistent with the newest contract/gates (no contradictions).
27) Re-run gates and record checkpoint (expected no metric changes in docs-only mode).
28) Add a “tenant #2 rehearsal checklist” (docs-only) to reduce ambiguity when you eventually run it.
29) Ensure `data-layer-conventions.md` reflects backend-first Supabase access posture (and cites the existing snapshot(s)).
30) Re-run `.blackbox/scripts/check-blackbox.sh` and record a checkpoint.

## Phase D — Provider-neutrality hardening (Prompts 31–40)

31) Re-read `key-mapping-spec-v1.md` and ensure the “no vendor IDs above adapters” rule is written as an enforceable gate.
32) Reconcile PR7/PR10: ensure `storefront-contract-dto-mapping-v0.1.md` and `pr-10-storefront-dto-normalization-detailed-plan.md` agree on DTO names and neutrality rules.
33) Update `dto-and-capabilities-spec-v0.1.md` if storefront DTO envelopes need stronger conventions (docs-only).
34) Ensure `acceptance-gates.md` contains a future gate for storefront DTO neutrality (already: G7); verify runbook exists (Gate F).
35) Add a short “provider swap boundary” checklist to `provider-swap-playbook.md` (explicit “UI must not change” criteria).
36) Re-run gates and record checkpoint; ensure no drift was introduced by docs edits.
37) Tighten `architecture-component-catalog.md` swap matrix if any seam is missing (identity/data/content).
38) Add a one‑page “frontends we can swap to” list (SSR, mobile, admin-only) to `frontend-swap-playbook.md` to make the goal tangible.
39) Ensure `frontend-contract-test-kit.md` covers the contract families implicated by P0.3 and PR10 (docs-only).
40) Re-run `run-1909-loop.sh` and record checkpoint.

## Phase E — UI kits as swappable units (Prompts 41–47)

41) Confirm storefront kit research is ingested in 1909 (`research-index.md` section 1.8); if not, add missing excerpt snapshots.
42) Confirm blog kit research is ingested in 1909 (`research-index.md` section 1.9) and referenced in `architecture-expansion-from-research.md`.
43) Tighten `client-project-modularity-blueprint.md` so it explicitly lists “Storefront Kit + Blog Kit” as reusable UI modules.
44) Add a short “kit acceptance gates” stub: what evidence a kit needs before being used across clients (docs-only).
45) Re-run gates and record checkpoint.
46) Fill any remaining template placeholders in upstream kit plans (0551/0647) so they can be read standalone.
47) Record a checkpoint summarizing “what kits exist” and “what is missing to productionize them”.

## Phase F — Wrap + readiness (Prompts 48–50)

48) Run a final `run-1909-loop.sh` and ensure the dashboard still points to P0.3; record final metrics snapshot.
49) Update `final-report.md` “What’s next” section if the recommended PR changed during the cycle.
50) Write a “handoff summary” step: current baseline metrics, recommended next PR, and the exact commands to start implementation safely.

