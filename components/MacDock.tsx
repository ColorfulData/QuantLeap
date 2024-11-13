// src/components/MacDock.tsx

"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface MacDockProps {
  minimizedWindows: {
    id: string;
    title: string;
  }[];
  restoreWindow: (id: string) => void;
}

const MacDock: React.FC<MacDockProps> = ({ minimizedWindows, restoreWindow }) => {
  return (
    <div className="flex justify-center items-center bg-background-header py-2">
      <div className="flex space-x-4">
        {minimizedWindows.map((window) => (
          <button
            key={window.id}
            onClick={() => restoreWindow(window.id)}
            className="w-12 h-12 flex items-center justify-center bg-background-elevated rounded-full hover:bg-accent-primary transition"
          >
            <span className="text-text-primary text-sm">{window.title[0]}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MacDock;
