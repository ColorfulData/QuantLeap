// src/components/windows/TradeAnalysis.tsx

"use client";

import React, { useEffect, useState } from "react";
import { PriceChange } from '../PriceChange';
import { SignalIndicator } from '../SignalIndicator';
import { VolumeChart } from '../VolumeChart';

interface TradeAnalysisProps {
  symbol: string;
}

interface StockData {
  symbol: string;
  regularMarketPrice: number;
  regularMarketChangePercent: number;
  fiftyDayAverage: number;
  twoHundredDayAverage: number;
  regularMarketVolume: number;
}

// Define the type for volume data
interface VolumeDataPoint {
  date: string;
  volume: number;
}

const getStrengthClass = (index: number, changePercent: number) => {
  const isActive = (changePercent < -2 && index === 0) || 
                  (changePercent >= -2 && changePercent <= 2 && index === 1) || 
                  (changePercent > 2 && index === 2);
  return isActive 
    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/20' 
    : 'bg-gray-700/50 text-gray-500';
};

const TradeAnalysis: React.FC<TradeAnalysisProps> = ({ symbol }) => {
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [volumeData, setVolumeData] = useState<VolumeDataPoint[]>([]);

  useEffect(() => {
    const fetchStockData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/stock?symbol=${encodeURIComponent(symbol)}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setStockData(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch data');
      } finally {
        setIsLoading(false);
      }
    };

    const fetchVolumeData = async () => {
      try {
        const response = await fetch(`/api/historical-prices/${encodeURIComponent(symbol)}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data: any[] = await response.json();
        const recentVolumeData = data.slice(-30).map(entry => ({
          date: entry.date,
          volume: entry.volume,
        }));
        setVolumeData(recentVolumeData);
      } catch (err) {
        console.error('Error fetching volume data:', err);
      }
    };

    fetchStockData();
    fetchVolumeData();
  }, [symbol]);

  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;
  if (isLoading) return <div className="text-text-primary p-4">Loading data for {symbol}...</div>;
  if (!stockData) return <div className="text-text-primary p-4">No data available</div>;

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-blue-400 font-semibold">Trade Analysis - {stockData.symbol}</h3>
        <div className={`${
          stockData.regularMarketChangePercent >= 0 ? 'text-green-500' : 'text-red-500'
        } text-sm font-semibold`}>
          {stockData.regularMarketChangePercent >= 0 ? '▲' : '▼'} 
          {Math.abs(stockData.regularMarketChangePercent).toFixed(2)}%
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Price Overview Card */}
        <div className="p-4 rounded-lg bg-[#1a1d24]">
          <h4 className="text-gray-200 font-medium mb-3">Price Overview</h4>
          <div className="space-y-2">
            <div>
              <span className="text-gray-400 text-sm">Current Price</span>
              <div className="text-gray-200 font-semibold">
                ${stockData.regularMarketPrice.toFixed(2)}
              </div>
            </div>
            <div>
              <span className="text-gray-400 text-sm">Volume</span>
              <div className="text-gray-200 font-semibold">
                {(stockData.regularMarketVolume / 1_000_000).toFixed(2)}M
              </div>
            </div>
          </div>
        </div>

        {/* Moving Averages Card */}
        <div className="p-4 rounded-lg bg-[#1a1d24]">
          <h4 className="text-gray-200 font-medium mb-3">Moving Averages</h4>
          <div className="space-y-2">
            {[
              { label: '50 Day MA', value: stockData.fiftyDayAverage },
              { label: '200 Day MA', value: stockData.twoHundredDayAverage }
            ].map((ma) => (
              <div key={ma.label}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400 text-sm">{ma.label}</span>
                  <PriceChange current={stockData.regularMarketPrice} previous={ma.value} />
                </div>
                <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 transition-all duration-500"
                    style={{ width: `${Math.min((stockData.regularMarketPrice / ma.value) * 100, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Market Strength Card */}
        <div className="p-4 rounded-lg bg-[#1a1d24]">
          <h4 className="text-gray-200 font-medium mb-3">Market Strength</h4>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-gray-400 text-sm">Signal</span>
                <SignalIndicator value={stockData.regularMarketChangePercent} />
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {['Weak', 'Neutral', 'Strong'].map((label, index) => (
                  <div 
                    key={label}
                    className={`py-1.5 rounded text-center text-xs font-medium transition-colors
                      ${getStrengthClass(index, stockData.regularMarketChangePercent)}`}
                  >
                    {label}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <span className="text-gray-400 text-sm block mb-2">Volume Trend</span>
              <div className="h-16">
                <VolumeChart data={volumeData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeAnalysis;
