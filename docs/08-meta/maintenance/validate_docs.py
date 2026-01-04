#!/usr/bin/env python3
from __future__ import annotations

import runpy
from pathlib import Path


def main() -> int:
    docs = Path(__file__).resolve().parents[2]
    target = docs / ".blackbox" / "scripts" / "validate-docs.py"
    if not target.exists():
        print(f"FAIL: missing validator: {target}")
        return 1
    runpy.run_path(str(target), run_name="__main__")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

