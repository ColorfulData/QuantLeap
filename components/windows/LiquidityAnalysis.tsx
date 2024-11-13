import axios from "axios";
import React, { useEffect, useState } from "react";

// You'll need to get a free API key from https://www.alphavantage.co/
const ALPHA_VANTAGE_API_KEY = 'YOUR_API_KEY';

interface LiquidityAnalysisProps {
  symbol: string;
}

interface LiquidityData {
  positionSize: number;
  requiredMargin: number;
  potentialLoss: number;
  remainingMargin: number;
}

const LiquidityAnalysis: React.FC<LiquidityAnalysisProps> = ({ symbol }) => {
  const [marketPrice, setMarketPrice] = useState(0);
  const [stopLossPercent, setStopLossPercent] = useState(0);
  const [leverage, setLeverage] = useState(1);
  const [availableMargin, setAvailableMargin] = useState(0);
  const [liquidityData, setLiquidityData] = useState<LiquidityData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState('');

  const fetchMarketPrice = async () => {
    if (!symbol) return;
    
    try {
      setIsLoading(true);
      const response = await axios.get(`/api/stock-data/${symbol}`);
      
      if (response.data && response.data.regularMarketPrice) {
        const currentPrice = response.data.regularMarketPrice;
        setMarketPrice(currentPrice);
        setLastUpdated(new Date().toLocaleTimeString());
        setError(null);
      } else {
        throw new Error('Invalid data received from API');
      }
    } catch (err) {
      setError('Error fetching market price. Please enter manually.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketPrice();
    const interval = setInterval(fetchMarketPrice, 60000);
    return () => clearInterval(interval);
  }, [symbol]);

  const calculateLiquidity = () => {
    if (!marketPrice || !stopLossPercent || !leverage || !availableMargin) return;

    try {
      const positionSize = availableMargin * leverage;
      const requiredMargin = positionSize / leverage;
      const potentialLoss = positionSize * (stopLossPercent / 100);
      const remainingMargin = availableMargin - potentialLoss;

      setLiquidityData({
        positionSize,
        requiredMargin,
        potentialLoss,
        remainingMargin,
      });
      setError(null);
    } catch (err) {
      setError('Error in calculations. Please check your inputs.');
      setLiquidityData(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (value: number) => void) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) setter(value);
  };

  useEffect(() => {
    if (marketPrice > 0 && stopLossPercent >= 0 && leverage > 0 && availableMargin > 0) {
      calculateLiquidity();
    }
  }, [marketPrice, stopLossPercent, leverage, availableMargin]);

  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;
  if (isLoading) return <div className="text-text-primary p-4">Loading data for {symbol}...</div>;

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-text-primary font-semibold">Liquidity Analysis - {symbol}</h3>
        {lastUpdated && (
          <div className="text-text-muted text-sm">
            Last updated: {lastUpdated}
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Input Parameters Card */}
        <div className="p-4 rounded-lg bg-backgroundSecondary">
          <h4 className="text-text-primary font-medium mb-3">Input Parameters</h4>
          <div className="space-y-3">
            <div>
              <label className="text-text-muted text-sm block mb-1">Market Price ($)</label>
              <div className="relative">
                <input
                  type="number"
                  value={marketPrice || ''}
                  onChange={(e) => handleInputChange(e, setMarketPrice)}
                  className="w-full p-2 rounded bg-gray-800 text-text-primary border border-gray-700 focus:border-blue-500 text-sm"
                  placeholder="Enter price"
                  min="0"
                  step="0.01"
                />
                <button
                  onClick={fetchMarketPrice}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-400 text-sm"
                  disabled={isLoading}
                >
                  ↻
                </button>
              </div>
            </div>
            <div>
              <label className="text-text-muted text-sm block mb-1">Stop Loss (%)</label>
              <input
                type="number"
                value={stopLossPercent || ''}
                onChange={(e) => handleInputChange(e, setStopLossPercent)}
                className="w-full p-2 rounded bg-gray-800 text-text-primary border border-gray-700 focus:border-blue-500 text-sm"
                placeholder="Enter %"
                min="0"
                max="100"
                step="0.1"
              />
            </div>
          </div>
        </div>

        {/* Leverage Settings Card */}
        <div className="p-4 rounded-lg bg-backgroundSecondary">
          <h4 className="text-text-primary font-medium mb-3">Position Settings</h4>
          <div className="space-y-3">
            <div>
              <label className="text-text-muted text-sm block mb-1">Leverage</label>
              <input
                type="number"
                value={leverage || ''}
                onChange={(e) => handleInputChange(e, setLeverage)}
                className="w-full p-2 rounded bg-gray-800 text-text-primary border border-gray-700 focus:border-blue-500 text-sm"
                placeholder="Enter leverage"
                min="1"
                step="0.1"
              />
            </div>
            <div>
              <label className="text-text-muted text-sm block mb-1">Available Margin ($)</label>
              <input
                type="number"
                value={availableMargin || ''}
                onChange={(e) => handleInputChange(e, setAvailableMargin)}
                className="w-full p-2 rounded bg-gray-800 text-text-primary border border-gray-700 focus:border-blue-500 text-sm"
                placeholder="Enter margin"
                min="0"
                step="0.01"
              />
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="p-4 rounded-lg bg-backgroundSecondary">
          <h4 className="text-text-primary font-medium mb-3">Position Metrics</h4>
          {liquidityData ? (
            <div className="space-y-2">
              <div>
                <span className="text-text-muted text-sm">Position Size</span>
                <div className="text-text-primary font-semibold">
                  ${liquidityData.positionSize.toLocaleString(undefined, {minimumFractionDigits: 2})}
                </div>
              </div>
              <div>
                <span className="text-text-muted text-sm">Required Margin</span>
                <div className="text-text-primary font-semibold">
                  ${liquidityData.requiredMargin.toLocaleString(undefined, {minimumFractionDigits: 2})}
                </div>
              </div>
              <div>
                <span className="text-text-muted text-sm">Potential Loss</span>
                <div className="text-red-400 font-semibold">
                  -${liquidityData.potentialLoss.toLocaleString(undefined, {minimumFractionDigits: 2})}
                </div>
              </div>
              <div>
                <span className="text-text-muted text-sm">Remaining Margin</span>
                <div className={`font-semibold ${liquidityData.remainingMargin < 0 ? 'text-red-400' : 'text-green-400'}`}>
                  ${liquidityData.remainingMargin.toLocaleString(undefined, {minimumFractionDigits: 2})}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-text-muted text-sm italic">
              Enter all parameters to see metrics
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiquidityAnalysis;