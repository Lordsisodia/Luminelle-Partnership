import { requireInternalAuth } from "../../../app/src/server/internalAuth";
import { getAdminToken, adminGraphQL } from "../_admin";
import { upsertCustomer } from "../../../app/src/server/customers";

export default async function handler(req: Request) {
  const auth = requireInternalAuth(req);
  if (!auth.ok) return new Response("Unauthorized", { status: 401 });
  const url = new URL(req.url);
  const shop = url.searchParams.get("shop");
  if (!shop) return new Response("Missing shop", { status: 400 });
  const token = await getAdminToken(shop);

  let cursor: string | null = null;
  let count = 0;
  // Paginate customers
  for (;;) {
    const data = await adminGraphQL<any>(
      shop,
      token,
      `#graphql
      query Customers($first:Int!, $after:String) {
        customers(first: $first, after: $after, sortKey: UPDATED_AT) {
          pageInfo { hasNextPage endCursor }
          edges { node {
            id
            email
            firstName
            lastName
            state
            tags
            createdAt
            updatedAt
            defaultAddress { address1 address2 city country code: countryCode phone province zip }
            addresses(first: 10) { edges { node { address1 address2 city country code: countryCode phone province zip } } }
          } }
        }
      }
      `,
      { first: 100, after: cursor },
    );
    const edges = data.customers.edges as any[];
    for (const { node } of edges) {
      const id = Number(String(node.id).split("/").pop());
      await upsertCustomer(shop, {
        id,
        email: node.email,
        first_name: node.firstName,
        last_name: node.lastName,
        state: node.state,
        tags: node.tags,
        created_at: node.createdAt,
        updated_at: node.updatedAt,
        default_address: node.defaultAddress,
        addresses: (node.addresses?.edges || []).map((e: any) => e.node),
      });
      count++;
    }
    if (!data.customers.pageInfo.hasNextPage) break;
    cursor = data.customers.pageInfo.endCursor;
  }
  return new Response(JSON.stringify({ ok: true, count }), { headers: { "content-type": "application/json" } });
}

