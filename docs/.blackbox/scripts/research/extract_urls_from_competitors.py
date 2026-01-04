#!/usr/bin/env python3
from __future__ import annotations

import argparse
from pathlib import Path


def parse_seed_line(line: str) -> tuple[str, str] | None:
    raw = line.strip()
    if not raw or raw.startswith("#"):
        return None
    parts = [p.strip() for p in raw.split("|")]
    while len(parts) < 3:
        parts.append("")
    name = parts[0]
    url = parts[2]
    if not name or not url.startswith(("http://", "https://")):
        return None
    return name, url


def main() -> int:
    ap = argparse.ArgumentParser(description="Extract website URLs from competitor seed file to a snapshot input list.")
    ap.add_argument("--input", required=True, help="competitor-seeds.txt (pipe delimited)")
    ap.add_argument("--output", required=True, help="Output url list (url + label)")
    args = ap.parse_args()

    in_path = Path(args.input)
    out_path = Path(args.output)

    seen: set[str] = set()
    lines: list[str] = []
    for line in in_path.read_text("utf-8", errors="replace").splitlines():
        parsed = parse_seed_line(line)
        if not parsed:
            continue
        name, url = parsed
        if url in seen:
            continue
        seen.add(url)
        lines.append(f"{url} {name}")

    lines.sort(key=lambda s: s.lower())
    out_path.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"Wrote {len(lines)} URLs -> {out_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

