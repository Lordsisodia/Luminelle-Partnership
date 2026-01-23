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
    if s in {"home", "homepage"}:
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
        key = (stage_key(stage), norm(feature))
        out[key] = MappingRow(stage=stage_key(stage), feature=norm(feature), pattern_card=pattern_card, backlog_row=backlog_row)
    return out


@dataclass(frozen=True)
class TargetUrl:
    raw_stage: str
    url: str


def parse_preflight_targets(audit_doc: Path) -> list[TargetUrl]:
    """
    Extracts lines like:
      - plp: `https://...` (batch-02)
      - help_us: `https://...` (batch-01)
    """
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
        # Prefer exact-ish matches by stage family.
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
            # Post-purchase evidence is usually returns/help center; prefer returns first.
            if "returns" in raw:
                match = 0
            elif "help" in raw or "support" in raw:
                match = 1
            else:
                match = 10
        else:
            match = 5
        # Prefer shorter URLs (usually cleaner, fewer params)
        return (match, len(t.url))

    best = sorted(targets, key=score)[0]
    return best.url


def strip_md_link_cell(cell: str) -> str:
    """
    Cells look like:
      `path/to/file.md`
      — (create new card if valuable)
    We return a usable path if present, else "".
    """
    cell = cell.strip()
    m = re.search(r"`([^`]+\.md)`", cell)
    if m:
        return m.group(1).strip()
    return ""


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
    # Only keep files for the requested store (guards against mis-filed evidence).
    return [e for e in out if e.store == norm(store_slug)]


def main() -> int:
    ap = argparse.ArgumentParser(
        description="Suggest which pattern cards/backlog rows to update based on captured evidence screenshots."
    )
    ap.add_argument("--store-slug", required=True, help="Store slug (matches evidence folder name).")
    ap.add_argument("--evidence-dir", required=True, help="Evidence dir containing <store-slug>/*.png")
    ap.add_argument("--audit-doc", required=True, help="Audit doc md for the store (used to pick best URLs).")
    ap.add_argument("--pattern-capture-md", required=True, help="PATTERN-CAPTURE-CHECKLIST.md")
    ap.add_argument("--out-md", required=False, help="Optional: write a markdown report here.")
    args = ap.parse_args()

    store_slug = norm(args.store_slug)
    evidence_dir = Path(args.evidence_dir)
    audit_doc = Path(args.audit_doc)
    capture_md = Path(args.pattern_capture_md)

    mapping = load_capture_mapping(capture_md)
    targets = parse_preflight_targets(audit_doc) if audit_doc.exists() else []

    evidence_files = list_evidence_files(store_slug, evidence_dir)
    if not evidence_files:
        report = []
        report.append(f"# Evidence → Pattern Suggestions ({store_slug})")
        report.append("")
        report.append(f"No evidence screenshots found in `{evidence_dir / store_slug}`.")
        report.append("")
        report.append("Next step:")
        report.append("- Capture screenshots following the store checklist and re-run this helper.")
        text = "\n".join(report) + "\n"
        if args.out_md:
            Path(args.out_md).write_text(text, encoding="utf-8")
            print(f"Wrote: {args.out_md}")
        print(text)
        return 0

    # Build suggestions
    card_updates: dict[str, list[EvidenceFile]] = {}
    backlog_updates: dict[str, list[EvidenceFile]] = {}
    unmapped: list[EvidenceFile] = []

    for e in evidence_files:
        k = (stage_key(e.stage), norm(e.feature))
        m = mapping.get(k)
        if not m:
            unmapped.append(e)
            continue
        card_path = strip_md_link_cell(m.pattern_card)
        if card_path:
            card_updates.setdefault(card_path, []).append(e)
        if m.backlog_row and m.backlog_row != "—":
            backlog_updates.setdefault(m.backlog_row, []).append(e)

    lines: list[str] = []
    lines.append(f"# Evidence → Pattern Suggestions ({store_slug})")
    lines.append("")
    lines.append(f"- evidence folder: `{evidence_dir / store_slug}`")
    lines.append(f"- audit doc: `{audit_doc}`")
    lines.append(f"- capture checklist: `{capture_md}`")
    lines.append("")

    lines.append("## Pattern cards to update")
    lines.append("")
    if not card_updates:
        lines.append("- No mapped pattern cards found for the current evidence filenames.")
    else:
        for card in sorted(card_updates.keys()):
            lines.append(f"- {card}")
            for e in card_updates[card]:
                url = pick_best_url(targets, e.stage)
                rel = e.path.as_posix()
                lines.append(f"  - `{e.path.name}` → paste screenshot link `{rel}` (page URL: {url or '—'})")
    lines.append("")

    lines.append("## Backlog evidence strings (paste-ready)")
    lines.append("")
    lines.append("Use the format: `Store — URL — screenshot`.")
    lines.append("")
    if not backlog_updates:
        lines.append("- No backlog rows mapped from the current evidence filenames.")
    else:
        for backlog in sorted(backlog_updates.keys()):
            lines.append(f"### {backlog}")
            for e in backlog_updates[backlog]:
                url = pick_best_url(targets, e.stage)
                rel = e.path.as_posix()
                store_display = store_slug
                lines.append(f"- {store_display} — {url or 'URL_TBD'} — {rel}")
            lines.append("")

    if unmapped:
        lines.append("## Unmapped evidence (consider new pattern cards)")
        lines.append("")
        for e in unmapped:
            lines.append(f"- `{e.path.name}` (stage={e.stage}, feature={e.feature})")
        lines.append("")

    text = "\n".join(lines).rstrip() + "\n"
    if args.out_md:
        Path(args.out_md).parent.mkdir(parents=True, exist_ok=True)
        Path(args.out_md).write_text(text, encoding="utf-8")
        print(f"Wrote: {args.out_md}")
    print(text)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
