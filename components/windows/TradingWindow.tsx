// src/components/windows/TradingWindow.tsx

"use client";

import React from "react";
import { ChevronUp, ChevronDown, X,  Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import { WindowProps } from "@/components/types";

interface TradingWindowProps {
  window: WindowProps;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  isMaximized: boolean;
}

const TradingWindow: React.FC<TradingWindowProps> = ({
  window,
  onClose,
  onMinimize,
  onMaximize,
  isMaximized,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col h-full",
        isMaximized ? "w-full h-full" : ""
      )}
    >
      {/* Window Header */}
      <div className="flex items-center justify-between bg-background-header px-4 py-2 border-b border-border">
        <div className="flex items-center space-x-2">
          <span className="text-text-primary font-semibold">{window.title}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={onMinimize}>
            <Minimize2 size={16} />
          </Button>
          <Button variant="ghost" size="sm" onClick={onMaximize}>
            {isMaximized ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
          </Button>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X size={16} />
          </Button>
        </div>
      </div>

      {/* Window Content */}
      <div className="flex-1 p-4 overflow-auto bg-background-elevated">
        {window.content}
      </div>
    </div>
  );
};

export default TradingWindow;
