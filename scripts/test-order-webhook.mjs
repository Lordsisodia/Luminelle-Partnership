import crypto from 'crypto';
// Test script for orders/create webhook with CAPI

const secret = process.env.SHOPIFY_API_SECRET;
const appUrl = process.env.APP_URL || process.env.SHOPIFY_APP_URL || 'http://localhost:3000';

if (!secret) {
    console.error('Error: SHOPIFY_API_SECRET is not set.');
    console.error('Usage: SHOPIFY_API_SECRET=your_secret node scripts/test-order-webhook.mjs');
    process.exit(1);
}

const orderPayload = {
    id: 1234567890,
    name: "#1001",
    email: "test@example.com",
    phone: "+441234567890",
    total_price: "59.99",
    currency: "GBP",
    processed_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    line_items: [
        {
            id: 111111111,
            variant_id: 56829020504438,
            product_id: 123456789,
            title: "Lumelle Shower Cap",
            quantity: 2,
            price: "24.99",
            sku: "LUM-CAP-001"
        }
    ],
    note_attributes: [
        { name: "lumelle_anon_id", value: "anon_123456789" },
        { name: "meta_fbp", value: "fb.1.1704067200.1234567890" },
        { name: "meta_fbc", value: "fb.1.1704067200.abcd1234" }
    ]
};

const payload = JSON.stringify(orderPayload);
const hmac = crypto.createHmac('sha256', secret).update(payload).digest('base64');

console.log(`Sending orders/create webhook to ${appUrl}/api/shopify/webhooks/orders-create...`);
console.log('Payload:', JSON.stringify(orderPayload, null, 2));
console.log('---');

async function sendWebhook() {
    try {
        const res = await fetch(`${appUrl}/api/shopify/webhooks/orders-create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Topic': 'orders/create',
                'X-Shopify-Shop-Domain': 'lumelle-3.myshopify.com',
                'X-Shopify-Hmac-Sha256': hmac,
                'X-Shopify-API-Version': '2024-01',
                'X-Shopify-Delivery-Id': `test_${Date.now()}`
            },
            body: payload
        });

        console.log(`Response: ${res.status} ${res.statusText}`);
        const text = await res.text();
        console.log('Body:', text);

        if (res.ok) {
            console.log('\n✅ Webhook test successful!');
            console.log('Check your server logs to see if CAPI Purchase event was sent.');
        } else {
            console.log('\n❌ Webhook test failed');
        }
    } catch (err) {
        console.error('Failed to send webhook:', err);
    }
}

sendWebhook();
