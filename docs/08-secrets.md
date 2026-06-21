# 9. Secrets

Repo público: segredo só no destino correto. Service role e Anthropic key nunca saem do Supabase Edge.

## GitHub Actions
`FIGMA_TOKEN`, `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`. `GITHUB_PACKAGES_TOKEN` opcional (mesmo-repo usa `GITHUB_TOKEN` nativo + `permissions: packages: write`).

## Vercel (público, prefixo `NEXT_PUBLIC_`)
`NEXT_PUBLIC_SUPABASE_URL` = `https://uirglklokweglfocftyd.supabase.co` · `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Anon key segura no client **se RLS ativo**.

## Supabase Edge (server-only)
`ANTHROPIC_API_KEY`, `VOYAGE_API_KEY`. (`SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` injetados no runtime.)

## Regra
`SERVICE_ROLE` / `ANTHROPIC_API_KEY` / `VOYAGE_API_KEY` nunca em env público da Vercel nem em commit.
