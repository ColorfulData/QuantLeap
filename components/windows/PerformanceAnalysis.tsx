import React, { useEffect, useState } from "react";
import axios from 'axios';

interface PerformanceAnalysisProps {
  symbol: string;
}

interface PerformanceMetrics {
  dailyChange: number;
  weeklyChange: number;
  monthlyChange: number;
  yearlyChange: number;
  sma50: number;
  sma200: number;
  volatility: number;
}

interface HistoricalPrice {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

const PerformanceAnalysis: React.FC<PerformanceAnalysisProps> = ({ symbol }) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState('');

  const calculatePerformanceMetrics = (historicalData: HistoricalPrice[]): PerformanceMetrics => {
    if (historicalData.length < 200) {
      console.warn('Not enough data to calculate SMA200.');
    }

    const latestIndex = historicalData.length - 1;
    const latestPrice = historicalData[latestIndex].close;
    const previousPrice = historicalData[latestIndex - 1]?.close || latestPrice;
    
    const dailyChange = ((latestPrice - previousPrice) / previousPrice) * 100;

    const getPriceChange = (days: number): number => {
      const index = historicalData.length - 1 - days;
      if (index < 0) return 0;
      const pastPrice = historicalData[index].close;
      return ((latestPrice - pastPrice) / pastPrice) * 100;
    };

    const weeklyChange = getPriceChange(7);
    const monthlyChange = getPriceChange(30);
    const yearlyChange = getPriceChange(365);

    const sma50 = historicalData.slice(-50).reduce((acc, curr) => acc + curr.close, 0) / 50;
    const sma200 = historicalData.slice(-200).reduce((acc, curr) => acc + curr.close, 0) / 200;

    const dailyReturns = historicalData.slice(-30).map((day, index, arr) => {
      if (index === 0) return 0;
      return (day.close - arr[index - 1].close) / arr[index - 1].close;
    }).filter(ret => ret !== 0);
    
    const meanReturn = dailyReturns.reduce((acc, curr) => acc + curr, 0) / dailyReturns.length;
    const variance = dailyReturns.reduce((acc, curr) => acc + Math.pow(curr - meanReturn, 2), 0) / dailyReturns.length;
    const volatility = Math.sqrt(variance) * 100;

    return {
      dailyChange,
      weeklyChange,
      monthlyChange,
      yearlyChange,
      sma50,
      sma200,
      volatility
    };
  };

  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await axios.get(`/api/historical-prices/${encodeURIComponent(symbol)}`);
        const historicalData: HistoricalPrice[] = response.data;

        if (!Array.isArray(historicalData) || historicalData.length === 0) {
          throw new Error('No historical data available.');
        }

        const calculatedMetrics = calculatePerformanceMetrics(historicalData);
        setMetrics(calculatedMetrics);
        setLastUpdated(new Date().toLocaleTimeString());
      } catch (err: any) {
        console.error('Error fetching performance data:', err.message);
        setError(err.message || 'Failed to fetch performance data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPerformanceData();
  }, [symbol]);

  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;
  if (isLoading) return <div className="text-text-primary p-4">Loading data for {symbol}...</div>;
  if (!metrics) return <div className="text-text-primary p-4">No data available</div>;

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-blue-400 font-semibold">Performance Analysis - {symbol}</h3>
        {lastUpdated && (
          <div className="text-gray-400 text-sm">
            Last updated: {lastUpdated}
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Short-term Performance Card */}
        <div className="p-4 rounded-lg bg-gray-900">
          <h4 className="text-gray-200 font-medium mb-3">Short-term Performance</h4>
          <div className="space-y-2">
            <div>
              <span className="text-gray-400 text-sm">Daily Change</span>
              <div className={`${metrics.dailyChange >= 0 ? 'text-green-500' : 'text-red-500'} font-semibold`}>
                {metrics.dailyChange >= 0 ? '▲' : '▼'} {Math.abs(metrics.dailyChange).toFixed(2)}%
              </div>
            </div>
            <div>
              <span className="text-gray-400 text-sm">Weekly Change</span>
              <div className={`${metrics.weeklyChange >= 0 ? 'text-green-500' : 'text-red-500'} font-semibold`}>
                {metrics.weeklyChange >= 0 ? '▲' : '▼'} {Math.abs(metrics.weeklyChange).toFixed(2)}%
              </div>
            </div>
            <div className="mt-4">
              <span className="text-gray-400 text-sm block mb-2">Volatility</span>
              <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 transition-all duration-500"
                  style={{ width: `${Math.min(metrics.volatility * 2, 100)}%` }}
                />
              </div>
              <div className="text-gray-200 text-sm mt-1">
                {metrics.volatility.toFixed(2)}%
              </div>
            </div>
          </div>
        </div>

        {/* Long-term Performance Card */}
        <div className="p-4 rounded-lg bg-gray-900">
          <h4 className="text-gray-200 font-medium mb-3">Long-term Performance</h4>
          <div className="space-y-2">
            <div>
              <span className="text-gray-400 text-sm">Monthly Change</span>
              <div className={`${metrics.monthlyChange >= 0 ? 'text-green-500' : 'text-red-500'} font-semibold`}>
                {metrics.monthlyChange >= 0 ? '▲' : '▼'} {Math.abs(metrics.monthlyChange).toFixed(2)}%
              </div>
            </div>
            <div>
              <span className="text-gray-400 text-sm">Yearly Change</span>
              <div className={`${metrics.yearlyChange >= 0 ? 'text-green-500' : 'text-red-500'} font-semibold`}>
                {metrics.yearlyChange >= 0 ? '▲' : '▼'} {Math.abs(metrics.yearlyChange).toFixed(2)}%
              </div>
            </div>
          </div>
        </div>

        {/* Moving Averages Card */}
        <div className="p-4 rounded-lg bg-gray-900">
          <h4 className="text-gray-200 font-medium mb-3">Moving Averages</h4>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400 text-sm">50-Day MA</span>
                <span className="text-gray-200 font-semibold">${metrics.sma50.toFixed(2)}</span>
              </div>
              <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 transition-all duration-500"
                  style={{ width: '50%' }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400 text-sm">200-Day MA</span>
                <span className="text-gray-200 font-semibold">${metrics.sma200.toFixed(2)}</span>
              </div>
              <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 transition-all duration-500"
                  style={{ width: '50%' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceAnalysis;