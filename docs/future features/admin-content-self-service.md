# Admin Content Self-Service — Research Outline

Goal: let clients swap images and copy across the app without developer intervention while keeping quality, safety, and performance intact.  
Assumption (Dec 11 2025): media will live in Supabase Storage; keep this fixed unless requirements change.

## Scope to cover
- Images: hero/section art, product galleries, blog cover/inline images, app UI icons where feasible.
- Copy: hero/CTA text, product descriptions, feature bullets, banners, footers, FAQs.
- Blog: title, body (rich text), tags/categories, authors, publish date, hero image, SEO fields.

## Research tracks
1) **Platform choice (what “CMS candidates” means)**  
   - Decide between:  
     a) A hosted headless CMS (e.g., Sanity, Contentful) feeding the app.  
     b) An open-source/self-hosted CMS layer (e.g., Strapi/Directus) on top of our stack.  
     c) A lean bespoke admin we build on Supabase (DB + Storage) with our own content schemas and preview endpoints.  
   - Criteria: roles & workflows, media library UX, rich-text safety, localization, webhooks, preview API, rate limits, pricing, and how well each option works with Supabase Storage (fixed choice).
2) **Content modeling**  
   - Schemas for product, page sections, global settings, blog post, media asset.  
   - Localization/variant strategy, required vs optional fields, enumeration for reusable copy (CTAs, badges), ordering/priority fields.
3) **Media pipeline**  
   - Upload limits, accepted formats, auto conversion to WebP/AVIF, focal point + cropping, responsive renditions, CDN + cache headers.  
   - Storage choice (S3/R2/Vercel Blob/CMS-native), lifecycle/cleanup of unused assets.
4) **Admin UX**  
   - Draft vs published, preview links, side-by-side desktop/mobile preview.  
   - WYSIWYG vs structured rich text (portable text/blocks), inline validation, image focal-point picker, drag-reorder lists.  
   - Accessibility guards: alt text required, color contrast warnings for banners.
5) **Security & governance**  
   - AuthN/AuthZ (role-based), audit log, version history/rollback, publishing approvals, backup/restore cadence.  
   - Content sanitization for rich text and embeds.
6) **Delivery & rendering**  
   - How frontend fetches content: static builds vs on-demand revalidation; draft preview token flow; caching strategy.  
   - Error handling and fallbacks when content is missing or unpublished.
7) **Migration & seeding**  
   - Map current hardcoded copy/images into schemas; bulk import plan; content IDs kept stable; redirects/SEO preservation.
8) **Developer ergonomics**  
   - “Schema as code” (checked into repo), type generation for frontend, fixtures for local dev, CI checks for schema changes.

## Success criteria
- Non-technical users can update images/text/blogs end-to-end (draft → preview → publish) without code changes.  
- Changes propagate within agreed SLA (e.g., <5 min) and retain performance budgets (LCP/CLS unaffected).  
- Rollback/version history available; audit trail of who changed what.  
- Media served through optimized CDN variants with correct caching.

## Open questions
- Do we need localization/multi-tenant support?  
- Preferred auth source (existing accounts vs CMS accounts vs SSO)?  
- Are products mastered in Shopify or entirely headless here?  
- Do we need content scheduling and embargoed posts?

## Next steps
- Pick top 2 CMS candidates and run spike: model 1 product, 1 hero section, 1 blog post; wire draft preview into the app.  
- Measure authoring UX time-to-publish and frontend perf.  
- Decide storage/CDN stack and rollout plan.
