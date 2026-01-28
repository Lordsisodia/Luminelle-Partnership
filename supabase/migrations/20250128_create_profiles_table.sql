-- Profiles table for SISO partner/admin user profiles
-- Stores extended profile information for authenticated users
-- Integrates with Supabase authentication (auth.users)
--
-- NOTE: Supabase auth.users.id is UUID type, not text

-- Create profiles table
create table if not exists public.profiles (
  -- Primary identification (UUID to match auth.users.id)
  uuid uuid primary key references auth.users(id) on delete cascade,
  -- Legacy user_id text field for backwards compatibility
  user_id text unique,

  -- Basic profile info
  display_name text not null default '',
  bio text,
  avatar_url text,

  -- Professional details
  title text,
  location text,
  website text,

  -- Skills and interests (arrays for easy querying)
  skills text[] default '{}',
  interests text[] default '{}',

  -- Social media links
  social_twitter_url text,
  social_linkedin_url text,
  social_github_url text,
  social_youtube_url text,
  social_instagram_url text,

  -- Metadata
  timezone text,
  language text default 'en',

  -- Privacy settings
  profile_visibility text default 'private' check (profile_visibility in ('public', 'private', 'partners_only')),

  -- SISO-specific fields
  sisos_tokens integer default 0,
  power_level integer default 1,
  login_streak integer default 0,
  login_streak_last_at timestamptz,

  -- Timestamps
  created_at timestamptz default now(),
  updated_at timestamptz default now(),

  -- Soft delete support
  deleted_at timestamptz
);

-- Create indexes for common queries
create index if not exists idx_profiles_user_id on public.profiles(user_id);
create index if not exists idx_profiles_display_name on public.profiles(display_name);
create index if not exists idx_profiles_location on public.profiles(location) where location is not null;
create index if not exists idx_profiles_visibility on public.profiles(profile_visibility);
create index if not exists idx_profiles_created_at on public.profiles(created_at desc);
create index if not exists idx_profiles_sisos_tokens on public.profiles(sisos_tokens desc);
create index if not exists idx_profiles_power_level on public.profiles(power_level desc);

-- Create index for skills array search (using GIN for array containment)
create index if not exists idx_profiles_skills on public.profiles using gin(skills);

-- Create index for interests array search
create index if not exists idx_profiles_interests on public.profiles using gin(interests);

-- Add comments for documentation
comment on table public.profiles is 'Extended user profile information for SISO partners/admins';
comment on column public.profiles.uuid is 'References auth.users.id (Supabase auth UUID)';
comment on column public.profiles.user_id is 'User ID text for backwards compatibility';
comment on column public.profiles.display_name is 'Public display name';
comment on column public.profiles.bio is 'User biography/about me';
comment on column public.profiles.avatar_url is 'URL to profile image in Supabase Storage';
comment on column public.profiles.title is 'Professional title or role';
comment on column public.profiles.location is 'Geographic location';
comment on column public.profiles.website is 'Personal or professional website URL';
comment on column public.profiles.skills is 'Array of skill tags';
comment on column public.profiles.interests is 'Array of interest tags';
comment on column public.profiles.profile_visibility is 'Who can view this profile';
comment on column public.profiles.sisos_tokens is 'SISO platform token balance';
comment on column public.profiles.power_level is 'User level/power tier';
comment on column public.profiles.login_streak is 'Consecutive days logged in';
comment on column public.profiles.deleted_at is 'Soft delete timestamp';

-- Enable Row Level Security
alter table public.profiles enable row level security;

-- RLS Policies: Users can view their own profile (by UUID)
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = uuid);
create policy "Users can insert own profile" on public.profiles for insert with check (auth.uid() = uuid);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = uuid) with check (auth.uid() = uuid);
create policy "Public profiles are viewable" on public.profiles for select using (profile_visibility = 'public' and deleted_at is null);
create policy "Partners profiles viewable" on public.profiles for select using (profile_visibility = 'partners_only' and auth.role() = 'authenticated' and deleted_at is null);
create policy "Service role full access" on public.profiles for all using (auth.role() = 'service_role');

-- Create function to auto-create profile on user signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  display_name text;
begin
  -- Extract display name from metadata or email
  if new.raw_user_meta_data ? 'display_name' then
    display_name := new.raw_user_meta_data->>'display_name';
  elsif new.email is not null then
    display_name := split_part(new.email, '@', 1);
  else
    display_name := 'User';
  end if;

  insert into public.profiles (uuid, user_id, display_name)
  values (new.id, new.id::text, display_name);
  return new;
end;
$$;

-- Create trigger for auto-profile creation
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

-- Create function to update updated_at
create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- Create trigger for updated_at
drop trigger if exists update_profiles_updated_at on public.profiles;
create trigger update_profiles_updated_at before update on public.profiles for each row execute function public.update_updated_at_column();

-- Grant permissions
grant usage on schema public to anon, authenticated;
grant all on public.profiles to authenticated;
grant select on public.profiles to anon;
