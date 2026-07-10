# 16. Experiência pública — Release 1

Status: **briefing aprovado para implementação**  
Nome oficial: **Flytrap Design System**  
Conceito narrativo: **A living organism for artificial futures**

## Objetivo

Transformar o catálogo público do Flytrap em uma experiência editorial acessível que apresente o design system como organismo vivo, sem perder clareza, rastreabilidade ou desempenho.

A Release 1 deve fazer o visitante:

- reconhecer uma identidade própria, botânica e tecnológica;
- compreender a metáfora do organismo;
- acessar arquitetura, documentação e código reais;
- navegar com teclado, touch, leitor de tela e movimento reduzido;
- perceber que memória, consciência e mutação são direções futuras, não recursos simulados.

## Contrato do projeto

Antes de implementar:

1. Trabalhar no monorepo existente com React, Vite, TypeScript e pnpm.
2. Preservar `apps/`, `packages/`, `docs/`, `architecture/` e os workflows atuais.
3. Reutilizar componentes exportados por `@flytrap/ui`.
4. Consumir semantic ou component tokens gerados pelo DTCG.
5. Não copiar hexadecimais, primitives ou valores do briefing para a UI.
6. Não trocar framework, roteamento, deploy ou estratégia de estilos nesta release.
7. Não apagar a página atual antes de a nova experiência passar pelos gates.

Fontes normativas:

- arquitetura: [`architecture/README.md`](../architecture/README.md);
- tokens: [`packages/tokens/src/flytrap.tokens.json`](../packages/tokens/src/flytrap.tokens.json);
- componentes: [`docs/04-components.md`](04-components.md);
- acessibilidade: [`docs/03-accessibility-apca.md`](03-accessibility-apca.md);
- anatomia: [`docs/12-component-anatomy.md`](12-component-anatomy.md).

## Direção criativa

Conceito: **Cyberpunk Botanical Intelligence**.

O resultado deve combinar organismo botânico, arquivo tecnológico e editorial experimental. Deve parecer vivo e estranho, mas continuar legível e confiável.

Evitar:

- landing page de SaaS;
- dashboard corporativo;
- catálogo composto por cards idênticos;
- estética genérica de produto de IA;
- excesso de glitch, partículas ou parallax;
- texto longo sobre fundos visualmente complexos;
- exposição de ferramentas internas como identidade do produto.

## Metáfora compartilhada

| Sistema | Metáfora | Função real |
|--|--|--|
| Foundations | esqueleto | escalas estruturais |
| Tokens | código genético | valores e aliases versionados |
| Components | órgãos | unidades interativas reutilizáveis |
| Patterns | comportamento aprendido | composições recorrentes |
| Documentation | memória | decisões e instruções |
| GitHub | sistema nervoso | colaboração e histórico |
| RAG | consciência coletiva futura | recuperação fundamentada |
| AI | voz futura | interface conversacional |
| Contributors | agentes de mutação | evolução do sistema |

A metáfora apoia a narrativa; os nomes técnicos continuam disponíveis em cada seção.

## Escopo da Release 1

### 1. Navegação do organismo

- skip link para o conteúdo;
- navegação persistente ou flutuante;
- indicador da seção atual;
- acesso ao GitHub;
- controle **Reduzir atividade do organismo**;
- menu mobile em tela cheia com foco gerenciado e Escape.

Itens: `Manifesto`, `Anatomia`, `Mutações`, `Espécimes`, `Fonte`.

### 2. Awakening

Hero de abertura com:

- “Design was never meant to remain static.”;
- explicação curta do Flytrap;
- ações para entrar no organismo, consultar memória documental e inspecionar o código;
- entidade visual abstrata substituível;
- status e referências reais do repositório;
- convite de rolagem.

A entidade inicial deve usar formas botânicas abstratas e possuir um slot documentado para arte final. Não gerar nem escolher personagem definitiva nesta release.

### 3. Manifesto

Usar o manifesto aprovado do briefing original em HTML semântico.

- progressão editorial por blocos curtos;
- assimetria e escala sem comprometer a ordem de leitura;
- todo o texto acessível sem JavaScript ou animação;
- nenhuma frase essencial posicionada apenas como decoração.

### 4. Anatomia do organismo

Visualização em HTML e SVG acessível para foundations, tokens, components, patterns, documentation, GitHub, RAG, AI e contributors.

Cada item deve apresentar:

- descrição poética;
- descrição técnica;
- status real;
- arquivos relacionados;
- link para o repositório.

RAG e AI devem aparecer como **direções futuras** quando não estiverem operacionais. Não incluir ações falsas de conversa.

### 5. Mutation log

Timeline baseada no roadmap versionado:

- germination;
- organ formation;
- memory;
- language;
- consciousness;
- reproduction.

Cada etapa deve diferenciar `done`, `in progress`, `planned` e `research`. No mobile, usar uma lista vertical linear.

### 6. Observed structures

Laboratório com apenas os componentes realmente exportados pelo repositório.

Cada espécime inclui nome, categoria, status, preview quando seguro, acessibilidade e link para o source. Metadados ausentes recebem **Unverified specimen**.

### 7. Source artifact

Apresentar estrutura e documentação locais sem depender da API do GitHub em runtime.

- repositório;
- pastas principais;
- DTCG;
- documentação;
- contribuição;
- changelog.

### 8. Final transmission

Fechamento mais silencioso com acesso à fonte, documentação e contribuição. Não incluir chat ou busca simulados.

## Fora do escopo

Não implementar nesta release:

- boot sequence;
- busca local e atalho Command/Control + K;
- chat, mock de modelo ou route de IA;
- indexação de código;
- visualização RAG animada;
- banco vetorial ou ingestão;
- integração em tempo real com GitHub;
- personagem final;
- WebGL, 3D, vídeo automático ou nova biblioteca de animação.

Esses itens pertencem às Releases 2–4 e não devem deixar código preparatório sem consumidor.

## Arquitetura de conteúdo

O conteúdo editável fica fora dos componentes:

```text
apps/docs/src/
├── content/
│   ├── anatomy.ts
│   ├── manifesto.ts
│   ├── mutations.ts
│   └── source.ts
├── sections/
│   ├── awakening.tsx
│   ├── manifesto.tsx
│   ├── anatomy.tsx
│   ├── mutations.tsx
│   ├── specimens.tsx
│   ├── source-artifact.tsx
│   └── final-transmission.tsx
└── system/
    ├── navigation.tsx
    ├── organism-entity.tsx
    └── reduce-activity.tsx
```

Adaptar nomes quando a estrutura real pedir, mantendo conteúdo, seções e controles separados. `main.tsx` apenas compõe a página.

## Contrato visual da entidade

O componente aceita:

- arte estática com dimensões reservadas;
- camadas opcionais de foreground/background;
- movimento respiratório discreto;
- fallback abstrato;
- estado sem movimento;
- descrição textual quando a imagem tiver significado.

Arte final deve ser adicionada apenas após aprovação visual. Nenhuma stock image é permitida.

## Movimento

Princípios: orgânico, lento, intencional e interrompível.

Orçamento:

- no máximo três sistemas decorativos animados simultaneamente no viewport;
- transform e opacity como propriedades preferenciais;
- nenhum flash rápido ou glitch contínuo;
- parallax máximo discreto e desativado no mobile;
- conteúdo não espera animação para aparecer;
- nenhuma dependência nova de motion na Release 1.

O controle de redução:

- interrompe animações decorativas;
- remove parallax e reações ao cursor;
- preserva transições funcionais;
- persiste a preferência localmente;
- respeita `prefers-reduced-motion` como estado inicial.

## Responsividade

- `base`: narrativa linear, uma coluna e baixa atividade visual;
- `md`: composições editoriais em duas regiões quando legíveis;
- `lg`: navegação persistente e sobreposições controladas;
- `xl/2xl`: ampliar espaço negativo, não o comprimento das linhas.

Componentes reutilizáveis usam container queries quando sua adaptação depender do container. Shell e narrativa usam os breakpoints publicados.

## Acessibilidade

Critérios obrigatórios:

- landmarks e hierarquia de headings;
- fluxo coerente sem CSS;
- navegação integral por teclado;
- foco visível e retorno de foco;
- alvos de toque adequados;
- SVG com título/descrição quando significativo;
- decoração removida da árvore acessível;
- estados não dependentes apenas de cor ou ícone;
- contraste incluído na matriz APCA;
- ausência de flashes e movimento essencial;
- textos do manifesto disponíveis sem animação.

## Performance

- página funcional sem JavaScript para conteúdo essencial;
- nenhuma imagem causa layout shift;
- assets abaixo da dobra usam carregamento tardio;
- arte preferencialmente WebP/AVIF com fallback;
- zero biblioteca visual pesada nova;
- nenhum request obrigatório para API externa;
- experiência mobile usa menos camadas decorativas.

## Critérios de aceite

A Release 1 está pronta quando:

1. Todas as oito seções do escopo existem e usam conteúdo real.
2. Nenhum primitive ou hexadecimal foi introduzido na UI.
3. Nenhum componente ou status foi inventado.
4. Links apontam para `LouizeB/flytrapds` e arquivos existentes.
5. Redução de atividade funciona e persiste.
6. Desktop, tablet e mobile têm composições intencionais.
7. A página funciona sem secrets, Supabase ou provedor de IA.
8. A implementação não divulga fornecedores estruturais como identidade do Flytrap.
9. O conteúdo essencial permanece acessível com animações desativadas.
10. Todos os gates passam.

## Validação

```bash
pnpm tokens:contract
pnpm apca
pnpm lint
pnpm typecheck
pnpm build
```

Além dos comandos:

- revisar teclado e ordem de foco;
- verificar `prefers-reduced-motion` e controle manual;
- inspecionar 375px, 768px, 1024px e 1440px;
- confirmar ausência de requests externos obrigatórios;
- procurar secrets e valores visuais hardcoded;
- revisar todos os links do GitHub.

## Entrega esperada

O handoff deve informar:

- seções e componentes criados;
- conteúdo real utilizado;
- tokens semantic/component consumidos;
- assets reais e placeholders;
- decisões responsivas e acessíveis;
- dependências adicionadas — idealmente nenhuma;
- comandos executados e resultados;
- limitações conhecidas;
- itens explicitamente deixados para a Release 2.

## Releases seguintes

| Release | Resultado |
|--|--|
| 2 — Memory | índice allowlist, busca local, resultados e atalho de teclado |
| 3 — Consciousness | conversa fundamentada, fontes, offline e provider abstraction |
| 4 — Advanced organism | arte final, movimento avançado e integração RAG validada |
