# 🧭 Information Routing (Docs Organization)

This doc defines “where should this go?” rules for the entire `docs/` folder.

Core idea:
- ✅ Canonical “how we organize docs” lives in `docs/08-meta/repo/`
- 🤖 `docs/.blackbox/` contains the *agent runtime* (protocols, scripts, prompts, plans)
- 📚 Everything else in `docs/` is *stored knowledge* (docs/content), kept discoverable via links + the ledger

## 1) Canonical vs artifacts

- ✅ **Canonical docs** (what the team should read and rely on) should live in the visible `docs/0X-*/` structure.
- 🗃️ **Artifacts** (raw outputs, source dumps, intermediate notes) should live in `docs/.blackbox/.plans/<run>/artifacts/`.
- 📚 **Reusable research** should live in `docs/.blackbox/deepresearch/` and link back to its artifact folder.

## 2) Default routing table

- 🧑‍💼 Product surface area (admin UX, flows, copy) → `docs/01-product/…`
- 🧱 Engineering (architecture, setup, integrations) → `docs/02-engineering/…`
- 🤖 AI playbooks, experiments, snapshots → `docs/03-ai/…`
- 📈 Growth (SEO, marketing, social, content) → `docs/04-growth/…`
- 🧠 Plans, research, strategy → `docs/05-planning/…`
- ✅ Quality (feedback, reviews, incidents) → `docs/06-quality/…`
- 🧩 Templates → `docs/07-templates/…`
- 🧷 Repo/meta hygiene → `docs/08-meta/…`

## 3) Tracking rule (non-negotiable)

Whenever you create, move, or promote something meaningful:
- append an entry to `docs/08-meta/repo/docs-ledger.md`

Format:
- `YYYY-MM-DD — <type> — <topic> — <canonical path> — artifacts: <plan path>`
