# 13. Anatomia e Definition of Done

Este template transforma a disciplina de tokens em uma interface verificável. Use-o para todo componente novo ou alterado de forma relevante.

## Exemplo: Button

### Anatomia

```text
Button
├── container: background, border, radius, focus ring
├── leading icon: color e size herdados
├── label: foreground e typography
└── trailing icon: color e size herdados
```

### Variantes e estados

| Variante | Default | Hover | Focus | Disabled |
|--|--|--|--|--|
| Primary | `button-primary-bg` | `button-primary-bg-hover` | `ring` | `button-primary-bg-disabled` |
| Secondary | `button-secondary-bg` | `button-secondary-bg-hover` | `ring` | opacidade reduzida |
| Destructive | `button-destructive-bg` | `button-destructive-bg-hover` | `ring` | opacidade reduzida |
| Outline | transparente + `button-outline` | `accent` | `ring` | opacidade reduzida |

O foreground sempre usa o par `*-fg` correspondente. O componente não conhece magenta, acid ou qualquer step da paleta.

### Comportamento

- Elemento nativo `button` por padrão; `asChild` preserva composição com Radix Slot.
- Foco visível por teclado.
- `disabled` bloqueia interação e comunica o estado nativamente.
- Ícones decorativos internos não recebem eventos de ponteiro.
- Sizes: `sm`, `default`, `lg`, `icon`.

### Matriz mínima

| Dimensão | Valores obrigatórios |
|--|--|
| Mode/theme | light, dark, vibrant |
| Estado | default, hover, focus, disabled |
| Conteúdo | label, label + icon, icon-only |
| Viewport | mobile e desktop |

## Template para novos componentes

1. **Propósito:** problema resolvido e quando não usar.
2. **Anatomia:** partes visuais e interativas.
3. **API:** props, defaults e composição.
4. **Variantes:** diferenças semânticas, não apenas visuais.
5. **Estados:** default, hover, focus, active, disabled, loading, empty e error quando aplicáveis.
6. **Tokens:** tabela propriedade → component token → semantic token.
7. **Acessibilidade:** elemento nativo, teclado, foco, nome, descrição e live regions.
8. **Responsividade:** decisões que mudam por espaço disponível.
9. **Matriz:** brand × mode/theme × state.
10. **Exemplos:** uso recomendado, composição e antipadrões.

## Definition of Done

- Usa tokens de componente ou semânticos; nunca primitives diretamente.
- Todos os aliases passam em `pnpm tokens:contract`.
- Pares de conteúdo relevantes têm metadados APCA e passam em todos os modos registrados.
- Estados interativos não dependem apenas de opacidade quando há mudança semântica de cor.
- API pública está exportada por `@flytrap/ui`.
- Há exemplo real em `apps/docs` ou justificativa para não haver.
- Lint, tipos e build passam.
- A revisão cobre teclado, foco, ARIA, reduced motion e contraste.
- Ícones seguem o vocabulário Lucide do Flytrap e não duplicam significados existentes.
