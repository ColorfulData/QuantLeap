export const CommoditiesWindow: React.FC = () => {
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

export const CryptocurrencyWindow: React.FC = () => {
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

export const ForexWindow: React.FC = () => {
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

export const OptionsChainWindow: React.FC = () => {
    return (
      <div className="space-y-4">
        <h3 className="font-bold text-lg">Options Chain: AAPL</h3>
        <div className="bg-gray-700 p-4 rounded">Options Chain Placeholder</div>
      </div>
    )
}
  
export const MarketDepthWindow: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-lg">Market Depth: AAPL</h3>
      <div className="bg-gray-700 p-4 rounded">Market Depth Visualization Placeholder</div>
    </div>
  )
}

export const ExcelIntegrationWindow: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-lg">Excel Integration</h3>
      <div className="bg-gray-700 p-4 rounded">Excel Integration Placeholder</div>
    </div>
  )
}

export const ScreenerWindow: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-lg">Stock Screener</h3>
      <div className="bg-gray-700 p-4 rounded">Stock Screener Placeholder</div>
    </div>
  )
}

export const RiskAnalyticsWindow: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-lg">Risk Analytics</h3>
      <div className="bg-gray-700 p-4 rounded">Risk Analytics Dashboard Placeholder</div>
    </div>
  )
}

export const StrategyBuilderWindow: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-lg">Strategy Builder</h3>
      <div className="bg-gray-700 p-4 rounded">Strategy Builder Interface Placeholder</div>
    </div>
  )
}

  
  