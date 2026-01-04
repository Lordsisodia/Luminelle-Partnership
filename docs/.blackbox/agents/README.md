# 🤖 Agents

Each folder in here is a **self-contained runnable agent package**.

Recommended structure:
- `agent.md` — purpose, triggers, IO contract, constraints
- `prompt.md` — the agent’s prompt (or prompt fragments)
- `config.yaml` — machine-readable settings (optional)
- `schemas/` — JSON schemas for outputs (optional)
- `examples/` — sample inputs/outputs (optional)
- `runbook.md` — how to run the agent (human/CLI) (optional)

Start from the template:
- `agents/_template/`

Current agents:
- `agents/deep-research/` — long-form research runs + synthesis
- `agents/docs-feedback/` — feedback triage and docs cleanup
- `agents/feature-research/` — 4-agent market scan + OSS harvest + synthesis scaffold
- `agents/oss-discovery/` — GitHub OSS discovery cycle (cataloging)
