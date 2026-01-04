---
step: 0002
created_at: "2025-12-30 23:31"
title: "Checkpoint: storefront+blog topic passes + triage cleanup"
---

# Step 0002: Checkpoint: storefront+blog topic passes + triage cleanup

## ✅ What I did (facts)

- Ran high-signal topic-based discovery passes:
  - Storefront topics (`.blackbox/.local/github-search-queries.storefront-topics-v1.md`)
  - Blog/content topics (`.blackbox/.local/github-search-queries.blog-topics-v1.md`)
- Seeded new candidates into curation and immediately did a kill-sweep to keep `triage` usable.
- Promoted 4 blog/content pipeline building blocks to `status=deepen`:
  - `rehypejs/rehype-react`
  - `remarkjs/remark-rehype`
  - `rehypejs/rehype-slug`
  - `rehypejs/rehype-autolink-headings`
- Rejected obvious false positives / non-fit items (examples):
  - `admesh/admesh` (topic collision: “facets”)
  - `antonpup/Aurora` (RGB lighting)
  - `jgm/pandoc` (GPL-2.0 flagged; too heavy for our use-case)
- Tightened the storefront topics query pack by removing generic topic tokens that collide with unrelated domains (removed `facets`/`filters`/`search` from that pack).
- Retagged + reindexed the OSS catalog, then re-rendered catalog views.

## 🧠 What I learned (new information)

- GitHub topic searches can still collide with non-commerce repos when topic tokens are too generic (e.g. “facets” → 3D mesh tooling).
- Blog/content topic passes are high-signal for reusable renderer primitives (remark/rehype plugins), which map directly to our blog/article component needs.
- Returns/RMA remains highly under-covered in OSS at our current query shapes; we need to treat it as a niche lane with strict filters and a stop rule.

## 🧭 What changes because of this

- The storefront topics query pack is now safer (fewer false positives) and should waste less triage bandwidth.
- The blog/content lane gained concrete, composable building blocks for:
  - heading ids (`rehype-slug`)
  - heading anchors (`rehype-autolink-headings`)
  - Markdown→HTML bridge (`remark-rehype`)
  - rendering pipeline output to React (`rehype-react`)
- Current snapshot (post-renders):
  - Catalog: **849 repos**
  - Curation: **569 items**

## ➡️ Next step

- Run a “search topics” pass to find storefront-grade search/facets/autocomplete components (Algolia/Typesense/Meilisearch/InstantSearch) and promote 3–6 best repos to `deepen`.
- Then run a “sections/components” pass (FAQ/pricing/testimonials/newsletter) with aggressive excludes and immediate kill-sweep.

## 🔗 Links / references

- Catalog + curation:
  - `.blackbox/oss-catalog/catalog.json`
  - `.blackbox/oss-catalog/curation.json`
- Working views:
  - `.blackbox/oss-catalog/shortlist.md`
  - `.blackbox/oss-catalog/poc-backlog.md`
  - `.blackbox/oss-catalog/inventory.md`
  - `.blackbox/oss-catalog/gaps.md`
- Lane doc:
  - `.blackbox/oss-catalog/lanes/storefront-content.md`
