# Flytrap DS

Design system multibrand com Web Components nativos (Lit) e gate de acessibilidade APCA.
Arquitetura: **3 camadas (primitive · semantic · component) × 3 dimensões (brand · mode · theme)**.

## Recursos
- Figma project `65368906`
- GitHub `LouizeB/flytrapds` (público)
- Vercel `louizebs-projects/flytrapds`
- Supabase `qwzyhgexhcnzzkluztmg`

## Estrutura
- `packages/tokens` — primitives (HCT) → `flytrap-globals.css` + `tokens.ts` (Style build) + gate APCA
- `packages/config` — preset compartilhado
- `packages/ui` — Lit Web Components: base + charts + camada AI + Storybook (M2)
- `apps/docs` — documentação interativa (Vite) (M4)
- `apps/dashboard` — dashboard + AI playground (Vite) (M4)
- `supabase/` — schema + edge functions (M3)

## Comandos
```bash
pnpm install
pnpm tokens     # build de tokens → dist/flytrap-globals.css
pnpm apca       # gate de contraste APCA (falha se regressão)
pnpm build      # turbo build
```

## Tokens — fonte de verdade
- Editar **valores**: `packages/tokens/src/primitives/<brand>.json`
- Mapeamento semantic/component/@theme: `packages/tokens/build.mjs`
- `dist/flytrap-globals.css` é **gerado** (não editar à mão)
- Adicionar brand: novo `src/primitives/<brand>.json` → `pnpm tokens` → `pnpm apca`

## Acessibilidade
APCA por papel: body 75 · ui 60 · large/nontext 45. CI bloqueia PR com regressão.

## Documentação
Documentação completa em [`docs/`](docs/README.md): visão geral, arquitetura de tokens, escala de cores, acessibilidade APCA, componentes, multibrand, pipeline Figma→Deploy, Supabase, secrets, decisões (ADR) e roadmap.
