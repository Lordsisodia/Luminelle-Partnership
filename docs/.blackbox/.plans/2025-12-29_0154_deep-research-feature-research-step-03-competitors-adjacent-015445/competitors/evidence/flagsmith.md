# Evidence Extract — Flagsmith

- slug: `flagsmith`

## Homepage snapshot

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-home/flagsmith.html`
- title: Flagsmith - Open Source Feature Flag Service

## Variant snapshots (pricing/docs/features)

- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/flagsmith-blog.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/flagsmith-docs.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/flagsmith-features.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/flagsmith-home.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/flagsmith-pricing.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/flagsmith-product.html`

## Variant details (signal)

### flagsmith-blog.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/flagsmith-blog.html`

## Tranche 1 — Evidence-backed primitives (feature flags + remote config + governance)

Goal: steal “remote config per tenant + auditability” patterns for a configurable ecommerce admin.

### Notable features (3)

1) Remote config (beyond boolean flags)  
Evidence: https://docs.flagsmith.com/advanced-use/remote-config

2) Audit logs as a first-class governance primitive  
Evidence: https://docs.flagsmith.com/platform-features/audit-logs

3) Remote config enables per-tenant configuration without redeploying  
Evidence: https://docs.flagsmith.com/advanced-use/remote-config

### Copyable workflows (2)

1) Change config value → observe effect immediately → roll back if needed  
- Remote config: https://docs.flagsmith.com/advanced-use/remote-config

2) Governance: review who changed what and when (audit trail)  
- Audit logs: https://docs.flagsmith.com/platform-features/audit-logs

### 3 steal ideas (easy / medium / hard)

- Easy: ship “config keys” UI with types (bool/string/number/json) and per-merchant overrides.  
- Medium: add audit log entries and diffs for every config change + export capability.  
- Hard: multi-service correctness + SDK rollout across backend/frontend reliably.

### Thin-slice implementation (1–3 days)

- Day 1: implement `config_keys` + `config_values` with per-merchant overrides; add admin UI to edit.
- Day 2: add immutable audit log entries on create/update/delete + “diff view”.
- Day 3: add guarded rollout: “apply to a subset of merchants” + “preview impacted merchants” before save.
- title: Blog - Flagsmith

### flagsmith-docs.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/flagsmith-docs.html`
- title: Not Found

### flagsmith-features.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/flagsmith-features.html`
- title: Not Found

### flagsmith-home.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/flagsmith-home.html`
- title: Flagsmith - Open Source Feature Flag Service

### flagsmith-pricing.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/flagsmith-pricing.html`
- title: Pricing - Flagsmith

### flagsmith-product.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/flagsmith-product.html`
- title: Not Found
