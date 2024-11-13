// src/components/AdvancedTradingTerminal.tsx

"use client";

import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import TradingWindow from "@/components/windows/TradingWindow";
import { WindowProps } from "@/components/types";
import NewsFeed from "@/components/windows/NewsFeed";
import TradeAnalysis from "@/components/windows/TradeAnalysis";
import PerformanceAnalysis from "@/components/windows/PerformanceAnalysis";
import PortfolioWindow from "@/components/windows/PortfolioWindow";
import LiquidityAnalysis from "@/components/windows/LiquidityAnalysis";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid";
import MacDock from "@/components/MacDock"; // Ensure this path is correct
import TradingViewChart from "@/components/windows/TradingViewChart";
import TechnicalAnalysis from "@/components/windows/TechnicalAnalysis";


interface AdvancedTradingTerminalProps {
  currentLayout: "grid" | "tabs";
  symbol: string;
}

const AdvancedTradingTerminal: React.FC<AdvancedTradingTerminalProps> = ({ currentLayout, symbol }) => {
  const [workspace, setWorkspace] = useState<WindowProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize workspace after component mounts
  useEffect(() => {
    const initialWorkspace: WindowProps[] = [
      {
        id: uuidv4(),
        type: "chart",
        title: "Chart",
        content: <TradingViewChart symbol={symbol} id="chart1" />,
        isMinimized: false,
        isMaximized: false,
      },
      {
        id: uuidv4(),
        type: "tradeAnalysis",
        title: "Trade Analysis",
        content: <TradeAnalysis symbol={symbol} />,
        isMinimized: false,
        isMaximized: false,
      },
      {
        id: uuidv4(),
        type: "newsFeed",
        title: "News Feed",
        content: <NewsFeed symbol={symbol} searchTerm={symbol} />,
        isMinimized: false,
        isMaximized: false,
      },
      {
        id: uuidv4(),
        type: "liquidityAnalysis",
        title: "Liquidity Analysis",
        content: <LiquidityAnalysis symbol={symbol} />,
        isMinimized: false,
        isMaximized: false,
      },
      {
        id: uuidv4(),
        type: "technicalAnalysis",
        title: "Technical Analysis",
        content: <TechnicalAnalysis symbol={symbol} />,
        isMinimized: false,
        isMaximized: false,
      },
      {
        id: uuidv4(),
        type: "performance",
        title: "Performance",
        content: <PerformanceAnalysis symbol={symbol} />,
        isMinimized: false,
        isMaximized: false,
      },
    ];
    setWorkspace(initialWorkspace);
  }, []);

  // Update workspace windows when the symbol changes
  useEffect(() => {
    setWorkspace((prevWorkspace) =>
      prevWorkspace.map((window) => {
        switch (window.type) {
          case "chart":
            return { ...window, content: <TradingViewChart symbol={symbol} id="chart1" /> };
          case "technicalAnalysis":
            return { ...window, content: <TechnicalAnalysis symbol={symbol} /> };
          case "tradeAnalysis":
            return { ...window, content: <TradeAnalysis symbol={symbol} /> };
          case "newsFeed":
            return { ...window, content: <NewsFeed symbol={symbol} searchTerm={symbol} /> };
          case "performance":
            return { ...window, content: <PerformanceAnalysis symbol={symbol} /> };
          case "liquidityAnalysis":
            return { ...window, content: <LiquidityAnalysis symbol={symbol} /> };
          default:
            return window;
        }
      })
    );
  }, [symbol]);

  // Update positions after component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWorkspace(prev => prev.map(window => {
        if (window.type === 'liquidityAnalysis') {
          return {
            ...window,
            position: { x: 0, y: globalThis.window.innerHeight - 400 }
          };
        }
        if (window.type === 'technicalAnalysis') {
          return {
            ...window,
            position: { x: globalThis.window.innerWidth - 400, y: globalThis.window.innerHeight - 400 }
          };
        }
        return window;
      }));
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const newWorkspace = Array.from(workspace);
    const [reorderedItem] = newWorkspace.splice(result.source.index, 1);
    newWorkspace.splice(result.destination.index, 0, reorderedItem);
    setWorkspace(newWorkspace);
  };

  const closeWindow = (id: string) => {
    setWorkspace((prev) => prev.filter((window) => window.id !== id));
  };

  const minimizeWindow = (id: string) => {
    setWorkspace((prev) =>
      prev.map((window) =>
        window.id === id ? { ...window, isMinimized: true, isMaximized: false } : window
      )
    );
  };

  const maximizeWindow = (id: string) => {
    setWorkspace((prev) =>
      prev.map((window) =>
        window.id === id
          ? { ...window, isMaximized: !window.isMaximized, isMinimized: false }
          : { ...window, isMaximized: false }
      )
    );
  };

  const restoreWindow = (id: string) => {
    setWorkspace((prev) =>
      prev.map((window) =>
        window.id === id ? { ...window, isMinimized: false } : window
      )
    );
  };

  // Filter minimized windows for the dock
  const minimizedWindows = workspace.filter((window) => window.isMinimized);

  return (
    <div className="h-screen flex flex-col bg-background text-text-primary">
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
          <div className="w-16 h-16 border-4 border-accent-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div className="flex-1 overflow-hidden">
        {workspace.length > 0 && (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable 
              droppableId="workspace" 
              direction="vertical" 
              isDropDisabled={currentLayout !== "grid"}
              isCombineEnabled={false}
              ignoreContainerClipping={false}
            >
              {(provided) => (
                <main
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={cn("flex-1 overflow-auto p-2", currentLayout === "grid" ? "bg-background" : "bg-background")}
                >
                  {currentLayout === "grid" ? (
                    workspace.some((window) => window.isMaximized) ? (
                      workspace
                        .filter((window) => window.isMaximized)
                        .map((window) => (
                          <TradingWindow
                            key={window.id}
                            window={window}
                            onClose={() => closeWindow(window.id)}
                            onMinimize={() => minimizeWindow(window.id)}
                            onMaximize={() => maximizeWindow(window.id)}
                            isMaximized
                          />
                        ))
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                        {workspace
                          .filter((window) => !window.isMinimized)
                          .map((window, index) => (
                            <Draggable key={window.id} draggableId={window.id} index={index}>
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={cn("bg-background-elevated shadow-card rounded-md flex flex-col", "h-[450px]")}
                                >
                                  <TradingWindow
                                    window={window}
                                    onClose={() => closeWindow(window.id)}
                                    onMinimize={() => minimizeWindow(window.id)}
                                    onMaximize={() => maximizeWindow(window.id)}
                                    isMaximized={window.isMaximized || false}
                                  />
                                </div>
                              )}
                            </Draggable>
                          ))}
                      </div>
                    )
                  ) : (
                    <div className="flex flex-col h-full">
                      <div className="tabs mb-4 bg-background-header p-2 rounded-t">
                        <ul className="flex space-x-2 overflow-x-auto">
                          {workspace
                            .filter((window) => !window.isMinimized)
                            .map((window) => (
                              <li key={window.id}>
                                <Button
                                  variant="ghost"
                                  className={`text-accent-primary hover:text-accent-primary ${window.isMaximized ? "underline" : ""}`}
                                >
                                  {window.title}
                                </Button>
                              </li>
                            ))}
                        </ul>
                      </div>
                      <div className="flex-1 bg-background-elevated shadow-card rounded-b-md p-2 overflow-auto">
                        {workspace
                          .filter((window) => !window.isMinimized)
                          .map((window) => (
                            <React.Fragment key={window.id}>
                              <TradingWindow
                                window={window}
                                onClose={() => closeWindow(window.id)}
                                onMinimize={() => minimizeWindow(window.id)}
                                onMaximize={() => maximizeWindow(window.id)}
                                isMaximized={window.isMaximized || false}
                              />
                            </React.Fragment>
                          ))}
                      </div>
                    </div>
                  )}
                  {provided.placeholder}
                </main>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </div>

      <MacDock minimizedWindows={minimizedWindows} restoreWindow={restoreWindow} />
    </div>
  );
};

export default AdvancedTradingTerminal;
