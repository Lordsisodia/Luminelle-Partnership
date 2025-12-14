-- Shopify sync tables + analytics RPCs (for Cloudflare Pages Functions / Workers)

-- NOTE: Table names intentionally match existing Vercel/pg code:
-- - public."ShopOrders"
-- - public."ShopCustomers"
-- - public."ShopWebhookDeliveries"
-- - public."Session" (offline token store)

create table if not exists public."ShopOrders" (
  shop text not null,
  order_id bigint not null,
  name text,
  email text,
  currency text,
  subtotal numeric,
  total numeric,
  financial_status text,
  fulfillment_status text,
  processed_at timestamptz,
  created_at timestamptz,
  updated_at timestamptz,
  line_items jsonb,
  raw jsonb,
  primary key (shop, order_id)
);

create index if not exists shoporders_order_id_idx on public."ShopOrders"(order_id);
create index if not exists shoporders_name_idx on public."ShopOrders"(name);
create index if not exists shoporders_email_lower_idx on public."ShopOrders"(lower(email));
create index if not exists shoporders_ts_idx on public."ShopOrders"(coalesce(processed_at, created_at));

create table if not exists public."ShopCustomers" (
  shop text not null,
  customer_id bigint not null,
  email text,
  first_name text,
  last_name text,
  state text,
  marketing_opt_in boolean,
  tags jsonb,
  default_address jsonb,
  addresses jsonb,
  created_at timestamptz,
  updated_at timestamptz,
  raw jsonb,
  primary key (shop, customer_id)
);

create index if not exists shopcustomers_email_lower_idx on public."ShopCustomers"(lower(email));
create index if not exists shopcustomers_customer_id_idx on public."ShopCustomers"(customer_id);

create table if not exists public."ShopWebhookDeliveries" (
  id text primary key,
  received_at timestamptz default now()
);

create table if not exists public."Session" (
  id text primary key,
  shop text,
  state text,
  isonline boolean,
  scope text,
  accesstoken text
);

create index if not exists session_shop_idx on public."Session"(shop);

-- ---------------------------------------------------------------------------
-- Analytics RPCs (called from Cloudflare Functions via Supabase `rpc()`)
-- ---------------------------------------------------------------------------

create or replace function public.lumelle_metrics_summary()
returns jsonb
language plpgsql
stable
as $$
declare
  total_orders int;
  total_revenue numeric;
  customers int;
  last_count int;
  last_revenue numeric;
  aov numeric;
begin
  select count(*)::int, coalesce(sum(total), 0)::numeric
    into total_orders, total_revenue
    from public."ShopOrders";

  select count(*)::int
    into customers
    from public."ShopCustomers";

  select count(*)::int, coalesce(sum(total), 0)::numeric
    into last_count, last_revenue
    from public."ShopOrders"
   where created_at >= now() - interval '30 days';

  aov := case when coalesce(last_count, 0) > 0 then last_revenue / last_count else 0 end;

  return jsonb_build_object(
    'totalOrders', coalesce(total_orders, 0),
    'totalRevenue', coalesce(total_revenue, 0),
    'customers', coalesce(customers, 0),
    'last30', jsonb_build_object(
      'orders', coalesce(last_count, 0),
      'revenue', coalesce(last_revenue, 0),
      'aov', coalesce(aov, 0)
    )
  );
end;
$$;

create or replace function public.lumelle_metrics_daily(days int)
returns table(day date, revenue numeric, orders int)
language sql
stable
as $$
  select date_trunc('day', coalesce(processed_at, created_at))::date as day,
         coalesce(sum(total),0)::numeric as revenue,
         count(*)::int as orders
    from public."ShopOrders"
   where coalesce(processed_at, created_at) >= now() - (days * interval '1 day')
   group by 1
   order by 1 asc;
$$;

create or replace function public.lumelle_metrics_repeat()
returns jsonb
language plpgsql
stable
as $$
declare
  total_customers int;
  repeat_customers int;
  cohorts jsonb;
begin
  with last90 as (
    select lower(email) as email, count(*)::int as orders
      from public."ShopOrders"
     where coalesce(processed_at, created_at) >= now() - interval '90 days'
       and email is not null and email <> ''
     group by 1
  )
  select count(*)::int,
         count(*) filter (where orders > 1)::int
    into total_customers, repeat_customers
    from last90;

  select coalesce(
    jsonb_agg(jsonb_build_object('cohort', cohort, 'customers', customers) order by cohort),
    '[]'::jsonb
  )
  into cohorts
  from (
    select to_char(date_trunc('month', first)::date, 'YYYY-MM') as cohort,
           count(*)::int as customers
      from (
        select min(coalesce(processed_at, created_at)) as first
          from public."ShopOrders"
         where email is not null and email <> ''
         group by lower(email)
      ) t(first)
     where first >= date_trunc('month', now()) - interval '6 months'
     group by 1
     order by 1 asc
  ) s;

  return jsonb_build_object(
    'repeatRate90',
    case when coalesce(total_customers, 0) > 0 then repeat_customers::numeric / total_customers else 0 end,
    'cohorts',
    cohorts
  );
end;
$$;

create or replace function public.lumelle_metrics_refund_rate(days int)
returns jsonb
language plpgsql
stable
as $$
declare
  total_cnt int;
  refunded_cnt int;
begin
  select count(*)::int
    into total_cnt
    from public."ShopOrders"
   where coalesce(processed_at, created_at) >= now() - (days * interval '1 day');

  select count(*)::int
    into refunded_cnt
    from public."ShopOrders"
   where coalesce(processed_at, created_at) >= now() - (days * interval '1 day')
     and lower(coalesce(financial_status, '')) = 'refunded';

  return jsonb_build_object(
    'last30',
    jsonb_build_object(
      'total', coalesce(total_cnt, 0),
      'refunded', coalesce(refunded_cnt, 0),
      'rate', case when coalesce(total_cnt, 0) > 0 then refunded_cnt::numeric / total_cnt else 0 end
    )
  );
end;
$$;

create or replace function public.lumelle_metrics_utm_sources(days int)
returns table(utm_source text, orders int)
language sql
stable
as $$
  with attrs as (
    select (jsonb_array_elements(coalesce(raw->'note_attributes','[]'::jsonb))->>'name') as name,
           (jsonb_array_elements(coalesce(raw->'note_attributes','[]'::jsonb))->>'value') as value
      from public."ShopOrders"
     where coalesce(processed_at, created_at) >= now() - (days * interval '1 day')
  )
  select value as utm_source, count(*)::int as orders
    from attrs
   where lower(name) = 'utm_source' and value is not null and value <> ''
   group by 1
   order by orders desc
   limit 10;
$$;

create or replace function public.lumelle_metrics_source_revenue(days int)
returns table(utm_source text, revenue numeric, orders int)
language sql
stable
as $$
  with attrs as (
    select (jsonb_array_elements(coalesce(raw->'note_attributes','[]'::jsonb))->>'name') as name,
           (jsonb_array_elements(coalesce(raw->'note_attributes','[]'::jsonb))->>'value') as value,
           total,
           coalesce(processed_at, created_at) as ts
      from public."ShopOrders"
  )
  select value as utm_source,
         coalesce(sum(total),0)::numeric as revenue,
         count(*)::int as orders
    from attrs
   where lower(name) = 'utm_source'
     and value is not null and value <> ''
     and ts >= now() - (days * interval '1 day')
   group by 1
   order by revenue desc
   limit 10;
$$;

create or replace function public.lumelle_metrics_top_skus(days int)
returns table(title text, units int, revenue numeric)
language sql
stable
as $$
  with items as (
    select jsonb_array_elements(line_items) as li
      from public."ShopOrders"
     where line_items is not null
       and coalesce(processed_at, created_at) >= now() - (days * interval '1 day')
  ),
  normalized as (
    select
      coalesce(li->>'title', li->'variant'->>'title', 'Item') as title,
      case when (li->>'quantity') ~ '^[0-9]+$' then (li->>'quantity')::int else 1 end as qty,
      case when (li->>'price') ~ E'^[0-9]+(\\.[0-9]+)?$' then (li->>'price')::numeric else 0 end as price
    from items
  )
  select title,
         sum(qty)::int as units,
         sum((qty::numeric) * price)::numeric as revenue
    from normalized
   group by 1
   order by units desc
   limit 10;
$$;

create or replace function public.lumelle_metrics_refunds_by_sku(days int)
returns table(title text, units int, value numeric)
language sql
stable
as $$
  with items as (
    select jsonb_array_elements(line_items) as li
      from public."ShopOrders"
     where line_items is not null
       and lower(coalesce(financial_status, '')) = 'refunded'
       and coalesce(processed_at, created_at) >= now() - (days * interval '1 day')
  ),
  normalized as (
    select
      coalesce(li->>'title', li->'variant'->>'title', 'Item') as title,
      case when (li->>'quantity') ~ '^[0-9]+$' then (li->>'quantity')::int else 1 end as qty,
      case when (li->>'price') ~ E'^[0-9]+(\\.[0-9]+)?$' then (li->>'price')::numeric else 0 end as price
    from items
  )
  select title,
         sum(qty)::int as units,
         sum((qty::numeric) * price)::numeric as value
    from normalized
   group by 1
   order by value desc
   limit 10;
$$;
