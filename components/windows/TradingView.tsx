import { Maximize2, Minimize2, X } from 'lucide-react';
import { WindowProps } from '../types';
import React from 'react';

interface TradingWindowProps {
  window: WindowProps;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  isMaximized?: boolean;
}

export const TradingWindow: React.FC<TradingWindowProps> = ({
  window,
  onClose,
  onMinimize,
  onMaximize,
  isMaximized
}) => {
  return (
    <div
      className={`flex flex-col ${
        isMaximized 
          ? 'fixed inset-0 z-50 bg-background' 
          : 'h-full relative'
      } border border-gray-800 bg-gray-900 rounded-lg overflow-hidden`}
    >
      {/* Window Header */}
      <div className="flex items-center justify-between px-4 h-10 bg-gray-800 border-b border-gray-700">
        <span className="text-blue-400 font-semibold">{window.title}</span>
        <div className="flex space-x-2">
          <span
            role="button"
            className="h-6 w-6 flex items-center justify-center hover:bg-gray-700 text-gray-400 hover:text-white cursor-pointer"
            onClick={onMinimize}
          >
            <Minimize2 className="h-4 w-4" />
          </span>
          
          <span
            role="button"
            className="h-6 w-6 flex items-center justify-center hover:bg-gray-700 text-gray-400 hover:text-white cursor-pointer"
            onClick={onMaximize}
          >
            <Maximize2 className="h-4 w-4" />
          </span>
          
          <span
            role="button"
            className="h-6 w-6 flex items-center justify-center hover:bg-gray-700 text-gray-400 hover:text-red-500 cursor-pointer"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </span>
        </div>
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-auto p-2">
        {window.content}
      </div>
    </div>
  );
};
