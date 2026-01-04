# Cleanup Actions (proposed + safe order)

Evidence anchors (this run):
- Root listing: `artifacts/snapshots/docs-blackbox-root.ls.txt`
- Blackbox validation: `artifacts/snapshots/check-blackbox.output.txt`

---

## 0) Guiding rules (non-negotiable)

- Do not break existing scripts/links:
  - Prefer leaving a compatibility pointer file over hard moves.
- Verify after every batch:
  - `./.blackbox/scripts/check-blackbox.sh`
- Treat `.blackbox/.local/` as disposable by default (gitignored), but never delete without first promoting anything that’s valuable.

---

## 1) Actions we should take now (low risk)

- A1) Document “current state is already valid”
  - Rationale: establishes baseline before touching anything.
  - Evidence: `artifacts/snapshots/check-blackbox.output.txt`

- A2) Add/maintain compatibility pointer posture (no new moves)
  - Current state already includes pointers for ledger + routing rules.
  - Evidence: `artifacts/snapshots/docs-blackbox-root.ls.txt`

## 1b) Actions completed in this run (executed)

- X1) Promoted GitHub search query-bank markdowns out of `.blackbox/.local/` (gitignored) into a committed, organized location:
  - Created: `docs/.blackbox/snippets/research/query-banks/README.md`
  - Moved: `.blackbox/.local/github-search-queries.*.md` → `.blackbox/snippets/research/query-banks/github-search-queries-*.md`
  - Rationale: these are reusable prompts; keeping them in `.local` risks losing them.
  - Post-check: `./.blackbox/scripts/check-blackbox.sh` still passes.

- X2) Promoted “feature map” derived-query seed docs out of `.blackbox/.local/` into a committed, organized location:
  - Created: `docs/.blackbox/snippets/research/feature-maps/README.md`
  - Moved/renamed:
    - `.blackbox/.local/feature-map-admin-bulk-edit.md` → `.blackbox/snippets/research/feature-maps/admin-bulk-edit.md`
    - `.blackbox/.local/feature-map-clipboard-import.md` → `.blackbox/snippets/research/feature-maps/clipboard-import.md`
    - `.blackbox/.local/feature-map-inventory-sync.md` → `.blackbox/snippets/research/feature-maps/inventory-sync.md`
    - `.blackbox/.local/feature-map-returns.md` → `.blackbox/snippets/research/feature-maps/returns-exchanges.md`
    - `.blackbox/.local/feature-map-webhooks-idempotency.md` → `.blackbox/snippets/research/feature-maps/webhooks-idempotency.md`
  - Rationale: these are reusable research inputs for derived query bank generation (`generate_oss_query_bank.py`); keeping them in `.local` risks losing them.

- X3) Archived high-frequency OSS discovery plan folders by count (kept newest 12; moved older unreferenced runs into `.blackbox/.plans/_archive/`):
  - Command: `python3 ./.blackbox/scripts/archive-oss-plans.py --keep-latest 12`
  - Evidence: `artifacts/snapshots/archive-oss-plans.keep-latest-12.run.txt`
  - Post-check: `artifacts/snapshots/check-blackbox.output.after-oss-archive.txt`

---

## 2) Actions we can take next (medium risk, but valuable)

- B1) Promote evergreen content out of `.blackbox/.local/` (selectively)
  - Target destinations:
    - reusable query banks → `docs/.blackbox/snippets/research/`
    - durable research writeups → `docs/.blackbox/deepresearch/`
  - Safety: copy-promote first, then optionally delete local copies.

- B2) Reduce `.blackbox/.plans/` sprawl (archive by policy)
  - Use existing scripts from `docs/.blackbox/MAINTENANCE.md`:
    - `python3 ./.blackbox/scripts/archive-plans.py --older-than-days 14 --dry-run`
    - `python3 ./.blackbox/scripts/archive-oss-plans.py --keep-latest 12 --dry-run`
  - Safety: always start with `--dry-run`; pin plans with `.keep`.
  - Dry-run evidence (current repo state):
    - Age-based archive (14d) has nothing eligible: `artifacts/snapshots/archive-plans.older-than-14d.dry-run.txt`
    - OSS archive-by-count would move 11 old `oss-` plans: `artifacts/snapshots/archive-oss-plans.keep-latest-12.dry-run.txt`

---

## 3) Actions we should avoid (high risk / low reward)

- Renaming protocol-level files (`protocol.md`, `context.md`, `tasks.md`, `journal.md`) just for aesthetics.
  - These are linked in multiple places and are part of the “read-first” flow.
  - If renaming is ever required, we should do:
    - rename + compat pointer + `check-blackbox.sh` + search for references.
