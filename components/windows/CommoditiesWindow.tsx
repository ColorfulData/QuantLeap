// components/windows/CommoditiesWindow.tsx

import React from 'react'

const CommoditiesWindow: React.FC = () => {
  const commodities = [
    { name: 'Gold', price: '$1,800', change: '+0.5%' },
    { name: 'Silver', price: '$25.00', change: '-0.3%' },
    { name: 'Crude Oil', price: '$70.00', change: '+1.2%' },
    { name: 'Natural Gas', price: '$3.00', change: '-0.8%' },
  ]

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-lg">Commodities Prices</h3>
      <table className="w-full">
        <thead>
          <tr className="text-left">
            <th>Name</th>
            <th>Price</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          {commodities.map((commodity, index) => (
            <tr key={index}>
              <td>{commodity.name}</td>
              <td>{commodity.price}</td>
              <td className={commodity.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                {commodity.change}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CommoditiesWindow
