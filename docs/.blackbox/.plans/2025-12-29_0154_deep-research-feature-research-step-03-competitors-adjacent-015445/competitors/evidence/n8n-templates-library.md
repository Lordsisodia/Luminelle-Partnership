# Evidence Extract — n8n Templates Library (n8n.io workflows + templates API)

- slug: `n8n-templates-library`
- category: workflow templates library + search/filter APIs
- license posture: Sustainable Use License for core repo (restrictive; pattern reference)  
  Evidence: https://raw.githubusercontent.com/n8n-io/n8n/master/LICENSE.md

## Notable features (3)

1) n8n exposes a public templates discovery/search API (filters endpoint returns categories with hit counts)  
Evidence: https://api.n8n.io/api/templates/search/filters

2) Templates are categorized via an API (category taxonomy includes AI and subcategories)  
Evidence: https://api.n8n.io/api/templates/categories

3) n8n templates/workflows are published via a dedicated UI at `n8n.io/workflows` and the page embeds template API URLs (discovery endpoints)  
Evidence: https://n8n.io/workflows

## Copyable workflows (2)

1) Discover → filter → pick template
- Filter templates by category and pick a workflow starting point instead of building from scratch  
Evidence: filters endpoint + categories endpoint above.

2) Treat templates as product objects
- A templates library implies: stable IDs, categories, and searchable metadata so teams can standardize on “known good” automations  
Evidence: https://api.n8n.io/api/templates/search/filters and https://api.n8n.io/api/templates/categories

## 3 steal ideas (easy / medium / hard)

- Easy: expose category filters with hit counts (helps users understand “what exists” quickly).
- Medium: “template as object” model (ID, tags, use-case, required credentials) that can be shared and cloned.
- Hard: make templates discoverable *and* safe (permission-aware templates, secrets hygiene, provenance).

## Thin-slice implementation (1–3 days)

- Day 1: add a `templates` catalog table + categories and “clone template” UX.
- Day 2: add server-side search + filters with counts (category facets).
- Day 3: add template provenance + required permissions + “approval required” flags for sensitive templates.

