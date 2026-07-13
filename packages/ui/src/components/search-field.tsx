import * as React from "react";
import { CloseIcon, FlytrapIcon, SearchIcon } from "../icons";
import { cn } from "../lib/utils";

export interface SearchFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  clearLabel?: string;
  onClear?: () => void;
}

export const SearchField = React.forwardRef<HTMLInputElement, SearchFieldProps>(({
  className,
  clearLabel = "Limpar busca",
  onChange,
  onClear,
  value,
  defaultValue,
  ...props
}, ref) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue === undefined ? "" : String(defaultValue));
  const isControlled = value !== undefined;
  const currentValue = isControlled ? String(value) : internalValue;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (!isControlled) setInternalValue(event.target.value);
    onChange?.(event);
  }

  function handleClear() {
    if (!isControlled) setInternalValue("");
    onClear?.();
  }

  return <div className="relative" data-slot="search-field">
    <FlytrapIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" icon={SearchIcon} size="sm" />
    <input
      ref={ref}
      className={cn("flex h-10 w-full rounded-md border border-input-border bg-input-bg py-2 pl-9 pr-10 text-sm outline-none placeholder:text-input-placeholder focus-visible:border-input-border-focus focus-visible:ring-2 focus-visible:ring-input-border-focus disabled:cursor-not-allowed disabled:opacity-50", className)}
      onChange={handleChange}
      role="searchbox"
      type="search"
      value={isControlled ? value : internalValue}
      {...props}
    />
    {currentValue ? <button aria-label={clearLabel} className="absolute right-2 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground" onClick={handleClear} type="button">
      <FlytrapIcon icon={CloseIcon} size="sm" />
    </button> : null}
  </div>;
});
SearchField.displayName = "SearchField";
