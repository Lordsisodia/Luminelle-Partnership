# OSS Project Entry

## Identity

- Name: meilisearch
- Repo: https://github.com/meilisearch/meilisearch
- Full name: meilisearch/meilisearch
- License: ⚠️ unknown (verify) — NOASSERTION
- Stars (approx): 55129
- Primary language: Rust
- Last updated: 2025-12-28T13:21:07Z
- Topics: ai, api, app-search, database, enterprise-search, faceting, full-text-search, fuzzy-search, geosearch, hybrid-search, instantsearch, search, search-as-you-type, search-engine, semantic-search, site-search, typo-tolerance, vector-database, vector-search, vectors

## What it gives us (plain English)

- A lightning-fast search engine API bringing AI-powered hybrid search to your sites and applications.
- Why this matters: Improves conversion via faster search + merchandising rules (synonyms/boosts) with minimal build time.

## What feature(s) it maps to

- search

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth):
  - Non-TS core; integrate via service boundary (HTTP/API) and keep our admin as the primary UI.
- Setup friction (self-host? SaaS? Docker?): Run the search engine as a service; feed it via a small indexing job.
- Data model alignment: Keep product truth in our DB; index is a derived cache (rebuildable).

## Adoption path

- 1 day POC: Index products + build a simple search endpoint + verify relevance.
- 1 week integration: Add synonyms/boost rules UI + incremental reindex + failure alerts.
- 1 month hardening: Multi-tenant indexes + relevance tuning playbook + cost/perf benchmarks.

## Risks

- Maintenance risk: upgrades + ecosystem drift; mitigate with pinning + quarterly update cadence.
- Security risk: treat as privileged system; isolate network + secrets; audit write actions.
- Scope mismatch: avoid "replace our platform" scope; extract one slice at a time.
- License risk: License not asserted; confirm actual license + commercial terms before any integration.

## Sources

- https://github.com/meilisearch/meilisearch

## Score (0–100) + reasoning

- Score: …
- Why: …
