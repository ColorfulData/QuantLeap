// src/components/ui/Button.tsx

"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost" | "secondary";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "default",
  size = "md",
  children,
  className,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center border border-transparent font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition";

  const variantClasses = {
    default: "bg-accent-primary text-text-primary hover:bg-accent-primary/80 focus:ring-accent-primary",
    ghost: "bg-transparent text-text-primary hover:bg-hoverBg focus:ring-accent-primary",
    secondary: "bg-background-header text-text-primary hover:bg-hoverBg focus:ring-accent-primary",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  };

  return (
    <button
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className || "")}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;