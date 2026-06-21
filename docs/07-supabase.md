# 8. Backend Supabase

Projeto: `flytrapds-br` · ref `uirglklokweglfocftyd` · região **sa-east-1** (São Paulo).
API: `https://uirglklokweglfocftyd.supabase.co`.

## Schema (migrations aplicadas)
- `component_registry` — catálogo de componentes (layer, status, base shadcn, tokens).
- `component_adoption` — uso por squad/componente, adesão 0–100.
- `apca_audit` — histórico de contraste (par, mode, role, Lc, target, passed).
- `ds_context` — chunks + `vector(1024)` (RAG dos AI Context Packs).
- RPC `match_ds_context` — busca por similaridade (cosine).

## RLS
- Leitura pública (anon): registry, adoption, apca.
- `ds_context`: sem acesso anon. RAG só via Edge (service role).
- Escrita: só via Edge Functions (service role ignora RLS).

## Edge Functions
- `ai-chat` — RAG em `ds_context` + proxy Anthropic (`claude-sonnet-4-6`), key server-side, CORS travado em `flytrapds.vercel.app`. Embeddings: **Voyage** `voyage-3` (1024).

## Deploy
```bash
supabase link --project-ref uirglklokweglfocftyd
supabase db push
supabase functions deploy ai-chat
supabase secrets set ANTHROPIC_API_KEY=... VOYAGE_API_KEY=...
```

## Pendências
- Popular `ds_context` (função de ingestão dos docs do DS).
- Pausar/excluir projeto antigo `qwzyhgexhcnzzkluztmg` (us-west-2).
