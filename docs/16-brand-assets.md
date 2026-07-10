# 17. Assets de marca e avatar

Os assets oficiais vivem em `packages/ui/src/assets` e são consumidos pelos componentes públicos. Aplicações não devem copiar, recolorir ou recortar esses arquivos.

## Componentes

| Componente | Uso |
|--|--|
| `BrandMark` | Símbolo oficial nos tamanhos 32, 48 e 60 |
| `BrandLockup` | Símbolo, nome e descritor opcional |
| `Avatar` | Primitive genérica com Image e Fallback |
| `AiAvatar` | Avatar oficial da IA com status online, processing ou offline |

O logo permanece vetorial. O avatar foi extraído do recorte definido no arquivo recebido e otimizado como PNG quadrado, evitando distribuir três SVGs com a mesma imagem embutida.

## Acessibilidade

- Marca informativa recebe `label`; marca ao lado do nome usa `label={null}`.
- `AiAvatar` expõe nome como imagem e status em uma região separada.
- Status nunca depende apenas de cor.
- O fallback `AI` permanece disponível se a imagem não carregar.

## Restrições

- Não usar o símbolo como ícone de ação.
- Não aplicar cores CSS sobre o logo.
- Não usar o avatar para representar pessoas.
- Não inserir texto dentro do arquivo de imagem.
