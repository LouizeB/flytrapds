import * as React from "react";
import { cn } from "../lib/utils";
import { CodeBlock } from "./code-block";

export interface ComponentPreviewProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  preview: React.ReactNode;
  code?: string;
}

export function ComponentPreview({ className, code, description, preview, title, ...props }: ComponentPreviewProps) {
  return <section className={cn("overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm", className)} data-slot="component-preview" {...props}>
    <div className="border-b p-5">
      <h3 className="font-display text-lg font-semibold">{title}</h3>
      {description ? <p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p> : null}
    </div>
    <div className="grid min-h-40 place-items-center bg-background/50 p-6">{preview}</div>
    {code ? <div className="border-t"><CodeBlock code={code} language="tsx" /></div> : null}
  </section>;
}
