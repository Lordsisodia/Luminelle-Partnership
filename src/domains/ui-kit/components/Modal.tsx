import clsx from 'clsx'
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

export type ModalProps = {
  open: boolean
  onClose?: () => void
  title?: string
  children: React.ReactNode
  className?: string
}

export function Modal({ open, onClose, title, children, className }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  if (typeof document === 'undefined') return null
  if (!open) return null

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose?.()
      }}
    >
      <div
        className={clsx(
          'w-full max-w-lg rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white shadow-xl',
          className,
        )}
      >
        {title ? (
          <div className="flex items-center justify-between gap-2 border-b border-semantic-legacy-brand-blush/50 px-4 py-3">
            <div className="text-sm font-semibold text-semantic-text-primary">{title}</div>
            {onClose ? (
              <button
                className="text-sm text-semantic-text-primary/70 hover:text-semantic-text-primary"
                onClick={onClose}
              >
                ×
              </button>
            ) : null}
          </div>
        ) : null}
        <div className="p-4">{children}</div>
      </div>
    </div>,
    document.body,
  )
}

export default Modal
