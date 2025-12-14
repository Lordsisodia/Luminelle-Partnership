-- Loyalty points (MVP)
-- - Append-only ledger per customer
-- - Manual “task claims” (no verification yet) with 1× per task_key per user
-- - RPC helpers for client UI

create table if not exists public.loyalty_points_ledger (
  id uuid primary key default gen_random_uuid(),
  user_id text not null references public.customers(id) on delete cascade,
  points integer not null,
  source text not null,
  meta jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists loyalty_points_ledger_user_created_at_idx
  on public.loyalty_points_ledger (user_id, created_at desc);

alter table public.loyalty_points_ledger enable row level security;

drop policy if exists loyalty_points_ledger_select_self on public.loyalty_points_ledger;
create policy loyalty_points_ledger_select_self
  on public.loyalty_points_ledger
  for select
  to public
  using (user_id = (auth.jwt() ->> 'sub'));

drop policy if exists loyalty_points_ledger_insert_self on public.loyalty_points_ledger;
create policy loyalty_points_ledger_insert_self
  on public.loyalty_points_ledger
  for insert
  to public
  with check (user_id = (auth.jwt() ->> 'sub'));

create table if not exists public.loyalty_task_claims (
  id uuid primary key default gen_random_uuid(),
  user_id text not null references public.customers(id) on delete cascade,
  task_key text not null,
  points_awarded integer not null,
  meta jsonb not null default '{}'::jsonb,
  claimed_at timestamptz not null default now(),
  unique (user_id, task_key)
);

create index if not exists loyalty_task_claims_user_claimed_at_idx
  on public.loyalty_task_claims (user_id, claimed_at desc);

alter table public.loyalty_task_claims enable row level security;

drop policy if exists loyalty_task_claims_select_self on public.loyalty_task_claims;
create policy loyalty_task_claims_select_self
  on public.loyalty_task_claims
  for select
  to public
  using (user_id = (auth.jwt() ->> 'sub'));

drop policy if exists loyalty_task_claims_insert_self on public.loyalty_task_claims;
create policy loyalty_task_claims_insert_self
  on public.loyalty_task_claims
  for insert
  to public
  with check (user_id = (auth.jwt() ->> 'sub'));

create or replace function public.get_loyalty_points_summary()
returns table (
  balance integer,
  lifetime_earned integer,
  lifetime_spent integer
)
language sql
stable
as $$
  select
    coalesce(sum(points), 0)::integer as balance,
    coalesce(sum(case when points > 0 then points else 0 end), 0)::integer as lifetime_earned,
    coalesce(sum(case when points < 0 then -points else 0 end), 0)::integer as lifetime_spent
  from public.loyalty_points_ledger
  where user_id = (auth.jwt() ->> 'sub');
$$;

create or replace function public.claim_loyalty_task(p_task_key text, p_meta jsonb default '{}'::jsonb)
returns table (
  task_key text,
  points_awarded integer,
  claimed boolean,
  balance integer
)
language plpgsql
as $$
declare
  v_user_id text := (auth.jwt() ->> 'sub');
  v_points integer;
  v_rowcount integer;
  v_balance integer;
begin
  if v_user_id is null or v_user_id = '' then
    raise exception 'Not authenticated';
  end if;

  v_points := case p_task_key
    when 'join_whatsapp' then 150
    when 'follow_instagram' then 100
    when 'follow_tiktok' then 100
    when 'follow_twitter' then 100
    when 'post_instagram_story' then 200
    when 'post_tiktok_video' then 500
    when 'leave_review' then 200
    when 'refer_friend' then 300
    else null
  end;

  if v_points is null then
    raise exception 'Unknown task key: %', p_task_key;
  end if;

  insert into public.loyalty_task_claims (user_id, task_key, points_awarded, meta)
  values (v_user_id, p_task_key, v_points, coalesce(p_meta, '{}'::jsonb))
  on conflict (user_id, task_key) do nothing;

  get diagnostics v_rowcount = row_count;

  if v_rowcount > 0 then
    insert into public.loyalty_points_ledger (user_id, points, source, meta)
    values (
      v_user_id,
      v_points,
      'task:' || p_task_key,
      jsonb_build_object('task_key', p_task_key) || coalesce(p_meta, '{}'::jsonb)
    );
  end if;

  select coalesce(sum(points), 0)::integer
  into v_balance
  from public.loyalty_points_ledger
  where user_id = v_user_id;

  return query
    select p_task_key, v_points, (v_rowcount > 0), v_balance;
end;
$$;
