"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectContextValue {
  value: string | undefined;
  open: boolean;
  onValueChange: (value: string) => void;
  onOpenChange: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  registerLabel: (value: string, label: string) => void;
  getLabel: (value: string) => string | undefined;
}

const SelectContext = React.createContext<SelectContextValue | null>(null);

function useSelectContext() {
  const context = React.useContext(SelectContext);

  if (!context) {
    throw new Error("Select components must be used inside <Select>");
  }

  return context;
}

/* -------------------------------------------------- */
/* Select                                             */
/* -------------------------------------------------- */

function Select({
  children,
  value,
  onValueChange,
}: {
  children: React.ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState(value ?? "");

  const labelMapRef = React.useRef<Map<string, string>>(new Map());

  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  const contentRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const currentValue = value !== undefined ? value : internalValue;

  const handleValueChange = React.useCallback(
    (nextValue: string) => {
      setInternalValue(nextValue);
      onValueChange?.(nextValue);
      setOpen(false);
    },
    [onValueChange]
  );

  /* Close when clicking outside this Select */
  React.useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;

      const clickedTrigger = triggerRef.current?.contains(target);
      const clickedContent = contentRef.current?.contains(target);

      if (!clickedTrigger && !clickedContent) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [open]);

  /* Escape */
  React.useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const registerLabel = React.useCallback(
    (value: string, label: string) => {
      labelMapRef.current.set(value, label);
    },
    []
  );

  const getLabel = React.useCallback((value: string) => {
    return labelMapRef.current.get(value);
  }, []);

  return (
    <SelectContext.Provider
      value={{
        value: currentValue,
        open,
        onValueChange: handleValueChange,
        onOpenChange: setOpen,
        triggerRef,
        contentRef,
        registerLabel,
        getLabel,
      }}
    >
      <div className="relative w-full">
        {children}
      </div>
    </SelectContext.Provider>
  );
}

/* -------------------------------------------------- */
/* SelectTrigger                                      */
/* -------------------------------------------------- */

function SelectTrigger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { open, onOpenChange, triggerRef } = useSelectContext();

  return (
    <button
      ref={triggerRef}
      type="button"
      aria-haspopup="listbox"
      aria-expanded={open}
      onClick={() => onOpenChange(!open)}
      className={cn(
        "flex h-10 w-full items-center justify-between gap-2",
        "rounded-md border border-input",
        "bg-input px-3 py-2",
        "text-sm text-foreground",
        "shadow-sm transition-colors",
        "hover:bg-muted/20 dark:hover:bg-muted/30",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
    >
      <span className="min-w-0 flex-1 truncate text-left">
        {children}
      </span>

      <ChevronDown
        className={cn(
          "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
          open && "rotate-180"
        )}
      />
    </button>
  );
}

/* -------------------------------------------------- */
/* SelectValue                                        */
/* -------------------------------------------------- */

function SelectValue({
  placeholder,
}: {
  placeholder?: string;
}) {
  const { value, getLabel } = useSelectContext();

  const display = value ? getLabel(value) ?? value : undefined;

  return (
    <span
      className={cn(
        display ? "text-foreground" : "text-muted-foreground"
      )}
    >
      {display ?? placeholder}
    </span>
  );
}

/* -------------------------------------------------- */
/* SelectContent                                      */
/* -------------------------------------------------- */

function SelectContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { open, triggerRef, contentRef } = useSelectContext();

  const [mounted, setMounted] = React.useState(false);

  const [position, setPosition] = React.useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const updatePosition = React.useCallback(() => {
    if (!triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();

    const viewportPadding = 8;

    const width = rect.width;

    const maxLeft = window.innerWidth - width - viewportPadding;

    const left = Math.max(
      viewportPadding,
      Math.min(rect.left, maxLeft)
    );

    setPosition({
      top: rect.bottom + 6,
      left,
      width,
    });
  }, [triggerRef]);

  React.useLayoutEffect(() => {
    if (!open) return;

    updatePosition();
  }, [open, updatePosition]);

  React.useEffect(() => {
    if (!open) return;

    const handleResize = () => {
      updatePosition();
    };

    const handleScroll = () => {
      updatePosition();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, true);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [open, updatePosition]);

  if (!mounted || !open || !position) {
    return null;
  }

  const content = (
    <div
      ref={contentRef}
      role="listbox"
      aria-label="Select options"
      style={{
        position: "fixed",
        top: position.top,
        left: position.left,
        width: position.width,
        zIndex: 999999,
      }}
      className={cn(
        "isolate",
        "max-h-60 overflow-y-auto",
        "rounded-xl border",
        "border-border",
        "bg-popover text-popover-foreground",
        "p-1",
        "shadow-card",
        "animate-in fade-in-0 zoom-in-95 duration-100"
      )}
    >
      {children}
    </div>
  );

  return createPortal(content, document.body);
}

/* -------------------------------------------------- */
/* SelectItem                                         */
/* -------------------------------------------------- */

function SelectItem({
  children,
  value,
}: {
  children: React.ReactNode;
  value: string;
}) {
  const {
    value: selectedValue,
    onValueChange,
    registerLabel,
  } = useSelectContext();

  const isSelected = selectedValue === value;

  const label =
    typeof children === "string" ? children : undefined;

  React.useEffect(() => {
    if (label) {
      registerLabel(value, label);
    }
  }, [value, label, registerLabel]);

  return (
    <button
      type="button"
      role="option"
      aria-selected={isSelected}
      onClick={() => onValueChange(value)}
      className={cn(
        "flex w-full items-center gap-2",
        "rounded-sm px-2 py-2",
        "text-left text-sm",
        "text-foreground",
        "cursor-pointer",
        "transition-colors",
        "hover:bg-muted/80 focus:bg-muted/80",
        "focus:outline-none",
        isSelected &&
        "bg-primary/10 font-medium text-primary dark:bg-primary/15"
      )}
    >
      <Check
        className={cn(
          "h-3.5 w-3.5 shrink-0",
          isSelected
            ? "text-primary opacity-100"
            : "opacity-0"
        )}
      />

      <span className="min-w-0 flex-1 truncate">
        {children}
      </span>
    </button>
  );
}

/* -------------------------------------------------- */
/* Exports                                            */
/* -------------------------------------------------- */

export {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
};