# Changelog

Formato: Keep a Changelog · SemVer.

## [0.1.0] — 2026-06-21
### Added
- Monorepo (pnpm + Turborepo), config compartilhada, CI com gate APCA.
- `@flytrap/tokens`: primitives HCT (6 ramps, 50→950), build → `flytrap-globals.css` + `tokens.ts`.
- Arquitetura 3 camadas × 3 dimensões (brand/mode/theme) no contrato shadcn (Tailwind v4).
- Ramps semânticas independentes (success/warning/error) + dataviz `--chart-1..5`.
- Supabase (sa-east-1): tabelas, RLS, pgvector, RPC `match_ds_context`, edge `ai-chat` (RAG + Anthropic).
- Documentação ponta a ponta em `docs/`.

### Changed
- Escala migrada de 0–1000 para 50–950 (claro→escuro).
- Supabase recriado em sa-east-1 (antes us-west-2).
