import { createHmac, timingSafeEqual } from "crypto";
import type { VercelRequest } from '@vercel/node';

export async function verifyWebhook(req: VercelRequest, secret = process.env.SHOPIFY_WEBHOOK_SECRET || process.env.SHOPIFY_API_SECRET || "") {
  const hmacHeader = (req.headers["x-shopify-hmac-sha256"] || "") as string;
  if (!hmacHeader) return { valid: false, body: null, rawBody: null };

  // We need to collect chunks.
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  const rawBuffer = Buffer.concat(chunks);
  const rawBodyStr = rawBuffer.toString('utf8');

  const generatedHash = createHmac("sha256", secret)
    .update(rawBodyStr, "utf8")
    .digest("base64");

  let valid = false;
  try {
    valid = timingSafeEqual(Buffer.from(generatedHash), Buffer.from(hmacHeader));
  } catch (e) {
    valid = false;
  }

  let body = null;
  if (valid) {
    try {
      body = JSON.parse(rawBodyStr);
    } catch (e) {
      console.error("Failed to parse webhook body", e);
    }
  }

  return { valid, body, rawBody: rawBodyStr };
}

