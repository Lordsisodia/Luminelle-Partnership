---
status: active
last_reviewed: 2025-12-28
owner: docs
---

# Docs structure (8 root categories)

## Context

The `docs/` folder is where the project’s code-adjacent docs, ideas, and operational runbooks live. The docs were growing wide and hard to scan.

## Decision

- Keep `docs/` organized into **8 visible root folders** (plus hidden `docs/.blackbox/`).
- Enforce two constraints:
  - `docs/` has **6–10** visible root folders
  - each root folder has **1–10** direct child folders

## Why this works

- Keeps the “top level” readable in Finder/GitHub
- Encourages intentional grouping instead of adding new buckets
- Makes onboarding and navigation predictable

## Follow-ups

- Use the validator: `docs/.blackbox/scripts/validate-docs.py` (compat wrapper: `docs/08-meta/maintenance/validate_docs.py`)
- Add README hubs when a folder grows
