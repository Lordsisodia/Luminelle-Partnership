import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import { adminSettingsRoutes } from './SettingsRoutes'

export default function SettingsPage() {
  const element = useRoutes(adminSettingsRoutes)

  return (
    <Suspense fallback={<div className="p-6 text-sm text-semantic-text-primary/70">Loading settings…</div>}>
      {element}
    </Suspense>
  )
}
