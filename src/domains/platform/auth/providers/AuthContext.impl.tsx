import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { useAuth as useClerkAuth, useUser as useClerkUser } from '@clerk/clerk-react'

// Minimal shim: mirrors previous AuthContext API.
export type AuthContextValue = {
  signedIn: boolean
  userId: string | null
  isLoading: boolean
  user?: { id: string | null; fullName?: string | null; email?: string | null; avatarUrl?: string | null } | null
  signOut: () => Promise<void>
  refresh: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { isSignedIn, isLoaded, getToken, signOut: clerkSignOut } = useClerkAuth()
  const { user } = useClerkUser()
  const [isLoading, setIsLoading] = useState(!isLoaded)

  useEffect(() => {
    setIsLoading(!isLoaded)
  }, [isLoaded])

  const value: AuthContextValue = {
    signedIn: Boolean(isSignedIn),
    userId: user?.id ?? null,
    user: user
      ? {
          id: user.id,
          fullName: user.fullName || null,
          email: user.primaryEmailAddress?.emailAddress ?? null,
          avatarUrl: user.imageUrl ?? null,
        }
      : null,
    isLoading,
    signOut: async () => {
      await clerkSignOut().catch(() => {})
    },
    refresh: async () => {
      setIsLoading(true)
      await getToken().catch(() => null)
      setIsLoading(false)
    },
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuthContext must be used inside AuthProvider')
  return ctx
}

export default AuthProvider
