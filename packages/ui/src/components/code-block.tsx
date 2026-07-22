import * as React from "react";
import { cn } from "../lib/utils";

export interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  code: string;
  filename?: string;
  language?: string;
}

export function CodeBlock({ className, code, filename, language = "tsx", ...props }: CodeBlockProps) {
  const accessibleName = filename ? `Code example: ${filename}` : language ? `Code example in ${language}` : "Code example";

  return <figure className="overflow-hidden rounded-xl border bg-card text-card-foreground" data-slot="code-block">
    {(filename || language) ? <figcaption className="flex items-center justify-between border-b px-4 py-2 text-xs text-muted-foreground">
      {filename ? <span>{filename}</span> : <span>Snippet</span>}
      <span>{language}</span>
    </figcaption> : null}
    <pre aria-label={accessibleName} className={cn("overflow-x-auto p-4 text-sm leading-6", className)} role="region" tabIndex={0} {...props}>
      <code>{code}</code>
    </pre>
  </figure>;
}
