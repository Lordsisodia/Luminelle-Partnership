# Merchant Center Free Listings Feed (Template)

Use this to submit a daily feed to Google Merchant Center for free listings. Replace sample values with live data.

## Format
- Recommended: Google Sheets or Scheduled Fetch (TSV/CSV). Below is a TSV snippet you can paste into Sheets.
- Fetch URL example: `https://lumelle.com/feeds/merchant-free.tsv` (host a static file on Vercel or Supabase storage).

## Required Attributes (per Google)
- `id`, `title`, `description`, `link`, `image_link`, `availability`, `price`, `condition`, `brand`, `gtin` (if available), `shipping`, `return_policy`

## Sample TSV (1 product)
```
id	title	description	link	image_link	availability	price	condition	brand	gtin	shipping	return_policy
lumelle-cap	Lumelle Satin-Lined Waterproof Shower Cap	Satin-lined, waterproof cap that blocks steam to keep silk presses, curls, and braids frizz-free.	https://lumelle.com/product/shower-cap	https://lumelle.com/uploads/luminele/hero-main-960.webp	in_stock	15.00 GBP	new	Lumelle		GB:::0.00 GBP	30 days, free return by mail
```
- `shipping` format: `country:region:service:price` (region/service optional). `GB:::0.00 GBP` = free shipping in GB.
- If price changes, keep feed synchronized to avoid disapprovals.

## Steps to launch
1) In Merchant Center > Products > Feeds > Add primary feed.
2) Target country: GB, language: en. Destination: Free listings.
3) Input method: Scheduled fetch; set daily; URL to hosted TSV (`https://lumelle.com/feeds/merchant-free.tsv`); encoding UTF-8.
4) Tax: not required for UK physical goods in feed (handled in MC settings).
5) Shipping/returns: also configure in MC Settings (Policies) to align with feed values.

## Daily refresh
- Automate generation: create a small script that pulls price/availability from Shopify and writes `merchant-free.tsv` to storage. Cron daily.

## Validation
- After first fetch, check Diagnostics > Free listings for errors (price mismatch, unavailable images).
- Keep image_link reachable (200 status; no query params preferred).
