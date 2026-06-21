# 5. Inventário de componentes

Este inventário conecta estratégia, tokens, implementação e roadmap. Ele parte dos fluxos reais de `apps/docs` e `apps/dashboard` e preserva o diferencial AI-first do Flytrap.

## Como ler

| Campo | Significado |
|--|--|
| Prioridade `P0` | bloqueia a primeira experiência utilizável do DS |
| Prioridade `P1` | completa os fluxos AI e dashboard prioritários |
| Prioridade `P2` | expansão do sistema, sem bloquear o release inicial |
| `✅` | implementado e exportado por `@flytrap/ui` |
| `🟡` | implementação parcial; faltam estados, composição ou validação |
| `⬜` | planejado |

Um componente só muda para `✅` quando atende à [Definition of Done](12-component-anatomy.md), não apenas quando renderiza.

## Inputs e seleção

| Componente | Variantes e estados | Prioridade | Status | Notas Flytrap |
|--|--|--:|:--:|--|
| Input + Field | Default, focus, error, disabled, hint | P0 | ✅ | Usa tokens próprios de background, border, focus, error e placeholder |
| Textarea | Default, focus, error, disabled, limite | P1 | ⬜ | Necessário para prompts longos e formulários |
| Select | Default, open, selected, disabled, error | P0 | ⬜ | Filtros e seleção de contexto; usar Radix Select |
| Checkbox | Default, checked, indeterminate, disabled | P0 | ⬜ | Seleção em tabelas e preferências |
| RadioGroup | Default, selected, disabled | P2 | ⬜ | Usar quando opções forem mutuamente exclusivas e visíveis |
| Switch | On, off, disabled | P1 | ⬜ | Preferências e alternância de recursos; tema continua sendo ação explícita |
| SearchInput | Idle, typing, loading, results, empty | P1 | ⬜ | Busca de componentes e contexto do DS |
| PromptInput | Empty, typing, multiline, submitting, disabled, attachment | P0 | ⬜ | Composição AI; não deve ser apenas um Input genérico |

## Botões e ações

| Componente | Variantes e estados | Prioridade | Status | Notas Flytrap |
|--|--|--:|:--:|--|
| Button | Default, secondary, destructive, outline, ghost, link; hover, focus, active, disabled | P0 | ✅ | Estados principais conectados a component tokens e APCA |
| Button loading | Loading, label preservado, progress announcement | P0 | 🟡 | API e comportamento ainda não implementados |
| IconButton | Default, hover, focus, disabled | P0 | 🟡 | Existe via `Button size="icon"`; falta contrato/documentação próprios |
| ButtonGroup | Horizontal, segmented, responsive | P2 | ⬜ | Útil para filtros compactos |
| CopyButton | Idle, copied, error | P1 | ⬜ | Código, tokens e snippets da documentação |
| HumanApprovalAction | Approve, reject, pending, expired | P1 | ⬜ | Ação crítica de agentes; exige confirmação e rastreabilidade |

## Cards e containers

| Componente | Variantes e estados | Prioridade | Status | Notas Flytrap |
|--|--|--:|:--:|--|
| Card | Header, title, description, content, footer | P0 | ✅ | Container base por composição |
| InteractiveCard | Default, hover, focus, selected, disabled | P1 | ⬜ | Não transformar Card estático em botão sem semântica correta |
| KpiStatCard | Delta up, down, neutral; loading | P0 | ✅ | Dashboard e telemetria de adoção |
| Accordion | Closed, open, disabled | P2 | ⬜ | Documentação técnica extensa |
| Tabs | Active, inactive, focus, disabled | P0 | ⬜ | Navegação do catálogo e painéis de código/preview |
| Separator | Horizontal, vertical | P2 | ⬜ | Preferir bordas de layout quando não houver significado estrutural |
| ScrollArea | Vertical, horizontal, overflow indicators | P2 | ⬜ | Trace, logs e listas extensas |

## Feedback e estado

| Componente | Variantes e estados | Prioridade | Status | Notas Flytrap |
|--|--|--:|:--:|--|
| Badge | Default, secondary, outline, success, warning, destructive | P0 | ✅ | Falta avaliar variantes numérica e dot |
| Progress | Determinate, zero, complete | P0 | ✅ | Indeterminate fica para Skeleton/Spinner |
| InsightCallout | Info, success, warning | P0 | ✅ | Composição AI para recomendações contextuais |
| Alert | Info, success, warning, error; dismissible | P0 | ⬜ | Feedback de sistema, distinto de insight gerado por AI |
| Skeleton | Text, avatar, card, chart | P0 | ⬜ | Evita layout shift nos fluxos RAG e dashboard |
| EmptyState | No data, no results, first use, action | P0 | ⬜ | Obrigatório para listas, busca e agentes |
| Toast / Sonner | Success, error, warning, info, action | P1 | ⬜ | Eventos transitórios; não usar para erros que exigem correção no contexto |
| Tooltip | Default, delayed, side variants | P0 | ⬜ | Obrigatório para icon-only quando o contexto não é evidente |

## Navegação e estrutura

| Componente | Variantes e estados | Prioridade | Status | Notas Flytrap |
|--|--|--:|:--:|--|
| Sidebar | Expanded, collapsed, mobile, active item | P0 | 🟡 | Existe duplicada nos apps; deve virar componente compartilhado |
| Header | Desktop, mobile, actions | P1 | 🟡 | Implementação específica no dashboard |
| Breadcrumb | Two levels, overflow | P2 | ⬜ | Navegação profunda da documentação |
| Pagination | First, previous, next, last, disabled | P2 | ⬜ | Registry, tabelas e logs |
| CommandMenu | Closed, search, groups, empty | P1 | ⬜ | Navegação rápida por componentes e tokens |

## Overlays

| Componente | Variantes e estados | Prioridade | Status | Notas Flytrap |
|--|--|--:|:--:|--|
| Dialog | Default, loading, scrollable | P0 | ⬜ | Base de overlays e formulários focados |
| AlertDialog | Default, destructive, pending | P0 | ⬜ | Confirmação de ações irreversíveis |
| Sheet / Drawer | Right, left, bottom/mobile | P1 | ⬜ | Sidebar mobile e detalhes de agentes |
| Popover | Default, action, controlled | P2 | ⬜ | Conteúdo breve sem bloquear contexto |

## AI — Agents

| Componente | Variantes e estados | Prioridade | Status | Notas Flytrap |
|--|--|--:|:--:|--|
| AgentCard | Idle, running, completed, error | P0 | ✅ | Nome, status, modelo, tokens e descrição |
| AgentStatus | Idle, queued, running, paused, completed, error | P1 | 🟡 | Parte interna do AgentCard; falta API independente |
| ToolCallBlock | Pending, running, success, error, collapsed | P0 | ⬜ | Nome da tool, input/output, duração e erro seguro |
| ReasoningStream | Streaming, completed, interrupted, collapsed | P0 | ⬜ | Deve evitar expor conteúdo sensível de raciocínio interno |
| RunTraceTimeline | Queued, active, success, error, skipped | P1 | ⬜ | Sequência de eventos e tools |
| CostTokenMeter | Input, output, cached, cost, budget warning | P1 | ⬜ | Telemetria clara, nunca falsa precisão |
| HumanApprovalPrompt | Pending, approved, rejected, expired | P0 | ⬜ | Interrupção segura antes de ações críticas |
| AgentConsole | Empty, running, paused, completed, error | P1 | ⬜ | Composição de status, trace, tools, custo e aprovação |

## AI — Chat e RAG

| Componente | Variantes e estados | Prioridade | Status | Notas Flytrap |
|--|--|--:|:--:|--|
| MessageBubble | User, assistant | P0 | ✅ | Tokens próprios por papel |
| StreamingMessage | Streaming, completed, interrupted, retry | P0 | ⬜ | Anúncios acessíveis sem reanunciar toda a mensagem |
| ChatThread | Empty, loading history, populated, error | P0 | 🟡 | Composição existe no app, ainda não no pacote UI |
| PromptInput | Ver seção Inputs | P0 | ⬜ | Entrada central do AI playground |
| CitationChip | Default, hover, missing source | P0 | ⬜ | Fonte, índice, link e título acessível |
| InlineToolResult | Loading, success, error, collapsed | P1 | ⬜ | Resultado breve dentro da conversa |
| SuggestedPrompts | Default, selected, hidden | P1 | ⬜ | Onboarding e empty state do chat |
| MessageActions | Copy, retry, feedback | P1 | ⬜ | Ações só aparecem quando disponíveis por mensagem |
| AttachmentPreview | Uploading, ready, error, remove | P2 | ⬜ | Só entra quando o backend aceitar anexos |
| ModelSelector | Default, unavailable, capability hint | P2 | ⬜ | Adiar enquanto a Edge Function tiver um único modelo suportado |

## Dashboard e dataviz

| Componente | Variantes e estados | Prioridade | Status | Notas Flytrap |
|--|--|--:|:--:|--|
| Chart | Area, bar, line; loading, empty, error | P0 | 🟡 | Protótipo existe no app; falta Recharts compartilhado e API acessível |
| ChartTooltip | Keyboard/pointer, series comparison | P1 | ⬜ | Precisa alternativa textual aos dados |
| FilterBar | Default, active filters, clear all, mobile | P1 | ⬜ | Período, squad, produto e componente |
| DashboardShell | Header, filters, content, sidebar | P1 | 🟡 | Estrutura existe no app; ainda específica |
| SmartDataTable | Sort, filter, select, loading, empty, error | P1 | ⬜ | Adoção, auditorias APCA e component registry |
| AnomalyFlag | Info, warning, critical, acknowledged | P1 | ⬜ | Sinalização de regressões e hardcoded values |
| TrendComparator | Up, down, stable, insufficient data | P2 | ⬜ | Comparação entre períodos |
| AiSummaryPanel | Loading, insight, no insight, error | P1 | 🟡 | InsightCallout cobre parte da necessidade |

## Resumo do MVP

### Já disponível

- [x] Button e variantes principais
- [x] Input + Field
- [x] Card
- [x] Badge
- [x] Progress
- [x] KpiStatCard
- [x] InsightCallout
- [x] AgentCard
- [x] MessageBubble

### Próxima onda P0 — foundation

- [ ] Button loading e contrato de IconButton
- [ ] Select e Checkbox
- [ ] Tabs e Tooltip
- [ ] Alert, Skeleton e EmptyState
- [ ] Sidebar compartilhada
- [ ] Dialog e AlertDialog

### Próxima onda P0 — diferencial Flytrap

- [ ] PromptInput e ChatThread
- [ ] StreamingMessage e CitationChip
- [ ] ToolCallBlock e ReasoningStream
- [ ] HumanApprovalPrompt
- [ ] Chart compartilhado com estados loading/empty/error

## Regras de implementação

- Componentes compartilhados ficam em `packages/ui`; composição específica de página permanece no app.
- Usar primitives diretamente é proibido. Componentes estratégicos recebem component tokens; os demais consomem semantic tokens.
- Gerar componentes-base a partir de um app com `components.json`; revisar o código antes de exportar.
- Não criar um componente AI quando uma composição acessível de primitives resolver o problema.
- Ícones usam `FlytrapIcon` e o vocabulário semântico Flytrap; emojis não fazem parte da UI de produto.
- Loading, empty e error fazem parte do componente, não são acabamento posterior.
- Toda API pública deve aparecer no catálogo de `apps/docs`.

## Checklist de validação do inventário

- [x] Fluxos atuais de docs, dashboard, agents e playground mapeados.
- [x] Estados loading, empty e error identificados nos fluxos assíncronos.
- [x] Componentes P0/P1/P2 separados.
- [x] Itens já implementados confrontados com os exports reais de `@flytrap/ui`.
- [ ] Inventário confrontado com os componentes e variables do Figma.
- [ ] P0 validado com usuários/consumidores do design system.
- [ ] Cada P0 transformado em issue com critérios da Definition of Done.
