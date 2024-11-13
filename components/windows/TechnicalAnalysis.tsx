import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { Loader2 } from 'lucide-react';


// Define your color palette
const COLORS = {
  rsiLine: '#3B82F6',
  rsiRefLine: '#6B7280',
  macdLine: '#F59E0B',
  signalLine: '#10B981',
  histogramPositive: '#10B981',
  histogramNegative: '#EF4444',
  background: '#1F2937',
  grid: '#374151',
  axis: '#9CA3AF',
  tooltipBackground: '#4B5563',
  tooltipText: '#D1D5DB',
};

interface TechnicalAnalysisProps {
  symbol: string;
}

const TechnicalAnalysis = ({ symbol }: TechnicalAnalysisProps) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generateMockData = () => {
      const mockData = [];
      const dates = Array.from({ length: 50 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return date.toISOString().split('T')[0];
      }).reverse();

      for (let i = 0; i < 50; i++) {
        mockData.push({
          date: dates[i],
          rsi: 30 + Math.random() * 40,
          macd: -2 + Math.random() * 4,
          signal: -1.5 + Math.random() * 3,
          histogram: -1 + Math.random() * 2,
        });
      }
      return mockData;
    };

    setTimeout(() => {
      setData(generateMockData());
      setLoading(false);
    }, 1000);
  }, [symbol]);

  const getSignalStrength = () => {
    if (!data || data.length === 0) return null;

    const latestData = data[data.length - 1];
    const rsi = latestData.rsi;
    const macd = latestData.histogram;

    if (rsi > 70 && macd < 0) return { signal: 'Strong Sell', color: 'text-red-500' };
    if (rsi < 30 && macd > 0) return { signal: 'Strong Buy', color: 'text-green-500' };
    if (rsi > 60) return { signal: 'Overbought', color: 'text-yellow-500' };
    if (rsi < 40) return { signal: 'Oversold', color: 'text-yellow-500' };
    return { signal: 'Neutral', color: 'text-blue-500' };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <Loader2 className="w-6 h-6 animate-spin text-accent-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  const signal = getSignalStrength();

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-blue-400 font-semibold">Technical Analysis - {symbol}</h3>
        {signal && (
          <span className={`text-sm font-medium ${signal.color}`}>
            Signal: {signal.signal}
          </span>
        )}
      </div>

      <div className="space-y-4">
        {/* RSI Chart */}
        <div className="h-28 bg-[#111827] rounded-lg p-4">
          <h4 className="text-[#5D809F] font-medium mb-3">Relative Strength Index (RSI)</h4>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid stroke={COLORS.grid} strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tick={{ fill: COLORS.axis, fontSize: 10 }}
                axisLine={{ stroke: COLORS.axis }}
                tickLine={{ stroke: COLORS.grid }}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fill: COLORS.axis, fontSize: 10 }}
                axisLine={{ stroke: COLORS.axis }}
                tickLine={{ stroke: COLORS.grid }}
              />
              <Tooltip
                contentStyle={{ backgroundColor: COLORS.tooltipBackground }}
                labelStyle={{ color: COLORS.tooltipText }}
                itemStyle={{ color: COLORS.tooltipText }}
              />
              <Line
                type="monotone"
                dataKey="rsi"
                stroke={COLORS.rsiLine}
                dot={false}
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey={() => 30}
                stroke={COLORS.rsiRefLine}
                strokeDasharray="5 5"
                dot={false}
                activeDot={false}
              />
              <Line
                type="monotone"
                dataKey={() => 70}
                stroke={COLORS.rsiRefLine}
                strokeDasharray="5 5"
                dot={false}
                activeDot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* MACD Chart */}
        <div className="h-28 bg-[#111827] rounded-lg p-4">
          <h4 className="text-[#5D809F] font-medium mb-3">MACD</h4>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid stroke={COLORS.grid} strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tick={{ fill: COLORS.axis, fontSize: 10 }}
                axisLine={{ stroke: COLORS.axis }}
                tickLine={{ stroke: COLORS.grid }}
              />
              <YAxis
                tick={{ fill: COLORS.axis, fontSize: 10 }}
                axisLine={{ stroke: COLORS.axis }}
                tickLine={{ stroke: COLORS.grid }}
              />
              <Tooltip
                contentStyle={{ backgroundColor: COLORS.tooltipBackground }}
                labelStyle={{ color: COLORS.tooltipText }}
                itemStyle={{ color: COLORS.tooltipText }}
              />
              <Legend wrapperStyle={{ color: COLORS.tooltipText, fontSize: '10px' }} />
              <Line
                type="monotone"
                dataKey="macd"
                stroke={COLORS.macdLine}
                dot={false}
                strokeWidth={2}
                name="MACD"
              />
              <Line
                type="monotone"
                dataKey="signal"
                stroke={COLORS.signalLine}
                dot={false}
                strokeWidth={2}
                name="Signal"
              />
              <Line
                type="monotone"
                dataKey="histogram"
                stroke={COLORS.histogramPositive}
                dot={false}
                strokeWidth={2}
                name="Histogram"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Technical Analysis Summary */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-[#111827]">
            <h4 className="text-[#5D809F] font-medium mb-3">RSI Analysis</h4>
            <p className="text-text-primary">
              Current RSI: {data[data.length - 1].rsi.toFixed(2)}
              {data[data.length - 1].rsi > 70 && (
                <span className="text-status-error ml-1">(Overbought)</span>
              )}
              {data[data.length - 1].rsi < 30 && (
                <span className="text-status-success ml-1">(Oversold)</span>
              )}
            </p>
          </div>
          <div className="p-4 rounded-lg bg-[#111827]">
            <h4 className="text-[#5D809F] font-medium mb-3">MACD Analysis</h4>
            <p className="text-text-primary">
              MACD: {data[data.length - 1].macd.toFixed(2)}
              <br />
              Signal: {data[data.length - 1].signal.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalAnalysis;
