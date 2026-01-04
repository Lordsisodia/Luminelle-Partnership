# Rolling Context (read first)

Keep this compact and current. This file is the “always read” memory.

## Current goal

- Design a plug‑in architecture so UI depends only on stable internal contracts (ports), while Shopify/Stripe are replaceable adapters.

## Current assumptions / constraints

- No code changes in this run (research/design only).
- Shopify is current system of record for commerce; Stripe (or others) may be added later.
- UI must not hardcode vendor IDs/types/copy; capabilities drive behavior.

## Current best candidates / hypotheses

- Ports/adapters (hexagonal) with capability flags is the right abstraction:
  - UI → domain logic → platform ports → vendor adapters (Shopify, Stripe, mock).

## Open questions / decisions needed

1) Should `CatalogPort` and `ContentPort` be implemented primarily via **internal API** (functions) or via **client Storefront** calls (or a hybrid)?
2) What is the minimum “checkout handoff” capability model needed to hide proxying (/cart/c/*, /checkouts/*, etc) from UI?
3) What internal key naming scheme do we standardize on (`VariantKey` examples, mapping rules, failure modes)?

## Recent progress (latest 3–5)

- Architecture + contracts + migration plan were drafted into the run folder (`final-report.md`, `ports.md`, `rankings.md`).
- Evergreen versions were promoted into `docs/05-planning/research/`.
- A granular, execution-ready ticket backlog was added.
- Repo scan expanded coupling evidence (Shopify IDs/copy in UI, server-side checkout proxying, server-side Storefront APIs).
