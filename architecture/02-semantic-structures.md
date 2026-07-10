# Estruturas semânticas

| Domínio | Responsabilidade | Exemplos runtime |
|--|--|--|
| Surface | superfícies e elevação | `background`, `card`, `popover`, `muted` |
| Content | hierarquia de texto e ícone | `foreground`, `muted-foreground` |
| Action | ação, variante e estado | `primary`, `primary-hover`, `destructive` |
| Border & focus | separação, input e foco | `border`, `input`, `ring` |
| Feedback | resultado do sistema | `success`, `warning`, `error` |
| Dataviz | séries distinguíveis | `chart-1` … `chart-5` |
| Navigation | contexto de navegação | `sidebar-*` |
| AI | agentes, tools e streaming | `ai-agent-*`, `ai-thinking`, `ai-citation` |

## Forma recomendada

```text
[domain].[role].[variant].[state].[property]
```

O runtime pode usar nomes compactos por interoperabilidade. O significado documentado vence a forma técnica do nome.

Um semantic novo deve representar intenção recorrente, mudar por alguma dimensão, formar um par verificável ou ser necessário para comunicação inequívoca entre design e desenvolvimento.
