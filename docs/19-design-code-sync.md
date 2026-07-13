# 20. Sincronização design → código

Este documento corrige uma ambiguidade encontrada na auditoria: o projeto descrevia uma cadeia Figma → Tokens Studio → DTCG, mas ainda não versiona um export real do Tokens Studio nem executa check de drift contra o Figma.

## Fonte de verdade atual

A fonte executável de verdade é:

```text
packages/tokens/src/flytrap.tokens.json
```

Esse arquivo alimenta:

- `packages/tokens/build.mjs`
- `packages/tokens/dist/flytrap-globals.css`
- `packages/tokens/dist/tokens.ts`
- `pnpm tokens:contract`
- `pnpm apca`
- `@flytrap/ui`
- `apps/docs` e `apps/dashboard`

## Processo manual aceito

Até existir export versionado do Tokens Studio, mudanças vindas do Figma seguem este ritual:

1. Registrar a intenção visual no Figma.
2. Atualizar o DTCG em `packages/tokens/src/flytrap.tokens.json`.
3. Rodar `pnpm tokens`.
4. Rodar `pnpm tokens:contract` e `pnpm apca`.
5. Atualizar documentação/ADR quando o significado do token mudar.
6. Se a mudança afetar componentes, adicionar changeset para `@flytrap/tokens` e `@flytrap/ui`.

Esse processo é manual, mas rastreável: toda alteração passa por review Git, CI e histórico de decisão.

## O que ainda não existe

- Export versionado do Tokens Studio.
- Workflow automático que leia Figma e gere DTCG.
- Check de drift comparando Figma com `flytrap.tokens.json`.

## Critério para automatizar

Só considerar a cadeia automatizada quando houver:

- Arquivo exportado do Tokens Studio versionado no repositório.
- Script reprodutível para transformar/exportar tokens para o formato DTCG usado pelo build.
- Check de CI que falhe quando o export e `packages/tokens/src/flytrap.tokens.json` divergirem.
- Responsável por resolver conflitos design↔código antes do merge.

Até lá, documentos devem dizer “processo manual” ou “arquitetura-alvo”, nunca prometer sincronização automática.
