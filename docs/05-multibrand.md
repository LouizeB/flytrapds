# 6. Multibrand · modes · themes

## Adicionar brand
O contrato já separa brand, mode e theme, mas somente a marca Flytrap está materializada. A próxima marca deve ser adicionada como um DTCG completo — não como um JSON paralelo apenas de primitives — para que semantic, component e APCA continuem rastreáveis.

Antes de ativar `[data-brand="<brand>"]`, o gerador e os gates devem receber suporte ao novo arquivo e validar a matriz inteira. Não considerar uma marca pronta apenas porque suas ramps compilam.

## Modes
`.dark` sobrescreve a camada semantic. Light é o default em `:root`.

## Themes
`.vibrant` sobrescreve semantic (superfícies magenta-tintadas). Extensível a novos themes.

## Pipeline multibrand
Figma (collection por brand e modos) → Tokens Studio → DTCG versionado → token_contract + apca_gate → `build.mjs` → Tailwind build.
