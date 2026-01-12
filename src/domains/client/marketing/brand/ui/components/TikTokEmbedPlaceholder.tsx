import { useState, useRef, useEffect } from 'react'

interface TikTokEmbedProps {
  embedUrl: string
  title: string
}

export const TikTokEmbedPlaceholder = ({ embedUrl, title }: TikTokEmbedProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleClick = () => {
    setIsLoaded(true)
  }

  if (!isLoaded && isInView) {
    return (
      <div
        ref={containerRef}
        onClick={handleClick}
        className="relative cursor-pointer overflow-hidden rounded-2xl border border-semantic-accent-cta/30 pb-[158%] bg-semantic-bg-subtle flex items-center justify-center group"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-md group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5 text-semantic-text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-semantic-text-primary/80">
              Watch video
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-semantic-accent-cta/30 pb-[158%] bg-black">
      <iframe
        src={embedUrl.includes('lang=') ? embedUrl : `${embedUrl}&lang=en`}
        title={title}
        loading="lazy"
        allow="encrypted-media; fullscreen; clipboard-write"
        sandbox="allow-scripts allow-same-origin allow-presentation"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
        style={{ border: 0 }}
      />
    </div>
  )
}
