# 19. Distribuição e versionamento

Este documento fecha a decisão da Fase 2 da auditoria: o Flytrap DS deve poder ser consumido fora do monorepo sem exigir que o produto consumidor compile `.tsx` cru.

## Estado atual

Os pacotes públicos são mantidos pela conta npm `louizeb`. A primeira release foi publicada e validada em uma instalação limpa fora do monorepo.

- UI: `@louizeb/flytrap-ui@0.5.0`
- Tokens: `@louizeb/flytrap-tokens@0.2.0`
- Entrada pública: `@louizeb/flytrap-ui`
- CSS: `@louizeb/flytrap-ui/styles`
- Assets oficiais: `@louizeb/flytrap-ui/assets/*`
- Build: `pnpm --filter @louizeb/flytrap-ui build`
- Versionamento: Changesets

Durante desenvolvimento local, `apps/docs` e `apps/dashboard` usam aliases Vite para `packages/ui/src`. Isso preserva hot reload e evita exigir `dist` antes de rodar `pnpm dev`.

## Contrato do pacote

O pacote publicado deve conter apenas `dist`:

```text
dist/
├── index.js / index.d.ts
├── components/*.js / *.d.ts
├── ai/*.js / *.d.ts
├── lib/*.js / *.d.ts
├── styles/globals.css
└── assets/*
```

Consumidores externos devem importar pelo barrel principal ou subpaths declarados no `exports`; imports diretos de `src` não fazem parte do contrato.

## Release

Toda alteração que mude tokens, API pública ou comportamento visual relevante deve criar um changeset:

```bash
pnpm changeset
pnpm version-packages
pnpm release
```

`pnpm release` deve ser executado pela conta owner, com 2FA, depois de CI verde em `main`. A primeira publicação pública e o consumo dos exports do registry foram validados; a adoção contínua em um produto real permanece como próxima etapa.

## Relação tokens/UI

Quando um token de componente é adicionado, removido ou muda de intenção, `@louizeb/flytrap-tokens` e `@louizeb/flytrap-ui` devem receber changesets coordenados. Correções internas sem mudança de contrato podem versionar apenas o pacote afetado.
