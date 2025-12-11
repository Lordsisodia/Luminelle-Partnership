-- Experiments schema (A/B testing)
-- Note: adjust auth/role names to match your Supabase project. Service inserts only; readonly selects via reporting role.

create table if not exists public.experiments (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  name text not null,
  status text not null check (status in ('draft','live','paused','archived')) default 'draft',
  default_split jsonb not null,
  targeting jsonb,
  start_at timestamptz,
  end_at timestamptz,
  owner text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.experiment_exposures (
  id uuid primary key default gen_random_uuid(),
  experiment_key text not null references public.experiments(key),
  variant text not null,
  user_id text,
  anon_id text not null,
  session_id text not null,
  page_path text,
  user_agent text,
  occurred_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  experiment_key text,
  variant text,
  user_id text,
  anon_id text not null,
  session_id text not null,
  cart_value numeric,
  metadata jsonb,
  occurred_at timestamptz not null default now()
);

create table if not exists public.sessions (
  session_id text primary key,
  anon_id text not null,
  started_at timestamptz default now(),
  device text,
  referrer text,
  utm jsonb
);

-- indexes
create index if not exists idx_exposures_key_time on public.experiment_exposures(experiment_key, occurred_at desc);
create index if not exists idx_events_name_time on public.events(name, occurred_at desc);
create index if not exists idx_events_anon_time on public.events(anon_id, occurred_at desc);

-- view joining exposures to conversions within same session
create or replace view public.vw_experiment_conversions as
select
  e.experiment_key,
  e.variant,
  ex.session_id,
  sum(case when ev.name = 'purchase' then 1 else 0 end) as purchases,
  sum(case when ev.name = 'add_to_cart' then 1 else 0 end) as add_to_cart,
  sum(case when ev.name = 'begin_checkout' then 1 else 0 end) as begin_checkout,
  sum(case when ev.name = 'email_capture_submit' then 1 else 0 end) as email_captures,
  sum(coalesce(ev.cart_value,0)) as revenue,
  count(distinct ex.id) as exposures
from public.experiment_exposures ex
join public.experiments e on e.key = ex.experiment_key
left join public.events ev on ev.session_id = ex.session_id and ev.experiment_key = ex.experiment_key
group by e.experiment_key, e.variant, ex.session_id;

-- seed first experiment (hero CTA copy)
insert into public.experiments(key, name, status, default_split, targeting, start_at)
values (
  'hero_cta_copy',
  'Hero CTA copy/style',
  'live',
  '[{"variant":"control","weight":50},{"variant":"bold","weight":50}]',
  null,
  now()
)
on conflict (key) do nothing;

-- basic RLS stubs (adjust role names)
alter table public.experiments enable row level security;
alter table public.experiment_exposures enable row level security;
alter table public.events enable row level security;
alter table public.sessions enable row level security;

-- allow inserts from service role only (replace 'service_role' with actual role name if needed)
create policy if not exists "service inserts experiments" on public.experiments for insert to service_role using (true) with check (true);
create policy if not exists "service inserts exposures" on public.experiment_exposures for insert to service_role using (true) with check (true);
create policy if not exists "service inserts events" on public.events for insert to service_role using (true) with check (true);
create policy if not exists "service inserts sessions" on public.sessions for insert to service_role using (true) with check (true);

-- readonly select for reporting role (replace reporting_role name)
create policy if not exists "reporting reads experiments" on public.experiments for select to reporting_role using (true);
create policy if not exists "reporting reads exposures" on public.experiment_exposures for select to reporting_role using (true);
create policy if not exists "reporting reads events" on public.events for select to reporting_role using (true);
create policy if not exists "reporting reads sessions" on public.sessions for select to reporting_role using (true);

-- updated_at trigger
create or replace function public.set_updated_at()
returns trigger as $$ begin new.updated_at = now(); return new; end; $$ language plpgsql;

drop trigger if exists trig_experiments_updated_at on public.experiments;
create trigger trig_experiments_updated_at before update on public.experiments for each row execute function public.set_updated_at();
