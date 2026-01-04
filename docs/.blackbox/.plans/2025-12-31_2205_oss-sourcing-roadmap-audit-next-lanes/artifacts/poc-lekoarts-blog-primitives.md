# POC notes — LekoArts blog primitives (Gatsby minimal blog)

Primary repo (starter): `LekoArts/gatsby-starter-minimal-blog` (0BSD)  
Implementation repo (theme): `LekoArts/gatsby-themes` (MIT) → `gatsby-theme-minimal-blog`  

Goal (1 day): extract concrete **blog page primitives** that we can standardize into Lumelle’s Blocks Kit:
- MDX “pre → CodeBlock” mapping
- CodeBlock: copy button, title/filename, optional line numbers, line highlighting
- Post header meta row: date, tags, reading time
- Blog index/list primitives: post list item/card + tag links
- SEO head wrapper: title/description/image/canonical

This is pattern mining (reference implementation). We keep everything contract-level and avoid copying large code blocks.

---

## Concrete file pointers (theme implementation)

Repo: `LekoArts/gatsby-themes`

### MDX component mapping
- `themes/gatsby-theme-minimal-blog/src/components/mdx-components.tsx`
  - Uses `preToCodeBlock` to transform MDX `<pre>` into a structured code block payload.

### Code blocks (copy + line highlighting)
- `themes/gatsby-theme-minimal-blog/src/components/code.tsx`
  - `title` support (rendered above code)
  - copy button (`Copy` component)
  - optional line numbers (from config or per-block flag)
  - highlight lines via a compact “line spec” string
  - per-line highlight class + background style token
- `themes/gatsby-theme-minimal-blog/src/components/copy.tsx`
  - copy-to-clipboard button with accessible status label and “disable for N ms” UX

### Post shell and meta row (date/tags/reading time)
- `themes/gatsby-theme-minimal-blog/src/components/post.tsx`
  - Post title, `<time>`, tag links, optional `timeToRead`
  - Uses `Head` export to drive SEO and canonical URL
- `themes/gatsby-theme-minimal-blog/src/components/item-tags.tsx`
  - Tag link list, based on `basePath` + `tagsPath` config

### Blog index/list item
- `themes/gatsby-theme-minimal-blog/src/components/blog-list-item.tsx`
  - Minimal list item primitive: title link + date + tags

### SEO wrapper
- `themes/gatsby-theme-minimal-blog/src/components/seo.tsx`
  - Title, description, og/twitter tags, optional canonical

---

## Mapping → Lumelle Blocks Kit contracts

### `RichContent`
Evidence:
- MDX component map and pre→code conversion (`mdx-components.tsx`)

### `CodeBlock`
Evidence:
- Copy button UX + accessible label (`copy.tsx`)
- Title/filename + optional line numbers + highlight lines (`code.tsx`)

### `BlogPostCard`
Evidence:
- Blog list item primitive with title/date/tags (`blog-list-item.tsx`)

### Proposed: `ArticleMeta` (date + tags + reading time)
Evidence:
- Post shell’s meta row (`post.tsx`) + tag list (`item-tags.tsx`)

---

## Notes / takeaways

- The most reusable “blog primitives” are not Gatsby-specific:
  - copy-to-clipboard button with accessible status UX
  - title/filename header for code blocks
  - line highlighting + line numbers without breaking copy behavior
  - a consistent meta row (date/tags/reading time)
  - SEO head wrapper including canonical URL

