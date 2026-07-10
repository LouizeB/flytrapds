---
name: qa
description: Roda o pipeline completo de qualidade do monorepo (lint, typecheck, testes de integração com cobertura 100% e acessibilidade via axe, code review) e commita automaticamente se tudo passar.
---

Você vai rodar o pipeline de QA do flytrapds do início ao fim, na ordem abaixo, parando no primeiro passo que falhar. Não pule etapas e não enfraqueça gates (thresholds de coverage, regras de lint/typecheck) para fazer o pipeline passar — se algo falhar, o trabalho é corrigir o código/teste, não relaxar o gate. Só altere um threshold se o usuário pedir explicitamente.

## 1. Lint
Rode `pnpm lint` (raiz do monorepo). Se houver erros (warnings não bloqueiam), pare e reporte os arquivos/regras.

## 2. Typecheck
Rode `pnpm typecheck`. Qualquer erro de tipo bloqueia o pipeline.

## 3. Testes de integração, cobertura e acessibilidade
Rode `pnpm test:coverage`. Isso executa `vitest run --coverage` em todo pacote que tiver o script (hoje `packages/ui`), com:
- Testes de integração (React Testing Library + userEvent) exercitando os componentes de verdade, não só snapshots.
- Testes de acessibilidade via `vitest-axe` (`axe(container)` sem violações).
- Gate de cobertura 100% (statements/branches/functions/lines) configurado em `packages/ui/vitest.config.ts`.

Se a cobertura cair abaixo de 100% em algum arquivo, ou algum teste/axe falhar:
- Identifique exatamente quais linhas/branches faltam no relatório (`Uncovered Line #s`).
- Escreva o teste de integração (ou de acessibilidade) que exercita esse caminho — não crie testes triviais só para "tocar" a linha; teste o comportamento real do componente.
- Rode `pnpm test:coverage` de novo até fechar 100%.
- Se o gap estiver em código de outra frente de trabalho em andamento (ex.: um componente recém-criado por outra sessão, sem relação com a tarefa atual), pare e reporte ao usuário em vez de escrever testes às cegas para código que você não entende — pergunte se deve escrever os testes ou aguardar aquele trabalho terminar.

## 4. Code review
Invoque a skill `code-review` (nível padrão) sobre o diff atual. Se ela reportar findings de correção (bugs reais, não só sugestões de estilo), corrija-os e volte ao passo 3 para garantir que a correção não quebrou cobertura/testes.

## 5. Commit automático
Só execute este passo se os passos 1-4 passaram limpos (sem erros de lint/typecheck, cobertura 100%, todos os testes verdes, nenhum finding de correção pendente do code review).

- Rode `git status` e `git diff` para revisar exatamente o que será commitado.
- Confira que nada sensível (`.env`, credenciais, chaves) está no diff.
- Rode `git add` apenas nos arquivos relevantes (não `git add -A`).
- Crie o commit com mensagem curta focada no "porquê", seguindo o estilo dos commits recentes do repositório (`git log`), com o trailer:
  ```
  Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
  ```
- Nunca dê `push`. O commit fica local até o usuário decidir enviar.

Se qualquer passo 1-4 falhar e não puder ser corrigido dentro do escopo razoável desta execução, pare, não commite nada, e reporte um resumo objetivo do que falhou e o que falta para o pipeline passar.
