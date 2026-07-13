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

- [ ] Decidir com design se o lima entra na escala oficial HCT ou continua exclusivamente como arte pública.
- [ ] Rodar uma publicação dry-run quando houver conta npm/release owner definido.
- [ ] Capturar screenshot/auditoria visual da página pública após merge.

## Fase 3 — Próxima onda

- [ ] Materializar Figma → DTCG com export versionado ou ajustar a documentação para o processo manual real.
- [ ] Conectar o primeiro consumidor real do DS.
- [ ] Criar telemetria de adoção por componente.
