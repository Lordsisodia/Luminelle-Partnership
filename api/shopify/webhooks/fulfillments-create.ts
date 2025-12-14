import { verifyWebhook } from "./_verify.js";
import { getPgPool } from "../../_lib/db.js";
import { renderShipmentEmail, sendOrderConfirmation } from "../../_lib/email.js";
import { isProcessed, markProcessed } from "../../_lib/webhooks.js";

import type { VercelRequest, VercelResponse } from '@vercel/node'

export const config = { api: { bodyParser: false } };

function extractNoteAttributes(raw: any): Record<string, string> {
  const attrs: Record<string, string> = {}
  const notes = raw?.note_attributes
  if (!Array.isArray(notes)) return attrs
  for (const item of notes) {
    const key = (item?.name || item?.key || item?.Name || item?.Key) as string | undefined
    const value = (item?.value || item?.Value) as string | undefined
    if (!key || typeof value !== 'string' || !value) continue
    attrs[String(key)] = value
  }
  return attrs
}

function toOrderId(value: unknown): string | null {
  if (typeof value === 'number' && Number.isFinite(value)) return String(Math.trunc(value))
  if (typeof value === 'string' && value.trim()) return value.trim()
  return null
}

function toNumber(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string' && value.trim()) {
    const n = Number(value)
    return Number.isFinite(n) ? n : null
  }
  return null
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { valid, body } = await verifyWebhook(req);
  if (!valid) return res.status(401).send("Invalid HMAC");
  const deliveryId = (req.headers['x-shopify-delivery-id'] || '') as string
  const deliveryAlreadyProcessed = deliveryId ? await isProcessed(deliveryId) : false
  const shop = (req.headers['x-shopify-shop-domain'] || body?.domain || body?.shop_domain) as string
  if (!shop) return res.status(400).send("Missing shop");
  // Fulfillment logic here

  const orderId = toOrderId(body?.order_id);
  if (!orderId) return res.status(400).send("Missing order_id");
  const status = body?.status || 'success';
  const trackingNumber = body?.tracking_number || null;
  const trackingCompany = body?.tracking_company || null;
  const trackingUrl = body?.tracking_url || null;

  const pool = getPgPool();
  if (!deliveryAlreadyProcessed) {
    await pool.query(
      `UPDATE "ShopOrders" SET fulfillment_status = $1, updated_at = now(), raw = coalesce(raw, '{}'::jsonb) || $2::jsonb WHERE shop = $3 AND order_id = $4`,
      [
        status === 'success' ? 'fulfilled' : status,
        JSON.stringify({ tracking_company: trackingCompany, tracking_number: trackingNumber, tracking_url: trackingUrl }),
        shop,
        orderId,
      ]
    );

    // Optional: send shipment email if enabled
    try {
      if (process.env.EMAIL_SEND === '1') {
        const { rows } = await pool.query('SELECT email, name, total FROM "ShopOrders" WHERE shop=$1 AND order_id=$2 LIMIT 1', [shop, orderId])
        const rec = rows[0]
        if (rec?.email) {
          const html = renderShipmentEmail({ orderName: rec.name || '#' + orderId, trackingCompany, trackingNumber, trackingUrl, total: Number(rec.total || 0) })
          await sendOrderConfirmation(rec.email, `Your order ${rec.name || '#' + orderId} has shipped`, html)
        }
      }
    } catch (e) {
      console.error('Shipment email failed', e)
    }

    if (deliveryId) await markProcessed(deliveryId)
  }

  // Loyalty points award: 50 points per £1 (subtotal), awarded on fulfillment.
  // Only awards if the order contains `lumelle_user_id` in note_attributes.
  const awardKey = `loyalty:award:fulfillment:${shop}:${orderId}`
  try {
    if (!(await isProcessed(awardKey))) {
      const { rows } = await pool.query(
        'SELECT email, currency, subtotal, raw FROM "ShopOrders" WHERE shop=$1 AND order_id=$2 LIMIT 1',
        [shop, orderId]
      )
      const order = rows[0]
      if (!order) throw new Error('Order not found in ShopOrders')
      const attrs = extractNoteAttributes(order?.raw)
      const userId = attrs.lumelle_user_id || attrs.clerk_user_id || null

      const subtotal = toNumber(order?.subtotal ?? order?.raw?.subtotal_price ?? order?.raw?.subtotal_price_set?.shop_money?.amount)
      const pointsPerGbp = Number(process.env.LOYALTY_POINTS_PER_GBP || 50)
      const points = subtotal && pointsPerGbp > 0 ? Math.max(0, Math.floor(subtotal * pointsPerGbp)) : 0

      if (userId && points > 0) {
        // Ensure FK exists (webhook may arrive before user sync completes).
        await pool.query(
          'INSERT INTO public.customers (id, email, updated_at, raw) VALUES ($1,$2,now(),$3::jsonb) ON CONFLICT (id) DO NOTHING',
          [userId, order?.email ?? attrs.lumelle_user_email ?? null, JSON.stringify({ source: 'shopify_webhook' })],
        )

        await pool.query(
          'INSERT INTO public.loyalty_points_ledger (user_id, points, source, meta) VALUES ($1,$2,$3,$4::jsonb)',
          [
            userId,
            points,
            `shopify:fulfillment:${shop}:${orderId}`,
            JSON.stringify({
              shop,
              order_id: orderId,
              currency: order?.currency ?? order?.raw?.currency ?? null,
              subtotal: subtotal ?? null,
              reason: 'order_fulfilled',
              shopify_delivery_id: deliveryId || null,
            }),
          ],
        )
      }

      await markProcessed(awardKey)
    }
  } catch (e) {
    console.error('Failed to award loyalty points', e)
    // Let Shopify retry if needed (awardKey is idempotent, and deliveryId is already marked)
    return res.status(500).send('Failed')
  }
  return res.status(200).send("OK");
}
