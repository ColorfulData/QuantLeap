// components/TradingWindow.tsx

import React, { useState } from 'react'
import { Minimize2, Maximize2, X } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface Window {
  id: string;
type: 'chart' | 'order' | 'trade' | 'position';
  title: string;
  content: React.ReactNode;
}

interface TradingWindowProps {
  window: Window;
  removeWindow: (id: string) => void;
}

const TradingWindow: React.FC<TradingWindowProps> = ({ window, removeWindow }) => {
  const [isMinimized, setIsMinimized] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)

  const handleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  const handleMaximize = () => {
    setIsMaximized(!isMaximized)
  }

const handleClose = () => {
    if (removeWindow) {
        removeWindow(window.id);
    }
}

  return (
    <div className={`bg-gray-800 rounded overflow-hidden border border-gray-700 flex flex-col ${isMaximized ? 'fixed top-0 left-0 w-full h-full z-50' : 'h-[calc(50vh-40px)]'}`}>
      <div className="h-8 bg-gray-700 flex items-center justify-between px-3 text-xs border-b border-gray-600">
        <span className="text-blue-400 font-semibold">{window.title}</span>
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" className="h-5 w-5" onClick={handleMinimize}>
            <Minimize2 className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="icon" className="h-5 w-5" onClick={handleMaximize}>
            <Maximize2 className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="icon" className="h-5 w-5" onClick={handleClose}>
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>
      {!isMinimized && (
        <div className="flex-1 overflow-auto p-2 text-xs">
          {window.content}
        </div>
      )}
    </div>
  )
}

export default TradingWindow
