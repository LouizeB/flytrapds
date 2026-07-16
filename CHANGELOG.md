# Changelog

Formato: Keep a Changelog · SemVer.

## [Unreleased]

### Changed
- Estados disabled do Button agora usam tokens de opacidade rastreáveis em vez de valores utilitários fixos.
- Variantes `ghost` e `link` do Button passam a ter tokens próprios de opacidade disabled.
- CheckboxField, RadioGroupField e SwitchField reforçam alvo efetivo mínimo e estado disabled visual.
- Foco visível global de `@louizeb/flytrap-ui` passa a usar o token `--ring` (validado pelo gate APCA nas três aparências) em vez do valor fixo `#b8ff35` (ADR 16).
- Estilos exclusivos do site público (tema `flytrap-light`, keyframes e texturas "living", fundo do body) migraram de `@louizeb/flytrap-ui` para `apps/docs/src/site.css` — o pacote UI volta a conter apenas estilos do design system.

### Quality
- CI passa a executar a suíte de testes com cobertura (`pnpm test:coverage`), alinhando o pipeline à matriz de validação documentada.

## [0.4.0] — 2026-07-06
### Added
- Navegação e disclosure com Accordion, ScrollArea, Breadcrumb e Pagination.
- Utilitário CopyButton com adaptador de clipboard injetável.
- Observabilidade AI com AgentStatusIndicator, RunTraceTimeline e CostTokenMeter.
- Conversa assistida com SuggestedPrompts e MessageActions.
- Dados operacionais com FilterBar e SmartDataTable.

### Changed
- `@louizeb/flytrap-ui` atualizado para 0.4.0.
- Progress passa a aceitar atributos HTML/ARIA para composições acessíveis.
- Catálogo e inventário passam a documentar a onda P1.

### Quality
- 122 testes com 100% de cobertura em statements, branches, functions e lines.

## [0.3.0] — 2026-07-06
### Added
- Onda foundation com Select, Checkbox, Tabs, Tooltip, Alert, Skeleton, EmptyState, Dialog, AlertDialog, Textarea, RadioGroup, Switch e Separator.
- Overlays e estrutura reutilizável com Popover, Sheet, Toast, Sidebar, Header e CommandMenu.
- Camada AI com StreamingMessage, CitationChip, ToolCallBlock, HumanApprovalPrompt, ReasoningStream, PromptInput e ChatThread.
- Chart compartilhado em line, area e bar, com estados assíncronos e tabela equivalente.
- BrandMark, BrandLockup, Avatar e AiAvatar com os assets oficiais.
- Suíte Vitest, Testing Library e axe, incluindo matriz light, dark e vibrant.
- Tokens de componente para grid, eixos e tooltip de dataviz.

### Changed
- `@louizeb/flytrap-ui` atualizado para 0.3.0.
- Catálogo e dashboard passam a consumir marca e avatar pelo pacote compartilhado.
- Inventário, roadmap e documentação passam a refletir os componentes públicos reais.

### Accessibility
- IconButton exige nome acessível e Button loading anuncia progresso.
- Overlays preservam foco e fechamento por teclado.
- Streaming anuncia somente mudanças de estado.
- ReasoningStream expõe resumo operacional, não cadeia interna do modelo.
- Chart sempre oferece representação tabular dos dados.

## [0.2.0] — 2026-06-22
### Changed
- Migração da UI de Lit Web Components para React 19 e componentes locais orientados por tokens.
- Docs e dashboard reescritos como apps React consumidores de `@louizeb/flytrap-ui`.
- Configuração do gerador de componentes adicionada aos workspaces.
- GitHub Actions separado entre gates de qualidade e publicação do catálogo.

### Added
- Fundação base (`Button`, `Badge`, `Card`, `Input`, `Field`, `Progress`).
- Composições AI (`AgentCard`, `MessageBubble`, `KpiStatCard`, `InsightCallout`).
- Validador estrutural de tokens e matriz APCA light/dark/vibrant.
- Template de anatomia e Definition of Done para componentes.
- Inventário priorizado por fluxos reais, com status, estados e ondas P0/P1/P2.
- Vocabulário iconográfico com aliases semânticos, tokens de tamanho/traço e wrapper acessível.
- Homepage pública do design system e README organizada como portal do projeto.
- GitHub Pages, templates de issue/PR, CODEOWNERS, Dependabot e política de segurança.
- Foundations DTCG para spacing, tipografia, bordas e breakpoints mobile-first.
- Arquitetura explícita de primitives, semantic e component tokens, com taxonomia semântica e dimensões de brand, mode, theme e viewport.
- Contrato compacto de contexto para agentes de IA consumirem o design system sem inventar tokens ou componentes.
- Briefing executável e faseado da experiência pública, com escopo, não objetivos e critérios de aceite da Release 1.

### Fixed
- Build de tokens volta a criar `dist/` em ambientes limpos.
- Build e APCA agora consomem a mesma fonte DTCG, eliminando divergência entre arquivos.
- Preview Vercel gera `@louizeb/flytrap-tokens` antes de compilar o catálogo em clones limpos.

## [0.1.0] — 2026-06-21
### Added
- Monorepo (pnpm + Turborepo), config compartilhada, CI com gate APCA.
- `@louizeb/flytrap-tokens`: primitives HCT (6 ramps, 50→950), build → `flytrap-globals.css` + `tokens.ts`.
- Arquitetura em camadas e dimensões no contrato CSS de runtime.
- Ramps semânticas independentes (success/warning/error) + dataviz `--chart-1..5`.
- Supabase (sa-east-1): tabelas, RLS, pgvector, RPC `match_ds_context`, edge `ai-chat` (RAG + Anthropic).
- Documentação ponta a ponta em `docs/`.

### Changed
- Escala migrada de 0–1000 para 50–950 (claro→escuro).
- Supabase recriado em sa-east-1 (antes us-west-2).
