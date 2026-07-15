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

## Visible answer states

The Memory Chat exposes its retrieval state in the UI:

- **High confidence** — the local index found a strong source match.
- **Medium confidence** — the index found sources, but the match is weaker.
- **Needs source** — no reliable indexed source was found; the answer should not be treated as guidance yet.
- **Fallback used** — Ollama was requested but skipped or failed, so the cited source-backed answer was returned.

The suggested prompt chips are intentionally curated. They help users discover supported questions without implying that the chat can answer from undocumented knowledge.

## Missing source flow

When the chat reports **Needs source**, the UI can generate a source request:

1. choose the missing source type: component, token, pattern, setup, accessibility or workflow;
2. review the generated Markdown checklist;
3. copy the request or open a prefilled GitHub issue;
4. add or update the canonical documentation;
5. add the new source to the memory index and re-run validation.

The repo also includes a maintenance report:

```bash
pnpm memory:report
```

It scans documentation and UI/AI/chart component files, compares them with the indexed memory sources and writes `.planning/memory-index-candidates.md`.

The first promoted batch covers project overview, multibrand/modes, Figma-to-deploy pipeline, design-code sync, component API quality, semantic iconography, brand assets and this Memory/Ollama guide. The second batch covers color scale, Supabase, secrets, project links, ADRs, roadmap, public experience and README. The first component batch covers Alert, InlineNotification, Avatar, BrandMark, Badge, ButtonGroup, Card, CodeBlock, Combobox, DataList, DatePicker, Dialog, DropdownMenu, EmptyState and FileUpload. The report now shows 0 directly unindexed docs and a shrinking component backlog.

## Next improvements

- Add local embeddings for semantic ranking.
- Promote the remaining high-value component candidates from `.planning/memory-index-candidates.md` into individual component documentation sources.
