type RobotsValue = 'noindex' | 'noindex,nofollow'

function ensureRobotsMeta(): HTMLMetaElement | null {
  if (typeof document === 'undefined') return null
  const existing = document.querySelector('meta[name="robots"]')
  if (existing && existing instanceof HTMLMetaElement) return existing
  const meta = document.createElement('meta')
  meta.setAttribute('name', 'robots')
  document.head.appendChild(meta)
  return meta
}

function setRobots(content: RobotsValue) {
  const meta = ensureRobotsMeta()
  if (!meta) return
  meta.setAttribute('content', content)
}

export function setNoIndex() {
  setRobots('noindex')
}

export function setNoIndexNoFollow() {
  setRobots('noindex,nofollow')
}

