import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        primary: "bg-primary/10 text-primary",
        secondary: "bg-secondary/10 text-secondary-foreground",
        success: "badge-success",
        warning: "badge-warning",
        danger: "badge-error",
        outline: "border border-border text-muted-foreground",
      },
      size: {
        sm: "px-2 py-0.5 text-[10px]",
        md: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className = "", variant, size, ...props }: BadgeProps) {
  return <span className={`${badgeVariants({ variant, size })} ${className}`} {...props} />;
}

export { Badge, badgeVariants };

