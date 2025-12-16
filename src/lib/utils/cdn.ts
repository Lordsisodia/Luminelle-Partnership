export const cdnUrl = (path: string) => {
  const base = import.meta.env.VITE_ASSET_BASE_URL
  const useCdn = (import.meta.env.VITE_USE_ASSET_CDN as any) === '1'

  // TEMP: The Supabase CDN bucket is missing the shower-cap spotlight image,
  // which breaks the landing page hero when `VITE_USE_ASSET_CDN=1` in prod.
  // Force this asset to load from the local `/public` folder instead of the CDN
  // until the bucket is populated. Keep the match flexible so resized variants
  // (e.g. page9-image-640.webp) also bypass the CDN.
  const cdnBypass = ['/uploads/luminele/page9-image', '/uploads/luminele/hero-desktop']
  if (cdnBypass.some((p) => path.includes(p))) return path

  // During local dev, prefer local public assets for curler previews
  if (import.meta.env.DEV && path.startsWith('/uploads/curler/')) return path
  if (!useCdn) return path
  if (!base) return path
  if (path.startsWith('http')) return path
  const slash = base.endsWith('/') ? '' : '/'
  return `${base}${slash}${path.replace(/^\//, '')}`
}
