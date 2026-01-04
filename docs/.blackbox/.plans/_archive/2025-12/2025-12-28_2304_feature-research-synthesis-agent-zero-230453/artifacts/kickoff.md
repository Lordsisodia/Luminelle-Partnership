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

- Step 01 (Agent 1): `.blackbox/.plans/2025-12-28_2304_deep-research-feature-research-step-01-feature-hunt-oss-harvest-230453`
- Step 02 (Agent 2): `.blackbox/.plans/2025-12-28_2304_deep-research-feature-research-step-02-competitors-core-230453`
- Step 03 (Agent 3): `.blackbox/.plans/2025-12-28_2304_deep-research-feature-research-step-03-competitors-adjacent-230453`
- Step 04 (Agent 4): `.blackbox/.plans/2025-12-28_2304_deep-research-feature-research-step-04-oss-harvesting-cool-code-230453`
- Synthesis (Agent Zero): `.blackbox/.plans/2025-12-28_2304_feature-research-synthesis-agent-zero-230453`

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
- `.blackbox/.plans/2025-12-28_2304_feature-research-synthesis-agent-zero-230453/artifacts/open-questions.md`
- `.blackbox/.plans/2025-12-28_2304_feature-research-synthesis-agent-zero-230453/artifacts/feature-research-config.yaml`

### 🚀 Fast setup (set decisions once, propagate everywhere)

```bash
# 1) Set decisions for this run (updates Step 01–04 + Synthesis configs)
python3 docs/.blackbox/scripts/research/set_feature_research_config.py \
  --synth-plan .blackbox/.plans/2025-12-28_2304_feature-research-synthesis-agent-zero-230453 \
  --target-user-first "merchant admins" \
  --license-policy "prefer permissive; flag GPL/AGPL"

# 2) Confirm the run is ready (no TBD decisions left)
python3 docs/.blackbox/scripts/research/validate_feature_research_config.py \
  --synth-plan .blackbox/.plans/2025-12-28_2304_feature-research-synthesis-agent-zero-230453
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
python3 docs/.blackbox/scripts/validate-feature-research-run.py --plan .blackbox/.plans/2025-12-28_2304_deep-research-feature-research-step-01-feature-hunt-oss-harvest-230453 --kind step-01
python3 docs/.blackbox/scripts/validate-feature-research-run.py --plan .blackbox/.plans/2025-12-28_2304_deep-research-feature-research-step-02-competitors-core-230453 --kind step-02
python3 docs/.blackbox/scripts/validate-feature-research-run.py --plan .blackbox/.plans/2025-12-28_2304_deep-research-feature-research-step-03-competitors-adjacent-230453 --kind step-03
python3 docs/.blackbox/scripts/validate-feature-research-run.py --plan .blackbox/.plans/2025-12-28_2304_deep-research-feature-research-step-04-oss-harvesting-cool-code-230453 --kind step-04
python3 docs/.blackbox/scripts/validate-feature-research-run.py --plan .blackbox/.plans/2025-12-28_2304_feature-research-synthesis-agent-zero-230453 --kind synthesis
```

## 🔎 Evidence Index (optional auto-generation)

```bash
python3 docs/.blackbox/scripts/research/generate_evidence_index.py --synth-plan .blackbox/.plans/2025-12-28_2304_feature-research-synthesis-agent-zero-230453
```

## 📊 Run status dashboard (fast progress check)

```bash
python3 docs/.blackbox/scripts/research/run_status.py --synth-plan .blackbox/.plans/2025-12-28_2304_feature-research-synthesis-agent-zero-230453 --write
```

## 🌐 Optional: competitor automation (stubs + snapshots)

Once Step 02/03 have a solid , you can generate stub entry files and snapshot pages fast.

### Step 02 (core competitors)

```bash
# 1) Generate stub entry files (up to 100)
python3 docs/.blackbox/scripts/research/generate_competitor_stubs.py \
  --input .blackbox/.plans/2025-12-28_2304_deep-research-feature-research-step-02-competitors-core-230453/artifacts/competitor-seeds.txt \
  --out-dir .blackbox/.plans/2025-12-28_2304_deep-research-feature-research-step-02-competitors-core-230453/competitors/entries \
  --index .blackbox/.plans/2025-12-28_2304_deep-research-feature-research-step-02-competitors-core-230453/competitors/index.md \
  --limit 100

# 2) Extract URLs for snapshotting
python3 docs/.blackbox/scripts/research/extract_urls_from_competitors.py \
  --input .blackbox/.plans/2025-12-28_2304_deep-research-feature-research-step-02-competitors-core-230453/artifacts/competitor-seeds.txt \
  --output .blackbox/.plans/2025-12-28_2304_deep-research-feature-research-step-02-competitors-core-230453/competitors/urls.txt

# 3) Generate common variants (pricing/docs/features)
python3 docs/.blackbox/scripts/research/generate_url_variants.py \
  --input .blackbox/.plans/2025-12-28_2304_deep-research-feature-research-step-02-competitors-core-230453/competitors/urls.txt \
  --output .blackbox/.plans/2025-12-28_2304_deep-research-feature-research-step-02-competitors-core-230453/competitors/urls-variants.txt

# 4) Snapshot (stable names to prevent disk explosion)
python3 docs/.blackbox/scripts/research/snapshot_urls.py \
  --input .blackbox/.plans/2025-12-28_2304_deep-research-feature-research-step-02-competitors-core-230453/competitors/urls-variants.txt \
  --out-dir .blackbox/.plans/2025-12-28_2304_deep-research-feature-research-step-02-competitors-core-230453/competitors/snapshots \
  --stable-names \
  --skip-existing
```

### Step 03 (adjacent competitors)

```bash
python3 docs/.blackbox/scripts/research/generate_competitor_stubs.py \
  --input .blackbox/.plans/2025-12-28_2304_deep-research-feature-research-step-03-competitors-adjacent-230453/artifacts/competitor-seeds.txt \
  --out-dir .blackbox/.plans/2025-12-28_2304_deep-research-feature-research-step-03-competitors-adjacent-230453/competitors/entries \
  --index .blackbox/.plans/2025-12-28_2304_deep-research-feature-research-step-03-competitors-adjacent-230453/competitors/index.md \
  --limit 100

python3 docs/.blackbox/scripts/research/extract_urls_from_competitors.py \
  --input .blackbox/.plans/2025-12-28_2304_deep-research-feature-research-step-03-competitors-adjacent-230453/artifacts/competitor-seeds.txt \
  --output .blackbox/.plans/2025-12-28_2304_deep-research-feature-research-step-03-competitors-adjacent-230453/competitors/urls.txt

python3 docs/.blackbox/scripts/research/generate_url_variants.py \
  --input .blackbox/.plans/2025-12-28_2304_deep-research-feature-research-step-03-competitors-adjacent-230453/competitors/urls.txt \
  --output .blackbox/.plans/2025-12-28_2304_deep-research-feature-research-step-03-competitors-adjacent-230453/competitors/urls-variants.txt

python3 docs/.blackbox/scripts/research/snapshot_urls.py \
  --input .blackbox/.plans/2025-12-28_2304_deep-research-feature-research-step-03-competitors-adjacent-230453/competitors/urls-variants.txt \
  --out-dir .blackbox/.plans/2025-12-28_2304_deep-research-feature-research-step-03-competitors-adjacent-230453/competitors/snapshots \
  --stable-names \
  --skip-existing
```
