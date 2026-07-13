# 19. Distribuição e versionamento

Este documento fecha a decisão da Fase 2 da auditoria: o Flytrap DS deve poder ser consumido fora do monorepo sem exigir que o produto consumidor compile `.tsx` cru.

## Estado atual

`@flytrap/ui` é publish-ready, mas a publicação continua manual até existir um release owner.

- Entrada pública: `@flytrap/ui`
- CSS: `@flytrap/ui/styles`
- Assets oficiais: `@flytrap/ui/assets/*`
- Build: `pnpm --filter @flytrap/ui build`
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

Até a primeira publicação npm real, `pnpm release` deve ser executado apenas por quem tiver permissão de publicação e depois de CI verde em `main`.

## Relação tokens/UI

Quando um token de componente é adicionado, removido ou muda de intenção, `@flytrap/tokens` e `@flytrap/ui` devem receber changesets coordenados. Correções internas sem mudança de contrato podem versionar apenas o pacote afetado.
