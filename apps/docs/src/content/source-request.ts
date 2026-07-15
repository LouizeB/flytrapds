export type FlytrapSourceRequestKind =
  | "accessibility"
  | "component"
  | "pattern"
  | "setup"
  | "token"
  | "workflow";

export const sourceRequestKinds = [
  "component",
  "token",
  "pattern",
  "setup",
  "accessibility",
  "workflow",
] as const satisfies readonly FlytrapSourceRequestKind[];

export interface FlytrapSourceRequestInput {
  context?: string;
  kind: FlytrapSourceRequestKind;
  question: string;
}

export const sourceRequestRepo = "https://github.com/LouizeB/flytrapds";

export function normalizeSourceRequestQuestion(question: string) {
  return question.trim().replace(/\s+/g, " ");
}

export function sourceRequestTitle({ kind, question }: FlytrapSourceRequestInput) {
  const normalizedQuestion = normalizeSourceRequestQuestion(question);
  const titleQuestion = normalizedQuestion.length > 74
    ? `${normalizedQuestion.slice(0, 71)}…`
    : normalizedQuestion;

  return `[Memory source] ${kind}: ${titleQuestion || "Document missing Flytrap guidance"}`;
}

export function sourceRequestMarkdown({ context, kind, question }: FlytrapSourceRequestInput) {
  const normalizedQuestion = normalizeSourceRequestQuestion(question);

  return [
    "## Missing source request",
    "",
    `**Question:** ${normalizedQuestion || "Add the question that could not be answered."}`,
    `**Type:** ${kind}`,
    "",
    "## Why this matters",
    "",
    context?.trim() || "The Memory Chat could not find a reliable indexed source. Add or improve documentation before this answer becomes guidance.",
    "",
    "## Source needed",
    "",
    "- [ ] Add or update the canonical documentation.",
    "- [ ] Add the source to `apps/docs/src/content/search-index.ts` or the generated memory candidates.",
    "- [ ] Include usage, states, accessibility and tokens when the request is component-related.",
    "- [ ] Re-run docs tests and visual audit.",
  ].join("\n");
}

export function sourceRequestIssueUrl(input: FlytrapSourceRequestInput) {
  const params = new URLSearchParams({
    body: sourceRequestMarkdown(input),
    labels: "documentation,design-system,memory",
    title: sourceRequestTitle(input),
  });

  return `${sourceRequestRepo}/issues/new?${params.toString()}`;
}
