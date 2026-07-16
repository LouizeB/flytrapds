# 12. Roadmap

| Milestone | Escopo | Status |
|--|--|--|
| M0 | Scaffold monorepo (pnpm+Turborepo, config, CI) | ✅ |
| M1 | `@flytrap/tokens` (HCT 50–950, build, apca_gate) | ✅ |
| M3 | Supabase schema (tabelas, RLS, pgvector, RPC, edge ai-chat) | ✅ (deploy da função pendente) |
| M2a | Fundação `@flytrap/ui` (React, base + composições AI) | ✅ |
| M2a.1 | Fonte única DTCG, estados de componente e matriz light/dark/vibrant | ✅ |
| M2b | Executar ondas P0 do inventário: foundation + AI + chart | ✅ ondas base, estruturais e streaming/AI entregues |
| M4 | Docs via GitHub Pages; dashboard/previews via Vercel | ✅ docs públicos, previews e auditoria visual |
| M5.1 | Experiência pública: manifesto, anatomia, patterns, componentes e fonte | ✅ primeira experiência implementada; refinamento visual contínuo |
| M5.2 | Artificial Memory: índice allowlist, geração e busca local | ✅ 101 fontes e 508 IDs indexados |
| M5.3 | Flytrap Consciousness: conversa fundamentada, offline e provider Ollama opcional | ✅ fallback source-backed e testes |
| M5.4 | Organismo avançado: arte final, motion e RAG validado | pesquisa |
| — | Ingestão `ds_context` (popular RAG) | ⏳ |
| — | Telemetria de adesão estática por componente | ✅ `pnpm adoption:report` e `pnpm adoption:check` |
| — | Consumidores internos reais | ✅ `apps/dashboard` e `apps/studio` |
| — | Comunicação acessível e navegação por foco nos consumidores | ✅ textos simplificados e dark mode consistente |

Caminho crítico atual: estabilizar a versão candidata → publicar os pacotes → validar adoção em um produto externo → decidir o escopo do RAG avançado.

## Próximas frentes recomendadas

1. **Release candidate:** manter todos os gates verdes e concluir a revisão visual e editorial dos três apps.
2. **Release:** definir owner npm e publicar `@flytrap/tokens` e `@flytrap/ui` com changeset.
3. **Adoção externa:** conectar um produto fora deste monorepo para provar instalação, theming e estabilidade das APIs publicadas.
4. **RAG avançado:** decidir se embeddings locais, ingestão `ds_context` e deploy da Edge Function pertencem à primeira versão estável ou a uma fase posterior.
