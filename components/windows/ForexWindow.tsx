// components/windows/ForexWindow.tsx

import React from 'react'

const ForexWindow: React.FC = () => {
  const forexPairs = [
    { pair: 'EUR/USD', rate: '1.1800', change: '+0.10%' },
    { pair: 'GBP/USD', rate: '1.3900', change: '-0.05%' },
    { pair: 'USD/JPY', rate: '110.00', change: '+0.20%' },
    { pair: 'AUD/USD', rate: '0.7500', change: '-0.10%' },
  ]

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-lg">Forex Rates</h3>
      <table className="w-full">
        <thead>
          <tr className="text-left">
            <th>Pair</th>
            <th>Rate</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          {forexPairs.map((pair, index) => (
            <tr key={index}>
              <td>{pair.pair}</td>
              <td>{pair.rate}</td>
              <td className={pair.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                {pair.change}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ForexWindow
