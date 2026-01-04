# Plan: backend↔frontend interchangeability + scalability (first principles loop)

Start here:
- `START-HERE.md`
- `CANONICAL.md` (what’s authoritative vs supporting)

## Goal
Run a long “first-principles” architecture loop that produces:
1) A backend boundary design that keeps the frontend interchangeable.
2) A scaling plan for both frontend (edge/UI) and backend (BFF + data layer).
3) A phased migration plan you can execute incrementally.

No app code changes in this run (docs-only outputs).

## Created
2025-12-29 19:09

## Target (optional)
10 hours / ~50 prompts (interactive CLI session).

## Context
- Current providers: Shopify (commerce), Cloudflare (hosting/edge), Supabase (database), Clerk (identity).
- Upcoming needs: multitenancy (one Supabase project for multiple clients/tenants), frontend swap-ability.
- Constraint: do not change `src/` yet; only produce plans and docs.
- “Done”:
  - Clear contract boundary (what frontends call; what backend guarantees)
  - Clear tenancy model (even if implemented later)
  - Clear scaling model (caching, data access patterns, observability)
  - Clear phased migration with acceptance checks

## Docs To Read (and why)
- [ ] `START-HERE.md` — reading order for this plan (single pane of glass).
- [ ] `final-report.md` — narrative (current state → decisions → next actions).
- [ ] `backend-boundary-contract-v1.md` — `/api/*` contract (frontend boundary).
- [ ] `tenancy-context-rules.md` — tenant resolution + cache safety rules.
- [ ] `pr-by-pr-stop-points-plan.md` — implementation sequencing (when code changes are allowed).

## Plan Steps
- [ ] Step 1: Gather evidence from `src/` (paths + summaries) and record under `artifacts/`.
- [ ] Step 2: Draft the boundary contract (ports → `/api/*`) and tenancy model.
- [ ] Step 3: Draft the scaling plan (edge caching, backend caching, DB/RLS strategy).
- [ ] Step 4: Draft the phased migration plan with acceptance checks.
- [ ] Step 5: Publish/promote the best docs (optional) and log in the ledger.

## Artifacts (created/updated)
- `agent-cycle.md` — the 50 prompt slots for the loop.
- `final-report.md` — executive summary + decisions + links.
- `artifacts/summary.md` — 1-page skim + next actions.
- `START-HERE.md` — reading order + “single pane of glass” index for this plan.
- `stop-point-status-dashboard.md` — current risks + recommended next PR
- `artifact-map.md` — where everything lives
- `artifacts/snapshots/` — evidence outputs (source of truth for “current state” claims)

## Information Routing (where outputs should live)
- Run artifacts (raw/sources/extractions): keep inside this plan folder under `artifacts/`
- Reusable knowledge: promote into `docs/.blackbox/deepresearch/`
- Docs-wide deliverables: place under the correct `docs/0X-*/` category and add a link in the nearest folder `README.md` or `INDEX.md`

## Open Questions / Risks
- What is the canonical “tenant”: brand/client/org vs store/domain?
- Do we expect to swap identity provider (Clerk) or only commerce/payments/content?
- Which flows must remain server-side for security (e.g. payments, tenant config, admin tools)?

## Notes / Revisions
- 2025-12-29: Generated a 10h/50 prompt loop scaffold and prompt pack.
