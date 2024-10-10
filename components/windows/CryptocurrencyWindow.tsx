// components/windows/CryptocurrencyWindow.tsx

import React from 'react'

const CryptocurrencyWindow: React.FC = () => {
  const cryptocurrencies = [
    { name: 'Bitcoin (BTC)', price: '$30,000', change: '+2.5%' },
    { name: 'Ethereum (ETH)', price: '$2,000', change: '-1.2%' },
    { name: 'Ripple (XRP)', price: '$0.50', change: '+0.8%' },
    { name: 'Litecoin (LTC)', price: '$100', change: '-0.5%' },
  ]

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-lg">Top Cryptocurrencies</h3>
      <table className="w-full">
        <thead>
          <tr className="text-left">
            <th>Name</th>
            <th>Price</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          {cryptocurrencies.map((crypto, index) => (
            <tr key={index}>
              <td>{crypto.name}</td>
              <td>{crypto.price}</td>
              <td className={crypto.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                {crypto.change}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CryptocurrencyWindow
