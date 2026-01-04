<!-- AUTO-GENERATED: feature-research start-here -->
---
status: active
last_reviewed: 2025-12-29
owner: agent
---

# ✅ Start Here: Step 02 — Competitors (core)

Plan folder: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445`

## 🎯 Your job

- Follow the staged workflow: Align → Plan → Research → Synthesize → Report
- Write outputs into `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/artifacts/` (use the seeded files)
- Keep updates human-friendly (use comms templates)

## 📌 Prompt pack to paste into your agent session

- `docs/.blackbox/.prompts/oss-competitors-step-02-competitors-core.md`

## 🧾 Expected artifacts (write into these files)

- `artifacts/feature-research-config.yaml`
- `artifacts/run-meta.yaml`
- `artifacts/competitor-seeds.txt`
- `artifacts/competitor-matrix.md`
- `artifacts/summary.md`
- `artifacts/sources.md`

## 🧠 Memory + compaction (required for long runs)

Checkpoint after meaningful progress:

```bash
./docs/.blackbox/scripts/new-step.sh --plan .blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445 "Checkpoint: <what changed>"
```

Compact early if context grows:

```bash
./docs/.blackbox/scripts/compact-context.sh --plan .blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445
```

## 🗣️ What to say to humans (templates)

- Read-aloud update: `docs/07-templates/agent-comms/read-aloud-status-update.md`
- Decision request: `docs/07-templates/agent-comms/decision-request.md`
- End-of-run summary: `docs/07-templates/agent-comms/end-of-run-summary.md`

## ✅ Decisions (must be set early)

Edit:
- `artifacts/feature-research-config.yaml`

