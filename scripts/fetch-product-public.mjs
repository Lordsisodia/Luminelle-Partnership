
import https from 'https';

const domain = 'lumelle-3.myshopify.com';
const token = '947d496da034c790f307d1d6ab8cb8de'; // Public Token

const query = `
{
  products(first: 5) {
    edges {
      node {
        id
        title
        handle
        variants(first: 1) {
          edges {
            node {
              id
              title
              price {
                amount
              }
            }
          }
        }
      }
    }
  }
}
`;

const options = {
  hostname: domain,
  path: '/api/2025-10/graphql.json',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': token,
  },
};

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log(`Status: ${res.statusCode}`);
    if (res.statusCode !== 200) {
      console.log('Body:', data);
    } else {
      try {
        const json = JSON.parse(data);
        console.log(JSON.stringify(json, null, 2));
      } catch (e) {
        console.log(data);
      }
    }
  });
});

req.on('error', (e) => {
  console.error('Error:', e);
});

req.write(JSON.stringify({ query }));
req.end();
