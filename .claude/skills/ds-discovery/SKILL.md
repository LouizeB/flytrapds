---
name: ds-discovery
description: Fase 1 do pipeline de design system — descoberta e briefing. Roda 3 agentes em sequência (Analyst, PM, UX-Designer) para produzir brief.md, prd.md, component-inventory.md e tokens.draft.json. Usar quando iniciar um projeto novo de design system para um cliente.
---

# ds-discovery — Descoberta & Briefing

Fase 1 do pipeline. Três agentes em sequência, **cada um consumindo só o artefato do anterior** (nunca a conversa inteira). Todos os artefatos vão em `.planning/` na raiz do projeto do cliente.

Nome cliente-facing: **Descoberta & Briefing**.

## Pré-requisitos

- Repositório do cliente clonado (trabalha-se no repo do cliente, não da agência).
- **Insumos do briefing coletados** (checklist abaixo) — a call de discovery serve para colher o que o cliente não mandou antes.
- Se houve auditoria (`ds-audit`), o `audit-report.md` é insumo primário do Analyst.
- Se `.planning/brief.md` já existe e foi aprovado, não refazer — seguir para o passo 2 ou 3 conforme o que falta.

## Insumos do briefing (colher do cliente)

Pedir **antes** da call e completar durante ela. Registrar em `.planning/insumos/` o que for arquivo, e no brief o que for resposta:

- [ ] **Materiais de marca**: brand guide, logos, paleta, tipografias (arquivos/licenças), iconografia
- [ ] **Tom e voz**: guia de escrita, exemplos de microcopy (erros, vazios, confirmações)
- [ ] **Requisitos técnicos**: stacks dos times consumidores, browsers suportados, nível de acessibilidade exigido (ex.: WCAG AA), restrições de infra
- [ ] **Inventário existente**: UI kit, Figma, biblioteca de componentes ou DS atual (se houver — considerar rodar `ds-audit` antes)
- [ ] **Usuário final / personas**: quem usa os produtos, contextos de uso, requisitos especiais (baixa visão, mobile-first, ambientes offline)
- [ ] **Produtos**: quais produtos/telas consumirão o DS, prints ou acesso a staging
- [ ] **Referências**: design systems que admiram/rejeitam e por quê

Item faltando não bloqueia a fase, mas **entra como pendência nomeada no brief** — lacuna de insumo é risco de retrabalho e o cliente precisa vê-la por escrito.

## Passo 1 — Agente Analyst → `brief.md`

Despachar um subagente com APENAS os insumos brutos (checklist acima + anotações da call — não o histórico da conversa). Missão: extrair intenção de negócio e restrições de marca. O brief deve responder:

- Existe brand guide? Onde? O que ele fixa (cores, tipografia, tom)?
- Tom e voz: o que o guia de escrita fixa para microcopy dos componentes?
- Quais times/produtos vão consumir o design system? Em que stacks?
- Quem é o usuário final (personas)? Algum requisito que afete componentes (a11y, mobile-first, densidade)?
- Referências citadas pelo cliente (Material, Radix, Carbon, outro DS)? O que gostam/rejeitam nelas?
- Restrições duras: acessibilidade exigida, browsers suportados, prazo, orçamento do pacote vendido.
- Insumos pendentes: o que o cliente ainda deve, e o que fica bloqueado sem isso.

Saída: `.planning/brief.md`.

## Passo 2 — Agente PM → `prd.md`

Despachar subagente novo que lê **somente `.planning/brief.md`**. Missão: transformar intenção em escopo. O PRD deve conter:

- Escopo v1 (o que entra) e fora de escopo explícito (o que NÃO entra) — alinhado ao pacote vendido (Foundations / Core / Full DS).
- Critérios de sucesso mensuráveis.
- Fases de entrega mapeadas nas 4 camadas: foundations → primitives → composite → patterns.

Saída: `.planning/prd.md`.

## Passo 3 — Agente UX-Designer → inventário + tokens

Despachar subagente novo que lê **`brief.md` + `prd.md`**. Missão: inventário de componentes por camada. Para cada componente:

- Camada (Foundations / Primitives / Composite / Patterns)
- Estados obrigatórios (default, hover, focus, active, disabled, error, loading — os que se aplicam)
- Variantes (ex.: button → primary/secondary/ghost; tamanhos)
- Dependências de outros componentes

Saídas:
- `.planning/component-inventory.md`
- `.planning/tokens.draft.json` — rascunho de tokens no formato de categorias que a fase ds-architecture vai converter em custom properties `--ds-<categoria>-<propriedade>-<escala>`

## Gate humano (bloqueante)

**Parar aqui.** O delivery lead precisa aprovar `brief.md` e `prd.md` antes de qualquer fase seguinte — é o que define o que foi vendido. Registrar a aprovação (data + quem) no topo do próprio `prd.md`.

## Saída da fase

Artefatos em `.planning/`: `brief.md`, `prd.md` (aprovados), `component-inventory.md`, `tokens.draft.json`.
Próxima fase: **ds-sketch**, em contexto novo.
