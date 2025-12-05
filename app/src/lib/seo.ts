type MetaInput = {
  title: string
  description: string
  image?: string
  url?: string
  type?: string // og:type
}

const ensureTag = (selector: string, create: () => HTMLElement, set: (el: HTMLElement) => void) => {
  let el = document.querySelector(selector) as HTMLElement | null
  if (!el) {
    el = create()
    document.head.appendChild(el)
  }
  set(el)
}

const toAbsolute = (value?: string) => {
  if (!value) return value
  try {
    if (value.startsWith('http://') || value.startsWith('https://')) return value
    return new URL(value, window.location.origin).href
  } catch {
    return value
  }
}

export const setMetaTags = ({ title, description, image, url, type = 'article' }: MetaInput) => {
  document.title = title
  const absImage = toAbsolute(image)
  const absUrl = toAbsolute(url)

  ensureTag('meta[name="description"]', () => {
    const m = document.createElement('meta')
    m.name = 'description'
    return m
  }, (el) => {
    ;(el as HTMLMetaElement).content = description
  })

  ensureTag('meta[property="og:title"]', () => {
    const m = document.createElement('meta')
    m.setAttribute('property', 'og:title')
    return m
  }, (el) => ((el as HTMLMetaElement).content = title))

  ensureTag('meta[property="og:description"]', () => {
    const m = document.createElement('meta')
    m.setAttribute('property', 'og:description')
    return m
  }, (el) => ((el as HTMLMetaElement).content = description))

  ensureTag('meta[property="og:type"]', () => {
    const m = document.createElement('meta')
    m.setAttribute('property', 'og:type')
    return m
  }, (el) => ((el as HTMLMetaElement).content = type))

  if (absImage) {
    ensureTag('meta[property="og:image"]', () => {
      const m = document.createElement('meta')
      m.setAttribute('property', 'og:image')
      return m
    }, (el) => ((el as HTMLMetaElement).content = absImage))
  }

  ensureTag('meta[name="twitter:card"]', () => {
    const m = document.createElement('meta')
    m.name = 'twitter:card'
    return m
  }, (el) => ((el as HTMLMetaElement).content = 'summary_large_image'))

  ensureTag('meta[name="twitter:title"]', () => {
    const m = document.createElement('meta')
    m.name = 'twitter:title'
    return m
  }, (el) => ((el as HTMLMetaElement).content = title))

  ensureTag('meta[name="twitter:description"]', () => {
    const m = document.createElement('meta')
    m.name = 'twitter:description'
    return m
  }, (el) => ((el as HTMLMetaElement).content = description))

  if (absImage) {
    ensureTag('meta[name="twitter:image"]', () => {
      const m = document.createElement('meta')
      m.name = 'twitter:image'
      return m
    }, (el) => ((el as HTMLMetaElement).content = absImage))
  }

  if (absUrl) {
    ensureTag('link[rel="canonical"]', () => {
      const l = document.createElement('link')
      l.rel = 'canonical'
      return l
    }, (el) => ((el as HTMLLinkElement).href = absUrl))
  }
}

export const injectJsonLd = (id: string, data: object) => {
  let script = document.getElementById(id) as HTMLScriptElement | null
  if (!script) {
    script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = id
    document.head.appendChild(script)
  }
  script.textContent = JSON.stringify(data)
}
