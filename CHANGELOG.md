# Changelog

Formato: Keep a Changelog · SemVer.

## [Unreleased]
### Changed
- Migração da UI de Lit Web Components para React 19 e componentes locais orientados por tokens.
- Docs e dashboard reescritos como apps React consumidores de `@flytrap/ui`.
- Configuração do gerador de componentes adicionada aos workspaces.
- GitHub Actions separado entre gates de qualidade e publicação do catálogo.

### Added
- Fundação base (`Button`, `Badge`, `Card`, `Input`, `Field`, `Progress`).
- Composições AI (`AgentCard`, `MessageBubble`, `KpiStatCard`, `InsightCallout`).
- Validador estrutural de tokens e matriz APCA light/dark/vibrant.
- Template de anatomia e Definition of Done para componentes.
- Inventário priorizado por fluxos reais, com status, estados e ondas P0/P1/P2.
- Vocabulário iconográfico com aliases semânticos, tokens de tamanho/traço e wrapper acessível.
- Homepage pública do design system e README organizada como portal do projeto.
- GitHub Pages, templates de issue/PR, CODEOWNERS, Dependabot e política de segurança.
- Foundations DTCG para spacing, tipografia, bordas e breakpoints mobile-first.
- Arquitetura explícita de primitives, semantic e component tokens, com taxonomia semântica e dimensões de brand, mode, theme e viewport.
- Contrato compacto de contexto para agentes de IA consumirem o design system sem inventar tokens ou componentes.
- Briefing executável e faseado da experiência pública, com escopo, não objetivos e critérios de aceite da Release 1.

### Fixed
- Build de tokens volta a criar `dist/` em ambientes limpos.
- Build e APCA agora consomem a mesma fonte DTCG, eliminando divergência entre arquivos.
- Preview Vercel gera `@flytrap/tokens` antes de compilar o catálogo em clones limpos.

## [0.1.0] — 2026-06-21
### Added
- Monorepo (pnpm + Turborepo), config compartilhada, CI com gate APCA.
- `@flytrap/tokens`: primitives HCT (6 ramps, 50→950), build → `flytrap-globals.css` + `tokens.ts`.
- Arquitetura em camadas e dimensões no contrato CSS de runtime.
- Ramps semânticas independentes (success/warning/error) + dataviz `--chart-1..5`.
- Supabase (sa-east-1): tabelas, RLS, pgvector, RPC `match_ds_context`, edge `ai-chat` (RAG + Anthropic).
- Documentação ponta a ponta em `docs/`.

### Changed
- Escala migrada de 0–1000 para 50–950 (claro→escuro).
- Supabase recriado em sa-east-1 (antes us-west-2).
