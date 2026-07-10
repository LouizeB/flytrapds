# Governança

## Autoridade

1. DTCG versionado define valores, aliases e dimensões.
2. Gates validam resolução, fronteiras e contraste.
3. Documentação explica intenção e uso.
4. CSS e TypeScript são artefatos gerados.
5. Apps apenas consomem o contrato.

## Alteração segura

```text
necessidade real
  → classificar camada/domínio
  → verificar reuso existente
  → propor nome e dependência
  → atualizar DTCG
  → documentar decisão
  → executar contrato + APCA + build
```

Não edite artefatos em `dist/`. Não copie valores desta pasta para código. Não transforme exemplos consultivos em uma segunda fonte de verdade.

## Gates

```bash
pnpm tokens:contract
pnpm apca
pnpm lint
pnpm typecheck
pnpm build
```
