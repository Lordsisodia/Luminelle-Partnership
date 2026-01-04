---
status: draft
last_reviewed: 2025-12-29
owner: agent-zero
---

# Real Research Digest (Skimmable)

This is a **skimmable, “what did we actually learn”** digest produced from:
- 102 evidence-backed competitor deep dives (core + adjacent)
- OSS shortlist + web/GitHub supplement

If you only read one file, read this.

## ✅ Current totals (hard counts)

- Competitors seeded: 102
- Evidence-backed competitor deep dives (with snapshot-derived evidence files): 102
  - Core: 53
  - Adjacent: 49
- OSS projects captured (repo entries): 45
- Ranked outputs:
  - Features: top 20 scorecards
  - OSS: top 25 scorecards (metadata-scored; usefulness still needs manual fill)
  - Evidence crosswalk: top 20 rows

## 🔥 Top 10 “stealable” admin primitives (repeated across competitors)

1) **Rollouts + safety rails**: feature flags, segments, environments, gradual rollout, rollback.
2) **Auditability**: “who changed what” with search/filter/diff.
3) **Permissions**: RBAC, role templates, and per-resource gating.
4) **Run logs**: a “runs” table for anything async (automation, connectors, jobs).
5) **Retries + error handling**: retry buttons, failure reasons, backoff, alerts.
6) **Setup wizards**: step-by-step connector setup with validation and “test connection”.
7) **Queues + bulk actions**: batch ops for shipping, moderation, support, inventory tasks.
8) **Status state machines**: clear states, next actions, and timelines (returns/shipping/content).
9) **Templates**: reusable “automations” / “journeys” / “workflows” starter gallery.
10) **Preview/publish lifecycles**: draft → preview → publish, with approvals.

## 🧩 Top 20 workflows to copy (concrete, step-by-step)

These are the workflows we can “vibe code” fastest as **UI + state machine + integrations**.

1) Feature rollout: create flag → target tenants → ramp % → monitor → rollback.
2) Automation: pick trigger → add steps → test → enable → view run history → retry failures.
3) Connector: choose tool → authenticate → validate → sync → view errors → retry.
4) Returns: initiate → reason capture → route to exchange/refund → label → restock → resolution.
5) Shipping: import orders → batch labels → carrier rules → exceptions queue → update tracking.
6) Support: triage queue → assign → macro/reply → take action (refund/replace) → audit log.
7) Subscription: show status → pause/skip/swap → dunning visibility → retention offers.
8) Merchandising: synonyms/boost rules → deploy → query analytics → iterate relevance.
9) Personalization: choose segment → configure placements → launch → measure lift → iterate.
10) Reviews: collect → moderate/approve → publish → monitor abuse/incentives.
11) Inventory: receive → allocate → pick/pack → reconcile discrepancies → alert low stock.
12) Content: model → draft → preview → approve → publish → monitor outcomes.
13) Analytics: instrument events → dashboards → funnels/cohorts → alerts → investigate.
14) Experimentation: hypothesis → variants → assign → measure → winner → publish.
15) Customer profile: unify IDs → timeline → actions panel → history/audit.
16) Ops reporting: embed dashboard → template → schedule report → export.
17) Pricing/packaging: plan limits → upgrade prompts → enforcement → audit.
18) Access governance: role templates → least privilege → approvals → audit.
19) Exceptions loop: “needs attention” queue → reason → recommended fix → resolve.
20) Change management: diff view → approvals → rollout windows → rollback plan.

## 🧰 OSS “cool code” shortlist (highest leverage)

These are the best “fast integration” accelerators right now.

### ✅ License-safe (best first)

- `marmelab/react-admin` (MIT) — admin UI scaffolding (lists/filters/bulk actions).
- `refinedev/refine` (MIT) — admin framework patterns (auth/routing/data providers).
- `Unleash/unleash` (Apache-2.0) — feature flags server.
- `Flagsmith/flagsmith` (BSD-3-Clause) — flags + remote config (service boundary).
- `payloadcms/payload` (MIT) — CMS + admin UX for content ops.
- `appwrite/appwrite` (BSD-3-Clause) — reference patterns for dashboard UX (don’t replatform).
- `novuhq/novu` (MIT) — notifications primitives (service boundary).
- `open-policy-agent/opa` (Apache-2.0) — policy engine (guardrails; service boundary).
- `casbin/casbin` (Apache-2.0) — RBAC/ABAC enforcement library.
- `temporalio/temporal` (MIT) — workflow orchestration backbone (heavy but high leverage).

### ⚠️ Verify license before use (metadata unclear)

- `n8n-io/n8n` — automation engine (Sustainable Use License; **not open-source** → inspiration only unless explicitly approved).
- `growthbook/growthbook` — experimentation + flags (MIT; verified in sweep 001).
- `metabase/metabase` — BI dashboards (**AGPL-3.0**; treat as copyleft).
- `meilisearch/meilisearch` — search engine (**BUSL-1.1**; not open-source).
- `airbytehq/airbyte` — ELT (**ELv2**; not open-source; treat as restricted).

Suggested permissive alternative for automation:
- `activepieces/activepieces` (MIT) — workflow automation primitives (better default than n8n for embedding).

### 🧨 Flagged (copyleft)

- `ToolJet/ToolJet` (AGPL-3.0) — likely “flag only” unless explicitly approved.
- `typesense/typesense` (GPL-3.0) — likely “flag only” unless explicitly approved.

## 🏁 Where to open next (fast)

- Evidence-backed competitor matrices:
  - Core: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/artifacts/competitor-matrix.md`
  - Adjacent: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/artifacts/competitor-matrix.md`
- Ranked decisions:
  - Features top 20: `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/features-ranked.md`
  - OSS ranked (top 25): `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/oss-ranked.md`
  - Crosswalk top 20: `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/evidence-index.md`
- Web/GitHub OSS supplement:
  - `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/web-oss-competitors-supplement.md`
  - `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/live-web-research-tranche-005-oss-expansion.md`

## ➡️ Next “real research” slice (recommended)

If you want the next step to be **maximum value for building**:

1) Pick 3 features from the top 20.
2) For each, write a 1-day POC plan + 1-week integration plan with exact endpoints/UI screens.
3) Verify licensing for the remaining “unclear” OSS items (prefer permissive; flag source-available / copyleft).
