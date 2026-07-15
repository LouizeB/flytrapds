# Visual audit — Flytrap public DS

Profile: public
URL: http://127.0.0.1:4175/
Generated: 2026-07-15T19:06:58.489Z

## Summary

| Check | Result |
|--|--|
| Overall | ✅ pass |
| Screenshots | `.planning/screenshots/flytrap-public-desktop-ready.png`, `.planning/screenshots/flytrap-public-mobile-ready.png` |

## Viewports

| Viewport | HTTP | Main visible | Loader hidden | Required sections | Component docs | Patterns | Links | Names | Overflow | Blocking errors | Warnings | Screenshot |
|--|--:|--|--|--|--|--|--|--|--|--|--:|--|
| desktop (1440×1200) | 200 | ✅ | ✅ | ✅ 8/8 | ✅ 7/7 | ✅ 0/0 | ✅ 0 | ✅ 0 | ✅ 1440/1440 | ✅ 0 | 5 | `.planning/screenshots/flytrap-public-desktop-ready.png` |
| mobile (390×1200) | 200 | ✅ | ✅ | ✅ 8/8 | ✅ 7/7 | ✅ 0/0 | ✅ 0 | ✅ 0 | ✅ 390/390 | ✅ 0 | 1 | `.planning/screenshots/flytrap-public-mobile-ready.png` |

## Required sections

### desktop

Present: `Foundations`, `Tokens`, `Components`, `Patterns`, `Accessibility`, `Guidelines`, `Code / Develop`, `AI Workflows`
Component docs: `component-inputs`, `component-navigation`, `component-feedback`, `component-data-display`, `component-surfaces`, `component-overlays`, `component-ai`
Pattern docs: 

Diagnostics:
- console warning: [.WebGL-0x11400484400]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels
- console warning: THREE.Clock: This module has been deprecated. Please use THREE.Timer instead.
- console warning: [.WebGL-0x11400474800]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels
- console warning: [.WebGL-0x11400474800]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels
- console warning: [.WebGL-0x11400474800]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (this message will no longer repeat)

### mobile

Present: `Foundations`, `Tokens`, `Components`, `Patterns`, `Accessibility`, `Guidelines`, `Code / Develop`, `AI Workflows`
Component docs: `component-inputs`, `component-navigation`, `component-feedback`, `component-data-display`, `component-surfaces`, `component-overlays`, `component-ai`
Pattern docs: 

Diagnostics:
- console warning: THREE.Clock: This module has been deprecated. Please use THREE.Timer instead.

## Human review notes

- Desktop: sidebar, hero, character, organic atmosphere, dense cards and all DS sections render after the boot sequence.
- Mobile: content stacks without horizontal overflow; all sections remain reachable after the boot sequence.
- Automated DOM checks cover duplicate IDs, broken hash links, unnamed buttons/links, component category anchors and horizontal overflow.
- Known non-blocking observation: the public art layer is intentionally dark/neon and remains outside the DS token contract.

