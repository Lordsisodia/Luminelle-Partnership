import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'

type UseBidirectionalPreviewScrollSyncArgs = {
  enabled: boolean
  iframeRef: RefObject<HTMLIFrameElement | null>

  // Map PDP section IDs (inside iframe) -> editor section IDs (admin page).
  previewToEditor: Record<string, string>

  // Map editor section IDs (admin page) -> PDP section IDs (inside iframe).
  editorToPreview: Record<string, string>

  // Optional explicit ordering for editor scrollspy (prevents "skipping" when ids are added/removed).
  editorSectionIds?: readonly string[]

  // Timing
  editorScrollThrottleMs?: number
  previewScrollThrottleMs?: number
  suppressMs?: number

  // Scrollspy
  activationY?: number

  // Scroll behavior
  editorScrollBehavior?: ScrollBehavior
  previewScrollBehavior?: ScrollBehavior
  editorScrollBlock?: ScrollLogicalPosition

  // When scrolling the editor programmatically, offset from top to account for sticky headers.
  // When provided, we use `window.scrollTo` instead of `scrollIntoView`.
  editorScrollOffsetPx?: number

  // Editor scroll mode when `editorScrollOffsetPx` is provided:
  // - 'nearest': only scroll when the target is out of a comfortable viewport zone (less jank)
  // - 'pin': always align the target to the offset (more "linked" feel)
  editorScrollMode?: 'nearest' | 'pin'
}

// Two-way scroll linking between:
// - the embedded iframe preview (PDP)
// - the admin editor page (right-hand cards)
//
// Loop prevention:
// - When preview scroll triggers editor scroll, we temporarily suppress editor->preview messages.
// - When editor scroll triggers preview scroll, we temporarily suppress preview->editor messages.
export function useBidirectionalPreviewScrollSync({
  enabled,
  iframeRef,
  previewToEditor,
  editorToPreview,
  editorSectionIds,
  editorScrollThrottleMs = 450,
  previewScrollThrottleMs = 350,
  suppressMs = 800,
  activationY = 140,
  editorScrollBehavior = 'smooth',
  previewScrollBehavior = 'smooth',
  editorScrollBlock = 'start',
  editorScrollOffsetPx,
  editorScrollMode = 'nearest',
}: UseBidirectionalPreviewScrollSyncArgs) {
  const suppressPreviewToEditorUntilRef = useRef(0)
  const suppressEditorToPreviewUntilRef = useRef(0)

  const lastEditorIdRef = useRef<string | null>(null)
  const lastPreviewIdRef = useRef<string | null>(null)

  const lastPreviewToEditorAtRef = useRef(0)
  const lastEditorToPreviewAtRef = useRef(0)

  // Preview (iframe) -> Editor (admin page)
  useEffect(() => {
    if (!enabled) return

    const pendingEditorIdRef = { current: null as string | null }
    let pendingTimer: number | null = null

    const clearPendingTimer = () => {
      if (pendingTimer) window.clearTimeout(pendingTimer)
      pendingTimer = null
    }

    const scrollEditorTo = (editorId: string) => {
      const now = Date.now()
      if (now < suppressPreviewToEditorUntilRef.current) return

      const el = document.getElementById(editorId)
      if (!el) return

      if (typeof editorScrollOffsetPx === 'number') {
        const scrollMarginTop = Number.parseFloat(window.getComputedStyle(el).scrollMarginTop || '0') || 0
        const effectiveOffset = Math.max(0, Math.max(editorScrollOffsetPx, scrollMarginTop))

        const rect = el.getBoundingClientRect()
        const topSafe = effectiveOffset
        const bottomSafe = Math.max(topSafe + 40, window.innerHeight - 120)

        const pinToOffset = () => {
          const targetTop = window.scrollY + rect.top - topSafe
          if (Math.abs(targetTop - window.scrollY) < 2) {
            lastEditorIdRef.current = editorId
            return
          }

          suppressEditorToPreviewUntilRef.current = now + suppressMs
          lastEditorIdRef.current = editorId
          lastPreviewToEditorAtRef.current = now
          window.scrollTo({ top: Math.max(0, targetTop), behavior: editorScrollBehavior })
        }

        if (editorScrollMode === 'pin') {
          pinToOffset()
          return
        }

        // 'nearest' mode: only move if the anchor is outside a comfortable viewport zone.
        let targetTop: number | null = null
        if (rect.top < topSafe) {
          targetTop = window.scrollY + rect.top - topSafe
        } else if (rect.bottom > bottomSafe) {
          targetTop = window.scrollY + (rect.bottom - bottomSafe)
        }

        // Already in a comfortable viewport zone → don't move the page.
        if (targetTop == null) {
          lastEditorIdRef.current = editorId
          return
        }

        suppressEditorToPreviewUntilRef.current = now + suppressMs
        lastEditorIdRef.current = editorId
        lastPreviewToEditorAtRef.current = now
        window.scrollTo({ top: Math.max(0, targetTop), behavior: editorScrollBehavior })
        return
      }

      suppressEditorToPreviewUntilRef.current = now + suppressMs
      lastEditorIdRef.current = editorId
      lastPreviewToEditorAtRef.current = now
      el.scrollIntoView({ behavior: editorScrollBehavior, block: editorScrollBlock })
    }

    const flush = () => {
      clearPendingTimer()
      const desired = pendingEditorIdRef.current
      if (!desired) return

      const now = Date.now()
      const elapsed = now - lastPreviewToEditorAtRef.current
      if (elapsed < editorScrollThrottleMs) {
        pendingTimer = window.setTimeout(flush, editorScrollThrottleMs - elapsed + 5)
        return
      }

      scrollEditorTo(desired)
    }

    const handler = (event: MessageEvent) => {
      // Security: only accept same-origin messages.
      if (event.origin !== window.location.origin) return

      const now = Date.now()
      if (now < suppressPreviewToEditorUntilRef.current) return

      const data = event.data as any
      if (data?.type !== 'admin-preview-active-section') return
      if (typeof data.sectionId !== 'string') return

      const editorId = previewToEditor[data.sectionId]
      if (!editorId) return
      if (lastEditorIdRef.current === editorId) return

      // Always keep the latest desired id, and debounce the actual scroll.
      // This prevents "missing" the final anchor when many events happen quickly.
      pendingEditorIdRef.current = editorId
      flush()
    }

    window.addEventListener('message', handler)
    return () => {
      window.removeEventListener('message', handler)
      clearPendingTimer()
    }
  }, [
    enabled,
    previewToEditor,
    editorScrollThrottleMs,
    suppressMs,
    editorScrollBehavior,
    editorScrollBlock,
    editorScrollOffsetPx,
    editorScrollMode,
  ])

  // Editor (admin page) -> Preview (iframe)
  useEffect(() => {
    if (!enabled) return

    const targetOrigin = window.location.origin
    const editorIds = Array.from(new Set((editorSectionIds && editorSectionIds.length ? editorSectionIds : Object.keys(editorToPreview)) ?? []))

    let activeEditorId: string | null = null
    let raf = 0
    let pendingTimer: number | null = null
    let pendingPreviewId: string | null = null

    const clearPendingTimer = () => {
      if (pendingTimer) window.clearTimeout(pendingTimer)
      pendingTimer = null
    }

    const flush = () => {
      clearPendingTimer()
      if (!pendingPreviewId) return

      const now = Date.now()
      if (now < suppressEditorToPreviewUntilRef.current) return

      const elapsed = now - lastEditorToPreviewAtRef.current
      if (elapsed < previewScrollThrottleMs) {
        pendingTimer = window.setTimeout(flush, previewScrollThrottleMs - elapsed + 5)
        return
      }

      const previewId = pendingPreviewId
      if (!previewId) return
      if (lastPreviewIdRef.current === previewId) return

      lastPreviewIdRef.current = previewId
      lastEditorToPreviewAtRef.current = now

      // Prevent loop-back into editor while we programmatically scroll the preview.
      suppressPreviewToEditorUntilRef.current = now + suppressMs
      iframeRef.current?.contentWindow?.postMessage(
        { type: 'scrollToSection', target: previewId, behavior: previewScrollBehavior },
        targetOrigin,
      )
    }

    const queueScrollToPreview = (previewId: string) => {
      const now = Date.now()
      if (now < suppressEditorToPreviewUntilRef.current) return
      if (!previewId) return
      pendingPreviewId = previewId
      flush()
    }

    const pickActiveEditorId = (ids: string[], y: number) => {
      // "Pinned line" scrollspy: pick the last anchor whose top is above the activation line.
      // This behaves predictably even with many small anchors.
      let lastAbove: string | null = null
      let firstBelow: string | null = null

      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue

        const top = el.getBoundingClientRect().top
        if (top <= y) lastAbove = id
        else if (!firstBelow) firstBelow = id
      }

      return lastAbove ?? firstBelow
    }

    const updateActiveEditor = () => {
      const now = Date.now()
      if (now < suppressEditorToPreviewUntilRef.current) return

      if (!editorIds.length) return

      const bestEditorId = pickActiveEditorId(editorIds, activationY)
      if (!bestEditorId) return
      if (bestEditorId === activeEditorId) return

      activeEditorId = bestEditorId
      const previewId = editorToPreview[bestEditorId]
      if (!previewId) return
      queueScrollToPreview(previewId)
    }

    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => updateActiveEditor())
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    // When the iframe finishes loading, sync it to the editor's current section.
    const iframeEl = iframeRef.current
    const onIframeLoad = () => {
      // Ensure we have a stable editor->preview position after product/iframe changes.
      onScroll()
    }

    iframeEl?.addEventListener('load', onIframeLoad)
    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      iframeEl?.removeEventListener('load', onIframeLoad)
      cancelAnimationFrame(raf)
      clearPendingTimer()
    }
  }, [enabled, iframeRef, editorToPreview, editorSectionIds, previewScrollThrottleMs, suppressMs, activationY, previewScrollBehavior])
}

export default useBidirectionalPreviewScrollSync
