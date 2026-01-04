---
status: draft
last_reviewed: 2025-12-30
owner: agent-zero
---

# Evidence Index (Ranked, Browse-Friendly)

Purpose: make the research corpus easy to browse without hunting through folders.

This is a **crosswalk**:
- feature idea → competitors proving demand → OSS accelerators → evidence links

## ✅ How to use

- Start at the top 10 rows.
- For each row:
  - confirm competitor evidence exists
  - confirm OSS is license-safe enough for your policy
  - decide: build vs integrate vs buy

## 🔥 Crosswalk (ranked)

| Rank | Feature (short) | Target user | Best competitors (2–3) | Best OSS (1–2) | Fastest path | Evidence links |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Feature flags + staged rollouts | merchant admin + internal ops | LaunchDarkly; Unleash; ConfigCat | Unleash; Flagsmith | integrate | `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/launchdarkly.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/unleash.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/unleash-unleash.md` |
| 2 | Workflow automation hooks | merchant admin + internal ops | Zapier; Make; n8n | Activepieces (MIT); (n8n is license-restricted) | integrate | `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/zapier.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/make.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/activepieces-activepieces.md` |
| 3 | Audit log (“who changed what”) | internal ops | Shopify; enterprise suites | (build) | build | `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/shopify.md` |
| 4 | RBAC + granular permissions | merchant admin + internal ops | Shopify; BigCommerce; enterprise suites | (build) | build | `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/shopify.md` |
| 5 | Returns portal + exchange-first | merchant admin | Loop Returns; ReturnGO; Happy Returns | Medusa (MIT); Saleor (BSD-3-Clause) | build/integrate | `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/loop-returns.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/returngo.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/happy-returns.md` |
| 6 | Unified order timeline (“single pane”) | merchant admin + internal ops | Shopify; Gorgias; ShipStation | react-admin (MIT); Medusa (MIT) | build/integrate | `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/shopify.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/gorgias.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/shipstation.md` |
| 7 | Admin usage analytics | internal ops | PostHog; Amplitude; Mixpanel | PostHog; Metabase | integrate | `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/posthog.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/amplitude.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/posthog-posthog.md` |
| 8 | Search + merchandising rules | merchant admin | Algolia; Klevu; Nosto | OpenSearch (Apache-2.0) | integrate | `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/algolia.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/klevu.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/nosto.md` |
| 9 | Support inbox → action center | internal ops | Gorgias; Zendesk; Intercom | (build) | build | `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/gorgias.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/zendesk.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/intercom.md` |
| 10 | CMS for marketing/admin content ops | merchant admin + internal ops | Webflow; Contentful; Sanity | Payload (MIT) | integrate | `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/webflow.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/contentful.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/sanity.md` |
| 11 | Subscription management portal | merchant admin | Recharge; Skio; Ordergroove | (build/integrate) | integrate-first | `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/recharge.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/skio.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/ordergroove.md` |
| 12 | Shipping ops (batch labels + rules) | merchant admin | ShipStation; Shippo; EasyPost | (build/integrate) | integrate-first | `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/shipstation.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/shippo.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/easypost.md` |
| 13 | Reviews/UGC moderation & incentives | merchant admin | Yotpo; Loox; Judge.me | (build/integrate) | integrate-first | `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/yotpo.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/loox.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/judge-me.md` |
| 14 | Lifecycle journeys (email/SMS) | merchant admin | Klaviyo; Postscript; Attentive | Activepieces (MIT); PostHog (MIT) | integrate | `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/klaviyo.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/postscript.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/attentive.md` |
| 15 | CDP-lite (profiles + destinations) | internal ops | Segment; RudderStack | PostHog (MIT); Activepieces (MIT) | build | `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/segment.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/rudderstack.md` |
| 16 | Embed BI dashboards (tenant-safe) | internal ops | Metabase; Superset | Superset (Apache-2.0) | integrate | `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/apache-superset.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/apache-superset.md` |
| 17 | Draft/preview/publish approvals | internal ops | Webflow; Contentful; Sanity | Payload (MIT); Temporal (MIT) | build | `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/payloadcms-payload.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/temporalio-temporal.md` |
| 18 | Experimentation framework | internal ops | VWO; Optimizely | GrowthBook (verify) | integrate | `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/vwo.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/optimizely.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/growthbook-growthbook.md` |
| 19 | Personalization (rules-first) | merchant admin | Nosto | (build on search + events) | build | `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/nosto.md` |
| 20 | Integration wizard + run logs + retries | internal ops | Airbyte; Zapier; Pipedream | (build primitive) | build | `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/airbyte.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/pipedream.md` |
| 21 | Profit-first reporting (true profit cockpit) | merchant admin + internal ops | TrueProfit; Northbeam; Daasity | Superset (Apache-2.0); PostHog (MIT) | integrate-first | `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/trueprofit.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/northbeam.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/daasity.md` |
| 22 | Store credit refunds (returns → retention) | merchant admin + internal ops | Rise.ai; Loop Returns; ReturnGO | (build primitive) | build/integrate | `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/rise-ai.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/loop-returns.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/returngo.md` |

## 🧠 Notes / heuristics (keep short)

- Prefer at least 2 competitor proofs per top feature.
- Prefer at least 1 OSS accelerator (or clearly state “build primitive”).
- If OSS is copyleft/unknown/fair-code, mark it clearly and do not treat as “safe default”.

## 📍 Key artifacts (links)

- Final synthesis: `artifacts/final-synthesis.md`
- Features ranked: `artifacts/features-ranked.md`
- OSS ranked (safe-only shortlist): `artifacts/oss-ranked-safe-only.md`
- OSS ranked (full, tagged SAFE/FLAG): `artifacts/oss-ranked.md`
- Decision log: `artifacts/open-questions.md`
- Sources: `artifacts/sources.md`
