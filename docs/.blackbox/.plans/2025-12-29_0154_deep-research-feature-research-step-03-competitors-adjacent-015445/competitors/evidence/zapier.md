# Evidence Extract — Zapier

- slug: `zapier`

## Homepage snapshot

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-home/zapier.html`
- title: Zapier: Automate AI Workflows, Agents, and Apps

## Variant snapshots (pricing/docs/features)

- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/zapier-blog.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/zapier-docs.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/zapier-features.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/zapier-home.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/zapier-pricing.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/zapier-product.html`

## Variant details (signal)

### zapier-blog.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/zapier-blog.html`

### zapier-docs.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/zapier-docs.html`
- title: Error 404 (Not Found)

      
        
           | Zapier
- description: Connect the apps you use everyday to automate your work and be more productive. 5,000 apps and easy integrations - get started in minutes.

### zapier-features.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/zapier-features.html`

### zapier-home.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/zapier-home.html`
- title: Zapier: Automate AI Workflows, Agents, and Apps

### zapier-pricing.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/zapier-pricing.html`
- title: Plans & Pricing | Zapier

### zapier-product.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/zapier-product.html`
- title: Error 404 (Not Found)

      
        
           | Zapier
- description: Connect the apps you use everyday to automate your work and be more productive. 5,000 apps and easy integrations - get started in minutes.

## Tranche 1 — Evidence-backed primitives (workflow automation)

Goal: reusable patterns for an ecommerce admin “automation + approvals + run history” surface.

### Notable features (3)

1) Trigger → actions is the core mental model (“a Zap”)  
Evidence: https://help.zapier.com/hc/en-us/articles/8496223930381-What-is-a-Zap

2) Multi-step workflows (multiple actions) as a default capability  
Evidence: https://help.zapier.com/hc/en-us/articles/8496309473421-Use-multi-step-Zaps

3) Human-in-the-loop approvals as an explicit workflow step  
Evidence: https://help.zapier.com/hc/en-us/articles/8496354423693-Get-started-with-Approval-by-Zapier

### Copyable workflows (2)

1) Conditional automation (guardrails)  
- “Filters” for if/then gating: https://help.zapier.com/hc/en-us/articles/8496223368085-Use-filters-in-Zaps  
- “Paths” for branching: https://help.zapier.com/hc/en-us/articles/8496250107405-Use-Paths-by-Zapier

2) Ops loop: monitor runs → inspect failures → re-run/fix  
- Run history (“Zap history”): https://help.zapier.com/hc/en-us/articles/8496257531797-View-your-Zap-history

### 3 steal ideas (easy / medium / hard)

- Easy: “Trigger → Action → Test → Turn on” stepper vocabulary + defaults (minimize cognitive load).  
- Medium: “Approvals” step type for high-risk actions (refunds, fulfillment holds, price changes) with approve/deny routing.  
- Hard: connector breadth + consistent auth + reliable retries at scale (Zapier’s moat; likely not replicable quickly).

### Thin-slice implementation (1–3 days)

- Day 1: add “Automation Rules” page with a fixed set of triggers and actions (no generic builder yet).
- Day 1: add “Run history” list (status: success/failed, timestamp, payload preview) inspired by Zap history.
- Day 2: add `IF` guardrails (one condition per rule) inspired by Filters.
- Day 3: add “Approval required” checkbox that inserts an approval step (approve/deny) before executing sensitive actions.
