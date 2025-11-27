import { createContext, useCallback, useContext, useMemo } from 'react'
import type { ReactNode } from 'react'
import { useClerk, useUser } from '@clerk/clerk-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSyncUserToSupabase } from '@/hooks/useSyncUserToSupabase'

export type User = {
  firstName: string
  fullName?: string | null
  email?: string | null
  avatarUrl?: string | null
} | null

type AuthState = {
  user: User
  signedIn: boolean
  signIn: (firstName?: string) => void
  signOut: () => void
}

const AuthCtx = createContext<AuthState | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { isLoaded, isSignedIn, user } = useUser()
  const { signOut } = useClerk()
  const navigate = useNavigate()
  const location = useLocation()
  useSyncUserToSupabase()

  const redirectSearch = useMemo(() => {
    const target = `${location.pathname}${location.search}${location.hash}` || '/'
    const params = new URLSearchParams({ redirect: target })
    return params.toString()
  }, [location.pathname, location.search, location.hash])

  const goToSignIn = useCallback(() => {
    navigate(`/sign-in?${redirectSearch}`)
  }, [navigate, redirectSearch])

  const derivedUser = useMemo<User>(() => {
    if (!user) return null
    const fallback =
      user.firstName ??
      user.fullName ??
      user.username ??
      user.primaryEmailAddress?.emailAddress ??
      'Friend'

    return {
      firstName: fallback,
      fullName: user.fullName,
      email: user.primaryEmailAddress?.emailAddress ?? null,
      avatarUrl: user.imageUrl ?? null,
    }
  }, [user])

  const triggerSignOut = useCallback(async () => {
    await signOut()
    navigate('/')
  }, [navigate, signOut])

  const handleSignIn = useCallback<AuthState['signIn']>(() => {
    goToSignIn()
  }, [goToSignIn])

  const handleSignOut = useCallback<AuthState['signOut']>(() => {
    void triggerSignOut()
  }, [triggerSignOut])

  const value = useMemo<AuthState>(
    () => ({
      user: derivedUser,
      signedIn: Boolean(isLoaded && isSignedIn),
      signIn: handleSignIn,
      signOut: handleSignOut,
    }),
    [derivedUser, handleSignIn, handleSignOut, isLoaded, isSignedIn]
  )

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const ctx = useContext(AuthCtx)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
