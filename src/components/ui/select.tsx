"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const SelectContext = React.createContext<{
  value: string | undefined;
  onValueChange?: (value: string) => void;
}>({ value: undefined });

function Select({ children, value, onValueChange }: { children: React.ReactNode; value?: string; onValueChange?: (value: string) => void }) {
  const [internalValue, setInternalValue] = React.useState(value);

  const handleValueChange = React.useCallback((nextValue: string) => {
    setInternalValue(nextValue);
    onValueChange?.(nextValue);
  }, [onValueChange]);

  return (
    <SelectContext.Provider value={{ value: value ?? internalValue, onValueChange: handleValueChange }}>
      <div className="relative">{children}</div>
    </SelectContext.Provider>
  );
}

function SelectTrigger({ children, className }: { children: React.ReactNode; className?: string }) {
  const { value } = React.useContext(SelectContext);

  return (
    <button
      type="button"
      className={cn(
        "flex h-9 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm ring-offset-background transition-colors focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
    >
      <span>{value ? children : children}</span>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
  );
}

function SelectValue({ placeholder }: { placeholder?: string }) {
  const { value } = React.useContext(SelectContext);
  return <span className="text-muted-foreground">{value ?? placeholder}</span>;
}

function SelectContent({ children }: { children: React.ReactNode }) {
  return <div className="mt-1 rounded-md border bg-popover p-1 shadow-md">{children}</div>;
}

function SelectItem({ children, value }: { children: React.ReactNode; value: string }) {
  const { value: selectedValue, onValueChange } = React.useContext(SelectContext);
  const isSelected = selectedValue === value;

  return (
    <button
      type="button"
      onClick={() => onValueChange?.(value)}
      className={cn(
        "flex w-full items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent",
        isSelected && "bg-accent text-accent-foreground"
      )}
    >
      {children}
    </button>
  );
}

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue };
