# 1. Visão geral

**Flytrap** é um design system multibrand, AI-first, construído sobre tokens semânticos e componentes React.

## Conceito
Tema "Venus Flytrap": dualidade Vênus (beleza, escultura, estrutura) + Dionaea (orgânico, vibrante, predatório). Estética líquida/iridescente/alien traduzida em superfície expressiva sobre arquitetura atômica rígida de tokens.

## Objetivos
- Tokens multibrand com modes (light/dark) e themes (vibrant).
- Acessibilidade APCA como gate de CI (não opcional).
- Cobrir superfícies AI: agents, dashboards inteligentes, AI chat.
- Pipeline completo Figma → Deploy documentado.

## Stack
- CSS variables geradas do contrato DTCG
- Monorepo pnpm + Turborepo
- Figma (design) · GitHub (source/CI) · Vercel (deploy) · Supabase (backend/RAG)

## Marca
- Primária: magenta `#F10081`
- Secundária: verde orgânico validado por tokens; lima artístico fica restrito à experiência pública.
- Tipografia: Fira Sans (display) · Ubuntu Sans (texto) · Roboto Mono (mono)

## Status
M0 scaffold ✅ · M1 tokens ✅ · M2 fundação UI ✅ · M3 Supabase schema ✅ · M4 deploy/docs ✅ · M5 experiência pública e consumidores reais em evolução ✅
