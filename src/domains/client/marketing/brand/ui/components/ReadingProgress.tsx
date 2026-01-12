import { useState, useEffect } from 'react'

export const ReadingProgress = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrolled = window.scrollY
      const maxScroll = documentHeight - windowHeight

      const progressPercent = (scrolled / maxScroll) * 100
      setProgress(Math.min(100, Math.max(0, progressPercent)))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-semantic-accent-cta/10">
      <div
        className="h-full bg-gradient-to-r from-semantic-accent-cta to-semantic-legacy-brand-cocoa transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
