
import https from 'https';

const domain = 'lumelle-3.myshopify.com';
const ACCESS_TOKEN = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN;

const query = `
{
  products(first: 10) {
    edges {
      node {
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
    'X-Shopify-Access-Token': ACCESS_TOKEN,
  },
};

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    if (res.statusCode !== 200) {
      console.error(`Error: Status Code ${res.statusCode}`);
      console.error(data);
      return;
    }

    try {
      const json = JSON.parse(data);
      if (json.errors) {
        console.error('GraphQL Errors:', JSON.stringify(json.errors, null, 2));
      } else {
        console.log('Products found:');
        json.data.products.edges.forEach((edge) => {
          const p = edge.node;
          const v = p.variants.edges[0]?.node;
          console.log(`\nProduct: ${p.title} (${p.handle})`);
          console.log(`Variant ID: ${v?.id}`);
          console.log(`Price: ${v?.price?.amount}`);
        });
      }
    } catch (e) {
      console.error('Error parsing JSON:', e);
      console.log('Raw data:', data);
    }
  });
});

req.on('error', (e) => {
  console.error('Request error:', e);
});

req.write(JSON.stringify({ query }));
req.end();
