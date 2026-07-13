---
name: ds-qa
description: Fase 6 do pipeline de design system — portão de qualidade. Acessibilidade (axe-core, zero violações A/AA é bloqueante), regressão visual contra os sketches e cross-browser com foco em Safari. Produz qa-report.md. Usar após ds-build completo.
---

# ds-qa — Portão de Qualidade

Fase 6 do pipeline. Portão final antes de documentar/publicar. Contexto novo. Falhas aqui **não se consertam aqui** — viram task específica que volta para ds-build.

## Pré-requisitos

- Todos os épicos `done` em `.planning/progress.md`.
- `sketches/` preservado (baseline visual da fase 2).

## Passo 1 — Acessibilidade (bloqueante)

Rodar axe-core em **cada componente**, em **ambos os temas** (claro e `[data-theme="dark"]`), cobrindo os estados obrigatórios de cada task.

- **Zero violações A/AA é bloqueante.** Qualquer violação → registrar task de correção referenciando a task original, marcar `blocked` no ledger, devolver para ds-build.
- Atenção a: contraste em estados hover/disabled, foco visível, nomes acessíveis em componentes com slot de ícone.

## Passo 2 — Regressão visual

Screenshot via Playwright de **cada estado × variante × tema** de cada componente, comparando contra duas referências:

1. **Baseline do sketch** (fase ds-sketch) — a variante escolhida em `design-decisions.md` é o contrato visual com o cliente.
2. **Build anterior** (se houver) — detecta regressão introduzida por tasks posteriores.

Divergências do sketch são falha, a menos que documentadas em `design-decisions.md` como ajuste aprovado.

## Passo 3 — Cross-browser

Rodar a suíte Playwright em Chromium, Firefox e **WebKit — atenção especial ao Safari**: diferenças de suporte a Shadow DOM, `:host` e `::part()` são a fonte mais comum de quebra. Testar também `focus-visible` e comportamento de formulário (form-associated custom elements) no WebKit.

## Saída da fase

`.planning/qa-report.md` com:

- Resultado por componente: a11y (violações: 0), visual (diff vs sketch/anterior), browsers.
- Lista de tasks devolvidas a ds-build (se houver) — a fase só está completa quando esta lista está vazia em uma rodada inteira.

**qa-report sem violações é pré-requisito do Checklist Pré-Handoff.**
Próxima fase: **ds-ship**, em contexto novo.
