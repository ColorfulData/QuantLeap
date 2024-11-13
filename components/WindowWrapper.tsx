// src/components/WindowWrapper.tsx

'use client';

import React from 'react';
import { X, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from "@/components/ui/Button";

interface WindowWrapperProps {
  children: React.ReactNode;
  title: string;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  isMaximized?: boolean;
  isMinimized?: boolean;
}

const WindowWrapper: React.FC<WindowWrapperProps> = ({
  children,
  title,
  onClose,
  onMinimize,
  onMaximize,
  isMaximized = false,
  isMinimized = false,
}) => {
  return (
    <div
      className={`bg-[#0A0A0A] rounded-lg overflow-hidden border border-gray-900 ${
        isMaximized ? 'fixed inset-0 z-50' : 'relative'
      } ${isMinimized ? 'h-10' : 'h-full'}`}
    >
      <div className="flex items-center justify-between bg-[#1A1A1A] px-4 py-2 border-b border-gray-900">
        <h3 className="text-blue-600 font-semibold">{title}</h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMinimize}
            aria-label="Minimize"
          >
            <Minimize2 className="h-4 w-4 text-gray-400 hover:text-blue-600" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onMaximize}
            aria-label="Maximize"
          >
            <Maximize2 className="h-4 w-4 text-gray-400 hover:text-blue-600" />
          </Button>
          {onClose && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              aria-label="Close"
            >
              <X className="h-4 w-4 text-gray-400 hover:text-red-500" />
            </Button>
          )}
        </div>
      </div>
      <div className={`${isMinimized ? 'hidden' : 'block'}`}>
        {children}
      </div>
    </div>
  );
};

export default WindowWrapper;
