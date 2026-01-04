---
status: draft
last_reviewed: 2025-12-28
owner: agent-zero
---

# Features Ranked (Top 30 Scorecards)

For each feature:
- Why it matters (ROI)
- Complexity (S/M/L)
- OSS accelerators (if any)
- Competitors that prove demand

## Scoring rubric (0–10 each; total /50)

- ROI: conversion, retention, ops time saved
- Feasibility: how fast we can ship an MVP
- Integration leverage: how much OSS/known patterns accelerate this
- Maintenance risk (reverse): lower risk = higher score
- Evidence strength: number/quality of competitors + sources

## Scorecard template (copy/paste per feature)

```md
### <Feature name>

- Category:
- Target user: merchant admin | internal ops | both
- Job to be done:
- Why it matters (ROI):
- Fastest path: build | integrate | buy
- Thin slice (1–3 days):
- 1-week slice:
- Dependencies (data/integrations):
- OSS accelerators (links):
- Competitors proving demand (links):
- Evidence links (2–5):

Scores (0–10):
- ROI:
- Feasibility:
- Integration leverage:
- Maintenance risk (reverse):
- Evidence strength:
- Total (/50):
```

## Top 30

### 1) Feature flags + staged rollouts (per-tenant)

- Category: Platform primitives
- Target user: merchant admin | internal ops (both)
- Job to be done: ship safely (roll out, test, rollback) without breaking merchants.
- Why it matters (ROI): fewer incidents, faster shipping velocity, safer “vibe coding”.
- Fastest path: integrate (flag server) + minimal UI in our admin
- Thin slice (1–3 days): gate 1 admin feature per-tenant + admin UI to flip the flag.
- 1-week slice: audit log for flag changes + gradual rollout + environments.
- Dependencies (data/integrations): tenancy model, auth/RBAC, audit log.
- OSS accelerators (links):
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/unleash-unleash.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/flagsmith-flagsmith.md`
- Competitors proving demand (links):
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/launchdarkly.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/unleash.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/configcat.md`

Scores (0–10):
- ROI: 9
- Feasibility: 8
- Integration leverage: 9
- Maintenance risk (reverse): 8
- Evidence strength: 9
- Total (/50): 43

### 2) Workflow automation hooks (triggers → actions → approvals)

- Category: Platform primitives / Admin ops
- Target user: merchant admin | internal ops (both)
- Job to be done: automate repetitive ops (“when X happens, do Y”) without engineering.
- Why it matters (ROI): compounds value; reduces ops workload; differentiates admin experience.
- Fastest path: integrate (workflow engine) with strong guardrails
- Thin slice (1–3 days): 1 webhook trigger → 1 action (e.g., create internal task) + run log.
- 1-week slice: approvals UI + retries + 2–3 core integrations.
- OSS accelerators (links):
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/n8n-io-n8n.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/activepieces-activepieces.md`
- Competitors proving demand (links):
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/n8n.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/entries/zapier.md` (seed)

Scores (0–10):
- ROI: 9
- Feasibility: 6
- Integration leverage: 9
- Maintenance risk (reverse): 6
- Evidence strength: 8
- Total (/50): 38

### 3) Audit log (“who changed what”)

- Category: Platform primitives
- Target user: internal ops (primary), merchant admin (secondary)
- Job to be done: trace changes, debug mistakes, and reduce “mystery state”.
- Why it matters (ROI): fewer support tickets, faster incident resolution, trust.
- Fastest path: build (on our event system) with simple UI.
- Thin slice (1–3 days): log key admin actions (order actions, settings changes) with actor + timestamp.
- 1-week slice: filtering, export, and “diff view” for critical entities.
- OSS accelerators (links / starting points):
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/unleash-unleash.md` (flag change history + “emit app-level audit events” pattern)
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/activepieces-activepieces.md` (workflow changes + run history; notes audit trail as a governance primitive)
- Competitors proving demand (links):
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/flagsmith.md` (explicit audit log “who changed what” + docs link)
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/launchdarkly.md` (approvals + audit trail references)
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/growthbook.md` (audit log entries in experimentation workflow)

Scores (0–10):
- ROI: 8
- Feasibility: 8
- Integration leverage: 5
- Maintenance risk (reverse): 8
- Evidence strength: 6
- Total (/50): 35

### 4) RBAC + granular permissions

- Category: Admin / operations
- Target user: merchant admin | internal ops (both)
- Job to be done: give teammates the right access without risk.
- Why it matters (ROI): required to sell to serious teams; reduces costly mistakes.
- Fastest path: build (integrated with tenancy + audit log).
- Thin slice (1–3 days): roles + permissions for 3–5 critical resources.
- 1-week slice: permission editor UI + role templates.
- OSS accelerators (links):
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/casbin-casbin.md` (RBAC-with-domains / multi-tenant authz primitive)
- Competitors proving demand (links):
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/directus.md` (user permissions called out as a core product capability)

Scores (0–10):
- ROI: 8
- Feasibility: 7
- Integration leverage: 5
- Maintenance risk (reverse): 7
- Evidence strength: 6
- Total (/50): 33

### 5) Returns portal + exchange-first flow

- Category: Customer / support + Post-purchase ops
- Target user: merchant admin (primary)
- Job to be done: reduce support load; turn returns into exchanges; automate reverse logistics.
- Why it matters (ROI): direct ops savings + retention.
- Fastest path: integrate (labels/carriers) + build workflow UI.
- Thin slice (1–3 days): return initiation UI + reason capture + admin review queue.
- 1-week slice: exchange routing + restock states + refund automation hooks.
- Competitors proving demand (links):
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/loop-returns.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/aftership.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/happy-returns.md`

Scores (0–10):
- ROI: 8
- Feasibility: 6
- Integration leverage: 6
- Maintenance risk (reverse): 6
- Evidence strength: 8
- Total (/50): 34

### 6) Unified order timeline (“single pane of glass”)

- Category: Admin / operations
- Target user: merchant admin | internal ops (both)
- Job to be done: see everything about an order (status + customer context + actions) in one place.
- Why it matters (ROI): fewer errors, faster resolution, fewer tools.
- Fastest path: build + integrate (shipping/returns/support context panels).
- Thin slice (1–3 days): single order view with status timeline + key actions.
- 1-week slice: embed shipping + returns + support context and audit trail.
- Competitors proving demand:
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/shopify.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/gorgias.md`

Scores (0–10):
- ROI: 8
- Feasibility: 7
- Integration leverage: 6
- Maintenance risk (reverse): 7
- Evidence strength: 7
- Total (/50): 35

### 7) Admin usage analytics (what merchants actually use)

- Category: Analytics / experiments
- Target user: internal ops (primary)
- Job to be done: decide what to build based on real usage and friction.
- Why it matters (ROI): reduces wasted build time; drives faster iteration.
- Fastest path: integrate (analytics) + build dashboards.
- Thin slice (1–3 days): capture 10 key admin events + render 1 dashboard.
- 1-week slice: funnels (setup → usage) + alerts.
- OSS accelerators:
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/posthog-posthog.md`
- Competitors proving demand:
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/posthog.md`

Scores (0–10):
- ROI: 7
- Feasibility: 7
- Integration leverage: 7
- Maintenance risk (reverse): 6
- Evidence strength: 7
- Total (/50): 34

### 8) Search + merchandising rules (boost/bury, synonyms)

- Category: Merchandising / CRO
- Target user: merchant admin
- Job to be done: improve discovery and conversion without engineers.
- Why it matters (ROI): direct CRO wins.
- Fastest path: integrate search engine + build merch UI.
- Thin slice (1–3 days): search service + basic query UI + synonyms table.
- 1-week slice: boost/bury rules + analytics.
- OSS accelerators (links):
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/opensearch-project-opensearch.md` (Apache-2.0 expected; verify)
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/typesense-typesense.md` (GPL; flag)
- Competitors proving demand:
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/algolia.md`

Scores (0–10):
- ROI: 7
- Feasibility: 6
- Integration leverage: 7
- Maintenance risk (reverse): 6
- Evidence strength: 6
- Total (/50): 32

### 9) Customer support “actions” (refund/replace) from the inbox

- Category: Customer / support
- Target user: internal ops (primary), merchant admin (secondary)
- Job to be done: resolve issues without context-switching across tools.
- Why it matters (ROI): less support time; fewer mistakes.
- Fastest path: build embedable “order context panel” + action APIs.
- Thin slice (1–3 days): show order context inside ticket view + 1 safe action.
- 1-week slice: templates/macros + action guardrails + audit log.
- Competitors proving demand:
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/gorgias.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/zendesk.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/intercom.md`

Scores (0–10):
- ROI: 7
- Feasibility: 6
- Integration leverage: 6
- Maintenance risk (reverse): 6
- Evidence strength: 7
- Total (/50): 32

### 10) CMS for marketing/admin content ops

- Category: Content / SEO
- Target user: internal ops (primary), merchant admin (secondary)
- Job to be done: ship content/announcements/help docs without dev bottlenecks.
- Why it matters (ROI): faster iteration; better self-serve content ops.
- Fastest path: integrate CMS (service boundary) + embed surfaces.
- Thin slice (1–3 days): 1 content type + read-only embed in admin.
- 1-week slice: permissions + workflows + publishing states.
- OSS accelerators:
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/payloadcms-payload.md`
- Competitors proving demand:
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/payload-cms.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/strapi.md`

Scores (0–10):
- ROI: 6
- Feasibility: 7
- Integration leverage: 8
- Maintenance risk (reverse): 6
- Evidence strength: 7
- Total (/50): 34

## Remaining features (not yet scorecarded)

- See `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-01-feature-hunt-oss-harvest-015445/artifacts/features-catalog.md`

---

## 11–20 (next batch; evidence-backed)

### 11) Subscription management portal (self-serve pause/skip/swap)

- Category: Retention / lifecycle
- Target user: merchant admin
- Job to be done: reduce churn + reduce support load for subscription brands.
- Why it matters (ROI): direct retention and support savings.
- Fastest path: integrate first (provider) + build best-in-class UI
- Thin slice (1–3 days): show subscription status + allow pause/skip (read + 1 write action).
- 1-week slice: swap, frequency changes, “next order” edits, dunning/retry visibility.
- Dependencies (data/integrations): subscription provider, customer identity, audit log.
- OSS accelerators (links): (none obvious; likely integrate + build)
- Competitors proving demand (links):
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/recharge.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/skio.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/ordergroove.md`

Scores (0–10):
- ROI: 8
- Feasibility: 6
- Integration leverage: 6
- Maintenance risk (reverse): 6
- Evidence strength: 8
- Total (/50): 34

### 12) Shipping ops: batch labels + rules engine + exception queues

- Category: Admin / operations
- Target user: merchant admin | internal ops (both)
- Job to be done: fulfill orders faster with fewer mistakes.
- Why it matters (ROI): ops time saved + fewer fulfillment errors.
- Fastest path: integrate (carrier/label APIs) + build ops UI
- Thin slice (1–3 days): order import view + bulk “create label” + tracking update.
- 1-week slice: rules engine (carrier/service selection) + exception queue + retries.
- Dependencies: carrier APIs, orders model, audit log, background jobs.
- OSS accelerators: (likely service integrations; not a single obvious OSS drop-in)
- Competitors proving demand:
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/shipstation.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/shippo.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/easypost.md`

Scores (0–10):
- ROI: 7
- Feasibility: 6
- Integration leverage: 7
- Maintenance risk (reverse): 6
- Evidence strength: 7
- Total (/50): 33

### 13) Reviews/UGC moderation + incentives workflow

- Category: Customer / support + Merchandising / CRO
- Target user: merchant admin
- Job to be done: collect authentic social proof while controlling quality.
- Why it matters (ROI): conversion lift + trust.
- Fastest path: build workflow UI + integrate later as needed
- Thin slice (1–3 days): moderation queue (approve/reject) + publish states.
- 1-week slice: review request scheduling + templating + basic incentives guardrails.
- Competitors proving demand:
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/judge-me.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/loox.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/yotpo.md`

Scores (0–10):
- ROI: 7
- Feasibility: 7
- Integration leverage: 5
- Maintenance risk (reverse): 7
- Evidence strength: 7
- Total (/50): 33

### 14) Lifecycle journeys (email/SMS) + segmentation

- Category: Retention / lifecycle
- Target user: merchant admin
- Job to be done: drive retention without manual campaigns.
- Why it matters (ROI): recurring revenue lift.
- Fastest path: integrate providers first; keep orchestration minimal early
- Thin slice (1–3 days): build segments + send a single campaign (via provider) + basic reporting.
- 1-week slice: simple journeys (trigger → message → stop conditions) + suppression rules.
- Competitors proving demand:
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/klaviyo.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/postscript.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/attentive.md`

Scores (0–10):
- ROI: 8
- Feasibility: 5
- Integration leverage: 7
- Maintenance risk (reverse): 5
- Evidence strength: 8
- Total (/50): 33

### 15) CDP-lite: unified customer profile + “destinations” integrations

- Category: Platform primitives
- Target user: internal ops (primary)
- Job to be done: unify identity and route events/data to tools cleanly.
- Why it matters (ROI): reduces integration debt, enables personalization/analytics later.
- Fastest path: build thin “destinations” layer (start with 2–3) + keep scope small
- Thin slice (1–3 days): event sink + 1 destination + basic failure logs.
- 1-week slice: audience builder (simple) + governance (schema checks) + retries.
- Competitors proving demand:
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/segment.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/rudderstack.md`

Scores (0–10):
- ROI: 7
- Feasibility: 5
- Integration leverage: 5
- Maintenance risk (reverse): 4
- Evidence strength: 7
- Total (/50): 28

### 16) Embed BI dashboards for ops (tenant-safe)

- Category: Analytics / experiments
- Target user: internal ops (primary), merchant admin (secondary)
- Job to be done: ship dashboards and reporting without building BI.
- Why it matters (ROI): faster insights and iteration.
- Fastest path: integrate (BI) + embed
- Thin slice (1–3 days): embed 1 dashboard + enforce tenant scoping.
- 1-week slice: template dashboards + saved filters + scheduled reports.
- OSS accelerators:
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/apache-superset.md` (Apache-2.0)
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/getredash-redash.md` (BSD)
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/metabase-metabase.md` (AGPL; flag)
- Competitors proving demand:
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/metabase.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/apache-superset.md`

Scores (0–10):
- ROI: 6
- Feasibility: 6
- Integration leverage: 8
- Maintenance risk (reverse): 5
- Evidence strength: 7
- Total (/50): 32

### 17) Draft/preview/publish approvals (generic admin primitive)

- Category: Platform primitives
- Target user: internal ops (primary)
- Job to be done: ship changes safely with review and rollback.
- Why it matters (ROI): fewer mistakes; auditability.
- Fastest path: build the primitive (can power content, promos, configs)
- Thin slice (1–3 days): draft + publish state machine for one object type.
- 1-week slice: approvals/roles + audit history + diffs.
- Competitors proving demand:
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/webflow.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/contentful.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/sanity.md`

Scores (0–10):
- ROI: 7
- Feasibility: 7
- Integration leverage: 4
- Maintenance risk (reverse): 7
- Evidence strength: 7
- Total (/50): 32

### 18) Experimentation framework (A/B tests) with guardrails

- Category: Analytics / experiments
- Target user: internal ops (primary)
- Job to be done: run experiments safely and measure outcomes.
- Why it matters (ROI): compounding CRO improvements.
- Fastest path: integrate (OSS experimentation) + minimal UI
- Thin slice (1–3 days): create experiment + assign variants + report a single metric.
- 1-week slice: guardrails (sample size, stop rules) + audit trail.
- OSS accelerators:
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/growthbook-growthbook.md`
- Competitors proving demand:
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/vwo.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/optimizely.md`

Scores (0–10):
- ROI: 7
- Feasibility: 6
- Integration leverage: 8
- Maintenance risk (reverse): 5
- Evidence strength: 7
- Total (/50): 33

### 19) Personalization/recommendations (basic, rules-first)

- Category: Merchandising / CRO
- Target user: merchant admin
- Job to be done: increase AOV and conversion via targeted recommendations.
- Why it matters (ROI): direct CRO lift.
- Fastest path: start rules-first; add ML later
- Thin slice (1–3 days): rules-based recommendations for 1–2 placements.
- 1-week slice: segment-based targeting + performance reporting.
- Competitors proving demand:
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/nosto.md`

Scores (0–10):
- ROI: 7
- Feasibility: 5
- Integration leverage: 4
- Maintenance risk (reverse): 5
- Evidence strength: 6
- Total (/50): 27

### 20) Integration setup wizard + run logs + retries (generic “connectors” primitive)

- Category: Platform primitives
- Target user: internal ops (primary), merchant admin (secondary)
- Job to be done: connect tools safely and make failures debuggable.
- Why it matters (ROI): reduces integration toil; unlocks automations faster.
- Fastest path: build the primitive UI + keep connectors small
- Thin slice (1–3 days): connector setup wizard + run history table for 1 integration.
- 1-week slice: retries, alerts, and “test connection” with validation.
- Competitors proving demand:
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/airbyte.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/zapier.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/pipedream.md`

Scores (0–10):
- ROI: 7
- Feasibility: 6
- Integration leverage: 6
- Maintenance risk (reverse): 6
- Evidence strength: 7
- Total (/50): 32

### 21) Profit-first reporting (true profit cockpit: costs + ad spend + product profit)

- Category: Analytics / finance ops
- Target user: merchant admin (primary), internal ops (secondary)
- Job to be done: make decisions based on *profit* (not just revenue/ROAS), with costs + ad spend included.
- Why it matters (ROI): margin protection and better budget allocation; makes “growth” decisions less misleading.
- Fastest path: integrate-first (cost/ad connectors) + build a narrow “profit dashboard” UX.
- Thin slice (1–3 days): show “true profit” dashboard for 1 store, with manual cost inputs + scheduled digest.
- 1-week slice: connect ad spend + shipping costs and add product-level profit drilldowns + exceptions.
- Competitors proving demand:
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/trueprofit.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/northbeam.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/daasity.md`
- OSS accelerators:
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/apache-superset.md` (embed dashboards; Apache-2.0 expected)
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/posthog-posthog.md` (events/insights layer; MIT)

Scores (0–10):
- ROI: 8
- Feasibility: 6
- Integration leverage: 7
- Maintenance risk (reverse): 6
- Evidence strength: 7
- Total (/50): 34

### 22) Store credit refunds (returns → retention wedge)

- Category: Post-purchase ops + retention
- Target user: merchant admin (primary), internal ops (secondary)
- Job to be done: reduce revenue loss from returns while improving retention (store credit refunds + exchange-first routing).
- Why it matters (ROI): margin protection + repeat purchase lift; decreases support load (clear options at return time).
- Fastest path: build/integrate (policy rules + store credit issuance) and keep the UI tightly scoped.
- Thin slice (1–3 days): offer store credit as a first-class return resolution option (manual issuance + audit log).
- 1-week slice: policy routing (when to allow store credit vs refund vs exchange) + automatic issuance + messaging hooks.
- Competitors proving demand:
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/rise-ai.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/loop-returns.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/returngo.md`

Scores (0–10):
- ROI: 8
- Feasibility: 7
- Integration leverage: 6
- Maintenance risk (reverse): 6
- Evidence strength: 7
- Total (/50): 34
