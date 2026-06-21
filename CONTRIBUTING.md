# Contribuição — Flytrap DS

## Documentação para design e desenvolvimento

- Explique primeiro a intenção e depois a implementação.
- Use os mesmos nomes de tokens, variantes e estados no Figma, na documentação e no código.
- Toda proposta de componente deve incluir anatomia e comportamento para Product Design, além de API e validação para Development.
- Prefira linguagem direta, exemplos pequenos e links para aprofundamento; não presuma conhecimento de terminal para leitores de design.
- Expanda o glossário no próprio documento quando um termo técnico for inevitável.

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
3. Abrir PR → workflow Quality (tokens·APCA·lint·typecheck·build).
4. Merge após verde + review.

Merges em `main` publicam `apps/docs` no GitHub Pages pelo workflow Pages. Previews e dashboard permanecem no Vercel.
