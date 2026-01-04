---
step: 0032
created_at: "2025-12-30 19:28"
title: "Checkpoint: Cycle 27 template galleries + taxonomy APIs (Zapier/n8n/IFTTT)"
---

# Step 0032: Checkpoint: Cycle 27 template galleries + taxonomy APIs (Zapier/n8n/IFTTT)

## ✅ What I did (facts)

- Picked Cycle 27 tranche focused on “template galleries + discovery UX + taxonomy APIs” as reusable platform primitives for our ecommerce admin automation surface.
- Deepened 3 adjacent template-driven platforms with evidence links:
  - Zapier Templates (use-case categories + template detail pages)
  - n8n templates library (public search filters with hit counts + categories taxonomy + large workflows catalog endpoint)
  - IFTTT Explore/Applets (tabs + search + public applet objects + install-count popularity signals)
- Created 3 new evidence notes and appended Cycle 27 outputs to the matrix, sources ledger, and summary.
- Noted blocked evidence: Make.com returned 403 in this environment, so it was replaced with IFTTT to keep the tranche auditable.

## 🧠 What I learned (new information)

- Zapier’s templates catalog is explicitly organized by “use cases” (not just apps), and templates link to detail pages (`/templates/details/...`) which implies a first-class template object model.
- n8n exposes template discovery primitives as public APIs: category facets with hit counts (`/api/templates/search/filters`) and a category taxonomy endpoint (`/api/templates/categories`).
- IFTTT’s Explore UI provides a simple but effective discovery model: tabs + search plus “install count” social proof for applets (template ranking signal).

## 🧭 What changes because of this

- We should build templates as a platform primitive, not just seed data:
  - taxonomy + facets + searchable catalog
  - template detail pages with “risk preview” (permissions, data touched)
  - publishing workflow (draft/review/publish/unpublish) + audit trail
- Add “popularity/ranking” signals early (even crude) to reduce users choosing low-quality templates.
- Treat template catalog as API-addressable (internal API is enough) so templates can be managed programmatically.

## ➡️ Next step

- Cycle 28 candidate: deepen “template publishing + QA” patterns (review workflows, unpublish, provenance, versioning) by looking for tools that document template governance explicitly (or deep dive GitHub Actions marketplace trust model).
- Optional: add “template safety metadata” thin slice: required roles, required approvals, data classification touched, and whether the template is export-only/stream-only (borrow from audit visibility gating).

## 🔗 Links / references

- Zapier templates: https://zapier.com/templates
- n8n template filters (hit counts): https://api.n8n.io/api/templates/search/filters
- n8n template categories taxonomy: https://api.n8n.io/api/templates/categories
- n8n templates workflows catalog: https://api.n8n.io/api/templates/workflows
- IFTTT Explore/Applets: https://ifttt.com/explore
- Evidence notes: `competitors/evidence/zapier-templates.md`
- Evidence notes: `competitors/evidence/n8n-templates-library.md`
- Evidence notes: `competitors/evidence/ifttt-applets-explore.md`
- Sources ledger: `artifacts/sources.md`
- Matrix: `artifacts/competitor-matrix.md`
- Summary: `artifacts/summary.md`
