import * as React from "react";
import { Button } from "../components/button";
import { cn } from "../lib/utils";

export function SuggestedPrompts({ prompts, onSelect, className }: { prompts: string[]; onSelect: (prompt: string) => void; className?: string }) {
  return <div aria-label="Sugestões de mensagem" className={cn("flex flex-wrap gap-2", className)} role="group">
    {prompts.map(prompt => <Button key={prompt} onClick={() => onSelect(prompt)} size="sm" variant="outline">{prompt}</Button>)}
  </div>;
}
