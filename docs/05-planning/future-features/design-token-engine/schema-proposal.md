# Token Schema Proposal (draft)

## Structure
- `meta`: { brand, version, mode?, updatedAt }
- `base`: canonical, tool-agnostic values (colors, radii, spacing, typography primitives, shadows, motion). No semantic meaning.
- `semantic`: role-based tokens used in UI (text.primary, bg.surface, accent.cta, state.success, promo.highlight, etc.).
- `modes` (optional): overrides for semantic/base keyed by mode (`light`, `dark`, `highContrast`).
- `aliases`: optional named groups for ergonomics (e.g., palette ramps) mapping to base tokens.

## Types
- Primitive: color (CSS Color 4 strings allowed), dimension (px/rem), number, string, gradient, shadow, duration, easing.
- Composite: border {color,width,style,radius}, shadow {x,y,blur,spread,color}, typography {fontFamily, fontWeight, lineHeight, letterSpacing}.
- References: `{path.to.token}` resolved at build time; supports chained references.

## Naming rules
- No raw color words in semantic names; names express role (e.g., `text.inverse`, `bg.subtle`, `accent.cta`).
- Keep two-level depth max for semantics to avoid sprawl.
- Brand-specific overrides live in separate JSON files; shared semantic keys stay identical to enable drop-in swapping.

## Modes
- Shape: `modes.light.semantic.text.primary`, `modes.dark.semantic.text.primary` etc. Fallback to root semantic when missing.
- Can be extended to `contrast` variants if needed.

## Validation
- JSON schema to enforce: required meta.brand/version; presence of base + semantic; no dangling references; allowed value formats for color/dimension.
- CI step: `npm run tokens -- --validate` to ensure schema + reference resolution passes.

## Rationale
- Aligns with DTCG 2025.10 stable spec (supports theming, aliases, modern color spaces). citeturn0search0turn0search1
- Keeps current palette as defaults; drop-in brand JSON enables reseller/tenant theming.
