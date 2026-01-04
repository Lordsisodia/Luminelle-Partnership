---
compaction: 0001
created_at: "2025-12-31 22:45"
range: "0001-0010"
max_bytes: 1048576
per_step_budget_bytes: 98304
---

# Compaction 0001 (0001–0010)

## ✅ Summary

- Broad storefront/blog discovery is now diminishing returns; the highest leverage is **POC mining + pattern extraction** (file pointers + contracts + evidence artifacts).
- We promoted a small set of high-signal candidates into actionable `deepen`/`poc` work and prevented “triage sprawl” via a kill sweep (rejecting obvious non-fit repos).
- We enforced a fast license risk gate: verified top `watch` items, upgraded permissive licenses to `triage`, and rejected source-available / copyleft where inappropriate.
- We upgraded evergreen outputs so the system is executable:
  - concrete file pointers in `component-source-map.md`
  - storefront “reference set” index for PLP/PDP/cart/search mining
  - Blocks Kit contracts expanded for blog primitives (e.g., `BlogPostCard`, `ArticleMeta`)
- We produced POC evidence artifacts for storefront + shipping + blog primitives so future work is “implement from contracts”, not “search again”.

## 🧩 Patterns / heuristics

- Prompt improvements:
  - Prefer lane-specific query banks + hard excludes over general query rotation when a lane becomes noisy.
  - Use “pattern mining” framing (what to extract) instead of “find the best repo” framing.
- Checklist improvements:
  - Every `deepen`/`poc` item should include: (1) file pointers, (2) data contracts, (3) integration touchpoints, (4) risks + mitigations, (5) evidence link.
  - License verification should happen *before* investing in deep POCs; treat `verify/flagged` as watch/reject until cleared.
- Better stop conditions:
  - If a discovery pass yields <3 net-new curation adds (or mostly personal templates), stop that lane and switch to mining/POCs.
  - Cap “active” POCs (3–6) and require a decision-by date to prevent perpetual searching.
  - For sparse domains (returns/RMA), mine mature platforms (Saleor/Solidus/etc.) rather than chasing noisy GitHub search results.

## Steps compacted (trimmed)

### 0001_checkpoint-baseline-audit-storefront-content-returns-shipping-runs.md

---
step: 0001
created_at: "2025-12-31 22:07"
title: "Checkpoint: baseline audit + storefront/content + returns/shipping runs"
---

# Step 0001: Checkpoint: baseline audit + storefront/content + returns/shipping runs

## ✅ What I did (facts)

- Captured a baseline metrics snapshot for OSS catalog + curation:
  - `.blackbox/.plans/2025-12-31_2205_oss-sourcing-roadmap-audit-next-lanes/artifacts/metrics.md`
  - `.blackbox/.plans/2025-12-31_2205_oss-sourcing-roadmap-audit-next-lanes/artifacts/metrics.json`
- Verified GitHub CLI auth + GraphQL calls work locally (`gh auth status`, `gh api graphql`).
- Ran a storefront/content discovery cycle (pattern mining):
  - `.blackbox/.plans/2025-12-31_2157_oss-discovery-github-oss-discovery-cycle-215710`
  - Seed result: added `takeshape/penny` to curation and tagged it as `storefront` + promoted to `deepen` (mining).
- Ran a returns/shipping discovery cycle (precision):
  - `.blackbox/.plans/2025-12-31_2201_oss-discovery-github-oss-discovery-cycle-220154`
  - Seed result: added `jonyw4/vendure-advanced-shipping` (MIT) and increased `shipping` tag coverage by +1.
- Ran a low-stars returns/RMA pass to try to fill `returns` gaps:
  - `.blackbox/.plans/2025-12-31_2203_oss-discovery-github-oss-discovery-cycle-220304`
  - Result: very low yield; no new curated additions after dedupe + filters.

## 🧠 What I learned (new information)

- Storefront/content discovery is hitting **diminishing returns** because the catalog already contains most obvious high-star starters; new runs produce few net-new curation adds.
- Returns OSS (standalone portals/modules) is relatively **sparse and noisy** in GitHub search; the best value continues to come from **mining mature platforms** (Saleor/Solidus) rather than chasing niche repos.
- Shipping integrations have higher yield in “plugin/module” form (Vendure ecosystem surfaced a concrete shipping module).

## 🧭 What changes because of this

- Enforce stop rules per lane: if a pass adds <3 strong new candidates, rotate lanes instead of grinding.
- Prioritize “mining mode” outputs (file pointers + primitives) for returns/store credit instead of expecting GitHub search to find complete returns portals.
- Promote only a small number of new repos to `deepen` and immediately write what we want to mine (components, patterns, test setups) to keep curation actionable.

## ➡️ Next step

- Run a quick promotion sweep:
  - pick 3–6 best `status=triage` storefront/blog/component repos and promote to `status=deepen` with one-line “what to mine”.
- Then run a license cleanup sweep on the highest-star `license_bucket=verify|flagged` repos and set them to `watch`/`reject`.
- Convert the best 3–6 candidates into `status=poc` with measurable acceptance criteria (stop searching).

## 🔗 Links / references

- `.blackbox/oss-catalog/search-focus.md`
- `.blackbox/.prompts/oss-discovery-loop-pack.md`
- `.blackbox/oss-catalog/lanes/storefront-content.md`
- `.blackbox/oss-catalog/lanes/returns-store-credit.md`

---

### 0002_promote-high-signal-storefront-blog-shipping-repos-to-deepen.md

---
step: 0002
created_at: "2025-12-31 22:11"
title: "Promote high-signal storefront/blog/shipping repos to deepen"
---

# Step 0002: Promote high-signal storefront/blog/shipping repos to deepen

## ✅ What I did (facts)

- Promoted 6 curated items from `status=triage` → `status=deepen` and appended “what to mine” notes:
  - `jonyw4/vendure-advanced-shipping` (shipping plugins: boxes/dimensions/rates)
  - `zeon-studio/commerceplate` (Next.js + Tailwind Shopify storefront boilerplate)
  - `OlivierBelaud/nuxt-starter-medusa` (Nuxt 3 + Medusa v2 storefront)
  - `mohammadoftadeh/next-ecommerce-shopco` (Next.js 14 + shadcn UI commerce patterns)
  - `LekoArts/gatsby-starter-minimal-blog` (blog primitives + code block UX)
  - `pdsuwwz/nextjs-nextra-starter` (Nextra docs/blog layout + MDX rendering)
- Re-rendered OSS catalog artifacts after updates.

## 🧠 What I learned (new information)

- We already have a strong base set of storefront/blog repos in curation; the main value now is converting “triage” into actionable mining tasks (`deepen` with specific targets).
- Shipping is currently best filled via ecosystem plugins/modules (Vendure/Medusa/VueStorefront ecosystems), not standalone “returns portal” style repos.

## 🧭 What changes because of this

- The “storefront + content” lane now has a clearer deepening queue focused on component mining (cart/filters/MDX/SEO/code blocks) instead of just hoarding starters.
- Next actions should be (1) license cleanup for `verify/flagged` and (2) POC promotion for a small number of highest-leverage repos.

## ➡️ Next step

- Run a license risk gate sweep:
  - take the highest-star `license_bucket=verify|flagged` repos and mark them as `watch` (license unclear) or `reject` (copyleft / clearly incompatible) with short reasons.
  - do not change existing `status=poc` items.

## 🔗 Links / references

- `.blackbox/oss-catalog/curation.json`
- `.blackbox/oss-catalog/shortlist.md`
- `.blackbox/oss-catalog/lanes/storefront-content.md`

---

### 0003_license-cleanup-verify-top-watch-items-and-enforce-reject-rules.md

---
step: 0003
created_at: "2025-12-31 22:16"
title: "License cleanup: verify top watch items and enforce reject rules"
---

# Step 0003: License cleanup: verify top watch items and enforce reject rules

## ✅ What I did (facts)

- Ran license verification against GitHub’s `/license` endpoint for 10 high-impact `status=watch` repos (without printing tokens):
  - Report: `.blackbox/.plans/2025-12-31_2205_oss-sourcing-roadmap-audit-next-lanes/artifacts/license-verification-watch-top10.md`
  - Raw data: `.blackbox/.plans/2025-12-31_2205_oss-sourcing-roadmap-audit-next-lanes/artifacts/license-verification-watch-top10.json`
- Applied verified license outcomes into the catalog + curation:
  - Promoted to `license_bucket=safe` where MIT/Apache was detected from license text.
  - Marked non-OSS / copyleft projects as `license_bucket=flagged` and set curation status to `reject` (never touching `status=poc`).
- Re-rendered OSS catalog artifacts so `risk.md`, `inventory.md`, and `shortlist.md` reflect the new license states.

## 🧠 What I learned (new information)

- Some major repos report `NOASSERTION` via GitHub metadata, but the license text is still confidently classifiable:
  - `strapi/strapi` → MIT (safe)
  - `FlowiseAI/Flowise` → Apache-2.0 (safe)
  - `PostHog/posthog` → MIT (safe)
  - `chatwoot/chatwoot` → MIT (safe)
  - `Comcast/react-data-grid` → MIT (safe)
- Some repos in our “watch” list are **not OSS-compatible** for runtime adoption:
  - `directus/directus` → BUSL-1.1 (source-available; treat as flagged)
  - `Budibase/budibase` → GPL-3.0 (copyleft; treat as flagged)
- Some remain unresolved and should stay `watch` until clarified:
  - `langgenius/dify`, `handsontable/handsontable`, `store-craft/storecraft`

## 🧭 What changes because of this

- The “watch” list is now more meaningful: safe projects were upgraded to `triage`, and flagged projects were moved to `reject`.
- We reduced license ambiguity in the catalog and improved the signal-to-noise for future adoption decisions.

## ➡️ Next step

- Convert the best new `status=deepen` storefront/blog/shipping candidates into 1–2 day POCs (measurable acceptance criteria).
- Then stop running broad discovery loops and shift to “execute POCs” mode.

## 🔗 Links / references

- `.blackbox/oss-catalog/catalog.json`
- `.blackbox/oss-catalog/curation.json`
- `.blackbox/oss-catalog/risk.md`

---

### 0004_poc-deepening-add-file-pointers-for-new-pocs-storefront-shipping.md

---
step: 0004
created_at: "2025-12-31 22:23"
title: "POC deepening: add file pointers for new POCs (storefront + shipping)"
---

# Step 0004: POC deepening: add file pointers for new POCs (storefront + shipping)

## ✅ What I did (facts)

- Mined concrete file pointers (no cloning) for two new POCs and updated our evergreen source map:
  - `takeshape/penny` → storefront PLP/PDP/cart/search pointers
  - `jonyw4/vendure-advanced-shipping` → shipping packaging/rates plugin pointers
- Updated: `.blackbox/oss-catalog/component-source-map.md`

## 🧠 What I learned (new information)

- `takeshape/penny` is well-structured for pattern mining because it cleanly separates:
  - Next.js App Router routes (`src/app/(shop)/*`)
  - domain “features” (Cart/ProductCategory/ProductPage/Search)
  - Storybook stories for many primitives (fast UI mining)
- Vendure shipping plugin ecosystems provide a concrete “shipping packages + dimensions” model, which is useful for our adapter design even if we don’t adopt Vendure itself.

## 🧭 What changes because of this

- The new POCs now have actionable “where to read” pointers; we can execute them as a focused 1‑day mining pass without repo cloning.
- Next step should shift from “collect” to “extract patterns into our blocks/contracts” (especially blog pages).

## ➡️ Next step

- Finish the blog POC mining outputs:
  - Add/update at least 3 reusable blog blocks (TOC, CodeBlock, Callout) in `blocks-kit-contracts.md`.
  - Ensure `.blackbox/oss-catalog/component-source-map.md` includes the concrete file pointers for those blocks (some exist; tighten/expand).

## 🔗 Links / references

- `.blackbox/oss-catalog/component-source-map.md`
- `.blackbox/oss-catalog/lanes/storefront-content.md`

---

### 0005_blog-component-mining-add-gatsby-theme-implementation-pointers.md

---
step: 0005
created_at: "2025-12-31 22:28"
title: "Blog component mining: add Gatsby theme implementation pointers"
---

# Step 0005: Blog component mining: add Gatsby theme implementation pointers

## ✅ What I did (facts)

- Identified the actual implementation repo for `gatsby-starter-minimal-blog`’s theme: `LekoArts/gatsby-themes` (MIT).
- Added it to curation (`status=deepen`) with a clear “what to mine” note.
- Updated `.blackbox/oss-catalog/component-source-map.md` with concrete file pointers into:
  - `themes/gatsby-theme-minimal-blog/src/components/*` (post layout, MDX components, code blocks, SEO, tags)
- Re-rendered OSS catalog artifacts to keep execution surfaces current.

## 🧠 What I learned (new information)

- The starter repo is mostly config + content examples; the reusable blog primitives live in the theme package itself.
- The theme has direct, readable React component implementations for blog list items, post shells, MDX component mapping, and code block rendering—ideal for our blog/components kit.

## 🧭 What changes because of this

- Blog component mining is now pointed at the correct source repo; we can stop “guessing” from starter templates and read real implementation code.
- Next step is converting these blog primitives into explicit Blocks Kit contracts (or validating existing ones against the theme’s patterns).

## ➡️ Next step

- Tighten the Blocks Kit blog contracts (small edits only): ensure `RichContent`, `CodeBlock`, `TableOfContents`, and `Callout` cover the needs surfaced by the Gatsby theme implementation.

## 🔗 Links / references

- `.blackbox/oss-catalog/component-source-map.md`
- `.blackbox/oss-catalog/blocks-kit-contracts.md`

---

### 0006_blocks-kit-add-blogpostcard-contract-and-sources.md

---
step: 0006
created_at: "2025-12-31 22:29"
title: "Blocks kit: add BlogPostCard contract and sources"
---

# Step 0006: Blocks kit: add BlogPostCard contract and sources

## ✅ What I did (facts)

- Added a new blog-page component contract to the Blocks Kit spec:
  - `BlogPostCard` (post preview card for blog index/tag/related posts)
- Linked it to concrete mining sources (Gatsby theme + Next.js blog references) via the existing component source map.

## 🧠 What I learned (new information)

- “Blog page components” aren’t just MDX renderers; the real reuse multiplier is the index/list layer (post cards + tag chips + pagination), which we can standardize as a block contract.

## 🧭 What changes because of this

- We can now mine blog starters/themes with a clear target: extract a stable `BlogPostCard` behavior + props model, then implement it once for Lumelle’s blog and reuse on other content-heavy surfaces.

## ➡️ Next step

- Run a small “kill sweep” on obvious non-fit storefront/blog items still in `triage` to reduce churn, then stop discovery loops for this lane until the new POCs are executed.

## 🔗 Links / references

- `.blackbox/oss-catalog/blocks-kit-contracts.md`
- `.blackbox/oss-catalog/component-source-map.md`

---

### 0007_kill-sweep-reject-obvious-non-fit-triage-repos.md

---
step: 0007
created_at: "2025-12-31 22:31"
title: "Kill sweep: reject obvious non-fit triage repos"
---

# Step 0007: Kill sweep: reject obvious non-fit triage repos

## ✅ What I did (facts)

- Performed a churn-reduction “kill sweep” on curation:
  - Found 10 `status=triage` repos that were clearly not aligned with `.blackbox/oss-catalog/search-focus.md`.
  - Set them to `status=reject` and added short reasons in notes.
- Re-rendered OSS catalog artifacts to keep execution views current.

## 🧠 What I learned (new information)

- Some repos slip through search filters as “docs/legal text” or “paper code” and get mis-tagged; keeping a periodic kill sweep prevents triage from becoming unusable.

## 🧭 What changes because of this

- Triage list is cleaner and better reflects actual integration/mining candidates.

## ➡️ Next step

- Pause additional discovery cycles for storefront/blog lanes (diminishing returns) and focus on executing the 3 new 1‑day POCs:
  - `takeshape/penny` (storefront patterns)
  - `LekoArts/gatsby-starter-minimal-blog` + `LekoArts/gatsby-themes` (blog primitives)
  - `jonyw4/vendure-advanced-shipping` (shipping packaging/rates model)

## 🔗 Links / references

- `.blackbox/oss-catalog/curation.json`
- `.blackbox/oss-catalog/search-focus.md`

---

### 0008_update-storefront-reference-set-with-new-poc-candidate.md

---
step: 0008
created_at: "2025-12-31 22:32"
title: "Update storefront reference set with new POC candidate"
---

# Step 0008: Update storefront reference set with new POC candidate

## ✅ What I did (facts)

- Updated the storefront pattern mining index to include the new storefront POC:
  - Added `takeshape/penny` to `.blackbox/oss-catalog/storefront-reference-set.md` as a canonical pattern source.

## 🧠 What I learned (new information)

- Having a dedicated “reference set” prevents discovery churn: even if we stop searching, we still have a stable shortlist of codebases to mine when we need a component pattern.

## 🧭 What changes because of this

- When implementing storefront primitives (PLP/PDP/cart/search), we now have one more high-signal, modern Next.js v14 codebase to reference—especially useful for Storybook/Playwright testing patterns.

## ➡️ Next step

- Stop running additional discovery cycles for storefront/blog for now; execute the 1‑day POCs and convert the best results into reusable blocks/contracts.

## 🔗 Links / references

- `.blackbox/oss-catalog/storefront-reference-set.md`
- `.blackbox/oss-catalog/component-source-map.md`

---

### 0009_poc-evidence-shipping-packages-unit-model-extracted.md

---
step: 0009
created_at: "2025-12-31 22:41"
title: "POC evidence: shipping packages + unit model extracted"
---

# Step 0009: POC evidence: shipping packages + unit model extracted

## ✅ What I did (facts)

- Read the Vendure shipping plugin implementation via GitHub API (no cloning) and extracted:
  - product custom field requirements (dimensions + units)
  - package/box entity model
  - packaging algorithm (single + multi package, volume-first heuristic)
- Wrote an evidence artifact with a proposed `ShippingQuote` schema and example payloads:
  - `.blackbox/.plans/2025-12-31_2205_oss-sourcing-roadmap-audit-next-lanes/artifacts/poc-vendure-advanced-shipping.md`
- Updated evergreen file pointers:
  - `.blackbox/oss-catalog/component-source-map.md`
- Added POC deepening notes into:
  - `.blackbox/oss-catalog/curation.json`

## 🧠 What I learned (new information)

- The repo provides a clear “minimum viable” shipping packaging model:
  - per-product dims + unit conversion
  - a DB-managed box catalog
  - deterministic packaging output per order
- The packaging logic is a fast heuristic (volume-based), which is acceptable as a baseline but needs explicit fallbacks.

## 🧭 What changes because of this

- We can now define Lumelle’s shipping adapter interfaces with a concrete shape (inputs/outputs), independent of any carrier integration.
- Shipping POC is now executable as a 1-day design + modeling spike without repo cloning.

## ➡️ Next step

- Move to the blog POC: extract concrete reusable primitives from `gatsby-theme-minimal-blog` (MDX component map, code blocks, post shells, SEO) and ensure our Blocks Kit contracts cover them.

## 🔗 Links / references

- `.blackbox/oss-catalog/component-source-map.md`
- `.blackbox/oss-catalog/curation.json`

---

### 0010_poc-evidence-blog-primitives-extracted-and-mapped-to-blocks-contracts.md

---
step: 0010
created_at: "2025-12-31 22:45"
title: "POC evidence: blog primitives extracted and mapped to blocks contracts"
---

# Step 0010: POC evidence: blog primitives extracted and mapped to blocks contracts

## ✅ What I did (facts)

- Produced a concrete blog primitives evidence artifact (no cloning; contracts/pointers only):
  - `.blackbox/.plans/2025-12-31_2205_oss-sourcing-roadmap-audit-next-lanes/artifacts/poc-lekoarts-blog-primitives.md`
- Updated evergreen docs to make the extraction reusable:
  - Expanded Blocks Kit contracts for blog pages in `.blackbox/oss-catalog/blocks-kit-contracts.md`
    - Added `BlogPostCard`
    - Added `ArticleMeta`
  - Added Gatsby theme implementation pointers in `.blackbox/oss-catalog/component-source-map.md`
- Ensured the theme implementation repo (`LekoArts/gatsby-themes`) is tracked (so the starter isn’t a dead-end reference).

## 🧠 What I learned (new information)

- The reusable blog primitives live in the **theme implementation** (`gatsby-theme-minimal-blog`), not the starter repo wiring.
- The highest leverage primitives to standardize are:
  - MDX component mapping (portable “rich content” layer)
  - CodeBlock UX (copy, optional title, line numbers, highlight lines)
  - Post meta row (date, tags, reading time)
  - SEO wrapper patterns (canonical + OG/Twitter)

## 🧭 What changes because of this

- Blog/page components are now “implementable targets” in our Blocks Kit rather than vague inspiration.
- The storefront/content lane can pause discovery and focus on implementing contracts + mining a small reference set.

## ➡️ Next step

- Move from “evidence” → “execution”:
  - implement 1–2 Blocks Kit primitives based on the extracted contracts (blog + storefront)
  - record an adopt/deepen/reject decision for the mined sources
- Only resume discovery if a specific tag gap emerges.

## 🔗 Links / references

- `.blackbox/oss-catalog/blocks-kit-contracts.md`
- `.blackbox/oss-catalog/component-source-map.md`
- `.blackbox/.plans/2025-12-31_2205_oss-sourcing-roadmap-audit-next-lanes/artifacts/poc-lekoarts-blog-primitives.md`

---

## Cleanup notes

- Step files compacted: 10 (and removed from steps/)
- Compaction file is capped at ~1048576 bytes (configurable via BLACKBOX_CONTEXT_MAX_BYTES).
