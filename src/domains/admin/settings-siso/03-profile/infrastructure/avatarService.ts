/**
 * Avatar Service
 *
 * Handles avatar image uploads to Supabase Storage
 *
 * Avatar storage path pattern: `avatars/{userId}/{filename}`
 */

import { supabase } from '@platform/storage/supabase'

const BUCKET_NAME = 'avatars'
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']

export interface UploadAvatarResult {
  path: string
  url: string
  error?: string
}

export interface DeleteAvatarResult {
  success: boolean
  error?: string
}

/**
 * Check if file is valid for avatar upload
 */
export function isValidAvatarFile(file: File): { valid: boolean; error?: string } {
  if (!file) {
    return { valid: false, error: 'No file provided' }
  }

  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: 'File size must be less than 5MB' }
  }

  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return { valid: false, error: 'Must be an image file (JPEG, PNG, GIF, WebP, or SVG)' }
  }

  return { valid: true }
}

/**
 * Upload avatar image for a user
 *
 * @param userId - The user's ID (from Clerk)
 * @param file - The image file to upload
 * @returns The uploaded avatar URL and path
 */
export async function uploadAvatar(
  userId: string,
  file: File
): Promise<UploadAvatarResult> {
  // Validate file
  const validation = isValidAvatarFile(file)
  if (!validation.valid) {
    return { path: '', url: '', error: validation.error }
  }

  try {
    // Generate unique filename with timestamp
    const timestamp = Date.now()
    const extension = file.name.split('.').pop() || 'jpg'
    const filename = `avatar_${timestamp}.${extension}`
    const path = `${userId}/${filename}`

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: true, // Overwrite existing avatar
      })

    if (error) {
      console.error('Avatar upload error:', error)
      return {
        path: '',
        url: '',
        error: error.message || 'Failed to upload avatar',
      }
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(data.path)

    return {
      path: data.path,
      url: urlData.publicUrl,
    }
  } catch (error) {
    console.error('Avatar upload error:', error)
    return {
      path: '',
      url: '',
      error: error instanceof Error ? error.message : 'Failed to upload avatar',
    }
  }
}

/**
 * Delete avatar image for a user
 *
 * @param userId - The user's ID
 * @param path - The path of the avatar to delete
 * @returns Success status
 */
export async function deleteAvatar(
  userId: string,
  path: string
): Promise<DeleteAvatarResult> {
  try {
    // Verify the path belongs to the user
    if (!path.startsWith(`${userId}/`)) {
      return {
        success: false,
        error: 'You can only delete your own avatars',
      }
    }

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([path])

    if (error) {
      console.error('Avatar deletion error:', error)
      return {
        success: false,
        error: error.message || 'Failed to delete avatar',
      }
    }

    return { success: true }
  } catch (error) {
    console.error('Avatar deletion error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete avatar',
    }
  }
}

/**
 * Get public URL for an avatar path
 *
 * @param path - The storage path
 * @returns The public URL
 */
export function getAvatarPublicUrl(path: string | null): string | null {
  if (!path) return null

  try {
    const { data } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(path)

    return data.publicUrl
  } catch {
    return null
  }
}

/**
 * List all avatars for a user
 *
 * @param userId - The user's ID
 * @returns Array of avatar paths
 */
export async function listUserAvatars(userId: string): Promise<string[]> {
  try {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .list(userId, {
        limit: 100,
        sortBy: { column: 'created_at', order: 'desc' },
      })

    if (error) {
      console.error('List avatars error:', error)
      return []
    }

    return data?.map(item => `${userId}/${item.name}`) || []
  } catch (error) {
    console.error('List avatars error:', error)
    return []
  }
}
