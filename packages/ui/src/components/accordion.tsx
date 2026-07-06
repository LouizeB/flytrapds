import * as React from "react";
import { ChevronDownIcon, FlytrapIcon } from "../icons";
import { cn } from "../lib/utils";

export function Accordion({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("divide-y rounded-lg border", className)} {...props} />;
}

export function AccordionItem({ className, ...props }: React.DetailsHTMLAttributes<HTMLDetailsElement>) {
  return <details className={cn("group", className)} {...props} />;
}

export function AccordionTrigger({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <summary className={cn("flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden", className)} {...props}>
    {children}<FlytrapIcon className="transition-transform group-open:rotate-180" icon={ChevronDownIcon} />
  </summary>;
}

export function AccordionContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-4 pb-4 text-sm leading-6 text-muted-foreground", className)} {...props} />;
}
