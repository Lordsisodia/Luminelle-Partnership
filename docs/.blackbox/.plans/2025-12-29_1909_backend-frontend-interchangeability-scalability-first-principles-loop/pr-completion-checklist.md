# PR Completion Checklist (for architecture stop points)

Goal:
- Make each PR stoppable, reviewable, and handoff-friendly.
- Keep the architecture plan evidence-first and continuously up to date.

This checklist assumes you are implementing the stop points described in:
- `pr-by-pr-stop-points-plan.md`
- `pr-stop-point-gate-pack.md`

---

## Required actions (every PR)

- [ ] Run the full swappability gate refresh from `docs/`:
  - `./.blackbox/scripts/refresh-1909-all-gates.sh`
  - Evidence script snapshot exists (audit):  
    `artifacts/snapshots/docs-blackbox-scripts-refresh-1909-all-gates.sh.head220.txt`

- [ ] Confirm the contract artifacts are regenerated (these should be current after the script):
  - `backend-boundary-contract-v1.1-endpoint-table.md`
  - `contract-gaps-report-v1.1.md`

- [ ] Create a short diff summary (human-readable) for what changed in evidence snapshots:
  - Use: `pr-evidence-diff-summary-template.md`
  - Store it under: `context/pr-diffs/` (one file per PR)
  - Example filled summary: `context/pr-diffs/2025-12-30_pr-000_example_refresh-gates-docs-only.md`

- [ ] Update the PR stop-point documentation:
  - Add a 1–3 bullet “what changed” note under the relevant PR section in:
    - `pr-by-pr-stop-points-plan.md`

---

## Optional but recommended (when the PR touches these areas)

- If the PR changes `/functions/api/**`:
  - [ ] Ensure `functions-api-files.clean.find.txt` changes are expected and explained.

- If the PR changes auth/tenancy/caching behavior:
  - [ ] Confirm that the cue scans now show signals in the right endpoint families:
    - `artifacts/snapshots/functions-api-auth-tenant-cues.rg.txt`
    - `artifacts/snapshots/functions-api-cache-cues.rg.txt`

- If the PR touches vendor coupling:
  - [ ] Confirm `check-vendor-leaks.txt` moved in the right direction (toward 0).

---

## Stop condition (what “done” means for a PR)

- Gates run successfully.
- Evidence snapshots updated.
- A diff summary exists.
- Next engineer/agent can pick up without re-discovering context.
