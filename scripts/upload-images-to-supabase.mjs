import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
const { SUPABASE_SERVICE_ROLE_KEY, SUPABASE_BUCKET = 'public' } = process.env

if (!SUPABASE_SERVICE_ROLE_KEY || !SUPABASE_URL) {
  console.error('Missing SUPABASE_SERVICE_ROLE_KEY or SUPABASE_URL env vars.')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

const roots = ['public/uploads/luminele', 'public/images', 'public/reviews']
const exts = new Set(['.webp', '.avif', '.jpg', '.jpeg', '.png'])

const toContentType = (file) => {
  if (file.endsWith('.webp')) return 'image/webp'
  if (file.endsWith('.avif')) return 'image/avif'
  if (file.endsWith('.png')) return 'image/png'
  return 'image/jpeg'
}

const walk = (dir) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  return entries.flatMap((e) => {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) return walk(full)
    if (!exts.has(path.extname(e.name).toLowerCase())) return []
    return [full]
  })
}

const files = roots.flatMap((r) => (fs.existsSync(r) ? walk(r) : []))

const upload = async () => {
  for (const file of files) {
    const buf = fs.readFileSync(file)
    const rel = file.replace(/^public[\\/]/, '')
    const dest = rel
    const { error } = await supabase.storage.from(SUPABASE_BUCKET).upload(dest, buf, {
      upsert: true,
      contentType: toContentType(file),
      cacheControl: '31536000, immutable',
    })
    if (error) {
      console.error('Upload failed', file, error.message)
      process.exitCode = 1
    } else {
      console.log('Uploaded', dest)
    }
  }
}

upload()
