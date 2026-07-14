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
| M5.2 | Artificial Memory: índice allowlist e busca local | planejado |
| M5.3 | Flytrap Consciousness: conversa fundamentada e offline | planejado |
| M5.4 | Organismo avançado: arte final, motion e RAG validado | pesquisa |
| — | Ingestão `ds_context` (popular RAG) | ⏳ |
| — | Telemetria de adesão estática por componente | ✅ `pnpm adoption:report` e `pnpm adoption:check` |
| — | Consumidores internos reais | ✅ `apps/dashboard` e `apps/studio` |

Caminho crítico atual: endurecer documentação por pattern → validar adoção em produto real → preparar release/distribuição externa.

## Próximas frentes recomendadas

1. **Pattern library:** transformar os patterns iniciais em páginas/âncoras mais completas com problema, anatomia, acessibilidade, componentes usados e exemplos.
2. **Adoção externa:** conectar um produto fora da vitrine/docs para provar estabilidade das APIs.
3. **Memory:** iniciar índice allowlist e busca local sem simular IA conversacional.
4. **Release:** definir owner npm e rodar publicação real quando a governança estiver aprovada.
