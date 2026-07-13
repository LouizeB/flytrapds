---
name: ds-sketch
description: Fase 2 do pipeline de design system — exploração visual. Gera sketches HTML autocontidos com 2-3 variantes de estilo por categoria de componente para decisão do cliente/design reviewer antes de qualquer código de produção. Usar após ds-discovery aprovado.
---

# ds-sketch — Exploração Visual

Fase 2 do pipeline. Objetivo: decidir tratamento visual **antes** de qualquer código de produção. Rodar em contexto novo, lendo apenas os artefatos de `.planning/`.

Nome cliente-facing: **Exploração Visual**.

## Pré-requisitos

- `.planning/brief.md` e `.planning/prd.md` aprovados pelo delivery lead (gate da fase 1).
- `.planning/component-inventory.md` e `.planning/tokens.draft.json` existentes.

## Passo 1 — Escolher categorias

Não fazer sketch de tudo. Priorizar onde há **ambiguidade visual real** — tipicamente: button, input, card, navegação. 3-5 categorias no máximo. Justificar a escolha em uma linha cada.

## Passo 2 — Gerar sketches

Um arquivo HTML por categoria em `sketches/` na raiz do projeto:

- **Autocontido**: CSS inline no próprio arquivo, sem build step, sem dependência externa — abre com duplo clique.
- Todos os valores visuais via `var(--token)` definidos num bloco `:root` no topo, usando os nomes do `tokens.draft.json` — o sketch valida os tokens, não só o desenho.
- **2-3 variantes lado a lado** por categoria (ex.: "sóbrio", "arredondado", "denso"), claramente rotuladas.
- Estados interativos **funcionando de verdade**: hover, focus e active via CSS real; disabled e error renderizados.
- Incluir os dois temas: bloco com `[data-theme="dark"]` e toggle simples.

## Passo 3 — Decisão (gate humano, bloqueante)

Apresentar as variantes ao cliente e/ou design reviewer. **Parar e aguardar a escolha.**

Registrar em `.planning/design-decisions.md`: uma linha por categoria com a variante escolhida e o **motivo em 1 linha**. Ajustes pedidos na hora entram como nova variante no sketch, não como "vamos ver no build".

## Saída da fase

- `sketches/` — **não deletar**: vira referência visual (baseline) durante ds-build e ds-qa.
- `.planning/design-decisions.md` com as decisões registradas.

Próxima fase: **ds-architecture**, em contexto novo.
