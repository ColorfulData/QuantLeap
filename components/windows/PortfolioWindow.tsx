// src/components/windows/PortfolioWindow.tsx

"use client";

import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import Button from "@/components/ui/Button";

interface Position {
  id: number;
  asset: string;
  size: number;
  entryPrice: number;
  currentPrice: number;
  plPercentage: number;
  plAmount: number;
  isActive: boolean;
}

interface PortfolioWindowProps {
  positions: Position[];
}

const PortfolioWindow: React.FC<PortfolioWindowProps> = ({ positions }) => {
  const mockPositions: Position[] = [
    {
      id: 1,
      asset: "AAPL",
      size: 100,
      entryPrice: 150.25,
      currentPrice: 165.75,
      plPercentage: 10.32,
      plAmount: 1525.00,
      isActive: true,
    },
    {
      id: 2,
      asset: "TSLA",
      size: 50,
      entryPrice: 220.50,
      currentPrice: 245.75,
      plPercentage: 11.45,
      plAmount: 1262.50,
      isActive: false,
    },
    {
      id: 3,
      asset: "MSFT",
      size: 75,
      entryPrice: 310.25,
      currentPrice: 330.50,
      plPercentage: 6.53,
      plAmount: 1518.75,
      isActive: true,
    },
    {
      id: 4,
      asset: "NVDA",
      size: 30,
      entryPrice: 450.75,
      currentPrice: 485.25,
      plPercentage: 7.65,
      plAmount: 1035.00,
      isActive: false,
    },
  ];

  const totalPL = mockPositions.reduce((sum, pos) => sum + pos.plAmount, 0);
  const totalValue = mockPositions.reduce((sum, pos) => sum + (pos.currentPrice * pos.size), 0);

  return (
    <div className="trading-panel rounded-lg overflow-hidden">
      {/* Header */}
      <div className="panel-header flex items-center justify-between p-4 bg-background-header">
        <h2 className="text-text-primary font-semibold">Portfolio</h2>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm" className="bg-background-header hover:bg-background-header">
            Refresh
          </Button>
          <Button variant="secondary" size="sm" className="bg-background-header hover:bg-background-header">
            Settings
          </Button>
        </div>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-3 gap-4 p-4 bg-background-elevated">
        <div className="text-center">
          <div className="text-text-muted text-sm">Portfolio Value</div>
          <div className="text-lg font-bold text-text-primary">
            ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
        </div>
        <div className="text-center">
          <div className="text-text-muted text-sm">Day&apos;s P/L</div>
          <div className={`text-lg font-bold ${totalPL >= 0 ? 'text-trading-buy' : 'text-trading-sell'}`}>
            {totalPL >= 0 ? '+' : ''}{totalPL.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
        </div>
        <div className="text-center">
          <div className="text-text-muted text-sm">Success Rate</div>
          <div className="text-lg font-bold text-accent-primary">78%</div>
        </div>
      </div>

      {/* Positions List */}
      <div className="p-4 space-y-4">
        {mockPositions.map((position) => (
          <div
            key={position.id}
            className={`p-4 rounded-md flex justify-between items-center ${
              position.isActive ? "bg-background-elevated" : "bg-transparent"
            } hover:bg-background-elevated transition cursor-pointer`}
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-background-header rounded-full flex items-center justify-center">
                <span className="font-semibold text-text-primary">{position.asset}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-text-muted">Size: {position.size}</span>
                <span className="text-sm text-text-muted">Entry: ${position.entryPrice}</span>
                <span className="text-sm text-text-primary">Current: ${position.currentPrice}</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center space-x-1">
                {position.plPercentage >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-trading-buy" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-trading-sell" />
                )}
                <span className={`text-sm font-semibold ${
                  position.plPercentage >= 0 ? "text-trading-buy" : "text-trading-sell"
                }`}>
                  {position.plPercentage >= 0 ? "+" : ""}${position.plAmount.toFixed(2)}
                  <span className="text-xs ml-1">({position.plPercentage.toFixed(2)}%)</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioWindow;
