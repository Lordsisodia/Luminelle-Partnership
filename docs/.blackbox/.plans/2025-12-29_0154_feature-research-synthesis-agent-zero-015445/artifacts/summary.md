---
status: draft
last_reviewed: 2025-12-30
owner: agent-zero
---

# Summary (Synthesis — Agent Zero)

## ✅ 1-line headline

Updated synthesis “single pane of glass” so we can pick a build/integrate sequence for merchant-admin primitives while grounding storefront conversion patterns in women’s fashion benchmark artifacts (evidence pointers included).

## 🧭 Stage

Synthesize

## 🔥 Top 10 recommendations (ranked)

Evidence basis:
- Ranked recommendations: `artifacts/final-synthesis.md`, `artifacts/features-ranked.md`
- Thin-slice specs: `artifacts/thin-slices/README.md`

1) Feature flags + staged rollouts — Why: safer/faster shipping — Fastest path: integrate — Next: implement thin slice `artifacts/thin-slices/01_feature-flags-staged-rollouts-per-tenant.md`
2) Workflow automation hooks (triggers/actions/approvals/run log) — Why: compounding ops value — Fastest path: integrate/build hybrid — Next: implement thin slice `artifacts/thin-slices/02_workflow-automation-hooks-triggers-actions-approvals.md`
3) Audit log (“who changed what”) — Why: reduces costly ops mistakes — Fastest path: build — Next: implement thin slice `artifacts/thin-slices/03_audit-log-who-changed-what.md`
4) RBAC + granular permissions — Why: table stakes for admin actions — Fastest path: build — Next: implement thin slice `artifacts/thin-slices/04_rbac-granular-permissions.md`
5) Returns portal + exchange-first flow — Why: margin protection + retention — Fastest path: build/integrate — Next: implement thin slice `artifacts/thin-slices/05_returns-portal-exchange-first-flow.md`
6) Unified order timeline (“single pane of glass”) — Why: fewer context switches for ops — Fastest path: build/integrate — Next: implement thin slice `artifacts/thin-slices/06_unified-order-timeline-single-pane-of-glass.md`
7) Admin usage analytics — Why: build what merchants actually use — Fastest path: integrate — Next: implement thin slice `artifacts/thin-slices/07_admin-usage-analytics-what-merchants-actually-use.md`
8) Search + merchandising rules (synonyms/boost/bury) — Why: CRO wins, especially in catalog-heavy fashion — Fastest path: integrate — Next: implement thin slice `artifacts/thin-slices/08_search-merchandising-rules-boost-bury-synonyms.md`
9) Support inbox → action center — Why: reduce handling time + unlock safe actions — Fastest path: build — Next: implement thin slice `artifacts/thin-slices/09_support-inbox-action-center.md`
10) CMS for marketing/admin content ops — Why: reduce content bottlenecks — Fastest path: integrate — Next: implement thin slice `artifacts/thin-slices/10_cms-for-marketing-admin-content-ops.md`

## 🧭 Recommended wedge (merchant value): Ops Action Center

- Wedge: **Merchant Ops Action Center** (“workflow compression”) — resolve order issues (shipping/returns/refunds/exchanges) without tool switching.
- Why this wedge: it is the repeated best-in-class pattern across support + returns + shipping tools (embedded context + embedded actions + approvals/audit).
- Where the spec lives:
  - Wedge decision + MVP workflow spec: `artifacts/final-synthesis.md` (sections “1b” and “1c”)
  - Implementation epics (screens/endpoints/tables/states): `artifacts/implementation-epics-action-center-exceptions.md`

Evidence anchors (core competitors):
- Support inbox + embedded actions: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/gorgias.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/re-amaze.md`
- Returns routing & exchange-first: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/loop-returns.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/returngo.md`
- Shipping batch ops/rules: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/shipstation.md`
- Store credit refunds as returns/retention lever: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/rise-ai.md`

## 👗 Women’s fashion benchmarking (storefront conversion patterns)

Baseline research outputs (already complete):
- Benchmark narrative: `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-benchmark.md`
- 100-store list: `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-stores-100.csv`
- 100-store list (enriched w/ snapshot signals): `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-stores-100.enriched.csv`
- 100-store list (scored; segment + heuristic score): `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-stores-100.scored.csv`
- Niche playbook (model stores per niche): `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-niche-playbook.md`
- Feature adoption matrix (tooling signals + store examples): `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-feature-adoption-matrix.md`
- Conversion feature checklist (build/integrate order + evidence tiers): `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-conversion-feature-checklist.md`
- Top shortlists:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-model-stores-top25.md`
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-model-stores-top25-apparel-first.md`
- Audit harness dashboard: `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/DASHBOARD.md`

Automated triage signals (homepage HTML snapshots; heuristic, but useful at scale):
- Bot protection / blocked detected: 21 / 100
- BNPL detected: 42 / 100 (Klarna 29, Afterpay 24, Affirm 8)
- Reviews tooling detected: 38 / 100 (Yotpo 18, Bazaarvoice 10, Okendo 9)
Evidence:
- `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/reports/store-snapshots-summary.csv`
- `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-stores-100.enriched.csv`

Batch‑01 audit status (SKIMS / Reformation / Sézane):
- Screenshot evidence is still missing (needs a human browser capture), but the execution checklist exists:
  - `artifacts/womens-fashion-capture-todo-batch-01.md`
- Desk-research “HTML snapshot” findings (non-visual; use as preflight, not CRO truth):
  - `artifacts/womens-fashion-batch-01-snapshot-findings.md`
- Evidence status / where to look for coverage + auto outputs:
  - `artifacts/womens-fashion-batch-01-evidence-status.md`

Batch‑02 (adjacent categories: activewear / swim / intimates):
- Snapshot-backed preflight findings (non-visual):
  - `artifacts/womens-fashion-batch-02-snapshot-findings.md`
- Screenshot capture checklist (desktop + mobile + exact filenames):
  - `artifacts/womens-fashion-capture-todo-batch-02.md`

Batch‑03 (editorial DTC + inclusive sizing; high reachability stores only):
- Snapshot-backed preflight findings (non-visual):
  - `artifacts/womens-fashion-batch-03-snapshot-findings.md`
- Snapshot notes inserted into audit docs (so screenshot capture is faster):
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/rouje.md`
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/ganni.md`
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/universal-standard.md`
- Screenshot capture checklist (desktop + mobile + exact filenames):
  - `artifacts/womens-fashion-capture-todo-batch-03.md`

Batch‑04 (luxury marketplace + subscription rental):
- Snapshot-backed preflight findings (non-visual):
  - `artifacts/womens-fashion-batch-04-snapshot-findings.md`
- Snapshot notes inserted into audit docs:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/mytheresa.md`
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/rent-the-runway.md`
- Screenshot capture checklist (desktop + mobile + exact filenames):
  - `artifacts/womens-fashion-capture-todo-batch-04.md`

## 🧱 Build backlog (3 epics) for the wedge

1) Epic 1 — Order context + unified timeline (read-only first)
   - Thin slice spec: `artifacts/thin-slices/06_unified-order-timeline-single-pane-of-glass.md`
   - Scope (MVP): “order cockpit” page that aggregates + normalizes data (orders, customer, payments, fulfillment, shipments, returns, messages) into a single chronological timeline.
   - Integration boundary (default): read from Shopify + existing tools; do not try to replace them.
   - Deliverables:
     - Canonical `OrderEvent` model + ingestion adapters (Shopify webhooks + polling fallbacks)
     - Unified timeline UI (filters, event types, deep links back to source systems)
     - “Risk flags” chips (high-value, multiple RMAs, fraud hold) but no write actions yet
   - Outcome: fewer context switches; “everything about an order” in one view.
   - Evidence anchors: support context + order view patterns in `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/gorgias.md`

2) Epic 2 — Support inbox → safe actions (write paths + guardrails)
   - Thin slice spec: `artifacts/thin-slices/09_support-inbox-action-center.md`
   - Scope (MVP): “action panel” that can safely execute a small set of high-frequency operations from a ticket/order view.
   - Integration boundary (default): integrate-first (Shopify Admin APIs + best-of-breed tools), but own the guardrails:
     - RBAC policy checks
     - approvals for high-risk actions
     - audit log for all actions (attempted + succeeded + failed)
   - Deliverables:
     - Action catalog (v1): “issue store credit”, “create return label”, “start exchange”, “reship”, “cancel fulfillment” (exact set depends on Shopify surface area)
     - Approval workflow for risk-scored actions (manual approve/deny with reason)
     - Immutable audit entries linked to order + actor + ticket + external ids
   - Outcome: resolve issues without leaving the inbox; actions protected by RBAC + audit + approvals.
   - Evidence anchors: embedded actions in `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/gorgias.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/re-amaze.md`

3) Epic 3 — Returns policy + resolution (exchange/store-credit/refund) + exception queues
   - Thin slice spec: `artifacts/thin-slices/05_returns-portal-exchange-first-flow.md`
   - Scope (MVP): exchange-first / store-credit-first returns workflow with exceptions surfaced as a queue (not hidden in email threads).
   - Integration boundary (default): build a “policy + orchestration” layer; integrate carriers + label purchase; optionally integrate a returns portal early if needed.
   - Deliverables:
     - Policy primitives: eligibility windows, item conditions, fees, route-to exchange/store credit/refund, fraud/abuse gates
     - Return request state machine + exception reasons (“out of window”, “damaged”, “high risk”, “manual review”)
     - Label + tracking flow (generate label, update timeline events, notify customer)
     - Store credit issuance path (store-credit as retention lever)
   - Outcome: exchange-first + store-credit-first resolution, approvals where needed, and exception visibility.
   - Evidence anchors: returns routing + exchange flows in `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/loop-returns.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/returngo.md`; store credit positioning in `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/rise-ai.md`

## 📌 Secondary wedge candidates (keep queued, don’t lead with them)

- Profit-first reporting (true profit cockpit): strong wedge, but integrate-first to avoid building BI from scratch.
  - Evidence: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/trueprofit.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/northbeam.md`
- Loyalty primitives (points/referrals/VIP tiers) are stable; differentiation is Shopify surface area (POS/checkout extensions) and integrations-first activation.
  - Evidence: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/smile-io.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/loyaltylion.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/growave.md`

## 🧩 Top 10 OSS accelerators (ranked)

Evidence basis:
- Ranked OSS: `artifacts/oss-ranked.md`
- License posture: `artifacts/oss-license-posture.md`, `artifacts/license-overrides.json`, `artifacts/gaps-report.md`
- SAFE-only shortlist: `artifacts/oss-ranked-safe-only.md`
- Policy-adjusted shortlist (SAFE-first): `artifacts/oss-ranked-policy-adjusted.md` (penalty policy: `artifacts/oss-policy-penalties.md`)

License posture legend (operational):
- SAFE = permissive (MIT/Apache-2.0/BSD) and generally usable as an accelerator without copyleft/commercial constraints.
- FLAG = copyleft (GPL/AGPL), mixed licensing, or “source available” / commercial restrictions (BUSL/SUL/ELv2/PROPRIETARY).

1) `marmelab/react-admin` — Covers: admin UI scaffolding — License: MIT — Posture: SAFE — Thin slice: read-only admin shell (evidence: `artifacts/final-synthesis.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/marmelab-react-admin.json`)
2) `refinedev/refine` — Covers: admin framework patterns — License: MIT — Posture: SAFE — Thin slice: CRUD scaffolding for 1 resource (evidence: `artifacts/final-synthesis.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/refinedev-refine.json`)
3) `Unleash/unleash` — Covers: feature flags backend — License: Apache-2.0 — Posture: SAFE — Thin slice: per-tenant gate (evidence: `artifacts/final-synthesis.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/Unleash-unleash.json`)
4) `Flagsmith/flagsmith` — Covers: flags + remote config alternative — License: BSD-3-Clause — Posture: SAFE — Thin slice: service boundary flags POC (evidence: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/flagsmith-flagsmith.json`)
5) `payloadcms/payload` — Covers: CMS/admin UX — License: MIT — Posture: SAFE — Thin slice: embed read-only content ops panel (evidence: `artifacts/final-synthesis.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/payloadcms-payload.json`)
6) `novuhq/novu` — Covers: notifications primitives — License: MIT — Posture: SAFE — Thin slice: event → notify proof (evidence: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/novuhq-novu.json`)
7) `open-policy-agent/opa` — Covers: policy engine guardrails — License: Apache-2.0 — Posture: SAFE — Thin slice: authorize 1 risky action via policy check (evidence: `artifacts/final-synthesis.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/open-policy-agent-opa.json`)
8) `temporalio/temporal` — Covers: workflow orchestration — License: MIT — Posture: SAFE — Thin slice: async job run log and retry semantics (evidence: `artifacts/final-synthesis.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/temporalio-temporal.json`)
9) `opensearch-project/OpenSearch` — Covers: search + relevance primitives (synonyms/boost/bury) — License: Apache-2.0 — Posture: SAFE — Thin slice: product search sandbox w/ rules (evidence: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/opensearch-project-opensearch.json`, `artifacts/license-proof-opensearch-project-opensearch.txt`)
10) `apache/superset` — Covers: BI dashboards — License: Apache-2.0 — Posture: SAFE — Thin slice: “read-only metrics” embed behind auth (evidence: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/apache-superset.json`)

Flagged-but-relevant alternatives (use only with explicit policy exception / service boundary):
- `meilisearch/meilisearch` (MIT AND BUSL-1.1; mixed) — flagged by license posture (evidence: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/meilisearch-meilisearch.json`, `artifacts/oss-license-posture.md`)
- `metabase/metabase` (AGPL-3.0) — copyleft (evidence: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/metabase-metabase.json`, `artifacts/oss-license-posture.md`)

## ⚡ Quick wins (1–3 days)

- Add a real “next actions” queue to the synthesis loop (already generated): `artifacts/next-actions.md`
- Pick 3 women’s fashion stores for manual funnel audits and start capturing evidence (audit harness): `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/DASHBOARD.md`
- Convert one thin slice into a “ready-to-implement” epic card format (sources: `artifacts/thin-slices/README.md`, `artifacts/week-1-backlog.md`)
- Use the local `.blackbox` operator cheat sheet to onboard new agents and keep runs consistent: `artifacts/blackbox-usage-cheatsheet.md`
- The `missing_snapshot` competitor queue is now cleared (0 remaining); the next tranche should focus on “missing OSS accelerators” for top-ranked features (evidence: `artifacts/next-actions.md`, `artifacts/gaps-report.md`).
- OSS mapping has started for the top funnel features:
  - #5 Returns portal now has permissive OSS candidates (Medusa + Saleor).
  - #6 Unified order timeline now has a permissive admin UI accelerator (react-admin) plus an order-domain reference (Medusa).
  (evidence: `artifacts/top-50-market-features.md`, `artifacts/evidence-index.md`)
- OSS mapping expanded to more “missing OSS” rows:
  - #11 Support actions (inbox + safe actions) now points to Chatwoot (MIT) + react-admin.
  - #13 Shipping ops now points to karrio (LGPL; flagged) + Medusa (MIT).
  - #15 Lifecycle journeys now points to PostHog (MIT) + Activepieces (MIT) as orchestration/segmentation primitives.
  (evidence: `artifacts/top-50-market-features.md`)

## 🧱 Medium scope (1–2 weeks)

- Reduce remaining evidence hygiene gaps (fill missing snapshot title/description; review `blocked` items) — Why: keeps dashboards high-signal — Dependencies: small metadata edits + optional alternative evidence sources (evidence: `artifacts/gaps-report.md`)
- Map missing OSS accelerators for the remaining top ranked feature gaps (#3–#4, #11–#21) — Why: reduces build surface area — Dependencies: OSS verification + license review (evidence: `artifacts/gaps-report.md`, `artifacts/next-actions.md`)

## ⚠️ Risks / watch-outs

- Storefront “conversion best practices” can’t be treated as proven without funnel-level evidence — Mitigation: run 3–5 manual audits using the rubric (evidence: `05-planning/research/market-intelligence/ecommerce-benchmarking/manual-funnel-audit-rubric.md`)
- OSS licensing drift (NOASSERTION / copyleft) can quietly contaminate core product — Mitigation: enforce “flagged unless verified” via `artifacts/license-verification-sweep-002.json`
- Gap loop drift risk: clearing `missing_snapshot` requires updating the synthesis `artifacts/competitor-master-table.csv` (not just competitor evidence files) — Mitigation: after resolving snapshots, rerun `.blackbox/scripts/research/audit_intelligence_gaps.py --write` (evidence: `artifacts/gaps-report.md`)
- Some “missing snapshot” rows were resolved by generating stable homepage HTML snapshots for core platforms (Shopify/WooCommerce/BigCommerce) and updating `artifacts/competitor-master-table.csv` so the gap queue reflects reality (evidence: `artifacts/next-actions.md`, `artifacts/gaps-report.md`).
- The “missing snapshot” list is now primarily the remaining long-tail tools (as the tranche loop has cleared multiple top items). Continue in N=3–6 batches to keep the queue high-signal (evidence: `artifacts/gaps-report.md`).

## ❓ Open questions (decision-shaped)

1) Are we prioritizing merchant-admin primitives first (feature flags, automation, audit/RBAC) or storefront conversion mechanics first (PDP/checkout patterns)?
   - Evidence that both tracks exist: `artifacts/final-synthesis.md`, `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-benchmark.md`
2) What is the “integration boundary” policy per primitive (embedded library vs service boundary)?
   - Current assumption: integrate-first behind services (evidence: `artifacts/feature-research-config.yaml`, `artifacts/final-synthesis.md`)

## 🧠 Durable insights (added during autopilot cycle)

- “Known license” is now fully resolved (unknown/NOASSERTION = 0), but “known” does not mean “safe”: we have multiple copyleft (GPL/AGPL/LGPL), license-restricted (SUL/BUSL/ELv2), and mixed-license repos (MIT with enterprise carve-outs) that should be treated as flagged unless we choose a service-boundary + policy exception.  
  Evidence: `artifacts/gaps-report.md`, `artifacts/oss-license-posture.md`
- To keep execution moving, builders should start from either `artifacts/oss-ranked-safe-only.md` (strict) or `artifacts/oss-ranked-policy-adjusted.md` (keeps full list but forces SAFE ahead of FLAG by default).  
  Evidence: `artifacts/oss-ranked-safe-only.md`, `artifacts/oss-ranked-policy-adjusted.md`
- Audit log and RBAC are now backed by concrete competitor evidence links, which upgrades them from “assumed enterprise requirement” to “proven in adjacent primitives we can model”.  
  Evidence: `artifacts/features-ranked.md` and competitor evidence files linked there.
- RBAC can be treated as a policy-evaluation primitive rather than a bespoke rules engine by starting with a well-known authz library that supports “RBAC with domains (tenantId)”.  
  Evidence: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/casbin-casbin.md`
- Feature-flag vendors (e.g. Flagsmith/LaunchDarkly) treat auditability and governance (who changed what, approvals) as first-class, which supports making audit log + RBAC early “safety rails” for all admin primitives.  
  Evidence: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/flagsmith.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/launchdarkly.md`
- The `missing_snapshot` gap signal is driven by `artifacts/competitor-master-table.csv` (`evidence_status`), not by reading competitor evidence extract markdown; to clear gaps honestly, update the master table based on real snapshot file existence and then re-run the gap generator.  
  Evidence: `artifacts/gaps-audit-cycle-02.txt`, `artifacts/competitor-snapshot-reconcile-cycle-02.txt`, `.blackbox/scripts/research/audit_intelligence_gaps.py`
- Reconciling master-table snapshot status against actual snapshot files immediately reduces noise in the gap queue (missing snapshots dropped from 11 → 7 after correcting 4 rows and regenerating the report).  
  Evidence: `artifacts/competitor-snapshot-reconcile-cycle-02.txt`, `artifacts/gaps-report.md`
- Capturing stable homepage snapshots for Algolia/AfterShip/Klaviyo and updating the synthesis master table reduced `missing_snapshot` down to 1 remaining competitor (Adobe Commerce), making the competitor evidence queue essentially “done”.  
  Evidence: `artifacts/competitor-snapshot-reconcile-cycle-07.txt`, `artifacts/gaps-report.md`
- After refreshing the gap report against the current master table, `missing_snapshot` is now 0 and competitor coverage is no longer blocked by snapshot collection (remaining outliers are tracked as `blocked`).  
  Evidence: `artifacts/gaps-report.md`, `artifacts/missing-snapshot-audit-cycle-08.txt`
- Filling `oss_accelerators` + `competitor_proofs` for Audit Log and RBAC eliminated the “missing competitor proofs” gap entirely and reduced “missing OSS accelerators” from 13 → 9.  
  Evidence: `artifacts/top-50-market-features.csv`, `artifacts/gaps-report.md`
- Filling OSS accelerators for subscriptions, UGC moderation, CDP-lite, draft/publish approvals, and personalization brought the Top-50 execution map to complete coverage (missing OSS accelerators = 0, missing competitor proofs = 0). Remaining research bottleneck: license verification (0 unknown/NOASSERTION).  
  Evidence: `artifacts/gaps-report.md`, `artifacts/top-50-market-features.csv`
- License verification tranche reduced unknown/unclear OSS licenses from 17 → 11 by updating step-04 OSS entry JSON `license.spdx_id` fields with evidence-backed license proofs.  
  Evidence: `artifacts/license-verification-tranche-007.md`, `artifacts/gaps-report.md`
- Follow-on license verification reduced unknown/unclear OSS licenses from 11 → 6 and clarified that multiple “MIT Expat” repos have enterprise directories under separate licenses (and Metabase is AGPL-3.0), so “MIT” does not automatically mean “all directories safe”.  
  Evidence: `artifacts/license-verification-tranche-008.md`, `artifacts/gaps-report.md`
- Follow-on license verification reduced unknown/unclear OSS licenses from 6 → 0 by verifying Budibase (GPLv3), Mautic (GPLv3), n8n (Sustainable Use License), Novu (MIT), and Vendure (GPLv3/Commercial dual license).  
  Evidence: `artifacts/license-verification-tranche-009.md`, `artifacts/gaps-report.md`
- Final license classification closed the remaining `NOASSERTION` (Windmill) and brought “Unknown/unclear license” to 0, with evidence-backed “mixed license” notes (AGPL + Apache + proprietary).  
  Evidence: `artifacts/license-verification-tranche-010.md`, `artifacts/license-proof-windmill-labs-windmill.txt`, `artifacts/gaps-report.md`
- Ops Action Center guardrails are now spec’d as **policy keys + default profiles** (conservative vs balanced), including approval thresholds, risk heuristic tunables, and an exceptions state machine (OPEN/RETRYING/NEEDS_MANUAL_REVIEW/RESOLVED) so actions can be shipped safely and deterministically.  
  Evidence: `artifacts/implementation-epics-action-center-exceptions.md`, `artifacts/open-questions.md`

## 📍 Where everything lives

- Final synthesis: `artifacts/final-synthesis.md`
- Features ranked: `artifacts/features-ranked.md`
- OSS ranked: `artifacts/oss-ranked.md`
- Open questions: `artifacts/open-questions.md`
- Sources: `artifacts/sources.md`
