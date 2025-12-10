import crypto from 'crypto';
// Using global fetch (Node 18+)

const secret = process.env.SHOPIFY_API_SECRET;
const appUrl = process.env.APP_URL || 'http://localhost:3000';

if (!secret) {
    console.error('Error: SHOPIFY_API_SECRET is not set.');
    console.error('Usage: SHOPIFY_API_SECRET=your_secret node scripts/test-webhook.mjs');
    process.exit(1);
}

const payload = JSON.stringify({
    id: 123456789,
    title: "Test Product from Script",
    body_html: "<strong>Good snowboard!</strong>",
    vendor: "Burton",
    product_type: "Snowboard",
    created_at: new Date().toISOString(),
    handle: "test-product-script",
    updated_at: new Date().toISOString(),
    published_at: new Date().toISOString(),
    template_suffix: null,
    status: "active",
    published_scope: "web",
    tags: "Snowboard, Winter, Sports",
    admin_graphql_api_id: "gid://shopify/Product/123456789",
    variants: [
        {
            id: 987654321,
            product_id: 123456789,
            title: "Default Title",
            price: "199.00",
            sku: "TEST-SKU-001",
            position: 1,
            inventory_policy: "deny",
            compare_at_price: null,
            fulfillment_service: "manual",
            inventory_management: null,
            option1: "Default Title",
            option2: null,
            option3: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            taxable: true,
            barcode: null,
            grams: 2000,
            image_id: null,
            weight: 2.0,
            weight_unit: "kg",
            inventory_item_id: 456789123,
            quantity: 1,
            old_inventory_quantity: 1,
            requires_shipping: true,
            admin_graphql_api_id: "gid://shopify/ProductVariant/987654321"
        }
    ],
    options: [
        {
            id: 54321,
            product_id: 123456789,
            name: "Title",
            position: 1,
            values: ["Default Title"]
        }
    ],
    images: [],
    image: null
});

const hmac = crypto.createHmac('sha256', secret).update(payload).digest('base64');

console.log(`Sending webhook to ${appUrl}/api/shopify/webhooks/products_create...`);

async function sendWebhook() {
    try {
        const res = await fetch(`${appUrl}/api/shopify/webhooks/products_create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Topic': 'products/create',
                'X-Shopify-Shop-Domain': 'test-store.myshopify.com',
                'X-Shopify-Hmac-Sha256': hmac,
                'X-Shopify-API-Version': '2024-01'
            },
            body: payload
        });

        console.log(`Response: ${res.status} ${res.statusText}`);
        const text = await res.text();
        console.log('Body:', text);
    } catch (err) {
        console.error('Failed to send webhook:', err);
    }
}

sendWebhook();
