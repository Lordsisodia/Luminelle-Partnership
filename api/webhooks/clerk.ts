import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Webhook } from 'svix'
import { upsertCustomer } from '../_lib/customers'

export const config = { api: { bodyParser: false } };

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed')
    }

    const secret = process.env.CLERK_WEBHOOK_SECRET
    if (!secret) {
        console.error('Missing CLERK_WEBHOOK_SECRET')
        return res.status(500).send('Missing Secret')
    }

    // Read raw body
    const chunks = [];
    for await (const chunk of req) {
        chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    }
    const rawBody = Buffer.concat(chunks);
    const rawBodyStr = rawBody.toString('utf8');

    const wh = new Webhook(secret)
    let evt: any

    try {
        evt = wh.verify(rawBodyStr, req.headers as any)
    } catch (err) {
        console.error('Clerk webhook verification failed:', err)
        return res.status(400).send('Verification failed')
    }

    if (evt.type === 'user.created' || evt.type === 'user.updated') {
        const { id, email_addresses, first_name, last_name, image_url } = evt.data
        const email = email_addresses[0]?.email_address

        try {
            await upsertCustomer('clerk', {
                id: id,
                email,
                first_name,
                last_name,
                image_url
            })
        } catch (e) {
            console.error('Failed to save Clerk user', e)
        }
    }

    return res.status(200).send('OK')
}
