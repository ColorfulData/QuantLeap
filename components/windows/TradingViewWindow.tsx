// src/components/windows/TradingViewWindow.tsx

"use client";

import React, { useEffect } from "react";
import { X, Maximize2, Minimize2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export interface WindowProps {
  id: string;
  type: string;
  title: string;
  content: React.ReactNode;
  isMinimized: boolean;
  isMaximized: boolean;
}

interface TradingWindowProps {
  window: WindowProps;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  isMaximized: boolean;
}

// Extend the Window interface
declare global {
  interface Window {
    TradingView: any;
  }
}

const TradingWindow: React.FC<TradingWindowProps> = ({
  window,
  onClose,
  onMinimize,
  onMaximize,
  isMaximized,
}) => {
  useEffect(() => {
    const scriptId = "tradingview-widget-script";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    // Load the TradingView script if not already loaded
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://s3.tradingview.com/tv.js";
      script.async = true;
      document.body.appendChild(script);
    }

    const handleScriptLoad = () => {
      if ((window as any).TradingView) {
        new (window as any).TradingView.widget({
          symbol: "NASDAQ:AAPL",
          interval: "D",
          container_id: "tradingview_widget",
          // ... other configuration options
        });
      }
    };

    // If the script is already loaded, initialize the widget
    if ((window as any).TradingView) {
      handleScriptLoad();
    } else {
      // Otherwise, wait for the script to load
      script.addEventListener("load", handleScriptLoad);
    }

    // Cleanup on unmount
    return () => {
      if (script) {
        script.removeEventListener("load", handleScriptLoad);
      }
    };
  }, []);

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
            <Maximize2 size={16} />
          </Button>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X size={16} />
          </Button>
        </div>
      </div>

      {/* Window Content */}
      <div className="flex-1 p-4 overflow-auto bg-background-elevated">
        <div id="tradingview_widget" style={{ height: "500px" }} />
      </div>
    </div>
  );
};

export default TradingWindow;
