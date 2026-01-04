---
status: active
last_reviewed: 2025-12-29
owner: agent-zero
---

# Tranche Loop — How we grow the dataset (without looping)

Purpose: every “research tranche” should create **new reusable artifacts** and improve the execution map.

This is the rule: **no tranche ends without shippable deltas**.

## ⚡ Quickstart (do this every tranche)

From `docs/`:

```bash
./.blackbox/scripts/new-tranche.sh \
  --synth-plan .blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445 \
  --type live-web \
  --suffix "<short-topic>" \
  --update-status \
  --update-kpis \
  --update-index \
  --print-next
```

## ⏱️ Default tranche timebox

- 45–90 minutes for a small tranche
- 2–4 hours for a deep tranche (includes OSS deep audits)

## ✅ Tranche inputs (pick 1–2 only)

- 5 competitors to deepen (core or adjacent)
- 5 OSS repos to deepen (license + adoption plan)
- 5–10 feature rows to improve in `top-50-market-features.md`

## 🧩 Tranche outputs (non-negotiable)

Each tranche must produce:

1) One skimmable tranche report:
   - `artifacts/live-web-research-tranche-00X.md`
   - Template: `docs/07-templates/library/templates/tranche-report-template.md`
   - Helper: `./docs/.blackbox/scripts/new-tranche.sh --synth-plan <synth-plan> --type live-web`
2) A concrete update to at least one of:
   - `artifacts/top-50-market-features.md` (better mapping + OSS flags)
   - `artifacts/oss-ranked.md` (ranking changed with evidence)
   - `artifacts/features-ranked.md` (ranking changed with evidence)
3) If OSS was involved:
   - add/upgrade notes in `Step 04/oss/entries/`
   - verify license if unclear (record outcome)

## 📌 “What counts as a good tranche”

- Adds new evidence-backed patterns (not just links)
- Produces actionable “steal this” workflows (step-by-step)
- Avoids license traps (flags 🧨 until verified)

## 🛑 Tranche stop conditions (anti-loop)

Stop and write a decision request if:
- you can’t name the next artifact you will change
- the only remaining work is “read more sources”
- license ambiguity blocks a recommendation

Template:
- `docs/07-templates/agent-comms/decision-request.md`

## 🔁 Tranche cadence (recommended)

- Every tranche, run status once:

```bash
python3 .blackbox/scripts/research/run_status.py \
  --synth-plan .blackbox/.plans/<synth-plan> \
  --write
```

- Every 2–3 tranches, run one compaction review:
  - `<plan>/context/reviews/`
