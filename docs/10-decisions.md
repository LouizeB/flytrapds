# 11. Decisões (ADR)

| # | Decisão | Racional |
|--|--|--|
| 01 | Nome **Flytrap** | conceito Venus Flytrap; identidade alien/futurista |
| 02 | Calibração em **HCT** (chroma máximo no hue da marca) | tom perceptualmente uniforme, gamut-safe, preserva vivacidade |
| 03 | Alvos APCA **por papel** (body 75 · ui 60 · large/nontext 45) | exigir 75 em label mata a cor; 60 é o piso de componente |
| 04 | Escala **50→950** (claro→escuro), base 500 | convenção amplamente reconhecida e interoperável |
| 05 | Semânticas como **ramps próprias** (success/warning/error) | separar feedback da marca (verde semântico ≠ acid) |
| 06 | Arquitetura **3 camadas × 3 dimensões** | camada = tipo; brand/mode/theme = contexto |
| 07 | Botão secundário **outline magenta** | mantém acid 100% decorativo |
| 08 | Embeddings **Voyage** (`voyage-3`, 1024) | alinhado à Anthropic |
| 09 | Supabase em **sa-east-1** (recriado) | latência BR; projeto antigo era us-west-2 |
| 10 | Repo **público** | OSS; secrets só em Actions/Edge, RLS estrito |
| 11 | AI key via **Supabase Edge** (proxy) | nunca expor key no client |
| 12 | UI em **React 19 com componentes locais orientados por tokens** | composição flexível e alinhamento com o ecossistema dos produtos |
| 13 | `@louizeb/flytrap-ui` como dono dos componentes compartilhados | impede forks divergentes entre docs e dashboard |
| 14 | **Aliases iconográficos semânticos Flytrap** | consistência entre Figma e código sem acoplar significado ao fornecedor |
| 15 | Contexto de IA como **contrato compacto** | agentes reutilizam componentes e intenção sem receber o repositório inteiro nem inventar primitives |
| 16 | Lima `#b8ff35` confinado à **camada de arte do site** (`apps/docs/src/site.css`, `apps/docs/src/main.tsx` e `apps/docs/src/living/*`) | não pertence à ramp HCT `acid` nem passou por gate APCA; o DS usa `--ring` (validado) para foco; a fronteira é verificada por `pnpm art:contract`; integração à escala continua sendo decisão de design pendente |
| 17 | `@louizeb/flytrap-ui` distribuível por `dist` | consumo externo não deve depender de `.tsx` cru nem do pipeline interno do monorepo; apps locais mantêm aliases Vite para hot reload em `src` |
| 18 | Changesets para versões coordenadas | tokens e UI mudam juntos quando o contrato visual/API muda; versionamento deixa de depender de edição manual dispersa |
