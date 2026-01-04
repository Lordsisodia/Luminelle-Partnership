---
compaction: 0002
created_at: "2026-01-01 00:31"
range: "0011-0020"
max_bytes: 1048576
per_step_budget_bytes: 98304
---

# Compaction 0002 (0011–0020)

## ✅ Summary (fill this after compaction)

- <3–7 bullets capturing the durable takeaways>

## 🧩 Patterns / heuristics (fill this after compaction)

- Prompt improvements:
- Checklist improvements:
- Better stop conditions:

## Steps compacted (trimmed)

### 0011_pattern-mining-vercel-commerce-next-js-blog-taxonomy-evidence.md

---
step: 0011
created_at: "2025-12-31 23:03"
title: "Pattern mining: vercel commerce + Next.js blog + taxonomy evidence"
---

# Step 0011: Pattern mining: vercel commerce + Next.js blog + taxonomy evidence

## ✅ What I did (facts)

- Created 3 evidence artifacts (pattern mining, no cloning/vendoring):
  - `.blackbox/.plans/2025-12-31_2205_oss-sourcing-roadmap-audit-next-lanes/artifacts/poc-vercel-commerce-storefront-primitives.md`
  - `.blackbox/.plans/2025-12-31_2205_oss-sourcing-roadmap-audit-next-lanes/artifacts/poc-timlrx-tailwind-nextjs-blog-primitives.md`
  - `.blackbox/.plans/2025-12-31_2205_oss-sourcing-roadmap-audit-next-lanes/artifacts/poc-shadcn-taxonomy-content-primitives.md`
- Appended “Evidence” links into curation notes for:
  - `vercel/commerce`
  - `timlrx/tailwind-nextjs-starter-blog`
  - `shadcn-ui/taxonomy`

## 🧠 What I learned (new information)

- `vercel/commerce` uses modern Next.js patterns that we can reuse conceptually:
  - server actions for cart mutations + cache tag revalidation
  - cookie-based cart session (`cartId`) + optimistic UI state
  - variant selector guards unavailable combinations and communicates disabled state accessibly
- `timlrx/tailwind-nextjs-starter-blog` provides a clean “content pipeline” decomposition:
  - content model (Contentlayer) + computed fields (reading time + TOC)
  - deterministic MDX component map (TOCInline, Pre, CustomLink, tables, newsletter)
  - SEO + OpenGraph + RSS/sitemap wiring that we can replicate in our stack
- `shadcn-ui/taxonomy` is a strong reference for:
  - TOC extraction (`mdast-util-toc`)
  - TOC UI (IntersectionObserver active-heading highlighting)
  - `rehype-pretty-code` styling selectors (line numbers/highlight/title)

## 🧭 What changes because of this

- We can pause broad “storefront/blog” discovery loops (diminishing returns) and instead:
  - mine these 2–3 canonical references for durable contracts
  - turn the extracted contracts into implementable Blocks Kit tickets/specs
- Evidence artifacts are now directly linked from curation so they flow into shortlist/backlog outputs.

## ➡️ Next step

- Update the roadmap compaction summary (“✅ Summary” + “🧩 Patterns / heuristics”) so the plan reads cleanly.
- Re-render OSS catalog artifacts and confirm the new evidence links show up in `shortlist.md` / `poc-backlog.md`.
- Stop-rule: do not run more broad discovery passes until at least 2 POCs are executed end-to-end (decision recorded).

## 🔗 Links / references

- `.blackbox/oss-catalog/curation.json`
- `.blackbox/oss-catalog/component-source-map.md`
- `.blackbox/oss-catalog/blocks-kit-contracts.md`

---

### 0012_reliability-poc-outbox-inbox-schema-worker-semantics.md

---
step: 0012
created_at: "2025-12-31 23:16"
title: "Reliability POC: outbox/inbox schema + worker semantics"
---

# Step 0012: Reliability POC: outbox/inbox schema + worker semantics

## ✅ What I did (facts)

- Fixed the runnable reliability lane command to point at the correct query bank:
  - `.blackbox/oss-catalog/lanes/reliability-webhooks-idempotency.md`
- Ran a focused outbox/idempotency discovery pass; it yielded 0 net-new curated additions (already-seen candidates).
- Tightened curation tagging for existing reliability candidates (added `webhooks`/`workflows` tags) and promoted the highest-fit one to POC:
  - `Zehelein/pg-transactional-outbox` → `status=poc`
- Produced a concrete evidence artifact for the POC (schema + worker semantics + mapping to Lumelle):
  - `.blackbox/.plans/2025-12-31_2205_oss-sourcing-roadmap-audit-next-lanes/artifacts/poc-pg-transactional-outbox-reliability-primitives.md`
- Added reliability file pointers into the evergreen component source map:
  - `.blackbox/oss-catalog/component-source-map.md`
- Re-rendered catalog outputs so the new POC + evidence shows up in shortlist/backlog.

## 🧠 What I learned (new information)

- The highest-leverage reliability work is no longer “find more repos” but “extract a durable schema + worker loop”:
  - this repo provides a very clear reference schema with `segment` + `concurrency` + `locked_until` (lease) + attempts counters.
- Polling mode is the best v1 approach for us (lower operational complexity than logical replication):
  - logical replication introduces replication slots + failover/migration considerations; polling is easier to operate and still robust with leases + locks.

## 🧭 What changes because of this

- We can implement a first-pass webhook inbox/outbox system from a well-defined contract:
  - sequential per `segment` (e.g. `order_id`) with parallelism across segments
  - retries + poison thresholds + cleanup/retention knobs are now explicitly defined
- Tag coverage for `webhooks`/`workflows` in curation improved, making future gap analysis more accurate.

## ➡️ Next step

- Convert the evidence artifact into an implementable “Lumelle runtime spec”:
  - propose the exact v1 tables (`webhook_inbox`, `outbox_events`) and worker loop semantics in a dedicated doc/ticket
  - define the idempotency key strategy for Shopify topics that lack stable external ids
- Stop rule: do not run further generic outbox discovery unless a specific gap is identified (e.g., “TypeScript inbox library with proven production use”).

## 🔗 Links / references

- `.blackbox/oss-catalog/lanes/reliability-webhooks-idempotency.md`
- `.blackbox/oss-catalog/component-source-map.md`
- `.blackbox/oss-catalog/curation.json`
- `.blackbox/.plans/2025-12-31_2205_oss-sourcing-roadmap-audit-next-lanes/artifacts/poc-pg-transactional-outbox-reliability-primitives.md`

---

### 0013_reliability-blueprint-lumelle-webhook-inbox-outbox-v1-spec.md

---
step: 0013
created_at: "2025-12-31 23:20"
title: "Reliability blueprint: Lumelle webhook inbox + outbox v1 spec"
---

# Step 0013: Reliability blueprint: Lumelle webhook inbox + outbox v1 spec

## ✅ What I did (facts)

- Converted mined reliability evidence into an implementable Lumelle v1 spec (polling-first):
  - Added a “Lumelle v1 blueprint” section to `.blackbox/oss-catalog/lanes/reliability-webhooks-idempotency.md`
    - `webhook_inbox` table: dedupe keys + segment ordering + worker state
    - `outbox_events` table: exactly-once effects publication + worker state
    - polling worker semantics (lease + retries + poison + cleanup)
    - Shopify idempotency key guidance for topics without stable external ids
- Linked this full reliability spec from the Shopify app primitives blueprint:
  - `.blackbox/oss-catalog/shopify-app-primitives.md`
- Re-rendered OSS catalog artifacts so execution views stay current.

## 🧠 What I learned (new information)

- The value is in the *combination* of schema + worker semantics:
  - a “webhook_deliveries” table without leases, retries, and ordering rules is not sufficient for at-least-once correctness.
- Segment-first ordering (e.g. per `order_id`) is the simplest way to prevent dangerous out-of-order ops actions while still allowing global throughput.

## 🧭 What changes because of this

- We can stop additional reliability discovery runs unless a specific gap is identified (e.g., “production-proven TypeScript inbox middleware”).
- The next work item is no longer “research” but “implementation”: create DB migrations + worker + dashboards according to this spec.

## ➡️ Next step

- Translate the spec into 2–3 implementable engineering tickets:
  - DB migrations for `webhook_inbox` + `outbox_events`
  - polling worker process (lease/retry/poison/cleanup)
  - golden test cases (duplicate delivery, crash mid-flight, replay)

## 🔗 Links / references

- `.blackbox/oss-catalog/lanes/reliability-webhooks-idempotency.md`
- `.blackbox/oss-catalog/shopify-app-primitives.md`
- `.blackbox/.plans/2025-12-31_2205_oss-sourcing-roadmap-audit-next-lanes/artifacts/poc-pg-transactional-outbox-reliability-primitives.md`

---

### 0014_poc-hardening-opa-retraced-hydrogen-evidence-pointers.md

---
step: 0014
created_at: "2025-12-31 23:32"
title: "POC hardening: OPA + Retraced + Hydrogen evidence + pointers"
---

# Step 0014: POC hardening: OPA + Retraced + Hydrogen evidence + pointers

## ✅ What I did (facts)

- Audited POC backlog evidence coverage:
  - 30 total `status=poc` items; 25 were missing explicit evidence links.
- Created 3 new POC evidence artifacts (no cloning/vendoring; pointers + contracts only):
  - `.blackbox/.plans/2025-12-31_2205_oss-sourcing-roadmap-audit-next-lanes/artifacts/poc-opa-policy-approvals-primitives.md`
  - `.blackbox/.plans/2025-12-31_2205_oss-sourcing-roadmap-audit-next-lanes/artifacts/poc-retraced-audit-log-primitives.md`
  - `.blackbox/.plans/2025-12-31_2205_oss-sourcing-roadmap-audit-next-lanes/artifacts/poc-shopify-hydrogen-storefront-primitives.md`
- Enriched curation entries (pulled metadata from the catalog where missing) and appended evidence links for:
  - `open-policy-agent/opa`
  - `retracedhq/retraced`
  - `Shopify/hydrogen-v1`
- Updated evergreen file pointers map to include new “Policy” and “Audit log” sections:
  - `.blackbox/oss-catalog/component-source-map.md`
- Re-rendered OSS catalog views so the new evidence surfaces in:
  - `.blackbox/oss-catalog/shortlist.md`
  - `.blackbox/oss-catalog/poc-backlog.md`

## 🧠 What I learned (new information)

- OPA is best treated as a small, explicit “decision service” boundary:
  - `POST /v1/data/{path:.+}` for decisions
  - bundles + decision logs provide the versioning/auditability we need for approvals.
- Retraced has a clean publisher contract and a stable minimal event schema:
  - `POST /publisher/v1/project/{projectId}/event` (+ bulk)
  - viewer tokens enable embed without exposing raw admin credentials.
- Hydrogen v1 provides a clear reference for cart persistence + variant selection providers:
  - cart id persistence via localStorage, clear “action API” for cart mutations
  - ProductOptionsProvider computes options and availability gating consistently.

## 🧭 What changes because of this

- The highest-priority POCs now have “evidence-first” artifacts and file pointers, so execution can proceed without further searching.
- The component source map now covers policy + audit primitives alongside storefront/reliability/content.

## ➡️ Next step

- Reduce remaining POC evidence debt:
  - create evidence artifacts for `illacloud/illa-builder`, `simstudioai/sim`, and `saleor/saleor` (or a tighter subset).
- Stop rule: do not run new discovery cycles unless a specific tag gap is identified that evidence mining cannot address.

## 🔗 Links / references

- `.blackbox/oss-catalog/curation.json`
- `.blackbox/oss-catalog/component-source-map.md`
- `.blackbox/oss-catalog/poc-backlog.md`

---

### 0015_evidence-linking-returns-store-credit-mining-saleor-solidus-curation.md

---
step: 0015
created_at: "2025-12-31 23:36"
title: "Evidence linking: returns/store-credit mining → Saleor + Solidus curation"
---

# Step 0015: Evidence linking: returns/store-credit mining → Saleor + Solidus curation

## ✅ What I did (facts)

- Linked our existing returns/store-credit domain mining artifacts into the relevant curated entries so POCs are evidence-backed (no additional discovery runs):
  - `saleor/saleor` (status=poc) now references:
    - `.blackbox/.plans/2025-12-31_2132_returns-model-mining-saleor-solidus-spree/artifacts/summary.md`
    - `.blackbox/.plans/2025-12-31_2132_returns-model-mining-saleor-solidus-spree/artifacts/extracted.md`
    - `.blackbox/deepresearch/2025-12-31_saleor-returns-refunds-store-credit-domain-model.md`
    - `.blackbox/deepresearch/2025-12-31_returns-domain-model-contrast-saleor-spree-solidus.md`
  - Solidus store-credit references now point to the same evidence set:
    - `solidusio/solidus`
    - `solidusio-contrib/solidus_virtual_gift_card`
    - `solidusio/solidus_starter_frontend`
- Enriched missing Saleor metadata (stars/license/language) from the catalog where absent.
- Re-rendered OSS catalog artifacts so evidence links surface in shortlist/backlog views.

## 🧠 What I learned (new information)

- Evidence debt can be reduced quickly by linking existing mining runs/deepresearch into curation entries (faster than creating brand-new artifacts).
- Returns/store-credit work is now clearly in “mining → implement” mode, not “search for more repos” mode.

## 🧭 What changes because of this

- Saleor and Solidus references are now executable as POCs/spec sources: engineers can jump straight to the mined artifacts.
- Tagging accuracy improved slightly (`solidus_virtual_gift_card` now reflects its returns adjacency), improving future gap analysis.

## ➡️ Next step

- Continue reducing POC evidence debt for the remaining highest-priority POCs:
  - `illacloud/illa-builder` (admin builder) and `simstudioai/sim` (workflow/agent studio) are next high-impact candidates.
- Stop rule: no new discovery runs until the current POC queue has at least 2 decisions recorded (adopt/deepen/reject).

## 🔗 Links / references

- `.blackbox/oss-catalog/curation.json`
- `.blackbox/oss-catalog/poc-backlog.md`
- `.blackbox/oss-catalog/lanes/returns-store-credit.md`

---

### 0016_poc-hardening-sim-evidence-report-tags.md

---
step: 0016
created_at: "2025-12-31 23:57"
title: "POC hardening: SIM evidence + report tags"
---

# Step 0016: POC hardening: SIM evidence + report tags

## ✅ What I did (facts)

- Verified GitHub CLI auth + GraphQL calls work (without printing tokens) so we can safely run OSS cycles using `gh api`.
- Mined `simstudioai/sim` for high-signal workflow-engine primitives and wrote an evidence artifact focused on file pointers (no cloning).
- Updated `simstudioai/sim` in curation to include tags + metadata and a direct evidence link.
- Updated the OSS component source map to include:
  - SIM workflow studio pointers (serializer, DAG builder, execution engine, DB schema, registries)
  - ILLA Builder internal-tool pointers (router + service layer + core UI surfaces)
- Fixed catalog renderers so **curation tags override catalog tags** in shortlist/backlog outputs (prevents drift like “cms” showing up when we’ve re-tagged it).
- Re-rendered `shortlist.md` + `poc-backlog.md` after the updates.

## 🧠 What I learned (new information)

- SIM has a surprisingly clean “portable workflow” surface:
  - `SerializedWorkflow` = blocks + connections + loops + parallels (`apps/sim/serializer/types.ts`)
  - execution is compiled into a DAG with sentinel nodes for loop/parallel structure (`apps/sim/executor/dag/builder.ts`)
  - execution logs + snapshots + pause/resume are first-class concepts (executor types + `packages/db/schema.ts`)
- The repo includes explicit registries for triggers/tools/blocks, which maps well to how we should structure our own “allowed actions” surface area.

## 🧭 What changes because of this

- We can treat SIM as a strong reference implementation for Lumelle’s workflow + support-timeline orchestration layer, with concrete file pointers ready for implementation review.
- POC reports (`poc-backlog.md`, `shortlist.md`) now reflect our manual tag intent (curation) instead of only raw catalog tags, reducing churn and misclassification in decision docs.

## ➡️ Next step

- Execute the 2‑day SIM POC as scoped in curation (“support timeline workflow”: webhook → enrich → timeline event), then decide: reference-only vs integrate.
- If we hit missing tag coverage in workflows/support/webhooks, run a **targeted** discovery tranche (lane queries only, no broad loops).

## 🔗 Links / references

- Evidence artifact (SIM): `docs/.blackbox/.plans/2025-12-31_2205_oss-sourcing-roadmap-audit-next-lanes/artifacts/poc-simstudio-sim-agent-workflows-primitives.md`
- Curation: `docs/.blackbox/oss-catalog/curation.json`
- Source map: `docs/.blackbox/oss-catalog/component-source-map.md`
- Renderer fixes:
  - `docs/.blackbox/scripts/research/generate_oss_poc_backlog.py`
  - `docs/.blackbox/scripts/research/render_oss_catalog_shortlist.py`
- Generated outputs:
  - `docs/.blackbox/oss-catalog/poc-backlog.md`
  - `docs/.blackbox/oss-catalog/shortlist.md`

---

### 0017_discovery-saturation-storefront-content-pass-0-net-new.md

---
step: 0017
created_at: "2026-01-01 00:05"
title: "Discovery saturation: storefront+content pass (0 net-new)"
---

# Step 0017: Discovery saturation: storefront+content pass (0 net-new)

## ✅ What I did (facts)

- Ran a targeted “storefront + content” OSS discovery cycle with lane-only queries (no derived queries) and strict excludes.
- Produced a new run plan: `.blackbox/.plans/2026-01-01_0001_oss-discovery-github-oss-discovery-cycle-000130/`.
- Result: **0 net-new** in both cross-run catalog and curation:
  - catalog repos remained at 1081
  - curated items remained at 757
- The run’s extracted shortlist contained 4 candidates, all already curated (`skipped_existing: 4`):
  - `timlrx/tailwind-nextjs-starter-blog`
  - `pdsuwwz/nextjs-nextra-starter`
  - `itswadesh/svelte-commerce`
  - `LekoArts/gatsby-starter-minimal-blog`
- Converted the run output into an actionable improvement by adding Nextra file pointers to the component source map (so “deepen” work is faster than re-running discovery).

## 🧠 What I learned (new information)

- Storefront/blog discovery at our current scale is **saturated**: new passes tend to rediscover already-known repos, even with rotated query banks and higher quality bars.
- The “prefer-new” filter is doing its job: it minimizes churn, but it also means repeated cycles won’t produce much unless we open up new query directions (new tags, new stacks, or lower stars).

## 🧭 What changes because of this

- We should stop spending cycles on broad storefront/blog discovery unless a specific gap appears.
- Time is better spent on “deepen” and “poc” execution:
  - mine concrete file pointers, contracts, and runnable POC checklists
  - create evidence artifacts + decision notes

## ➡️ Next step

- Deepen the existing “content/blog/docs” candidates (Nextra, Timlrx, Taxonomy) into reusable contracts and component maps.
- Continue the “execution lane” POCs already prioritized (SIM workflows, ILLA admin tooling) instead of more discovery loops.

## 🔗 Links / references

- Run plan: `docs/.blackbox/.plans/2026-01-01_0001_oss-discovery-github-oss-discovery-cycle-000130/`
- Run outputs:
  - `docs/.blackbox/.plans/2026-01-01_0001_oss-discovery-github-oss-discovery-cycle-000130/artifacts/oss-ranked.md`
  - `docs/.blackbox/.plans/2026-01-01_0001_oss-discovery-github-oss-discovery-cycle-000130/artifacts/oss-triage.md`
  - `docs/.blackbox/.plans/2026-01-01_0001_oss-discovery-github-oss-discovery-cycle-000130/artifacts/query-bank-rotated.md`
- Source map (updated): `docs/.blackbox/oss-catalog/component-source-map.md`
- Cross-run state: `docs/.blackbox/.local/oss-discovery-state.json`

---

### 0018_sections-components-lane-new-query-bank-net-new-catalog.md

---
step: 0018
created_at: "2026-01-01 00:20"
title: "Sections/components lane: new query bank + net-new catalog"
---

# Step 0018: Sections/components lane: new query bank + net-new catalog

## ✅ What I did (facts)

- Fixed the “sections/components” lane to be reproducible by creating a real query bank file and wiring it into:
  - the lane doc
  - the discovery prompt pack
- Ran a targeted sections/components discovery pass (lane-only queries, strict excludes).
- Seeded new candidates into curation and then performed a fast kill-sweep on obvious non-fit + copyleft.
- Added concrete file pointers for the best new “section kit” sources into the component source map.
- Re-rendered cross-run catalog outputs.

## 🧠 What I learned (new information)

- The “sections/components” lane was **not** saturated: one pass produced a meaningful set of net-new repos (but required aggressive filtering to remove marketing-checklist and WordPress noise).
- `ant-design/ant-design-landing` is a strong, explicit “section elements” library with clear Pricing/Teams/Footer/Nav/Banner blocks in a single tree.
- `LiveDuo/destack` is a useful aggregator: it ships TSX/HTML versions of many common sections with previews, which is ideal for mining blog/marketing components.

## 🧭 What changes because of this

- We now have a reliable path to keep expanding blog/marketing “page section” primitives without going back to broad storefront discovery.
- New sources are converted into file pointers (not just repo names), so “deepen” work is faster and less fuzzy.
- The triage surface is cleaner because the obvious license+domain mismatches were rejected immediately.

## ➡️ Next step

- Deepen the top section-kit sources into our Blocks Kit contracts by:
  - mapping which OSS blocks correspond to `FaqSection`, `PricingSection`, `Testimonials`, `NewsletterSignup`, `Hero`, `FeatureGrid`
  - extracting 1–2 canonical variants per block (to reduce combinatorial explosion)
- If we still need more: run one more pass with tighter excludes (add keywords like `wordpress`, `gutenberg`, `plugin`) to reduce Gutenberg noise.

## 🔗 Links / references

- Query bank (new): `docs/.blackbox/snippets/research/github-search-queries-sections-components.md`
- Lane doc (updated): `docs/.blackbox/oss-catalog/lanes/sections-components.md`
- Prompt pack (updated): `docs/.blackbox/.prompts/oss-discovery-loop-pack.md`
- Run plan (latest sections pass): `docs/.blackbox/.plans/2026-01-01_0010_oss-discovery-github-oss-discovery-cycle-001027/`
- Component source map (updated file pointers):
  - `docs/.blackbox/oss-catalog/component-source-map.md`
- Cross-run stats:
  - `docs/.blackbox/oss-catalog/catalog.json`
  - `docs/.blackbox/oss-catalog/curation.json`

---

### 0019_blocks-kit-wire-new-section-kits-into-contracts.md

---
step: 0019
created_at: "2026-01-01 00:23"
title: "Blocks Kit: wire new section kits into contracts"
---

# Step 0019: Blocks Kit: wire new section kits into contracts

## ✅ What I did (facts)

- Took the strongest net-new “section kit” sources from the latest sections/components discovery and wired them into our execution docs:
  - Blocks Inventory (adds concrete sources for FAQ/pricing/testimonials/newsletter)
  - Blocks Kit Contracts (“Where to mine” lists now include the new repos)
- Re-rendered OSS catalog outputs after curation updates.

## 🧠 What I learned (new information)

- The best new “sections” sources fall into two buckets:
  1) **Explicit section libraries** (Ant Design Landing elements)
  2) **Aggregators with themed TSX/HTML blocks + previews** (Destack)
- These are a better fit for blog/marketing component mining than “random UI component libraries” because they show whole-section composition patterns.

## 🧭 What changes because of this

- The Blocks Kit docs now point to specific repos that actually contain blog/marketing section implementations, reducing future discovery churn.
- We can now do “deepen” work by mining 1–2 canonical variants per section type instead of collecting endless libraries.

## ➡️ Next step

- Run a targeted “storefront templates/starters” discovery pass to add more full storefront codebases for pattern mining (PLP/PDP/cart/search), then do a fast triage sweep (reject non-commerce, flag license issues).

## 🔗 Links / references

- Blocks inventory (updated): `docs/.blackbox/oss-catalog/blocks-inventory.md`
- Blocks kit contracts (updated): `docs/.blackbox/oss-catalog/blocks-kit-contracts.md`
- Component source map (updated pointers): `docs/.blackbox/oss-catalog/component-source-map.md`
- Latest sections/components run plan: `docs/.blackbox/.plans/2026-01-01_0010_oss-discovery-github-oss-discovery-cycle-001027/`

---

### 0020_storefront-templates-lane-pass-saturated-add-file-pointers.md

---
step: 0020
created_at: "2026-01-01 00:31"
title: "Storefront templates lane: pass saturated + add file pointers"
---

# Step 0020: Storefront templates lane: pass saturated + add file pointers

## ✅ What I did (facts)

- Ran a targeted “storefront templates/starters” discovery pass with lane-only queries and strict excludes.
- Result: **0 net-new** to the cross-run catalog and curation (everything top-ranked was already known).
- Used the run as a reminder pass to strengthen our pattern-mining docs by adding missing file pointers for two high-signal Shopify storefront starters.

## 🧠 What I learned (new information)

- Storefront template discovery is currently **saturated** at our quality bar: repeated runs mostly rediscover the same set of Next.js/Hydrogen starters.
- The best ROI in this lane is no longer “find more repos”, but “mine the repos we already have” into stable contracts + file pointers.

## 🧭 What changes because of this

- We should pause storefront-template discovery unless a specific new stack gap appears (e.g., Astro/SvelteKit storefronts).
- We now have additional concrete file pointers for Shopify storefront primitives (cart/search/product/filters) from two widely referenced codebases.

## ➡️ Next step

- Shift back to execution:
  - run the top POCs already scoped (SIM workflows + ILLA admin tooling)
  - mine the new sections/components sources into 1–2 canonical variants per block (FAQ/pricing/testimonials/newsletter)

## 🔗 Links / references

- Run plan (storefront templates pass): `docs/.blackbox/.plans/2026-01-01_0023_oss-discovery-github-oss-discovery-cycle-002359/`
- Component source map (added pointers for Shopify storefront primitives):
  - `docs/.blackbox/oss-catalog/component-source-map.md`
- Storefront reference set (updated):
  - `docs/.blackbox/oss-catalog/storefront-reference-set.md`

---

## Cleanup notes

- Step files compacted: 10 (and removed from steps/)
- Compaction file is capped at ~1048576 bytes (configurable via BLACKBOX_CONTEXT_MAX_BYTES).
