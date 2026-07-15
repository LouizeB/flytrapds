# Memory index candidates

Generated: 2026-07-15T05:28:41.459Z

## Summary

- Indexed sources: 18
- Indexed IDs: 24
- Duplicate IDs: none
- Docs discovered: 23
- Docs not directly indexed: 8
- UI/AI/chart files discovered: 77
- UI/AI/chart files not directly indexed: 75

## Suggested documentation candidates

### 3. Escala de cores

- Source: `docs/02-color-scale.md`
- Suggested id: `3-escala-de-cores`
- Headings: `Categorias`, `Paleta`, `Notas`

### 8. Backend Supabase

- Source: `docs/07-supabase.md`
- Suggested id: `8-backend-supabase`
- Headings: `Schema (migrations aplicadas)`, `RLS`, `Edge Functions`, `Deploy`, `Pendências`

### 9. Secrets

- Source: `docs/08-secrets.md`
- Suggested id: `9-secrets`
- Headings: `GitHub Actions`, `Vercel (público, prefixo `NEXT_PUBLIC_`)`, `Supabase Edge (server-only)`, `Regra`

### 10. Recursos do projeto

- Source: `docs/09-project-links.md`
- Suggested id: `10-recursos-do-projeto`
- Headings: none

### 11. Decisões (ADR)

- Source: `docs/10-decisions.md`
- Suggested id: `11-decisoes-adr`
- Headings: none

### 12. Roadmap

- Source: `docs/11-roadmap.md`
- Suggested id: `12-roadmap`
- Headings: `Próximas frentes recomendadas`

### 16. Experiência pública — Release 1

- Source: `docs/15-public-experience-release-1.md`
- Suggested id: `16-experiencia-publica-release-1`
- Headings: `Objetivo`, `Contrato do projeto`, `Direção criativa`, `Metáfora compartilhada`, `Escopo da Release 1`, `Fora do escopo original`, `Arquitetura de conteúdo`, `Contrato visual da entidade`

### Flytrap DS — Documentação

- Source: `docs/README.md`
- Suggested id: `flytrap-ds-documentacao`
- Headings: `Comece por aqui`, `Referência completa`

## Suggested component candidates

- `Accordion` — `packages/ui/src/components/accordion.tsx`
- `Alert` — `packages/ui/src/components/alert.tsx`
- `Avatar` — `packages/ui/src/components/avatar.tsx`
- `Badge` — `packages/ui/src/components/badge.tsx`
- `BrandMark` — `packages/ui/src/components/brand-mark.tsx`
- `Breadcrumb` — `packages/ui/src/components/breadcrumb.tsx`
- `ButtonGroup` — `packages/ui/src/components/button-group.tsx`
- `Card` — `packages/ui/src/components/card.tsx`
- `Checkbox` — `packages/ui/src/components/checkbox.tsx`
- `CodeBlock` — `packages/ui/src/components/code-block.tsx`
- `Combobox` — `packages/ui/src/components/combobox.tsx`
- `CommandMenu` — `packages/ui/src/components/command-menu.tsx`
- `ComponentPreview` — `packages/ui/src/components/component-preview.tsx`
- `CopyButton` — `packages/ui/src/components/copy-button.tsx`
- `DataList` — `packages/ui/src/components/data-list.tsx`
- `DatePicker` — `packages/ui/src/components/date-picker.tsx`
- `Dialog` — `packages/ui/src/components/dialog.tsx`
- `DropdownMenu` — `packages/ui/src/components/dropdown-menu.tsx`
- `EmptyState` — `packages/ui/src/components/empty-state.tsx`
- `FileUpload` — `packages/ui/src/components/file-upload.tsx`
- `FilterBar` — `packages/ui/src/components/filter-bar.tsx`
- `Form` — `packages/ui/src/components/form.tsx`
- `Header` — `packages/ui/src/components/header.tsx`
- `InlineNotification` — `packages/ui/src/components/inline-notification.tsx`
- `Input` — `packages/ui/src/components/input.tsx`
- `InteractiveCard` — `packages/ui/src/components/interactive-card.tsx`
- `Label` — `packages/ui/src/components/label.tsx`
- `Layout` — `packages/ui/src/components/layout.tsx`
- `MediaCard` — `packages/ui/src/components/media-card.tsx`
- `ModelConfidence` — `packages/ui/src/components/model-confidence.tsx`

## Source request template

Use this when the Memory Chat reports `Needs source`:

```md
## Missing source request

**Question:**
**Type:** component | token | pattern | setup | accessibility | workflow

## Source needed

- [ ] Add or update the canonical documentation.
- [ ] Add the source to `apps/docs/src/content/search-index.ts` or future generated memory data.
- [ ] Include usage, states, accessibility and tokens when component-related.
- [ ] Re-run docs tests and visual audit.
```

