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
| Label | Required, optional, disabled por peer | P0 | ✅ | Rótulo base para formulários, preserva semântica nativa e marcador obrigatório visual |
| Form + FormField + FormMessage | Hint, error, success, required, ids automáticos | P0 | ✅ | Composição acessível que associa label, mensagens e `aria-invalid` ao controle |
| Input + Field | Default, focus, error, disabled, hint | P0 | ✅ | Usa tokens próprios de background, border, focus, error e placeholder |
| Textarea | Default, focus, error, disabled, limite | P1 | ✅ | Compartilha contrato visual de Input e controla resize |
| Select | Default, open, selected, disabled, error | P0 | ✅ | Primitive Radix com composição Trigger, Content, Group e Item |
| Combobox | Search, empty, controlled, uncontrolled, disabled option | P1 | ✅ | Seleção pesquisável para listas moderadas; mantém `role="combobox"` e listbox associado |
| Checkbox | Default, checked, indeterminate, disabled | P0 | ✅ | Primitive e composição CheckboxField com descrição |
| RadioGroup | Default, selected, disabled | P2 | ✅ | Primitive e composição RadioGroupField com descrição |
| Switch | On, off, disabled | P1 | ✅ | Primitive e composição SwitchField; tema continua sendo ação explícita |
| DatePicker + DatePickerField | Native date, disabled, hint | P1 | ✅ | Controle nativo para datas sem adicionar calendário pesado prematuramente |
| FileUpload | Single, multiple, selected files, description | P1 | ✅ | Entrada de anexos com `input[type=file]` real e anúncio dos arquivos escolhidos |
| SearchField | Idle, typing, clearable, controlled, uncontrolled | P1 | ✅ | Busca de componentes, tokens e contexto com `role="searchbox"` e ação explícita de limpar |
| Slider + SliderField | Range, disabled, value label, hint | P1 | ✅ | Controle nativo para densidade, intensidade, humor e preferências adaptativas |
| PromptInput | Empty, typing, multiline, submitting, disabled, attachment | P0 | ✅ | Enter envia, Shift+Enter quebra linha e composição permanece extensível |

## Botões e ações

| Componente | Variantes e estados | Prioridade | Status | Notas Flytrap |
|--|--|--:|:--:|--|
| Button | Default, secondary, destructive, outline, ghost, link; hover, focus, active, disabled | P0 | ✅ | Estados principais conectados a component tokens e APCA |
| Button loading | Loading, label preservado, progress announcement | P0 | ✅ | `loading` bloqueia interação, mantém o label e anuncia progresso |
| IconButton | Default, hover, focus, disabled | P0 | ✅ | API própria exige `label` e aplica `size="icon"` |
| ButtonGroup | Horizontal, segmented, responsive | P2 | ⬜ | Útil para filtros compactos |
| CopyButton | Idle, copied | P1 | ✅ | Clipboard nativo ou adaptador injetável para código, tokens e snippets |
| HumanApprovalAction | Approve, reject, pending, expired | P1 | ⬜ | Ação crítica de agentes; exige confirmação e rastreabilidade |

## Cards e containers

| Componente | Variantes e estados | Prioridade | Status | Notas Flytrap |
|--|--|--:|:--:|--|
| Card | Header, title, description, content, footer | P0 | ✅ | Container base por composição |
| InteractiveCard | Default, hover, focus, selected, disabled | P1 | ⬜ | Não transformar Card estático em botão sem semântica correta |
| KpiStatCard | Delta up, down, neutral; loading | P0 | ✅ | Dashboard e telemetria de adoção |
| Accordion | Closed, open, disabled | P2 | ✅ | Disclosure nativo com foco visível |
| Tabs | Active, inactive, focus, disabled | P0 | ✅ | Navegação por teclado via Radix |
| Separator | Horizontal, vertical | P2 | ✅ | Decorativo por padrão; aceita semântica quando necessária |
| ScrollArea | Vertical, horizontal | P2 | ✅ | Overflow navegável por teclado para trace, logs e listas extensas |

## Feedback e estado

| Componente | Variantes e estados | Prioridade | Status | Notas Flytrap |
|--|--|--:|:--:|--|
| Badge | Default, secondary, outline, success, warning, destructive | P0 | ✅ | Falta avaliar variantes numérica e dot |
| Progress | Determinate, zero, complete | P0 | ✅ | Indeterminate fica para Skeleton/Spinner |
| Spinner | sm, md, lg; live status | P0 | ✅ | Feedback indeterminado com label acessível e respeito a reduced motion |
| InsightCallout | Info, success, warning | P0 | ✅ | Composição AI para recomendações contextuais |
| Alert | Info, success, warning, error; dismissible | P0 | ✅ | Feedback persistente com papéis semânticos |
| InlineNotification | Info, success, warning, error, action | P1 | ✅ | Feedback contextual dentro da página; erro usa `role="alert"` e demais estados usam `status` |
| Skeleton | Text, avatar, card, chart | P0 | ✅ | Shapes reutilizáveis e respeito a reduced motion |
| EmptyState | No data, no results, first use, action | P0 | ✅ | Composição genérica com ícone, descrição e ação |
| Toast | Success, error, warning, info, action | P1 | ✅ | Primitive Radix; não usar para erros que exigem correção no contexto |
| Tooltip | Default, delayed, side variants | P0 | ✅ | Provider, Trigger e Content via Radix |

## Navegação e estrutura

| Componente | Variantes e estados | Prioridade | Status | Notas Flytrap |
|--|--|--:|:--:|--|
| Sidebar | Expanded, collapsed, mobile, active item | P0 | ✅ | Provider, desktop colapsável, Sheet mobile e menu compartilhados |
| Header | Desktop, mobile, actions | P1 | ✅ | Estrutura composável com Brand, Title e Actions |
| Page + PageHeader | Main, title, description, constrained width | P1 | ✅ | Esqueleto semântico para páginas de produto, docs e dashboards |
| Section + SectionHeader | Landmark section, title, description | P1 | ✅ | Bloco repetível para conteúdo documentado e telas densas |
| Toolbar | Responsive actions, filters, search | P1 | ✅ | Barra de ações com `role="toolbar"` para filtros e comandos de página |
| Breadcrumb | Levels, current page, custom separator | P2 | ✅ | Navegação profunda com semântica nativa |
| Pagination | Previous, pages, next, disabled | P2 | ✅ | Registry, tabelas e logs |
| CommandMenu | Closed, search, groups, empty | P1 | ✅ | Busca, grupos, atalhos e dialog acessível via cmdk |

## Overlays

| Componente | Variantes e estados | Prioridade | Status | Notas Flytrap |
|--|--|--:|:--:|--|
| Dialog | Default, loading, scrollable | P0 | ✅ | Focus trap, fechamento e composição acessível via Radix |
| AlertDialog | Default, destructive, pending | P0 | ✅ | Confirmação dedicada com Action e Cancel |
| Sheet / Drawer | Right, left, bottom/mobile | P1 | ✅ | Dialog responsivo com quatro direções |
| Popover | Default, action, controlled | P2 | ✅ | Conteúdo breve sem bloquear contexto |
| DropdownMenu | Item, checkbox, radio, label, shortcut | P1 | ✅ | Menu de ações via Radix para comandos contextuais e preferências rápidas |

## Documentação e componentes do próprio DS

| Componente | Variantes e estados | Prioridade | Status | Notas Flytrap |
|--|--|--:|:--:|--|
| CodeBlock | Filename, linguagem, modo mínimo | P1 | ✅ | Snippets de uso para docs, guides e páginas de componente |
| TokenSwatch | Nome, valor, descrição | P1 | ✅ | Documenta primitives/semantic/component tokens sem hardcode visual na página |
| ComponentPreview | Título, descrição, preview, código | P1 | ✅ | Bloco base para documentação estilo Carbon/ShadCN com exemplo vivo e snippet |

## AI — Agents

| Componente | Variantes e estados | Prioridade | Status | Notas Flytrap |
|--|--|--:|:--:|--|
| AgentCard | Idle, running, completed, error | P0 | ✅ | Nome, status, modelo, tokens e descrição |
| AgentStatusIndicator | Idle, queued, running, completed, error | P1 | ✅ | API independente com live status e aliases iconográficos |
| ToolCallBlock | Pending, running, success, error, collapsed | P0 | ✅ | Disclosure acessível com entrada, saída, duração e erro seguro |
| ReasoningStream | Streaming, completed, interrupted, collapsed | P0 | ✅ | Expõe resumo operacional seguro, nunca cadeia interna do modelo |
| RunTraceTimeline | Queued, active, success, error | P1 | ✅ | Sequência de eventos, descrições e duração |
| CostTokenMeter | Used, limit, cost | P1 | ✅ | Telemetria clara com limite normalizado, nunca falsa precisão |
| HumanApprovalPrompt | Pending, approved, rejected, expired | P0 | ✅ | Decisão explícita, detalhes e expiração antes de ações críticas |
| AgentConsole | Empty, running, paused, completed, error | P1 | ⬜ | Composição de status, trace, tools, custo e aprovação |

## AI — Chat e RAG

| Componente | Variantes e estados | Prioridade | Status | Notas Flytrap |
|--|--|--:|:--:|--|
| MessageBubble | User, assistant | P0 | ✅ | Tokens próprios por papel |
| StreamingMessage | Streaming, completed, interrupted, retry | P0 | ✅ | Live region anuncia somente o estado, preservando conteúdo parcial |
| ChatThread | Empty, loading history, populated, error | P0 | ✅ | Log composável com estados assíncronos e skeleton |
| PromptInput | Ver seção Inputs | P0 | ✅ | Entrada central exportada pelo pacote UI |
| CitationChip | Default, hover, missing source | P0 | ✅ | Fonte, índice, link externo e estado indisponível acessível |
| InlineToolResult | Loading, success, error, collapsed | P1 | ⬜ | Resultado breve dentro da conversa |
| SuggestedPrompts | Default, selected | P1 | ✅ | Onboarding e empty state do chat |
| MessageActions | Copy, retry, feedback | P1 | ✅ | Ações só aparecem quando disponíveis por mensagem |
| AttachmentPreview | Uploading, ready, error, remove | P2 | ⬜ | Só entra quando o backend aceitar anexos |
| ModelSelector | Default, unavailable, capability hint | P2 | ⬜ | Adiar enquanto a Edge Function tiver um único modelo suportado |

## Dashboard e dataviz

| Componente | Variantes e estados | Prioridade | Status | Notas Flytrap |
|--|--|--:|:--:|--|
| Chart | Area, bar, line; loading, empty, error | P0 | ✅ | Recharts compartilhado com tabela equivalente e tokens próprios |
| ChartTooltip | Keyboard/pointer, series comparison | P1 | ⬜ | Precisa alternativa textual aos dados |
| FilterBar | Search, custom filters, mobile | P1 | ✅ | Composição responsiva para período, squad, produto e componente |
| DashboardShell | Header, filters, content, sidebar | P1 | 🟡 | Estrutura existe no app; ainda específica |
| SmartDataTable | Custom cells, responsive overflow, empty | P1 | ✅ | Adoção, auditorias APCA e component registry |
| AnomalyFlag | Info, warning, critical, acknowledged | P1 | ⬜ | Sinalização de regressões e hardcoded values |
| TrendComparator | Up, down, stable, insufficient data | P2 | ⬜ | Comparação entre períodos |
| AiSummaryPanel | Loading, insight, no insight, error | P1 | 🟡 | InsightCallout cobre parte da necessidade |

## Identidade

| Componente | Variantes e estados | Prioridade | Status | Notas Flytrap |
|--|--|--:|:--:|--|
| BrandMark | 32, 48, 60; informativo ou decorativo | P0 | ✅ | SVG oficial sem recoloração por CSS |
| BrandLockup | Nome e descritor opcional | P0 | ✅ | Evita duplicar o nome acessível do símbolo |
| Avatar | sm, md, lg; image e fallback | P0 | ✅ | Primitive genérica baseada em Radix |
| AiAvatar | online, processing, offline | P0 | ✅ | Avatar oficial com status textual |

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

- [x] Button loading e contrato de IconButton
- [x] Select e Checkbox
- [x] Tabs e Tooltip
- [x] Alert, Skeleton e EmptyState
- [x] Label, FormField, SearchField, Slider, Spinner e InlineNotification
- [x] CodeBlock, TokenSwatch e ComponentPreview para documentação robusta
- [x] Sidebar compartilhada
- [x] Dialog e AlertDialog

### Próxima onda P0 — diferencial Flytrap

- [x] PromptInput e ChatThread
- [x] StreamingMessage e CitationChip
- [x] ReasoningStream
- [x] ToolCallBlock
- [x] HumanApprovalPrompt
- [x] Chart compartilhado com estados loading/empty/error

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
