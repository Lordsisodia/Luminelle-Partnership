# Evidence Extract — LaunchDarkly

- slug: `launchdarkly`

## Homepage snapshot

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-home/launchdarkly.html`
- title: LaunchDarkly: Feature Flags, Feature Management, and Experimentation
- description: Maximize the value of every software feature through automation and feature management.

## Variant snapshots (pricing/docs/features)

- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/launchdarkly-blog.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/launchdarkly-docs.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/launchdarkly-features.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/launchdarkly-home.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/launchdarkly-pricing.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/launchdarkly-product.html`

## Variant details (signal)

### launchdarkly-blog.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/launchdarkly-blog.html`
- title: Blog | LaunchDarkly
- description: Get tips and best practices on feature management, developing great AI apps, running smart experiments, and more straight to your inbox.

### launchdarkly-docs.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/launchdarkly-docs.html`

### launchdarkly-features.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/launchdarkly-features.html`
- title: 404 | LaunchDarkly
- description: LaunchDarkly provides simple, scalable feature flag & toggle management (feature management) for the modern enterprise. Eliminate risk, deliver value.

### launchdarkly-home.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/launchdarkly-home.html`
- title: LaunchDarkly: Feature Flags, Feature Management, and Experimentation
- description: Maximize the value of every software feature through automation and feature management.

### launchdarkly-pricing.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/launchdarkly-pricing.html`
- title: Pricing | LaunchDarkly
- description: Find the right feature flag management platform price package for you needs. LaunchDarkly provides fast and reliable feature flag and toggle management.

### launchdarkly-product.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/launchdarkly-product.html`
- title: Take control of every feature. | LaunchDarkly
- description: Your runtime control plane for features, AI, and everything you release.

## Tranche 1 — Evidence-backed primitives (feature flags + governance)

Goal: steal “safe release” control-plane UX (workflows + approvals) for admin changes and configuration rollouts.

### Notable features (3)

1) Releases as a first-class workflow surface (“release workflow”)  
Evidence: https://docs.launchdarkly.com/home/releases

2) Approval workflows as governance (review/approve changes before taking effect)  
Evidence: https://docs.launchdarkly.com/home/approvals

3) Operational framing: feature management as part of release lifecycle (control-plane mental model)  
Evidence: https://docs.launchdarkly.com/home/releases

### Copyable workflows (2)

1) Ship safely: create change → stage rollout → monitor → promote/rollback  
- Release workflow surface: https://docs.launchdarkly.com/home/releases

2) Governance: require approvals for sensitive changes (two-person rule)  
- Approvals: https://docs.launchdarkly.com/home/approvals

### 3 steal ideas (easy / medium / hard)

- Easy: “Release workflow” stepper UI for admin changes (draft → review → rollout → done).  
- Medium: approvals per action type (refunds, price rules, fulfillment holds) with audit trail of who approved.  
- Hard: enterprise-grade policy engine (fine-grained governance + large-scale org controls).

### Thin-slice implementation (1–3 days)

- Day 1: add a generic “Change request” object for high-risk admin actions with states (draft → awaiting approval → applied).
- Day 2: add approvals (1 reviewer) + required comments + immutable audit log entry on approval/deny.
- Day 3: add a staged rollout control for config changes (e.g., apply to 10% of stores/tenants → 50% → 100%).
