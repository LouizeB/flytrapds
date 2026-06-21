<div align="center">

# Flytrap Design System

**Bonito por instinto. Rigoroso por sistema.**

Design system multibrand e AI-first com arquitetura semântica, componentes React e acessibilidade APCA incorporada ao pipeline.

[![Quality](https://github.com/LouizeB/flytrapds/actions/workflows/ci.yml/badge.svg)](https://github.com/LouizeB/flytrapds/actions/workflows/ci.yml)
[![Pages](https://github.com/LouizeB/flytrapds/actions/workflows/pages.yml/badge.svg)](https://github.com/LouizeB/flytrapds/actions/workflows/pages.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-F10081.svg)](LICENSE)

[Site do design system](https://louizeb.github.io/flytrapds/) · [Arquitetura semântica](architecture/README.md) · [Inventário](docs/04-components.md) · [Roadmap](docs/11-roadmap.md) · [Contribuir](CONTRIBUTING.md)

</div>

## O sistema

Flytrap combina a dualidade Vênus + Dionaea: uma superfície orgânica, vibrante e iridescente sobre uma arquitetura rigorosa de tokens.

| Fundação | Contrato atual |
|--|--|
| Arquitetura | primitive → semantic → component |
| Dimensões | brand × mode × theme |
| Aparências | light · dark · vibrant |
| Tokens | 215 resolvidos · fonte única DTCG |
| Acessibilidade | 54 pares APCA aprovados |
| Iconografia | Aliases semânticos Flytrap |
| UI | Componentes React orientados por tokens |

## Escolha sua trilha

| Product Designers | Developers |
|--|--|
| Conceito, foundations e intenção semântica | Setup, pacotes e APIs React |
| Modos, temas, anatomia e estados | DTCG, CSS e composição React |
| Acessibilidade, inventário e handoff | Quality gates, CI/CD e deploy |
| [Começar pela trilha de design](docs/README.md#trilha-product-design) | [Começar pela trilha de desenvolvimento](docs/README.md#trilha-development) |

## Começar

Requisitos: Node.js 20 e pnpm 9.12.

```bash
pnpm install
pnpm tokens
pnpm dev
```

Consumindo componentes no monorepo:

```tsx
import { Button, FlytrapIcon, SendIcon } from "@flytrap/ui";
import "@flytrap/ui/styles";

<Button>
  Enviar
  <FlytrapIcon icon={SendIcon} />
</Button>
```

## Estrutura

```text
architecture/       mapa consultivo das camadas e dimensões
apps/
├── docs/          catálogo e site público
└── dashboard/     analytics, agents e AI playground
packages/
├── tokens/        DTCG, gerador CSS/TS e contrato de temas
├── ui/            components, AI compositions e iconografia
└── config/        configuração compartilhada
supabase/           schema, RLS, pgvector e Edge Functions
docs/               arquitetura, decisões, inventário e roadmap
```

## Qualidade

```bash
pnpm tokens:contract  # aliases, ciclos, modos e fronteiras de camada
pnpm apca             # contraste em light, dark e vibrant
pnpm lint
pnpm typecheck
pnpm build
```

Pull requests executam todos os gates no workflow **Quality**. Merges em `main` publicam o catálogo pelo workflow **Pages**.

## Fonte de verdade

Todas as decisões de primitives, foundations, semantic, component, modes e pares APCA vivem em [`packages/tokens/src/flytrap.tokens.json`](packages/tokens/src/flytrap.tokens.json). O gerador [`build.mjs`](packages/tokens/build.mjs) apenas transforma esse contrato em CSS e TypeScript.

## Projeto

- Figma: project `65368906`
- Supabase: `uirglklokweglfocftyd` (`sa-east-1`)
- Vercel: `louizebs-projects/flytrapds`
- GitHub Pages: `louizeb.github.io/flytrapds`

Consulte a [política de segurança](SECURITY.md) antes de reportar vulnerabilidades ou lidar com secrets.
