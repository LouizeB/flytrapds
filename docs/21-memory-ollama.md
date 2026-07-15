# Memory Chat and Ollama

Flytrap Memory Chat has two layers:

1. **Source-backed memory** — default for public builds. It answers only from the local allowlist in `apps/docs/src/content/search-index.ts`.
2. **Optional Ollama provider** — local development mode that asks a local Ollama model to rewrite the source-backed answer using the same cited context.

The public site must keep the source-backed fallback. A model response should never replace source citations.

## Local setup

Install and start Ollama locally, then pull a chat model:

```bash
ollama pull llama3.2
```

Run the docs with the optional provider:

```bash
VITE_FLYTRAP_MEMORY_PROVIDER=ollama \
VITE_FLYTRAP_OLLAMA_MODEL=llama3.2 \
VITE_FLYTRAP_OLLAMA_URL=http://127.0.0.1:11434 \
pnpm --filter @flytrap/docs dev
```

If Ollama is unavailable, blocked by the browser, or returns an empty response, the chat falls back to the source-backed memory answer.

## Rules

- The model receives only the top memory results for the question.
- The system prompt instructs the model to answer only from those sources.
- Citations still come from the local memory index.
- No public build should require a local model.
- No secrets or hosted provider keys are required.

## Next improvements

- Add local embeddings for semantic ranking.
- Add an explicit provider switch for development builds.
- Expand the memory index from docs and component metadata.
- Add tests for provider fallback behavior.
