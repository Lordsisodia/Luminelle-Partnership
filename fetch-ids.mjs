import https from 'https';

const query = `
query {
  products(first: 10) {
    edges {
      node {
        id
        handle
        title
        variants(first: 1) {
          edges {
            node {
              id
            }
          }
        }
      }
    }
  }
}
`;

const data = JSON.stringify({ query });

const options = {
    hostname: 'lumelle-3.myshopify.com',
    path: '/api/2025-10/graphql.json',
    method: 'POST',
    headers: {
        'X-Shopify-Storefront-Access-Token': '947d496da034c790f307d1d6ab8cb8de',
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = https.request(options, (res) => {
    let chunks = '';

    res.on('data', (d) => {
        chunks += d;
    });

    res.on('end', () => {
        console.log('Response:', chunks);
    });
});

req.on('error', (error) => {
    console.error('Error:', error);
});

req.write(data);
req.end();
