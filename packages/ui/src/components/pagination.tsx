import * as React from "react";
import { Button } from "./button";
import { cn } from "../lib/utils";

export function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return <nav aria-label="Paginação" className={cn("flex items-center justify-center gap-2", className)} {...props} />;
}

export function PaginationPrevious(props: React.ComponentProps<typeof Button>) {
  return <Button variant="outline" {...props}>Anterior</Button>;
}

export function PaginationNext(props: React.ComponentProps<typeof Button>) {
  return <Button variant="outline" {...props}>Próxima</Button>;
}

export function PaginationPage({ current, children, ...props }: React.ComponentProps<typeof Button> & { current?: boolean }) {
  return <Button aria-current={current ? "page" : undefined} aria-label={`Página ${String(children)}`} variant={current ? "default" : "ghost"} {...props}>{children}</Button>;
}
