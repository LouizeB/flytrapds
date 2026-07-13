#!/usr/bin/env python3
"""Validate DTCG references, layer boundaries, required states and mode resolution."""
import json
import re
import sys

REF = re.compile(r"^\{([^}]+)\}$")
ALLOWED_COMPONENT_TARGETS = ("semantic.", "foundation.")
REQUIRED_COMPONENT_STATES = {
    "button-primary-bg",
    "button-primary-bg-hover",
    "button-primary-bg-disabled",
    "button-primary-fg",
    "button-primary-opacity-disabled",
    "button-secondary-opacity-disabled",
    "button-destructive-opacity-disabled",
    "button-ghost-bg-hover",
    "button-ghost-fg",
    "button-ghost-fg-hover",
    "button-outline-opacity-disabled",
    "button-link-fg",
    "button-ghost-opacity-disabled",
    "button-outline-bg-hover",
    "button-outline-border",
    "button-outline-fg",
    "button-outline-fg-hover",
    "button-link-opacity-disabled",
    "input-bg",
    "input-border",
    "input-border-focus",
    "input-border-error",
}


def getnode(root, dotted):
    node = root
    for part in dotted.split("."):
        node = node[part]
    return node


def leaves(node, path=""):
    for key, value in node.items():
        if key.startswith("$"):
            continue
        current = f"{path}.{key}".strip(".")
        if isinstance(value, dict) and "$value" in value:
            yield current, value
        elif isinstance(value, dict):
            yield from leaves(value, current)


def resolve(root, value, mode, chain=()):
    if isinstance(value, dict):
        modes = value.get("$extensions", {}).get("modes", {})
        return resolve(root, modes.get(mode, value["$value"]), mode, chain)
    match = REF.fullmatch(value) if isinstance(value, str) else None
    if not match:
        return value
    target = match.group(1)
    if target in chain:
        raise ValueError(f"reference cycle: {' -> '.join((*chain, target))}")
    return resolve(root, getnode(root, target), mode, (*chain, target))


def main(path):
    root = json.load(open(path))
    modes = root.get("$extensions", {}).get("flytrap", {}).get("modes", ["light", "dark"])
    errors = []
    all_tokens = list(leaves(root))

    for token_path, node in all_tokens:
        for mode in modes:
            try:
                resolve(root, node, mode, (token_path,))
            except (KeyError, TypeError, ValueError) as error:
                errors.append(f"{token_path} [{mode}]: {error}")

    components = dict(leaves(root.get("component", {})))
    missing = REQUIRED_COMPONENT_STATES - set(components)
    if missing:
        errors.append(f"required component states missing: {', '.join(sorted(missing))}")

    for name, node in components.items():
        values = [node["$value"], *node.get("$extensions", {}).get("modes", {}).values()]
        for value in values:
            match = REF.fullmatch(value) if isinstance(value, str) else None
            if not match or not match.group(1).startswith(ALLOWED_COMPONENT_TARGETS):
                errors.append(f"component.{name}: must alias semantic.* or foundation.*")

    if errors:
        for error in errors:
            print(f"[FAIL] {error}")
        print(f"\n{len(errors)} contract error(s)")
        return 1

    print(
        f"[PASS] {len(all_tokens)} tokens resolve across {len(modes)} modes "
        f"({', '.join(modes)}); {len(components)} component aliases respect layer boundaries"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1] if len(sys.argv) > 1 else "packages/tokens/src/flytrap.tokens.json"))
