---
status: active
last_reviewed: 2025-12-28
owner: product
---

# 📊 Market Intelligence

This is where we keep **competitor research** + **feature landscapes** + **OSS scouting** in a way that’s easy to browse later.

## ✅ The default workflow (fast + auditable)

1) **Run structured research in `.blackbox`**
2) **Capture sources + evidence** during the run
3) **Synthesize into ranked recommendations**
4) **Promote the best takeaways** into this folder

## 🧠 “Feature + OSS” research program (4-agent run)

This is the standard “look at the market” run designed for 4 parallel agents + a synthesis step.

From `docs/`:

```bash
./.blackbox/scripts/start-feature-research.sh
```

Then use the orchestrator prompt:
- `docs/.blackbox/.prompts/feature-research-orchestrator.md`

## 📌 Where run outputs live

- Raw run folders: `docs/.blackbox/.plans/<run>/`
- Primary synthesis artifacts (inside the synthesis plan):
  - `artifacts/final-synthesis.md`
  - `artifacts/features-ranked.md`
  - `artifacts/oss-ranked.md`
  - `artifacts/evidence-index.md`
  - `artifacts/sources.md`

## 🚀 Promote evergreen notes

When a run creates something we’ll reuse, promote it into visible docs:

```bash
./.blackbox/scripts/promote.sh docs/.blackbox/.plans/<run> "<topic>"
```

Also append a quick entry to:
- `docs/08-meta/repo/docs-ledger.md`

## E-commerce benchmarks (women’s fashion)

- `05-planning/research/market-intelligence/ecommerce-benchmarking/README.md`
