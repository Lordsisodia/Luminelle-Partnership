export const SERVICE_WORKER_UPDATE_EVENT = 'lumelle:sw-update-available' as const

export const dispatchServiceWorkerUpdateAvailable = () => {
  try {
    window.dispatchEvent(new Event(SERVICE_WORKER_UPDATE_EVENT))
  } catch {
    // ignore
  }
}

