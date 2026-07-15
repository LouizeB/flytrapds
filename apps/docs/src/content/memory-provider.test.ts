import { afterEach, describe, expect, it, vi } from "vitest";
import { answerFlytrapMemoryQuestion, searchFlytrapMemory } from "./search-index";

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
