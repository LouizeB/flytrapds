# 6. Multibrand · modes · themes

## Adicionar brand
1. Criar `packages/tokens/src/primitives/<brand>.json` (mesmas ramps, valores próprios).
2. `pnpm tokens` (regenera CSS com bloco `[data-brand="<brand>"]`).
3. `pnpm apca` (valida contraste da nova brand).
Semantic + component + 58 componentes herdam automático.

## Modes
`.dark` sobrescreve a camada semantic. Light é o default em `:root`.

## Themes
`.vibrant` sobrescreve semantic (superfícies magenta-tintadas). Extensível a novos themes.

## Pipeline multibrand
Figma (collection por brand, modes light/dark) → Tokens Studio (DTCG por brand) → apca_gate → Style Dictionary (selector por brand/mode) → Tailwind build.
