# Evidence Extract — Statsig

- slug: `statsig`
- category: feature flags + experimentation + metrics (integrated control plane)
- license: proprietary (SaaS); SDKs are open-source under ISC (per docs)

## Cycle 13 — Evidence-backed primitives (flags + experiments + guardrails)

### Notable features (3)

1) Feature Gates (flags) as a first-class primitive (targeting/rollouts)  
Evidence: https://docs.statsig.com/feature-gates

2) Experiments as a first-class primitive (variants + assignment + analysis loop)  
Evidence: https://docs.statsig.com/experiments

3) Metrics definition is explicitly documented (measurement surface for experiments/rollouts)  
Evidence: https://docs.statsig.com/metrics

### Copyable workflows (2)

1) Ship via gate, then measure impact: create gate → rollout to segment → monitor metric(s) → expand/rollback  
Evidence: feature gates: https://docs.statsig.com/feature-gates and metrics: https://docs.statsig.com/metrics

2) Experiment workflow: define experiment → assign variants → define success + guardrail metrics → review results → ship winning variant to 100%  
Evidence: experiments: https://docs.statsig.com/experiments

### 3 steal ideas (easy / medium / hard)

- Easy: one UI should manage both “flags” and “experiments” with shared targeting & exposure logging.
- Medium: require explicit success + guardrail metrics before allowing “rollout beyond X%” (workflow gate).
- Hard: decision automation: auto-stop/rollback when guardrails breach thresholds (ties to workflow automation primitive).

### Thin-slice implementation (1–3 days)

- Day 1: add a “Flag Registry” admin page (key, description, owner, default, variants, rollout).
- Day 2: add “Metric Registry” (events + aggregations) and store exposures (`flag_key`, `variant`, `actor`, `tenant`, timestamp).
- Day 3: add an “Experiment” object that references metrics, with a minimal results summary (counts + conversion rate) and an approval to graduate to 100%.

## License / SDK evidence

- SDKs open source under ISC (docs): https://docs.statsig.com/statsig-console/licenses-and-attribution

