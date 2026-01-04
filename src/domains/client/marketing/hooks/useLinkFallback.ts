import { useCallback, useState } from 'react'

type Options = {
  url: string
  timeoutMs?: number
}

export const useLinkFallback = ({ url, timeoutMs = 5000 }: Options) => {
  const [isAttempting, setIsAttempting] = useState(false)
  const [showFallback, setShowFallback] = useState(false)

  const trigger = useCallback(() => {
    setIsAttempting(true)

    try {
      const openedWindow = window.open(url, '_blank', 'noopener,noreferrer')

      if (!openedWindow) {
        setShowFallback(true)
        setIsAttempting(false)
      } else {
        window.setTimeout(() => {
          if (!openedWindow || openedWindow.closed) {
            setShowFallback(true)
          }
          setIsAttempting(false)
        }, timeoutMs)
      }
    } catch (error) {
      console.error('Failed to open link', error)
      setShowFallback(true)
      setIsAttempting(false)
    }
  }, [timeoutMs, url])

  const closeFallback = useCallback(() => {
    setShowFallback(false)
    setIsAttempting(false)
  }, [])

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url)
      return true
    } catch (error) {
      console.error('Clipboard copy failed', error)
      return false
    }
  }, [url])

  return {
    trigger,
    copyLink,
    showFallback,
    closeFallback,
    isAttempting,
  }
}
