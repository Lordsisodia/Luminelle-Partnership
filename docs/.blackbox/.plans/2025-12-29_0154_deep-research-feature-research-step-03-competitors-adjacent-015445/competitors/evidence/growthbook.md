# Evidence Extract — GrowthBook

- slug: `growthbook`

## Homepage snapshot

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-home/growthbook.html`
- title: GrowthBook - Open Source Feature Flags and A/B Tests
- description: (no `meta name="description"` present in snapshot)

## Variant snapshots (pricing/docs/features)

- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/growthbook-blog.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/growthbook-docs.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/growthbook-features.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/growthbook-home.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/growthbook-pricing.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/growthbook-product.html`

## Variant details (signal)

### growthbook-blog.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/growthbook-blog.html`
- title: Not Found

### growthbook-docs.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/growthbook-docs.html`
- title: Not Found

### growthbook-features.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/growthbook-features.html`
- title: Not Found

### growthbook-home.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/growthbook-home.html`
- title: GrowthBook - Open Source Feature Flags and A/B Tests

### growthbook-pricing.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/growthbook-pricing.html`
- title: GrowthBook - Pricing

### growthbook-product.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/growthbook-product.html`
- title: Not Found

## Tranche 1 — Evidence-backed primitives (feature flags + experimentation workflow)

Goal: steal “experiment control-plane UX” (feature flags + experiments + scheduling).

### Notable features (3)

1) Feature flags as a first-class surface (targeting/rollouts)  
Evidence: https://docs.growthbook.io/features/feature-flags

2) Experiments as a first-class surface (run experiments on variants)  
Evidence: https://docs.growthbook.io/features/experiments

3) Feature scheduling (time-based releases)  
Evidence: https://docs.growthbook.io/features/feature-scheduling

### Copyable workflows (2)

1) Experiment workflow: define variants → run → analyze → decide  
- Experiments: https://docs.growthbook.io/features/experiments

2) Launch workflow: schedule release → roll out → stop/adjust  
- Scheduling: https://docs.growthbook.io/features/feature-scheduling  
- Flags: https://docs.growthbook.io/features/feature-flags

### 3 steal ideas (easy / medium / hard)

- Easy: “experiments as a checklist” UI (hypothesis, variants, metric, decision) inside admin.  
- Medium: build “schedule a change” as a primitive across admin config (promotions, price rules, content).  
- Hard: statistically-correct experimentation analytics end-to-end (attribution, metrics pipelines).

### Thin-slice implementation (1–3 days)

- Day 1: implement “scheduled changes” for one admin object (e.g., promotion start/end) with a timeline view.
- Day 2: implement basic A/B assignment for an admin UI change (e.g., new table layout) using per-merchant bucketing.
- Day 3: implement simple decision UI (win/lose/inconclusive) with an audit log entry and “promote winner” action.
