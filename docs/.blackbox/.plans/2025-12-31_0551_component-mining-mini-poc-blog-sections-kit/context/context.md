# Rolling Context (read first)

Keep this compact and current. This file is the “always read” memory.

## Current goal

- Define a “Lumelle Blocks Kit” inventory and a 1-day mini‑POC plan for a blog/article page + core marketing sections.

## Current assumptions / constraints

- We are mining patterns and defining contracts; we are not cloning/vendoring repos.
- Only copy/adapt code from `license_bucket=safe`; treat `verify` as reference until confirmed.
- Keep the output stack-agnostic where possible (contracts + patterns), and specify a React-first option where needed.

## Current best candidates / hypotheses

- Blog/article pipeline primitives:
  - `remarkjs/remark-rehype`, `rehypejs/rehype-react`, `rehypejs/rehype-slug`, `rehypejs/rehype-autolink-headings`
- Page sections/components primary sources:
  - `saadeghi/daisyui`, `themesberg/flowbite`, `markmead/hyperui`, `mertJF/tailblocks`, `merakiuilabs/merakiui`
  - `ephraimduncan/blocks`, `lmsqueezy/wedges`

## Open questions / decisions needed

1) What is the minimal v1 Blocks Kit scope (ship first) vs “nice to have” (later)?
2) What is the target styling/theming approach (Tailwind utilities vs component primitives vs design tokens)?
3) How do we handle licensing/attribution for aggregated component collections?

## Recent progress (latest 3–5)

- Discovery added a high-signal “sections/components” tranche and it has been fully triaged (no items left in triage).
- Core blog/article pipeline repos were promoted to `status=deepen`.
- New lane doc created: `docs/.blackbox/oss-catalog/lanes/sections-components.md`.
