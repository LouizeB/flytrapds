import * as React from "react";
import {
  AiAccentIcon,
  ChatThread,
  CitationChip,
  FlytrapIcon,
  MessageBubble,
  PromptInput,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@louizeb/flytrap-ui";
import { answerFlytrapMemoryWithProvider, memoryProviderConfig } from "../content/memory-provider";
import type { FlytrapMemoryResult } from "../content/search-index";

type ChatMessage = {
  content: string;
  id: number;
  role: "assistant" | "user";
  sources?: FlytrapMemoryResult[];
};

const prompts = [
  "How do I install Flytrap?",
  "Which component should I use?",
  "How do I validate accessibility?",
];

export function AskFlytrap({ onClose }: { onClose: () => void }) {
  const [input, setInput] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [messages, setMessages] = React.useState<ChatMessage[]>([{
    content: "Ask about installation, components, patterns, tokens, or accessibility. I answer from documented Flytrap sources.",
    id: 1,
    role: "assistant",
  }]);

  async function submit(question: string) {
    setSubmitting(true);
    try {
      const answer = await answerFlytrapMemoryWithProvider(question, { provider: memoryProviderConfig.provider });
      const now = Date.now();
      setMessages(current => [...current, { content: question, id: now, role: "user" as const }, {
        content: answer.response,
        id: now + 1,
        role: "assistant" as const,
        sources: answer.sources,
      }].slice(-8));
      setInput("");
    } finally {
      setSubmitting(false);
    }
  }

  return <Sheet defaultOpen onOpenChange={open => { if (!open) onClose(); }}>
    <SheetContent className="h-dvh w-full max-w-none grid-rows-[auto_minmax(0,1fr)_auto_auto] gap-4 overflow-hidden border-white/10 bg-[#090b12] p-5 text-white shadow-[-28px_0_100px_rgba(0,0,0,.8)] sm:w-[30rem] sm:max-w-[30rem] md:p-6" side="right">
      <SheetHeader className="border-b border-white/10 pb-4 pr-10">
        <SheetTitle className="flex items-center gap-2 text-xl text-white">
          <span className="grid size-9 place-items-center rounded-full bg-[#ff4fbd]/15 text-[#ff4fbd]"><FlytrapIcon icon={AiAccentIcon} /></span>
          Ask Flytrap
        </SheetTitle>
        <SheetDescription className="text-editorial-muted">Contextual guidance with links to the Flytrap sources used.</SheetDescription>
      </SheetHeader>
      <ChatThread className="min-h-0 rounded-2xl border-white/10 bg-black/35">
        {messages.map(message => <MessageBubble className={message.role === "assistant" ? "max-w-full border-white/10 bg-white/[.045] text-editorial-secondary" : "bg-[#ff4fbd] text-white"} key={message.id} role={message.role}>
          <p>{message.content}</p>
          {message.sources?.length ? <div className="mt-3 flex flex-wrap gap-2">{message.sources.map((source, index) => <CitationChip className="border-white/10 bg-black/35 text-editorial-secondary" href={source.href} index={index + 1} key={source.id} source={source.source} />)}</div> : null}
        </MessageBubble>)}
      </ChatThread>
      <div aria-label="Suggested questions" className="flex flex-wrap gap-2">
        {prompts.map(prompt => <button className="rounded-full border border-white/10 bg-white/[.035] px-3 py-2 text-left text-xs text-editorial-secondary hover:border-[#ff4fbd]/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b8ff35]" disabled={submitting} key={prompt} onClick={() => submit(prompt)} type="button">{prompt}</button>)}
      </div>
      <PromptInput footer={<span className="text-xs text-editorial-muted">Answers use documented Flytrap sources.</span>} label="Ask Flytrap" maxLength={220} onSubmitPrompt={submit} onValueChange={setInput} placeholder="How do I use this component?" submitting={submitting} value={input} />
    </SheetContent>
  </Sheet>;
}
