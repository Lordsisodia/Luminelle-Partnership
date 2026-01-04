# Summary (durable insights)

## Cycle 1

- This run expands the adjacent exemplar set from 30 → 100 to increase niche coverage and reduce “fashion-only bias”.
- Static HTML snapshots provide a fast triage layer (platform + vendors + trust tooling) but cannot replace manual funnel audits.
- In the 100-store set, 93 homepages were snapshot successfully; 7 consistently timed out (large retail + a few DTC brands).
- “Blocked/defended” pages show up frequently enough (16%) that any “best-in-class” ranking must tolerate partial evidence coverage.
- The most common transferable mechanics detectable via HTML snapshots are:
  - Trust tooling: reviews vendors and returns tooling (lower risk in a women’s fashion build).
  - Discovery: search/personalization vendors (high ROI for large catalog + long-tail PLPs).
  - Offer UX: BNPL signals (sensitive to AOV; more relevant for premium categories).
- A “signals-first” ranking tends to favor niches where vendors are visible in homepage HTML (beauty DTC), so any shortlist should be reviewed for niche relevance, not just score.
- Vendor concentration is noticeable in the adjacent set (e.g., BNPL and reviews tools cluster into a small number of providers), which helps reduce tool sprawl when mapping “what to integrate first”.
- Tier‑B funnel snapshots (product/policy/support pages) are a practical compromise when Tier‑A screenshots aren’t available: they greatly improve signal quality and reduce “blocked evidence” issues.
- A “per-niche leaders” approach is a better way to decide what to model than a single global top-N, because it avoids overfitting to niches whose stacks are easiest to detect.
- Promoting research into backlog rows is the right “bridge artifact” before engineering: it forces module ownership and acceptance tests even when Tier‑A screenshots are still pending.
