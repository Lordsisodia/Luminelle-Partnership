import { v2 as cloudinary } from 'cloudinary'
import fg from 'fast-glob'
import path from 'path'
import fetch from 'node-fetch'

const ROOT = 'public/uploads'
const API_BASE = process.env.API_BASE || 'http://localhost:5174'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

async function main() {
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_SECRET) {
    throw new Error('Set CLOUDINARY env vars before running')
  }

  const files = await fg(['**/*.{png,jpg,jpeg,webp,avif}'], { cwd: ROOT, absolute: true })
  for (const file of files) {
    const rel = path.relative(ROOT, file)
    const handle = rel.split(path.sep)[0]
    const publicId = `products/${handle}/${rel.replace(/\\/g, '/').replace(/\.[^.]+$/, '')}`
    const res = await cloudinary.uploader.upload(file, {
      folder: `products/${handle}`,
      public_id: publicId,
      overwrite: true,
      resource_type: 'image',
    })
    console.log('Uploaded', rel, '->', res.secure_url)

    try {
      await fetch(`${API_BASE}/api/admin/media/upsert`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_handle: handle,
          public_id: res.public_id,
          secure_url: res.secure_url,
          sort_order: 0,
          kind: 'image',
        }),
      })
    } catch (err) {
      console.warn('Upsert failed for', res.public_id, err)
    }
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
