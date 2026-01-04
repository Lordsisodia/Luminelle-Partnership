# Self-hosted Font Example (reference only)

Place font files under `public/fonts/` (or similar) and add to tokens like:

```json
"assets": {
  "fonts": {
    "headingUrl": "/fonts/YourHeading-Regular.woff2",
    "bodyUrl": "/fonts/YourBody-Regular.woff2"
  }
}
```

Then create a small CSS snippet to import them (not yet wired):

```css
@font-face {
  font-family: 'YourHeading';
  src: url('/fonts/YourHeading-Regular.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}
@font-face {
  font-family: 'YourHeading';
  src: url('/fonts/YourHeading-Bold.woff2') format('woff2');
  font-weight: 700;
  font-display: swap;
}
@font-face {
  font-family: 'YourBody';
  src: url('/fonts/YourBody-Regular.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}
```

During integration, import this CSS before tokens-generated vars, and update tokens to reference `YourHeading`, `YourBody` families.
