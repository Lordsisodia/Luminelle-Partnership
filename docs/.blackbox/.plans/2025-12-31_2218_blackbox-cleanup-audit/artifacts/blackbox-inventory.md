# Inventory: `docs/.blackbox/` (what exists + where it belongs)

Evidence anchors (this run):
- `.blackbox` root listing: `artifacts/snapshots/docs-blackbox-root.ls.txt`
- Structure validation output (after promotions): `artifacts/snapshots/check-blackbox.output.after-promotions.txt`

---

## 1) Root directories (expected + correct)

From `artifacts/snapshots/docs-blackbox-root.ls.txt`:

- `_template/`
  - Role: copy-ready “create a `.blackbox` elsewhere” template.
  - Status: correct location (protocol + maintenance reference it).
- `.local/`
  - Role: local-only scratch outputs; intentionally gitignored.
  - Status: correct location (explicitly ignored in `.blackbox/.gitignore`).
- `.plans/`
  - Role: timestamped execution runs (audit trail + artifacts).
  - Status: correct location.
- `.prompts/`
  - Role: reusable prompt packs.
  - Status: correct location.
- `.skills/`
  - Role: reusable playbooks/frameworks.
  - Status: correct location (and enforced by `check-blackbox.sh` as “flat”).
- `agents/`
  - Role: packaged agent definitions (prompt/config/runbook).
  - Status: correct location.
- `deepresearch/`
  - Role: evergreen research outputs promoted out of plan folders.
  - Status: correct location.
- `experiments/`
  - Role: drafts/dead-ends; low-risk holding area.
  - Status: correct location.
- `oss-catalog/`
  - Role: OSS discovery + curation + mining pointers.
  - Status: correct location.
- `schemas/`
  - Role: data/prompt schemas.
  - Status: correct location.
- `scripts/`
  - Role: operator scripts (new plan/run/agent, gate refresh, validations).
  - Status: correct location.
- `snippets/`
  - Role: known-good copy/paste snippets (often promoted from `.local` or plan artifacts).
  - Status: correct location.

---

## 2) Root files (expected + correct)

From `artifacts/snapshots/docs-blackbox-root.ls.txt`:

- `README.md`
  - Role: human entrypoint + “what to read first”.
  - Status: correct.
- `protocol.md`
  - Role: canonical Black Box Protocol (structure + execution loop).
  - Status: correct.
- `context.md`
  - Role: read-first operational context for agents working in `docs/`.
  - Status: correct.
- `tasks.md`
  - Role: backlog + active checklist for the `.blackbox` system.
  - Status: correct.
- `journal.md`
  - Role: append-only decision log.
  - Status: correct.
- `scratchpad.md`
  - Role: volatile working notes.
  - Status: correct.
- `manifest.yaml`
  - Role: machine-readable `.blackbox` index.
  - Status: correct.
- `RUN-NOW.md`
  - Role: quick operator entrypoint.
  - Status: correct.
- `MAINTENANCE.md`
  - Role: “how to keep `.blackbox` clean” loop + canonical vs pointer rules.
  - Status: correct.
- `.gitignore`
  - Role: ensures `.local` and other transient artifacts don’t pollute git.
  - Status: correct.

---

## 3) Compatibility pointer files (expected + correct)

These are intentionally *not* canonical content; they exist to avoid breaking old links:
- `docs-ledger.md` → canonical is `docs/08-meta/repo/docs-ledger.md`
- `information-routing.md` → canonical is `docs/08-meta/repo/information-routing.md`

Evidence:
- `artifacts/snapshots/check-blackbox.output.txt` includes “Pointer files reference canonical docs”.

---

## 4) Findings (what is “wrong” right now?)

Result:
- No obvious misplacements in the committed `.blackbox` root: the structure matches the protocol and passes validation.
  - Evidence: `artifacts/snapshots/check-blackbox.output.after-promotions.txt`

---

## 5) Cleanup candidates (optional, higher effort)

These are not “wrong”, but they are the most likely sources of future confusion:

- `.blackbox/.local/*`
  - Risk: evergreen content can get stranded in gitignored space.
  - Remedy pattern: promote any keeper docs into `docs/.blackbox/snippets/` or `docs/.blackbox/deepresearch/`, then safely delete local copies.
  - This run: promoted GitHub query-bank docs into `docs/.blackbox/snippets/research/query-banks/` (so they’re now committed and organized).
  - This run: promoted derived-query feature maps into `docs/.blackbox/snippets/research/feature-maps/` (so they’re now committed and organized).

- `.blackbox/.plans/*`
  - Risk: plan sprawl makes it hard to find important runs.
  - Remedy pattern: archive older plans into `.blackbox/.plans/_archive/` using the existing scripts and pin important runs via `.keep`.
  - This run: archived older unreferenced OSS discovery runs by count to keep `.plans/` readable.  
    Evidence: `artifacts/snapshots/archive-oss-plans.keep-latest-12.run.txt`
