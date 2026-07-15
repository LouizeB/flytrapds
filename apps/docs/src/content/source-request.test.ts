import { describe, expect, it } from "vitest";
import {
  normalizeSourceRequestQuestion,
  sourceRequestIssueUrl,
  sourceRequestMarkdown,
  sourceRequestTitle,
} from "./source-request";

describe("Flytrap source requests", () => {
  it("normalizes whitespace in missing questions", () => {
    expect(normalizeSourceRequestQuestion("  how   do I   document    tabs? ")).toBe("how do I document tabs?");
  });

  it("builds a concise issue title by request type", () => {
    const title = sourceRequestTitle({
      kind: "component",
      question: "How should the Tabs component document keyboard navigation, states, tokens and accessibility?",
    });

    expect(title).toContain("[Memory source] component:");
    expect(title.length).toBeLessThanOrEqual(110);
  });

  it("builds a source request markdown checklist", () => {
    const markdown = sourceRequestMarkdown({
      context: "The chat did not find a Tabs source.",
      kind: "component",
      question: "How should Tabs be documented?",
    });

    expect(markdown).toContain("## Missing source request");
    expect(markdown).toContain("**Type:** component");
    expect(markdown).toContain("The chat did not find a Tabs source.");
    expect(markdown).toContain("Re-run docs tests and visual audit.");
  });

  it("builds a GitHub issue URL with encoded title and body", () => {
    const url = sourceRequestIssueUrl({
      kind: "token",
      question: "Which motion tokens should be used?",
    });

    expect(url).toContain("https://github.com/LouizeB/flytrapds/issues/new?");
    expect(url).toContain("labels=documentation%2Cdesign-system%2Cmemory");
    expect(url).toContain("title=%5BMemory+source%5D+token");
  });
});
