import { useLayoutEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

/**
 * React Router doesn't reset scroll position on navigation by default.
 * This keeps route-to-route navigation feeling like traditional page loads.
 */
export const ScrollToTop = () => {
  const { pathname, hash } = useLocation()
  const navigationType = useNavigationType()

  useLayoutEffect(() => {
    // Preserve scroll position when using the browser back/forward buttons.
    if (navigationType === 'POP') return

    if (hash) {
      const id = decodeURIComponent(hash.replace(/^#/, ''))

      const scrollToHash = () => {
        const el = document.getElementById(id)
        if (!el) return false
        el.scrollIntoView({ block: 'start' })
        return true
      }

      // Route content may be lazy-loaded; try now and once more on the next frame.
      if (scrollToHash()) return
      requestAnimationFrame(() => {
        if (scrollToHash()) return
        window.scrollTo(0, 0)
      })

      return
    }

    window.scrollTo(0, 0)
  }, [navigationType, pathname, hash])

  return null
}

export default ScrollToTop
