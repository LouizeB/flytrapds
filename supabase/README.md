# Supabase — Flytrap DS

Projeto: `flytrapds-br` · ref `uirglklokweglfocftyd` · região `sa-east-1`.

## Migrations (aplicadas)
- 0001 core tables (component_registry, component_adoption, apca_audit, ds_context + pgvector)
- 0002 RLS (read público em registry/adoption/apca; ds_context sem anon)
- 0003 índice HNSW (cosine) em ds_context.embedding
- 0004 RPC match_ds_context (RAG, vector(1024) Voyage)

## Edge Functions
- `ai-chat` — RAG em ds_context + proxy Anthropic (key server-side)

## Deploy
```bash
supabase link --project-ref uirglklokweglfocftyd
supabase db push                      # aplica migrations
supabase functions deploy ai-chat
supabase secrets set ANTHROPIC_API_KEY=... VOYAGE_API_KEY=...
```

## Secrets (Edge only)
ANTHROPIC_API_KEY · VOYAGE_API_KEY · (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY são injetados pelo runtime)
