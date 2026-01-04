# Plan: blackbox cleanup audit

## Goal
- Verify every committed file under `docs/.blackbox/` is in the right location (or is an intentional compatibility pointer).
- Reduce drift + confusion by:
  - moving/renaming any misfiled docs into the correct canonical location,
  - leaving compatibility pointers when old links/scripts would break,
  - deleting (or archiving) genuinely unused items.

## Created
2025-12-31 22:18

## Target (optional)
- Target: 1–2 focused passes (inventory → low-risk fixes → verification).

## Context
- Prompted by: the visible `docs/` architecture is clean, but `.blackbox/` is a high-churn “agent runtime” and needs periodic consolidation to stay usable.
- Constraints:
  - Docs-only changes (no `src/**` app refactors as part of this cleanup).
  - Do not break existing plan links or helper scripts; prefer compat pointers over hard moves.
  - Verify after each batch using `./.blackbox/scripts/check-blackbox.sh`.
- “Done” definition:
  - We have an evidence-backed inventory of what’s in `docs/.blackbox/` and why.
  - Any misplacements are either fixed (move/rename) or explicitly justified.
  - `check-blackbox.sh` passes and the 1909 loop still runs.

## Docs To Read (and why)
- [ ] `docs/.blackbox/protocol.md` — defines the intended `.blackbox` structure and what “belongs” here.
- [ ] `docs/.blackbox/MAINTENANCE.md` — current canonical vs pointer rules + cleanup loop.
- [ ] `docs/.blackbox/scripts/check-blackbox.sh` — what structure is enforced today.

## Plan Steps
- [x] Step 1: Snapshot + inventory the current `.blackbox/` structure (root + key subdirs).  
      Evidence: `artifacts/snapshots/docs-blackbox-root.ls.txt`
- [x] Step 2: Classify key items + identify safe promotions from `.blackbox/.local/`.  
      Evidence: `artifacts/blackbox-inventory.md`, `artifacts/local-promotion-candidates.md`
- [x] Step 3: Apply low-risk fixes first (promote reusable docs out of `.local`), then verify with `check-blackbox.sh`.  
      Evidence: `artifacts/snapshots/check-blackbox.output.after-promotions.txt`
- [x] Step 4 (optional): Check archiving policy impact via dry-run (no side effects).  
      Evidence: `artifacts/snapshots/archive-plans.older-than-14d.dry-run.txt`, `artifacts/snapshots/archive-oss-plans.keep-latest-12.dry-run.txt`
- [x] Step 5 (optional): Execute safe OSS archive-by-count to reduce `.plans/` noise (moves only unreferenced OSS runs).  
      Evidence: `artifacts/snapshots/archive-oss-plans.keep-latest-12.run.txt`, `artifacts/snapshots/check-blackbox.output.after-oss-archive.txt`

## Artifacts (created/updated)
- `artifacts/blackbox-inventory.md` — categorized inventory + “correct location” rationale.
- `artifacts/blackbox-cleanup-actions.md` — proposed move/rename/delete list + safety notes.
- `artifacts/local-promotion-candidates.md` — what remains in `.blackbox/.local/` that might need promotion.
- `artifacts/snapshots/*` — command outputs used as evidence for the audit.

## Information Routing (where outputs should live)
- Run artifacts (raw/sources/extractions): keep inside this plan folder under `artifacts/`
- Reusable knowledge: promote into `docs/.blackbox/deepresearch/`
- Docs-wide deliverables: place under the correct `docs/0X-*/` category and add a link in the nearest folder `README.md` or `INDEX.md`

## Open Questions / Risks
- Risk: moving files that scripts depend on can silently break automation; mitigate via compat pointers + `check-blackbox.sh`.
- Risk: deleting old plan folders can break historical citations; mitigate by only archiving (move into `_archive/`) and preserving pinned runs (`.keep`).

## Notes / Revisions
- 2025-12-31: plan created.
- 2025-12-31: promoted query banks + feature maps out of `.blackbox/.local/`, validated structure, and recorded archive dry-runs.  
  Evidence: `artifacts/blackbox-cleanup-actions.md`, `artifacts/snapshots/check-blackbox.output.after-promotions.txt`
