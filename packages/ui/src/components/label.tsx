import * as React from "react";
import { cn } from "../lib/utils";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  optionalText?: string;
}

export function Label({ children, className, optionalText, required = false, ...props }: LabelProps) {
  return <label className={cn("inline-flex items-center gap-1 text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)} data-slot="label" {...props}>
    <span>{children}</span>
    {required ? <span aria-hidden="true" className="text-destructive">*</span> : null}
    {!required && optionalText ? <span className="text-xs font-normal text-muted-foreground">{optionalText}</span> : null}
  </label>;
}
