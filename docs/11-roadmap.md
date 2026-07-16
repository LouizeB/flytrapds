# 12. Roadmap

| Milestone | Escopo | Status |
|--|--|--|
| M0 | Scaffold monorepo (pnpm+Turborepo, config, CI) | ✅ |
| M1 | `@louizeb/flytrap-tokens` (HCT 50–950, build, apca_gate) | ✅ |
| M3 | Supabase schema (tabelas, RLS, pgvector, RPC, edge ai-chat) | ✅ schema; Edge Function adiada por ADR 19 |
| M2a | Fundação `@louizeb/flytrap-ui` (React, base + composições AI) | ✅ |
| M2a.1 | Fonte única DTCG, estados de componente e matriz light/dark/vibrant | ✅ |
| M2b | Executar ondas P0 do inventário: foundation + AI + chart | ✅ ondas base, estruturais e streaming/AI entregues |
| M4 | Docs via GitHub Pages; dashboard/previews via Vercel | ✅ docs públicos, previews e auditoria visual |
| M5.1 | Experiência pública: manifesto, anatomia, patterns, componentes e fonte | ✅ primeira experiência implementada; refinamento visual contínuo |
| M5.2 | Artificial Memory: índice allowlist, geração e busca local | ✅ 101 fontes e 508 IDs indexados |
| M5.3 | Flytrap Consciousness: conversa fundamentada, offline e provider Ollama opcional | ✅ fallback source-backed e testes |
| M5.4 | Organismo avançado: arte final, motion e RAG validado | fase futura; depende de evidência de produto |
| — | Ingestão `ds_context` (popular RAG) | adiada por ADR 19 |
| — | Telemetria de adesão estática por componente | ✅ `pnpm adoption:report` e `pnpm adoption:check` |
| — | Consumidores internos reais | ✅ `apps/dashboard` e `apps/studio` |
| — | Comunicação acessível e navegação por foco nos consumidores | ✅ textos simplificados e dark mode consistente |
| — | Primeira distribuição npm | ✅ `@louizeb/flytrap-tokens@0.2.0` e `@louizeb/flytrap-ui@0.5.0` |
| — | Smoke test externo do registry | ✅ instalação limpa e imports públicos validados fora do monorepo |

Caminho crítico atual: integrar o pacote em um produto real → observar adoção e dificuldades → priorizar a próxima versão com evidência.

## Próximas frentes recomendadas

1. **Adoção externa real:** conectar um produto mantido fora deste monorepo e acompanhar o uso contínuo.
2. **Feedback de integração:** registrar dificuldades de instalação, theming, acessibilidade e estabilidade das APIs.
3. **Próxima release:** priorizar correções e melhorias a partir dessas evidências.
4. **RAG avançado:** reavaliar embeddings, ingestão `ds_context` e Edge Function apenas se a busca local falhar em um caso mensurável.
