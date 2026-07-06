# 18. API e qualidade dos componentes

Esta referência complementa o inventário com regras de consumo da Release 0.3.

## Contratos principais

| Família | Componentes | Contrato |
|--|--|--|
| Actions | Button, IconButton | Loading bloqueia interação; icon-only exige nome |
| Forms | Input, Textarea, Select, Checkbox, RadioGroup, Switch | Label, descrição, erro e disabled permanecem explícitos |
| Feedback | Alert, Toast, Skeleton, EmptyState | Escolher persistência conforme a ação exigida |
| Overlays | Dialog, AlertDialog, Popover, Sheet, Tooltip | Foco e fechamento pertencem às primitives |
| Navigation | Sidebar, Header, CommandMenu, Tabs | Estado ativo não depende apenas de cor |
| AI | ChatThread, PromptInput, StreamingMessage, ToolCallBlock, ReasoningStream, HumanApprovalPrompt | Estados assíncronos são visíveis e ações críticas exigem decisão humana |
| Dataviz | Chart | Toda visualização oferece tabela equivalente |
| Brand | BrandMark, BrandLockup, Avatar, AiAvatar | Assets oficiais não são duplicados nos apps |

## Antipadrões

- Usar `Button size="icon"` sem `IconButton` e `label`.
- Abrir Dialog para conteúdo breve que cabe em Popover.
- Usar Toast para erro que exige correção no contexto.
- Transformar Card estático em interação sem semântica de botão ou link.
- Anunciar novamente todo o texto durante streaming.
- Expor cadeia interna do modelo em ReasoningStream.
- Executar ação crítica sem HumanApprovalPrompt.
- Exibir Chart sem estado vazio, erro ou alternativa tabular.
- Copiar logo e avatar para pastas dos apps.

## Matriz de validação

Cada entrega executa:

```bash
pnpm test
pnpm lint
pnpm typecheck
pnpm build
pnpm tokens:contract
pnpm apca
```

Os testes automatizados cobrem componentes fundamentais em light, dark e vibrant. Contraste cromático continua sob responsabilidade do gate APCA, pois jsdom não calcula layout e cor renderizada com fidelidade.
