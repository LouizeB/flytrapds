import * as React from "react";
import { cn } from "../lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Native input type. Prefer semantic types such as email, search, password, number or url when they improve keyboard and validation behavior. */
  type?: React.HTMLInputTypeAttribute;
  /** Sets the invalid visual state and exposes invalid state to assistive technology. */
  "aria-invalid"?: React.AriaAttributes["aria-invalid"];
}

export function Input({ className, type, ...props }: InputProps) {
  return <input type={type} className={cn("flex h-10 w-full rounded-md border border-input-border bg-input-bg px-3 py-2 text-sm outline-none placeholder:text-input-placeholder focus-visible:border-input-border-focus focus-visible:ring-2 focus-visible:ring-input-border-focus aria-invalid:border-input-border-error aria-invalid:ring-input-border-error/20 disabled:cursor-not-allowed disabled:opacity-50", className)} {...props} />;
}

export interface FieldProps {
  /** Visible label text for the wrapped control. */
  label: string;
  /** Optional helper text shown when there is no error. */
  hint?: string;
  /** Validation message shown in destructive styling. */
  error?: string;
  /** Form control rendered between the label and helper/error text. */
  children: React.ReactNode;
}

export function Field({ label, hint, error, children }: FieldProps) {
  return <label className="grid gap-2 text-sm font-medium">{label}{children}{(error || hint) && <span className={cn("text-xs font-normal text-muted-foreground", error && "text-destructive")}>{error ?? hint}</span>}</label>;
}
