import { answerFlytrapMemoryQuestion, type FlytrapMemoryAnswer } from "./search-index";

export type FlytrapMemoryProvider = "ollama" | "source";

export interface FlytrapProviderAnswer extends FlytrapMemoryAnswer {
  fallbackReason?: string;
  model?: string;
  provider: FlytrapMemoryProvider;
}

const configuredProvider = import.meta.env.VITE_FLYTRAP_MEMORY_PROVIDER === "ollama"
  ? "ollama"
  : "source";

const ollamaBaseUrl = import.meta.env.VITE_FLYTRAP_OLLAMA_URL ?? "http://127.0.0.1:11434";
const ollamaModel = import.meta.env.VITE_FLYTRAP_OLLAMA_MODEL ?? "llama3.2";

export const memoryProviderConfig = {
  baseUrl: ollamaBaseUrl,
  model: ollamaModel,
  provider: configuredProvider,
} as const;

function sourceContext(answer: FlytrapMemoryAnswer) {
  return answer.sources
    .map((source, index) => [
      `[${index + 1}] ${source.title}`,
      `Source: ${source.source}`,
      `Summary: ${source.summary}`,
      `Answer: ${source.answer}`,
    ].join("\n"))
    .join("\n\n");
}

export async function answerFlytrapMemoryWithProvider(question: string): Promise<FlytrapProviderAnswer> {
  const sourceAnswer = answerFlytrapMemoryQuestion(question);

  if (configuredProvider !== "ollama") {
    return { ...sourceAnswer, provider: "source" };
  }

  if (sourceAnswer.sources.length === 0) {
    return {
      ...sourceAnswer,
      fallbackReason: "Ollama was skipped because the local memory index found no reliable source.",
      provider: "source",
    };
  }

  try {
    const response = await fetch(`${ollamaBaseUrl}/api/chat`, {
      body: JSON.stringify({
        messages: [
          {
            content: [
              "You are Flytrap Design System Memory.",
              "Answer only from the provided sources.",
              "If the sources do not support a claim, say what is missing.",
              "Keep the answer concise and mention the source titles.",
              "",
              sourceContext(sourceAnswer),
            ].join("\n"),
            role: "system",
          },
          { content: question, role: "user" },
        ],
        model: ollamaModel,
        stream: false,
      }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });

    if (!response.ok) {
      throw new Error(`Ollama responded with ${response.status}`);
    }

    const data = await response.json() as { message?: { content?: string } };
    const content = data.message?.content?.trim();

    if (!content) {
      throw new Error("Ollama returned an empty response");
    }

    return {
      ...sourceAnswer,
      model: ollamaModel,
      provider: "ollama",
      response: content,
    };
  } catch (error) {
    return {
      ...sourceAnswer,
      fallbackReason: error instanceof Error ? error.message : "Ollama request failed",
      provider: "source",
    };
  }
}
