// src/components/windows/TimeAndSalesWindow.tsx

import React from 'react';

interface Trade {
  time: string;
  price: number;
  quantity: number;
  side: "BUY" | "SELL";
}

interface TimeAndSalesWindowProps {
  trades: Trade[];
}

const TimeAndSalesWindow: React.FC<TimeAndSalesWindowProps> = ({ trades }) => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-lg">Time & Sales: AAPL</h3>
      <table className="w-full">
        <thead>
          <tr className="text-left">
            <th>Time</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Side</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade, index) => (
            <tr key={index}>
              <td>{trade.time}</td>
              <td>${trade.price.toFixed(2)}</td>
              <td>{trade.quantity}</td>
              <td className={trade.side === "BUY" ? "text-green-500" : "text-red-500"}>{trade.side}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimeAndSalesWindow;
