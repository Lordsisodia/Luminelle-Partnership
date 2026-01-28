import { useState, useCallback } from 'react'
import { ToastContainer } from './toast'

export type ToastType = 'success' | 'error' | 'info'

export interface Toast {
  id: string
  title: string
  description?: string
  type: ToastType
  duration?: number
}

interface UseToastReturn {
  toasts: Toast[]
  toast: (props: Omit<Toast, 'id'>) => void
  success: (title: string, description?: string) => void
  error: (title: string, description?: string) => void
  info: (title: string, description?: string) => void
  dismiss: (id: string) => void
}

let toastCount = 0

export function useToast(): UseToastReturn {
  const [toasts, setToasts] = useState<Toast[]>([])

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toast = useCallback(
    ({ title, description, type = 'info', duration = 3000 }: Omit<Toast, 'id'>) => {
      const id = `toast-${toastCount++}`
      const newToast: Toast = { id, title, description, type, duration }

      setToasts((prev) => [...prev, newToast])

      if (duration > 0) {
        setTimeout(() => {
          dismiss(id)
        }, duration)
      }
    },
    [dismiss]
  )

  const success = useCallback(
    (title: string, description?: string) => {
      toast({ title, description, type: 'success' })
    },
    [toast]
  )

  const error = useCallback(
    (title: string, description?: string) => {
      toast({ title, description, type: 'error', duration: 5000 })
    },
    [toast]
  )

  const info = useCallback(
    (title: string, description?: string) => {
      toast({ title, description, type: 'info' })
    },
    [toast]
  )

  return {
    toasts,
    toast,
    success,
    error,
    info,
    dismiss,
  }
}

// Simple toast context for easier access
let currentToastInstance: UseToastReturn | null = null

export function setToastInstance(instance: UseToastReturn) {
  currentToastInstance = instance
}

export function toast(props: Omit<Toast, 'id'>) {
  currentToastInstance?.toast(props)
}

export function toastSuccess(title: string, description?: string) {
  currentToastInstance?.success(title, description)
}

export function toastError(title: string, description?: string) {
  currentToastInstance?.error(title, description)
}

export function toastInfo(title: string, description?: string) {
  currentToastInstance?.info(title, description)
}

// Export ToastContainer for use in components
export { ToastContainer } from './toast'
