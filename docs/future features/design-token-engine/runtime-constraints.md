# Runtime & Hosting Constraints (current understanding)

Observations
- App built with Vite React (CSR) per `package.json`; no Next/SSR framework present.
- Likely deployed on Vercel (dev dependency present), but rendering is client-first; HTML shell + hydration.
- No evidence of components-library package locally (path missing), so shared theming boundary TBD.

Implications for theming
- Initial paint happens client-side; avoid FOUC by inlining CSS vars in `index.html` or via Vite HTML transform.
- Runtime swap safe: `runtime-theme.ts` applies a single `<style>` block; minimal recalculation expected (<4ms target).
- Per-tenant theming can be done client-side (fetch brand JSON) or via server injecting active brand vars into HTML if/when SSR is added.

Open questions
- Confirm hosting target and whether server middleware can inject brand tokens at render time.
- Will a components library be imported as a package with its own CSS? If yes, decide whether it consumes app vars or needs bundled vars.
