-- Supabase Storage Setup for Avatars
--
-- This script creates a storage bucket for user avatar images
-- and configures appropriate access policies
--
-- Apply via Supabase Dashboard SQL Editor

-- Insert storage bucket for avatars
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'avatars',
  'avatars',
  true, -- public read access
  5 * 1024 * 1024, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
)
on conflict (id) do update set
  public = true,
  file_size_limit = 5 * 1024 * 1024,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];

-- Enable Row Level Security on storage objects
alter table storage.objects enable row level security;

-- Policy: Authenticated users can upload avatars
create policy "Authenticated users can upload avatars"
  on storage.objects
  for insert
  with check (
    bucket_id = 'avatars' and
    auth.role() = 'authenticated' and
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- Policy: Users can only upload to their own folder
create policy "Users can upload to own avatar folder"
  on storage.objects
  for insert
  with check (
    bucket_id = 'avatars' and
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Policy: Public read access for avatars (anyone can view)
create policy "Avatars are publicly viewable"
  on storage.objects
  for select
  using (bucket_id = 'avatars');

-- Policy: Users can update their own avatars
create policy "Users can update own avatars"
  on storage.objects
  for update
  using (
    bucket_id = 'avatars' and
    auth.uid()::text = (storage.foldername(name))[1]
  )
  with check (
    bucket_id = 'avatars' and
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Policy: Users can delete their own avatars
create policy "Users can delete own avatars"
  on storage.objects
  for delete
  using (
    bucket_id = 'avatars' and
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Comment on bucket
comment on table storage.buckets is 'User avatar images bucket';
