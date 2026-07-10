# Dimensões

Dimensões alteram resolução ou composição; não criam novas camadas.

| Dimensão | Estado atual | Decisão |
|--|--|--|
| Brand | `flytrap` | identidade e mapeamento fundamental |
| Mode | `light`, `dark` | condição luminosa e contraste |
| Theme | `default`, `vibrant` | expressão visual da marca |
| Viewport | `base`, `sm`, `md`, `lg`, `xl`, `2xl` | composição mobile-first |

O catálogo publica hoje três aparências fechadas: `light`, `dark` e `vibrant`. Mode e theme permanecem conceitualmente independentes; combinações adicionais exigem caso de uso e matriz APCA próprios.

## Breakpoints

| Token | Min-width |
|--|--:|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1536px |

Use viewport para macro-layout e container queries quando um componente depender do espaço do próprio container.
