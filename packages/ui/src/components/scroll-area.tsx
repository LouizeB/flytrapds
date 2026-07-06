import * as React from "react";
import { cn } from "../lib/utils";

export function ScrollArea({ className, tabIndex = 0, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("overflow-auto overscroll-contain [scrollbar-color:var(--border)_transparent] [scrollbar-width:thin]", className)} tabIndex={tabIndex} {...props} />;
}
