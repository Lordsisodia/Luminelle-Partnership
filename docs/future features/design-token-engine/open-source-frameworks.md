# Open-Source Token Frameworks (fit for our use case)

## Shortlist

1) Style Dictionary (Amazon) — MIT
- What it is: Reference-grade compiler/transformer; now aligned with DTCG 2025.10.
- Why it helps us: Can replace/augment our custom `build-tokens.ts`, emitting CSS vars + Tailwind map + platform targets; stable ecosystem; easy to add custom transforms for gradients/color-mix.
- Action: Add a Style Dictionary config that mirrors our outputs; run in pilot branch to compare with custom script.

2) Tokens Studio for Figma — MIT
- What it is: Figma token editor with Git sync and DTCG export.
- Why it helps us: Lets design own the source of truth; we ingest exported JSON directly into Style Dictionary, keeping design↔dev parity.
- Action: Set up export pipeline (manual or GitHub Action) to drop `tokens.json` into repo; validate against schema.

3) TokensBrücke (Figma Variables → DTCG) — MIT
- What it is: Converter from Figma Variables to DTCG JSON with modes.
- Why it helps us: If we adopt Figma Variables instead of plugin storage, this is the bridge; keeps modes (light/dark) intact.
- Action: Evaluate on a sample Figma file; compare export to Tokens Studio output for fidelity.

4) design-token-transformer (example pipeline) — MIT
- What it is: Reference repo showing CI + Style Dictionary flow.
- Why it helps us: We can copy its CI pattern (validate → build → publish artifacts) instead of writing from scratch.
- Action: Lift its GitHub Actions snippets into our CI once we pick Style Dictionary.

5) Figma Token Engine (Style Dictionary–backed) — MIT
- What it is: Example project turning Figma exports into CSS via Style Dictionary.
- Why it helps us: Good source of transformer examples (e.g., gradients, shadows) and Tailwind wiring ideas.
- Action: Borrow transformer snippets for gradients/shadows if SD defaults aren’t sufficient.

## How this helps our use case
- Reduces bespoke code: Style Dictionary can generate all outputs we need (CSS vars, Tailwind map) more robustly than our custom script.
- Keeps design in sync: Tokens Studio/TokensBrücke give design a true source of truth; exports drop straight into the build, minimizing drift.
- Standards-compliant: All shortlisted tools speak DTCG 2025.10, so future integrations (other platforms, themes) stay compatible.
- Faster rollout: Reusing CI/pipeline patterns from existing repos shortens time to a governed, validated token flow.
- Multi-brand ready: DTCG + Style Dictionary support modes/themes natively; our per-tenant loader can simply consume compiled CSS vars per brand.

## Recommended next moves
- Pilot Style Dictionary alongside our generator in the token pilot branch; compare outputs and choose one.
- Pick design-side source (Tokens Studio vs. Figma Variables + TokensBrücke) and set up an export step.
- Import CI patterns from design-token-transformer to enforce validate/build in PRs.
