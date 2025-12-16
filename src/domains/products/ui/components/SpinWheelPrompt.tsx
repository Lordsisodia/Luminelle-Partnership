import { useEffect, useState } from 'react'
import SpinWheel from '@/domains/landing/ui/sections/shop/final-cta-section/SpinWheel'

// LocalStorage flags so we don't nag users after they spin or dismiss.
const DONE_KEY = 'lumelle_wheel_done'
const DISMISS_KEY = 'lumelle_wheel_dismissed'

const shouldHide = () => {
  if (typeof window === 'undefined') return true
  return localStorage.getItem(DONE_KEY) === '1' || localStorage.getItem(DISMISS_KEY) === '1'
}

export const SpinWheelPrompt = () => {
  const [visible, setVisible] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
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

  if (!visible) return null

  return (
    <>
      {/* Floating CTA */}
      {!open ? (
        <div className="fixed bottom-5 left-4 z-40 flex items-center gap-2 rounded-full bg-black text-white shadow-lg ring-1 ring-black/30">
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
          <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl">
            <button
              type="button"
              onClick={handleDismiss}
              aria-label="Close spin wheel"
              className="absolute right-4 top-4 rounded-full border border-neutral-200 p-2 text-neutral-600 hover:bg-neutral-100"
            >
              ✕
            </button>
            <div className="mt-4">
              <SpinWheel onSpun={handleSpun} />
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default SpinWheelPrompt
