---
status: draft
last_reviewed: 2025-12-28
owner: growth
---

# Audit Session Runbook (Manual Funnel Audits)

Use this when you’re about to do a batch of store audits so results are consistent and comparable.

## Setup (2 minutes)

- Use a real browser (Chrome/Safari).
- Pick one mode and stick to it for the session:
  - Incognito/private (recommended) **or**
  - Normal browsing (but don’t mix within a store)
- Decide region assumptions (important for shipping/returns):
  - default: US, English
- Capture device context:
  - Desktop (window ~1440px)
  - Mobile (real phone preferred; otherwise device emulation)

## Session rules (consistency)

- Don’t sign in or create an account unless the flow forces it (note if it does).
- Don’t apply random coupon codes unless the store pushes one (note if it does).
- Choose a consistent “test product” category per store:
  - Dresses or Tops for womenswear; Leggings for activewear; One-piece for swim
- Stop checkout at the first irreversible step (payment submission).

## Audit path (two-pass method)

### Pass A: Shopper flow (speed)
1) Homepage → click a high-intent entry (New / Best Sellers / Dresses)
2) PLP → apply 2–3 filters → open product
3) PDP → select size/color → add to cart
4) Cart → edit variant/qty; see totals; locate shipping/returns
5) Checkout → note express checkout options + delivery estimate visibility

### Pass B: Skeptic flow (confidence)
Repeat but focus on:
- size help entry points (where doubt happens)
- fabric/care clarity
- reviews usefulness (photos, filtering)
- returns/exchanges clarity and incentives

## Evidence capture

Follow:
- `docs/05-planning/research/market-intelligence/ecommerce-benchmarking/audits/evidence-capture-guide.md`

Preflight tip (recommended):
- Before you start a store, open its audit doc and skim **“Desk research preflight (auto)”**.
  - It contains a curated target URL list + detected tooling signals from HTML snapshots.
  - If it shows high bot protection, expect the store to require a fully manual approach.

Pattern capture tip (recommended):
- During the audit, use the pattern capture checklist to turn screenshots into reusable backlog items:
  - `docs/05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/PATTERN-CAPTURE-CHECKLIST.md`
 - After saving screenshots, run the helper to get “what to update” suggestions:
   - `python3 .blackbox/scripts/research/suggest_pattern_updates_from_evidence.py --help`
 - Optional: auto-apply screenshot links to pattern cards:
   - `python3 .blackbox/scripts/research/apply_evidence_to_patterns.py --help`
 - Recommended: run the store postprocess wrapper (does validation + suggestions + auto-apply + refresh artifacts):
   - `python3 .blackbox/scripts/research/postprocess_store_audit.py --store-slug <store>`

Minimum evidence set per store:
- PLP filters panel
- PDP fit module
- PDP fabric/care module
- PDP reviews module
- Cart edit controls
- Checkout express buttons

## Recording outputs (the 3 things we keep updated)

1) Per-store audit doc:
- `docs/05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/<store>.md`

2) Scorecard row:
- `docs/05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/scorecard.csv`

3) Pattern cards (only when evidence-backed):
- `docs/05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/`

## Session logging (optional but recommended)

Create a session id for a batch:

```bash
python3 .blackbox/scripts/research/create_audit_session.py \
  --plan-artifacts-dir .blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts \
  --auditor "<name>" \
  --notes "audit batch: 3 stores, desktop+mobile"
```

Then fill `auditor` and `session_id` columns in `scorecard.csv`.

Tip: stamp those fields onto both device rows quickly:

```bash
python3 .blackbox/scripts/research/stamp_scorecard.py \
  --scorecard 05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/scorecard.csv \
  --store "Sezane" \
  --auditor "<name>" \
  --session-id "<session_id>"
```

Or do both steps in one command (recommended):

```bash
python3 .blackbox/scripts/research/start_audit_session_and_stamp.py \
  --plan-artifacts-dir .blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts \
  --scorecard 05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/scorecard.csv \
  --auditor "<name>" \
  --stores "Sezane,Reformation,SKIMS" \
  --notes "audit batch: 3 stores, desktop+mobile"
```

## End of session (2 minutes)

- Validate scorecard:
  - `python3 .blackbox/scripts/research/validate_audit_scorecard.py --csv 05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/scorecard.csv`
- Generate progress + rankings:
  - `python3 .blackbox/scripts/research/report_audit_progress.py --in-csv 05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/scorecard.csv --out-md .blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/progress.md`
  - `python3 .blackbox/scripts/research/score_funnel_audits.py --in-csv 05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/scorecard.csv --out-csv .blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/scorecard.scored.csv --out-md .blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/rankings.md`

Or run everything at once:

```bash
python3 .blackbox/scripts/research/run_funnel_audit_reports.py \
  --scorecard 05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/scorecard.csv \
  --plan-artifacts-dir .blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts \
  --patterns-dir 05-planning/research/market-intelligence/ecommerce-benchmarking/patterns \
  --progress-group-by-store \
  --group-by-store
```

Optional (recommended): batch postprocess after you capture screenshots

- If you just captured screenshots for multiple stores, run one command:

```bash
python3 .blackbox/scripts/research/postprocess_batch_audits.py \
  --plan-artifacts-dir .blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts \
  --stores skims reformation sezane
```
