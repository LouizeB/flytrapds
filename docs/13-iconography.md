# 14. Iconografia

O Flytrap usa exclusivamente `lucide-react` para ícones de interface. Lucide fornece SVGs consistentes, customizáveis e tree-shakable; o pacote `@flytrap/ui` adiciona uma camada semântica para evitar escolhas diferentes para o mesmo significado.

## Princípios

- Escolher pelo significado, não pela aparência.
- Um significado recorrente tem um único alias no sistema.
- Ícones de interface são outline, com stroke `1.75`.
- Cor é herdada de `currentColor`; feedback usa tokens semânticos.
- Não misturar emojis, outra biblioteca ou SVG copiado nos componentes.
- Logos de marcas não pertencem à biblioteca de ícones; devem usar assets próprios e aprovados.

## Tamanhos

| Tamanho | Token | Uso |
|--|--|--|
| `sm` | `--icon-size-sm` · 14px | status, metadata, badges |
| `md` | `--icon-size-md` · 16px | controles, navegação e botões |
| `lg` | `--icon-size-lg` · 20px | callouts e destaques |

Use `FlytrapIcon` para aplicar tamanho, stroke e acessibilidade:

```tsx
import { FlytrapIcon, SendIcon } from "@flytrap/ui";

<Button aria-label="Enviar" size="icon">
  <FlytrapIcon icon={SendIcon} />
</Button>
```

## Vocabulário semântico

| Significado Flytrap | Alias | Lucide |
|--|--|--|
| Marca conceitual/orgânico | `BrandIcon` | `Sprout` |
| Agent | `AgentIcon` | `Bot` |
| Agent executando | `AgentRunningIcon` | `LoaderCircle` |
| Agent pausado/idle | `AgentIdleIcon` | `CirclePause` |
| Sucesso | `SuccessIcon` | `CircleCheck` |
| Erro | `ErrorIcon` | `CircleX` |
| Aviso | `WarningIcon` | `TriangleAlert` |
| Informação | `InfoIcon` | `CircleHelp` |
| Insight AI | `InsightIcon` | `Lightbulb` |
| Tool call | `ToolIcon` | `Wrench` |
| Aprovação humana | `ApprovalIcon` | `ShieldCheck` |
| Dashboard | `DashboardIcon` | `LayoutDashboard` |
| Playground | `PlaygroundIcon` | `Activity` |
| Enviar | `SendIcon` | `Send` |
| Copiar | `CopyIcon` | `Clipboard` |
| Tendência | `TrendUpIcon`, `TrendDownIcon`, `TrendNeutralIcon` | setas/minus |
| Tema | `ThemeLightIcon`, `ThemeDarkIcon` | `Sun`, `Moon` |

Novos aliases entram apenas quando o significado for reutilizado ou fizer parte do domínio Flytrap. Ícones específicos de uma única tela podem usar import explícito do Lucide no app, mas não devem redefinir significados da tabela.

## Acessibilidade

- Ícone acompanhado de texto ou dentro de controle com nome acessível é decorativo; `FlytrapIcon` aplica `aria-hidden` por padrão.
- Ícone standalone que comunica informação recebe `label`, tornando-se `role="img"`.
- Botão apenas com ícone sempre recebe `aria-label` no `Button`, não no SVG.
- Não comunicar success, warning ou error apenas por cor ou ícone; sempre incluir texto.
- Animação de loading deve respeitar `prefers-reduced-motion` quando virar comportamento persistente.

## Figma e código

Use o plugin oficial Lucide no Figma e mantenha o nome original do ícone na layer. Na especificação, registre também o alias semântico Flytrap. Exemplo: `AgentRunningIcon / LoaderCircle`.
