# Visual audit — Flytrap Stream Studio

Profile: studio
URL: http://127.0.0.1:4174/
Generated: 2026-07-16T21:28:38.204Z

## Summary

| Check | Result |
|--|--|
| Overall | ✅ pass |
| Screenshots | `.planning/screenshots/flytrap-studio-desktop-ready.png`, `.planning/screenshots/flytrap-studio-mobile-ready.png` |

## Viewports

| Viewport | HTTP | Main visible | Loader hidden | Required sections | Component docs | Patterns | Links | Names | Overflow | Blocking errors | Warnings | Screenshot |
|--|--:|--|--|--|--|--|--|--|--|--|--:|--|
| desktop (1440×1200) | 200 | ✅ | ✅ | ✅ 3/3 | ✅ 0/0 | ✅ 0/0 | ✅ 0 | ✅ 0 | ✅ 1440/1440 | ✅ 0 | 0 | `.planning/screenshots/flytrap-studio-desktop-ready.png` |
| mobile (390×1200) | 200 | ✅ | ✅ | ✅ 3/3 | ✅ 0/0 | ✅ 0/0 | ✅ 0 | ✅ 0 | ✅ 390/390 | ✅ 0 | 0 | `.planning/screenshots/flytrap-studio-mobile-ready.png` |

## Required sections

### desktop

Present: `Personalized experience preview`, `Choose the experience`, `Recommendations`
Component docs: None required
Pattern docs: None required

### mobile

Present: `Personalized experience preview`, `Choose the experience`, `Recommendations`
Component docs: None required
Pattern docs: None required

## Human review notes

- Desktop: the initial Experience view keeps mood controls and recommendations visible without exposing advanced details.
- Mobile: the initial view remains stacked and navigable without horizontal overflow.
- Results and AI details are available through explicit navigation controls and are intentionally hidden from the initial view.
- Automated DOM checks cover duplicate IDs, broken hash links, unnamed buttons/links and horizontal overflow.
- Known non-blocking observation: Studio intentionally uses the dark-only Flytrap product shell until a deliberate light mode is designed.

