# Camadas e dependências

| Camada | Pergunta | Pode referenciar | Consumidor |
|--|--|--|--|
| Primitive | qual valor existe? | nada acima dela | semantic |
| Foundation | qual escala estrutural existe? | nada acima dela | semantic/component/UI |
| Semantic | para que serve? | primitive/foundation/semantic estrutural | component/UI |
| Component | onde é necessário controle próprio? | semantic/foundation | componente React |

```text
primitive ─┐
           ├─→ semantic ─→ component ─→ UI
foundation ┘       └──────────────────→ UI
```

Regras essenciais:

- UI não consome cor primitive.
- Component token nunca referencia cor primitive.
- Nem todo componente precisa de token próprio.
- Um valor isolado permanece local até demonstrar reuso.
- Toda nova referência deve passar pelo contrato automatizado.

Detalhes e exemplos: [`docs/01-architecture-tokens.md`](../docs/01-architecture-tokens.md).
