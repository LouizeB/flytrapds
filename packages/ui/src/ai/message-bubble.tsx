import { cn } from "../lib/utils";

export function MessageBubble({ role, children, className }: { role: "user" | "assistant"; children: React.ReactNode; className?: string }) {
  return <div className={cn("max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6", role === "user" ? "ml-auto rounded-br-sm bg-chat-bubble-user-bg text-chat-bubble-user-fg" : "rounded-bl-sm border bg-chat-bubble-assistant-bg text-chat-bubble-assistant-fg", className)}>{children}</div>;
}
