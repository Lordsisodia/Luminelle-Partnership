---
status: active
last_reviewed: 2025-12-28
owner: product
---

# 🔬 05-planning / research

This is the **human-facing research library**: curated, readable, and intended to be re-used.

For multi-hour agent runs, raw outputs live in `docs/.blackbox/.plans/…` and then get promoted here.

## 📁 Sections

- 📊 `market-intelligence/` — competitors, feature landscapes, OSS scouting, “what exists already?”

## Key docs

- `docs/05-planning/research/lumelle-architecture-map.md` — current architecture overview from `src/`.
- `docs/05-planning/research/lumelle-architecture-improvements.md` — improvement roadmap (plan only; no code changes).
- `docs/05-planning/research/supabase-multitenancy-decoupled-backend.md` — plan for multi-tenant Supabase + swappable frontend boundary.
- `docs/05-planning/research/ui-infra-plugin-architecture.md` — deeper UI↔infra port/adapters strategy.

## 🧭 Where to put research (routing)

- ✅ **Final, reusable takeaways** → here (this folder)
- 🗃️ **Raw dumps, snapshots, agent scratchpads** → `docs/.blackbox/…`
- 🧩 **Reusable templates** → `docs/07-templates/…`

## 📏 Folder-count rules (quick reminder)

- Keep **6–10** direct child folders per directory (add grouping levels if needed).
- Avoid adding new root buckets under `docs/` unless we truly need them.
