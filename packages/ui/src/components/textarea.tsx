import * as React from "react";
import { cn } from "../lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  resize?: "none" | "vertical" | "both";
}

const resizeClasses = {
  none: "resize-none",
  vertical: "resize-y",
  both: "resize",
};

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, resize = "vertical", ...props }, ref) => <textarea
    ref={ref}
    className={cn("flex min-h-24 w-full rounded-md border border-input-border bg-input-bg px-3 py-2 text-sm outline-none placeholder:text-input-placeholder focus-visible:border-input-border-focus focus-visible:ring-2 focus-visible:ring-input-border-focus aria-invalid:border-input-border-error aria-invalid:ring-input-border-error/20 disabled:cursor-not-allowed disabled:opacity-50", resizeClasses[resize], className)}
    data-slot="textarea"
    {...props}
  />
);
Textarea.displayName = "Textarea";
