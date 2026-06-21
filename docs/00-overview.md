# 1. Visão geral

**Flytrap** é um design system multibrand, AI-first, construído sobre Tailwind v4 + shadcn/ui.

## Conceito
Tema "Venus Flytrap": dualidade Vênus (beleza, escultura, estrutura) + Dionaea (orgânico, vibrante, predatório). Estética líquida/iridescente/alien traduzida em superfície expressiva sobre arquitetura atômica rígida de tokens.

## Objetivos
- Tokens multibrand com modes (light/dark) e themes (vibrant).
- Acessibilidade APCA como gate de CI (não opcional).
- Cobrir superfícies AI: agents, dashboards inteligentes, AI chat.
- Pipeline completo Figma → Deploy documentado.

## Stack
- Tailwind v4 (CSS variables) + shadcn/ui
- Monorepo pnpm + Turborepo
- Figma (design) · GitHub (source/CI) · Vercel (deploy) · Supabase (backend/RAG)

## Marca
- Primária: magenta `#F10081`
- Secundária: acid (lime)
- Tipografia: Fira Sans (display) · Ubuntu Sans (texto) · Roboto Mono (mono)

## Status
M0 scaffold ✅ · M1 tokens ✅ · M3 Supabase schema ✅ · M2 UI ⏳ · M4 deploy ⏳
