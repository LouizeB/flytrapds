# Visual audit — Flytrap Stream Studio

Profile: studio
URL: http://127.0.0.1:4174/
Generated: 2026-07-14T20:35:34.402Z

## Summary

| Check | Result |
|--|--|
| Overall | ✅ pass |
| Screenshots | `.planning/screenshots/flytrap-studio-desktop-ready.png`, `.planning/screenshots/flytrap-studio-mobile-ready.png` |

## Viewports

| Viewport | HTTP | Main visible | Loader hidden | Required sections | Component docs | Links | Names | Overflow | Blocking errors | Warnings | Screenshot |
|--|--:|--|--|--|--|--|--|--|--|--:|--|
| desktop (1440×1200) | 200 | ✅ | ✅ | ✅ 6/6 | ✅ 0/0 | ✅ 0 | ✅ 0 | ✅ 1440/1440 | ✅ 0 | 0 | `.planning/screenshots/flytrap-studio-desktop-ready.png` |
| mobile (390×1200) | 200 | ✅ | ✅ | ✅ 6/6 | ✅ 0/0 | ✅ 0 | ✅ 0 | ✅ 390/390 | ✅ 0 | 0 | `.planning/screenshots/flytrap-studio-mobile-ready.png` |

## Required sections

### desktop

Present: `AI-managed streaming studio`, `Mood-shaped experience`, `Adaptive queue`, `Viewer signals`, `AI workflow`, `Assistant console`
Component docs: 

### mobile

Present: `AI-managed streaming studio`, `Mood-shaped experience`, `Adaptive queue`, `Viewer signals`, `AI workflow`, `Assistant console`
Component docs: 

## Human review notes

- Desktop: the product consumer renders a complete streaming workflow with mood controls, queue, signals, agent trace and assistant console.
- Mobile: content should remain stacked and navigable without horizontal overflow.
- Automated DOM checks cover duplicate IDs, broken hash links, unnamed buttons/links and horizontal overflow.
- Known non-blocking observation: Studio intentionally uses the dark-only Flytrap product shell until a deliberate light mode is designed.

