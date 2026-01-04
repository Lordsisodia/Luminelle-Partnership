import { Outlet } from 'react-router-dom'

export const ClerkShell = () => {
  // Providers are now mounted at the app root; this shell simply renders nested routes.
  return <Outlet />
}

export default ClerkShell
