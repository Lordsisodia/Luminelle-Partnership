import { useEffect, useState } from 'react'

export function useScrollSpy(ids: string[], offset: number = 0) {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const handler = () => {
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top - offset <= 0 && rect.bottom - offset >= 0) {
          setActiveId(id)
          return
        }
      }
      setActiveId(null)
    }
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [ids, offset])

  return activeId
}

export default useScrollSpy
