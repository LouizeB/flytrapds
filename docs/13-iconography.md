# 14. Iconografia semântica

O Flytrap trata ícones como linguagem, não como catálogo visual. Produto, design e código usam aliases próprios para que o significado permaneça estável mesmo quando a implementação interna evolui.

## Contrato

- `FlytrapIcon` é o único wrapper de renderização da UI.
- Aliases de domínio são importados de `@flytrap/ui`.
- O nome descreve intenção: `ApprovalIcon`, não forma ou fornecedor.
- Ícone decorativo recebe `aria-hidden`.
- Ícone que comunica sozinho exige `label` acessível.
- Cor nunca é o único meio de distinguir um estado.

## Tamanhos

| Token | Uso |
|--|--|
| `foundation.icon.size.sm` | controles compactos e metadata |
| `foundation.icon.size.md` | tamanho padrão de interface |
| `foundation.icon.size.lg` | destaques e cabeçalhos |
| `foundation.icon.size.xl` | estados vazios e ilustrações funcionais |

O traço é controlado por `foundation.icon.stroke`.

## Vocabulário inicial

| Significado Flytrap | Alias |
|--|--|
| marca | `BrandIcon` |
| inteligência | `AiAccentIcon` |
| agente em execução | `AgentRunningIcon` |
| chamada de ferramenta | `ToolIcon` |
| aprovação humana | `ApprovalIcon` |
| sucesso | `SuccessIcon` |
| alerta | `WarningIcon` |
| erro | `ErrorIcon` |
| informação | `InfoIcon` |
| envio | `SendIcon` |
| anexo | `AttachmentIcon` |
| link externo | `ExternalLinkIcon` |

Novos aliases entram quando o significado for reutilizado ou pertencer ao domínio Flytrap. Uma tela não deve redefinir significados já registrados.

## Design e handoff

No Figma, nomeie a layer pelo alias Flytrap e registre estado, tamanho e nome acessível. O handoff descreve a intenção; a biblioteca visual usada internamente não faz parte do contrato de produto.
