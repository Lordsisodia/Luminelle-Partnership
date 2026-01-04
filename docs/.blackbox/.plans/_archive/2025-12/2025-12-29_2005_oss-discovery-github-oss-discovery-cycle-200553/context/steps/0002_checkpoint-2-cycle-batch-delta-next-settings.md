---
step: 0002
created_at: "2025-12-29 20:08"
title: "Checkpoint: 2-cycle batch delta + next settings"
---

# Step 0002: Checkpoint: 2-cycle batch delta + next settings

## ✅ What I did (facts)

- Ran a 2-cycle discovery batch with `--min-stars 100` using GitHub-authenticated search.
- Observed catalog delta and tag coverage changes after the batch.

## 🧠 What I learned (new information)

- The batch improved `auth` and `support` coverage slightly, but did not move `returns`/`shipping` at the `--min-stars 100` threshold.
- Our “missing” areas are not about overall volume anymore; they’re about **domain-specific query packs** for low-star but highly relevant repos.

## 🧭 What changes because of this

- Default batch runs should be used to broaden general coverage, but “returns/shipping” needs targeted runs with lower `--min-stars` and curated query terms.

## ➡️ Next step

- If we keep searching: run a targeted returns/shipping/policy/support pass with a lower star threshold and explicit CMS excludes.

## 🔗 Links / references

- `.blackbox/oss-catalog/catalog.json`
- `.blackbox/oss-catalog/search-focus.md`
- `.blackbox/.local/github-search-queries.returns-shipping.md`

---

## Delta summary (after 2-cycle batch)

- Catalog size increased: **182 → 185** repos.
- Tag deltas (approx):
  - `auth`: **17 → 20** (+3)
  - `support`: **16 → 18** (+2)
  - `returns`: **8 → 8** (no change)
  - `shipping`: **8 → 8** (no change)
  - `policy`: **15 → 15** (no change)

## Missing tags / weakest coverage

- Still weakest (relative to our focus): `returns`, `shipping` (needs more *specific* repos, not more CMS/workflow tools).

## Recommended next run settings (targeted)

Use the returns+shipping query pack and lower the bar:

- `GITHUB_TOKEN="$(gh auth token)" ./.blackbox/scripts/start-oss-discovery-cycle.sh --queries-md .blackbox/.local/github-search-queries.returns-shipping.md --min-stars 20 --max-total-queries 24 --max-repos 90 --exclude-keywords "cms,headless,content,blog,newsletter,publishing,wordpress,drupal,jekyll,hugo,ghost,strapi,directus,keystone,contentful" --no-gap-boost --no-catalog-gap-boost --no-coverage-quota-boost`
