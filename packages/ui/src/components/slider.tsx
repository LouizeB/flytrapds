import * as React from "react";
import { cn } from "../lib/utils";
import { Label } from "./label";

export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  valueLabel?: string;
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(({ className, max = 100, min = 0, valueLabel, ...props }, ref) => {
  return <div className="grid gap-2" data-slot="slider">
    <input
      ref={ref}
      className={cn("h-2 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary disabled:cursor-not-allowed disabled:opacity-50", className)}
      max={max}
      min={min}
      type="range"
      {...props}
    />
    {valueLabel ? <output className="text-xs text-muted-foreground">{valueLabel}</output> : null}
  </div>;
});
Slider.displayName = "Slider";

export interface SliderFieldProps extends SliderProps {
  label: React.ReactNode;
  hint?: React.ReactNode;
}

export function SliderField({ hint, id, label, valueLabel, ...props }: SliderFieldProps) {
  const generatedId = React.useId();
  const controlId = id ?? generatedId;
  const hintId = hint ? `${controlId}-hint` : undefined;

  return <div className="grid gap-2" data-slot="slider-field">
    <div className="flex items-center justify-between gap-3">
      <Label htmlFor={controlId}>{label}</Label>
      {valueLabel ? <span className="text-xs text-muted-foreground">{valueLabel}</span> : null}
    </div>
    <Slider aria-describedby={hintId} id={controlId} {...props} />
    {hint ? <p className="text-xs leading-5 text-muted-foreground" id={hintId}>{hint}</p> : null}
  </div>;
}
