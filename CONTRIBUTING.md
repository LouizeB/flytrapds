# Contribuição — Flytrap DS

## Tokens
- Editar **valores**: `packages/tokens/src/primitives/<brand>.json`.
- Mapeamento semantic/component: `packages/tokens/build.mjs`.
- `dist/flytrap-globals.css` é **gerado** — nunca editar à mão.
- Após mudar cor: `pnpm tokens && pnpm apca`.

## Regras de cor
- Escala 50→950, base 500. Nunca primitive em componente.
- Texto sobre cor só via `on-*` / `*-text`.
- PR com regressão APCA é bloqueado pelo CI.

## Commits / versão
- Conventional Commits + Changesets (SemVer).
- Token breaking = rename/remoção/mudança que quebra contraste.

## Fluxo de PR
1. Branch a partir de `main`.
2. `pnpm install && pnpm tokens && pnpm apca && pnpm build`.
3. Abrir PR → CI (lint·typecheck·apca_gate·build·preview Vercel).
4. Merge após verde + review.
