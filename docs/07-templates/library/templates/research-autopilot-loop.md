---
status: active
last_reviewed: 2025-12-29
owner: team
---

# 🤖 Research Autopilot Loop (template)

Use this when you want to paste **one stable prompt** repeatedly and have the agent self-direct using the blackbox plan folder.

This template is **MD-first**:
- prompts get logged to `artifacts/prompt-log.md`
- plans get logged to `artifacts/agent-plan.md`
- outputs get indexed in `artifacts/output-index.md`
- skills used get logged to `artifacts/skills-log.md`

## ✅ Autopilot invariants (do not break)

- ⏱️ Work in **timeboxed cycles** (default: 45 minutes).
- 🧾 Evidence-first: no claims without a link or snapshot/evidence file path.
- 🧱 Every cycle must change at least **one artifact** (or you are drifting).
- 🧠 Every cycle must write a **checkpoint step file** (real bullets, no placeholders).
- 🧼 Keep outputs short and scannable (bullets).

## 📌 Files the agent must maintain (per plan)

- `artifacts/agent-plan.md` — current plan + next 3 actions (updated each cycle)
- `artifacts/prompt-log.md` — append the exact prompt used each cycle
- `artifacts/output-index.md` — append what files changed + why
- `artifacts/skills-log.md` — append what skills/tools were used (and why)

## 🔁 Cycle structure (repeat)

1) 🧠 **Load context** (2–5 minutes)
   - read `artifacts/feature-research-config.yaml` (role + targets)
   - read `artifacts/start-here.md`
   - if role is a step run (01–04): read `context/context.md` + last step file
   - if synthesis: read `artifacts/next-actions.md` + `artifacts/gaps-report.md`

2) 🎯 **Pick next action** (2 minutes)
   - choose the *highest leverage* next action that reduces gaps or increases build-readiness
   - set N limits (competitors/repos/features) and stop at N

3) 🔎 **Execute research** (30–35 minutes)
   - collect evidence, update artifacts, don’t essay

4) 🧩 **Synthesize** (5–10 minutes)
   - add 3–7 durable bullets
   - update at least one “global” artifact if you’re synthesis

5) 🧾 **Write logs + checkpoint** (3–5 minutes)
   - update `artifacts/agent-plan.md`
   - append to `artifacts/prompt-log.md`, `artifacts/output-index.md`, `artifacts/skills-log.md`
   - create a new step file via `new-step.sh` and fill it

## 🛑 Stop conditions

- stop at the cycle end time even if you want to keep going
- if blocked by anti-bot pages, record as `blocked_evidence` and move on
- if you can’t find evidence quickly, record the gap and move on

