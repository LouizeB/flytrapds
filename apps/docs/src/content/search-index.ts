export type FlytrapMemoryType =
  | "component"
  | "development"
  | "governance"
  | "pattern"
  | "token"
  | "workflow";

export interface FlytrapMemoryItem {
  answer: string;
  href: string;
  id: string;
  source: string;
  summary: string;
  tags: readonly string[];
  title: string;
  type: FlytrapMemoryType;
}

export interface FlytrapMemoryResult extends FlytrapMemoryItem {
  score: number;
}

export interface FlytrapMemoryAnswer {
  confidence: "high" | "medium" | "low";
  response: string;
  sources: FlytrapMemoryResult[];
}

export const flytrapMemoryIndex = [
  {
    answer: "Flytrap is a multibrand, AI-first design system built on semantic tokens, React components, APCA gates and a living public documentation experience.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/docs/00-overview.md",
    id: "flytrap-overview",
    source: "docs/00-overview.md",
    summary: "Project concept, goals, stack, brand language and maturity status.",
    tags: ["overview", "flytrap", "design system", "ai-first", "multibrand", "stack", "status", "brand"],
    title: "Flytrap overview",
    type: "governance",
  },
  {
    answer: "Install `@flytrap/ui`, import the component from the package barrel, and load `@flytrap/ui/styles` once in the app entry.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/docs/18-distribution.md",
    id: "install-ui",
    source: "docs/18-distribution.md",
    summary: "Package installation, distribution and usage contract for product teams.",
    tags: ["install", "package", "pnpm", "npm", "styles", "@flytrap/ui", "setup"],
    title: "Install the Design System",
    type: "development",
  },
  {
    answer: "Use Button for primary, secondary, outline, ghost and link actions. Keep loading, disabled and focus states explicit.",
    href: "#component-inputs",
    id: "button-component",
    source: "packages/ui/src/components/button.tsx",
    summary: "Action component with tokenized variants, sizes, loading behavior and accessible focus.",
    tags: ["button", "action", "primary", "secondary", "loading", "disabled", "focus"],
    title: "Button",
    type: "component",
  },
  {
    answer: "Use Form, Field, Label, Input, Textarea, Select, Checkbox, RadioGroup and validation messages to build accessible form flows.",
    href: "#component-inputs",
    id: "form-components",
    source: "docs/04-components.md",
    summary: "Input and form components for data collection with labels, helper text, errors and explicit states.",
    tags: ["form", "field", "label", "input", "textarea", "select", "checkbox", "radio", "validation"],
    title: "Forms and inputs",
    type: "component",
  },
  {
    answer: "Use SearchField when users need to filter components, docs or local memory. It exposes a searchbox role and clear action.",
    href: "#component-inputs",
    id: "search-field-component",
    source: "packages/ui/src/components/search-field.tsx",
    summary: "Search input with accessible role, icon affordance and clear button.",
    tags: ["search", "searchfield", "filter", "input", "clear", "memory"],
    title: "SearchField",
    type: "component",
  },
  {
    answer: "Use DropdownMenu, Combobox, CommandMenu, Tabs, Breadcrumb and NavigationRail when users need to move through commands, sections or grouped choices.",
    href: "#component-navigation",
    id: "navigation-components",
    source: "docs/04-components.md",
    summary: "Navigation and command components with keyboard order, current state and explicit labels.",
    tags: ["navigation", "dropdown", "combobox", "command", "tabs", "breadcrumb", "rail", "keyboard"],
    title: "Navigation components",
    type: "component",
  },
  {
    answer: "Use SmartDataTable, DataList, Timeline, TokenSwatch, Chart and StatusIndicator when the interface needs readable status, metrics, token values or operational evidence.",
    href: "#component-data-display",
    id: "data-display-components",
    source: "docs/04-components.md",
    summary: "Data display components for tables, lists, timelines, charts, status and token documentation.",
    tags: ["data", "table", "list", "timeline", "chart", "status", "token swatch", "metrics"],
    title: "Data display components",
    type: "component",
  },
  {
    answer: "Use Dialog, Sheet, Popover, Tooltip and Toast for focused temporary content. Keep close actions, focus return and keyboard escape behavior explicit.",
    href: "#component-overlays",
    id: "overlay-components",
    source: "docs/04-components.md",
    summary: "Overlay components for confirmations, contextual help and temporary UI surfaces.",
    tags: ["dialog", "sheet", "popover", "tooltip", "toast", "overlay", "focus", "escape"],
    title: "Overlay components",
    type: "component",
  },
  {
    answer: "Use MoodSelector, MoodSignal, RecommendationRail, MediaCard, PlayerControls, ModelConfidence and PersonalizationPanel for mood-shaped streaming experiences.",
    href: "#component-ai",
    id: "ai-streaming-components",
    source: "docs/04-components.md",
    summary: "AI and streaming components that expose mood, confidence, playback, recommendations and user control.",
    tags: ["ai", "streaming", "mood", "media", "recommendation", "player", "confidence", "personalization"],
    title: "AI and streaming components",
    type: "component",
  },
  {
    answer: "Use Alert for persistent inline feedback. The component maps error to `role=\"alert\"` and non-error feedback to `role=\"status\"`.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/alert.tsx",
    id: "alert-component",
    source: "packages/ui/src/components/alert.tsx",
    summary: "Feedback surface with info, success, warning and error variants plus title and description slots.",
    tags: ["alert", "feedback", "status", "error", "info", "success", "warning", "role alert"],
    title: "Alert",
    type: "component",
  },
  {
    answer: "Use InlineNotification when feedback needs title, body and an optional action in one compact row.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/inline-notification.tsx",
    id: "inline-notification-component",
    source: "packages/ui/src/components/inline-notification.tsx",
    summary: "Actionable feedback row with semantic status roles and optional action content.",
    tags: ["inline notification", "notification", "feedback", "status", "action", "error", "success"],
    title: "InlineNotification",
    type: "component",
  },
  {
    answer: "Use Avatar for people or entities and AiAvatar for the Flytrap assistant, with image fallback and visible online, processing or offline status.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/avatar.tsx",
    id: "avatar-component",
    source: "packages/ui/src/components/avatar.tsx",
    summary: "Avatar primitives, fallback content and AI avatar status indicator.",
    tags: ["avatar", "ai avatar", "fallback", "image", "status", "online", "processing", "offline"],
    title: "Avatar",
    type: "component",
  },
  {
    answer: "Use BrandMark for the Flytrap logo asset and BrandLockup when the mark needs a readable name and descriptor.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/brand-mark.tsx",
    id: "brand-mark-component",
    source: "packages/ui/src/components/brand-mark.tsx",
    summary: "Logo image and lockup primitives with explicit accessible label behavior.",
    tags: ["brand mark", "brandmark", "logo", "lockup", "flytrap", "alt", "label"],
    title: "BrandMark",
    type: "component",
  },
  {
    answer: "Use Badge for compact metadata such as status, priority or category labels. Variants include default, secondary, outline, success, warning and destructive.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/badge.tsx",
    id: "badge-component",
    source: "packages/ui/src/components/badge.tsx",
    summary: "Small pill label for status, priority and metadata.",
    tags: ["badge", "pill", "label", "metadata", "status", "priority", "success", "warning", "destructive"],
    title: "Badge",
    type: "component",
  },
  {
    answer: "Use ButtonGroup for segmented controls or grouped actions. ButtonGroupItem exposes selected state through `aria-pressed`.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/button-group.tsx",
    id: "button-group-component",
    source: "packages/ui/src/components/button-group.tsx",
    summary: "Grouped button pattern with selected state, keyboard focus and disabled behavior.",
    tags: ["button group", "buttongroup", "segmented", "group", "aria-pressed", "selected", "toggle"],
    title: "ButtonGroup",
    type: "component",
  },
  {
    answer: "Use Card as the standard content surface, then compose CardHeader, CardTitle, CardDescription, CardContent and CardFooter.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/card.tsx",
    id: "card-component",
    source: "packages/ui/src/components/card.tsx",
    summary: "Tokenized surface primitive for grouped content and actions.",
    tags: ["card", "surface", "header", "title", "description", "content", "footer"],
    title: "Card",
    type: "component",
  },
  {
    answer: "Use CodeBlock for documented snippets that need filename, language and horizontally scrollable code.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/code-block.tsx",
    id: "code-block-component",
    source: "packages/ui/src/components/code-block.tsx",
    summary: "Code figure with caption metadata and readable pre/code layout.",
    tags: ["code block", "codeblock", "snippet", "code", "filename", "language", "tsx", "pre"],
    title: "CodeBlock",
    type: "component",
  },
  {
    answer: "Use Combobox when users need a searchable listbox selection with controlled or uncontrolled value support.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/combobox.tsx",
    id: "combobox-component",
    source: "packages/ui/src/components/combobox.tsx",
    summary: "Searchable selection input with listbox options, disabled items and empty state messaging.",
    tags: ["combobox", "select", "searchable", "listbox", "option", "empty", "keyboard"],
    title: "Combobox",
    type: "component",
  },
  {
    answer: "Use DataList for term and description pairs such as package metadata, configuration values or compact property documentation.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/data-list.tsx",
    id: "data-list-component",
    source: "packages/ui/src/components/data-list.tsx",
    summary: "Definition list primitives with item, term and description slots.",
    tags: ["data list", "datalist", "definition list", "term", "description", "metadata", "properties"],
    title: "DataList",
    type: "component",
  },
  {
    answer: "Use DatePicker for native date input and DatePickerField when the control needs a label and hint text.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/date-picker.tsx",
    id: "date-picker-component",
    source: "packages/ui/src/components/date-picker.tsx",
    summary: "Date input wrapper with calendar affordance, accessible label support and optional hint.",
    tags: ["date picker", "datepicker", "date", "calendar", "field", "label", "hint"],
    title: "DatePicker",
    type: "component",
  },
  {
    answer: "Use Dialog for focused modal content. Keep title, description, close action, focus behavior and Escape behavior explicit.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/dialog.tsx",
    id: "dialog-component",
    source: "packages/ui/src/components/dialog.tsx",
    summary: "Radix-backed modal and alert dialog primitives with overlay, content, header, footer and close affordance.",
    tags: ["dialog", "modal", "alert dialog", "overlay", "focus", "escape", "close", "title", "description"],
    title: "Dialog",
    type: "component",
  },
  {
    answer: "Use DropdownMenu for contextual command menus, grouped actions, checkbox items, radio items, labels, separators and shortcuts.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/dropdown-menu.tsx",
    id: "dropdown-menu-component",
    source: "packages/ui/src/components/dropdown-menu.tsx",
    summary: "Radix-backed menu primitives for command and selection menus.",
    tags: ["dropdown menu", "dropdown", "menu", "commands", "checkbox item", "radio item", "shortcut", "separator"],
    title: "DropdownMenu",
    type: "component",
  },
  {
    answer: "Use EmptyState when a screen or panel has no data yet and needs a clear title, explanation and optional next action.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/empty-state.tsx",
    id: "empty-state-component",
    source: "packages/ui/src/components/empty-state.tsx",
    summary: "Empty state panel with optional icon, description and action slot.",
    tags: ["empty state", "emptystate", "no data", "blank", "placeholder", "action", "icon"],
    title: "EmptyState",
    type: "component",
  },
  {
    answer: "Use FileUpload for drag-or-select file input with label, description, multiple file support and announced selected filenames.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/file-upload.tsx",
    id: "file-upload-component",
    source: "packages/ui/src/components/file-upload.tsx",
    summary: "Accessible file input surface with dashed border, upload icon and aria-live filename feedback.",
    tags: ["file upload", "fileupload", "upload", "files", "multiple", "drag", "select", "aria-live"],
    title: "FileUpload",
    type: "component",
  },
  {
    answer: "Use the API quality contract to choose the right component family, avoid common antipatterns and run the validation matrix before shipping.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/docs/17-component-api-quality.md",
    id: "component-api-quality",
    source: "docs/17-component-api-quality.md",
    summary: "Consumption rules, component family contracts, antipatterns and delivery validation commands.",
    tags: ["api", "quality", "contract", "antipattern", "validation", "matrix", "component family"],
    title: "Component API quality",
    type: "governance",
  },
  {
    answer: "Use the AI-managed streaming pattern when recommendations adapt from an explicit mood or intent control.",
    href: "#pattern-ai-managed-streaming",
    id: "ai-managed-streaming",
    source: "docs/20-pattern-library.md",
    summary: "Mood-shaped recommendations with visible control, confidence, playback and human approval.",
    tags: ["ai", "streaming", "mood", "recommendation", "player", "approval", "studio"],
    title: "AI-managed streaming flow",
    type: "pattern",
  },
  {
    answer: "Use Dashboard layout for operational surfaces that combine navigation, KPI cards, tables and timelines.",
    href: "#pattern-dashboard-layout",
    id: "dashboard-layout",
    source: "docs/20-pattern-library.md",
    summary: "Sidebar, KPI, table and activity composition for product operations.",
    tags: ["dashboard", "layout", "kpi", "table", "timeline", "adoption", "release"],
    title: "Dashboard layout",
    type: "pattern",
  },
  {
    answer: "Use Release readiness when a component, page or package needs traceable proof before shipping.",
    href: "#pattern-release-readiness",
    id: "release-readiness",
    source: "docs/20-pattern-library.md",
    summary: "Quality gates for shipping through tests, visual audit, adoption and documentation evidence.",
    tags: ["release", "readiness", "ci", "audit", "adoption", "visual", "quality"],
    title: "Release readiness flow",
    type: "pattern",
  },
  {
    answer: "Flytrap currently supports one materialized brand with light, dark and vibrant modes; new brands must ship as full DTCG systems with semantic, component and APCA coverage.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/docs/05-multibrand.md",
    id: "multibrand-modes-themes",
    source: "docs/05-multibrand.md",
    summary: "Brand, mode, theme and viewport dimensions, plus the target Figma → Tokens Studio → DTCG pipeline.",
    tags: ["multibrand", "brand", "mode", "theme", "viewport", "dtcg", "vibrant", "light", "dark"],
    title: "Multibrand modes and themes",
    type: "token",
  },
  {
    answer: "Flytrap color ramps use a 50 to 950 scale generated in HCT, with brand, neutral and semantic ramps verified through APCA roles.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/docs/02-color-scale.md",
    id: "color-scale",
    source: "docs/02-color-scale.md",
    summary: "HCT color scale, magenta and acid ramps, neutral values and independent semantic feedback ramps.",
    tags: ["color", "scale", "hct", "apca", "magenta", "acid", "neutral", "success", "warning", "error"],
    title: "Color scale",
    type: "token",
  },
  {
    answer: "Flytrap uses DTCG tokens compiled to CSS variables, Tailwind theme values and TypeScript metadata.",
    href: "#tokens",
    id: "token-architecture",
    source: "docs/01-architecture-tokens.md",
    summary: "Primitive, foundation, semantic and component token architecture.",
    tags: ["tokens", "dtcg", "css variables", "tailwind", "semantic", "component"],
    title: "Token architecture",
    type: "token",
  },
  {
    answer: "The public token guide groups tokens by All tokens, Color, Type, Space, Border, Motion and Elevation so designers and developers can inspect the system by decision type.",
    href: "#tokens",
    id: "token-categories",
    source: "apps/docs/src/living/token-system-guide.tsx",
    summary: "Interactive token categories used by the documentation page.",
    tags: ["all tokens", "color", "type", "typography", "space", "border", "motion", "elevation", "tabs"],
    title: "Token categories",
    type: "token",
  },
  {
    answer: "The current design-to-code source of truth is `packages/tokens/src/flytrap.tokens.json`; Figma changes are reconciled manually until a versioned Tokens Studio export and drift check exist.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/docs/19-design-code-sync.md",
    id: "design-code-sync",
    source: "docs/19-design-code-sync.md",
    summary: "Manual Figma → DTCG reconciliation process and criteria for future automation.",
    tags: ["figma", "tokens studio", "dtcg", "design code", "sync", "drift", "manual process"],
    title: "Design to code sync",
    type: "workflow",
  },
  {
    answer: "Use the Figma-to-deploy pipeline as the architecture target: design intent, DTCG tokens, gates, package build, docs and deployment evidence.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/docs/06-pipeline.md",
    id: "figma-deploy-pipeline",
    source: "docs/06-pipeline.md",
    summary: "End-to-end phases from Figma and tokens through build, documentation and deployment.",
    tags: ["pipeline", "figma", "deploy", "tokens", "build", "docs", "ci", "vercel"],
    title: "Figma to deploy pipeline",
    type: "workflow",
  },
  {
    answer: "The Supabase backend stores component registry, adoption, APCA audit and private RAG context; public clients read only safe tables while AI access stays behind Edge Functions.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/docs/07-supabase.md",
    id: "supabase-backend",
    source: "docs/07-supabase.md",
    summary: "Supabase project, schema, RLS rules, Edge AI chat function and pending ds_context ingestion.",
    tags: ["supabase", "backend", "rls", "edge function", "rag", "ds_context", "component registry", "adoption"],
    title: "Supabase backend",
    type: "development",
  },
  {
    answer: "Keep service role, Anthropic and Voyage keys server-only; public Vercel variables are limited to safe NEXT_PUBLIC Supabase values under RLS.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/docs/08-secrets.md",
    id: "secrets-boundary",
    source: "docs/08-secrets.md",
    summary: "GitHub, Vercel and Supabase Edge secret boundaries for the public repository.",
    tags: ["secrets", "service role", "anthropic", "voyage", "vercel", "github actions", "supabase", "rls"],
    title: "Secrets boundary",
    type: "governance",
  },
  {
    answer: "Use the project links reference to find the canonical Figma project, GitHub repository, GitHub Pages site, Vercel project and Supabase backend.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/docs/09-project-links.md",
    id: "project-links",
    source: "docs/09-project-links.md",
    summary: "Canonical project URLs and IDs for design, source, CI, public site, deploy and backend.",
    tags: ["links", "figma", "github", "github pages", "vercel", "supabase", "project id", "resources"],
    title: "Project links",
    type: "development",
  },
  {
    answer: "Use ADRs to understand core Flytrap decisions: name, HCT, APCA targets, semantic ramps, Supabase region, public repo, component ownership and distribution.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/docs/10-decisions.md",
    id: "adr-decisions",
    source: "docs/10-decisions.md",
    summary: "Architecture decision record table for tokens, accessibility, backend, repository and distribution choices.",
    tags: ["adr", "decisions", "hct", "apca", "supabase", "public repo", "distribution", "changesets"],
    title: "Architecture decisions",
    type: "governance",
  },
  {
    answer: "Use the roadmap to understand milestone status, current critical path and upcoming fronts for patterns, adoption, memory and release.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/docs/11-roadmap.md",
    id: "roadmap",
    source: "docs/11-roadmap.md",
    summary: "Milestones from scaffold through tokens, UI, deploy, public experience, memory and release readiness.",
    tags: ["roadmap", "milestone", "m0", "m1", "m2", "m5", "memory", "release", "adoption"],
    title: "Roadmap",
    type: "workflow",
  },
  {
    answer: "APCA contrast is a required gate. Do not rely on visual approval alone for color accessibility.",
    href: "#accessibility",
    id: "apca-accessibility",
    source: "docs/03-accessibility-apca.md",
    summary: "Contrast, focus and readability requirements for accessible Flytrap interfaces.",
    tags: ["accessibility", "apca", "contrast", "focus", "readability", "a11y"],
    title: "Accessibility and APCA",
    type: "governance",
  },
  {
    answer: "To request or evolve a component, document the problem, states, anatomy, tokens, accessibility contract and evidence.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/docs/12-component-anatomy.md",
    id: "component-evolution",
    source: "docs/12-component-anatomy.md",
    summary: "Definition of Done for proposing, improving and shipping components.",
    tags: ["request", "improve", "component", "anatomy", "definition of done", "feedback"],
    title: "Request or improve a component",
    type: "workflow",
  },
  {
    answer: "Official iconography uses semantic icon choices, controlled sizes and handoff rules so icons reinforce meaning instead of becoming decoration.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/docs/13-iconography.md",
    id: "semantic-iconography",
    source: "docs/13-iconography.md",
    summary: "Icon contract, sizing, semantic vocabulary and design handoff guidance.",
    tags: ["icon", "iconography", "semantic", "handoff", "size", "meaning"],
    title: "Semantic iconography",
    type: "governance",
  },
  {
    answer: "Brand logo and avatar assets should be consumed through the DS components, with accessible labels, fallback behavior and no duplicate app-local copies.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/docs/16-brand-assets.md",
    id: "brand-assets-avatar",
    source: "docs/16-brand-assets.md",
    summary: "Brand mark, avatar component, accessibility notes and asset restrictions.",
    tags: ["brand", "logo", "avatar", "asset", "accessibility", "fallback", "ai avatar"],
    title: "Brand assets and avatar",
    type: "component",
  },
  {
    answer: "Memory Chat defaults to source-backed answers, can optionally use Ollama locally, and exposes confidence, fallback and missing-source states.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/docs/21-memory-ollama.md",
    id: "memory-chat-ollama",
    source: "docs/21-memory-ollama.md",
    summary: "Local Memory Chat provider behavior, Ollama setup, visible answer states and missing-source flow.",
    tags: ["memory", "chat", "ollama", "source-backed", "fallback", "confidence", "missing source"],
    title: "Memory Chat and Ollama",
    type: "workflow",
  },
  {
    answer: "The public experience release contract defines the living organism metaphor, dense DS sections, character/art boundaries and what remains out of scope.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/docs/15-public-experience-release-1.md",
    id: "public-experience-release",
    source: "docs/15-public-experience-release-1.md",
    summary: "Creative direction, content architecture, organism/character contract, accessibility and release scope for the public DS page.",
    tags: ["public experience", "release", "organism", "character", "hero", "art", "documentation", "scope"],
    title: "Public experience release",
    type: "governance",
  },
  {
    answer: "AI workflows should generate, audit, refactor or document interfaces while preserving Flytrap tokens and accessibility rules.",
    href: "#ai-workflows",
    id: "ai-workflows",
    source: "docs/14-ai-context-contract.md",
    summary: "Rules for AI-assisted generation, review and documentation.",
    tags: ["ai", "workflow", "generate", "audit", "refactor", "document", "agent"],
    title: "AI workflow contract",
    type: "workflow",
  },
  {
    answer: "Use the documentation README as the entrypoint for overview, token architecture, accessibility, components, distribution, patterns and Memory/Ollama docs.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/docs/README.md",
    id: "documentation-index",
    source: "docs/README.md",
    summary: "Documentation table of contents and recommended starting points for the Flytrap DS repository.",
    tags: ["documentation", "readme", "docs", "toc", "overview", "development", "design"],
    title: "Documentation index",
    type: "development",
  },
] as const satisfies readonly FlytrapMemoryItem[];

function normalize(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

export function searchFlytrapMemory(query: string, limit = 6): FlytrapMemoryResult[] {
  const normalizedQuery = normalize(query.trim());
  const terms = normalizedQuery.split(/\s+/).filter(Boolean);

  if (terms.length === 0) {
    return flytrapMemoryIndex.slice(0, limit).map(item => ({ ...item, score: 0 }));
  }

  return flytrapMemoryIndex
    .map(item => {
      const title = normalize(item.title);
      const summary = normalize(item.summary);
      const answer = normalize(item.answer);
      const tags = item.tags.map(normalize);
      const haystack = [title, summary, answer, item.type, item.source, ...tags].join(" ");

      const score = terms.reduce((total, term) => {
        if (!haystack.includes(term)) return total;
        return total
          + (title.includes(term) ? 8 : 0)
          + (tags.some(tag => tag.includes(term)) ? 5 : 0)
          + (summary.includes(term) ? 3 : 0)
          + (answer.includes(term) ? 2 : 0)
          + 1;
      }, 0);

      return { ...item, score };
    })
    .filter(item => item.score > 0)
    .sort((left, right) => right.score - left.score || left.title.localeCompare(right.title))
    .slice(0, limit);
}

export function answerFlytrapMemoryQuestion(question: string): FlytrapMemoryAnswer {
  const sources = searchFlytrapMemory(question, 3);

  if (sources.length === 0) {
    return {
      confidence: "low",
      response: "I could not find a reliable Flytrap source for that yet. Try asking about installation, Button, SearchField, APCA, patterns, release readiness, or component improvements.",
      sources,
    };
  }

  const [primary, ...supporting] = sources;
  const supportingText = supporting.length > 0
    ? ` Related sources: ${supporting.map(source => source.title).join(", ")}.`
    : "";

  return {
    confidence: primary.score >= 12 ? "high" : "medium",
    response: `${primary.answer} ${primary.summary}${supportingText}`,
    sources,
  };
}
