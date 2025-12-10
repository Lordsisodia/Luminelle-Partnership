import { getPgPool } from "../../app/src/server/db";

export default async function handler(_req: Request) {
  const pool = getPgPool();
  const { rows: firstOrder } = await pool.query(
    `select lower(email) as email, min(coalesce(processed_at, created_at)) as first_order
       from "ShopOrders"
      where email is not null and email <> ''
      group by 1`,
  );
  const firstOrderMap = new Map<string, Date>(firstOrder.map((r) => [r.email, new Date(r.first_order)]));

  const { rows: last90 } = await pool.query(
    `select lower(email) as email, count(*)::int as orders
       from "ShopOrders"
      where coalesce(processed_at, created_at) >= now() - interval '90 days'
        and email is not null and email <> ''
      group by 1`,
  );
  let repeat = 0, total = 0;
  for (const r of last90) {
    total += 1;
    if ((r.orders as number) > 1) repeat += 1;
  }

  // monthly cohort of first order count (last 6 months)
  const { rows: cohorts } = await pool.query(
    `select to_char(date_trunc('month', first)::date, 'YYYY-MM') as cohort, count(*)::int as customers
       from (select min(coalesce(processed_at, created_at)) as first from "ShopOrders" where email is not null group by lower(email)) t(first)
      where first >= date_trunc('month', now()) - interval '6 months'
      group by 1 order by 1 asc`,
  );

  return new Response(
    JSON.stringify({ repeatRate90: total ? repeat / total : 0, cohorts }),
    { headers: { 'content-type': 'application/json' } },
  );
}

