import * as React from "react";
import { FlytrapIcon, SendIcon } from "../icons";
import { cn } from "../lib/utils";
import { Button } from "../components/button";
import { Textarea } from "../components/textarea";

export interface PromptInputProps extends Omit<React.FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  value: string;
  onValueChange: (value: string) => void;
  onSubmitPrompt: (value: string) => void;
  placeholder?: string;
  submitting?: boolean;
  maxLength?: number;
  attachmentAction?: React.ReactNode;
  footer?: React.ReactNode;
  label?: string;
}

export function PromptInput({ value, onValueChange, onSubmitPrompt, placeholder = "Escreva uma mensagem…", submitting = false, maxLength = 4000, attachmentAction, footer, label = "Mensagem", className, ...props }: PromptInputProps) {
  const promptId = React.useId();
  const countId = React.useId();
  const submit = () => {
    const prompt = value.trim();
    if (!prompt || submitting) return;
    onSubmitPrompt(prompt);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submit();
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      submit();
    }
  };
  return <form className={cn("grid gap-2 rounded-xl border bg-card p-3 shadow-sm focus-within:ring-2 focus-within:ring-ring", className)} data-slot="prompt-input" onSubmit={handleSubmit} {...props}>
    <label className="sr-only" htmlFor={promptId}>{label}</label>
    <Textarea aria-describedby={countId} className="min-h-20 resize-none border-0 bg-transparent p-1 shadow-none focus-visible:ring-0" disabled={submitting} id={promptId} maxLength={maxLength} onChange={event => onValueChange(event.target.value)} onKeyDown={handleKeyDown} placeholder={placeholder} value={value} />
    <div className="flex items-center gap-2">
      {attachmentAction}
      <span className="text-xs text-muted-foreground" id={countId}>{value.length}/{maxLength}</span>
      {footer && <div className="min-w-0 flex-1">{footer}</div>}
      <Button aria-label="Enviar mensagem" className="ml-auto" disabled={!value.trim()} loading={submitting} loadingAnnouncement="Enviando mensagem" size="icon" type="submit">{!submitting && <FlytrapIcon icon={SendIcon} />}</Button>
    </div>
  </form>;
}
