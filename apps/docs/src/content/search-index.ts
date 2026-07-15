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
    answer: "AI workflows should generate, audit, refactor or document interfaces while preserving Flytrap tokens and accessibility rules.",
    href: "#ai-workflows",
    id: "ai-workflows",
    source: "docs/14-ai-context-contract.md",
    summary: "Rules for AI-assisted generation, review and documentation.",
    tags: ["ai", "workflow", "generate", "audit", "refactor", "document", "agent"],
    title: "AI workflow contract",
    type: "workflow",
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
