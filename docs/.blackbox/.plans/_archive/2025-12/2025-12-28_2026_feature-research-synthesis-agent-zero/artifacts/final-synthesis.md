# Final Synthesis (initial)

This is the build-oriented synthesis of:
- 100 competitor landscape (seeded + evidence snapshots)
- OSS accelerators (ranked shortlist)
- full feature inventory

Primary lens: **vibe coding** → integrate existing code or ship an MVP efficiently.

---

## Where the data lives

### Competitors (100)
- Index: `docs/.blackbox/.plans/2025-12-28_2026_feature-research-synthesis-agent-zero/artifacts/market/competitors/index.md`
- Entries: `docs/.blackbox/.plans/2025-12-28_2026_feature-research-synthesis-agent-zero/artifacts/market/competitors/entries/`
- Snapshot triage: `docs/.blackbox/.plans/2025-12-28_2026_feature-research-synthesis-agent-zero/artifacts/market/competitors/triage.md`
- Deepening queue (top 25): `docs/.blackbox/.plans/2025-12-28_2026_feature-research-synthesis-agent-zero/artifacts/market/competitors/deepening-queue.md`
- Evidence: `docs/.blackbox/.plans/2025-12-28_2026_feature-research-synthesis-agent-zero/artifacts/market/logs/snapshots/`

### OSS (33 so far)
- Scored index: `docs/.blackbox/.plans/2025-12-28_2026_feature-research-synthesis-agent-zero/artifacts/market/oss/index.md`
- OSS triage: `docs/.blackbox/.plans/2025-12-28_2026_feature-research-synthesis-agent-zero/artifacts/market/oss/triage.md`
- Top 20 shortlist: `docs/.blackbox/.plans/2025-12-28_2026_feature-research-synthesis-agent-zero/artifacts/market/oss/shortlist-top20.md`
- OSS deepening queue (top 20): `docs/.blackbox/.plans/2025-12-28_2026_feature-research-synthesis-agent-zero/artifacts/market/oss/deepening-queue.md`
- Ranked shortlist: `docs/.blackbox/.plans/2025-12-28_2026_feature-research-synthesis-agent-zero/artifacts/oss-ranked.md`
- Entries: `docs/.blackbox/.plans/2025-12-28_2026_feature-research-synthesis-agent-zero/artifacts/market/oss/entries/`

### Feature universe
- Inventory: `docs/.blackbox/.plans/2025-12-28_2026_feature-research-synthesis-agent-zero/artifacts/market/features/index.md`
- Ranked (top 30): `docs/.blackbox/.plans/2025-12-28_2026_feature-research-synthesis-agent-zero/artifacts/features-ranked.md`

---

## The “vibe coding” plan (how we build fast without chaos)

### Principle A — Don’t build primitives twice

We should not hand-roll:
- admin CRUD scaffolding (tables/filters/forms)
- feature flags + entitlements
- basic analytics dashboards
- workflow/job execution primitives

Instead: integrate a proven OSS layer where possible, then put our differentiated UX/workflows on top.

### Principle B — Differentiate on workflows + safety + quality

Competitors are strong at:
- “tools” (point solutions)
- “platforms” (big commerce stacks)

Our differentiation should be:
- a unified **admin + ops layer** for Shopify-connected brands
- workflows that are safe (audit logs, approvals)
- AI assist that is grounded + explainable

---

## Recommended “first build” modules (top 10)

1) **Admin foundation**: RBAC + audit logs + saved views + bulk ops  
2) **Returns + exchanges**: portal + store-credit rules + workflows  
3) **Workflow engine layer**: jobs + retries + approvals + run logs  
4) **Search + merch rules**: synonyms/boosts + admin controls  
5) **Analytics dashboards**: funnels + cohorts + anomaly alerts  
6) **Content ops**: CMS + preview + publish gates  
7) **Segmentation (RFM)**: segments powering retention + personalization  
8) **Feature flags / entitlements**: per-client module toggles  
9) **Unified customer timeline**: orders/returns/tickets + “ops notes”  
10) **Media library QA**: asset quality + SEO hygiene

---

## OSS accelerators (what to integrate first)

These are “most likely to pay off quickly” candidates from the ranked OSS shortlist:

- Admin scaffolding: `marmelab/react-admin`, `refinedev/refine`
- CMS: `payloadcms/payload` (TS-first), `directus/directus` / `strapi/strapi`
- Search: `meilisearch/meilisearch` or `typesense/typesense`
- Flags: `Unleash/unleash`, `growthbook/growthbook`, `Flagsmith/flagsmith`
- Analytics: `PostHog/posthog`, `metabase/metabase`, `umami-software/umami`
- Workflow execution: `temporalio/temporal`, `kestra-io/kestra`, (evaluate `n8n-io/n8n` license carefully)

---

## Decisions needed before coding (so we don’t waste cycles)

See: `docs/.blackbox/.plans/2025-12-28_2026_feature-research-synthesis-agent-zero/artifacts/open-questions.md`

Top decisions:
1) License policy (flag vs exclude copyleft)
2) Which workflow engine (Temporal/Kestra vs queue-first)
3) CMS choice (Payload vs Directus vs Strapi vs none)
4) Search choice (Meilisearch vs Typesense vs vendor)
