import { verifyWebhook } from "./_verify.js";
import { upsertShopOrder } from "../../_lib/shopOrders.js";
import { renderOrderEmail, sendOrderConfirmation } from "../../_lib/email.js";
import { isProcessed, markProcessed } from "../../_lib/webhooks.js";
import { capturePosthogEvent } from "../../_lib/posthog.js";
import { sendCAPIPurchaseFromWebhook } from "../../_lib/meta-capi.js";

import type { VercelRequest, VercelResponse } from '@vercel/node'

export const config = { api: { bodyParser: false } };

function extractNoteAttributes(body: any): Record<string, string> {
  const attrs: Record<string, string> = {}
  const raw = body?.note_attributes
  if (!Array.isArray(raw)) return attrs
  for (const item of raw) {
    const key = (item?.name || item?.key || item?.Name || item?.Key) as string | undefined
    const value = (item?.value || item?.Value) as string | undefined
    if (!key || typeof value !== 'string' || !value) continue
    attrs[String(key)] = value
  }
  return attrs
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { valid, body } = await verifyWebhook(req);
  if (!valid) return res.status(401).send("Invalid HMAC");
  const deliveryId = (req.headers['x-shopify-delivery-id'] || '') as string
  if (deliveryId && (await isProcessed(deliveryId))) return res.status(200).send('OK')
  const shop = (req.headers['x-shopify-shop-domain'] || body?.shop_domain || body?.domain) as string
  if (!shop) return res.status(400).send("Missing shop");
  await upsertShopOrder(shop, body);

  // Capture a server-side purchase event (joins back to the browser via cart/order attributes)
  try {
    const attrs = extractNoteAttributes(body)
    const distinctId = attrs.ph_distinct_id || attrs.lumelle_anon_id
    if (distinctId) {
      const expProps: Record<string, string> = {}
      for (const [k, v] of Object.entries(attrs)) {
        if (k.startsWith('exp_') && v) expProps[k] = v
      }

      await capturePosthogEvent({
        distinctId,
        event: 'purchase',
        properties: {
          source: 'shopify_webhook',
          // Keep server-side events anonymous by default (avoids creating person profiles for every order).
          $process_person_profile: false,
          shopify_delivery_id: deliveryId || undefined,
          shop,
          order_id: body?.id,
          order_name: body?.name,
          value: Number(body?.total_price || 0),
          currency: body?.currency || body?.presentment_currency,
          lumelle_anon_id: attrs.lumelle_anon_id,
          lumelle_session_id: attrs.lumelle_session_id,
          ...expProps,
        },
        timestamp: body?.processed_at || body?.created_at || undefined,
      })
    }
  } catch (e) {
    console.error('PostHog purchase capture failed', e)
  }

  // Send CAPI Purchase event for Meta attribution
  try {
    const attrs = extractNoteAttributes(body)
    console.log('[Webhook] Extracted note_attributes:', attrs)
    console.log('[Webhook] Meta cookies found:', { fbp: attrs.meta_fbp, fbc: attrs.meta_fbc })

    await sendCAPIPurchaseFromWebhook({
      orderId: body?.name || String(body?.id),
      value: Number(body?.total_price || 0),
      currency: body?.currency || body?.presentment_currency || 'GBP',
      lineItems: body?.line_items || [],
      fbp: attrs.meta_fbp,
      fbc: attrs.meta_fbc,
      email: body?.email,
      phone: body?.phone,
    })
  } catch (e) {
    console.error('[Webhook] Meta CAPI purchase capture failed', e)
  }

  // Optional email confirmation via Resend if enabled and we have an email
  try {
    if (process.env.EMAIL_SEND === '1' && body?.email) {
      const items = (Array.isArray(body?.line_items) ? body.line_items : []).map((it: any) => ({
        title: it.title,
        qty: Number(it.quantity || 1),
        price: Number(it.price || 0),
      }))
      const total = Number(body?.total_price || 0)
      const html = renderOrderEmail({ orderName: body?.name || String(body?.id), items, total })
      await sendOrderConfirmation(body.email, `Order ${body?.name || body?.id} confirmed`, html)
    }
  } catch (e) {
    console.error('Order email failed', e)
  }
  if (deliveryId) await markProcessed(deliveryId)
  return res.status(200).send("OK");
}
