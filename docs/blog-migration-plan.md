# Lumelle Blog Migration & Client Management Plan

## Current State

**Database**: Supabase blog tables are created and populated
- **35 blog posts** migrated (23 published + 12 draft)
- Tables: `blog_authors`, `blog_categories`, `blog_tags`, `blog_posts`, `blog_post_tags`, `blog_post_faqs`
- RLS policies configured for public/authenticated access

**Frontend**: Still using file-based imports (linter reverted Supabase changes)
- `BlogIndexPage.tsx` - imports from `@/content/blog`
- `BlogPostPage.tsx` - imports from `@/content/blog`

---

## Migration Roadmap

### Phase 1: Switch Frontend to Supabase ✋ Ready

1. **Update BlogIndexPage.tsx**
   - Replace `import { blogPosts } from '@/content/blog'` with `useBlogPosts()` hook
   - Use existing `useBlogPosts` from `/src/domains/client/blog/application/`

2. **Update BlogPostPage.tsx**
   - Replace file lookup with `useBlogPost(slug)` hook
   - Use existing `useBlogPost` from `/src/domains/client/blog/application/`

3. **Test locally**
   - Verify all 35 posts load correctly
   - Check mobile layout
   - Confirm SEO metadata

### Phase 2: Build Admin UI for Clients 🛠️

Create a user-friendly admin interface for managing blog content:

**Features:**
- Post list with filtering (status, category, author)
- Create/edit/delete posts
- Rich content editor (or structured sections)
- Draft preview mode
- Bulk actions (publish, archive)
- SEO preview (meta title, description, OG image)
- Media management (images)

**Pages needed:**
```
/admin/blog
  ├── /admin/blog                    # Post list with filters
  ├── /admin/blog/new                # Create new post
  ├── /admin/blog/:id                # Edit post
  ├── /admin/blog/:id/preview        # Preview draft
  ├── /admin/blog/categories         # Manage categories
  └── /admin/blog/tags               # Manage tags
```

### Phase 3: Client-Friendly Improvements 🎨

**Content Management:**
1. **Content Templates** - Pre-built structures for common post types
   - How-to guides
   - Product reviews
   - Creator tips
   - Travel routines

2. **Media Library** - Easy image upload/management
   - Direct Supabase Storage integration
   - Drag-and-drop upload
   - Image optimization

3. **Publishing Workflow** - Draft → Review → Published
   - Schedule posts
   - Content review dates
   - Version history

4. **SEO Helpers** - Built-in optimization
   - Character counters for meta descriptions
   - Keyword density checker
   - OG image preview

---

## Which Blogs to Move Over?

### Already Migrated (35 total)

**Published (23):**
1. about-lumelle
2. best-shower-cap-for-frizz-prone-hair
3. creator-tiktok-scripts
4. do-heatless-curlers-work
5. do-shower-caps-really-protect-hair
6. frizz-free-showers-seo
7. gym-sauna-spa
8. hairline-health-bands
9. how-to-make-heatless-curls-last-longer
10. how-to-protect-a-blow-dry-in-the-shower
11. how-to-protect-hair-while-sleeping
12. how-to-reduce-frizz-without-heat
13. how-to-stop-frizz-in-the-shower
14. is-satin-good-for-your-hair
15. lumelle-journal-launch
16. protective-styles-in-the-shower
17. refresh-and-clean-cap
18. satin-vs-silk-for-hair
19. silk-press-shower-cap-guide
20. steam-proof-bathroom
21. travel-ready-hair-kit
22. wash-day-mistakes
23. why-satin-matters

**Draft (12):**
1. beach-pool-hair-protection
2. carry-on-hair-kit
3. deep-clean-satin-cap
4. dorm-bathroom-steam-routine
5. dry-and-store-shower-cap
6. gym-sauna-hair-routine
7. hotel-steam-hacks
8. kid-friendly-shower-routine-frizz
9. postpartum-edges-shower-routine
10. red-eye-flight-hair-routine
11. when-to-replace-shower-cap
12. wide-band-shower-cap-care

---

## Making It Easy for Clients

### Quick Actions Dashboard
```
┌─────────────────────────────────────────┐
│  BLOG DASHBOARD                          │
├─────────────────────────────────────────┤
│  ✏️ Write New Post                       │
│  📋 View Drafts (12)                     │
│  📊 Analytics                            │
│  📅 Schedule Post                        │
└─────────────────────────────────────────┘
```

### Simple Editor Interface
```
┌─────────────────────────────────────────┐
│  Edit: Beach Pool Hair Plan              │
├─────────────────────────────────────────┤
│  Title: [_________________]              │
│  Category: [Travel ▼]                   │
│  Status: [Draft ▼]                      │
│                                          │
│  SECTIONS                                │
│  ┌────────────────────────────┐         │
│  │ 📝 Pre-beach setup          │ ➕ Add  │
│  │ 📝 Cap strategy by zone    │        │
│  │ 📝 Post-beach reset         │        │
│  └────────────────────────────┘         │
│                                          │
│  SEO                                    │
│  Meta Title: [_____________] 58/60       │
│  Meta Desc: [_____________] 156/160      │
│                                          │
│  [Save Draft] [Preview] [Publish]        │
└─────────────────────────────────────────┘
```

---

## Next Steps

1. **Switch frontend to Supabase** (30 min)
2. **Build admin UI** (2-4 hours)
3. **Add content templates** (1 hour)
4. **Test with client** (feedback loop)

---

## Migration Script Reference

```bash
# Re-run migration (upserts existing posts)
npx tsx scripts/migrate-blog-to-supabase.ts

# Check Supabase directly
# Query: SELECT slug, title, status FROM blog_posts;
```

---

## Files to Update

**Frontend:**
- `/src/domains/blog/ui/pages/BlogIndexPage.tsx`
- `/src/domains/blog/ui/pages/BlogPostPage.tsx`

**Admin (to create):**
- `/src/domains/admin/blog/ui/pages/BlogAdminPage.tsx`
- `/src/domains/admin/blog/ui/pages/BlogEditorPage.tsx`
- `/src/domains/admin/blog/ui/components/BlogPostCard.tsx`
- `/src/domains/admin/blog/ui/components/BlogPostForm.tsx`

---

*Last updated: 2025-01-28*
