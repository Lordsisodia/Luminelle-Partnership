# Dashboard Template (Metabase/Notebook) — Optional

If we adopt the free-first hybrid (`hybrid-analytics-heatmaps-stack.md`), the default dashboard surface is usually **PostHog** (funnels/cohorts).

This file exists for the cases where we keep a SQL‑queryable audit trail in a database (Supabase or otherwise) and want Metabase/notebook cards.

## Cards
1) Conversion by variant
```sql
select experiment_key, variant,
       sum(purchases) as purchases,
       sum(exposures) as exposures,
       sum(purchases)::float / nullif(sum(exposures),0) as cr
from vw_experiment_conversions
where experiment_key = 'hero_cta_copy'
group by 1,2;
```

2) Add-to-cart & begin_checkout rates
```sql
select experiment_key, variant,
       sum(add_to_cart)::float / nullif(sum(exposures),0) as atc_rate,
       sum(begin_checkout)::float / nullif(sum(exposures),0) as checkout_rate
from vw_experiment_conversions
where experiment_key = 'hero_cta_copy'
group by 1,2;
```

3) Revenue per exposure
```sql
select experiment_key, variant,
       sum(revenue)::float / nullif(sum(exposures),0) as rpe
from vw_experiment_conversions
where experiment_key = 'hero_cta_copy'
group by 1,2;
```

4) SRM quick check
```sql
with splits as (
  select 'control' variant, 0.5 weight union all
  select 'bold', 0.5
)
select v.variant,
       count(*) as exposures,
       weight,
       (count(*)::float / sum(count(*)) over ()) as share
from experiment_exposures v
where v.experiment_key = 'hero_cta_copy'
group by v.variant, weight;
```

5) Heatmap bins

> ⚠️ Note (free-first hybrid): If we’re using Clarity/Hotjar for heatmaps, **do not** store raw click coordinates in our DB (storage grows too fast). Prefer the vendor heatmap UI.
>
> Only use the query below if we intentionally implement **sampled** click logging + retention limits (e.g., store 1% of clicks and delete after 30–90 days).

```sql
select page_path,
       floor((metadata->>'x')::float / 40) as bin_x,
       floor((metadata->>'y')::float / 40) as bin_y,
       count(*) as clicks
from events
where name = 'click'
  and page_path like '/%'
group by 1,2,3;
```

## Notes
- Parameterize `experiment_key` for reuse.
- Add confidence intervals in notebook layer (pandas/scipy) if Metabase lacks built-in.
- Join device/URL segments later when targeting is enabled.
