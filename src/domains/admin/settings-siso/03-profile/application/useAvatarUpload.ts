/**
 * Avatar Upload Hook
 *
 * React hook for uploading avatar images
 */

import { useState, useCallback } from 'react'
import { useUser } from '@clerk/clerk-react'
import { uploadAvatar, deleteAvatar, type UploadAvatarResult } from '../infrastructure'
import { useUpdateProfile } from './useProfile'

export interface UseAvatarUploadResult {
  uploadAvatar: (file: File) => Promise<string>
  isUploading: boolean
  uploadProgress: number
  uploadError: string | null
  clearError: () => void
}

export function useAvatarUpload(): UseAvatarUploadResult {
  const { user } = useUser()
  const updateProfile = useUpdateProfile()
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadError, setUploadError] = useState<string | null>(null)

  const clearError = useCallback(() => {
    setUploadError(null)
  }, [])

  const uploadAvatarCallback = useCallback(
    async (file: File): Promise<string> => {
      if (!user?.id) {
        throw new Error('No user logged in')
      }

      setIsUploading(true)
      setUploadProgress(0)
      setUploadError(null)

      try {
        // Simulate progress (Supabase doesn't provide progress for regular uploads)
        const progressInterval = setInterval(() => {
          setUploadProgress((prev) => {
            if (prev >= 90) {
              clearInterval(progressInterval)
              return 90
            }
            return prev + 10
          })
        }, 100)

        // Upload avatar
        const result: UploadAvatarResult = await uploadAvatar(user.id, file)

        clearInterval(progressInterval)
        setUploadProgress(100)

        if (result.error || !result.url) {
          setUploadError(result.error || 'Failed to upload avatar')
          throw new Error(result.error || 'Upload failed')
        }

        // Update profile with new avatar URL
        await updateProfile.mutateAsync({ avatarUrl: result.url })

        return result.url
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to upload avatar'
        setUploadError(errorMessage)
        throw error
      } finally {
        setIsUploading(false)
        setUploadProgress(0)
      }
    },
    [user?.id, updateProfile]
  )

  return {
    uploadAvatar: uploadAvatarCallback,
    isUploading,
    uploadProgress,
    uploadError,
    clearError,
  }
}
