#!/usr/bin/env python3
from __future__ import annotations

import argparse
import base64
import json
import os
import re
import sys
import urllib.error
import urllib.request
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


GITHUB_API = "https://api.github.com"


@dataclass(frozen=True)
class VerifiedLicense:
    full_name: str
    spdx_id: str
    key: str
    spdx_guess: str
    html_url: str
    api_url: str
    fetched_at: str
    notes: str


def http_get_json(url: str, token: str | None) -> dict[str, Any]:
    headers = {
        "Accept": "application/vnd.github+json",
        "User-Agent": "lumelle-docs-blackbox-research",
    }
    if token:
        headers["Authorization"] = f"Bearer {token}"
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, timeout=30) as resp:
        body = resp.read()
    return json.loads(body.decode("utf-8"))


def decode_content(maybe_b64: str | None) -> str:
    if not maybe_b64:
        return ""
    try:
        return base64.b64decode(maybe_b64).decode("utf-8", errors="replace")
    except Exception:  # noqa: BLE001
        return ""


def normalize_repo(s: str) -> str:
    s = s.strip()
    if s.startswith("https://github.com/"):
        s = s.removeprefix("https://github.com/").strip("/")
    return s


def safe_slug(s: str) -> str:
    s = s.lower().strip()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    s = re.sub(r"-{2,}", "-", s).strip("-")
    return s or "entry"


def guess_spdx_from_text(text: str) -> tuple[str, str]:
    """
    Best-effort heuristic (for human review):
    - Returns (spdx_guess, notes)
    """
    t = (text or "").upper()
    if not t:
        return "UNKNOWN", "no content to inspect"

    # Strong identifiers
    if "GNU LESSER GENERAL PUBLIC LICENSE" in t and "VERSION 3" in t:
        return "LGPL-3.0", "LGPLv3 detected from license text"
    if "GNU AFFERO GENERAL PUBLIC LICENSE" in t:
        return "AGPL-3.0", "AGPL detected from license text"
    if "GNU GENERAL PUBLIC LICENSE" in t and "VERSION 3" in t:
        return "GPL-3.0", "GPLv3 detected from license text"
    if "GPLV3" in t or "GPL V3" in t:
        return "GPL-3.0", "GPLv3 mentioned in license text"
    if "AGPLV3" in t or "AGPL V3" in t:
        return "AGPL-3.0", "AGPLv3 mentioned in license text"
    if "APACHE LICENSE" in t and "VERSION 2.0" in t:
        return "Apache-2.0", "Apache 2.0 detected from license text"
    if "REDISTRIBUTION AND USE IN SOURCE AND BINARY FORMS" in t and "BSD" in t:
        return "BSD-3-Clause", "BSD-style detected from license text (verify clause count)"

    # MIT-ish
    if "PERMISSION IS HEREBY GRANTED, FREE OF CHARGE" in t and "THE SOFTWARE IS PROVIDED \"AS IS\"" in t:
        return "MIT", "MIT-style detected from license text"

    # Proprietary / source-available style
    if "PROPRIETARY SOFTWARE LICENSE" in t or "APPROVAL REQUIRED" in t:
        return "PROPRIETARY", "proprietary/commercial restrictions detected"

    # Source-available licenses (not OSI) — treat as proprietary by default for adoption
    if "BUSINESS SOURCE LICENSE" in t and "1.1" in t:
        return "BUSL-1.1", "Business Source License detected (not open source)"
    if "ELASTIC LICENSE 2.0" in t or "ELV2" in t:
        return "ELv2", "Elastic License 2.0 detected (not open source)"
    if "SUSTAINABLE USE LICENSE" in t:
        return "SUL-1.0", "Sustainable Use License detected (not open source)"

    return "UNKNOWN", "could not confidently classify from text"


def main() -> int:
    ap = argparse.ArgumentParser(description="Verify repo licenses using GitHub /license endpoint (stronger than NOASSERTION).")
    ap.add_argument("--repos", required=True, help="Comma-separated owner/repo list.")
    ap.add_argument("--out-json", required=True, help="Write verification JSON here.")
    ap.add_argument("--out-md", required=True, help="Write a human-readable report here.")
    args = ap.parse_args()

    token = os.environ.get("GITHUB_TOKEN") or os.environ.get("GH_TOKEN")

    repos = [normalize_repo(r) for r in args.repos.split(",") if r.strip()]
    if not repos:
        print("No repos provided.", file=sys.stderr)
        return 2

    results: list[VerifiedLicense] = []
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")

    for full in repos:
        url = f"{GITHUB_API}/repos/{full}/license"
        try:
            data = http_get_json(url, token)
        except urllib.error.HTTPError as e:
            note = f"HTTP {e.code}"
            results.append(
                VerifiedLicense(
                    full_name=full,
                    spdx_id="UNKNOWN",
                    key="UNKNOWN",
                    spdx_guess="UNKNOWN",
                    html_url=f"https://github.com/{full}",
                    api_url=url,
                    fetched_at=now,
                    notes=note,
                )
            )
            continue
        except Exception as e:  # noqa: BLE001
            results.append(
                VerifiedLicense(
                    full_name=full,
                    spdx_id="UNKNOWN",
                    key="UNKNOWN",
                    spdx_guess="UNKNOWN",
                    html_url=f"https://github.com/{full}",
                    api_url=url,
                    fetched_at=now,
                    notes=str(e),
                )
            )
            continue

        lic = data.get("license") or {}
        spdx_id = lic.get("spdx_id") or "UNKNOWN"
        key = lic.get("key") or "UNKNOWN"
        html_url = data.get("html_url") or f"https://github.com/{full}/blob/HEAD/LICENSE"

        content = decode_content(data.get("content"))
        spdx_guess, guess_notes = guess_spdx_from_text(content)
        notes = guess_notes if guess_notes != "ok" else "ok"

        # Spot common dual-licensing language
        up = content.upper()
        if "AVAILABLE UNDER TWO DIFFERENT LICENSES" in up or ("COMMERCIAL LICENSE" in up and "GPL" in up):
            notes = f"{notes}; dual-license language detected (treat as copyleft unless commercial terms)"

        results.append(
            VerifiedLicense(
                full_name=full,
                spdx_id=spdx_id,
                key=key,
                spdx_guess=spdx_guess,
                html_url=html_url,
                api_url=url,
                fetched_at=now,
                notes=notes,
            )
        )

    out_json = Path(args.out_json)
    out_json.parent.mkdir(parents=True, exist_ok=True)
    out_json.write_text(json.dumps([r.__dict__ for r in results], indent=2), encoding="utf-8")

    out_md = Path(args.out_md)
    out_md.parent.mkdir(parents=True, exist_ok=True)
    lines: list[str] = []
    lines.append("# License Verification Report (GitHub /license endpoint)")
    lines.append("")
    lines.append(f"- Timestamp: {now}")
    lines.append("- Purpose: resolve `NOASSERTION`/unknown license metadata before adopting OSS.")
    lines.append("")
    lines.append("| repo | api spdx_id | guess | license url | notes |")
    lines.append("|---|---|---|---|---|")
    for r in results:
        lines.append(f"| {r.full_name} | {r.spdx_id} | {r.spdx_guess} | {r.html_url} | {r.notes} |")
    lines.append("")
    out_md.write_text("\n".join(lines) + "\n", encoding="utf-8")

    print(f"Wrote: {out_json}")
    print(f"Wrote: {out_md}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
