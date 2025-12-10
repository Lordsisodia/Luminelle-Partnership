#!/usr/bin/env bash
set -euo pipefail

OUT="reports"
mkdir -p "$OUT"
URLS=(
  "https://lumelle.com/"
  "https://lumelle.com/product/shower-cap"
  "https://lumelle.com/blog/lumelle-journal-launch"
)

for url in "${URLS[@]}"; do
  slug=$(echo "$url" | sed -E 's@https?://[^/]+/?@@; s@/@-@g; s@^-@@; s@-$@@')
  slug=${slug:-home}
  echo "Running PSI (mobile) for $url"
  if [ -n "${PSI_API_KEY:-}" ]; then
    npx psi "$url" --strategy=mobile --format=json --key="$PSI_API_KEY" > "$OUT/psi-${slug}-mobile.json"
  else
    npx psi "$url" --strategy=mobile --format=json > "$OUT/psi-${slug}-mobile.json"
  fi
  echo "Saved $OUT/psi-${slug}-mobile.json"
  echo "Running PSI (desktop) for $url"
  if [ -n "${PSI_API_KEY:-}" ]; then
    npx psi "$url" --strategy=desktop --format=json --key="$PSI_API_KEY" > "$OUT/psi-${slug}-desktop.json"
  else
    npx psi "$url" --strategy=desktop --format=json > "$OUT/psi-${slug}-desktop.json"
  fi
  echo "Saved $OUT/psi-${slug}-desktop.json"
  sleep 1
done

echo "Done. Inspect JSON files in $OUT/. Use docs/perf-log.md to record key metrics."
