export const cdnUrl = (path: string) => {
  const base = import.meta.env.VITE_ASSET_BASE_URL
  // During local dev, prefer local public assets for curler previews
  if (import.meta.env.DEV && path.startsWith('/uploads/curler/')) return path
  if (!base) return path
  if (path.startsWith('http')) return path
  const slash = base.endsWith('/') ? '' : '/'
  return `${base}${slash}${path.replace(/^\//, '')}`
}
