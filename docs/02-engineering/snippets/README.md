---
status: active
last_reviewed: 2025-12-28
owner: engineering
---

# 🧷 Engineering Snippets

This folder is for **small, copy/paste-ready code + patterns** that help us ship faster.

Think: “vibe coding, but disciplined.”

## ✅ What belongs here

- A single file (or short snippet) we expect to reuse
- Integration notes for OSS packages (what it does, how to wire it, gotchas)
- “Working defaults” (configs, CLI commands, migrations, boilerplate)

## ❌ What does *not* belong here

- Long research dumps (put those in `docs/.blackbox/.plans/...`)
- Large codebases (link to repos instead)
- Anything secret (tokens, keys, customer info)

## 🧭 How to write a snippet doc (recommended structure)

1) **Goal** — what problem this snippet solves
2) **When to use it** — “use this when…”
3) **Snippet** — the actual code (small)
4) **Integration steps** — 3–7 steps, concrete
5) **Tradeoffs** — maintenance + edge cases
6) **Sources** — docs or repos

## 📌 Tip

If a snippet becomes “real documentation”, promote it to:
- `docs/02-engineering/runbooks/` (for checklists), or
- `docs/02-engineering/technical/` (for deeper guides).

