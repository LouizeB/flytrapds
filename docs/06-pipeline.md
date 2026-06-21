# 7. Pipeline Figma → Deploy

10 fases. Ferramentas: Figma · GitHub · Vercel · Supabase.

```mermaid
flowchart LR
  A[Figma Variables+Components] -->|Tokens Studio| B[(GitHub *.tokens.json)]
  B --> C[Style Dictionary] --> D[globals.css+ts] --> E[packages/ui shadcn+AI] --> F[Storybook]
  B --> G[CI: lint·typecheck·apca_gate·build·visual]
  G --> H[Changesets → GitHub Packages]
  F --> L[Vercel: docs+dashboard+AI playground]
  H --> L
  L <-->|auth,data,RAG| M[(Supabase: tables+pgvector+edge)]
  L -->|telemetria| M --> L
```

## Fases
- **F1 Design** (Figma): Variables (primitive/semantic, modes por brand) + componentes.
- **F2 Tokenização**: Tokens Studio → DTCG no repo.
- **F3 Build tokens**: Style Dictionary → `flytrap-globals.css` + `tokens.ts`.
- **F4 Componentes**: `@flytrap/ui` (shadcn + charts + AI).
- **F5 Qualidade**: lint · typecheck · **apca_gate** · visual · a11y.
- **F6 Release**: Changesets → SemVer → GitHub Packages.
- **F7 Docs**: Next.js docs + Storybook (Vercel).
- **F8 Backend**: Supabase (tabelas, RAG, edge functions).
- **F9 Deploy**: Vercel (docs + dashboard + AI playground).
- **F10 Telemetria**: adesão → Supabase → dashboard → realimenta F1.

Caminho crítico: tokens → ui → deploy. Backend paralelizável.
