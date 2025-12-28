import { useEffect, useRef } from 'react'

type UsePreviewSectionScrollSyncArgs = {
  enabled: boolean
  mapPreviewToEditor: Record<string, string>
  throttleMs?: number
  behavior?: ScrollBehavior
  block?: ScrollLogicalPosition
}

// Listens for iframe preview "active section" messages and scrolls the editor UI to the matching section.
//
// Expected message shape:
//   { type: 'admin-preview-active-section', sectionId: string }
export function usePreviewSectionScrollSync({
  enabled,
  mapPreviewToEditor,
  throttleMs = 450,
  behavior = 'smooth',
  block = 'start',
}: UsePreviewSectionScrollSyncArgs) {
  const lastEditorIdRef = useRef<string | null>(null)
  const lastScrollAtRef = useRef<number>(0)

  useEffect(() => {
    if (!enabled) return

    const handler = (event: MessageEvent) => {
      // Security: only accept same-origin messages.
      if (event.origin !== window.location.origin) return

      const data = event.data as any
      if (data?.type !== 'admin-preview-active-section') return
      if (typeof data.sectionId !== 'string') return

      const editorId = mapPreviewToEditor[data.sectionId]
      if (!editorId) return

      if (lastEditorIdRef.current === editorId) return

      const now = Date.now()
      if (now - lastScrollAtRef.current < throttleMs) return

      const el = document.getElementById(editorId)
      if (!el) return

      lastEditorIdRef.current = editorId
      lastScrollAtRef.current = now
      el.scrollIntoView({ behavior, block })
    }

    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [enabled, mapPreviewToEditor, throttleMs, behavior, block])
}

export default usePreviewSectionScrollSync

