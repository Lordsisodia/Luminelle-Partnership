# Audit artifacts

- `brand-class-counts.txt` — occurrences of `brand-peach|brand-cocoa|brand-blush` utilities across src (rg snapshot, sorted by file/count).
- `hex-counts.txt` — unique hex literals and counts across src.
- `raw-colors-YYYY-MM-DD.json` — machine-readable snapshot from `npm run report:colors -- --json` (raw hex literals in `src/`, excluding `src/archive/` + `src/theme/`).
- `color-contexts-YYYY-MM-DD.json` — machine-readable snapshot from `npm run report:colors:contexts -- --json` (Tailwind `bg-[...gradient...]` + SVG `fill/stroke="#..."` hexes).

Notes
- Dominant usage: cocoa (text), blush (borders/surfaces), peach (CTA/accents). Checkout, PDP, blog pages show highest concentrations.
- Stray hexes captured for mapping to semantic tokens (see codemod-plan.md).

How to refresh snapshots (report-only, no visual change)
```bash
# raw hex usage
npm run report:colors -- --json --limit=200 > "docs/05-planning/future-features/design-token-engine/audit/raw-colors-$(date +%F).json"

# gradients + svg hex usage
npm run report:colors:contexts -- --json --limit=200 > "docs/05-planning/future-features/design-token-engine/audit/color-contexts-$(date +%F).json"
```

Pending decision (still left untouched to avoid visual drift)
- `bg-brand-porcelain` surfaces: awaiting approval to map to a semantic surface token (proposal: `semantic.surface.subtle = #FDF8F6`), otherwise snapshots will continue to show porcelain usage.
