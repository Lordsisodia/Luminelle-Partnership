# Profiles Migration - Status: COMPLETE ✅

## Summary

The profiles table migration has been **successfully applied** to the Lumelle Supabase database via MCP.

## Database Changes Applied

### 1. Profiles Table (`public.profiles`)

**Status:** ✅ Created

The table includes:
- `uuid` (UUID, primary key, references auth.users.id)
- `user_id` (text, for backwards compatibility)
- Basic profile info (display_name, bio, avatar_url)
- Professional details (title, location, website)
- Skills and interests (text arrays)
- Social media links (Twitter, LinkedIn, GitHub, YouTube, Instagram)
- Metadata (timezone, language)
- Privacy settings (profile_visibility: public/private/partners_only)
- SISO-specific fields (sisos_tokens, power_level, login_streak)
- Timestamps (created_at, updated_at)
- Soft delete support (deleted_at)

**Indexes Created:**
- `idx_profiles_user_id` on user_id
- `idx_profiles_display_name` on display_name
- `idx_profiles_location` on location (partial)
- `idx_profiles_visibility` on profile_visibility
- `idx_profiles_created_at` on created_at (descending)
- `idx_profiles_sisos_tokens` on sisos_tokens (descending)
- `idx_profiles_power_level` on power_level (descending)
- `idx_profiles_skills` (GIN) on skills array
- `idx_profiles_interests` (GIN) on interests array

**RLS Policies Applied:**
- Users can view own profile (by uuid match)
- Users can insert own profile
- Users can update own profile
- Public profiles are viewable by all
- Partners-only profiles are viewable by authenticated users
- Service role has full access

**Triggers:**
- `on_auth_user_created` - Auto-creates profile on user signup
- `update_profiles_updated_at` - Auto-updates updated_at timestamp

### 2. Avatars Storage Bucket

**Status:** ✅ Bucket Created

The `avatars` bucket was created with:
- Public read access enabled
- 5MB file size limit
- Allowed MIME types: image/jpeg, image/png, image/gif, image/webp, image/svg+xml

**Note:** Storage RLS policies need to be applied manually via Supabase Dashboard SQL Editor (see below).

## Manual Steps Required

### Storage RLS Policies

The storage policies could not be applied via MCP due to permission restrictions. Apply these via the Supabase Dashboard SQL Editor:

```sql
-- Enable Row Level Security on storage objects
alter table storage.objects enable row level security;

-- Policy: Users can upload to their own avatar folder
create policy "Users can upload to own avatar folder"
  on storage.objects
  for insert
  with check (
    bucket_id = 'avatars' and
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Policy: Public read access for avatars
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
```

## Verification

You can verify the migration was successful by:

1. **Check the profiles table exists:**
   - Go to Supabase Dashboard > Database > Tables
   - Look for `profiles` table in `public` schema

2. **Verify columns:**
   - Click on `profiles` table
   - Confirm all columns are present (uuid, user_id, display_name, etc.)

3. **Test RLS policies:**
   - Go to Supabase Dashboard > Authentication > Users
   - Create a test user or use existing user
   - Verify a profile row was auto-created in `profiles` table

4. **Check storage bucket:**
   - Go to Supabase Dashboard > Storage
   - Confirm `avatars` bucket exists with public access enabled

## Next Steps

1. **Apply Storage RLS Policies** - Run the SQL above in Supabase Dashboard

2. **Test the Profile UI:**
   - Navigate to `/admin/settings/profile`
   - Test profile loading, editing, and saving
   - Test avatar upload functionality

3. **Form Validation** - Add client-side validation using the Zod schemas

4. **Error Handling** - Test error states (network failures, permission errors)

## Migration Files

- `supabase/migrations/20250128_create_profiles_table.sql` - Profiles table (updated for UUID)
- `supabase/migrations/20250128_create_avatars_storage.sql` - Avatars storage bucket

## Related Code

- `src/domains/admin/settings-siso/03-profile/domain/schema.ts` - TypeScript types
- `src/domains/admin/settings-siso/03-profile/infrastructure/profileService.ts` - DB operations
- `src/domains/admin/settings-siso/03-profile/infrastructure/avatarService.ts` - Avatar uploads
- `src/domains/admin/settings-siso/03-profile/application/` - React hooks
- `src/domains/admin/settings-siso/03-profile/ui/screens/ProfileSettingsScreen.tsx` - UI component

## Important Notes

- **Schema Change**: The database uses `uuid` (UUID type) as the primary key, not `id` (text type), because Supabase auth.users.id is a UUID
- **Backwards Compatibility**: A `user_id` text field is included for backwards compatibility with any code expecting text IDs
- **Auto-Profile Creation**: New users will automatically have a profile created via the `handle_new_user()` trigger
