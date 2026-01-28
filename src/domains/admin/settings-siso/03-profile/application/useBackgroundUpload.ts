/**
 * Background Upload Hook
 *
 * React hook for uploading background images
 */

import { useState, useCallback } from 'react'
import { useUser } from '@clerk/clerk-react'
import { uploadBackground, deleteBackground, type UploadBackgroundResult } from '../infrastructure/backgroundService'
import { useUpdateProfile } from './useProfile'

export interface UseBackgroundUploadResult {
  uploadBackground: (file: File) => Promise<string>
  removeBackground: () => Promise<void>
  isUploading: boolean
  uploadProgress: number
  uploadError: string | null
  clearError: () => void
}

export function useBackgroundUpload(): UseBackgroundUploadResult {
  const { user } = useUser()
  const updateProfile = useUpdateProfile()
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadError, setUploadError] = useState<string | null>(null)

  const clearError = useCallback(() => {
    setUploadError(null)
  }, [])

  const uploadBackgroundCallback = useCallback(
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

        // Upload background
        const result: UploadBackgroundResult = await uploadBackground(user.id, file)

        clearInterval(progressInterval)
        setUploadProgress(100)

        if (result.error || !result.url) {
          setUploadError(result.error || 'Failed to upload background')
          throw new Error(result.error || 'Upload failed')
        }

        // Update profile with new background URL
        await updateProfile.mutateAsync({ backgroundUrl: result.url })

        return result.url
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to upload background'
        setUploadError(errorMessage)
        throw error
      } finally {
        setIsUploading(false)
        setUploadProgress(0)
      }
    },
    [user?.id, updateProfile]
  )

  const removeBackgroundCallback = useCallback(
    async () => {
      if (!user?.id) {
        throw new Error('No user logged in')
      }

      setIsUploading(true)
      setUploadError(null)

      try {
        // Update profile to remove background URL
        await updateProfile.mutateAsync({ backgroundUrl: undefined })
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to remove background'
        setUploadError(errorMessage)
        throw error
      } finally {
        setIsUploading(false)
      }
    },
    [user?.id, updateProfile]
  )

  return {
    uploadBackground: uploadBackgroundCallback,
    removeBackground: removeBackgroundCallback,
    isUploading,
    uploadProgress,
    uploadError,
    clearError,
  }
}
