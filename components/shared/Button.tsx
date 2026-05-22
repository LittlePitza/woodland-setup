"use client";

import { cn } from "@/lib/utils";
import { forwardRef, type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          // base
          "press-effect inline-flex items-center justify-center gap-2",
          "font-ui font-medium tracking-wide",
          "transition-all duration-150",
          "disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none",
          "rounded-md",
          // sizes
          size === "sm" && "px-3 py-1.5 text-sm",
          size === "md" && "px-5 py-2.5 text-base",
          size === "lg" && "px-7 py-3.5 text-lg",
          // variants
          variant === "primary" &&
            "bg-ink text-paper-light shadow-card hover:shadow-card-hover hover:bg-ink-soft",
          variant === "secondary" &&
            "bg-rust text-paper-light shadow-card hover:bg-ember hover:shadow-card-hover",
          variant === "ghost" &&
            "text-ink hover:bg-paper-dark/40",
          variant === "outline" &&
            "border-2 border-ink/30 text-ink hover:border-ink/60 hover:bg-paper-dark/30",
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
