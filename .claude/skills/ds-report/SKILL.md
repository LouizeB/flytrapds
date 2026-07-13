---
name: ds-report
description: Gera o relatório semanal cliente-facing da fase de construção a partir do ledger progress.md — sem jargão interno, com progresso por etapa, prévia do que vem e pontos de atenção. Usar toda semana durante ds-build, ou sob demanda quando o cliente pedir status.
---

# ds-report — Relatório Semanal ao Cliente

Transforma o estado interno do projeto no relatório que o cliente recebe durante a etapa de **Construção** (a única fase longa em que ele não participa). Prometido no Catálogo de Serviço — periodicidade semanal.

## Insumos

- `.planning/progress.md` (ledger — fonte de verdade)
- `.planning/epics/**/task-*.md` (para descrever componentes em linguagem de produto)
- `.planning/qa-report.md`, se já existir
- O relatório da semana anterior, se existir (`relatorios/`)

## Regras de linguagem (obrigatórias)

- **Zero jargão interno**: nunca mencionar nomes de skills, fases internas (ds-build, ds-qa), agentes, subagentes, TDD, worktree, ledger ou tokens de API. O cliente conhece apenas as 4 etapas do Catálogo de Serviço: Descoberta & Briefing, Exploração Visual, Construção, Entrega & Handoff.
- Componentes descritos pelo que fazem, não pelo nome técnico (ex.: "campo de busca com sugestões" e não "ds-combobox").
- Tom: direto, confiante, sem promessas novas — prazo e escopo são os do contrato.

## Estrutura do relatório

Criar `relatorios/AAAA-MM-DD.md` (data do dia):

```markdown
# [Nome do projeto] — Atualização semanal · DD/MM/AAAA

## Resumo
1-2 frases: onde o projeto está e o que muda para o cliente esta semana.

## Progresso
- Concluídos esta semana: <componentes, em linguagem de produto>
- Em andamento: <idem>
- Progresso geral: N de M componentes (barra ou percentual)

## Próxima semana
O que entra em construção, em que ordem.

## Pontos de atenção
Só se houver: decisões pendentes do cliente, riscos de prazo com causa e plano.
Se não houver, escrever "Nenhum — projeto dentro do previsto."
```

## Passos

1. Ler o ledger e calcular: tasks `done` desde o último relatório, `in-progress`, total do escopo v1.
2. Traduzir cada task para linguagem de produto usando o arquivo da task como referência.
3. Se houver task `blocked` cuja causa envolva o cliente (decisão pendente, acesso faltando), destacar em "Pontos de atenção" com o que se espera dele e até quando.
4. Gravar em `relatorios/` e apresentar ao delivery lead — **quem envia é sempre um humano**, pelo canal combinado com o cliente (e-mail é o padrão). Nunca enviar automaticamente.

## Saída

`relatorios/AAAA-MM-DD.md` pronto para envio, revisado pelo delivery lead.
