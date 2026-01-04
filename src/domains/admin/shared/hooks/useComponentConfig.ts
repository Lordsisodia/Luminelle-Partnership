import { useCallback, useEffect, useMemo, useState } from 'react'
import { componentDefaults } from '@admin/shared/data/componentMeta'
import type { ComponentKey } from '@admin/shared/data/componentMeta'

const STORAGE_PREFIX = 'component:'

type AnyConfig = unknown

export function useComponentConfig<T extends AnyConfig>(key: ComponentKey) {
  const defaults = componentDefaults[key] as T

  const [draft, setDraft] = useState<T>(defaults)
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null)

  // Load from localStorage once
  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_PREFIX + key)
    if (!raw) return
    try {
      const parsed = JSON.parse(raw) as T
      setDraft(parsed)
      setLastSavedAt(new Date())
    } catch {
      // ignore bad cache
    }
  }, [key])

  const save = useCallback(
    (next?: T) => {
      const value = next ?? draft
      window.localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value))
      setLastSavedAt(new Date())
    },
    [draft, key],
  )

  const reset = useCallback(() => {
    setDraft(defaults)
    window.localStorage.removeItem(STORAGE_PREFIX + key)
    setLastSavedAt(null)
  }, [defaults, key])

  const update = useCallback(
    (updater: (prev: T) => T) => {
      setDraft((prev) => updater(prev))
    },
    [],
  )

  const status = useMemo(() => {
    if (!lastSavedAt) return 'unsaved'
    return 'draft'
  }, [lastSavedAt])

  return { draft, setDraft, defaults, save, reset, status, lastSavedAt, update }
}

export default useComponentConfig
