import { afterEach, describe, expect, it, vi } from "vitest";
import { answerFlytrapMemoryQuestion, flytrapMemoryIndex, searchFlytrapMemory } from "./search-index";

describe("Flytrap memory search", () => {
  it("ranks direct installation questions with source metadata", () => {
    const [first] = searchFlytrapMemory("install @flytrap/ui");

    expect(first?.id).toBe("install-ui");
    expect(first?.source).toBe("docs/18-distribution.md");
    expect(first?.score).toBeGreaterThan(0);
  });

  it("finds token category documentation by decision type", () => {
    const [first] = searchFlytrapMemory("motion elevation tokens");

    expect(first?.id).toBe("token-categories");
    expect(first?.tags).toContain("motion");
    expect(first?.tags).toContain("elevation");
  });

  it("finds AI streaming components as component guidance", () => {
    const [first] = searchFlytrapMemory("mood recommendations player");

    expect(first?.id).toBe("ai-streaming-components");
    expect(first?.type).toBe("component");
  });

  it("finds feedback components by semantic status intent", () => {
    const ids = searchFlytrapMemory("status feedback error success notification alert action", 6)
      .map(result => result.id);

    expect(ids).toContain("alert-component");
    expect(ids).toContain("inline-notification-component");
  });

  it("finds identity and brand components", () => {
    const ids = searchFlytrapMemory("avatar logo brand mark lockup fallback image label", 8)
      .map(result => result.id);

    expect(ids).toContain("avatar-component");
    expect(ids).toContain("brand-mark-component");
  });

  it("finds core surface, badge and grouped action components", () => {
    const ids = searchFlytrapMemory("card surface badge segmented button group metadata aria-pressed", 8)
      .map(result => result.id);

    expect(ids).toContain("card-component");
    expect(ids).toContain("badge-component");
    expect(ids).toContain("button-group-component");
  });

  it("finds navigation and overlay primitives by behavior", () => {
    const ids = searchFlytrapMemory("dialog modal close focus dropdown menu commands combobox searchable listbox", 8)
      .map(result => result.id);

    expect(ids).toContain("dialog-component");
    expect(ids).toContain("dropdown-menu-component");
    expect(ids).toContain("combobox-component");
  });

  it("finds documentation utility and data entry components", () => {
    const ids = searchFlytrapMemory("code snippet data list term description date calendar file upload empty state no data", 30)
      .map(result => result.id);

    expect(ids).toContain("code-block-component");
    expect(ids).toContain("data-list-component");
    expect(ids).toContain("date-picker-component");
    expect(ids).toContain("file-upload-component");
    expect(ids).toContain("empty-state-component");
  });

  it("finds remaining navigation, disclosure and overlay components", () => {
    const ids = searchFlytrapMemory("accordion breadcrumb command palette popover sheet sidebar pagination scroll area", 30)
      .map(result => result.id);

    expect(ids).toContain("accordion-component");
    expect(ids).toContain("breadcrumb-component");
    expect(ids).toContain("command-menu-component");
    expect(ids).toContain("popover-component");
    expect(ids).toContain("sheet-component");
    expect(ids).toContain("sidebar-component");
    expect(ids).toContain("pagination-component");
    expect(ids).toContain("scroll-area-component");
  });

  it("finds remaining form and choice components", () => {
    const ids = searchFlytrapMemory("form input label checkbox radio group select field validation required optional", 40)
      .map(result => result.id);

    expect(ids).toContain("form-component");
    expect(ids).toContain("input-component");
    expect(ids).toContain("label-component");
    expect(ids).toContain("checkbox-component");
    expect(ids).toContain("radio-group-component");
    expect(ids).toContain("select-component");
  });

  it("finds layout, documentation and structural utilities", () => {
    const ids = searchFlytrapMemory("layout container stack grid page section toolbar component preview copy button filter bar separator", 50)
      .map(result => result.id);

    expect(ids).toContain("layout-component");
    expect(ids).toContain("page-component");
    expect(ids).toContain("component-preview-component");
    expect(ids).toContain("copy-button-component");
    expect(ids).toContain("filter-bar-component");
    expect(ids).toContain("separator-component");
  });

  it("finds remaining AI streaming components", () => {
    const ids = searchFlytrapMemory("mood signal selector media card recommendation rail player controls model confidence personalization panel", 40)
      .map(result => result.id);

    expect(ids).toContain("mood-signal-component");
    expect(ids).toContain("mood-selector-component");
    expect(ids).toContain("media-card-component");
    expect(ids).toContain("recommendation-rail-component");
    expect(ids).toContain("player-controls-component");
    expect(ids).toContain("model-confidence-component");
    expect(ids).toContain("personalization-panel-component");
  });

  it("finds final utility and status components", () => {
    const loadingIds = searchFlytrapMemory("skeleton placeholder spinner loading", 6)
      .map(result => result.id);
    const inputIds = searchFlytrapMemory("switch toggle slider range textarea multiline tabs panel", 10)
      .map(result => result.id);
    const feedbackIds = searchFlytrapMemory("status indicator timeline toast notification activity events", 10)
      .map(result => result.id);
    const structureIds = searchFlytrapMemory("tooltip contextual help tree view hierarchy token swatch documentation", 10)
      .map(result => result.id);

    expect(loadingIds).toContain("skeleton-component");
    expect(loadingIds).toContain("spinner-component");
    expect(inputIds).toContain("switch-component");
    expect(inputIds).toContain("slider-component");
    expect(inputIds).toContain("tabs-component");
    expect(inputIds).toContain("textarea-component");
    expect(feedbackIds).toContain("status-indicator-component");
    expect(feedbackIds).toContain("timeline-component");
    expect(feedbackIds).toContain("toast-component");
    expect(structureIds).toContain("tooltip-component");
    expect(structureIds).toContain("tree-view-component");
    expect(structureIds).toContain("token-swatch-component");
  });

  it("finds table and chart primitives", () => {
    const ids = searchFlytrapMemory("smart data table rows columns caption chart line area bar visualization empty loading error", 8)
      .map(result => result.id);

    expect(ids).toContain("smart-data-table-component");
    expect(ids).toContain("chart-component");
  });

  it("finds AI assistant primitive components", () => {
    const ids = searchFlytrapMemory("agent card status chat thread citation chip token meter approval prompt insight kpi message prompt reasoning trace tool call", 90)
      .map(result => result.id);

    expect(ids).toContain("agent-card-component");
    expect(ids).toContain("agent-status-component");
    expect(ids).toContain("chat-thread-component");
    expect(ids).toContain("citation-chip-component");
    expect(ids).toContain("cost-token-meter-component");
    expect(ids).toContain("human-approval-prompt-component");
    expect(ids).toContain("insight-callout-component");
    expect(ids).toContain("kpi-stat-card-component");
    expect(ids).toContain("message-actions-component");
    expect(ids).toContain("message-bubble-component");
    expect(ids).toContain("prompt-input-component");
    expect(ids).toContain("reasoning-stream-component");
    expect(ids).toContain("run-trace-timeline-component");
    expect(ids).toContain("streaming-message-component");
    expect(ids).toContain("suggested-prompts-component");
    expect(ids).toContain("tool-call-block-component");
  });

  it("includes generated memory chunks alongside curated sources", () => {
    const generated = flytrapMemoryIndex.filter(item => item.id.startsWith("generated-"));

    expect(generated.length).toBeGreaterThanOrEqual(385);
    expect(generated.some(item => item.id.includes("-section-") && item.source === "docs/04-components.md")).toBe(true);
    expect(generated.some(item => item.id === "generated-ui-button-api")).toBe(true);
    expect(generated.some(item => item.id === "generated-ui-button-behavior")).toBe(true);
    expect(generated.some(item => item.id === "generated-ui-button-props")).toBe(true);
    expect(generated.some(item => item.id === "generated-ui-button-example-1")).toBe(true);
    expect(generated.some(item => item.id === "generated-ui-input-props")).toBe(true);
    expect(generated.some(item => item.id === "generated-ui-form-props")).toBe(true);
    expect(generated.some(item => item.id === "generated-ui-select-props")).toBe(true);
    expect(generated.some(item => item.id === "generated-ui-dialog-props")).toBe(true);
    expect(generated.some(item => item.id === "generated-ai-chat-thread-props")).toBe(true);
    expect(generated.some(item => item.id === "generated-ai-prompt-input-props")).toBe(true);
    expect(generated.some(item => item.id === "generated-ui-recommendation-rail-props")).toBe(true);
    expect(generated.some(item => item.id === "generated-ui-dropdown-menu-props")).toBe(true);
    expect(generated.some(item => item.id === "generated-ui-combobox-props")).toBe(true);
    expect(generated.some(item => item.id === "generated-ui-command-menu-props")).toBe(true);
    expect(generated.some(item => item.id === "generated-ui-tabs-props")).toBe(true);
    expect(generated.some(item => item.id === "generated-ui-popover-props")).toBe(true);
    expect(generated.some(item => item.id === "generated-ui-sheet-props")).toBe(true);
    expect(generated.some(item => item.id === "generated-ui-tooltip-props")).toBe(true);
  });

  it("finds generated documentation section chunks", () => {
    const ids = searchFlytrapMemory("component inventory inputs selection buttons actions", 12)
      .map(result => result.id);

    expect(ids.some(id => id.startsWith("generated-doc-04-components-section-"))).toBe(true);
  });

  it("finds generated component API and behavior chunks", () => {
    const apiIds = searchFlytrapMemory("button props loadingAnnouncement asChild variant size", 10)
      .map(result => result.id);
    const behaviorIds = searchFlytrapMemory("button aria busy disabled focus token variant", 10)
      .map(result => result.id);

    expect(apiIds).toContain("generated-ui-button-api");
    expect(behaviorIds).toContain("generated-ui-button-behavior");
  });

  it("finds generated prop comments and usage snippets", () => {
    const propIds = searchFlytrapMemory("Button loadingAnnouncement screen reader status announcement", 8)
      .map(result => result.id);
    const exampleIds = searchFlytrapMemory("Button loading SavingAction Save changes snippet", 8)
      .map(result => result.id);

    expect(propIds).toContain("generated-ui-button-props");
    expect(exampleIds).toContain("generated-ui-button-example-1");
  });

  it("finds generated prop comments for priority components", () => {
    const inputIds = searchFlytrapMemory("Input aria-invalid invalid visual state assistive technology", 10)
      .map(result => result.id);
    const formIds = searchFlytrapMemory("FormField error role alert aria-describedby required optionalText", 10)
      .map(result => result.id);
    const selectIds = searchFlytrapMemory("SelectItem value disabled option SelectTrigger disabled menu", 10)
      .map(result => result.id);
    const aiIds = searchFlytrapMemory("PromptInput onSubmitPrompt submitting maxLength ChatThread emptyTitle loading aria-busy", 14)
      .map(result => result.id);

    expect(inputIds).toContain("generated-ui-input-props");
    expect(formIds).toContain("generated-ui-form-props");
    expect(selectIds).toContain("generated-ui-select-props");
    expect(aiIds).toContain("generated-ai-chat-thread-props");
    expect(aiIds).toContain("generated-ai-prompt-input-props");
  });

  it("finds generated prop comments for navigation and overlay components", () => {
    const menuIds = searchFlytrapMemory("DropdownMenu checked indeterminate disabled radio value sideOffset", 12)
      .map(result => result.id);
    const commandIds = searchFlytrapMemory("CommandMenu visually hidden title description CommandItem value disabled", 12)
      .map(result => result.id);
    const comboboxIds = searchFlytrapMemory("Combobox options defaultValue emptyMessage ArrowDown Escape listbox", 12)
      .map(result => result.id);
    const overlayIds = searchFlytrapMemory("Popover align sideOffset Sheet side top bottom Tooltip non-essential helper text", 18)
      .map(result => result.id);

    expect(menuIds).toContain("generated-ui-dropdown-menu-props");
    expect(commandIds).toContain("generated-ui-command-menu-props");
    expect(comboboxIds).toContain("generated-ui-combobox-props");
    expect(overlayIds).toContain("generated-ui-popover-props");
    expect(overlayIds).toContain("generated-ui-sheet-props");
    expect(overlayIds).toContain("generated-ui-tooltip-props");
  });

  it("expands semantic loading intent into relevant components", () => {
    const ids = searchFlytrapMemory("how do I show a pending loading state", 8)
      .map(result => result.id);

    expect(ids).toContain("skeleton-component");
    expect(ids).toContain("spinner-component");
  });

  it("expands semantic empty-result intent into empty-state guidance", () => {
    const ids = searchFlytrapMemory("what should appear when there is no data", 8)
      .map(result => result.id);

    expect(ids).toContain("empty-state-component");
  });

  it("finds design-to-code sync guidance from Figma questions", () => {
    const [first] = searchFlytrapMemory("Figma Tokens Studio drift DTCG");

    expect(first?.id).toBe("design-code-sync");
    expect(first?.source).toBe("docs/19-design-code-sync.md");
  });

  it("finds multibrand mode and theme guidance", () => {
    const [first] = searchFlytrapMemory("new brand mode theme vibrant");

    expect(first?.id).toBe("multibrand-modes-themes");
    expect(first?.type).toBe("token");
  });

  it("finds brand asset and iconography governance", () => {
    const results = searchFlytrapMemory("logo avatar icon handoff", 4);
    const ids = results.map(result => result.id);

    expect(ids).toContain("brand-assets-avatar");
    expect(ids).toContain("semantic-iconography");
  });

  it("finds Memory Chat and Ollama setup", () => {
    const [first] = searchFlytrapMemory("Ollama fallback missing source memory chat");

    expect(first?.id).toBe("memory-chat-ollama");
    expect(first?.source).toBe("docs/21-memory-ollama.md");
  });

  it("finds color scale guidance for ramp questions", () => {
    const [first] = searchFlytrapMemory("HCT magenta acid neutral color scale");

    expect(first?.id).toBe("color-scale");
    expect(first?.type).toBe("token");
  });

  it("finds backend and secrets boundaries", () => {
    const backend = searchFlytrapMemory("Supabase RLS Edge RAG ds_context")[0];
    const secrets = searchFlytrapMemory("service role Anthropic Voyage server-only secrets")[0];

    expect(backend?.id).toBe("supabase-backend");
    expect(secrets?.id).toBe("secrets-boundary");
  });

  it("finds project links and roadmap references", () => {
    const links = searchFlytrapMemory("canonical Figma Vercel Supabase GitHub project links")[0];
    const roadmap = searchFlytrapMemory("milestone critical path memory release adoption roadmap")[0];

    expect(links?.id).toBe("project-links");
    expect(roadmap?.id).toBe("roadmap");
  });

  it("finds ADR and public experience guidance", () => {
    const decisions = searchFlytrapMemory("ADR decisions APCA HCT changesets")[0];
    const publicExperience = searchFlytrapMemory("public experience organism character release scope")[0];

    expect(decisions?.id).toBe("adr-decisions");
    expect(publicExperience?.id).toBe("public-experience-release");
  });

  it("finds the documentation index", () => {
    const [first] = searchFlytrapMemory("documentation README table of contents");

    expect(first?.id).toBe("documentation-index");
    expect(first?.source).toBe("docs/README.md");
  });

  it("returns a safe low-confidence answer when no source matches", () => {
    const answer = answerFlytrapMemoryQuestion("quantum banana routing");

    expect(answer.confidence).toBe("low");
    expect(answer.sources).toHaveLength(0);
    expect(answer.response).toContain("could not find a reliable Flytrap source");
  });

  it("returns default scored sources for an empty query", () => {
    const results = searchFlytrapMemory("", 2);

    expect(results).toHaveLength(2);
    expect(results[0]?.score).toBe(0);
  });
});

describe("Flytrap memory provider", () => {
  afterEach(() => {
    vi.resetModules();
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("uses source-backed memory by default", async () => {
    const { answerFlytrapMemoryWithProvider, memoryProviderConfig } = await import("./memory-provider");
    const answer = await answerFlytrapMemoryWithProvider("How do I install Flytrap?");

    expect(memoryProviderConfig.provider).toBe("source");
    expect(answer.provider).toBe("source");
    expect(answer.sources[0]?.id).toBe("install-ui");
  });

  it("uses Ollama when explicitly enabled and keeps memory citations", async () => {
    vi.stubEnv("VITE_FLYTRAP_MEMORY_PROVIDER", "ollama");
    vi.stubEnv("VITE_FLYTRAP_OLLAMA_MODEL", "llama3.2");
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true,
      json: async () => ({ message: { content: "Install @flytrap/ui and import the styles once." } }),
    })));

    const { answerFlytrapMemoryWithProvider, memoryProviderConfig } = await import("./memory-provider");
    const answer = await answerFlytrapMemoryWithProvider("install Flytrap");

    expect(memoryProviderConfig.provider).toBe("ollama");
    expect(answer.provider).toBe("ollama");
    expect(answer.model).toBe("llama3.2");
    expect(answer.response).toContain("@flytrap/ui");
    expect(answer.sources[0]?.id).toBe("install-ui");
  });

  it("allows an explicit Ollama provider override for development controls", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true,
      json: async () => ({ message: { content: "Use the cited Flytrap source-backed answer." } }),
    })));

    const { answerFlytrapMemoryWithProvider, memoryProviderConfig } = await import("./memory-provider");
    const answer = await answerFlytrapMemoryWithProvider("install Flytrap", { provider: "ollama" });

    expect(memoryProviderConfig.provider).toBe("source");
    expect(answer.provider).toBe("ollama");
    expect(answer.response).toContain("cited Flytrap");
    expect(answer.sources[0]?.id).toBe("install-ui");
  });

  it("skips Ollama when no local source is available", async () => {
    vi.stubEnv("VITE_FLYTRAP_MEMORY_PROVIDER", "ollama");
    const fetch = vi.fn();
    vi.stubGlobal("fetch", fetch);

    const { answerFlytrapMemoryWithProvider } = await import("./memory-provider");
    const answer = await answerFlytrapMemoryWithProvider("quantum banana routing");

    expect(fetch).not.toHaveBeenCalled();
    expect(answer.provider).toBe("source");
    expect(answer.fallbackReason).toContain("no reliable source");
  });

  it("falls back when Ollama returns an error status", async () => {
    vi.stubEnv("VITE_FLYTRAP_MEMORY_PROVIDER", "ollama");
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false,
      status: 503,
    })));

    const { answerFlytrapMemoryWithProvider } = await import("./memory-provider");
    const answer = await answerFlytrapMemoryWithProvider("install Flytrap");

    expect(answer.provider).toBe("source");
    expect(answer.fallbackReason).toContain("503");
    expect(answer.sources[0]?.id).toBe("install-ui");
  });

  it("falls back when Ollama returns an empty response", async () => {
    vi.stubEnv("VITE_FLYTRAP_MEMORY_PROVIDER", "ollama");
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true,
      json: async () => ({ message: { content: "   " } }),
    })));

    const { answerFlytrapMemoryWithProvider } = await import("./memory-provider");
    const answer = await answerFlytrapMemoryWithProvider("install Flytrap");

    expect(answer.provider).toBe("source");
    expect(answer.fallbackReason).toContain("empty response");
    expect(answer.sources[0]?.id).toBe("install-ui");
  });

  it("falls back to source-backed memory when Ollama fails", async () => {
    vi.stubEnv("VITE_FLYTRAP_MEMORY_PROVIDER", "ollama");
    vi.stubGlobal("fetch", vi.fn(async () => {
      throw new Error("connection refused");
    }));

    const { answerFlytrapMemoryWithProvider } = await import("./memory-provider");
    const answer = await answerFlytrapMemoryWithProvider("APCA contrast");

    expect(answer.provider).toBe("source");
    expect(answer.fallbackReason).toContain("connection refused");
    expect(answer.sources[0]?.id).toBe("apca-accessibility");
  });
});
