---
step: 0003
created_at: "2025-12-30 17:13"
title: "Cadence: ongoing storefront + blog component sourcing"
---

# Step 0003: Cadence: ongoing storefront + blog component sourcing

## ✅ What I did (facts)

- Defined an ongoing discovery cadence focused on finding storefront codebases and blog/article UI components for component mining.

## 🧠 What I learned (new information)

- “Storefront” and “blog components” discovery is high-signal but also brings in personal sites; we need fast kill-listing to reduce churn.

## 🧭 What changes because of this

- We treat storefront/blog sourcing as a dedicated track (separate from ops primitives) with its own query pack and POCs.

## ➡️ Next step

- Run the storefront/blog component query pack on a fixed cadence and promote only the best component-mining candidates to short 1-day POCs.

## 🔗 Links / references

- Query pack: `.blackbox/.local/github-search-queries.storefront-blog-components.md`
- Inventory snapshot: `.blackbox/oss-catalog/inventory.md`
- Gaps: `.blackbox/oss-catalog/gaps.md`

---

## Proposed cadence (lightweight, repeatable)

### Twice a week: Storefront + blog component pass

- Run:
  - `GITHUB_TOKEN="$(gh auth token)" ./.blackbox/scripts/start-oss-discovery-cycle.sh --queries-md .blackbox/.local/github-search-queries.storefront-blog-components.md --min-stars 30 --max-total-queries 24 --max-repos 90 --exclude-keywords "cms,headless cms,content management,wordpress,drupal,ghost,strapi,directus,keystone,course,tutorial" --no-gap-boost --no-catalog-gap-boost --no-coverage-quota-boost`
- Then:
  - seed: `python3 ./.blackbox/scripts/research/seed_oss_curation_from_extracted.py --latest --curation .blackbox/oss-catalog/curation.json --top 25 --status triage --owner "Shaan" --note-prefix "Seeded (storefront/blog/components pass): "`
  - render: `./.blackbox/scripts/render-oss-catalog.sh`

### Weekly: Curate for component mining

- Promote 1–3 repos to `status=poc` with **1-day scope**:
  - “Extract 5–10 reusable components/sections + data requirements”
- Kill-list obvious personal sites/templates (status=reject) quickly.
