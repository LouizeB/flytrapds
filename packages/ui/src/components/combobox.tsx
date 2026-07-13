import * as React from "react";
import { ChevronDownIcon, ConfirmIcon, FlytrapIcon } from "../icons";
import { cn } from "../lib/utils";

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ComboboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  options: ComboboxOption[];
  value?: string;
  defaultValue?: string;
  emptyMessage?: string;
  onValueChange?: (value: string) => void;
}

export const Combobox = React.forwardRef<HTMLInputElement, ComboboxProps>(({
  className,
  defaultValue,
  emptyMessage = "No options found.",
  onValueChange,
  options,
  placeholder = "Selecione...",
  value,
  ...props
}, ref) => {
  const generatedId = React.useId();
  const listboxId = `${generatedId}-listbox`;
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
  const [query, setQuery] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const currentValue = isControlled ? value : internalValue;
  const selected = options.find((option) => option.value === currentValue);
  const filteredOptions = options.filter((option) => option.label.toLowerCase().includes(query.toLowerCase()));

  function commit(nextValue: string, nextLabel: string) {
    if (!isControlled) setInternalValue(nextValue);
    setQuery(nextLabel);
    setOpen(false);
    onValueChange?.(nextValue);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      return;
    }
    if (event.key === "Escape") {
      setOpen(false);
      return;
    }
    if (event.key === "Enter") {
      const firstAvailable = filteredOptions.find((option) => !option.disabled);
      if (open && firstAvailable) {
        event.preventDefault();
        commit(firstAvailable.value, firstAvailable.label);
      }
    }
  }

  return <div className="relative" data-slot="combobox">
    <input
      ref={ref}
      aria-controls={listboxId}
      aria-expanded={open}
      aria-haspopup="listbox"
      className={cn("flex h-10 w-full rounded-md border border-input-border bg-input-bg px-3 py-2 pr-9 text-sm outline-none placeholder:text-input-placeholder focus-visible:border-input-border-focus focus-visible:ring-2 focus-visible:ring-input-border-focus disabled:cursor-not-allowed disabled:opacity-50", className)}
      onChange={(event) => {
        setQuery(event.target.value);
        setOpen(true);
      }}
      onFocus={() => {
        setOpen(true);
        setQuery(selected?.label ?? "");
      }}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      role="combobox"
      value={open ? query : selected?.label ?? ""}
      {...props}
    />
    <button aria-label="Open options" className="absolute right-2 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground" onClick={() => setOpen((state) => !state)} type="button">
      <FlytrapIcon icon={ChevronDownIcon} size="sm" />
    </button>
    {open ? <div className="absolute z-50 mt-2 max-h-64 w-full overflow-auto rounded-xl border bg-popover p-1 text-popover-foreground shadow-md" id={listboxId} role="listbox">
      {filteredOptions.length > 0 ? filteredOptions.map((option) => <button
        key={option.value}
        aria-selected={option.value === currentValue}
        className={cn("flex min-h-9 w-full items-center gap-2 rounded-md px-2 text-left text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-50")}
        disabled={option.disabled}
        onClick={() => commit(option.value, option.label)}
        role="option"
        type="button"
      >
        <span className="grid size-4 place-items-center">{option.value === currentValue ? <FlytrapIcon icon={ConfirmIcon} size="sm" /> : null}</span>
        {option.label}
      </button>) : <p className="px-3 py-6 text-center text-sm text-muted-foreground">{emptyMessage}</p>}
    </div> : null}
  </div>;
});
Combobox.displayName = "Combobox";
