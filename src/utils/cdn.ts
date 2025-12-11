export const cdnUrl = (path: string) => {
  const base = import.meta.env.VITE_ASSET_BASE_URL
  if (!base) return path
  if (path.startsWith('http')) return path
  const slash = base.endsWith('/') ? '' : '/'
  return `${base}${slash}${path.replace(/^\//, '')}`
}
