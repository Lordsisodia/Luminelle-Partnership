import { verifyWebhook } from "./_verify.js";
import { getPgPool } from "../../_lib/db.js";

import type { VercelRequest, VercelResponse } from '@vercel/node'

export const config = { api: { bodyParser: false } };

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== "POST") {
        return res.status(405).send("Method not allowed");
    }

    // Verify webhook signature
    // Note: We need to read the body as text for verification, then parse JSON
    // const rawBody = await req.text(); // No longer needed directly here, verifyWebhook handles it
    // const hmac = req.headers.get("X-Shopify-Hmac-Sha256"); // No longer needed directly here
    const secret = process.env.SHOPIFY_API_SECRET;

    if (!secret) {
        console.error("SHOPIFY_API_SECRET is not set");
        return res.status(500).send("Server Error");
    }

    const { valid, body, rawBody } = await verifyWebhook(req);
    if (!valid) {
        return res.status(401).send("Invalid HMAC");
    }

    const topic = (req.headers['x-shopify-topic'] || '') as string;
    const shop = (req.headers['x-shopify-shop-domain'] || body?.domain || body?.shop_domain) as string;

    console.log(`Received webhook ${topic} for ${shop}`);

    if (!rawBody) return res.status(400).send("Missing body");
    const product = JSON.parse(rawBody);
    const pool = getPgPool();

    // Map Shopify product to our schema
    // id is uuid in our DB, but Shopify ID is a number (e.g. 123456789)
    // We might need to store Shopify ID in a separate column or use a deterministic UUID based on Shopify ID
    // For now, let's assume we check if a product with this SKU exists, or we need to add a shopify_id column to products table.
    // The schema in Step 90 shows: id uuid primary key default gen_random_uuid(), sku text unique not null.
    // It doesn't have shopify_id.
    // We should probably use SKU as the key if it's unique and consistent.

    const sku = product.variants?.[0]?.sku || `SHOPIFY-${product.id}`;
    const price = product.variants?.[0]?.price || 0;
    const imageUrl = product.image?.src || product.images?.[0]?.src || null;

    try {
        await pool.query(
            `INSERT INTO products (sku, title, description, price, image_url, tags, is_active, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
       ON CONFLICT (sku) DO UPDATE SET
         title = EXCLUDED.title,
         description = EXCLUDED.description,
         price = EXCLUDED.price,
         image_url = EXCLUDED.image_url,
         tags = EXCLUDED.tags,
         is_active = EXCLUDED.is_active,
         updated_at = NOW()`,
            [
                sku,
                product.title,
                product.body_html,
                price,
                imageUrl,
                product.tags ? product.tags.split(",").map((t: string) => t.trim()) : [],
                product.status === "active",
            ]
        );
        return res.status(200).send("OK");
    } catch (e) {
        console.error("Error syncing product:", e);
        return res.status(500).send("Internal Server Error");
    }
}
