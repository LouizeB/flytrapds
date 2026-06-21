# 5. Inventário de componentes

Lit Web Components nativos (Custom Elements + Shadow DOM) + charts SVG + camada AI. Framework-agnostic e responsivos.

## Base (`ft-*`)
`ft-button`, `ft-card`, `ft-badge`, `ft-input`, `ft-separator`, `ft-avatar`, `ft-progress`, `ft-tabs`, `ft-tooltip`, `ft-switch`, `ft-skeleton`.

Uso: `<ft-button variant="default">Click</ft-button>`.

## Charts (`ft-chart`)
SVG nativo com tipos: bar · line · area · pie. Tooltips interativos. Usa tokens `--chart-1..5`.

## Camada AI (composição)
**Agents:** `ft-agent-card`, `ft-tool-call-block`, `ft-reasoning-stream`, `ft-cost-token-meter`.
**Chat:** `ft-chat-thread`, `ft-message-bubble`, `ft-prompt-input`, `ft-model-selector`, `ft-citation-chip`.
**Dashboards:** `ft-kpi-stat-card`, `ft-ai-insight-callout`, `ft-dashboard-shell`, `ft-filter-bar`.

Tokens AI: `--ai-agent-*`, `--ai-thinking`, `--ai-tool-bg`, `--ai-stream-shimmer`, `--ai-citation`, e camada component (`--agent-card-*`, `--chat-bubble-*`, `--kpi-*`).

## Storybook
`pnpm -F @flytrap/ui storybook` — documentação interativa dos componentes.
