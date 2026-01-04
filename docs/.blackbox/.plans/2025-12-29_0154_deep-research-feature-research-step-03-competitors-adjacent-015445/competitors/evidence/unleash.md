# Evidence Extract — Unleash

- slug: `unleash`

## Homepage snapshot

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-home/unleash.html`
- title: Feature Management Platform / Feature Flags for Large Enterprise
- description: Feature flags that are oss, private, secure, and ready for the most complex setups out of the box. Built for enterprises.

## Variant snapshots (pricing/docs/features)

- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/unleash-blog.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/unleash-docs.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/unleash-features.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/unleash-home.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/unleash-pricing.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/unleash-product.html`

## Variant details (signal)

### unleash-blog.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/unleash-blog.html`
- title: Blog | Unleash
- description: Unleash is an open-source, enterprise-ready feature management solution built with privacy in mind. Move from all-or-nothing releases to frequent deployments

### unleash-docs.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/unleash-docs.html`

### unleash-features.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/unleash-features.html`

### unleash-home.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/unleash-home.html`
- title: Feature Management Platform / Feature Flags for Large Enterprise
- description: Feature flags that are oss, private, secure, and ready for the most complex setups out of the box. Built for enterprises.

### unleash-pricing.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/unleash-pricing.html`
- title: Pricing & Plans | Unleash
- description: Unleash is an open-source feature flag solution that fits your technology stack, hosting needs, processes, business, and budget with a simple pricing plan.

### unleash-product.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/unleash-product.html`

## Tranche 1 — Evidence-backed primitives (feature flags + rollout strategy model)

Goal: steal “toggle taxonomy + strategy rules” patterns for staged releases and per-tenant config.

### Notable features (3)

1) Clear product model overview (Unleash as a feature management system)  
Evidence: https://docs.getunleash.io/reference/unleash-overview

2) Explicit feature toggle types taxonomy (release / experiment / ops / permission)  
Evidence: https://docs.getunleash.io/reference/feature-toggles/feature-toggle-types

3) Rollout/targeting expressed as composable “strategies”  
Evidence: https://docs.getunleash.io/reference/feature-toggles/strategies

### Copyable workflows (2)

1) Choose toggle type → configure strategy → roll out by rules/segments  
- Toggle types: https://docs.getunleash.io/reference/feature-toggles/feature-toggle-types  
- Strategies: https://docs.getunleash.io/reference/feature-toggles/strategies

2) Operate flags: keep “ops toggles” for incident response and emergency controls  
- Toggle taxonomy includes ops toggles: https://docs.getunleash.io/reference/feature-toggles/feature-toggle-types

### 3 steal ideas (easy / medium / hard)

- Easy: adopt Unleash’s toggle taxonomy for admin-controlled settings (release vs ops vs permission flags).  
- Medium: implement “strategy templates” (percentage rollout, allowlist, attribute match) as composable rules per feature/config.  
- Hard: replicate full Unleash strategy ecosystem + SDK parity + org governance.

### Thin-slice implementation (1–3 days)

- Day 1: add “Flag type” field (release/ops/permission) and show different defaults and warnings per type.
- Day 2: implement 3 strategies: `always_on`, `percentage_rollout`, `attribute_match` (merchantId/storeId).
- Day 3: add “Strategy preview” that lists which merchants would be affected before enabling.
