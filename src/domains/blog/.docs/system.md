# Blog System Overview

## How it works now
- Data source: folder `src/content/blog/`
  - `types.ts` defines `BlogPost` + metadata (`pillar`, `primaryKeyword`, `secondaryKeywords`, `intent`, `status`, `ctaTarget`).
  - `posts/*.ts` one file per post; default export of `BlogPost`.
  - `index.ts` aggregates into `blogPosts`.
- Listing page: `src/domains/blog/ui/pages/BlogIndexPage.tsx`
  - Splits posts into `featured` and `rest`; no pagination yet.
  - Uses `SectionHeading` + card grids.
- Detail page: `src/domains/blog/ui/pages/BlogPostPage.tsx`
  - Finds post by slug from `blogPosts`.
  - Renders hero, structured sections (`sections`) or falls back to `body`.
  - Injects Article + FAQ schema via `injectJsonLd`.
- Component lib: shared `SectionHeading`, `BlogLayout/MarketingLayout` wrappers.

## Pros
- Simple, zero-CMS dependency; fast local edits; easy to add metadata per post.
- SEO basics already covered: meta tags, Article/FAQ JSON-LD, readable slugs.

## Cons / gaps
- Still TypeScript-based; non-engine edits require PRs and deploys.
- No pagination or tag filters; all posts load client-side.
- Images/OG paths must be managed manually.

## Options to improve
1) **Stay TS, add small upgrades (current path)**
   - Use metadata (`pillar`, `keywords`, `status`) to drive filters and index sections.
   - Add `draft` posts that stay out of builds unless explicitly included.
2) **Markdown/MDX content**
   - Store posts as MDX with frontmatter (`slug`, `title`, `date`, `tag`, `featured`, `keywords`, `cta`).
   - Load via `import.meta.glob`; parse frontmatter to `BlogPost`.
   - Enables richer copy editing with fewer code changes.
3) **Headless CMS (later)**
   - Supabase/Contentful/Notion with webhooks to rebuild Vite on publish.
   - Adds preview and non-dev authoring but more infra.

## Recommended near-term actions
- Add tag/pillar filters and optional pagination on the index.
- Use `status: 'draft'` to stage copy without shipping.
- Add a simple content lint (missing `primaryKeyword`/`teaser`/`ogImage`) in CI.

## Planning docs location
- This `docs/` folder sits at `src/domains/blog/docs/` to hold strategy, inventory, briefs, and checklists.
