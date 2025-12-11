# Style Dictionary Drop-in (ready, not wired)

Files (all under `docs/future features/design-token-engine/code/`):
- `style-dictionary.config.cjs` — SD config targeting our default tokens, outputs CSS vars, Tailwind map, resolved JSON.
- `tokens.default.json` — current palette + semantic tokens.
- `tokens.alt-noir.json` — alt brand sample.
- `tokens.schema.json` — JSON Schema.
- `validate-tokens.ts` — Ajv validator.
- `build-tokens.ts` — custom generator (fallback/compare).

Install (when allowed, not done yet)
```
npm i -D style-dictionary@4 ajv ajv-formats ts-node
```

Generate (when allowed)
```
npx style-dictionary build --config docs/future\ features/design-token-engine/code/style-dictionary.config.cjs
```
Outputs (would land in code/generated/ if run):
- `generated.css` — `:root { --text-primary: ... }`
- `tailwind-colors.js` — ES module exporting semantic color map.
- `tokens.resolved.json` — resolved token tree.

Tailwind wiring snippet (for later)
```js
// tailwind.config.js
import { semanticColors } from './src/theme/tailwind-colors.js'

export default {
  // ...
  theme: {
    extend: {
      colors: {
        ...semanticColors,
        // temporary aliases during migration
        brand: { peach: 'var(--accent-cta)', cocoa: 'var(--text-primary)', blush: 'var(--bg-subtle)' },
      },
    },
  },
  plugins: [require('./src/theme/tailwind-plugin.cjs')(semanticColors)],
}
```

CSS import (for later)
```css
/* src/index.css */
@import './theme/generated.css';
```

Runtime hook (for later)
```ts
import { applyBrandTheme } from './theme/runtime-theme'
import tokens from './theme/tokens.json'
applyBrandTheme(tokens)
```

Notes
- Not run, not installed; safe to keep in docs until greenlit.
- Aliases included in snippet to prevent breakage during migration.
