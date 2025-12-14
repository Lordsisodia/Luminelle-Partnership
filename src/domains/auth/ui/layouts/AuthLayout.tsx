import type { ReactNode } from 'react'

type AuthLayoutProps = {
  children: ReactNode
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return <div className="min-h-screen bg-semantic-legacy-brand-blush/20 text-semantic-text-primary">{children}</div>
}

export default AuthLayout
