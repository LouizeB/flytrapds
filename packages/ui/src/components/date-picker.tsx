import * as React from "react";
import { CalendarIcon, FlytrapIcon } from "../icons";
import { cn } from "../lib/utils";
import { Label } from "./label";

export interface DatePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {}

export const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(({ className, ...props }, ref) => {
  return <div className="relative" data-slot="date-picker">
    <input
      ref={ref}
      className={cn("flex h-10 w-full rounded-md border border-input-border bg-input-bg px-3 py-2 pr-9 text-sm outline-none focus-visible:border-input-border-focus focus-visible:ring-2 focus-visible:ring-input-border-focus disabled:cursor-not-allowed disabled:opacity-50", className)}
      type="date"
      {...props}
    />
    <FlytrapIcon className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" icon={CalendarIcon} size="sm" />
  </div>;
});
DatePicker.displayName = "DatePicker";

export interface DatePickerFieldProps extends DatePickerProps {
  label: React.ReactNode;
  hint?: React.ReactNode;
}

export function DatePickerField({ hint, id, label, ...props }: DatePickerFieldProps) {
  const generatedId = React.useId();
  const controlId = id ?? generatedId;
  const hintId = hint ? `${controlId}-hint` : undefined;

  return <div className="grid gap-2" data-slot="date-picker-field">
    <Label htmlFor={controlId}>{label}</Label>
    <DatePicker aria-describedby={hintId} id={controlId} {...props} />
    {hint ? <p className="text-xs leading-5 text-muted-foreground" id={hintId}>{hint}</p> : null}
  </div>;
}
