import { createContext, useContext, useEffect, useState } from 'react'

export type User = { firstName: string } | null

type AuthState = {
  user: User
  signedIn: boolean
  signIn: (firstName?: string) => void
  signOut: () => void
}

const AuthCtx = createContext<AuthState | null>(null)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem('lumelle_user')
      if (raw) setUser(JSON.parse(raw))
    } catch (error) {
      void error
    }
  }, [])

  const signIn: AuthState['signIn'] = (firstName = 'Jane') => {
    const u = { firstName }
    setUser(u)
    try {
      localStorage.setItem('lumelle_user', JSON.stringify(u))
    } catch (error) {
      void error
    }
  }

  const signOut = () => {
    setUser(null)
    try {
      localStorage.removeItem('lumelle_user')
    } catch (error) {
      void error
    }
  }

  return (
    <AuthCtx.Provider value={{ user, signedIn: Boolean(user), signIn, signOut }}>{children}</AuthCtx.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const ctx = useContext(AuthCtx)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
