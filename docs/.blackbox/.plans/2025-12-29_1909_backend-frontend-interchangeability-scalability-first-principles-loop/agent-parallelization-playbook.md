# Agent Parallelization Playbook (CLI-only, evidence-first)

Goal:
- Make it safe to run multiple long-lived CLI “agents” in parallel without stepping on each other.
- Ensure every agent produces auditable evidence under the 1909 plan folder.

Constraints:
- Docs-first: no `src/` or code changes unless explicitly allowed.
- Evidence-first: every claim must cite a file under `artifacts/snapshots/` or a plan doc path.

Primary evidence refresh command:
- `./.blackbox/scripts/refresh-1909-all-gates.sh`

Evidence snapshot for the command (audit):
- `artifacts/snapshots/docs-blackbox-scripts-refresh-1909-all-gates.sh.head220.txt`

---

## 1) How to split work across 3–4 agents

Assign each agent a “lane” that maps to the plan:

- Agent A — Backend boundary (Functions)
  - Maintains:
    - `backend-boundary-contract-v1.md`
    - `backend-boundary-contract-v1.1-endpoint-table.md`
    - `contract-gaps-report-v1.1.md`
    - `functions-tenant-resolution-spec.md`
    - `functions-auth-guards-spec.md`
    - `functions-cache-policy-spec.md`
  - Runs evidence refresh regularly:
    - `./.blackbox/scripts/refresh-1909-contract-evidence.sh`

- Agent B — Multitenancy (Supabase + config)
  - Maintains:
    - `tenant-data-model-proposal.md`
    - `tenant-integrations-config-spec.md`
    - `supabase-rls-multitenancy-strategy.md`
    - `tenant-2-onboarding-runbook.md`
  - Adds evidence snapshots from existing docs under `02-engineering/**` into `artifacts/snapshots/` as needed.

- Agent C — Swappability enforcement (keys + gates + PR workflow)
  - Maintains:
    - `key-mapping-spec-v1.md`
    - `acceptance-gates-runbook.md`
    - `pr-by-pr-stop-points-plan.md`
    - `pr-stop-point-gate-pack.md`
    - `pr-completion-checklist.md`
    - `pr-evidence-diff-summary-template.md`
  - Owns “make it 1 command” tooling under `docs/.blackbox/scripts/`.

- Agent D — Frontend swap playbook + narrative
  - Maintains:
    - `frontend-swap-playbook.md`
    - `api-endpoints-to-ports-map.md`
    - `architecture-component-catalog.md`
    - `final-report.md`
    - `START-HERE.md`

---

## 2) Evidence rules for parallel agents

- Never cite something you didn’t snapshot.
- If you read a long doc and pull a key claim, add a head snapshot into:
  - `artifacts/snapshots/<source>.headNNN.txt`
- After you modify plan docs, refresh the snapshot index:
  - `ls -la "$PLAN/artifacts/snapshots" > "$PLAN/artifacts/snapshots/_snapshot-index.ls.txt"`

---

## 3) Safe “checkpoint cadence”

At minimum, each agent should:
- Update at least one plan doc per cycle (or explicitly log “no changes”).
- Run at least one evidence refresh command per cycle.
- Write a short checkpoint note into:
  - `context/steps/` (if you’re using `.blackbox/scripts/new-step.sh`)
  - or a dedicated agent log file if not.

---

## 4) Conflict avoidance

- Do not edit the same markdown file from multiple agents at the same time.
- Prefer “append-only” log files if multiple agents need to record output.
- When in doubt, create a new doc and link it from `START-HERE.md` rather than editing a shared doc.

