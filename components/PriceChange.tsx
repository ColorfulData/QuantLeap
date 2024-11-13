// src/components/PriceChange.tsx

import React from 'react';

interface PriceChangeProps {
  current: number;
  previous: number;
}

export const PriceChange: React.FC<PriceChangeProps> = ({ current, previous }) => {
  const change = current - previous;
  const changePercent = (change / previous) * 100;
  const isPositive = change >= 0;

  return (
    <span className={`text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
      {isPositive ? '▲' : '▼'} {Math.abs(changePercent).toFixed(2)}%
    </span>
  );
};
