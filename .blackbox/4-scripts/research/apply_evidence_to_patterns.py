#!/usr/bin/env python3
from __future__ import annotations

import argparse
import re
from dataclasses import dataclass
from pathlib import Path


EVIDENCE_FILE_RE = re.compile(
    r"^(?P<store>[a-z0-9-]+)__(?P<device>[a-z]+)__(?P<stage>[a-z-]+)__(?P<feature>[a-z0-9-]+)__(?P<date>\d{8})\.png$",
    re.IGNORECASE,
)


def norm(s: str) -> str:
    return (s or "").strip().lower()


def stage_key(stage: str) -> str:
    s = norm(stage)
    if s in {"home"}:
        return "homepage"
    return s


def parse_markdown_table(md: str) -> list[list[str]]:
    rows: list[list[str]] = []
    in_table = False
    for line in md.splitlines():
        l = line.strip()
        if not l:
            continue
        if l.startswith("| stage |") and "| feature |" in l and "| pattern card to update |" in l:
            in_table = True
            continue
        if in_table and l.startswith("|---"):
            continue
        if in_table:
            if not l.startswith("|"):
                break
            parts = [p.strip() for p in l.strip("|").split("|")]
            if parts:
                rows.append(parts)
    return rows


def strip_md_link_cell(cell: str) -> str:
    m = re.search(r"`([^`]+\.md)`", (cell or "").strip())
    return m.group(1).strip() if m else ""


@dataclass(frozen=True)
class MappingRow:
    stage: str
    feature: str
    pattern_card: str
    backlog_row: str


def load_capture_mapping(checklist_md: Path) -> dict[tuple[str, str], MappingRow]:
    rows = parse_markdown_table(checklist_md.read_text("utf-8", errors="replace"))
    out: dict[tuple[str, str], MappingRow] = {}
    for r in rows:
        # stage | feature | filename example | pattern card to update | backlog row
        while len(r) < 5:
            r.append("")
        stage, feature, _filename, pattern_card, backlog_row = [x.strip() for x in r[:5]]
        out[(stage_key(stage), norm(feature))] = MappingRow(
            stage=stage_key(stage),
            feature=norm(feature),
            pattern_card=strip_md_link_cell(pattern_card),
            backlog_row=(backlog_row or "").strip(),
        )
    return out


@dataclass(frozen=True)
class EvidenceFile:
    path: Path
    store: str
    device: str
    stage: str
    feature: str
    date: str


def list_evidence_files(store_slug: str, evidence_dir: Path) -> list[EvidenceFile]:
    store_dir = evidence_dir / store_slug
    if not store_dir.exists():
        return []
    out: list[EvidenceFile] = []
    for p in sorted(store_dir.glob("*.png")):
        m = EVIDENCE_FILE_RE.match(p.name)
        if not m:
            continue
        out.append(
            EvidenceFile(
                path=p,
                store=norm(m.group("store")),
                device=norm(m.group("device")),
                stage=stage_key(m.group("stage")),
                feature=norm(m.group("feature")),
                date=m.group("date"),
            )
        )
    return [e for e in out if e.store == norm(store_slug)]


@dataclass(frozen=True)
class TargetUrl:
    raw_stage: str
    url: str


def parse_preflight_targets(audit_doc: Path) -> list[TargetUrl]:
    text = audit_doc.read_text("utf-8", errors="replace")
    if "## Desk research preflight (auto)" not in text:
        return []
    targets: list[TargetUrl] = []
    in_targets = False
    for line in text.splitlines():
        l = line.strip()
        if l.startswith("Target URLs"):
            in_targets = True
            continue
        if in_targets:
            if l.startswith("Detected tooling") or l.startswith("<!-- PRE-FLIGHT:END"):
                break
            m = re.match(r"^-\s*([^:]+):\s*`(https?://[^`]+)`", l)
            if m:
                targets.append(TargetUrl(raw_stage=m.group(1).strip(), url=m.group(2).strip()))
    return targets


def pick_best_url(targets: list[TargetUrl], stage: str) -> str:
    s = stage_key(stage)
    if not targets:
        return ""

    def score(t: TargetUrl) -> tuple[int, int]:
        raw = norm(t.raw_stage)
        if s == "homepage":
            match = 0 if "home" in raw else 10
        elif s == "plp":
            match = 0 if "plp" in raw or "collection" in raw else 10
        elif s == "pdp":
            match = 0 if "pdp" in raw or "product" in raw else 10
        elif s == "cart":
            match = 0 if "cart" in raw or "bag" in raw else 10
        elif s == "checkout":
            match = 0 if "checkout" in raw else 10
        elif s == "post-purchase":
            if "returns" in raw:
                match = 0
            elif "help" in raw or "support" in raw:
                match = 1
            else:
                match = 10
        else:
            match = 5
        return (match, len(t.url))

    return sorted(targets, key=score)[0].url


def replace_line(lines: list[str], prefix: str, new_value: str) -> tuple[list[str], bool]:
    low_prefix = prefix.lower()
    for i, line in enumerate(lines):
        if line.strip().lower().startswith(low_prefix):
            lines[i] = f"{prefix}: {new_value}".rstrip()
            return lines, True
    return lines, False


def upsert_evidence_fields(card_text: str, *, store_name: str, page_url: str, screenshot_link: str) -> tuple[str, bool]:
    """
    Update pattern card evidence fields conservatively:
    - Always update Screenshot link if it's empty or contains "pending"
    - Update Page URL if empty or non-http
    - Update Store only if empty
    """
    lines = card_text.splitlines()

    changed = False

    # Store
    store_line_prefix = "- Store"
    for i, line in enumerate(lines):
        if line.strip().lower().startswith(store_line_prefix.lower() + ":"):
            cur = line.split(":", 1)[1].strip()
            if not cur:
                lines[i] = f"{store_line_prefix}: {store_name}"
                changed = True
            break

    # Page URL
    url_prefix = "- Page URL"
    for i, line in enumerate(lines):
        if line.strip().lower().startswith(url_prefix.lower() + ":"):
            cur = line.split(":", 1)[1].strip()
            if page_url and ("http" not in cur.lower()):
                lines[i] = f"{url_prefix}: {page_url}"
                changed = True
            break

    # Screenshot
    shot_prefix = "- Screenshot link"
    for i, line in enumerate(lines):
        if line.strip().lower().startswith(shot_prefix.lower() + ":"):
            cur = line.split(":", 1)[1].strip().lower()
            # Update if pending/empty OR clearly wrong/unstable path formats (e.g., absolute machine paths).
            should_replace = (
                (not cur)
                or ("pending" in cur)
                or ("docs//" in cur)
                or ("/users/" in cur)
                or (cur.startswith("file://"))
            )
            if screenshot_link and should_replace:
                lines[i] = f"{shot_prefix}: {screenshot_link}"
                changed = True
            break

    return "\n".join(lines).rstrip() + "\n", changed


def main() -> int:
    ap = argparse.ArgumentParser(
        description="Apply captured evidence screenshots to mapped pattern cards (and optionally emit mapping evidence strings)."
    )
    ap.add_argument("--store-slug", required=True, help="Store slug (evidence folder name).")
    ap.add_argument("--store-name", required=False, help="Human store name (optional; defaults to store-slug).")
    ap.add_argument("--evidence-dir", required=True, help="Evidence dir containing <store-slug>/*.png")
    ap.add_argument("--audit-doc", required=True, help="Audit doc md for the store (used to pick best URLs).")
    ap.add_argument("--pattern-capture-md", required=True, help="PATTERN-CAPTURE-CHECKLIST.md")
    ap.add_argument("--patterns-dir", required=True, help="Pattern cards directory (md).")
    ap.add_argument("--dry-run", action="store_true", help="Do not write files; print what would change.")
    ap.add_argument("--out-md", required=False, help="Optional: write a markdown report here.")
    args = ap.parse_args()

    store_slug = norm(args.store_slug)
    store_name = (args.store_name or store_slug).strip()
    evidence_dir = Path(args.evidence_dir)
    audit_doc = Path(args.audit_doc)
    capture_md = Path(args.pattern_capture_md)
    patterns_dir = Path(args.patterns_dir)

    mapping = load_capture_mapping(capture_md)
    targets = parse_preflight_targets(audit_doc) if audit_doc.exists() else []
    evidence_files = list_evidence_files(store_slug, evidence_dir)

    report: list[str] = []
    report.append(f"# Apply Evidence → Pattern Cards ({store_slug})")
    report.append("")
    report.append(f"- store name: {store_name}")
    report.append(f"- evidence folder: `{(evidence_dir / store_slug)}`")
    report.append(f"- audit doc: `{audit_doc}`")
    report.append(f"- patterns dir: `{patterns_dir}`")
    report.append(f"- dry run: {bool(args.dry_run)}")
    report.append("")

    if not evidence_files:
        report.append("No evidence screenshots found. Add `.png` screenshots that match the naming convention, then re-run.")
        text = "\n".join(report).rstrip() + "\n"
        if args.out_md:
            Path(args.out_md).write_text(text, encoding="utf-8")
            print(f"Wrote: {args.out_md}")
        print(text)
        return 0

    # Choose one screenshot per (stage, feature) pair (latest date wins)
    chosen: dict[tuple[str, str], EvidenceFile] = {}
    for e in evidence_files:
        k = (e.stage, e.feature)
        if k not in chosen or e.date > chosen[k].date:
            chosen[k] = e

    # Group by pattern card
    updates: dict[Path, list[EvidenceFile]] = {}
    unmapped: list[EvidenceFile] = []
    for k, e in chosen.items():
        mr = mapping.get(k)
        if not mr or not mr.pattern_card:
            unmapped.append(e)
            continue
        card_path = Path(mr.pattern_card)
        if not card_path.is_absolute():
            card_path = patterns_dir / Path(mr.pattern_card).name
        updates.setdefault(card_path, []).append(e)

    wrote = 0
    report.append("## Changes")
    report.append("")
    if not updates:
        report.append("- No mapped pattern cards for current evidence filenames.")
    for card_path in sorted(updates.keys(), key=lambda p: p.as_posix()):
        if not card_path.exists():
            report.append(f"- Missing pattern card file: `{card_path}`")
            continue
        before = card_path.read_text("utf-8", errors="replace")
        changed_any = False
        for e in sorted(updates[card_path], key=lambda x: (x.stage, x.feature)):
            url = pick_best_url(targets, e.stage)
            # Use a repo-stable path rooted at `docs/` (works well in markdown + copy/paste).
            # Evidence files are usually absolute paths; normalize to docs-relative first.
            try:
                rel = e.path.relative_to(Path.cwd())
                screenshot_link = f"docs/{rel.as_posix()}"
            except Exception:  # noqa: BLE001
                screenshot_link = e.path.as_posix()
            after, changed = upsert_evidence_fields(before, store_name=store_name, page_url=url, screenshot_link=screenshot_link)
            if changed:
                before = after
                changed_any = True
                report.append(f"- Update `{card_path}` from `{e.path.name}` (stage={e.stage}, feature={e.feature})")
        if changed_any:
            if not args.dry_run:
                card_path.write_text(before, encoding="utf-8")
                wrote += 1
            else:
                report.append(f"  - (dry-run) would write `{card_path}`")

    if unmapped:
        report.append("")
        report.append("## Unmapped evidence (consider creating new pattern cards)")
        report.append("")
        for e in unmapped:
            report.append(f"- `{e.path.name}` (stage={e.stage}, feature={e.feature})")

    text = "\n".join(report).rstrip() + "\n"
    if args.out_md:
        Path(args.out_md).parent.mkdir(parents=True, exist_ok=True)
        Path(args.out_md).write_text(text, encoding="utf-8")
        print(f"Wrote: {args.out_md}")
    print(text)
    if args.dry_run:
        print("Dry run complete (no files written).")
    else:
        print(f"Wrote {wrote} pattern card(s).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
