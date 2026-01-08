# 🤖 Agent Guide (Codex / CLI)

This repo already includes a “docs black box” system under `docs/.blackbox/` (plans, prompts, artifacts, and task tracking).

Use this file as the **fast, repo-root entrypoint** to:
- get instant status
- understand what “black box” means here
- find tasks / progress without guessing

---

## ⚡ Instant Status (copy/paste)

Run this from **repo root**:

```bash
# 1) What's going on currently (local state)
git status -sb
git diff --stat
git log -10 --oneline --decorate

# 2) Previous / planned work (docs black box tasks + recent runs)
sed -n '1,160p' docs/.blackbox/tasks.md
ls -1dt docs/.blackbox/.plans/* 2>/dev/null | head -n 12

# 3) Other relevant status updates (UI issue tracker + repo health)
node scripts/blackbox-status.mjs

# Same checks CI runs (high-signal). If any fail, that *is* the status update.
npm run validate:tokens
npm run lint:tokens
npm run lint
npm run typecheck
npm run build
```

If you’re working inside `docs/`, these equivalents also work:

```bash
# Validate docs structure rules + `.blackbox` hygiene (run from `docs/`)
python3 .blackbox/scripts/validate-docs.py
```

---

## 🧭 Always recommend next steps (agent behavior)

After every prompt, use this loop (keep it brief, but not generic):

- 🔎 **Reality check**: run `./scripts/status.sh` (or at least `git status -sb`) before making claims about “what’s going on”.
- 📌 **Current state**: 2–4 bullets (branch, uncommitted changes, any failing checks you know about, active tracker hotspots).
- 📈 **Progress**: 1–3 bullets of what’s been completed or learned.
- ➡️ **Next steps (ranked)**: 2–4 bullets, ordered by:
  - 🧱 unblocks other work
  - 🧪 reduces risk (lint/tests/blackbox)
  - 🚀 highest leverage
  - 🧹 refactor last unless necessary
- ✅ **Recommendation**: pick 1 “best next step” and say why.

## 🕳️ “Black box” in *this* repo (brief)

There are **two related meanings** used in this codebase:

- 📚 **Docs Black Box** = `docs/.blackbox/`
  - 🧠 A structured “agent runtime” for repeatable research/work cycles.
  - 🗂️ Stores plans + artifacts under `docs/.blackbox/.plans/<run>/`.
  - ✅ Canonical backlog for docs-runs lives at `docs/.blackbox/tasks.md`.

- ✅ **UI Issue Tracker “black-box” loop**
  - 🧾 Tracker file: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`
  - 🧰 Quick status command: `node scripts/blackbox-status.mjs`
  - 📌 Worklogs live in:
    - `docs/06-quality/feedback/ui-issue-tracker/ui-issues/` (active)
    - `docs/06-quality/feedback/ui-issue-tracker/done-issues/` (done)

If you need the full playbook (but keep it out of your head), read:
- `docs/.blackbox/README.md` (what to do first)
- `docs/.blackbox/RUN-NOW.md` (copy/paste “do it right now” commands)
- `docs/README.md` (docs structure + `.blackbox` placement rules)

---

## 🧭 How to answer “what’s done / what’s next” (without guessing)

When you need a fast, accurate update:

- ✅ **Current work**: `git status -sb` + `git log -10 --oneline --decorate`
- 📋 **Docs/research backlog**: `docs/.blackbox/tasks.md`
- 📈 **Recent docs runs**: `docs/.blackbox/.plans/` (sort by newest)
- 🧪 **UI execution tracker**: `node scripts/blackbox-status.mjs`
- 🏗️ **Health checks** (CI-aligned): `npm run validate:tokens && npm run lint && npm run typecheck && npm run build`

---

## 🧷 Small rules that prevent chaos

- 🧱 Don’t create nested `.blackbox/` folders inside visible docs categories; the only docs black box lives at `docs/.blackbox/`.
- 🧩 Prefer updating the trackers (`docs/.blackbox/tasks.md`, UI issue tracker) as part of the work so “what changed?” is always derivable.
