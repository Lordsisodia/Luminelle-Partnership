---
status: active
last_reviewed: 2025-12-29
owner: agent-zero
---

# Runbook — Market Research “Blackbox” (Agent Zero)

This is the practical, day-to-day playbook for running long research sessions without losing context.

## ✅ Read this first (fast)

1) `artifacts/real-research-digest.md` (skimmable “what did we learn”)
2) `artifacts/top-50-market-features.md` (execution map; OSS is license-flagged ✅/🧨/⚠️)
3) `artifacts/oss-ranked.md` (cool-code shortlist)
4) `artifacts/competitor-master-table.md` (who we covered + evidence status)
4.5) `artifacts/progress-dashboard.md` (human-friendly “are we on track?”)
4.6) `artifacts/tranche-index.md` (browse tranche outputs)
4.7) `artifacts/tranche-ledger.md` (1-line headlines per tranche)
5) `artifacts/license-verification-tranche-006.md` (license sanity check examples)
6) `artifacts/license-verification-sweep-001.md` (license sweep for top OSS)
7) `artifacts/license-verification-sweep-002-raw.md` (raw license sweep; avoids GitHub API limits)
8) `artifacts/thin-slices/README.md` (top-10 build-ready specs)
9) `artifacts/domain-glossary.md` (shared nouns for specs)
10) `artifacts/api-conventions.md` (shared API/DB naming defaults)
11) `artifacts/api-error-contract.md` (consistent error/response shapes)
12) `artifacts/week-1-backlog.md` (execution-ready Week‑1 plan)
13) `artifacts/week-2-backlog.md` (Week‑2 plan: approvals + safe actions)
14) `artifacts/week-3-backlog.md` (Week‑3 plan: bulk actions + queues + SLAs)
15) `artifacts/tranche-loop.md` (how to keep producing outputs)

## 🧭 Default workflow (repeatable loop)

1) Pick 1–2 feature rows in `top-50-market-features.md`
2) For each, pick:
   - 1 competitor to copy patterns from (evidence links)
   - 1 OSS repo to accelerate integration (OSS links)
3) Write:
   - a thin slice (1–3 days)
   - a 1-week slice
   - risks + license flags
4) Log a checkpoint step file (so agents retain context)

## 🕒 Long-run monitoring (recommended for 10–20 hour runs)

Start a monitor loop so long sessions don’t silently drift or break:

From `docs/`:

```bash
./.blackbox/scripts/start-10h-monitor.sh \
  --feature-research-synth .blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445 \
  --notify-local
```

Notes:
- The monitor runs `validate-loop.sh` with `--auto-sync` and checks feature-research health.
- Stop anytime with Ctrl+C.

## 🧠 Context / memory rules (for 10–20 hour runs)

- One step = one file in `<plan>/context/steps/`
- Checkpoint after meaningful progress:

```bash
./docs/.blackbox/scripts/new-step.sh --plan <plan> "Checkpoint: <what changed>"
```

- Compact when you hit ~10 step files (or if context starts to feel too big):

```bash
./docs/.blackbox/scripts/compact-context.sh --plan <plan>
```

## 📦 Tranches (how we grow the dataset)

- Each tranche should produce one skimmable artifact:
  - `artifacts/live-web-research-tranche-00X.md`
  - Template: `docs/07-templates/library/templates/tranche-report-template.md`
  - Helper: `./docs/.blackbox/scripts/new-tranche.sh --synth-plan <synth-plan> --type live-web`
- If the tranche includes “cool code”, also:
  - add repos into Step 04 `oss/entries`
  - regenerate `oss-ranked.md`

Current tranche focus:
- `artifacts/tranche-006-brief.md`
- Latest tranche output:
  - `artifacts/live-web-research-tranche-006.md`
- License verification output (use before adoption):
  - `artifacts/license-verification-tranche-006.md`

## 🔍 OSS deep audits (turn links → integration)

For the top candidates, use:
- `artifacts/oss-deep-audit-template.md`

Goal: 10 deep audits per tranche (not 100 shallow links).

## ⚖️ License sanity rule (do this every tranche)

- If repo metadata shows `NOASSERTION` or dual-license language:
  - verify the actual LICENSE text (or GitHub `/license` endpoint)
  - record the outcome in a tranche-specific report
  - mark proprietary or copyleft-family items as 🧨 by default unless explicitly approved

## 🧮 License overrides (so rankings aren’t misleading)

If GitHub metadata is `NOASSERTION`, we keep a small override map so scoring outputs reflect reality:

- `artifacts/license-overrides.json`

Then regenerate:

```bash
python3 .blackbox/scripts/research/score_oss_from_metadata.py \
  --entries-dir .blackbox/.plans/<step-04>/oss/entries \
  --out-index .blackbox/.plans/<synth>/artifacts/oss-index.md \
  --out-ranked .blackbox/.plans/<synth>/artifacts/oss-ranked.md \
  --license-overrides .blackbox/.plans/<synth>/artifacts/license-overrides.json
```
