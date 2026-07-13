import * as React from "react";
import { cn } from "../lib/utils";
import { Label } from "./label";

export function Form({ className, ...props }: React.FormHTMLAttributes<HTMLFormElement>) {
  return <form className={cn("grid gap-5", className)} data-slot="form" {...props} />;
}

export interface FormMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
  tone?: "hint" | "error" | "success";
}

export function FormMessage({ className, tone = "hint", ...props }: FormMessageProps) {
  return <p
    className={cn(
      "text-xs leading-5",
      tone === "hint" && "text-muted-foreground",
      tone === "error" && "text-destructive",
      tone === "success" && "text-success",
      className,
    )}
    data-slot="form-message"
    {...props}
  />;
}

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  children: React.ReactNode;
  controlId?: string;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  success?: React.ReactNode;
  optionalText?: string;
  required?: boolean;
}

function withControlProps(
  child: React.ReactNode,
  controlId: string,
  describedBy: string | undefined,
  invalid: boolean,
) {
  if (!React.isValidElement<Record<string, unknown>>(child)) return child;

  const childDescribedBy = typeof child.props["aria-describedby"] === "string" ? child.props["aria-describedby"] : undefined;
  const mergedDescribedBy = [childDescribedBy, describedBy].filter(Boolean).join(" ") || undefined;

  return React.cloneElement(child, {
    "aria-describedby": mergedDescribedBy,
    "aria-invalid": invalid || undefined,
    id: typeof child.props.id === "string" ? child.props.id : controlId,
  });
}

export function FormField({
  children,
  className,
  controlId,
  error,
  hint,
  label,
  optionalText,
  required = false,
  success,
  ...props
}: FormFieldProps) {
  const generatedId = React.useId();
  const fallbackId = controlId ?? generatedId;
  const id = React.isValidElement<Record<string, unknown>>(children) && typeof children.props.id === "string" ? children.props.id : fallbackId;
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const successId = success && !error ? `${id}-success` : undefined;
  const describedBy = [hintId, errorId, successId].filter(Boolean).join(" ") || undefined;

  return <div className={cn("grid gap-2", className)} data-invalid={error ? true : undefined} data-slot="form-field" {...props}>
    <Label htmlFor={id} optionalText={optionalText} required={required}>{label}</Label>
    {withControlProps(children, id, describedBy, Boolean(error))}
    {hint ? <FormMessage id={hintId} tone="hint">{hint}</FormMessage> : null}
    {error ? <FormMessage id={errorId} role="alert" tone="error">{error}</FormMessage> : null}
    {success && !error ? <FormMessage id={successId} tone="success">{success}</FormMessage> : null}
  </div>;
}
