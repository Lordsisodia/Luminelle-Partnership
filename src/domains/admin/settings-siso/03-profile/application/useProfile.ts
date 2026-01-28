/**
 * Profile Custom Hooks
 *
 * React hooks for profile management with TanStack Query
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useUser } from '@clerk/clerk-react'
import {
  getProfile,
  getProfileOrCreate,
  updateProfile,
  deleteProfile,
  listPublicProfiles,
  updateTokens,
  subscribeToProfile,
  type Profile,
} from '../infrastructure'
import type { ProfileForm } from '../domain/schema'

// Query keys
export const profileKeys = {
  all: ['profiles'] as const,
  detail: (id: string) => ['profiles', id] as const,
  public: () => ['profiles', 'public'] as const,
}

/**
 * Hook: Get current user's profile
 */
export function useProfile() {
  const { user, isLoaded, isSignedIn } = useUser()
  const queryClient = useQueryClient()

  return useQuery({
    queryKey: profileKeys.detail(user?.id || ''),
    queryFn: async () => {
      if (!user?.id) throw new Error('No user ID')

      // Try to get or create profile
      const result = await getProfileOrCreate(user.id, user.fullName || undefined)

      if (result.error) {
        throw new Error(result.error)
      }

      return result.profile
    },
    enabled: isLoaded && isSignedIn && !!user?.id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

/**
 * Hook: Get profile by user ID (for viewing other's profiles)
 */
export function useUserProfile(userId?: string) {
  return useQuery({
    queryKey: profileKeys.detail(userId || ''),
    queryFn: async () => {
      if (!userId) throw new Error('No user ID provided')

      const result = await getProfile(userId)

      if (result.error) {
        throw new Error(result.error)
      }

      return result.profile
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

/**
 * Hook: Update current user's profile
 */
export function useUpdateProfile() {
  const queryClient = useQueryClient()
  const { user } = useUser()

  return useMutation({
    mutationFn: async (updates: Partial<ProfileForm>) => {
      if (!user?.id) throw new Error('No user ID')

      // Convert form to profile format
      const profileUpdates: Partial<Profile> = {
        ...(updates.displayName && { display_name: updates.displayName }),
        ...(updates.bio !== undefined && { bio: updates.bio }),
        ...(updates.avatarUrl !== undefined && { avatar_url: updates.avatarUrl }),
        ...(updates.backgroundUrl !== undefined && { background_url: updates.backgroundUrl }),
        ...(updates.title !== undefined && { title: updates.title }),
        ...(updates.location !== undefined && { location: updates.location }),
        ...(updates.website !== undefined && { website: updates.website }),
        ...(updates.skills && { skills: updates.skills }),
        ...(updates.interests && { interests: updates.interests }),
        ...(updates.socialTwitterUrl !== undefined && { social_twitter_url: updates.socialTwitterUrl }),
        ...(updates.socialLinkedinUrl !== undefined && { social_linkedin_url: updates.socialLinkedinUrl }),
        ...(updates.socialGithubUrl !== undefined && { social_github_url: updates.socialGithubUrl }),
        ...(updates.socialYoutubeUrl !== undefined && { social_youtube_url: updates.socialYoutubeUrl }),
        ...(updates.socialInstagramUrl !== undefined && { social_instagram_url: updates.socialInstagramUrl }),
        ...(updates.timezone && { timezone: updates.timezone }),
        ...(updates.language && { language: updates.language }),
        ...(updates.profileVisibility && { profile_visibility: updates.profileVisibility }),
      }

      const result = await updateProfile(user.id, profileUpdates)

      if (result.error) {
        throw new Error(result.error)
      }

      return result.profile
    },
    onSuccess: (data) => {
      // Invalidate and refetch profile
      queryClient.invalidateQueries({ queryKey: profileKeys.detail(user?.id || '') })
    },
  })
}

/**
 * Hook: Delete current user's profile
 */
export function useDeleteProfile() {
  const queryClient = useQueryClient()
  const { user } = useUser()

  return useMutation({
    mutationFn: async () => {
      if (!user?.id) throw new Error('No user ID')

      const result = await deleteProfile(user.id)

      if (result.error) {
        throw new Error(result.error)
      }

      return result
    },
    onSuccess: () => {
      // Clear profile from cache
      queryClient.invalidateQueries({ queryKey: profileKeys.detail(user?.id || '') })
    },
  })
}

/**
 * Hook: List public profiles
 */
export function usePublicProfiles(options?: { limit?: number; search?: string }) {
  return useQuery({
    queryKey: [...profileKeys.public(), options],
    queryFn: async () => {
      const result = await listPublicProfiles(options)

      if (result.error) {
        throw new Error(result.error)
      }

      return result.profiles
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
  })
}

/**
 * Hook: Subscribe to real-time profile updates
 */
export function useProfileSubscription(userId: string) {
  const queryClient = useQueryClient()

  // Subscribe to profile changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => {
    if (!userId) return

    const unsubscribe = subscribeToProfile(userId, (profile) => {
      // Update cache when profile changes
      queryClient.setQueryData(profileKeys.detail(userId), profile)
    })

    return unsubscribe
  }, [userId])
}

/**
 * Hook: Profile management with common operations
 * Combines multiple hooks for convenience
 */
export function useProfileManagement() {
  const profile = useProfile()
  const updateProfile = useUpdateProfile()
  const deleteProfile = useDeleteProfile()

  return {
    // Data
    profile: profile.data,
    isLoading: profile.isLoading,
    error: profile.error,
    isError: profile.isError,

    // Mutations
    updateProfile: updateProfile.mutateAsync,
    isUpdating: updateProfile.isPending,
    deleteProfile: deleteProfile.mutateAsync,
    isDeleting: deleteProfile.isPending,

    // Refresh
    refetch: profile.refetch,
  }
}

/**
 * Hook: Update profile mutation standalone
 * Use when you need more control
 */
export function useProfileUpdate() {
  const queryClient = useQueryClient()
  const { user } = useUser()

  return useMutation({
    mutationFn: async (updates: Partial<Profile>) => {
      if (!user?.id) throw new Error('No user ID')

      const result = await updateProfile(user.id, updates)

      if (result.error) {
        throw new Error(result.error)
      }

      return result.profile
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.detail(user?.id || '') })
    },
  })
}

/**
 * Hook: Update tokens (for gamification features)
 */
export function useUpdateTokens() {
  const queryClient = useQueryClient()
  const { user } = useUser()

  return useMutation({
    mutationFn: async (amount: number) => {
      if (!user?.id) throw new Error('No user ID')

      const result = await updateTokens(user.id, amount)

      if (result.error) {
        throw new Error(result.error)
      }

      return result.profile
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.detail(user?.id || '') })
    },
  })
}
