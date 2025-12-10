
import https from 'https';

const domain = 'lumelle-3.myshopify.com';
const token = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN; // Private Admin Token
const productId = '15488242581878';

const options = {
    hostname: domain,
    path: `/admin/api/2025-10/products/${productId}/variants.json`,
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': token,
    },
};

const req = https.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        if (res.statusCode !== 200) {
            console.log(`Error Status: ${res.statusCode}`);
            console.log(data);
            return;
        }

        try {
            const json = JSON.parse(data);
            if (json.variants && json.variants.length > 0) {
                console.log('Variant Found!');
                console.log(`Variant ID: ${json.variants[0].id}`);
                console.log(`Price: ${json.variants[0].price}`);
            } else {
                console.log('No variants found.');
            }
        } catch (e) {
            console.error('Error parsing JSON:', e);
        }
    });
});

req.on('error', (e) => {
    console.error('Request error:', e);
});

req.end();
