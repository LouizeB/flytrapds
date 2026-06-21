# Contribuição — Flytrap DS

## Tokens
- Editar o contrato: `packages/tokens/src/flytrap.tokens.json`.
- O DTCG é a única fonte de primitives, foundations, semantic, component, modes e pares APCA.
- `packages/tokens/build.mjs` é um transformador genérico; decisões visuais não devem ser codificadas nele.
- `dist/flytrap-globals.css` é **gerado** — nunca editar à mão.
- Após mudar tokens: `pnpm tokens && pnpm tokens:contract && pnpm apca`.

## Regras de cor
- Escala 50→950, base 500. Nunca primitive em componente.
- Texto sobre cor só via `on-*` / `*-text`.
- PR com regressão APCA é bloqueado pelo CI.

## Componentes
- Componentes compartilhados vivem em `packages/ui/src/components` e composições AI em `packages/ui/src/ai`.
- Use tokens semânticos (`bg-primary`, `text-muted-foreground`), nunca primitives diretamente.
- Rode o CLI shadcn a partir de um app que contenha `components.json`.
- Exporte componentes públicos em `packages/ui/src/index.ts` e demonstre o uso em `apps/docs`.

### Definition of Done
- Anatomia, variantes, estados e tokens consumidos estão documentados.
- Nenhum componente referencia `primitive.*` ou uma cor fixa.
- `default`, `hover`, `focus`, `disabled` e estados de erro foram avaliados quando aplicáveis.
- Light, dark e vibrant foram verificados.
- Teclado, foco visível, nome acessível e atributos ARIA foram revisados.
- `pnpm lint`, `pnpm typecheck`, `pnpm tokens:contract`, `pnpm apca` e `pnpm build` passam.

## Commits / versão
- Conventional Commits + Changesets (SemVer).
- Token breaking = rename/remoção/mudança que quebra contraste.

## Fluxo de PR
1. Branch a partir de `main`.
2. `pnpm install && pnpm lint && pnpm typecheck && pnpm apca && pnpm build`.
3. Abrir PR → CI (lint·typecheck·apca_gate·build·preview Vercel).
4. Merge após verde + review.
