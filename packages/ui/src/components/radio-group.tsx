import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "../lib/utils";

export const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => <RadioGroupPrimitive.Root ref={ref} className={cn("grid gap-3", className)} data-slot="radio-group" {...props} />);
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

export const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => <RadioGroupPrimitive.Item ref={ref} className={cn("aspect-square size-4 shrink-0 rounded-full border border-input bg-background text-primary outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className)} data-slot="radio-group-item" {...props}><RadioGroupPrimitive.Indicator className="grid place-items-center"><span className="size-2 rounded-full bg-current" /></RadioGroupPrimitive.Indicator></RadioGroupPrimitive.Item>);
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export interface RadioGroupFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
}

export function RadioGroupField({ value, label, description, disabled, className, ...props }: RadioGroupFieldProps) {
  const id = React.useId();
  const descriptionId = description ? `${id}-description` : undefined;
  return <div className={cn("flex min-h-11 items-start gap-3", disabled && "cursor-not-allowed opacity-70", className)} {...props}>
    <div className="grid min-h-11 min-w-6 place-items-start pt-1">
      <RadioGroupItem aria-describedby={descriptionId} disabled={disabled} id={id} value={value} />
    </div>
    <div className="grid gap-1 py-0.5 leading-none"><label className={cn("text-sm font-medium", disabled && "cursor-not-allowed")} htmlFor={id}>{label}</label>{description && <p className="text-xs leading-5 text-muted-foreground" id={descriptionId}>{description}</p>}</div>
  </div>;
}
