import dotenv from 'dotenv';
dotenv.config({ path: 'app/.env' });
import fs from 'fs';
import path from 'path';

const SHOPIFY_API_VERSION = process.env.SHOPIFY_API_VERSION || '2025-10';
const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const ACCESS_TOKEN = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN;
const APP_URL = process.env.APP_URL; // We will use the tunnel URL here

if (!SHOPIFY_STORE_DOMAIN) {
    console.error('Error: SHOPIFY_STORE_DOMAIN is missing in .env');
    process.exit(1);
}

if (!ACCESS_TOKEN) {
    console.error('Error: SHOPIFY_ADMIN_API_ACCESS_TOKEN is missing in .env');
    console.error('Please get your Admin API Access Token (starts with shpat_) from the App settings in Shopify Admin.');
    process.exit(1);
}

if (!APP_URL) {
    console.error('Error: APP_URL is missing in .env');
    console.error('Please set APP_URL to your tunnel URL (e.g. https://xyz.trycloudflare.com)');
    process.exit(1);
}

const WEBHOOKS = [
    { topic: 'orders/create', address: `${APP_URL}/api/shopify/webhooks/orders-create` },
    { topic: 'orders/updated', address: `${APP_URL}/api/shopify/webhooks/orders-updated` },
    { topic: 'checkouts/create', address: `${APP_URL}/api/shopify/webhooks/checkouts-create` },
    { topic: 'checkouts/update', address: `${APP_URL}/api/shopify/webhooks/checkouts-update` },
    { topic: 'customers/create', address: `${APP_URL}/api/shopify/webhooks/customers-create` },
    { topic: 'customers/update', address: `${APP_URL}/api/shopify/webhooks/customers-update` },
    { topic: 'customers/delete', address: `${APP_URL}/api/shopify/webhooks/customers-delete` },
    { topic: 'fulfillments/create', address: `${APP_URL}/api/shopify/webhooks/fulfillments-create` },
];

async function registerWebhook(topic, address) {
    console.log(`Registering ${topic} to ${address}...`);

    const response = await fetch(`https://${SHOPIFY_STORE_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}/webhooks.json`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': ACCESS_TOKEN,
        },
        body: JSON.stringify({
            webhook: {
                topic,
                address,
                format: 'json',
            },
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        // Check if it's just "address already taken" which is fine
        if (data.errors && data.errors.address && data.errors.address.includes('for this topic has already been taken')) {
            console.log(`✅ ${topic} already registered to this address.`);
            return;
        }
        console.error(`❌ Failed to register ${topic}:`, JSON.stringify(data.errors, null, 2));
    } else {
        console.log(`✅ ${topic} registered successfully!`);
    }
}

async function main() {
    console.log(`Target Store: ${SHOPIFY_STORE_DOMAIN}`);
    console.log(`Target URL: ${APP_URL}`);
    console.log('---');

    for (const webhook of WEBHOOKS) {
        await registerWebhook(webhook.topic, webhook.address);
    }
}

main();
