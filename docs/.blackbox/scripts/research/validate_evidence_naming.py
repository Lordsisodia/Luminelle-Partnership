#!/usr/bin/env python3
from __future__ import annotations

import argparse
import re
import sys
from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class Issue:
    file: str
    message: str


VALID_DEVICES = {"desktop", "mobile"}
VALID_STAGES = {
    "homepage",
    "plp",
    "pdp",
    "cart",
    "checkout",
    "post-purchase",
    "returns",
}


FILENAME_RE = re.compile(
    r"^(?P<store>[a-z0-9-]+)__(?P<device>desktop|mobile)__(?P<stage>[a-z0-9-]+)__(?P<feature>[a-z0-9-]+)__(?P<date>\d{8})$"
)


def main() -> int:
    ap = argparse.ArgumentParser(description="Validate screenshot naming under plan evidence folders.")
    ap.add_argument("--evidence-dir", required=True, help="Plan evidence directory (contains per-store folders).")
    ap.add_argument("--out-md", required=True, help="Write markdown report here.")
    ap.add_argument("--strict", action="store_true", help="Fail if any issues found.")
    ap.add_argument("--extensions", default="png,jpg,jpeg,webp", help="Comma-separated image extensions to include.")
    args = ap.parse_args()

    evidence_dir = Path(args.evidence_dir)
    out_md = Path(args.out_md)
    exts = {("." + e.strip().lower().lstrip(".")) for e in args.extensions.split(",") if e.strip()}

    if not evidence_dir.exists():
        raise SystemExit(f"Not found: {evidence_dir}")

    issues: list[Issue] = []
    checked = 0

    for store_dir in sorted([p for p in evidence_dir.iterdir() if p.is_dir()]):
        store_slug = store_dir.name
        for f in sorted(store_dir.rglob("*")):
            if not f.is_file():
                continue
            if f.suffix.lower() not in exts:
                continue
            checked += 1
            stem = f.stem
            m = FILENAME_RE.match(stem)
            rel = str(f.relative_to(evidence_dir))
            if not m:
                issues.append(
                    Issue(
                        file=rel,
                        message="filename does not match <store>__<device>__<stage>__<feature>__YYYYMMDD",
                    )
                )
                continue

            store = m.group("store")
            device = m.group("device")
            stage = m.group("stage")
            if store != store_slug:
                issues.append(Issue(file=rel, message=f"store slug mismatch (folder={store_slug}, filename={store})"))
            if device not in VALID_DEVICES:
                issues.append(Issue(file=rel, message=f"invalid device: {device}"))
            if stage not in VALID_STAGES:
                issues.append(Issue(file=rel, message=f"invalid stage: {stage} (expected one of {sorted(VALID_STAGES)})"))

    lines: list[str] = []
    lines.append("# Evidence Naming Report")
    lines.append("")
    lines.append(f"Source: `{evidence_dir}`")
    lines.append(f"- checked image files: {checked}")
    lines.append(f"- issues: {len(issues)}")
    lines.append("")
    if issues:
        lines.append("## Issues")
        for iss in issues[:200]:
            lines.append(f"- `{iss.file}` — {iss.message}")
        if len(issues) > 200:
            lines.append(f"- … ({len(issues) - 200} more)")
    else:
        lines.append("No issues found.")

    out_md.parent.mkdir(parents=True, exist_ok=True)
    out_md.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"Wrote: {out_md}")

    if args.strict and issues:
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())

