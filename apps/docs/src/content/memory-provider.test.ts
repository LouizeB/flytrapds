import { afterEach, describe, expect, it, vi } from "vitest";
import { answerFlytrapMemoryQuestion, searchFlytrapMemory } from "./search-index";

describe("Flytrap memory search", () => {
  it("ranks direct installation questions with source metadata", () => {
    const [first] = searchFlytrapMemory("install @flytrap/ui");

    expect(first?.id).toBe("install-ui");
    expect(first?.source).toBe("docs/18-distribution.md");
    expect(first?.score).toBeGreaterThan(0);
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
