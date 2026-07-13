# Auditoria & Diagnóstico — Flytrap Design System

Data: 2026-07-13 · Escopo: `packages/tokens`, `packages/ui`, `apps/docs`, `apps/dashboard` · Método: análise estática + execução dos gates e da suíte de testes.

---

## Sumário executivo

O Flytrap está em estado **muito acima da média para um DS desta maturidade** (0.4.0): fonte única DTCG com 230 tokens em 3 aparências, gates automatizados de contrato e contraste APCA (54 pares, 0 falhas), 127 testes com axe-core e 100% de cobertura, documentação extensa (18 documentos + arquitetura) e changelog disciplinado. A fundação é claramente aproveitável.

Os três problemas mais caros hoje:

1. **O CI não executa a suíte de testes.** O pipeline de qualidade roda tokens, lint, typecheck e build — mas não `pnpm test`. Os 127 testes com axe (o principal ativo de acessibilidade) só rodam localmente; a documentação afirma o contrário. Uma regressão de acessibilidade chega à `main` sem alarme.
2. **Existe uma cor de marca fora do sistema de tokens.** O verde-lima `#b8ff35` é usado em ~20 pontos como cor de destaque e, pior, como **outline de foco global do próprio pacote `@flytrap/ui`** — ignorando o token `color.border.focus` (`#F10081`/`#32DC00`) que o gate APCA valida. O gate aprova uma cor que o sistema não usa, e a cor usada nunca foi validada (lima sobre fundo claro tende a reprovar).
3. **Distribuição inexistente e adoção não comprovada.** `@flytrap/ui` é `private: true` e exporta `.tsx` cru; os únicos consumidores são o site de docs e um demo de 21 linhas. Nenhum produto real exercita o sistema — o risco clássico de "DS de vitrine".

**Recomendação: EVOLUIR.** Não há nada a reconstruir — há lacunas de enforcement e distribuição a fechar. Plano em 3 fases ao final.

---

## Diagnóstico por dimensão

### 1. Tokens — nota 4/5

**Evidências a favor:**
- Fonte única DTCG (`packages/tokens/src/flytrap.tokens.json`, 577 linhas) com 4 camadas (66 primitives, 51 foundations, 49 semantic, 39 component) e 3 aparências (light/dark/vibrant), compilada por `build.mjs` para CSS custom properties + `@theme` Tailwind + TypeScript.
- Gate de contrato (`scripts/token_contract.py`): 230 tokens resolvem nas 3 aparências; 39 aliases de componente respeitam fronteiras de camada — **PASS**.
- Gate APCA (`scripts/apca_gate.py`): 54 pares, 0 falhas — **PASS**.
- Zero hex hardcoded nos componentes de `packages/ui/src/components|ai|charts`.

**Evidências contra:**
- `packages/ui/src/styles/globals.css:103` — foco global `outline: 2px solid #b8ff35`, cor **ausente do arquivo de tokens**. O token `color.border.focus` existe, passa no APCA e não é usado aqui.
- `globals.css:14–92` — `#17111d`, `#05060a` e um bloco de overrides `.flytrap-light .text-white/* { … !important }` (estilos específicos do site de docs vivendo dentro do pacote do DS).
- `apps/docs/src`: **168 ocorrências de hex** (66 só em `main.tsx`), incluindo duplicação do primitive `#F10081` e ~20 usos de `#b8ff35`.

**Impacto:** o valor central do sistema — "toda decisão de cor vive no token e passa por gate" — é violado pelo próprio pacote e pela vitrine pública. Rebrand ou ajuste de contraste no foco não propaga.

### 2. Inventário real vs. declarado — nota 3/5

- **Declarado:** 51 módulos exportados no barrel (`packages/ui/src/index.ts`): 33 componentes base, 16 componentes AI, 1 chart, ícones e utils. Inventário documentado em `docs/04-components.md` e catálogo de API em `docs/17-component-api-quality.md`.
- **Uso real:** apenas 5 arquivos importam `@flytrap/ui` — todos internos. O `apps/dashboard` é um demo de **21 linhas**; o `apps/docs` usa ~25 símbolos (maioria ícones). Componentes inteiros (Sheet, Toast, Popover, Pagination, CommandMenu, quase toda a família AI de conversa) **não têm nenhum consumidor**.
- Não há duplicação nem componentes abandonados — o problema é o inverso: superfície grande construída à frente da demanda, sem produto que a valide.

**Impacto:** APIs não exercitadas por uso real tendem a mudar quando o primeiro produto de verdade chegar; cada componente sem consumidor é custo de manutenção especulativo.

### 3. Acessibilidade — nota 4/5

- 127 testes passando com **100% de cobertura** (statements, branches, functions, lines), incluindo asserções `axe` por componente e por tema (`packages/ui/tests/*.test.tsx`).
- Regra `color-contrast` desabilitada no axe **com justificativa documentada** (jsdom não renderiza cor; contraste delegado ao gate APCA) — decisão correta.
- Padrões acessíveis no código: `Button` com `aria-busy`/`loadingAnnouncement` e bloqueio de ativação em `asChild` disabled; `Field`/`SwitchField` com label/erro explícitos; skip-link no site de docs.
- **Contra:** (a) nada disso roda no CI — ver dimensão 5; (b) o outline de foco real (`#b8ff35`) está fora do gate APCA — sobre os fundos claros do tema `flytrap-light`, um lima claro dificilmente atinge Lc 45; (c) contraste do site público nunca é medido (APCA cobre só pares de token).

### 4. Consistência de API — nota 4/5

- Padrão uniforme: CVA + `cn()` + `data-slot` em todos os componentes; convenção shadcn/Radix reconhecível; contratos e antipadrões **escritos** (`docs/17-component-api-quality.md`) — raro e valioso.
- Inconsistências menores: variantes `default/secondary/destructive` do Button usam tokens de componente (`--button-primary-*`), mas `ghost/outline` caem em tokens semânticos genéricos (`hover:bg-accent`) — mistura de camadas dentro do mesmo componente (`packages/ui/src/components/button.tsx:12–17`). Apps importam só pelo barrel, então os entry points `./components/*` declarados no `exports` não são exercitados.

### 5. Arquitetura e distribuição — nota 3/5

- **A favor:** monorepo pnpm + Turborepo limpo; fronteiras corretas (tokens sem dependência de framework; UI com React como peer); CHANGELOG em SemVer; CI com concurrency e permissões mínimas.
- **Contra (o gap mais estrutural da auditoria):**
  - `.github/workflows/ci.yml` valida tokens, lint, typecheck e build, **mas não tem step de `pnpm test`** — contradiz a matriz de validação de `docs/17` ("cada entrega executa pnpm test").
  - `@flytrap/ui` é `private: true` e o export principal aponta para `./src/index.ts` (fonte `.tsx` crua): só consumível dentro do monorepo, por quem tenha pipeline TS+Tailwind idêntico. `tsconfig.build.json` existe mas o dist não é o que se publica.
  - Sem changesets/automação de release; versões dessincronizadas (`tokens` 0.1.0, `ui` 0.4.0, docs 0.2.0).

### 6. Documentação e adoção — nota 4/5 (docs) · 2/5 (adoção)

- Documentação excepcional para o estágio: 18 documentos (`docs/`) + arquitetura semântica (`architecture/`), trilhas separadas para design e dev, registro de decisões (`docs/10-decisions.md`), roadmap vivo (`docs/11-roadmap.md`).
- Divergência doc↔realidade encontrada: a matriz de validação promete `pnpm test` em cada entrega (não está no CI) e o roadmap M4 indica primeiro deploy pendente.
- Adoção: nenhum time/produto externo; sem telemetria (está no backlog do roadmap). A adoção é a hipótese ainda não testada do sistema.

### 7. Divergência design ↔ código — nota 2.5/5 (parcialmente verificável)

- A documentação descreve o pipeline `Figma (collection por brand) → Tokens Studio → DTCG versionado → gates → build` (`docs/05-multibrand.md:36`) e o README referencia o projeto Figma `65368906` — mas **não há no repositório nenhum artefato de sincronização** (export do Tokens Studio, config, workflow). O elo Figma→DTCG é manual ou aspiracional.
- O sinal indireto é o `#b8ff35`: a direção de arte da experiência pública evoluiu (lima como accent da identidade "living") sem que a fonte de tokens acompanhasse — exatamente o tipo de deriva que o pipeline declarado deveria impedir.

---

## Recomendação central: EVOLUIR

Critério do skill: *fundação aproveitável (tokens razoáveis, base de componentes usada) → evolução incremental por camada.* A fundação aqui é mais que razoável — tokens com gates executáveis, 100% de cobertura com axe e docs de primeira linha. Os problemas são de **enforcement** (CI), **coerência** (cor fora do sistema) e **distribuição/adoção** — todos endereçáveis sem reescrever nada. Reconstruir destruiria valor.

---

## Plano proposto

### Fase 1 — Fechar as brechas de confiança (1 sprint)
1. **CI:** adicionar `pnpm test:coverage` ao `ci.yml` (com threshold 100% já atingido). Custo mínimo, elimina o risco nº 1.
2. **Tokenizar o lima:** promover `#b8ff35` a primitive + semantic (ex.: `color.accent.lively` e/ou novo `color.border.focus` dark/vibrant), rodar o par no gate APCA e decidir com design o que fazer no tema claro (provável reprovação → escolher variante escura do lima ou manter `#F10081` no light).
3. **Foco global:** trocar `globals.css:103` por `var(--border-focus)`; migrar `#17111d`/`#05060a` para tokens; mover os overrides `.flytrap-light .text-white/*` do pacote UI para o app docs (estilo de site não pertence ao DS).

### Fase 2 — Coerência da vitrine e distribuição (1–2 sprints)
4. **Docs app:** substituir as 168 ocorrências de hex por tokens/Tailwind theme — ou demarcar explicitamente os módulos `living/*` como camada de arte fora do contrato (decisão documentada em `docs/10-decisions.md`).
5. **Decisão de distribuição:** se o DS vai ser consumido fora do monorepo, remover `private: true`, publicar dist compilado (o `tsconfig.build.json` já existe) e adotar changesets com versionamento coordenado tokens/ui. Se não, documentar o contrato de consumo por fonte.
6. **Unificar camadas no Button:** dar a `ghost/outline` os mesmos tokens de componente das demais variantes.

### Fase 3 — Fechar o ciclo design↔código e provar adoção (contínuo)
7. **Materializar o elo Figma→DTCG:** commitar o export do Tokens Studio + check de drift no CI, ou ajustar a documentação para refletir o processo manual real.
8. **Primeiro consumidor real:** priorizar o M4/M5 do roadmap (deploy público + dashboard com dados reais) — é o que valida as APIs da onda AI antes de expandir o inventário.
9. **Telemetria de adesão** (já no backlog do roadmap): medir imports por componente para orientar o que evoluir ou aposentar.

### O que se aproveita do existente
Praticamente tudo: fonte DTCG e build, os dois gates Python, a suíte de testes, os componentes, a documentação e o CI (com o step de teste adicionado). Nenhum item do plano é reescrita.

---

*Gate humano: este relatório deve ser revisado pelo delivery lead antes de apresentação. A recomendação evoluir/reconstruir é decisão comercial tanto quanto técnica.*
