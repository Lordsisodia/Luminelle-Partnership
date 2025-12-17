-- Store Spin Wheel (welcome wheel) copy in Supabase so PDP has zero hard-coded strings
-- (excluding top nav + footer, per request).
--
-- We keep this inside `cms_globals.key = 'pdp_defaults'` so the admin UI can edit it
-- as part of the Product Page "globals".

insert into public.cms_globals(key, data)
values ('pdp_defaults', '{}'::jsonb)
on conflict (key) do nothing;

update public.cms_globals
set
  data = jsonb_set(
    data,
    '{spinWheel}',
    coalesce(data->'spinWheel', '{}'::jsonb) || jsonb_build_object(
      'discountCode', 'LUMELLE10',
      'minSpendGbp', 20,
      'prizes', jsonb_build_array(
        jsonb_build_object('label', 'Get 5% off', 'helper', 'Any pack', 'color', '#F9A58A'),
        jsonb_build_object('label', 'Get 10% off', 'helper', 'Any pack', 'color', '#F4C7B7'),
        jsonb_build_object('label', 'Free shipping', 'helper', 'UK & EU', 'color', '#FDD9C3'),
        jsonb_build_object('label', 'Get a free cap', 'helper', 'Lucky you', 'color', '#F7B8A0'),
        jsonb_build_object('label', 'Get 5% off', 'helper', 'Any pack', 'color', '#F9A58A'),
        jsonb_build_object('label', '10% + free shipping', 'helper', 'Best value', 'color', '#F7B8A0'),
        jsonb_build_object('label', 'Free shipping', 'helper', 'UK & EU', 'color', '#FDD9C3'),
        jsonb_build_object('label', 'Get a free cap', 'helper', 'Lucky you', 'color', '#F7B8A0')
      ),
      'guaranteedAward', jsonb_build_object(
        'label', '10% + free shipping',
        'helper', 'Best value',
        'color', '#F7B8A0'
      ),
      'wheel', jsonb_build_object(
        'srOnlyCenterLabel', 'Spin'
      ),
      'cta', jsonb_build_object(
        'spin', 'Spin the wheel',
        'spinning', 'Spinning…',
        'loading', 'Loading…'
      ),
      'helperCopy', jsonb_build_object(
        'signedOut', 'You can preview the wheel now. Sign in to claim the welcome deal (1 per account).',
        'signedInTemplate', 'Welcome deal unlocks once per account. Applies on orders over £{minSpend}+.'
      ),
      'result', jsonb_build_object(
        'titleClaimed', 'Welcome deal unlocked!',
        'titleUnclaimed', 'You unlocked a welcome deal!',
        'codeLineTemplate', 'Code {discountCode} • 10% off (min £{minSpend}+)',
        'signInCta', 'Sign in to claim',
        'applyCta', jsonb_build_object(
          'idle', 'Apply to cart',
          'saved', 'Saved — add to cart',
          'applied', 'Applied to cart',
          'claiming', 'Claiming…'
        )
      )
    ),
    true
  ),
  updated_at = now()
where key = 'pdp_defaults';

