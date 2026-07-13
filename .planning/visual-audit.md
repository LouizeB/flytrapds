# Visual audit — Flytrap public DS

URL: https://louizeb.github.io/flytrapds/
Generated: 2026-07-13T19:26:41.644Z

## Summary

| Check | Result |
|--|--|
| Overall | ✅ pass |
| Screenshots | `.planning/screenshots/flytrap-public-desktop-ready.png`, `.planning/screenshots/flytrap-public-mobile-ready.png` |

## Viewports

| Viewport | HTTP | Main visible | Loader hidden | Required sections | Blocking errors | Warnings | Screenshot |
|--|--:|--|--|--|--|--:|--|
| desktop (1440×1200) | 200 | ✅ | ✅ | ✅ 8/8 | ✅ 0 | 5 | `.planning/screenshots/flytrap-public-desktop-ready.png` |
| mobile (390×1200) | 200 | ✅ | ✅ | ✅ 8/8 | ✅ 0 | 1 | `.planning/screenshots/flytrap-public-mobile-ready.png` |

## Required sections

### desktop

Present: `Foundations`, `Tokens`, `Components`, `Patterns`, `Accessibility`, `Guidelines`, `Code / Develop`, `AI Workflows`

Diagnostics:
- console warning: [.WebGL-0x12c0055ec00]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels
- console warning: THREE.Clock: This module has been deprecated. Please use THREE.Timer instead.
- console warning: [.WebGL-0x12c00554400]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels
- console warning: [.WebGL-0x12c00554400]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels
- console warning: [.WebGL-0x12c00554400]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (this message will no longer repeat)

### mobile

Present: `Foundations`, `Tokens`, `Components`, `Patterns`, `Accessibility`, `Guidelines`, `Code / Develop`, `AI Workflows`

Diagnostics:
- console warning: THREE.Clock: This module has been deprecated. Please use THREE.Timer instead.

## Human review notes

- Desktop: sidebar, hero, character, organic atmosphere, dense cards and all DS sections render after the boot sequence.
- Mobile: content stacks without horizontal overflow; all sections remain reachable after the boot sequence.
- Known non-blocking observation: the public art layer is intentionally dark/neon and remains outside the DS token contract.

