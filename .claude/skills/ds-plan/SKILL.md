---
name: ds-plan
description: Fase 4 do pipeline de design system — planejamento. Quebra o inventário de componentes em épicos (foundations→primitives→composite→patterns) e tasks autossuficientes executáveis por subagente sem contexto de conversa; cria o ledger progress.md. Usar após architecture.md aprovado.
---

# ds-plan — Planejamento

Fase 4 do pipeline. Contexto novo. Transforma `component-inventory.md` em tasks que um subagente **sem nenhum contexto de conversa** consegue executar sozinho.

## Pré-requisitos

- `.planning/architecture.md` aprovado pelo delivery lead.
- `.planning/component-inventory.md` e `.planning/design-decisions.md`.

## Estrutura de épicos

Criar `.planning/epics/` com um diretório por épico, na ordem:

```
.planning/epics/
├── 01-foundations/   # tokens, reset, tipografia base
├── 02-primitives/    # button, input, select, checkbox...
├── 03-composite/     # card, modal, form-field...
└── 04-patterns/      # navegação, tabelas, layouts...
```

- **Sequencial entre épicos** (02 só começa com 01 pronto).
- **Paralelo dentro do épico** entre componentes sem dependência mútua — marcar dependências explicitamente em cada task.

## Formato de task

Um arquivo `task-NN-<componente>.md` por task. Cada task é **autossuficiente** — o implementador recebe só ela e o `architecture.md`. Conteúdo obrigatório:

```markdown
# task-03-button

## Arquivos a criar
packages/primitives/src/button/ds-button.ts (+ .test.ts, .stories.ts)

## Tokens usados (exatos)
--ds-color-primary-500, --ds-space-sm, --ds-radius-md, ...

## API pública
- Atributos: variant ("primary" | "secondary" | "ghost"), size, disabled
- Eventos: (click nativo; custom events se houver, com prefixo ds-)
- Slots: default (label), icon

## Estados obrigatórios
default, hover, focus-visible, active, disabled, loading

## Dependências
Nenhuma / task-01-tokens

## Critérios de aceite
- [ ] Todos os estados renderizam nos 2 temas
- [ ] Zero violações axe-core A/AA
- [ ] Testes escritos ANTES da implementação (TDD — RED antes de GREEN)
- [ ] Story no Storybook cobrindo cada variante × estado
```

Fidelidade visual: a variante escolhida em `design-decisions.md` e o sketch correspondente são a referência — citar o arquivo de sketch na task.

## Ledger

Criar `.planning/progress.md` — **fonte de verdade se o contexto for perdido ou compactado**. Formato: tabela com uma linha por task (id, componente, status pending/in-progress/done/blocked, data, observação). ds-build escreve nele conforme completa tasks; nenhuma outra fonte de status vale mais que o ledger.

## Saída da fase

- `.planning/epics/**/task-*.md` cobrindo 100% do inventário do escopo v1.
- `.planning/progress.md` inicializado com todas as tasks em `pending`.

Próxima fase: **ds-build**, em contexto novo.
