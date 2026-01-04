# Blackbox Hygiene Audit (docs-only)

Goal:
- Keep `docs/.blackbox/` simple, predictable, and safe to run for 6–10h loops.
- Prefer “make it harder to regress” over “move files around for aesthetics”.

Evidence rule:
- Any “current state” claim cites a file under:
  - `artifacts/snapshots/`

---

## Current state (what’s true right now)

- Structural validation passes (roots count, pointer docs, template parity, script perms):
  - `artifacts/snapshots/check-blackbox.latest.txt`
  - Directory listing evidence:
    - `artifacts/snapshots/docs-blackbox-root.ls.latest.txt`
    - `artifacts/snapshots/docs-blackbox-plans.ls.latest.txt`

- The 1909 gate suite now refreshes **plan doc head snapshots** on every run (so evidence anchors can’t silently go stale):
  - Gate log showing the new stage: `artifacts/snapshots/refresh-1909-all-gates.2025-12-31_121847.log.txt`
  - Example “freshness” proof (updated reference is reflected in the snapshot file):
    - `artifacts/snapshots/plan-migration-stages.md.head120.txt`

---

## What to clean up (highest leverage, lowest risk)

- Prefer adding **operator-grade indices** over moving files:
  - “Where do I start?” stays `docs/.blackbox/README.md` and `docs/.blackbox/RUN-NOW.md` (already strong).
  - “How do I keep it clean?” stays `docs/.blackbox/MAINTENANCE.md` (already explicit).
  - Biggest remaining “noise vector” is the long tail of plan folders under `.blackbox/.plans/` (mitigate via:
    - archiving scripts, already present and documented
    - a short pinned-plan list / index so humans don’t browse directory listings)

---

## What I changed (this cycle)

- Made plan evidence anchors self-refreshing:
  - Updated script: `docs/.blackbox/scripts/refresh-1909-all-gates.sh`
  - Template mirror: `docs/.blackbox/_template/scripts/refresh-1909-all-gates.sh`
  - Evidence: `artifacts/snapshots/refresh-1909-all-gates.2025-12-31_121847.log.txt`

---

## Decision: continue?

- Yes.
- Next hygiene step (docs-only): add a short “pinned plans / important runs” section to `docs/.blackbox/.plans/README.md`, then re-run `check-blackbox` and `run-1909-loop` to keep evidence fresh.
