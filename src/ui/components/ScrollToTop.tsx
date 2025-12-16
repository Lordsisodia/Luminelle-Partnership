import { useLayoutEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

/**
 * React Router doesn't reset scroll position on navigation by default.
 * This keeps route-to-route navigation feeling like traditional page loads.
 */
export const ScrollToTop = () => {
  const { pathname } = useLocation()
  const navigationType = useNavigationType()

  useLayoutEffect(() => {
    // Preserve scroll position when using the browser back/forward buttons.
    if (navigationType === 'POP') return
    window.scrollTo(0, 0)
  }, [navigationType, pathname])

  return null
}

export default ScrollToTop
