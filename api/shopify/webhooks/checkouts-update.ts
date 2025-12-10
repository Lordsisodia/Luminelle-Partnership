import type { VercelRequest, VercelResponse } from '@vercel/node'
import { verifyWebhook } from './_verify'
import { upsertCheckout } from '../../../app/src/server/checkouts'

export const config = { api: { bodyParser: false } };

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed')
    }

    const { valid, body } = await verifyWebhook(req)
    if (!valid) {
        return res.status(401).send('Invalid HMAC')
    }

    console.log('Received Shopify Checkout Update Webhook')
    try {
        await upsertCheckout(body)
        return res.status(200).send('OK')
    } catch (error) {
        console.error('Error processing checkout webhook:', error)
        return res.status(500).send('Error')
    }
}
