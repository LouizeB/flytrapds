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
  return <div className={cn("flex items-start gap-3", className)} {...props}>
    <Checkbox aria-describedby={descriptionId} {...checkboxProps} id={id} />
    <div className="grid gap-1 leading-none">
      <label className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor={id}>{label}</label>
      {description && <p className="text-xs leading-5 text-muted-foreground" id={descriptionId}>{description}</p>}
    </div>
  </div>;
}
