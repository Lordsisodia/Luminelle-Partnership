# POC notes — Blog / content primitives (Next.js + Contentlayer + Pliny)

Repo: `timlrx/tailwind-nextjs-starter-blog` (MIT)

Goal (1 day): extract reusable **blog/article page primitives** and a “minimal content pipeline” blueprint we can re-implement in Lumelle (marketing site, docs, editorial pages):
- MDX component map (links/images/tables/pre/code)
- TOC extraction + TOC UI integration points
- Code blocks pipeline (titles + highlighting)
- SEO metadata + OpenGraph/Twitter + JSON-LD patterns
- RSS + sitemap generation

Guardrails:
- Pattern mining only; avoid copying large code blocks.
- Prefer stable contracts + checklists + file pointers.

---

## Concrete file pointers (high signal)

### Content model + computed fields
- `contentlayer.config.ts`
  - Computed fields:
    - `readingTime` via `reading-time`
    - `toc` via `extractTocHeadings(doc.body.raw)`
  - MDX pipeline:
    - `remarkPlugins`: frontmatter + GFM + code titles + math + image→JSX + GitHub-style alert callouts
    - `rehypePlugins`: slug + autolink headings + katex + citations + prism-plus + minify preset
  - `onSuccess` writes `./app/tag-data.json` (tag index used by RSS + pages)

### MDX component mapping
- `components/MDXComponents.tsx`
  - Component map includes:
    - `TOCInline`
    - `CustomLink` (`a`)
    - `Pre` (`pre`)
    - `TableWrapper` (`table`)
    - `BlogNewsletterForm` (newsletter signup block)
    - `Image`

### Blog page shell + metadata
- `app/blog/[...slug]/page.tsx`
  - `generateMetadata(...)` assembles OpenGraph + twitter + canonical-ish URL patterns
  - Post rendering uses `MDXLayoutRenderer` with `components` and `toc`

### Post layout shell
- `layouts/PostLayout.tsx`
  - “post meta” structure: authors, tags, prev/next navigation
  - Provides “Discuss on …” and “View on GitHub” patterns (good reference for docs/blog UX)

### RSS + sitemap
- `scripts/rss.mjs`
  - Generates RSS feed + **per-tag feeds**, using `app/tag-data.json`
- `app/sitemap.ts`
  - Next.js `MetadataRoute.Sitemap` implementation; includes blog routes + base routes

---

## Mapping → Lumelle Blocks Kit contracts

### `RichContent` (Markdown/MDX renderer)
- Deterministic component map: `MDXComponents.tsx`
- Safe “plugin chain” checklist: `contentlayer.config.ts`

### `TableOfContents`
- TOC extraction via “headings → TocItem[]” computed field
- UI integration: pass `toc` into the renderer/layout and bind active heading state in the UI layer

### `CodeBlock`
- Code titles + syntax highlighting pipeline in the rehype/remark chain

### `NewsletterSignup`
- Newsletter form block appears as a first-class MDX component

### `ArticleMeta` / `BlogPostCard`
- Post shell shows a clean structure for authors/tags/prev-next

---

## Key takeaways (what to reuse)

- Treat “content pipeline” as 3 layers:
  1) **Content model** (document types + computed fields like reading time + toc)
  2) **MDX render pipeline** (remark/rehype chain + safe defaults)
  3) **UI contracts** (TOC, code blocks, callouts, tables, newsletter)
- “Tag index” (`tag-data.json`) is a simple but powerful primitive:
  - supports RSS per tag, tag pages, and local search indexing.

