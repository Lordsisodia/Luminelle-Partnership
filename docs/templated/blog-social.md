# Blog Social (Comments + Likes)

Decision:
- Blog pages are **public for SEO**.
- Interactive features are **comments + likes**, gated behind Clerk sign-in.
- Each client has their own Supabase project (per-client Supabase).
- Comments are **auto-published**.
- Likes are public as **count only** (no public list of who liked).

This doc describes how we should model and secure blog social features in Supabase, and what the frontend expects.

---

## What the frontend expects (current behavior)

The blog UI uses Supabase tables:

- `blog_comments`
  - Reads published comments for a given `slug`.
  - Inserts a new comment when a signed-in user posts.
  - Filters by `status = 'published'`.

- `blog_likes`
  - Counts likes for a given `slug`.
  - Lets a signed-in user toggle like/unlike.

Important template note:
- The current “likes count” fetch selects `user_id` values for a slug to determine “did I like this?”.
- If we allow public reads on `blog_likes`, we risk leaking user identifiers.
- Prefer a design that exposes counts publicly without exposing raw liker identities.

---

## Source of truth in this repo

There is already a reference migration for these tables and policies:
- `server/migrations/2025-12-13_social.sql`

For template usage (per-client Supabase), the simplest workflow is:
- copy/paste that migration into the Supabase SQL editor for the new client project.
- then apply any small deltas needed to match the current UI (notably `avatar_url` on comments).

---

## Minimum viable schema (matches the repo migration)

This is the simplest schema to get comments/likes working. It assumes:
- `user_id` is a **Clerk user id** (string).
- Supabase RLS compares against Clerk identity via `auth.jwt() ->> 'sub'` (not `auth.uid()`), because Clerk user IDs are not UUIDs.
- Comments are inserted as `published` by the client (no moderation by default).

### `blog_comments` table

Suggested columns:
- `id` (uuid primary key)
- `slug` (text, indexed)
- `body` (text, with a max length check)
- `display_name` (text)
- `avatar_url` (text, nullable; the current UI attempts to insert this)
- `user_id` (text, nullable if you later allow anon)
- `anon_id` (text, nullable)
- `actor_id` (generated as `coalesce(user_id, anon_id)`)
- `parent_id` (uuid, nullable, for threaded replies)
- `status` (text; in this repo it’s `published`, `pending`, `flagged`)
- `created_at` (timestamptz default now)

### `blog_likes` table

Suggested columns:
- `id` (uuid primary key)
- `slug` (text, indexed)
- `user_id` (text, nullable)
- `anon_id` (text, nullable)
- `actor_id` (text generated as `coalesce(user_id, anon_id)`)
- `created_at` (timestamptz default now)

Uniqueness rule:
- Unique `(slug, actor_id)` so each user can like a post once.

---

## Recommended RLS policies (safe defaults)

We want:
- Public can read **published comments** (blog is public).
- Only signed-in users can create comments/likes.
- Users can only delete their own likes.

These policies rely on the JWT containing:
- `sub` (the Clerk user id string)
- `role` set to `authenticated` (so `auth.role()` matches)

### Comments

Policies:
- `SELECT` allowed to everyone where `status = 'published'` (recommended).
- `INSERT` allowed only when `auth.role() = 'authenticated'` and `user_id = auth.jwt() ->> 'sub'`.

Template hardening note:
- The existing repo migration currently allows `SELECT` on all rows (including `pending`/`flagged`).
- That’s OK for an internal prototype, but for production we should restrict public reads to `published` only.

Anti-spam (still worth planning even with auto-publish):
- Consider rate limits (per user), profanity filters, and a “report comment” pathway.

### Likes

Decision: public sees the **count only**.

Recommended approach:
- Do **not** allow anonymous `SELECT` on `blog_likes` rows.
- Expose counts via a safe aggregate surface:
  - either a security definer RPC for counts, or
  - a count table maintained by triggers.

Frontend expectation note:
- The current UI code in this repo reads `user_id` values to compute `liked` state.
- To meet the “count-only” privacy decision, the template should change that behavior:
  - compute `liked` by querying only the signed-in user’s row with an authenticated Supabase client, and
  - fetch count via an RPC that returns an integer (no user IDs).

---

## SQL starter (schema + indexes)

This is a starting point for per-client Supabase projects.

If you want to match the repo migration closely, use this schema baseline, then apply the hardening policies below:

```sql
-- Enable uuid helper if you want UUID PKs
create extension if not exists "pgcrypto";

-- Likes
create table if not exists public.blog_likes (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  user_id text,
  anon_id text,
  actor_id text generated always as (coalesce(user_id, anon_id)) stored,
  created_at timestamptz default now()
);

create unique index if not exists blog_likes_actor_unique on public.blog_likes (slug, actor_id) where actor_id is not null;
create index if not exists blog_likes_slug_created_at on public.blog_likes (slug, created_at desc);

-- Comments
create table if not exists public.blog_comments (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  user_id text,
  anon_id text,
  actor_id text generated always as (coalesce(user_id, anon_id)) stored,
  display_name text,
  avatar_url text,
  body text not null check (char_length(body) <= 1000),
  parent_id uuid references public.blog_comments(id) on delete cascade,
  status text not null default 'published' check (status in ('published','pending','flagged')),
  created_at timestamptz default now()
);

create index if not exists blog_comments_slug_created_at on public.blog_comments (slug, created_at desc);

-- RLS (as in the repo migration)
alter table public.blog_likes enable row level security;
alter table public.blog_comments enable row level security;

create policy if not exists "likes select all" on public.blog_likes for select using (true);
create policy if not exists "likes insert self" on public.blog_likes for insert
  with check (auth.role() = 'authenticated' and user_id = auth.jwt() ->> 'sub');
create policy if not exists "likes delete self" on public.blog_likes for delete
  using (auth.role() = 'authenticated' and user_id = auth.jwt() ->> 'sub');

create policy if not exists "comments select all" on public.blog_comments for select using (true);
create policy if not exists "comments insert self" on public.blog_comments for insert
  with check (auth.role() = 'authenticated' and user_id = auth.jwt() ->> 'sub');
create policy if not exists "comments delete self" on public.blog_comments for delete
  using (auth.role() = 'authenticated' and user_id = auth.jwt() ->> 'sub');
```

RLS policies depend on how you configure Supabase auth with Clerk tokens; document and test them per client.

---

## Hardening SQL (recommended for “count-only likes” + public comments)

Apply this after running the base schema migration.

```sql
-- Comments: only show published comments publicly
drop policy if exists "comments select all" on public.blog_comments;
create policy "comments select published" on public.blog_comments
for select
using (status = 'published');

-- Likes: do NOT allow public to select liker identities
drop policy if exists "likes select all" on public.blog_likes;
create policy "likes select own" on public.blog_likes
for select
using (auth.role() = 'authenticated' and user_id = auth.jwt() ->> 'sub');

-- Public like counts via RPC (returns only a number, no IDs)
create or replace function public.blog_like_count(p_slug text)
returns bigint
language sql
security definer
set search_path = public
as $$
  select count(*) from public.blog_likes where slug = p_slug;
$$;

grant execute on function public.blog_like_count(text) to anon, authenticated;
```

Notes:
- `security definer` functions are powerful; keep them tiny, set `search_path`, and avoid dynamic SQL.
- In Supabase, this pattern is commonly used to expose aggregates while keeping base rows private.

---

## Implementation checklist (per client)

1) Create Supabase project.
2) Create tables + indexes above.
3) Comments are auto-published (decision).
4) Configure Clerk JWT template `supabase` so Supabase can enforce RLS.
5) Add/verify RLS policies for:
   - public reads of published comments
   - authenticated inserts for comments/likes
   - authenticated deletes for likes
   - public like counts via RPC (no public liker list)
