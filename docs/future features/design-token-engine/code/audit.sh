#!/usr/bin/env bash
# Simple audit helper (no repo changes). Run from repo root or adjust paths.
set -euo pipefail

OUT_DIR="docs/future features/design-token-engine/audit"
mkdir -p "$OUT_DIR"

echo "Collecting brand utility counts..."
rg -o "brand-(peach|cocoa|blush)" src | sort | uniq -c | sort -nr > "$OUT_DIR/brand-class-counts.txt"

echo "Collecting hex literal counts..."
rg -o "#[0-9A-Fa-f]{3,8}" src | sort | uniq -c | sort -nr > "$OUT_DIR/hex-counts.txt"

echo "Done. Outputs in $OUT_DIR"
