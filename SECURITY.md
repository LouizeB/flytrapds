# Security Policy

## Reporting a vulnerability

Não abra uma issue pública para vulnerabilidades, chaves expostas ou dados sensíveis.

Use o [private vulnerability reporting](https://github.com/LouizeB/flytrapds/security/advisories/new) do GitHub. Inclua impacto, reprodução mínima e versões afetadas, removendo qualquer credencial real.

Secrets de providers pertencem ao Supabase Edge Functions ou aos secrets do GitHub Actions. Eles nunca devem ser adicionados ao repositório, `.env` versionado, documentação, screenshots ou logs.

## Supported version

Enquanto o Flytrap estiver em `0.x`, correções de segurança são aplicadas à branch `main` e à versão mais recente publicada.
