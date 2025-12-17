-- Store remaining small PDP labels that were still hard-coded in components.

insert into public.cms_globals(key, data)
values ('pdp_defaults', '{}'::jsonb)
on conflict (key) do nothing;

update public.cms_globals
set
  data = jsonb_set(
    data,
    '{priceBlock}',
    coalesce(data->'priceBlock', '{}'::jsonb) || jsonb_build_object(
      'quantityLabelTemplate', 'Quantity: {quantity}'
    ),
    true
  ),
  updated_at = now()
where key = 'pdp_defaults';

update public.cms_globals
set
  data = jsonb_set(
    data,
    '{careSection}',
    coalesce(data->'careSection', '{}'::jsonb) || jsonb_build_object(
      'defaultLabel', 'Care & materials'
    ),
    true
  ),
  updated_at = now()
where key = 'pdp_defaults';

