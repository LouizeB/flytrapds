# 6. Multibrand · modes · themes

Brand, mode, theme e viewport são dimensões independentes. A referência completa de camadas e dependências está em [Arquitetura de tokens](01-architecture-tokens.md#dimensões-brand-mode-theme-e-viewport).

| Dimensão | Valores atuais | Responsabilidade |
|--|--|--|
| Brand | `flytrap` | identidade e mapeamento dos valores fundamentais |
| Mode | `light`, `dark` | condição luminosa e contraste |
| Theme | `default`, `vibrant` | expressão visual dentro da marca |
| Viewport | `base`, `sm`, `md`, `lg`, `xl`, `2xl` | composição responsiva mobile-first |

## Adicionar brand

Somente a marca Flytrap está materializada. A próxima marca deve ser adicionada como um DTCG completo — não como um JSON paralelo apenas de primitives — para que semantic, component e APCA continuem rastreáveis.

Antes de ativar `[data-brand="<brand>"]`, o gerador e os gates devem receber suporte ao novo arquivo e validar a matriz inteira. Não considerar uma marca pronta apenas porque suas ramps compilam.

## Modes

`.dark` sobrescreve a camada semantic. Light é o default em `:root`.

## Themes

`.vibrant` sobrescreve semantic (superfícies magenta-tintadas). Extensível a novos themes.

O catálogo atual publica `light`, `dark` e `vibrant` como aparências fechadas. Ainda não publica `light+vibrant` e `dark+vibrant` de forma independente. A chave histórica `$extensions.flytrap.modes` permanece como adaptador do gerador; `$extensions.flytrap.dimensions` registra a arquitetura-alvo sem quebrar consumidores existentes.

Uma combinação nova só entra quando tiver caso de uso, mapeamento semântico e matriz APCA próprios.

## Viewport

Os breakpoints vivem em `foundation.breakpoint` e são emitidos como `--breakpoint-*` para Tailwind. Componentes reutilizáveis devem preferir container queries quando seu comportamento depender do espaço disponível; shells usam viewport breakpoints.

## Pipeline multibrand

Arquitetura-alvo: Figma (collection por brand e modos) → Tokens Studio → DTCG versionado → token_contract + apca_gate → `build.mjs` → Tailwind build.

Estado atual: o DTCG versionado em `packages/tokens/src/flytrap.tokens.json` é a fonte executável de verdade. A reconciliação com Figma ainda é manual e deve seguir [Sincronização design → código](19-design-code-sync.md) até existir export versionado do Tokens Studio e check de drift no CI.
