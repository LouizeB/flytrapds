# Progress — Auditoria Flytrap DS

Fonte de verdade para retomar a evolução pós-auditoria.

## Fase 1 — Fechar brechas de confiança

- [x] CI executa `pnpm test:coverage`.
- [x] Foco global usa `var(--ring)` validado por APCA.
- [x] Lima `#b8ff35` foi removido do pacote UI e confinado à camada artística pública.

## Fase 2 — Coerência da vitrine e distribuição

- [x] Fronteira da camada artística pública documentada em ADR 16.
- [x] Fronteira da camada artística pública verificada por `pnpm art:contract`.
- [x] `Button` usa tokens de componente também em `outline`, `ghost` e `link`.
- [x] `@flytrap/ui` deixa de ser privado e passa a publicar `dist`.
- [x] Apps locais preservam consumo por `src` via aliases Vite.
- [x] Changesets configurado para versionamento coordenado tokens/UI.

## Fase 2 — Pendências recomendadas

- [x] Decidir com design se o lima entra na escala oficial HCT ou continua exclusivamente como arte pública. Decisão: manter como arte pública; `#b8ff35` passa em dark/vibrant, mas falha no light (`Lc=0` contra superfícies claras), então não entra como token oficial do DS agora.
- [x] Rodar uma publicação dry-run quando houver conta npm/release owner definido. Validado com `npm pack --dry-run` em `packages/ui`; pacote contém `dist`, CSS e assets, sem publicação real.
- [x] Capturar screenshot/auditoria visual da página pública após merge. Validado por `pnpm visual:audit` em desktop 1440×1200 e mobile 390×1200 contra `https://louizeb.github.io/flytrapds/`; screenshots gerados localmente em `.planning/screenshots/` e relatório em `.planning/visual-audit.md`.

## Fase 3 — Próxima onda

- [x] Ajustar a documentação Figma → DTCG para refletir o processo manual real.
- [x] Iniciar onda de robustez Carbon/ShadCN com `Label`, `Form`, `FormField`, `FormMessage`, `SearchField`, `Slider`, `Spinner`, `InlineNotification`, `CodeBlock`, `TokenSwatch` e `ComponentPreview` em `@flytrap/ui`.
- [x] Seguir onda de robustez com `DropdownMenu`, `Combobox`, `DatePicker`, `FileUpload`, `Page`, `Section` e `Toolbar` em `@flytrap/ui`.
- [x] Adicionar onda estrutural com `Container`, `Stack`, `Grid`, `ButtonGroup`, `InteractiveCard`, `DataList`, `StatusIndicator`, `Timeline` e `TreeView`.
- [x] Adicionar onda Flytrap streaming/IA com `MoodSignal`, `MoodSelector`, `MediaCard`, `RecommendationRail`, `PlayerControls`, `ModelConfidence` e `PersonalizationPanel`.
- [x] Criar guia de documentação por categoria com uso, anatomia, estados, acessibilidade, tokens e exemplos para `Inputs`, `Navigation`, `Feedback`, `Data display`, `Surfaces`, `Overlays` e `AI / Streaming`.
- [x] Fortalecer `pnpm visual:audit` com checks de anchors de categorias, links internos quebrados, IDs duplicados, nomes acessíveis em botões/links e overflow horizontal.
- [x] Transformar `apps/dashboard` em consumidor interno robusto do DS, exercitando 50 exports de `@flytrap/ui` em uma superfície operacional real de health, release, adoption e AI workflow.
- [x] Conectar o primeiro consumidor real do DS com `apps/studio`, uma superfície de produto para streaming gerenciado por IA e recomendações moldadas por humor.
- [x] Criar telemetria estática de adoção por componente com `pnpm adoption:report`.
- [x] Otimizar o bundle do `apps/studio`, separando a camada de charts/Recharts em chunk dedicado (`index` ~275 kB; `charts` ~405 kB).
- [x] Adicionar auditoria visual local do `apps/studio` com `pnpm studio:visual:audit`, cobrindo desktop/mobile, landmarks, seções, links, nomes acessíveis e overflow.
- [x] Tornar `apps/studio` interativo com mood reshaping, seleção de mídia, player state, aprovação humana e histórico local do assistant console.
- [x] Documentar o padrão `AI-managed streaming flow` na seção `Patterns`, conectando `apps/studio` ao contrato oficial do DS.
- [x] Expandir `Patterns` para uma biblioteca inicial com anchors para `AI-managed streaming`, `Dashboard layout` e `Release readiness`.
- [x] Atualizar overview, roadmap e contrato histórico da experiência pública para refletir deploy, consumidores reais, auditoria visual e evolução da página viva.
- [x] Aprofundar a Pattern Library com problema, anatomia, acessibilidade, evidência e componentes usados por pattern.
- [x] Criar `docs/20-pattern-library.md` como contrato textual dos patterns e conectar a seção pública ao guia.
- [x] Adicionar exemplos de implementação e checklists visuais para cada pattern na página pública do DS.
- [x] Criar a primeira camada de Memory Search local com índice allowlist, busca ranqueada e fontes explícitas.
- [x] Adicionar Memory Chat local, sem chamada de modelo, respondendo apenas a partir do índice com fontes citadas.
- [x] Adicionar provider opcional para Ollama atrás de env flag, preservando fallback source-backed no site público.
- [x] Documentar configuração local do Memory Chat com Ollama e regras de fallback.
- [x] Adicionar testes do Memory Search/Chat cobrindo ranking, resposta source-backed, provider Ollama e fallback.
- [x] Adicionar controle explícito de provider em dev/Ollama e expandir o índice de memória com categorias de tokens, forms, navegação, dados, overlays e AI/Streaming.
- [x] Tornar estados do Memory Chat visíveis: confiança, provider, fonte ausente, fallback Ollama e prompts sugeridos.
- [x] Fechar ciclo de fonte ausente com request template/issue e relatório automatizado `pnpm memory:report` para candidatos do índice.
- [x] Promover primeiro lote de candidatos do `memory:report` para o índice real: overview, multibrand, pipeline, design-code sync, API quality, iconografia, brand assets e Memory/Ollama.
- [x] Promover docs restantes do `memory:report` para o índice real: color scale, Supabase, secrets, links do projeto, ADRs, roadmap, experiência pública e README; docs não indexadas agora são 0.
- [x] Promover primeiro lote de componentes individuais para o Memory Chat: Alert, InlineNotification, Avatar, BrandMark, Badge, ButtonGroup, Card, CodeBlock, Combobox, DataList, DatePicker, Dialog, DropdownMenu, EmptyState e FileUpload; fontes indexadas agora são 41 e candidatos UI/AI/chart pendentes caíram para 60.
- [x] Promover segundo lote de componentes individuais para o Memory Chat: Accordion, Breadcrumb, Checkbox, CommandMenu, ComponentPreview, CopyButton, FilterBar, Form, Header, Input, InteractiveCard, Label, Layout, MediaCard, ModelConfidence, MoodSelector, MoodSignal, Page, Pagination, PersonalizationPanel, PlayerControls, Popover, Progress, RadioGroup, RecommendationRail, ScrollArea, Select, Separator, Sheet e Sidebar; fontes indexadas agora são 71 e candidatos UI/AI/chart pendentes caíram para 30.
- [x] Promover lote final do `memory:report`: Skeleton, Slider, SmartDataTable, Spinner, StatusIndicator, Switch, Tabs, Textarea, Timeline, Toast, TokenSwatch, Tooltip, TreeView, componentes AI primitives e Chart; fontes indexadas agora são 101, IDs são 107 e candidatos diretos docs/UI/AI/chart pendentes são 0.
- [x] Transformar Memory Chat em base viva com `pnpm memory:generate`, índice gerado em `generated-memory-index.ts`, `memory:report` integrado ao gerador e ranking semântico ponderado; o relatório agora mostra 101 fontes, 207 IDs, 0 duplicados e backlog direto zerado.
- [x] Aprofundar chunks gerados do Memory Chat: docs agora geram chunks por seção e componentes geram overview/API/comportamento quando há props, exports, variantes, estados ou tokens detectáveis; o relatório agora mostra 101 fontes, 468 IDs, 361 chunks gerados, 0 duplicados e backlog direto zerado.
- [x] Adicionar extração de exemplos e comentários TypeScript ao Memory Chat: docs agora geram chunks de code fences, componentes podem gerar chunks de prop descriptions e snippets de uso a partir da API real; `Button` recebeu JSDoc piloto para `asChild`, `loading`, `loadingAnnouncement`, `icon` e `label`; o relatório agora mostra 101 fontes, 494 IDs, 387 chunks gerados, 0 duplicados e backlog direto zerado.
