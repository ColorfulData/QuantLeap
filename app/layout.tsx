// src/app/layout.tsx

"use client";

import React, { useState, useEffect } from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/use-toast";
import Headers from "@/components/Headers";
import Footer from "@/components/Footer";
import AdvancedTradingTerminal from "@/components/AdvancedTradingTerminal";
import { analyzeSearchTerm } from "@/components/utils/searchUtils";
import Button from "@/components/ui/Button";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// // Define Metadata if needed
// export const metadata: Metadata = {
//   title: "QuantLeap",
//   description: "Advanced Trading Terminal",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [currentLayout, setCurrentLayout] = useState<"grid" | "tabs">("grid");
  const [isMultiMonitor, setIsMultiMonitor] = useState<boolean>(false);
  const [symbol, setSymbol] = useState<string>("AAPL"); // Initialize with a default symbol

  const handleSearch = (query: string) => {
    console.log("Search query:", query);
    const { symbol: parsedSymbol } = analyzeSearchTerm(query);
    setSymbol(parsedSymbol); // Update the symbol state
  };

  const handleLayoutChange = (layout: "grid" | "tabs") => {
    setCurrentLayout(layout);
    console.log("Layout changed to:", layout);
  };

  const handleMultiMonitorToggle = () => {
    setIsMultiMonitor((prev) => !prev);
    console.log("Multi-monitor mode:", !isMultiMonitor);
  };

  const handleSaveLayout = () => {
    const layoutData = {
      currentLayout,
      isMultiMonitor,
      symbol,
    };
    localStorage.setItem("layoutData", JSON.stringify(layoutData));
    console.log("Layout saved:", layoutData);
  };

  const handleLoadLayout = () => {
    const savedLayout = localStorage.getItem("layoutData");
    if (savedLayout) {
      const { currentLayout, isMultiMonitor, symbol } = JSON.parse(savedLayout);
      setCurrentLayout(currentLayout);
      setIsMultiMonitor(isMultiMonitor);
      setSymbol(symbol);
      console.log("Layout loaded:", { currentLayout, isMultiMonitor, symbol });
    } else {
      console.log("No saved layout found.");
    }
  };

  useEffect(() => {
    handleLoadLayout(); // Load saved layout on mount
  }, []);

  return (
    <html 
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body suppressHydrationWarning>
        <ToastProvider>
          <div className="flex flex-col min-h-screen">
            <header className="flex-shrink-0">
              <Headers
                onSearch={handleSearch}
                onLayoutChange={handleLayoutChange}
                onMultiMonitorToggle={handleMultiMonitorToggle}
                currentLayout={currentLayout}
                isMultiMonitor={isMultiMonitor}
                onSaveLayout={handleSaveLayout}
                onLoadLayout={handleLoadLayout}
                onGridViewToggle={() => setCurrentLayout("grid")}
                onTabViewToggle={() => setCurrentLayout("tabs")}
              />
            </header>
            <main className="flex-grow p-4 overflow-auto">
              {children}
              {/* Render Advanced Trading Terminal with the updated symbol */}
              <AdvancedTradingTerminal currentLayout={currentLayout} symbol={symbol} />
            </main>
            <Footer />
          </div>
        </ToastProvider>
      </body>
    </html>
  );
}
