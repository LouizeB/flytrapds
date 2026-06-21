# Flytrap DS — Escala de cores (50→950)

Convenção alinhada (claro→escuro). Base da marca no **500**. HCT, APCA-verificado.

## Estrutura
- **Primária / Secundária (marca):** `magenta` (500 = `#F10081`) · `acid` (lime)
- **Neutros:** `neutral` 50 (quase branco) → 950 (quase preto)
- **Semânticas (ramps próprias, separadas da marca):** `success` (verde 155°) · `warning` (âmbar 75°) · `error` (vermelho 25°)

11 steps: 50,100,200,300,400,500,600,700,800,900,950.

## Mudanças vs versão anterior
- Numeração 0–1000 → **50–950**; direção invertida (50 claro, 950 escuro).
- `success` deixou de reusar o acid da marca → ramp verde independente.
- Adicionados ramps `warning` e `error` completos.
- `magenta-500` segue `#F10081` (assinatura preservada).

## APCA
54 pares semânticos verificados (light+dark+vibrant), 0 falhas. Alvos: body 75 · ui 60 · nontext 45.

Fonte única: `packages/tokens/src/flytrap.tokens.json` · build → `dist/flytrap-globals.css` · gates `scripts/token_contract.py` + `scripts/apca_gate.py`.
