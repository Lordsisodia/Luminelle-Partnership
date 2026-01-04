# POC notes — shadcn taxonomy content primitives (MDX + TOC + code blocks)

Repo: `shadcn-ui/taxonomy` (MIT)

Goal (1 day): mine a modern “content app” reference (docs + blog + marketing pages) to extract:
- TOC extraction + TOC UI (active heading highlighting)
- MDX component mapping (callouts, cards, tables, images)
- `rehype-pretty-code` styling patterns (line numbers, highlighted lines/words, code titles)

---

## Concrete file pointers (high signal)

### TOC extraction
- `lib/toc.ts`
  - Uses `mdast-util-toc` to build a hierarchical TOC from markdown/MDX AST

### TOC UI (active heading tracking)
- `components/toc.tsx`
  - Uses `IntersectionObserver` to track the active heading id
  - Renders a nested `Tree` UI; active link state is derived from `activeId`

### MDX component mapping
- `components/mdx-components.tsx`
  - Provides consistent typography for headings + links
  - Includes `Callout` mapping (admonitions)
  - Wraps `table`, `img`, and `pre` consistently

### Code blocks styling (rehype-pretty-code)
- `contentlayer.config.js`
  - Uses `rehype-pretty-code` + `rehype-slug` + `rehype-autolink-headings`
- `styles/mdx.css`
  - `data-rehype-pretty-code` selectors for:
    - line numbers
    - highlighted lines
    - highlighted words
    - code titles

---

## Mapping → Lumelle Blocks Kit contracts

- `TableOfContents`: active heading tracking + nested tree
- `Callout`: consistent admonition semantics + styling
- `CodeBlock`: line numbers + highlight styling + title support

