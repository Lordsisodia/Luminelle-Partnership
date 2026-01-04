# Evidence Extract — Retool

- slug: `retool`

## Homepage snapshot

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-home/retool.html`
- title: Retool | Build internal software better, with AI.
- description: Build, deploy, and manage internal tools with Retool’s unified engine. Connect to any database, API, or LLM. Leverage AI throughout your business.

## Variant snapshots (pricing/docs/features)

- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/retool-blog.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/retool-docs.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/retool-features.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/retool-home.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/retool-pricing.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/retool-product.html`

## Variant details (signal)

### retool-blog.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/retool-blog.html`
- title: Retool Blog | Retool Blog | Cache
- description: The latest news, updates, and stories from Retool.

### retool-docs.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/retool-docs.html`

### retool-features.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/retool-features.html`

### retool-home.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/retool-home.html`
- title: Retool | Build internal software better, with AI.
- description: Build, deploy, and manage internal tools with Retool’s unified engine. Connect to any database, API, or LLM. Leverage AI throughout your business.

### retool-pricing.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/retool-pricing.html`
- title: Retool | Pricing
- description: Find Retool pricing information. Includes details about our Free plan, and information about our Team, Business, and Enterprise plans.

### retool-product.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/snapshots-variants/retool-product.html`

## Tranche 3 — Evidence-backed primitives (Workflows: templates/ops/run logs/config boundary)

Goal: steal “internal admin workflows” patterns: triggers, schedules, run logs, environment variables, and governance-friendly defaults.

### Notable features (3)

1) Workflows are explicitly positioned as “Build, schedule, and monitor your jobs, alerts, and ETL tasks.”  
Evidence: https://docs.retool.com/workflows/

2) Run logs are a first-class UI with filters (by time, block name, and error/success/info) + JSON download  
Evidence: https://docs.retool.com/workflows/concepts/logs

3) Environment variables exist as a self-hosted configuration boundary for workflows  
Evidence: https://docs.retool.com/workflows/reference/environment-variables

### Copyable workflows (2)

1) Build → trigger → operate loop
- Configure triggers, run the workflow, then debug with run logs and filter by status.  
Evidence: triggers guide: https://docs.retool.com/workflows/guides/triggers/  
Evidence: run logs: https://docs.retool.com/workflows/concepts/logs

2) Export/debug workflow runs
- Use JSON download of logs as the “escape hatch” into other tools (attach to support tickets / incident channels).  
Evidence: https://docs.retool.com/workflows/concepts/logs

### 3 steal ideas (easy / medium / hard)

- Easy: run logs with strong filtering defaults + “download JSON” for investigation.
- Medium: workflows as “jobs/alerts/ETL tasks” framing (clear intent) + trigger configuration UX.
- Hard: full internal developer platform polish (IDE + debugging + integrations).

### Thin-slice implementation (1–3 days)

- Day 1: add run logs for admin automations with filters (status + time) + JSON export.
- Day 2: add triggers catalog UX (schedule/webhook/event) and “test run” with sample payload.
- Day 3: add environment variables/secret references for self-hosted deployments + rotation workflow.
