# 5. Inventário de componentes

Base: shadcn/ui (58) + charts (recharts) via Tailwind + tokens. Camada AI por composição.

## Base shadcn (58)
accordion, alert, alert-dialog, aspect-ratio, avatar, badge, breadcrumb, button, button-group, calendar, card, carousel, chart, checkbox, collapsible, combobox, command, context-menu, data-table, date-picker, dialog, drawer, dropdown-menu, empty, field, hover-card, input, input-group, input-otp, item, kbd, label, menubar, native-select, navigation-menu, pagination, popover, progress, radio-group, resizable, scroll-area, select, separator, sheet, sidebar, skeleton, slider, sonner, spinner, switch, table, tabs, textarea, toast, toggle, toggle-group, tooltip, typography.

Instalar: `npx shadcn@latest add <componente>`.

## Charts (recharts, `--chart-1..5`)
Area · Bar · Line · Pie · Radar · Radial · Tooltip.

## Camada AI (composição)
**Agents:** AgentCard, AgentStatus, RunTraceTimeline, ToolCallBlock, ReasoningStream, CapabilityRadar, CostTokenMeter, HumanApprovalPrompt, CitationChip, AgentConsole.
**Chat:** ChatThread, MessageBubble, StreamingMessage, PromptInput, SuggestedPrompts, ModelSelector, MessageActions, AttachmentPreview, InlineToolResult, InlineCitation.
**Dashboards:** KpiStatCard, ChartCard, AiInsightCallout, AnomalyFlag, FilterBar, SmartDataTable, AiSummaryPanel, DashboardShell, TrendComparator.

Tokens AI: `--ai-agent-*`, `--ai-thinking`, `--ai-tool-bg`, `--ai-stream-shimmer`, `--ai-citation`, e camada component (`--agent-card-*`, `--chat-bubble-*`, `--kpi-*`).

## Blocks de partida
`dashboard-01`, `sidebar-*`, `chart-area-interactive`.
