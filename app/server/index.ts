import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { config } from 'dotenv'
import { upsertOrder } from '../src/server/orders'
import { upsertCheckout } from '../src/server/checkouts'
import { upsertCustomer } from '../src/server/customers'
import { Webhook } from 'svix'

config() // Load .env

const app = express()
const PORT = 3000

app.use(cors())

// Shopify Webhooks (HMAC verification would go here, skipping for MVP local dev)
app.post('/api/webhooks/shopify/orders', bodyParser.json(), async (req, res) => {
    console.log('Received Shopify Order Webhook')
    try {
        await upsertOrder(req.body)
        res.status(200).send('OK')
    } catch (error) {
        console.error('Error processing order webhook:', error)
        res.status(500).send('Error')
    }
})

app.post('/api/webhooks/shopify/checkouts', bodyParser.json(), async (req, res) => {
    console.log('Received Shopify Checkout Webhook')
    try {
        await upsertCheckout(req.body)
        res.status(200).send('OK')
    } catch (error) {
        console.error('Error processing checkout webhook:', error)
        res.status(500).send('Error')
    }
})

// Clerk Webhooks
app.post('/api/webhooks/clerk', bodyParser.raw({ type: 'application/json' }), async (req, res) => {
    console.log('Received Clerk Webhook')
    const payload = req.body
    const headers = req.headers
    const secret = process.env.CLERK_WEBHOOK_SECRET

    if (!secret) {
        console.error('Missing CLERK_WEBHOOK_SECRET')
        return res.status(500).send('Missing Secret')
    }

    const wh = new Webhook(secret)
    let evt: any

    try {
        evt = wh.verify(payload, headers as any)
    } catch (err) {
        console.error('Clerk webhook verification failed:', err)
        return res.status(400).send('Verification failed')
    }

    if (evt.type === 'user.created' || evt.type === 'user.updated') {
        const { id, email_addresses, first_name, last_name, image_url } = evt.data
        const email = email_addresses[0]?.email_address

        // Map to existing customers table structure (from src/server/customers.ts)
        // Note: We are reusing the ShopCustomers logic but adapting it.
        // Ideally we should have a dedicated users table logic, but for now we reuse.
        // We pass 'clerk' as the shop name to distinguish.
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

    res.status(200).send('OK')
})

app.listen(PORT, () => {
    console.log(`Webhook server running on http://localhost:${PORT}`)
})
