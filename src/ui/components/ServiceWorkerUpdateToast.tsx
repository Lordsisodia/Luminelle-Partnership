import { useEffect, useState } from 'react'
import { SERVICE_WORKER_UPDATE_EVENT } from '@/lib/serviceWorkerUpdates'

export const ServiceWorkerUpdateToast = () => {
  const [visible, setVisible] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    const onUpdate = () => setVisible(true)
    window.addEventListener(SERVICE_WORKER_UPDATE_EVENT, onUpdate)
    return () => window.removeEventListener(SERVICE_WORKER_UPDATE_EVENT, onUpdate)
  }, [])

  useEffect(() => {
    if (!refreshing) return
    if (!('serviceWorker' in navigator)) return

    const onControllerChange = () => window.location.reload()
    navigator.serviceWorker.addEventListener('controllerchange', onControllerChange)
    return () => navigator.serviceWorker.removeEventListener('controllerchange', onControllerChange)
  }, [refreshing])

  const refresh = async () => {
    if (refreshing) return
    setRefreshing(true)

    try {
      if (!('serviceWorker' in navigator)) {
        window.location.reload()
        return
      }

      const registration = await navigator.serviceWorker.getRegistration()
      if (!registration) {
        window.location.reload()
        return
      }

      if (registration.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' })
        return
      }

      // No waiting worker — fall back to a normal reload.
      window.location.reload()
    } catch {
      window.location.reload()
    }
  }

  if (!visible) return null

  return (
    <section aria-label="Update available" className="fixed inset-x-0 top-0 z-50 p-4">
      <div className="mx-auto max-w-3xl rounded-3xl border border-semantic-legacy-brand-blush/60 bg-white/95 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.14)] backdrop-blur">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-semantic-text-primary">Update available</p>
            <p className="mt-1 text-xs text-semantic-text-primary/70">
              A newer version of the site is ready. Refresh to update.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setVisible(false)}
              className="inline-flex items-center justify-center rounded-full border border-semantic-legacy-brand-blush/70 bg-white px-5 py-2 text-sm font-semibold text-semantic-text-primary hover:bg-brand-porcelain/60"
            >
              Not now
            </button>
            <button
              type="button"
              onClick={() => void refresh()}
              disabled={refreshing}
              className="inline-flex items-center justify-center rounded-full bg-semantic-legacy-brand-cocoa px-5 py-2 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 disabled:opacity-60"
            >
              {refreshing ? 'Updating…' : 'Refresh'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServiceWorkerUpdateToast

