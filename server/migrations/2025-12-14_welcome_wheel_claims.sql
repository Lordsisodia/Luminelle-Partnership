-- Welcome wheel claim tracking
-- One row per user_id (Clerk id), enforced by PK.

create table if not exists public.welcome_wheel_claims (
  user_id text primary key references public.customers(id) on delete cascade,
  discount_code text not null default 'LUMELLE10',
  claimed_at timestamptz not null default now()
);

alter table public.welcome_wheel_claims enable row level security;

-- Allow users to view their own claim
create policy "welcome_wheel_claims_select_self"
  on public.welcome_wheel_claims
  for select
  to public
  using (user_id = (auth.jwt() ->> 'sub'));

-- Allow users to claim once (pk enforces 1 per account)
create policy "welcome_wheel_claims_insert_self"
  on public.welcome_wheel_claims
  for insert
  to public
  with check (user_id = (auth.jwt() ->> 'sub'));

