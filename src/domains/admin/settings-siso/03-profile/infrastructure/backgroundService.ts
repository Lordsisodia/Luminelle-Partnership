/**
 * Background Service
 *
 * Handles background image uploads to Supabase Storage
 *
 * Background storage path pattern: `profile-backgrounds/{userId}/{filename}`
 */

import { supabase } from '@platform/storage/supabase'

const BUCKET_NAME = 'profile-backgrounds'
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export interface UploadBackgroundResult {
  path: string
  url: string
  error?: string
}

export interface DeleteBackgroundResult {
  success: boolean
  error?: string
}

/**
 * Check if file is valid for background upload
 */
export function isValidBackgroundFile(file: File): { valid: boolean; error?: string } {
  if (!file) {
    return { valid: false, error: 'No file provided' }
  }

  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: 'File size must be less than 10MB' }
  }

  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return { valid: false, error: 'Must be an image file (JPEG, PNG, or WebP)' }
  }

  return { valid: true }
}

/**
 * Upload background image for a user
 *
 * @param userId - The user's ID (from Clerk)
 * @param file - The image file to upload
 * @returns The uploaded background URL and path
 */
export async function uploadBackground(
  userId: string,
  file: File
): Promise<UploadBackgroundResult> {
  // Validate file
  const validation = isValidBackgroundFile(file)
  if (!validation.valid) {
    return { path: '', url: '', error: validation.error }
  }

  try {
    // Generate unique filename with timestamp
    const timestamp = Date.now()
    const extension = file.name.split('.').pop() || 'jpg'
    const filename = `background_${timestamp}.${extension}`
    const path = `${userId}/${filename}`

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: true, // Overwrite existing background
      })

    if (error) {
      console.error('Background upload error:', error)
      return {
        path: '',
        url: '',
        error: error.message || 'Failed to upload background',
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
    console.error('Background upload error:', error)
    return {
      path: '',
      url: '',
      error: error instanceof Error ? error.message : 'Failed to upload background',
    }
  }
}

/**
 * Delete background image for a user
 *
 * @param userId - The user's ID
 * @param path - The path of the background to delete
 * @returns Success status
 */
export async function deleteBackground(
  userId: string,
  path: string
): Promise<DeleteBackgroundResult> {
  try {
    // Verify the path belongs to the user
    if (!path.startsWith(`${userId}/`)) {
      return {
        success: false,
        error: 'You can only delete your own backgrounds',
      }
    }

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([path])

    if (error) {
      console.error('Background deletion error:', error)
      return {
        success: false,
        error: error.message || 'Failed to delete background',
      }
    }

    return { success: true }
  } catch (error) {
    console.error('Background deletion error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete background',
    }
  }
}

/**
 * Get public URL for a background path
 *
 * @param path - The storage path
 * @returns The public URL
 */
export function getBackgroundPublicUrl(path: string | null): string | null {
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
 * List all backgrounds for a user
 *
 * @param userId - The user's ID
 * @returns Array of background paths
 */
export async function listUserBackgrounds(userId: string): Promise<string[]> {
  try {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .list(userId, {
        limit: 100,
        sortBy: { column: 'created_at', order: 'desc' },
      })

    if (error) {
      console.error('List backgrounds error:', error)
      return []
    }

    return data?.map(item => `${userId}/${item.name}`) || []
  } catch (error) {
    console.error('List backgrounds error:', error)
    return []
  }
}
