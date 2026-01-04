# OSS Project Entry

## Identity

- Name: Bagisto
- Repo: https://github.com/bagisto/bagisto
- Full name: bagisto/bagisto
- License: MIT
- Primary language: PHP (Laravel)

## What it gives us (plain English)

- A full-featured ecommerce platform built on Laravel (admin + storefront capabilities)
- A “batteries included” baseline for common merchant needs (catalog, orders, customers, promotions)
- A real-world example of how an OSS ecommerce platform structures themes/extensions/admin modules
- Useful reference for “what an SMB ecommerce admin needs day-1” (even if we don’t adopt the stack)

## What feature(s) it maps to

- E-commerce store builder baseline (catalog + orders + customer ops)
- Storefront generation patterns (theme/layout, content blocks, merchandising)
- Admin operations UX patterns (search, filtering, bulk actions, status transitions)
- Extension ecosystem patterns (plugins/modules)

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Low if adopted as core (PHP/Laravel), medium/high as a patterns + checklist repo.
- Setup friction (self-host? SaaS? Docker?): Medium (Laravel + DB; straightforward but still a full platform).
- Data model alignment: Good reference for domain entities; adoption requires accepting Bagisto’s architectural model.

## Adoption path

- 1 day POC:
  - Run Bagisto locally (Docker or local PHP tooling) and complete first-run setup.
  - Create a minimal catalog and place a test order.
  - Explore admin flows for: catalog edits, order lifecycle, customer management, discounts/promotions.
  - Identify which “store builder” parts map to our needs (themes, templates, merchandising primitives).
- 1 week integration:
  - If “reference only”:
    - Extract the “minimum merchant admin feature set” into our internal roadmap for generated stores.
    - Capture patterns for merchandising, taxonomy, and content blocks.
  - If “adopt for non-Shopify builds”:
    - Define a safe extension model (no forks) and a deployment model (one-tenant-per-instance vs multi-tenant).
    - Implement 1 custom module (e.g., additional payment/shipping rules) + audit trail for changes.
    - Build “support/admin” tooling (event timeline + data correction workflows).
- 1 month hardening:
  - Establish upgrade policy (Laravel/Bagisto versions), security patch cadence, backups.
  - Multi-tenant isolation + PII retention rules.
  - Observability + incident response playbooks (checkout failures, payment callbacks, data fixes).

## Risks

- Maintenance risk: High if adopted as core (full platform). Low if used as a reference architecture.
- Security risk: High if hosted for merchants (checkout + payments + PII).
- Scope mismatch: Medium/High for Shopify-first (more a competitor/reference than a primitive).
- License risk: Low (MIT).

## Sources

- https://github.com/bagisto/bagisto
- https://raw.githubusercontent.com/bagisto/bagisto/2.3/LICENSE

## Score (0–100) + reasoning

- Score: 48
- Why: MIT-licensed, “batteries included” reference for store builder UX/features; unlikely to be adopted as core for a TS-first Shopify app business, but good for feature checklists and merchandising patterns.

