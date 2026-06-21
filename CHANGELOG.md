# Changelog

Formato: Keep a Changelog · SemVer.

## [Unreleased]
### Changed
- Migração da UI de Lit Web Components para React 19 + Tailwind v4 + shadcn/ui.
- Docs e dashboard reescritos como apps React consumidores de `@flytrap/ui`.
- Configuração shadcn de monorepo adicionada aos workspaces.
- GitHub Actions separado entre gates de qualidade e publicação do catálogo.

### Added
- Fundação base (`Button`, `Badge`, `Card`, `Input`, `Field`, `Progress`).
- Composições AI (`AgentCard`, `MessageBubble`, `KpiStatCard`, `InsightCallout`).
- Validador estrutural de tokens e matriz APCA light/dark/vibrant.
- Template de anatomia e Definition of Done para componentes.
- Inventário priorizado por fluxos reais, com status, estados e ondas P0/P1/P2.
- Vocabulário iconográfico Lucide com aliases semânticos, tokens de tamanho/traço e wrapper acessível.
- Homepage pública do design system e README organizada como portal do projeto.
- GitHub Pages, templates de issue/PR, CODEOWNERS, Dependabot e política de segurança.

### Fixed
- Build de tokens volta a criar `dist/` em ambientes limpos.
- Build e APCA agora consomem a mesma fonte DTCG, eliminando divergência entre arquivos.

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
