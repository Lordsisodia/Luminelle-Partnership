# OSS Project Entry

## Identity

- Name: Liquid
- Repo: https://github.com/Shopify/liquid
- Full name: Shopify/liquid
- License: MIT
- Primary language: Ruby

## What it gives us (plain English)

- The canonical Liquid template engine implementation (Shopify origin)
- Reference semantics for:
  - parsing/rendering behavior
  - filters/tags behavior
  - edge cases that affect theme correctness
- A strong “ground truth” source when we need to:
  - validate generated Liquid templates
  - build static analysis around Liquid
  - ensure our generator doesn’t rely on undefined behavior

## What feature(s) it maps to

- Storefront generator correctness (Liquid semantics)
- Theme validation + static analysis (AST + linting patterns)
- Migration/upgrade safety (detect breaking changes in templates)

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Indirect (Ruby lib), but we mainly need this as a spec/reference, not as a runtime dependency.
- Setup friction (self-host? SaaS? Docker?): Low if used as reference; medium if embedded into a service for validation.
- Data model alignment: High for Shopify themes/Liquid.

## Adoption path

- 1 day POC:
  - Identify the minimum “Liquid correctness suite” we need:
    - parse + render a set of generated templates
    - ensure no syntax errors and that important constructs compile
  - Decide if we validate by:
    - running Shopify Theme Check only (fast path), or
    - adding an additional Liquid parse/compile stage for extra safety.
- 1 week integration:
  - Add a “template validation” job:
    - compile/parse all generated Liquid files
    - fail deploy if parsing fails
  - Create a small regression suite of Liquid snippets that have historically broken (from client work).
  - Document “allowed Liquid features” for generated themes (e.g., avoid dynamic include patterns if they cause maintainability issues).
- 1 month hardening:
  - Build a “theme template diff + validation” tool:
    - compare two versions of generated theme output
    - highlight template changes that could affect rendering
  - Keep version pinning and test coverage aligned with Shopify updates.

## Risks

- Maintenance risk: Low/Medium. Mostly depends on how tightly we couple to Liquid version changes.
- Security risk: Medium if we ever render untrusted Liquid in a service context (sandboxing concerns); avoid server-side rendering of untrusted templates.
- Scope mismatch: Low for theme-based storefront generation.
- License risk: Low (MIT).

## Sources

- https://github.com/Shopify/liquid
- https://raw.githubusercontent.com/Shopify/liquid/main/LICENSE

## Score (0–100) + reasoning

- Score: 60
- Why: More “spec/reference” than a product component; still valuable as ground truth for validation and for writing robust tooling around theme generation.

