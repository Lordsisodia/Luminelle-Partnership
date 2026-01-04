# Evidence Extract — PostHog (Feature Flags + Experiments)

- slug: `posthog`
- category: product analytics + feature flags + experimentation
- license: MIT for self-hosted core (per docs); paid cloud offering exists

## Cycle 13 — Evidence-backed primitives (analytics + flags in one surface)

### Notable features (3)

1) Feature Flags are a first-class product primitive (create flags, rollouts, targeting)  
Evidence: https://posthog.com/docs/feature-flags

2) Experiments are a documented primitive adjacent to feature flags (A/B test workflow)  
Evidence: https://posthog.com/docs/experiments

3) Self-hosting is explicitly supported in docs (implies an OSS-adjacent posture for on-prem/control plane patterns)  
Evidence: https://posthog.com/docs/self-host

### Copyable workflows (2)

1) “Ship via flag” workflow: create flag → target segment → gradual rollout → measure (via product analytics) → graduate/rollback  
Evidence: feature flags docs: https://posthog.com/docs/feature-flags

2) Experiment workflow: run experiment via feature flags + analytics → decide winner → ship winning variant  
Evidence: experiments docs: https://posthog.com/docs/experiments

### 3 steal ideas (easy / medium / hard)

- Easy: expose a “flag lifecycle” view (draft → running → completed → archived) and enforce cleanup (reduces stale toggles).
- Medium: unify experimentation + analytics: experiments should require explicit primary metric and show results inline.
- Hard: build a combined “release + experiment + audit” timeline (merge approvals primitive + flags primitive).

### Thin-slice implementation (1–3 days)

- Day 1: implement feature flags in admin (boolean + variant) with simple percent rollout.
- Day 2: add exposure events and attach to analytics/event pipeline.
- Day 3: add minimal experiment object that references a flag and a primary metric + approve “promote variant to 100%”.

## License evidence

- “PostHog is MIT licensed” statement (docs): https://posthog.com/docs/self-host

