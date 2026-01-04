# Features Ranked (provisional)

This is the **vibe-coding** ranking: prioritize features that are high leverage *and* have a realistic “integrate or ship MVP fast” path.

Source inventory:
- `docs/.blackbox/.plans/2025-12-28_2026_feature-research-synthesis-agent-zero/artifacts/market/features/index.md`

Supporting evidence:
- competitor snapshots: `docs/.blackbox/.plans/2025-12-28_2026_feature-research-synthesis-agent-zero/artifacts/market/logs/snapshots/`

## Scoring rubric

See: `docs/.blackbox/.plans/2025-12-28_2026_feature-research-synthesis-agent-zero/artifacts/market/process/rubric.md`

---

## Top 30 (initial pass)

### 1) Admin RBAC + permissions + audit logs (platform primitive)
- Why: table-stakes for “real admin”; enables safe delegation and AI actions with accountability.
- MVP: roles, per-route gates, audit log table + UI, “who changed what”.
- OSS accelerators: `Unleash/unleash` (entitlements as flags), admin frameworks (`marmelab/react-admin`, `refinedev/refine`).

### 2) Returns portal + exchanges + store credit rules
- Why: returns are a major pain; improving it saves support cost and retains revenue.
- MVP: return reasons + store credit vs refund rules + exchange flow.
- OSS accelerators: none perfect end-to-end; integrate with returns providers; workflow layer for policy.

### 3) Workflow automation layer (durable jobs + approvals)
- Why: differentiator for ops; enables AI workflows and policy enforcement.
- MVP: triggers + tasks + retries + run logs + “approve/deny”.
- OSS accelerators: `temporalio/temporal`, `kestra-io/kestra`, `n8n-io/n8n` (depending on license/embedding).

### 4) Search + merchandising controls (synonyms, boosts, rules)
- Why: direct conversion impact; easy to ship and obviously valuable.
- MVP: index products + search UI + synonym/rules admin.
- OSS accelerators: `meilisearch/meilisearch`, `typesense/typesense`.

### 5) Analytics dashboards (funnels + cohort + “what changed”)
- Why: merchants want to understand: “what worked, what broke, what to fix”.
- MVP: basic funnels, retention cohorts, anomaly alerts.
- OSS accelerators: `PostHog/posthog`, `metabase/metabase` (BI), `umami-software/umami` (lightweight).

### 6) Content ops: CMS + publish workflow + preview
- Why: marketing velocity + fewer “engineering-only” updates.
- MVP: headless CMS + drafts + approval + preview URLs.
- OSS accelerators: `payloadcms/payload`, `strapi/strapi`, `directus/directus`.

### 7) Segmentation (RFM) + lifecycle triggers
- Why: unlocks personalization + retention workflows.
- MVP: basic segments + scheduled recompute + integration hooks.
- OSS accelerators: analytics tools for event storage + queries; can be internal at first.

### 8) Feature flags + per-client entitlements
- Why: makes “custom builds” feel SaaS-like; safe rollouts.
- MVP: flags + targeting rules + environment support.
- OSS accelerators: `Unleash/unleash`, `Flagsmith/flagsmith`, `growthbook/growthbook`.

### 9) Unified customer timeline (orders, tickets, returns, comms)
- Why: reduces support time and error rate.
- MVP: timeline UI + key events + links to systems of record.
- OSS accelerators: helpdesk integrations; internal UI frameworks help ship fast.

### 10) Media library + asset QA (alt text, sizes, compression)
- Why: content quality + SEO + brand consistency.
- MVP: asset store + transforms + “fails QA” queue.
- OSS accelerators: CMS platforms + storage tooling.

### 11) A/B testing (simple experiments + reporting)
- Why: CRO acceleration; differentiator when baked into workflows.
- MVP: experiment toggle + assignment + metric tracking.
- OSS accelerators: `growthbook/growthbook` (experimentation oriented).

### 12) Bulk ops (imports/exports, bulk edits, saved views)
- Why: makes admin feel “real” and saves hours/week.
- MVP: CSV import/export + bulk edit UI + saved filters.
- OSS accelerators: admin frameworks (react-admin/refine).

### 13) Order exceptions: “where is my order” + delivery exceptions
- Why: deflect support; makes CX feel polished.
- MVP: tracking ingestion + customer portal + rules.
- OSS accelerators: tracking providers; workflows for exception routing.

### 14) Bundles / kits / subscriptions (table-stakes in DTC)
- Why: revenue lift + retention.
- MVP: simple bundles + subscription portal integration.
- OSS accelerators: evaluate build vs integrate; many solutions are SaaS.

### 15) AI assist (grounded) for ops and support
- Why: positioning; saves time *if auditable*.
- MVP: suggestion UI + sources + “apply” workflow + audit log.
- OSS accelerators: internal; rely on workflows + auditability.

### 16) Review/approval queues (publishing gates)
- Why: safety + team collaboration.
- MVP: status transitions + approvals + comments.

### 17) Personalization rules (segments → content/merch)
- Why: conversion lift; differentiator if easy to configure.
- MVP: segment rules + placements.

### 18) “Ops notes” on entities (customer/order/product)
- Why: lightweight but high leverage; reduces tribal knowledge loss.
- MVP: comments + @mentions + history.

### 19) Inventory analytics (stockouts, aging, reorder prompts)
- Why: ops ROI; easy to justify.
- MVP: dashboards + alerts.

### 20) Post-purchase upsells + cross-sell rules
- Why: revenue.
- MVP: rules engine + placements.

### 21) SEO controls + redirect management
- Why: growth; table-stakes.
- MVP: meta + redirects + QA.

### 22) Event log + replay for webhooks
- Why: reliability; debug speed; reduces fear.
- MVP: store webhook payloads + replay UI.

### 23) Pricing/packaging + “modules” UI
- Why: sets up SaaS direction.
- MVP: entitlements UI + flags.

### 24) Fraud/abuse signals (returns + chargebacks)
- Why: margin protection.
- MVP: scoring + rules.

### 25) Support macros + suggested replies
- Why: agent productivity.
- MVP: canned responses + knowledge links.

### 26) Shipping rules + carrier selection
- Why: cost reduction.
- MVP: rules + reporting.

### 27) Automated classification (return reasons/tickets)
- Why: unlocks automation.
- MVP: labels + triage.

### 28) Anomaly detection (refund spikes, conversion drops)
- Why: early warning.
- MVP: thresholds + alerts.

### 29) Collaboration: tasks + assignments + SLA
- Why: makes workflows “real”.
- MVP: tasks + owners + due dates.

### 30) Self-serve policy center + knowledge base
- Why: deflect support.
- MVP: policy pages + search.
