# Black Box: Shopify Redirect Snippet

Use this when you need the Shopify Online Store homepage to instantly forward shoppers to the headless app (`https://lumellebeauty.co.uk`) without touching checkout or other pages.

## One-line summary
Add a conditional redirect at the top of `layout/theme.liquid` so it only runs on the homepage (`request.page_type == 'index'`).

## Drop-in code (copy/paste)
Paste this immediately after the opening `<head>` tag in `layout/theme.liquid`:

```liquid
{% if request.page_type == 'index' %}
  <meta http-equiv="refresh" content="0; url=https://lumellebeauty.co.uk">
  <script>window.location.replace('https://lumellebeauty.co.uk');</script>
  <style>body { opacity: 0; }</style>
{% endif %}
```

Everything else in the file stays unchanged.

## Example with context
```liquid
<!doctype html>
<html
  class="no-js{% if request.design_mode %} shopify-design-mode{% endif %}"
  lang="{{ request.locale.iso_code }}"
>
  <head>
    {% if request.page_type == 'index' %}
      <meta http-equiv="refresh" content="0; url=https://lumellebeauty.co.uk">
      <script>window.location.replace('https://lumellebeauty.co.uk');</script>
      <style>body { opacity: 0; }</style>
    {% endif %}

    {%- if settings.favicon != blank -%}
      <link
        rel="icon"
        type="image/png"
        href="{{ settings.favicon | image_url: width: 32, height: 32 }}"
      >
    {%- endif -%}

    {%- render 'meta-tags' -%}
    {%- render 'stylesheets' -%}
    {%- render 'fonts' -%}
    {%- render 'scripts' -%}
    {%- render 'theme-styles-variables' -%}
    {%- render 'color-schemes' -%}

    {% if request.design_mode %}
      {%- render 'theme-editor' -%}
    {% endif %}

    {{ content_for_header }}
  </head>

  <body class="page-width-{{ settings.page_width }} card-hover-effect-{{ settings.card_hover_effect }}">
    {% render 'skip-to-content-link', href: '#MainContent', text: 'accessibility.skip_to_text' %}
    <div id="header-group">
      {% sections 'header-group' %}
    </div>

    <script
      src="{{ 'critical.js' | asset_url }}"
      type="module"
      async
      blocking="render"
    ></script>

    <main
      id="MainContent"
      class="content-for-layout"
      role="main"
      data-page-transition-enabled="{{ settings.page_transition_enabled }}"
      data-product-transition="{{ settings.transition_to_main_product }}"
      data-template="{{ template }}"
    >
      {{ content_for_layout }}
    </main>

    {% sections 'footer-group' %}

    {% render 'search-modal' %}

    {% if settings.quick_add or settings.mobile_quick_add %}
      {% render 'quick-add-modal' %}
    {% endif %}
  </body>
</html>
```

## Notes
- Runs only on the Online Store **home** (`request.page_type == 'index'`); checkout, account, and other pages are untouched.
- Keep the redirect URL consistent with your headless app.
- Test on a duplicated theme before publishing. 
