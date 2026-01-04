import { useEffect, useState } from 'react'
import { SpinWheel as SpinWheelLocal } from '@client/marketing/ui/sections/shop/final-cta-section/SpinWheelLocal'

// LocalStorage flags so we don't nag users after they spin or dismiss.
const DONE_KEY = 'lumelle_wheel_done'
const DISMISS_KEY = 'lumelle_wheel_dismissed'
const ENABLED = import.meta.env.VITE_SPIN_WHEEL_ENABLED === 'true'

const shouldHide = () => {
  if (typeof window === 'undefined') return true
  return localStorage.getItem(DONE_KEY) === '1' || localStorage.getItem(DISMISS_KEY) === '1'
}

export const SpinWheelPrompt = () => {
  const [visible, setVisible] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!ENABLED) return
    if (!shouldHide()) setVisible(true)
  }, [])

  const handleDismiss = () => {
    try {
      localStorage.setItem(DISMISS_KEY, '1')
    } catch {
      // ignore storage errors
    }
    setOpen(false)
    setVisible(false)
  }

  const handleSpun = () => {
    try {
      localStorage.setItem(DONE_KEY, '1')
    } catch {
      // ignore
    }
    setVisible(false)
    setOpen(false)
  }

  if (!ENABLED || !visible) return null

  return (
    <>
      {/* Floating CTA */}
      {!open ? (
        <div className="fixed bottom-5 left-4 z-40 flex items-center gap-2 rounded-full bg-semantic-legacy-brand-cocoa text-white shadow-lg ring-1 ring-black/10">
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss spin to win"
            className="px-3 py-2 text-sm opacity-80 transition hover:opacity-100"
          >
            ✕
          </button>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.12em] transition hover:bg-white/20"
          >
            Spin to win
          </button>
        </div>
      ) : null}

      {/* Modal */}
      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div
            role="dialog"
            aria-modal="true"
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl"
          >
            <button
              type="button"
              onClick={handleDismiss}
              aria-label="Close spin wheel"
              className="absolute right-4 top-4 rounded-full border border-semantic-legacy-brand-blush/60 p-2 text-semantic-text-primary/70 hover:bg-brand-porcelain"
            >
              ✕
            </button>
            <div className="mt-4">
              <SpinWheelLocal onSpun={handleSpun} />
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default SpinWheelPrompt
