# 15. Contrato de contexto para IA

Este documento define o contexto mínimo para Claude, Cursor, Copilot ou outro agente criar interfaces coerentes com o Flytrap. Um prompt não substitui arquitetura: a IA só pode respeitar decisões que estejam explícitas, acessíveis e verificáveis.

## Princípio

```text
modelo capaz + contexto ambíguo = resultado plausível
modelo capaz + contrato explícito = resultado verificável
```

Plausível é usar `bg-magenta-500` em uma ação. Correto é usar `Button` ou `bg-button-primary-bg`, permitindo que brand, mode e theme resolvam o valor.

## Ordem do contexto

Forneça apenas o necessário, nesta ordem:

1. **Objetivo e fluxo:** tarefa do usuário e estado esperado.
2. **Componentes disponíveis:** exports reais de `@flytrap/ui`.
3. **Contrato semântico:** tokens e aliases permitidos.
4. **Aparência:** brand, mode, theme e breakpoint relevantes.
5. **Acessibilidade:** papel, teclado, foco, live region e pares APCA.
6. **Restrições:** padrões proibidos e Definition of Done.

Não injete o repositório inteiro. Contexto compacto, hierárquico e atual reduz custo e contradição.

## Regras normativas para agentes

### Deve

- Reutilizar um componente exportado antes de criar outro.
- Usar semantic ou component tokens no código de UI.
- Tratar loading, empty, error, disabled e permission states quando aplicáveis.
- Usar aliases iconográficos do Flytrap para significados já catalogados.
- Preservar elemento HTML nativo, teclado e nome acessível.
- Declarar quando uma necessidade não possui token ou componente adequado.
- Rodar os gates do repositório antes de afirmar conclusão.

### Não deve

- Referenciar `primitive.*`, `--magenta-*` ou `--neutral-*` dentro de componentes.
- Inventar classes Tailwind, tokens, componentes ou variantes não exportados.
- Copiar hexadecimal, spacing ou breakpoint de uma captura.
- Criar dark mode dentro do componente.
- Usar cor ou ícone como único meio de comunicar estado.
- Expor chain-of-thought, secrets, prompts internos ou dados sensíveis.
- Criar um component token sem justificar controle anatômico ou migração.

## Packet recomendado

```yaml
flytrap_context:
  task: "descreva o fluxo e o resultado"
  audience: "product-design | development | end-user"
  appearance:
    brand: flytrap
    mode: light | dark
    theme: default | vibrant
    viewport: base | sm | md | lg | xl | 2xl
  available_components:
    - Button
    - Card
    - Input
  required_states:
    - default
    - loading
    - empty
    - error
  semantic_contract:
    surfaces: [background, card, muted]
    content: [foreground, muted-foreground]
    actions: [primary, secondary, destructive]
  accessibility:
    keyboard: true
    visible_focus: true
    apca_role: ui
  forbidden:
    - primitive colors in components
    - hardcoded values
    - invented tokens
```

Esse packet descreve escolhas, não valores finais. A resolução continua pertencendo ao DTCG.

## Resposta esperada do agente

Ao implementar, o agente deve informar:

1. componentes reutilizados;
2. tokens semantic/component consumidos;
3. estados cobertos;
4. decisões responsivas;
5. acessibilidade aplicada;
6. lacunas reais encontradas;
7. comandos de validação executados.

## Quando falta algo no sistema

```text
necessidade não coberta
  → procurar semantic existente com mesma intenção
  → procurar composição de componentes existentes
  → propor novo semantic/component token com justificativa
  → validar Product Design + Development
  → adicionar DTCG, documentação e gates
```

A IA não deve “resolver” a lacuna usando um primitive. Uma lacuna explícita é feedback para o design system.

## Fontes que podem alimentar RAG

Prioridade de ingestão em `ds_context`:

1. `01-architecture-tokens.md` — regras e responsabilidades;
2. `04-components.md` — inventário e status real;
3. `12-component-anatomy.md` — Definition of Done;
4. `13-iconography.md` — aliases semânticos;
5. este contrato — comportamento esperado dos agentes;
6. exports TypeScript e DTCG gerado — disponibilidade verificável.

Documentos de roadmap ou artigos externos ajudam no repertório, mas não devem vencer o contrato versionado do Flytrap.
