# Flytrap DS

Design system multibrand e AI-first em React 19, Tailwind v4 e shadcn/ui, com gate de acessibilidade APCA.
Arquitetura: **3 camadas (primitive · semantic · component) × 3 dimensões (brand · mode · theme)**.

## Recursos
- Figma project `65368906`
- GitHub `LouizeB/flytrapds` (público)
- Vercel `louizebs-projects/flytrapds`
- Supabase `uirglklokweglfocftyd`

## Estrutura
- `packages/tokens` — primitives (HCT) → `flytrap-globals.css` + `tokens.ts` (Style build) + gate APCA
- `packages/config` — preset compartilhado
- `packages/ui` — componentes shadcn + composições AI em React
- `apps/docs` — catálogo e documentação interativa
- `apps/dashboard` — analytics, agents e AI playground
- `supabase/` — schema + edge functions (M3)

## Comandos
```bash
pnpm install
pnpm tokens     # build de tokens → dist/flytrap-globals.css
pnpm apca       # gate de contraste APCA (falha se regressão)
pnpm build      # turbo build
pnpm dev        # inicia os apps em modo de desenvolvimento
```

## Tokens — fonte de verdade
- Editar primitives, semantic, component, modes e metadados APCA em `packages/tokens/src/flytrap.tokens.json`.
- `packages/tokens/build.mjs` apenas transforma o contrato DTCG em CSS e TypeScript; não contém decisões de cor.
- `dist/flytrap-globals.css` é **gerado** (não editar à mão)
- Validar contrato: `pnpm tokens:contract`
- Após qualquer mudança: `pnpm tokens && pnpm tokens:contract && pnpm apca`

## Componentes
- Consumir: `import { Button } from "@flytrap/ui"`
- Estilos globais: `import "@flytrap/ui/styles"`
- Adicionar via CLI: execute `pnpm dlx shadcn@latest add <componente>` dentro do app; os aliases direcionam componentes compartilhados para `packages/ui`.

## Acessibilidade
APCA por papel: body 75 · ui 60 · large/nontext 45. CI bloqueia regressões em light, dark e vibrant.

## Documentação
Documentação completa em [`docs/`](docs/README.md): visão geral, arquitetura de tokens, escala de cores, acessibilidade APCA, componentes, multibrand, pipeline Figma→Deploy, Supabase, secrets, decisões (ADR) e roadmap.
