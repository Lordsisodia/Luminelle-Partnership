import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const projectRoot = process.cwd()

const POSTS = [
  {
    slug: 'how-to-stop-frizz-in-the-shower',
    src: 'public/uploads/luminele/steam-shield-new.webp',
  },
  {
    slug: 'is-satin-good-for-your-hair',
    src: 'public/uploads/curler/2.webp',
  },
  {
    slug: 'do-shower-caps-really-protect-hair',
    src: 'public/uploads/luminele/hero-desktop.webp',
  },
  {
    slug: 'how-to-protect-hair-while-sleeping',
    src: 'public/uploads/curler/4.webp',
  },
  {
    slug: 'do-heatless-curlers-work',
    src: 'public/uploads/curler/1.webp',
  },
  {
    slug: 'satin-vs-silk-for-hair',
    src: 'public/images/brand-lifestyle.jpg',
  },
  {
    slug: 'best-shower-cap-for-frizz-prone-hair',
    src: 'public/uploads/luminele/product-main.webp',
  },
  {
    slug: 'how-to-make-heatless-curls-last-longer',
    src: 'public/uploads/curler/6.webp',
  },
  {
    slug: 'how-to-protect-a-blow-dry-in-the-shower',
    src: 'public/uploads/luminele/product-feature-01.webp',
  },
  {
    slug: 'how-to-reduce-frizz-without-heat',
    src: 'public/images/hero.jpg',
  },
]

const OUT_COVERS_DIR = 'public/uploads/blog/covers'
const OUT_OG_DIR = 'public/og/blog'

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true })
}

async function main() {
  await ensureDir(OUT_COVERS_DIR)
  await ensureDir(OUT_OG_DIR)

  const tasks = POSTS.map(async ({ slug, src }) => {
    const absSrc = path.join(projectRoot, src)
    const coverOut = path.join(projectRoot, OUT_COVERS_DIR, `${slug}.webp`)
    const ogOut = path.join(projectRoot, OUT_OG_DIR, `${slug}.png`)

    const image = sharp(absSrc, { failOn: 'none' })

    await image
      .clone()
      .resize(1200, 800, { fit: 'cover', position: 'attention' })
      .webp({ quality: 82 })
      .toFile(coverOut)

    await image
      .clone()
      .resize(1200, 630, { fit: 'cover', position: 'attention' })
      .png({ compressionLevel: 9 })
      .toFile(ogOut)
  })

  await Promise.all(tasks)

  // eslint-disable-next-line no-console
  console.log(`Generated ${POSTS.length} covers -> ${OUT_COVERS_DIR}`)
  // eslint-disable-next-line no-console
  console.log(`Generated ${POSTS.length} og images -> ${OUT_OG_DIR}`)
}

await main()

