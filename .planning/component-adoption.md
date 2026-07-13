# Component adoption snapshot

Static scan of `@flytrap/ui` named imports in `apps/**`.

## Summary

- Total named imports: 77
- Unique exports adopted: 48
- Files importing UI: 5
- Files importing styles: 2

## Exports

| Export | Count | Files |
|--|--:|--|
| `Button` | 5 | `apps/dashboard/src/main.tsx`, `apps/docs/src/living/hero.tsx`, `apps/docs/src/living/panels.tsx`, `apps/docs/src/main.tsx` |
| `FlytrapIcon` | 5 | `apps/dashboard/src/main.tsx`, `apps/docs/src/living/hero.tsx`, `apps/docs/src/living/panels.tsx`, `apps/docs/src/living/sidebar.tsx`, `apps/docs/src/main.tsx` |
| `AgentIcon` | 3 | `apps/dashboard/src/main.tsx`, `apps/docs/src/living/sidebar.tsx`, `apps/docs/src/main.tsx` |
| `AiAccentIcon` | 3 | `apps/docs/src/living/hero.tsx`, `apps/docs/src/living/sidebar.tsx`, `apps/docs/src/main.tsx` |
| `BrandIcon` | 3 | `apps/docs/src/living/hero.tsx`, `apps/docs/src/living/sidebar.tsx`, `apps/docs/src/main.tsx` |
| `DashboardIcon` | 3 | `apps/dashboard/src/main.tsx`, `apps/docs/src/living/sidebar.tsx`, `apps/docs/src/main.tsx` |
| `FlytrapIconComponent` | 3 | `apps/docs/src/living/hero.tsx`, `apps/docs/src/living/panels.tsx`, `apps/docs/src/living/sidebar.tsx` |
| `SendIcon` | 3 | `apps/dashboard/src/main.tsx`, `apps/docs/src/living/hero.tsx`, `apps/docs/src/main.tsx` |
| `ApprovalIcon` | 2 | `apps/docs/src/living/sidebar.tsx`, `apps/docs/src/main.tsx` |
| `Card` | 2 | `apps/dashboard/src/main.tsx`, `apps/docs/src/main.tsx` |
| `CardContent` | 2 | `apps/dashboard/src/main.tsx`, `apps/docs/src/main.tsx` |
| `CardDescription` | 2 | `apps/dashboard/src/main.tsx`, `apps/docs/src/main.tsx` |
| `CardHeader` | 2 | `apps/dashboard/src/main.tsx`, `apps/docs/src/main.tsx` |
| `CardTitle` | 2 | `apps/dashboard/src/main.tsx`, `apps/docs/src/main.tsx` |
| `ChartIcon` | 2 | `apps/docs/src/living/sidebar.tsx`, `apps/docs/src/main.tsx` |
| `InsightIcon` | 2 | `apps/docs/src/living/sidebar.tsx`, `apps/docs/src/main.tsx` |
| `ToolIcon` | 2 | `apps/docs/src/living/sidebar.tsx`, `apps/docs/src/main.tsx` |
| `AgentCard` | 1 | `apps/dashboard/src/main.tsx` |
| `Badge` | 1 | `apps/docs/src/main.tsx` |
| `BrandLockup` | 1 | `apps/dashboard/src/main.tsx` |
| `BrandMark` | 1 | `apps/docs/src/living/sidebar.tsx` |
| `ConfirmIcon` | 1 | `apps/docs/src/living/panels.tsx` |
| `CopyIcon` | 1 | `apps/docs/src/living/panels.tsx` |
| `Dialog` | 1 | `apps/docs/src/main.tsx` |
| `DialogContent` | 1 | `apps/docs/src/main.tsx` |
| `DialogDescription` | 1 | `apps/docs/src/main.tsx` |
| `DialogFooter` | 1 | `apps/docs/src/main.tsx` |
| `DialogHeader` | 1 | `apps/docs/src/main.tsx` |
| `DialogTitle` | 1 | `apps/docs/src/main.tsx` |
| `DialogTrigger` | 1 | `apps/docs/src/main.tsx` |
| `ErrorIcon` | 1 | `apps/docs/src/main.tsx` |
| `ExternalLinkIcon` | 1 | `apps/docs/src/living/hero.tsx` |
| `Field` | 1 | `apps/docs/src/main.tsx` |
| `InfoIcon` | 1 | `apps/docs/src/living/sidebar.tsx` |
| `Input` | 1 | `apps/docs/src/main.tsx` |
| `InsightCallout` | 1 | `apps/dashboard/src/main.tsx` |
| `KpiStatCard` | 1 | `apps/dashboard/src/main.tsx` |
| `MenuIcon` | 1 | `apps/docs/src/main.tsx` |
| `MessageBubble` | 1 | `apps/dashboard/src/main.tsx` |
| `PlaygroundIcon` | 1 | `apps/dashboard/src/main.tsx` |
| `Progress` | 1 | `apps/docs/src/main.tsx` |
| `SearchIcon` | 1 | `apps/docs/src/main.tsx` |
| `SmartDataTable` | 1 | `apps/docs/src/main.tsx` |
| `SuccessIcon` | 1 | `apps/docs/src/main.tsx` |
| `Switch` | 1 | `apps/docs/src/living/sidebar.tsx` |
| `SwitchField` | 1 | `apps/docs/src/main.tsx` |
| `ThemeDarkIcon` | 1 | `apps/dashboard/src/main.tsx` |
| `ThemeLightIcon` | 1 | `apps/dashboard/src/main.tsx` |

## Files

| File | Exports |
|--|--|
| `apps/dashboard/src/main.tsx` | `AgentCard`, `AgentIcon`, `BrandLockup`, `Button`, `Card`, `CardContent`, `CardDescription`, `CardHeader`, `CardTitle`, `DashboardIcon`, `FlytrapIcon`, `InsightCallout`, `KpiStatCard`, `MessageBubble`, `PlaygroundIcon`, `SendIcon`, `ThemeDarkIcon`, `ThemeLightIcon` |
| `apps/docs/src/living/hero.tsx` | `AiAccentIcon`, `BrandIcon`, `Button`, `ExternalLinkIcon`, `FlytrapIcon`, `FlytrapIconComponent`, `SendIcon` |
| `apps/docs/src/living/panels.tsx` | `Button`, `ConfirmIcon`, `CopyIcon`, `FlytrapIcon`, `FlytrapIconComponent` |
| `apps/docs/src/living/sidebar.tsx` | `AgentIcon`, `AiAccentIcon`, `ApprovalIcon`, `BrandIcon`, `BrandMark`, `ChartIcon`, `DashboardIcon`, `FlytrapIcon`, `FlytrapIconComponent`, `InfoIcon`, `InsightIcon`, `Switch`, `ToolIcon` |
| `apps/docs/src/main.tsx` | `AgentIcon`, `AiAccentIcon`, `ApprovalIcon`, `Badge`, `BrandIcon`, `Button`, `Card`, `CardContent`, `CardDescription`, `CardHeader`, `CardTitle`, `ChartIcon`, `DashboardIcon`, `Dialog`, `DialogContent`, `DialogDescription`, `DialogFooter`, `DialogHeader`, `DialogTitle`, `DialogTrigger`, `ErrorIcon`, `Field`, `FlytrapIcon`, `Input`, `InsightIcon`, `MenuIcon`, `Progress`, `SearchIcon`, `SendIcon`, `SmartDataTable`, `SuccessIcon`, `SwitchField`, `ToolIcon` |
