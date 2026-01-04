---
status: active
updated_at_utc: 2025-12-30T18:30:00Z
owner: synthesis-agent-zero
scope: "Human operator runbook for screenshot evidence capture"
---

# Women’s Fashion Manual Audits — Human Screenshot Capture Runbook

This runbook is for the **human-in-browser** step that unblocks conversion-proof benchmarking.

The agent can preflight URLs and parse HTML snapshots, but it cannot capture real UI screenshots.

## 1) What “done” looks like (per store)

For each store, we consider the audit “evidence-backed” once **both devices** have:
- Screenshot evidence (saved to disk)
- Page URL captured alongside the screenshot in the store audit doc
- 1–3 bullets of notes per funnel stage (what helps conversion vs what hurts)

Devices:
- `desktop`
- `mobile`

Minimum funnel stages:
- `home`
- `plp` (or search results)
- `pdp`
- `cart`
- `checkout` (start / first step is enough; do not enter sensitive data)
- `returns` and/or `size_fit` (if store has strong fit/returns content)

## 1.1) MVP shortcut (if you’re time-boxed)

If you only have ~10–15 minutes per store, capture a “minimum viable evidence set”:
- Home: hero + nav + above-fold reassurance
- PLP: filters open + product grid
- PDP: above-the-fold (price/variants/ATC)
- PDP: size/fit entry point
- PDP: shipping/returns reassurance surface
- Cart: edit controls + totals
- Checkout: first step + express buttons + guest/login gate

This is enough to:
- fill the scorecard minimally,
- generate initial pattern suggestions,
- and pick “best stores to model after” with actual proof.

## 2) Where screenshots must be saved

Save screenshots into:
- `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/evidence/<store>/`

Each store already has a checklist file that lists exactly what to capture:
- `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/evidence/<store>/CHECKLIST.md`

## 3) Naming convention (required for automation)

Filename format:
- `<store>__<device>__<stage>__<feature>__YYYYMMDD.png`

Examples:
- `skims__desktop__pdp__bnpl-placement__20251230.png`
- `skims__mobile__cart__shipping-threshold__20251230.png`
- `reformation__desktop__pdp__size-fit-module__20251230.png`
- `rent-the-runway__mobile__home__join-now-hero__20251230.png`

Notes:
- Use store slugs exactly as folder names (e.g., `rent-the-runway`, `universal-standard`).
- Use `.png` preferred.

## 4) How to capture “checkout” safely

Goal is to capture **trust cues + express checkout options + friction**, not to complete a purchase.

Safe approach:
- Add a product to cart
- Click “Checkout” / “Continue”
- Capture the first checkout page or the first gate (guest vs login) plus any express buttons
- Stop before entering payment details

If checkout is gated (account required / membership):
- Capture the gate screen and note the requirement in the audit doc.

## 5) How to document evidence inside the audit doc

For each store, fill:
- `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/<store>.md`

Minimum:
- Add screenshot paths into the **Evidence index** table.
- Add the page URL in the “note” column (or in the funnel notes section).

## 6) After screenshots are added: run postprocess

After you add screenshots for a store, run:
- `python3 .blackbox/scripts/research/postprocess_store_audit.py --store-slug <store>`

This generates:
- pattern update suggestions + (optional) auto-apply report
- refreshed audit progress + evidence coverage + rankings

Batch helper (recommended after a 2–3 store session):
- This will:
  - show screenshot counts per store
  - run postprocess for stores that have evidence
  - print the evidence folder paths for stores that don’t

```bash
python3 .blackbox/scripts/research/postprocess_batch_audits.py \
  --plan-artifacts-dir .blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts \
  --stores skims reformation sezane
```

## 6.1) Quick verification (before postprocess)

Sanity check that screenshots are actually present for a store (example: `skims`):

- Count screenshots:
  - `find .blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/evidence/skims -maxdepth 1 -type f -name "*.png" | wc -l`
- List the most recent screenshots:
  - `ls -lt .blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/evidence/skims | head`

## 7) Recommended audit order (reachability-first)

Stores that are 0% blocked in snapshots (fastest to audit):
- Batch‑01: `skims`, `reformation`, `sezane`
- Batch‑02: `alo-yoga`, `summersalt`, `thirdlove`
- Batch‑03: `rouje`, `ganni`, `universal-standard`
- Batch‑04: `rent-the-runway` (note: `mytheresa` snapshots look like failover; treat as manual-only and expect potential bot friction)

Master reachability table:
- `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/PRE-AUDIT-PRIORITY.md`
