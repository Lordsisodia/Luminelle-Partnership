-- cms_product_media: stores Cloudinary media for PDP/admin
create table if not exists public.cms_product_media (
  id uuid primary key default gen_random_uuid(),
  product_handle text not null,
  public_id text not null,
  secure_url text not null,
  alt text default ''::text,
  kind text not null default 'image' check (kind in ('image','video')),
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists cms_product_media_handle_idx on public.cms_product_media (product_handle, sort_order);

-- updated_at trigger
create or replace function public.cms_product_media_set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_cms_product_media_updated_at on public.cms_product_media;
create trigger trg_cms_product_media_updated_at
before update on public.cms_product_media
for each row execute function public.cms_product_media_set_updated_at();

-- RLS: only service role can write for now (tighten later)
alter table public.cms_product_media enable row level security;

drop policy if exists cms_product_media_read_all on public.cms_product_media;
create policy cms_product_media_read_all on public.cms_product_media for select using (true);

drop policy if exists cms_product_media_write_service on public.cms_product_media;
create policy cms_product_media_write_service on public.cms_product_media for all to service_role using (true) with check (true);
