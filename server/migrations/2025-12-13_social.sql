-- Social: likes + comments for blog posts

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

create table if not exists public.blog_comments (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  user_id text,
  anon_id text,
  actor_id text generated always as (coalesce(user_id, anon_id)) stored,
  display_name text,
  body text not null check (char_length(body) <= 1000),
  parent_id uuid references public.blog_comments(id) on delete cascade,
  status text not null default 'published' check (status in ('published','pending','flagged')),
  created_at timestamptz default now()
);

create index if not exists blog_comments_slug_created_at on public.blog_comments (slug, created_at desc);

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
