---
status: active
last_reviewed: 2025-12-28
owner: team
---

# 🗣️ Agent Comms Templates

These templates standardize what agents communicate to humans (so updates stay clear and low-noise).

## ✅ Templates

- `read-aloud-status-update.md`
  - Use for: 30–60 second progress updates (chat/voice/Slack)
- `decision-request.md`
  - Use for: blockers or forks where we need a human call
- `end-of-run-summary.md`
  - Use for: closing out multi-hour runs with ranked recommendations

## 📌 Rule of thumb

- If it’s **for humans to read**, use these.
- If it’s **for agents to persist memory**, use plan-local context in:
  - `docs/.blackbox/.plans/<run>/context/`

