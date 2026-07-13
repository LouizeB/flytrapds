---
name: ds-architecture
description: Fase 3 do pipeline de design system — arquitetura técnica. Agente único (Architect) toma as 9 decisões vinculantes (stack, tokens, monorepo, testes, docs, distribuição) e produz architecture.md. Usar após ds-sketch decidido; as decisões não são rediscutidas no build.
---

# ds-architecture — Arquitetura

Fase 3 do pipeline. Agente único (Architect), contexto novo. As decisões daqui são **vinculantes** para ds-plan e ds-build — não redecidir stack durante o build.

## Pré-requisitos

- `.planning/prd.md` aprovado, `.planning/component-inventory.md`, `.planning/tokens.draft.json`, `.planning/design-decisions.md`.

## As 9 decisões obrigatórias

`architecture.md` deve registrar cada uma com justificativa curta. O padrão da casa é o abaixo; desvios só com motivo forte documentado (ex.: exigência do cliente):

1. **Base de componente**: Lit (recomendado) vs. Web Components vanilla. Lit salvo restrição do cliente.
2. **Shadow DOM**: `open`, sempre.
3. **Tokens → CSS**: custom properties no padrão `--ds-<categoria>-<propriedade>-<escala>` (ex.: `--ds-color-primary-500`, `--ds-space-md`). Converter `tokens.draft.json` na lista definitiva.
4. **Theming**: dark mode via `[data-theme="dark"]` no host da página; tokens semânticos trocam de valor, componentes não sabem de tema.
5. **Build**: Vite + tsc (tsc para tipos/declarações, Vite para bundling e dev).
6. **Monorepo**: um pacote por domínio — `@ds/tokens`, `@ds/primitives`, `@ds/composite`, `@ds/patterns` (escopo npm conforme organização do cliente).
7. **Testes**: Vitest (unidade) + Playwright (interação/visual) + axe-core (acessibilidade).
8. **Docs**: Storybook + Custom Elements Manifest gerado no build.
9. **Distribuição**: ESM only; `customElements.define` sempre guardado (`if (!customElements.get(...))`).

## Saída da fase

`.planning/architecture.md` contendo:

- As 9 decisões com justificativa de 1-2 linhas cada.
- **Diagrama de pastas** do monorepo (árvore comentada: onde vive cada pacote, onde ficam stories, testes e tokens).
- Lista definitiva de tokens (nome da custom property → valor claro / valor dark).

## Gate humano (bloqueante)

**Parar aqui.** O delivery lead aprova `architecture.md` antes de ds-plan. Registrar aprovação (data + quem) no topo do arquivo.

Próxima fase: **ds-plan**, em contexto novo.
