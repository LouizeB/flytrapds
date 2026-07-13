#!/usr/bin/env python3
"""Ensure raw color literals stay inside approved token or public-art layers."""
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
RAW_COLOR = re.compile(r"#[0-9A-Fa-f]{3,8}\b|rgba?\(")
SCAN_ROOTS = [
    ROOT / "apps/docs/src",
    ROOT / "packages/ui/src",
]
SCAN_EXTENSIONS = {".css", ".ts", ".tsx", ".svg"}
ALLOWED_FILES = {
    ROOT / "apps/docs/src/main.tsx",
    ROOT / "apps/docs/src/site.css",
    ROOT / "packages/ui/src/assets/flytrap-logo.svg",
}
ALLOWED_DIRS = {
    ROOT / "apps/docs/src/living",
}


def is_allowed(path: Path) -> bool:
    path = path.resolve()
    if path in ALLOWED_FILES:
        return True
    return any(path.is_relative_to(directory) for directory in ALLOWED_DIRS)


def main() -> int:
    violations: list[tuple[Path, int, str]] = []
    for root in SCAN_ROOTS:
        for path in root.rglob("*"):
            if not path.is_file() or path.suffix not in SCAN_EXTENSIONS:
                continue
            if is_allowed(path):
                continue
            for line_number, line in enumerate(path.read_text(errors="ignore").splitlines(), start=1):
                if RAW_COLOR.search(line):
                    violations.append((path.relative_to(ROOT), line_number, line.strip()))

    if violations:
        print("[FAIL] raw colors outside the approved token/public-art layers:")
        for path, line_number, line in violations:
            print(f"  {path}:{line_number}: {line}")
        return 1

    print("[PASS] raw colors are confined to tokens/assets or the documented public-art layer")
    return 0


if __name__ == "__main__":
    sys.exit(main())
