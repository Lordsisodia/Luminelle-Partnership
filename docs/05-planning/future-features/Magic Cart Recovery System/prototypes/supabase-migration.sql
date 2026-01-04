-- Draft migration (do not apply yet). Safe to keep in docs.
-- cart_recovery_jobs
create table if not exists cart_recovery_jobs (
  id uuid primary key default gen_random_uuid(),
  cart_id text,
  email text not null,
  restore_url text not null,
  next_send_at timestamptz not null,
  attempt int not null default 0,
  status text not null default 'pending', -- pending|sent|completed|canceled|failed
  discount_sent boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_cart_recovery_jobs_due
  on cart_recovery_jobs (status, next_send_at);

-- cart_recovery_events
create table if not exists cart_recovery_events (
  id uuid primary key default gen_random_uuid(),
  job_id uuid references cart_recovery_jobs(id) on delete cascade,
  event text not null, -- sent|failed|restored|canceled
  meta jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_cart_recovery_events_job on cart_recovery_events (job_id);
