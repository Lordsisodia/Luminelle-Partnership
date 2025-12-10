# Reviews OCR Helper

Drop your review screenshots into `reviews/input`, then run the extractor to pull the text into JSON/TXT files.

## Quick use
1. Install deps inside this folder (runs fast, ~50 MB):
   ```bash
   cd reviews
   npm install
   ```
2. Put images in `reviews/input` (PNG/JPG/JPEG/WEBP).
3. Run the extractor:
   ```bash
   npm run extract
   ```

## What you get
- `reviews/output/reviews.json` — array of `{ file, text, confidence }` per image.
- `reviews/output/<image-name>.txt` — raw text for each screenshot.

## Language tweaks
- Default OCR language: English (`eng`).
- Override with a flag: `npm run extract -- --lang=eng+spa`
- Or set env var: `REVIEW_LANG=eng+fra npm run extract`

## Troubleshooting
- If it says "No images found", double-check files are in `reviews/input` and not hidden by extensions.
- If accuracy is low, try larger/clearer images or add an extra language code via `--lang`.
