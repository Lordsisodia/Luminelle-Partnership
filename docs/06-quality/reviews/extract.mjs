import { createWorker } from 'tesseract.js';
import { glob } from 'glob';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_DIR = path.resolve(__dirname, 'input');
const OUTPUT_DIR = path.resolve(__dirname, 'output');
const LANG = (process.argv.find((arg) => arg.startsWith('--lang='))?.split('=')[1]
  ?? process.env.REVIEW_LANG
  ?? 'eng');

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function main() {
  await ensureDir(INPUT_DIR);
  await ensureDir(OUTPUT_DIR);

  const files = await glob('*.{png,jpg,jpeg,webp}', { cwd: INPUT_DIR, nocase: true });
  if (!files.length) {
    console.log('No images found in reviews/input. Add screenshots and re-run.');
    return;
  }

  console.log(`Using language(s): ${LANG}`);
  const worker = await createWorker(LANG);
  const results = [];

  for (const file of files) {
    const absPath = path.join(INPUT_DIR, file);
    console.log(`Processing ${file}...`);
    const { data } = await worker.recognize(absPath);
    const text = (data.text || '').trim();
    results.push({ file, text, confidence: data.confidence });

    const txtOut = path.join(OUTPUT_DIR, `${path.parse(file).name}.txt`);
    await fs.writeFile(txtOut, text, 'utf8');
  }

  await worker.terminate();

  const jsonOut = path.join(OUTPUT_DIR, 'reviews.json');
  await fs.writeFile(jsonOut, JSON.stringify(results, null, 2), 'utf8');
  console.log(`Saved ${results.length} review(s) to ${jsonOut}`);
}

main().catch((err) => {
  console.error('Failed to extract reviews:', err);
  process.exit(1);
});
