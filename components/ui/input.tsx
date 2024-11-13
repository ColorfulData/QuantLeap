// src/components/ui/Input.tsx

"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input: React.FC<InputProps> = ({ className = "", ...props }) => {
  return (
    <input
      className={cn(
        "block w-full border border-border rounded-md bg-background-elevated text-text-primary placeholder-text-secondary focus:ring-accent-primary focus:border-accent-primary sm:text-sm",
        className
      )}
      {...props}
    />
  );
};

export default Input;
