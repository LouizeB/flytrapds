# 4. Acessibilidade (APCA)

Contraste avaliado por **APCA** (W3 0.1.9), não WCAG 2.1. Alvo por papel — não número único.

## Alvos (Lc)
| Papel | Aplicação | Alvo |
|--|--|--|
| `body` | texto corpo <16px regular | 75 |
| `ui` | label de botão/input, texto secundário, link, ≥16px 600 | 60 |
| `large` | display ≥24px / bold | 45 |
| `nontext` | borda, foco, ícone informativo, traço de gráfico | 45 |
| disabled/decorativo | — | isento |

## Gate de CI
`scripts/apca_gate.py` resolve refs + modos do `flytrap.tokens.json`, roda APCA em cada par anotado (`$extensions.apca`), falha o build se Lc < alvo.

Status atual: **54 pares, 0 falhas** (light + dark + vibrant), incluindo texto, feedback, foco, dataviz e estados default/hover das actions.

## Regras
- Texto sobre cor só via `on-*` / `*-text` (gera par validável).
- Verde nunca recebe texto branco; em superfície com texto usa step claro + texto escuro.
- `warning`/`error` calibrados na própria ramp para atingir Lc.
- DataViz: `--chart-1..5` distintas, todas ≥45 vs surface nos três modos.
- Um novo mode só entra no contrato quando está listado em `$extensions.flytrap.modes`; o gate passa a testá-lo automaticamente.
