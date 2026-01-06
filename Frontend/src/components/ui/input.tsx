import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputSize?: "default" | "sm" | "lg" | "xl";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, inputSize = "default", ...props }, ref) => {
    const sizeClasses = {
      default: "h-11 px-4 py-2 text-sm",
      sm: "h-9 px-3 py-1 text-sm",
      lg: "h-14 px-5 py-3 text-base",
      xl: "h-16 px-6 py-4 text-lg",
    };

    return (
      <input
        type={type}
        className={cn(
          "flex w-full rounded-lg border border-input bg-background text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
          sizeClasses[inputSize],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
