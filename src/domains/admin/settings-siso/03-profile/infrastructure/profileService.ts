/**
 * Profile Service
 *
 * Handles all profile CRUD operations with Supabase
 */

import { supabase } from '@platform/storage/supabase'
import type { Profile } from '../domain/schema'

const TABLE_NAME = 'profiles'

export interface GetProfileResult {
  profile: Profile | null
  error: string | null
}

export interface UpdateProfileResult {
  profile: Profile | null
  error: string | null
}

export interface ListProfilesResult {
  profiles: Profile[]
  error: string | null
}

/**
 * Get profile by user UUID
 */
export async function getProfile(userId: string): Promise<GetProfileResult> {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .eq('uuid', userId)
      .is('deleted_at', null) // Exclude soft-deleted profiles
      .single()

    if (error) {
      // If profile doesn't exist, return null (not an error)
      if (error.code === 'PGRST116') {
        return { profile: null, error: null }
      }
      console.error('Get profile error:', error)
      return { profile: null, error: error.message }
    }

    return { profile: data, error: null }
  } catch (error) {
    console.error('Get profile error:', error)
    return {
      profile: null,
      error: error instanceof Error ? error.message : 'Failed to fetch profile'
    }
  }
}

/**
 * Get profile or create one if it doesn't exist
 */
export async function getProfileOrCreate(userId: string, displayName?: string): Promise<GetProfileResult> {
  // First try to get existing profile
  const existing = await getProfile(userId)
  if (existing.profile || existing.error) {
    return existing
  }

  // Profile doesn't exist, create it
  return await createProfile(userId, displayName || 'User')
}

/**
 * Create a new profile
 */
export async function createProfile(userId: string, displayName: string): Promise<GetProfileResult> {
  try {
    const newProfile = {
      uuid: userId,
      user_id: userId, // Also set user_id for backwards compatibility
      display_name: displayName,
      profile_visibility: 'private' as const,
    }

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert(newProfile)
      .select()
      .single()

    if (error) {
      console.error('Create profile error:', error)
      return { profile: null, error: error.message }
    }

    return { profile: data, error: null }
  } catch (error) {
    console.error('Create profile error:', error)
    return {
      profile: null,
      error: error instanceof Error ? error.message : 'Failed to create profile'
    }
  }
}

/**
 * Update profile
 */
export async function updateProfile(
  userId: string,
  updates: Partial<Profile>
): Promise<UpdateProfileResult> {
  try {
    // Convert camelCase to snake_case for DB
    const dbUpdates: Record<string, unknown> = {}
    const mapped = mapToDb(updates)

    for (const [key, value] of Object.entries(mapped)) {
      if (value !== undefined) {
        dbUpdates[key] = value
      }
    }

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .update(dbUpdates)
      .eq('uuid', userId)
      .select()
      .single()

    if (error) {
      console.error('Update profile error:', error)
      return { profile: null, error: error.message }
    }

    return { profile: data, error: null }
  } catch (error) {
    console.error('Update profile error:', error)
    return {
      profile: null,
      error: error instanceof Error ? error.message : 'Failed to update profile'
    }
  }
}

/**
 * Soft delete profile (sets deleted_at timestamp)
 */
export async function deleteProfile(userId: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const { error } = await supabase
      .from(TABLE_NAME)
      .update({ deleted_at: new Date().toISOString() })
      .eq('uuid', userId)

    if (error) {
      console.error('Delete profile error:', error)
      return { success: false, error: error.message }
    }

    return { success: true, error: null }
  } catch (error) {
    console.error('Delete profile error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete profile'
    }
  }
}

/**
 * List public profiles (for directory/search)
 */
export async function listPublicProfiles(options?: {
  limit?: number
  offset?: number
  search?: string
}): Promise<ListProfilesResult> {
  try {
    let query = supabase
      .from(TABLE_NAME)
      .select('*')
      .eq('profile_visibility', 'public')
      .is('deleted_at', null)
      .order('created_at', { ascending: false })

    if (options?.search) {
      query = query.ilike('display_name', `%${options.search}%`)
    }

    if (options?.limit) {
      query = query.limit(options.limit)
    }

    if (options?.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 10) - 1)
    }

    const { data, error } = await query

    if (error) {
      console.error('List profiles error:', error)
      return { profiles: [], error: error.message }
    }

    return { profiles: data || [], error: null }
  } catch (error) {
    console.error('List profiles error:', error)
    return {
      profiles: [],
      error: error instanceof Error ? error.message : 'Failed to list profiles'
    }
  }
}

/**
 * Update SISO tokens (for gamification)
 */
export async function updateTokens(
  userId: string,
  amount: number
): Promise<UpdateProfileResult> {
  try {
    // First get current token count
    const { data: current } = await supabase
      .from(TABLE_NAME)
      .select('sisos_tokens')
      .eq('uuid', userId)
      .single()

    const currentTokens = current?.sisos_tokens || 0
    const newTokens = Math.max(0, currentTokens + amount)

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .update({ sisos_tokens: newTokens })
      .eq('uuid', userId)
      .select()
      .single()

    if (error) {
      console.error('Update tokens error:', error)
      return { profile: null, error: error.message }
    }

    return { profile: data, error: null }
  } catch (error) {
    console.error('Update tokens error:', error)
    return {
      profile: null,
      error: error instanceof Error ? error.message : 'Failed to update tokens'
    }
  }
}

/**
 * Helper: Convert camelCase to snake_case for database
 */
function mapToDb(obj: Record<string, unknown>): Record<string, unknown> {
  const mapped: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(obj)) {
    // Convert camelCase to snake_case
    const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
    mapped[snakeKey] = value
  }

  return mapped
}

/**
 * Subscribe to profile changes (real-time)
 */
export function subscribeToProfile(
  userId: string,
  callback: (profile: Profile) => void
): () => void {
  const channel = supabase
    .channel(`profile:${userId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: TABLE_NAME,
        filter: `uuid=eq.${userId}`,
      },
      (payload) => {
        if (payload.eventType === 'UPDATE' || payload.eventType === 'INSERT') {
          callback(payload.new as Profile)
        }
      }
    )
    .subscribe()

  // Return unsubscribe function
  return () => {
    supabase.removeChannel(channel)
  }
}
