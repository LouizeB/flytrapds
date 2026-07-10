# Arquitetura semântica Flytrap

Esta pasta é o mapa consultivo do sistema. Ela existe separada de `apps/` e `packages/` para que Product Design, Development e agentes encontrem rapidamente as regras sem navegar pela implementação.

## Mapa

```text
valor fundamental
  ├── primitive.color
  └── foundation
        ↓
intenção compartilhada
  └── semantic
        ↓
controle anatômico justificado
  └── component
        ↓
experiência
  └── apps
```

Consulte:

1. [Camadas e dependências](01-layers.md)
2. [Estruturas semânticas](02-semantic-structures.md)
3. [Brand, mode, theme e viewport](03-dimensions.md)
4. [Governança e fonte de verdade](04-governance.md)

## Regra de segurança

Esta pasta não é importada pelo build e não contém valores duplicados. A fonte normativa continua em [`packages/tokens/src/flytrap.tokens.json`](../packages/tokens/src/flytrap.tokens.json); a explicação completa permanece em [`docs/01-architecture-tokens.md`](../docs/01-architecture-tokens.md).
