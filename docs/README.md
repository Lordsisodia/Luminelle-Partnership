# 📚 Docs Index

This folder is intentionally organized into **8 top-level categories** (so the top level stays readable).

## 🚀 Start here (10 minutes)

- 🗺️ Quick map: `docs/INDEX.md`
- 🧠 Plans + future work: `docs/05-planning/`
- ✅ Latest reviews + feedback loops: `docs/06-quality/`
- 🧱 Architecture + setup: `docs/02-engineering/`

## 📏 Folder Count Rules (Keep It Tidy)

- 🧭 `docs/` should have **6–10 visible root folders** (excluding hidden folders like `.blackbox/`).
- 🗂️ Inside each root category folder (e.g. `01-product/`), keep **6–10 direct child folders** (i.e. avoid 20+ siblings).
  - ✅ If you need more, add another layer (e.g. `content/`, `playbooks/`, `assets/`) instead of adding more siblings.
  - 🧩 Prefer extending existing sections over creating new root-level buckets.
- 🧱 Same rule applies inside subfolders: if any folder starts to exceed ~10 immediate child folders, add a grouping level.

## 🧠 Why these 8 categories?

These are the “best 8” for this repo because they match how we actually work:
- 🧑‍💼 Product → what we’re building + UX decisions
- 🧱 Engineering → how it works + how to run it
- 🤖 AI → playbooks + experiments + snapshots
- 📈 Growth → content + SEO + acquisition
- 🧠 Planning → research + strategy + roadmap
- ✅ Quality → feedback loops + reviews + incidents
- 🧩 Templates → reusable assets the team/agents copy-paste
- 🧷 Meta → rules that keep docs healthy over time

If something doesn’t fit, prefer adding a **subfolder** inside an existing category before inventing a 9th root bucket.

## 🗂️ Categories

- 🧑‍💼 [01-product](./01-product/README.md) — Product + UX docs (admin, design, gamification, domains)
- 🧱 [02-engineering](./02-engineering/README.md) — Architecture, setup, integrations, hosting, tooling
- 🤖 [03-ai](./03-ai/README.md) — AI playbooks + snapshots
- 📈 [04-growth](./04-growth/README.md) — SEO, marketing, social, content
- 🧠 [05-planning](./05-planning/README.md) — Plans, research, future features, strategy
- ✅ [06-quality](./06-quality/README.md) — Feedback, reviews, incidents, UI archive
- 🧩 [07-templates](./07-templates/README.md) — Reusable doc templates / reference material
- 🧷 [08-meta](./08-meta/README.md) — Repo/meta notes and internal documentation hygiene

## 🧭 How to add docs (practical workflow)

### ✅ Where should a new doc go?

- 🧑‍💼 Product surface area (admin UX, flows, copy) → `01-product/…`
- 🧱 Technical guides, setup, integration notes → `02-engineering/…`
- 🤖 AI testing snapshots + playbooks → `03-ai/…`
- 📈 SEO, marketing, social, blog drafts → `04-growth/…`
- 🧠 Research / plans / future features → `05-planning/…`
- ✅ Feedback, reviews, incidents, black-box process → `06-quality/…`
- 🧩 Reusable templates → `07-templates/…`
- 🧷 Repo hygiene / internal notes → `08-meta/…`

## 🔎 Find things fast (search cheat sheet)

From repo root:

```bash
# Find any doc by keyword
rg "refund workflow|subscription|returns" docs

# Find where a feature is mentioned
rg "feature flags" docs/01-product docs/02-engineering docs/05-planning

# Find reusable templates quickly
rg "Template:" docs/07-templates
```

### 🧠 Decisions + ✅ Runbooks (high leverage)

- 🧠 **Decisions** (mini ADRs): put “why we chose X” in `docs/02-engineering/decisions/`
- ✅ **Runbooks** (checklists): put “how to do X” in:
  - `docs/02-engineering/runbooks/`
  - `docs/06-quality/runbooks/`

### 📝 Create a small “hub” README when a folder starts to grow

If you add more than a couple docs in a folder, create (or update) a `README.md` that:

- 📌 explains what the folder is for
- 🔗 links to the most important docs
- 🧩 points to the next-level subfolders

### 🔗 Linking conventions

- ✅ Prefer **relative links** inside docs so they keep working after repo moves.
- ✅ If you reference docs paths in code or scripts, use repo-root style paths like `docs/05-planning/...`.
- 🧼 If you move a folder, run a quick search+replace for old paths before committing.

### 🧾 Tracking (so we can always find things)

- 🧭 If you create, move, or promote something meaningful, append an entry to:
  - `docs/08-meta/repo/docs-ledger.md`
- 🗃️ If the work is agent-driven, keep raw artifacts in:
  - `docs/.blackbox/.plans/<run>/artifacts/`
- ✅ Promote reusable summaries into:
  - `docs/.blackbox/deepresearch/`

### 🟢🟡🔴 Status metadata (recommended)

For docs that drive work, add YAML frontmatter at the top:

```md
---
status: active|draft|archived
last_reviewed: YYYY-MM-DD
owner: team-or-person
---
```

Templates live in `docs/07-templates/library/templates/`.

## 🧾 Naming conventions (simple + consistent)

- 📅 Use dates for time-based docs: `YYYY-MM-DD-topic.md` or `topic-YYYY-MM-DD.md`
- 🧱 Use `kebab-case.md` for most docs (avoid spaces for new files/folders)
- 🧩 Keep folders “shallow”: if a folder would exceed ~10 children, introduce a grouping folder

## 🔒 `.blackbox`

`docs/.blackbox/` exists, but it’s hidden on purpose and not part of the “visible top-level” structure.

- ✅ Use it for private/internal agent artifacts, scratchpads, and protocol materials.
- ❌ Do not create nested `.blackbox/` folders inside the visible docs categories.

## 🧠 Long-run agents (context + compaction rules)

For multi-hour runs (e.g. 10–20 hours), agents must maintain their own plan-local memory:

- ✅ Each step should be a single file under: `docs/.blackbox/.plans/<run>/context/steps/`
- ✅ Every 10 step files are compacted into a single compaction file (default cap: ~**1MB**).
- ✅ If context feels unwieldy, compact early:

```bash
./.blackbox/scripts/compact-context.sh --plan .blackbox/.plans/<run>
```

Every 10 compactions (≈100 steps), create a short review in:
- `docs/.blackbox/.plans/<run>/context/reviews/`
  - Rule of thumb: this is ~10MB of compacted memory (10 files × ~1MB each) before a human review + pruning pass.

## ✅ Quick validation helpers

```bash
# Show the intended 8-folder top-level layout (excluding hidden folders)
ls -1 . | grep -v '^\\.' | sort
```

```bash
# Validate: folder-count rules + README rules + no nested .blackbox
python3 .blackbox/scripts/validate-docs.py
```
