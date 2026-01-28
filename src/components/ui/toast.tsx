import { X, CheckCircle2, AlertCircle, Info } from 'lucide-react'
import { useEffect } from 'react'

export interface ToastProps {
  id: string
  title: string
  description?: string
  type: 'success' | 'error' | 'info'
  onClose?: () => void
}

const toastStyles = {
  success: 'border-green-500/50 bg-green-50',
  error: 'border-red-500/50 bg-red-50',
  info: 'border-siso-border/70 bg-siso-bg-secondary',
}

const iconStyles = {
  success: 'text-green-600',
  error: 'text-red-600',
  info: 'text-siso-text-muted',
}

const icons = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
}

export function Toast({ id, title, description, type, onClose }: ToastProps) {
  const Icon = icons[type]

  useEffect(() => {
    // Announce to screen readers
    const announcement = document.createElement('div')
    announcement.setAttribute('role', 'status')
    announcement.setAttribute('aria-live', 'polite')
    announcement.className = 'sr-only'
    announcement.textContent = `${title}. ${description || ''}`
    document.body.appendChild(announcement)

    return () => {
      document.body.removeChild(announcement)
    }
  }, [title, description])

  return (
    <div
      className="flex items-start gap-3 rounded-2xl border p-4 shadow-lg animate-in slide-in-from-right"
      style={{
        animationDuration: '300ms',
      }}
    >
      <Icon className={`h-5 w-5 flex-shrink-0 mt-0.5 ${iconStyles[type]}`} />
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-semibold ${
          type === 'success' ? 'text-green-900' :
          type === 'error' ? 'text-red-900' :
          'text-siso-text-primary'
        }`}>
          {title}
        </p>
        {description && (
          <p className={`text-sm mt-1 ${
            type === 'success' ? 'text-green-700' :
            type === 'error' ? 'text-red-700' :
            'text-siso-text-muted'
          }`}>
            {description}
          </p>
        )}
      </div>
      {onClose && (
        <button
          onClick={() => onClose()}
          className="flex-shrink-0 rounded-lg p-1 hover:bg-black/5 transition-colors"
          aria-label="Close notification"
        >
          <X className="h-4 w-4 text-siso-text-muted" />
        </button>
      )}
    </div>
  )
}

export function ToastContainer({ toasts, onDismiss }: { toasts: Array<{ id: string; title: string; description?: string; type: 'success' | 'error' | 'info' }>, onDismiss: (id: string) => void }) {
  if (toasts.length === 0) return null

  return (
    <div
      className="fixed top-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full"
      role="region"
      aria-label="Notifications"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          onClose={() => onDismiss(toast.id)}
        />
      ))}
    </div>
  )
}
