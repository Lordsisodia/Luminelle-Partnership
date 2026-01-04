<!-- AUTO-GENERATED: feature-research kickoff -->
---
status: active
last_reviewed: 2025-12-28
owner: agent-zero
---

# 🚀 Kickoff: Feature + Competitor + OSS Research (4-agent run)

This file is the **single place** you can use to launch and manage the full market-research run.

## 🎯 Goal

- Find the full feature landscape (what exists already)
- Identify “stealable” OSS that accelerates our admin dashboard + core workflows
- Produce ranked recommendations for what to build/integrate next

## 🧩 Plan folders (copy/paste into agent sessions)

- Step 01 (Agent 1): `.blackbox/.plans/2025-12-28_2252_deep-research-feature-research-step-01-feature-hunt-oss-harvest-225232`
- Step 02 (Agent 2): `.blackbox/.plans/2025-12-28_2252_deep-research-feature-research-step-02-competitors-core-225232`
- Step 03 (Agent 3): `.blackbox/.plans/2025-12-28_2252_deep-research-feature-research-step-03-competitors-adjacent-225232`
- Step 04 (Agent 4): `.blackbox/.plans/2025-12-28_2252_deep-research-feature-research-step-04-oss-harvesting-cool-code-225232`
- Synthesis (Agent Zero): `.blackbox/.plans/2025-12-28_2252_feature-research-synthesis-agent-zero-225232`

## 📌 Prompt packs

- Agent Zero orchestrator: `docs/.blackbox/.prompts/feature-research-orchestrator.md`
- Agent 1: `docs/.blackbox/.prompts/oss-competitors-step-01-needs-map.md`
- Agent 2: `docs/.blackbox/.prompts/oss-competitors-step-02-competitors-core.md`
- Agent 3: `docs/.blackbox/.prompts/oss-competitors-step-03-competitors-adjacent.md`
- Agent 4: `docs/.blackbox/.prompts/oss-competitors-step-04-oss-harvesting.md`

## ✅ Decisions to set (prevents wasted time)

1) **Target user first**
   - merchant admins vs internal ops
2) **License policy**
   - whether GPL/AGPL is allowed (or “flag only”)

Record decisions in:
- `.blackbox/.plans/2025-12-28_2252_feature-research-synthesis-agent-zero-225232/artifacts/open-questions.md`
- `.blackbox/.plans/2025-12-28_2252_feature-research-synthesis-agent-zero-225232/artifacts/feature-research-config.yaml`

### 🚀 Fast setup (set decisions once, propagate everywhere)

```bash
# 1) Set decisions for this run (updates Step 01–04 + Synthesis configs)
python3 docs/.blackbox/scripts/research/set_feature_research_config.py \
  --synth-plan .blackbox/.plans/2025-12-28_2252_feature-research-synthesis-agent-zero-225232 \
  --target-user-first "merchant admins" \
  --license-policy "prefer permissive; flag GPL/AGPL"

# 2) Confirm the run is ready (no TBD decisions left)
python3 docs/.blackbox/scripts/research/validate_feature_research_config.py \
  --synth-plan .blackbox/.plans/2025-12-28_2252_feature-research-synthesis-agent-zero-225232
```

## 🧠 Memory + compaction rules (long runs)

- One step = one file under: `<plan>/context/steps/`
- Every checkpoint:

```bash
./docs/.blackbox/scripts/new-step.sh --plan <plan> "Checkpoint: <what changed>"
```

- Compact early if needed:

```bash
./docs/.blackbox/scripts/compact-context.sh --plan <plan>
```

## 🗣️ What agents should “say” to humans (templates)

- Read-aloud update: `docs/07-templates/agent-comms/read-aloud-status-update.md`
- Decision request: `docs/07-templates/agent-comms/decision-request.md`
- End-of-run summary: `docs/07-templates/agent-comms/end-of-run-summary.md`

## 🧪 Validation (fast sanity checks)

```bash
python3 docs/.blackbox/scripts/validate-feature-research-run.py --plan .blackbox/.plans/2025-12-28_2252_deep-research-feature-research-step-01-feature-hunt-oss-harvest-225232 --kind step-01
python3 docs/.blackbox/scripts/validate-feature-research-run.py --plan .blackbox/.plans/2025-12-28_2252_deep-research-feature-research-step-02-competitors-core-225232 --kind step-02
python3 docs/.blackbox/scripts/validate-feature-research-run.py --plan .blackbox/.plans/2025-12-28_2252_deep-research-feature-research-step-03-competitors-adjacent-225232 --kind step-03
python3 docs/.blackbox/scripts/validate-feature-research-run.py --plan .blackbox/.plans/2025-12-28_2252_deep-research-feature-research-step-04-oss-harvesting-cool-code-225232 --kind step-04
python3 docs/.blackbox/scripts/validate-feature-research-run.py --plan .blackbox/.plans/2025-12-28_2252_feature-research-synthesis-agent-zero-225232 --kind synthesis
```

## 🔎 Evidence Index (optional auto-generation)

```bash
python3 docs/.blackbox/scripts/research/generate_evidence_index.py --synth-plan .blackbox/.plans/2025-12-28_2252_feature-research-synthesis-agent-zero-225232
```
