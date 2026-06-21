import * as React from "react";
import { cn } from "../lib/utils";

export function Input({ className, type, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input type={type} className={cn("flex h-10 w-full rounded-md border border-input-border bg-input-bg px-3 py-2 text-sm outline-none placeholder:text-input-placeholder focus-visible:border-input-border-focus focus-visible:ring-2 focus-visible:ring-input-border-focus aria-invalid:border-input-border-error aria-invalid:ring-input-border-error/20 disabled:cursor-not-allowed disabled:opacity-50", className)} {...props} />;
}

export function Field({ label, hint, error, children }: { label: string; hint?: string; error?: string; children: React.ReactNode }) {
  return <label className="grid gap-2 text-sm font-medium">{label}{children}{(error || hint) && <span className={cn("text-xs font-normal text-muted-foreground", error && "text-destructive")}>{error ?? hint}</span>}</label>;
}
