# OSS Discovery Query Bank (combined)

## Base query bank

# GitHub Search Queries — Blog/content topics (v1)

Goal: find **reusable content/blog primitives** (MDX/Markdown rendering, code blocks, TOC, callouts)
via GitHub Topics + a small set of less-strict keyword queries.

Notes:
- Topic lists (comma-separated backticked tokens) expand into `topic:<token>` queries.
- Prefer `--min-stars 200` (or higher) to keep results high-signal.
- Run with `--no-derived-queries` to avoid workflow/returns bridge-query pollution.

## Markdown/MDX toolchain (topics)

- `mdx`, `mdxjs`, `react-markdown`, `remark`, `rehype`, `unified`, `shiki`

## Content pipelines / site generators (topics)

- `contentlayer`, `nextra`, `docusaurus`, `documentation`, `docs`, `markdown`

## Keyword queries (less strict; avoid “portfolio” matches)

- `react markdown component`
- `mdx react`
- `remark mdx`
- `rehype code`
- `shiki react`
- `table of contents react`
- `reading time react`
- `callout component react`
- `code block component react`

## Derived from competitor feature map

# OSS Discovery Queries (derived from feature map)

_Disabled for this run._

