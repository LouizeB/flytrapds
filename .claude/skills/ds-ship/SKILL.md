---
name: ds-ship
description: Fase 7 e final do pipeline de design system — entrega. Gera documentação (Storybook, Custom Elements Manifest, overview de tokens), versiona com changesets e publica no npm do cliente — publish exige confirmação humana explícita. Usar após qa-report.md sem violações.
---

# ds-ship — Entrega & Handoff

Fase 7, final. Contexto novo.

Nome cliente-facing: **Entrega & Handoff**.

## Pré-requisitos

- `.planning/qa-report.md` **sem violações** (uma rodada completa de ds-qa sem devoluções).
- Registry npm e CI do **cliente** configurados (a agência configura, o cliente provê).

## Passo 1 — Documentação

- **Custom Elements Manifest** por pacote, gerado no build — é o contrato de API consumível por IDEs e docs.
- **Storybook** buildado: as stories já foram escritas em ds-build (uma por task); aqui só se monta, revisa navegação/ordenação e publica no host definido (recomendado: conta do cliente).
- **Página de overview de tokens** gerada automaticamente a partir da lista definitiva do `architecture.md`: nome, valor claro, valor dark, exemplo de uso.

## Passo 2 — Versionamento

Changesets: **um changeset por task/componente novo**, com bump proporcional ao impacto na API pública (patch: correção sem mudança de API; minor: componente/atributo novo; major: quebra de API — não deve acontecer num v1).

## Passo 3 — Publicação (gate humano, bloqueante)

1. Build de produção de cada pacote (`@ds/tokens`, `@ds/primitives`, `@ds/composite`, `@ds/patterns`) — ESM only, tipos incluídos.
2. Dry-run do publish e conferência do conteúdo do tarball.
3. **`npm publish` exige confirmação explícita do delivery lead — nunca automática.** Apresentar: versões a publicar, changelog gerado, registry de destino. Só publicar após o sign-off registrado.

## Saída da fase

- Pacotes publicados no registry do cliente.
- `.planning/release-notes.md`: versões, changelog consolidado, links de Storybook e docs.
- Handoff segue o runbook comercial (sessão de treino, checklist pré-handoff, modelo de governança já definido com o cliente).

**Reset**: voltar a ds-discovery apenas se houver novo lote de componentes contratado (retainer/nova fase). Caso contrário, o pipeline encerra aqui.
