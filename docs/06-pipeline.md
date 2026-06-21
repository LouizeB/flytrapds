# 7. Pipeline Figma → Deploy

10 fases. Ferramentas: Figma · GitHub Actions/Pages · Vercel · Supabase.

```mermaid
flowchart LR
  A[Figma Variables+Components] -->|Tokens Studio| B[(GitHub *.tokens.json)]
  B --> C[build.mjs] --> D[globals.css+ts] --> E[packages/ui React+shadcn+AI] --> F[apps/docs]
  B --> G[CI: lint·typecheck·apca_gate·build·visual]
  G --> H[Changesets → GitHub Packages]
  F --> P[GitHub Pages: site público]
  E --> K[apps/dashboard+AI playground] --> L[Vercel]
  H --> L
  L <-->|auth,data,RAG| M[(Supabase: tables+pgvector+edge)]
  L -->|telemetria| M --> L
```

## Fases
- **F1 Design** (Figma): Variables (primitive/semantic, modes por brand) + componentes.
- **F2 Tokenização**: Tokens Studio → DTCG no repo.
- **F3 Build tokens**: gerador `build.mjs` → `flytrap-globals.css` + `tokens.ts`.
- **F4 Componentes**: `@flytrap/ui` (shadcn + charts + AI).
- **F5 Qualidade**: lint · typecheck · **apca_gate** · visual · a11y.
- **F6 Release**: Changesets → SemVer → GitHub Packages.
- **F7 Docs**: catálogo React + Vite publicado por GitHub Pages.
- **F8 Backend**: Supabase (tabelas, RAG, edge functions).
- **F9 Deploy**: GitHub Pages para docs; Vercel para dashboard e previews.
- **F10 Telemetria**: adesão → Supabase → dashboard → realimenta F1.

Caminho crítico: tokens → ui → deploy. Backend paralelizável.
