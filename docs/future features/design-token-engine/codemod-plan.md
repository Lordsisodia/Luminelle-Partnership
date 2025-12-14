# Codemod Plan (no changes applied yet)

Prereqs (to avoid breaking the app)
- Phase 0 must be in place: existing `brand-*` utilities are token-backed and still support opacity modifiers.
- Decide naming strategy before doing any replacements:
  - **Verbose (already available):** use `*-semantic-*` classes based on `colors.semantic.*` (no extra plugin required).
  - **Short aliases (recommended):** add a Tailwind plugin that defines `text-primary`, `bg-subtle`, `border-subtle`, `bg-cta`, etc.
- Keep legacy `brand-*` aliases until grep is zero (excluding `src/archive/**`).
Note on opacity:
- The short alias classes (`text-primary`, `bg-cta`, etc.) are custom utilities and should be treated as “100% opacity” helpers (no `/NN` shorthand).
- For opacity-sensitive migration (most existing code), prefer the verbose `*-semantic-*` utilities (e.g. `text-semantic-text-primary/80`, `bg-semantic-accent-cta/40`, `bg-semantic-legacy-brand-blush/20`).

Scope
- Replace brand-specific utilities and raw hexes with semantic equivalents once token engine is wired.

Mappings
- Text:
  - `text-brand-cocoa` → `text-primary` (or `text-semantic-text-primary`)
  - `text-brand-cocoa/XX` → `text-primary text-opacity-XX` (or `text-semantic-text-primary/XX`)
- CTA/surfaces:
  - `bg-brand-peach` → `bg-cta` (or `bg-semantic-accent-cta`)
  - `bg-brand-peach/XX` → `bg-cta bg-opacity-XX` (or `bg-semantic-accent-cta/XX`)
  - `bg-brand-blush` → `bg-semantic-legacy-brand-blush` (exact match; supports `/XX`)
  - `bg-brand-blush/XX` → `bg-semantic-legacy-brand-blush/XX` (exact match)
- Borders:
  - `border-brand-blush` → `border-semantic-legacy-brand-blush` (exact match; supports `/XX`)
  - `border-brand-blush/XX` → `border-semantic-legacy-brand-blush/XX` (exact match)
- Gradient literals (`#F9D8D0,#FCEBE3,#FDE7DA,#fff2eb,#FFF6F2,#fff7f3,#FFE8DC,#FDD9C3,#F7B8A0,#F4C7B7`) → apply `bg-hero-gradient` or new tokenized gradients.
- State hexes: `#0F9D58` → `text-success`; `#FACC15` → `text-warning`; `#E16F5C` → `text-danger`.
- Promo/testimonial: `#E0724A` → `promo.highlight`; `#9938CA/#8B5CF6` → `accent.info` (or dedicated promo-secondary if needed).

Commands (dry-run examples)
- Replace utilities (preview):
  - `rg "text-brand-cocoa" -l src | xargs sed -n 'p'` (audit only)
  - `rg -l "text-brand-cocoa" src | xargs npx sd "text-brand-cocoa" "text-primary"` (after approval)
- Replace hexes:
  - `rg "#0F9D58" -l src | xargs npx sd "#0F9D58" "var(--state-success)"`
  - `rg "#FACC15" -l src | xargs npx sd "#FACC15" "var(--state-warning)"`
  - Gradients: handle per-file to preserve stop ordering; swap to `bg-hero-gradient` class or CSS var.

Safety
- Run `npm run build` after each codemod wave (ensures Tailwind + app compilation still succeed).
- Keep legacy brand colors aliased in Tailwind for one release to prevent breakage during rollout.
- Execute visual regression suite (Playwright) on pilot pages before removing aliases.

Status: not executed; ready for when integration branch is created.
