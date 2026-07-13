---
name: ds-build
description: Fase 5 do pipeline de design system — construção. Executa as tasks do plano com um subagente novo por task (TDD, revisão em 2 estágios, ledger em progress.md), em worktree isolado. A fase mais longa. Usar após ds-plan completo.
---

# ds-build — Construção

Fase 5 do pipeline, a mais longa. Padrão **fresh-subagent-per-task**: cada task é executada por um subagente novo, sem contexto de conversa — só a task e o `architecture.md`. A sessão de controle orquestra e mantém o ledger.

Nome cliente-facing: **Construção** — o cliente só vê o relatório semanal derivado do ledger (gerado pela skill `ds-report`, uma vez por semana durante toda esta fase).

## Pré-requisitos

- `.planning/epics/**/task-*.md` e `.planning/progress.md` criados por ds-plan.
- `.planning/architecture.md` aprovado.

## Passo 0 — Isolamento

Antes do primeiro épico: criar worktree ou branch isolado (`build/<épico>` ou worktree dedicado). Nunca buildar direto na main do cliente.

## Loop por task

Para cada task do épico corrente (respeitando dependências; paralelizar as independentes se o runtime suportar subagentes):

1. **Despachar implementador** — subagente novo com o prompt `agents/implementer.md`, recebendo apenas: o arquivo da task, `architecture.md` e o sketch de referência citado na task. TDD real: testes escritos e **falhando (RED)** antes de qualquer implementação (GREEN).
2. **Revisão em 2 estágios**, cada uma por subagente revisor novo:
   - *Estágio 1 — conformidade com spec*: a entrega cumpre exatamente a API pública, tokens, estados e critérios de aceite da task? Nada a mais, nada a menos.
   - *Estágio 2 — qualidade de código*: legibilidade, consistência com componentes já entregues, uso correto dos tokens (nenhum valor hardcoded).
   - Reprovação em qualquer estágio → volta ao implementador com o parecer; re-revisar após correção.
3. **Atualizar ledger** — marcar a task em `.planning/progress.md` (status, data, observação). O ledger é a fonte de verdade; atualizar imediatamente, não em lote.
4. **Sem pausa entre tasks.** Só parar em três situações: épico terminado, subagente retornou `BLOCKED`, ou limite de contexto da sessão de controle (nesse caso, o ledger permite retomar em sessão nova sem perda).

## Ao final de cada épico

Review da branch inteira do épico (subagente revisor, diff completo), procurando o que revisões por task não pegam:

- Duplicação de lógica/estilo entre componentes
- Inconsistência de API entre componentes irmãos (ex.: um usa `size`, outro `scale`)
- Uso divergente de tokens para o mesmo papel visual

Achados viram tasks de correção no próprio épico antes de abrir o seguinte.

## Saída da fase

Todos os épicos do escopo v1 com status `done` no ledger, branch(es) de build prontas para o portão de qualidade.
Próxima fase: **ds-qa**, em contexto novo.
