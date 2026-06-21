# 11. Decisões (ADR)

| # | Decisão | Racional |
|--|--|--|
| 01 | Nome **Flytrap** | conceito Venus Flytrap; identidade alien/futurista |
| 02 | Calibração em **HCT** (chroma máximo no hue da marca) | tom perceptualmente uniforme, gamut-safe, preserva vivacidade |
| 03 | Alvos APCA **por papel** (body 75 · ui 60 · large/nontext 45) | exigir 75 em label mata a cor; 60 é o piso de componente |
| 04 | Escala **50→950** (claro→escuro), base 500 | convenção Tailwind/Material; idiomático p/ shadcn |
| 05 | Semânticas como **ramps próprias** (success/warning/error) | separar feedback da marca (verde semântico ≠ acid) |
| 06 | Arquitetura **3 camadas × 3 dimensões** | camada = tipo; brand/mode/theme = contexto |
| 07 | Botão secundário **outline magenta** | mantém acid 100% decorativo |
| 08 | Embeddings **Voyage** (`voyage-3`, 1024) | alinhado à Anthropic |
| 09 | Supabase em **sa-east-1** (recriado) | latência BR; projeto antigo era us-west-2 |
| 10 | Repo **público** | OSS; secrets só em Actions/Edge, RLS estrito |
| 11 | AI key via **Supabase Edge** (proxy) | nunca expor key no client |
| 12 | UI em **React 19 + shadcn/ui + Tailwind v4** | código local, composição flexível e alinhamento com o ecossistema dos produtos |
| 13 | `@flytrap/ui` como dono dos componentes compartilhados | impede forks divergentes entre docs e dashboard |
