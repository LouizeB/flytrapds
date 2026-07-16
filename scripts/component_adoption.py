#!/usr/bin/env python3
"""Report static adoption of @louizeb/flytrap-ui exports across product apps."""
from __future__ import annotations

from collections import Counter, defaultdict
from dataclasses import dataclass
from pathlib import Path
import argparse
import json
import re
import sys


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_SCAN_ROOTS = [ROOT / "apps"]
IMPORT_RE = re.compile(r'import\s*\{(?P<names>[^}]+)\}\s*from\s*["\']@louizeb/flytrap-ui["\']', re.MULTILINE | re.DOTALL)
SIDE_EFFECT_RE = re.compile(r'import\s*["\']@louizeb/flytrap-ui/styles["\']')


@dataclass(frozen=True)
class Adoption:
    export: str
    file: str


def source_files(scan_roots: list[Path]) -> list[Path]:
    files: list[Path] = []
    for scan_root in scan_roots:
        for path in scan_root.rglob("*"):
            if path.suffix in {".ts", ".tsx"} and path.is_file():
                files.append(path)
    return sorted(files)


def parse_names(raw_names: str) -> list[str]:
    names: list[str] = []
    for part in raw_names.split(","):
        name = part.strip()
        if not name:
            continue
        if name.startswith("type "):
            name = name.removeprefix("type ").strip()
        if " as " in name:
            name = name.split(" as ", 1)[0].strip()
        names.append(name)
    return names


def collect(scan_roots: list[Path]) -> tuple[list[Adoption], list[str]]:
    adoptions: list[Adoption] = []
    style_imports: list[str] = []

    for path in source_files(scan_roots):
        text = path.read_text(errors="ignore")
        relative = str(path.relative_to(ROOT))
        if SIDE_EFFECT_RE.search(text):
            style_imports.append(relative)
        for match in IMPORT_RE.finditer(text):
            for name in parse_names(match.group("names")):
                adoptions.append(Adoption(export=name, file=relative))

    return adoptions, sorted(style_imports)


def build_report(adoptions: list[Adoption], style_imports: list[str]) -> dict[str, object]:
    counts = Counter(adoption.export for adoption in adoptions)
    files_by_export: dict[str, list[str]] = defaultdict(list)
    exports_by_file: dict[str, list[str]] = defaultdict(list)

    for adoption in adoptions:
        files_by_export[adoption.export].append(adoption.file)
        exports_by_file[adoption.file].append(adoption.export)

    return {
        "summary": {
            "total_imports": sum(counts.values()),
            "unique_exports": len(counts),
            "files_importing_ui": len(exports_by_file),
            "files_importing_styles": len(style_imports),
        },
        "exports": [
            {
                "name": name,
                "count": count,
                "files": sorted(set(files_by_export[name])),
            }
            for name, count in sorted(counts.items(), key=lambda item: (-item[1], item[0]))
        ],
        "files": [
            {
                "path": path,
                "exports": sorted(exports),
            }
            for path, exports in sorted(exports_by_file.items())
        ],
        "style_imports": style_imports,
    }


def markdown(report: dict[str, object]) -> str:
    summary = report["summary"]
    assert isinstance(summary, dict)
    exports = report["exports"]
    files = report["files"]
    assert isinstance(exports, list)
    assert isinstance(files, list)

    lines = [
        "# Component adoption snapshot",
        "",
        "Static scan of `@louizeb/flytrap-ui` named imports in `apps/**`.",
        "",
        "## Summary",
        "",
        f"- Total named imports: {summary['total_imports']}",
        f"- Unique exports adopted: {summary['unique_exports']}",
        f"- Files importing UI: {summary['files_importing_ui']}",
        f"- Files importing styles: {summary['files_importing_styles']}",
        "",
        "## Exports",
        "",
        "| Export | Count | Files |",
        "|--|--:|--|",
    ]

    for item in exports:
        assert isinstance(item, dict)
        lines.append(f"| `{item['name']}` | {item['count']} | {', '.join(f'`{file}`' for file in item['files'])} |")

    lines.extend(["", "## Files", "", "| File | Exports |", "|--|--|"])

    for item in files:
        assert isinstance(item, dict)
        lines.append(f"| `{item['path']}` | {', '.join(f'`{name}`' for name in sorted(set(item['exports'])))} |")

    lines.append("")
    return "\n".join(lines)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--format", choices=["markdown", "json"], default="markdown")
    parser.add_argument("--output", type=Path)
    parser.add_argument("--check", action="store_true", help="fail when --output differs from the generated report")
    args = parser.parse_args()

    report = build_report(*collect(DEFAULT_SCAN_ROOTS))
    content = json.dumps(report, indent=2, ensure_ascii=False) + "\n" if args.format == "json" else markdown(report)

    if args.check:
        if not args.output:
            parser.error("--check requires --output")
        if not args.output.exists():
            print(f"[FAIL] adoption report does not exist: {args.output}")
            return 1
        if args.output.read_text() != content:
            print(f"[FAIL] adoption report is stale: {args.output}")
            print(f"Run: python3 scripts/component_adoption.py --output {args.output}")
            return 1
        print(f"[PASS] adoption report is up to date: {args.output}")
        return 0

    if args.output:
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(content)
    else:
        sys.stdout.write(content)

    return 0


if __name__ == "__main__":
    sys.exit(main())
