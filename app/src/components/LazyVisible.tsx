import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'

type Props = {
  children: ReactNode
  rootMargin?: string
  once?: boolean
  placeholder?: ReactNode
}

export const LazyVisible = ({ children, rootMargin = '200px', once = true, placeholder = null }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (visible && once) return

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            if (once) obs.disconnect()
          }
        })
      },
      { rootMargin }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [rootMargin, once, visible])

  return <div ref={ref}>{visible ? children : placeholder}</div>
}

export default LazyVisible
