-- Extend cms_products to support storefront PDP config fields
-- Notes:
-- - Keep nested section arrays (essentials/reasons/how/care/etc) in existing jsonb columns:
--   - cms_products.specs (jsonb) for PDP section content
--   - cms_products.faq (jsonb) for FAQ items ({q,a}[])
-- - Use cms_product_media for gallery media ordering/alt text.

alter table public.cms_products
  add column if not exists compare_at_price numeric,
  add column if not exists discount_percent_override integer,
  add column if not exists average_rating numeric,
  add column if not exists review_count integer,
  add column if not exists review_count_label text,
  add column if not exists badge text,
  add column if not exists video_slot text,
  add column if not exists care_label_override text,
  add column if not exists hide_details_accordion boolean not null default false,
  add column if not exists fallback_variant_id text,
  add column if not exists fallback_item_id text;

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'cms_products_discount_percent_override_check'
  ) then
    alter table public.cms_products
      add constraint cms_products_discount_percent_override_check
      check (discount_percent_override is null or (discount_percent_override >= 0 and discount_percent_override <= 100));
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'cms_products_average_rating_check'
  ) then
    alter table public.cms_products
      add constraint cms_products_average_rating_check
      check (average_rating is null or (average_rating >= 0 and average_rating <= 5));
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'cms_products_review_count_check'
  ) then
    alter table public.cms_products
      add constraint cms_products_review_count_check
      check (review_count is null or review_count >= 0);
  end if;
end $$;

-- Ensure media rows are idempotent per product/path (helps seeding + admin edits).
create unique index if not exists cms_product_media_product_path_unique
  on public.cms_product_media(product_id, path);
