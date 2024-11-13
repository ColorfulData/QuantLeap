// src/components/TradingInterface.tsx

"use client";

import React, { useState } from "react";
import { TrendingUp, TrendingDown, AlertCircle, Clock, ArrowRight } from "lucide-react";

// Example Price Ticker Component
const PriceTicker = () => {
  return (
    <div className="trading-panel p-4 space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-text-secondary">BTC/USD</span>
        <div className="flex items-center space-x-2 text-trading-buy-DEFAULT">
          <TrendingUp size={16} />
          <span className="font-mono text-lg">42,386.50</span>
          <span className="text-sm">+2.4%</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div>
          <div className="text-text-muted">24h High</div>
          <div className="font-mono">43,150.00</div>
        </div>
        <div>
          <div className="text-text-muted">24h Low</div>
          <div className="font-mono">41,200.00</div>
        </div>
        <div>
          <div className="text-text-muted">Volume</div>
          <div className="font-mono">1.2B</div>
        </div>
      </div>
    </div>
  );
};

// Order Book Entry Component
const OrderBookEntry: React.FC<{
  price: number;
  size: number;
  total: number;
  type: "buy" | "sell";
}> = ({ price, size, total, type }) => {
  const bgClass =
    type === "buy"
      ? `bg-trading-buy-muted hover:bg-trading-buy-DEFAULT/20`
      : `bg-trading-sell-muted hover:bg-trading-sell-DEFAULT/20`;

  return (
    <div className={`grid grid-cols-3 px-3 py-1.5 cursor-pointer ${bgClass}`}>
      <span className={`font-mono ${type === "buy" ? "text-trading-buy-DEFAULT" : "text-trading-sell-DEFAULT"}`}>
        {price.toFixed(2)}
      </span>
      <span className="font-mono text-right">{size.toFixed(4)}</span>
      <span className="font-mono text-text-secondary text-right">{total.toFixed(4)}</span>
    </div>
  );
};

// Market Depth Visualization
const MarketDepth = ({ data }: { data: { bids: { depth: number }[]; asks: { depth: number }[] } }) => {
  return (
    <div className="h-40 relative">
      {data.bids.map((bid, i) => (
        <div
          key={`bid-${i}`}
          style={{ 
            width: `${bid.depth}%`,
            bottom: `${i * 24}px`
          }}
          className="h-6 bg-trading-buy-muted border-r border-trading-buy-DEFAULT absolute"
        />
      ))}
      {data.asks.map((ask, i) => (
        <div
          key={`ask-${i}`}
          style={{ 
            width: `${ask.depth}%`,
            top: `${i * 24}px`
          }}
          className="h-6 bg-trading-sell-muted border-r border-trading-sell-DEFAULT absolute"
        />
      ))}
    </div>
  );
};

// Trade History Component
const TradeHistory = () => {
  const trades = [
    { price: 42386.5, size: 0.1235, time: "12:45:32", type: "buy" },
    { price: 42384.25, size: 0.0842, time: "12:45:30", type: "sell" },
    { price: 42386.5, size: 0.1567, time: "12:45:28", type: "buy" },
  ];

  return (
    <div className="trading-panel">
      <div className="panel-header">
        <h3 className="text-sm font-medium">Recent Trades</h3>
      </div>
      <div className="p-2 space-y-1">
        {trades.map((trade, i) => (
          <div key={i} className="grid grid-cols-4 text-sm py-1">
            <span className={`font-mono ${trade.type === "buy" ? "text-trading-buy-DEFAULT" : "text-trading-sell-DEFAULT"}`}>
              {trade.price.toFixed(2)}
            </span>
            <span className="font-mono text-right">{trade.size.toFixed(4)}</span>
            <span className="text-text-muted text-right">{trade.time}</span>
            <span className={`text-right ${trade.type === "buy" ? "text-trading-buy-DEFAULT" : "text-trading-sell-DEFAULT"}`}>
              {trade.type.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Alert Component
const AlertBadge: React.FC<{ type: "success" | "warning" | "error" | "info"; children: React.ReactNode }> = ({
  type,
  children,
}) => {
  const colors = {
    success: "bg-status-success/10 text-status-success",
    warning: "bg-status-warning/10 text-status-warning",
    error: "bg-status-error/10 text-status-error",
    info: "bg-status-info/10 text-status-info",
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[type]}`}>
      {children}
    </span>
  );
};

// Main Demo Component
const TradingInterface = () => {
  const [activeTab, setActiveTab] = useState("market");

  return (
    <div className="space-y-4 p-4">
      <div className="grid grid-cols-2 gap-4">
        <PriceTicker />
        <div className="trading-panel">
          <div className="panel-header flex space-x-4">
            <button
              className={`px-4 py-1 rounded ${
                activeTab === "market" ? "bg-accent-primary text-text-primary" : "text-text-secondary"
              }`}
              onClick={() => setActiveTab("market")}
            >
              Market
            </button>
            <button
              className={`px-4 py-1 rounded ${
                activeTab === "limit" ? "bg-accent-primary text-text-primary" : "text-text-secondary"
              }`}
              onClick={() => setActiveTab("limit")}
            >
              Limit
            </button>
          </div>
          <div className="p-4 space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-text-secondary">Amount</label>
              <input
                type="text"
                className="w-full bg-background-elevated border border-border rounded p-2 text-text-primary"
                placeholder="0.00"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-trading-buy-DEFAULT hover:bg-trading-buy-hover text-white py-2 rounded font-medium">
                Buy BTC
              </button>
              <button className="bg-trading-sell-DEFAULT hover:bg-trading-sell-hover text-white py-2 rounded font-medium">
                Sell BTC
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <TradeHistory />
        <div className="trading-panel col-span-2">
          <div className="panel-header">
            <h3 className="text-sm font-medium">Order Book</h3>
          </div>
          <div className="grid grid-cols-2 gap-2 p-2">
            <div>
              <div className="text-sm text-text-muted mb-2">Bids</div>
              <OrderBookEntry price={42385.5} size={0.1235} total={5.2345} type="buy" />
              <OrderBookEntry price={42384.25} size={0.0842} total={4.1103} type="buy" />
              <OrderBookEntry price={42383.0} size={0.1567} total={3.0261} type="buy" />
            </div>
            <div>
              <div className="text-sm text-text-muted mb-2">Asks</div>
              <OrderBookEntry price={42386.75} size={0.0923} total={3.9234} type="sell" />
              <OrderBookEntry price={42387.5} size={0.1456} total={4.8157} type="sell" />
              <OrderBookEntry price={42388.25} size={0.0789} total={5.6946} type="sell" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-4 flex space-x-2">
          <AlertBadge type="success">Connected</AlertBadge>
          <AlertBadge type="warning">High Volume</AlertBadge>
          <AlertBadge type="error">API Error</AlertBadge>
          <AlertBadge type="info">Market Open</AlertBadge>
        </div>
      </div>
    </div>
  );
};

export default TradingInterface;
