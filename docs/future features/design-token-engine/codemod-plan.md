# Codemod Plan (no changes applied yet)

Scope
- Replace brand-specific utilities and raw hexes with semantic equivalents once token engine is wired.

Mappings
- `text-brand-cocoa` → `text-primary`
- `text-brand-cocoa/XX` → `text-primary/XX`
- `bg-brand-peach` → `bg-cta`
- `bg-brand-blush` → `bg-subtle`
- `bg-brand-blush/XX` → `bg-subtle/XX`
- `border-brand-blush` → `border-subtle`
- `border-brand-blush/XX` → `border-subtle/XX`
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
- Run `npm run tokens` and rebuild Tailwind after codemod.
- Keep legacy brand colors aliased in Tailwind for one release to prevent breakage during rollout.
- Execute visual regression suite (Playwright) on pilot pages before removing aliases.

Status: not executed; ready for when integration branch is created.
