# 2. Arquitetura de tokens

**3 camadas × 3 dimensões.** Camada = tipo de token. Dimensão = contexto que sobrescreve.

## Camadas
1. **Primitive** — `--magenta-500` (HCT). Nunca usado em componente.
2. **Semantic** — `--background`, `--primary`, `--ring` (contrato shadcn).
3. **Component** — `--button-primary-bg`, `--chat-bubble-user-bg` (referencia semantic).

## Dimensões (não são camadas)
| Dimensão | Seletor | Sobrescreve |
|--|--|--|
| Brand | `[data-brand="x"]` | primitive |
| Mode | `.dark` | semantic |
| Theme | `.vibrant` | semantic |

Combinável: `<html data-brand="flytrap" class="dark vibrant">`. Component herda mode/theme automático.

## Regras
- Componente consome semantic/component, nunca primitive.
- Trocar brand não muda semantic nem componentes.
- Todo par texto/fundo passa pelo gate APCA antes do build.

## Implementação
`packages/tokens/src/flytrap.tokens.json` é a única fonte DTCG. O arquivo contém primitives, foundations, semantic, component, modes e o manifesto de pares APCA.

`flytrap.tokens.json` → `build.mjs` (transformação genérica) → `dist/flytrap-globals.css` + `dist/tokens.ts`.

`scripts/token_contract.py` valida referências, ciclos, resolução nos três modos e fronteiras entre camadas. Decisões visuais pertencem ao DTCG, nunca ao gerador.
