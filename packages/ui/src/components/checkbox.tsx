import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { ConfirmIcon, FlytrapIcon } from "../icons";
import { cn } from "../lib/utils";

export const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn("peer size-4 shrink-0 rounded border border-input bg-background outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground", className)}
    data-slot="checkbox"
    {...props}
  >
    <CheckboxPrimitive.Indicator className="grid place-items-center text-current">
      <FlytrapIcon icon={ConfirmIcon} size="sm" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export interface CheckboxFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  description?: React.ReactNode;
  checkboxProps?: React.ComponentPropsWithoutRef<typeof Checkbox>;
}

export function CheckboxField({ label, description, checkboxProps, className, ...props }: CheckboxFieldProps) {
  const generatedId = React.useId();
  const id = checkboxProps?.id ?? generatedId;
  const descriptionId = description ? `${id}-description` : undefined;
  const disabled = checkboxProps?.disabled;
  return <div className={cn("flex min-h-11 items-start gap-3", disabled && "cursor-not-allowed opacity-70", className)} {...props}>
    <div className="grid min-h-11 min-w-6 place-items-start pt-1">
      <Checkbox aria-describedby={descriptionId} {...checkboxProps} id={id} />
    </div>
    <div className="grid gap-1 py-0.5 leading-none">
      <label className={cn("text-sm font-medium", disabled && "cursor-not-allowed")} htmlFor={id}>{label}</label>
      {description && <p className="text-xs leading-5 text-muted-foreground" id={descriptionId}>{description}</p>}
    </div>
  </div>;
}
