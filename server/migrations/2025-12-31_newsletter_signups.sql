-- Newsletter signups (email capture)
--
-- Written by server-only code (Cloudflare Pages Functions) using the Supabase `service_role` key.
-- We enable RLS to prevent access via the public anon key.

create table if not exists public.newsletter_signups (
  id bigserial primary key,
  email text not null unique,
  source text,
  created_at timestamptz not null default now()
);

alter table public.newsletter_signups enable row level security;

