import React from 'react';

interface VolumeChartProps {
  data: { date: string; volume: number; }[];
}

export const VolumeChart: React.FC<VolumeChartProps> = ({ data }) => {
  return (
    <div className="w-full h-full flex items-end">
      {data.map((point, i) => (
        <div
          key={point.date}
          className="flex-1 bg-blue-500/50 mx-0.5"
          style={{ height: `${(point.volume / Math.max(...data.map(d => d.volume))) * 100}%` }}
        />
      ))}
    </div>
  );
}; 