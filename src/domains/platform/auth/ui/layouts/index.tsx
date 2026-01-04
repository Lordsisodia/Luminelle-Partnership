import type { ReactNode } from 'react'

export const AuthLayout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen bg-brand-porcelain">
    {children}
  </div>
)

export default AuthLayout
