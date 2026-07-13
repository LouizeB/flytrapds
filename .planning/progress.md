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
- [ ] Conectar o primeiro consumidor real do DS.
- [x] Criar telemetria estática de adoção por componente com `pnpm adoption:report`.
