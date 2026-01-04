import { Navigate, useLocation } from 'react-router-dom'
import { useAuthContext } from '@platform/auth/providers/AuthContext'

type AdminGuardProps = {
  children: React.ReactNode
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const location = useLocation()
  const { signedIn, isLoading } = useAuthContext()

  if (isLoading) return null

  if (!signedIn) {
    const redirectTo = `${location.pathname}${location.search}${location.hash}`
    return <Navigate to={`/sign-in?redirect=${encodeURIComponent(redirectTo)}`} replace />
  }

  return <>{children}</>
}
