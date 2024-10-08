'use client'

import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { v4 as uuidv4 } from 'uuid'
import { ChevronDown, Maximize2, Minimize2, X, Search, User, Bell, MessageSquare, Settings, Globe, TrendingUp, PieChart, FileText, Save, Monitor, Grid, Layers } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type WindowType = 'chart' | 'orderBook' | 'timeAndSales' | 'newsFeed' | 'watchlist' | 'portfolio' | 'optionsChain' | 'marketDepth' | 'excelIntegration' | 'screener' | 'riskAnalytics' | 'strategyBuilder'

interface Window {
  id: string
  type: WindowType
  title: string
  content: React.ReactNode
}

const AdvancedTradingTerminal: React.FC = () => {
  const [workspace, setWorkspace] = useState({
    windows: [
      { id: uuidv4(), type: 'chart', title: 'Advanced Chart', content: <ChartWindow /> },
      { id: uuidv4(), type: 'orderBook', title: 'Order Book', content: <OrderBookWindow /> },
      { id: uuidv4(), type: 'timeAndSales', title: 'Time & Sales', content: <TimeAndSalesWindow /> },
      { id: uuidv4(), type: 'newsFeed', title: 'News Feed', content: <NewsFeedWindow /> },
      { id: uuidv4(), type: 'watchlist', title: 'Watchlist', content: <WatchlistWindow /> },
      { id: uuidv4(), type: 'portfolio', title: 'Portfolio', content: <PortfolioWindow /> },
    ] as Window[],
  })

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const newWindows = Array.from(workspace.windows)
    const [reorderedItem] = newWindows.splice(result.source.index, 1)
    newWindows.splice(result.destination.index, 0, reorderedItem)

    setWorkspace({ ...workspace, windows: newWindows })
  }

  const addWindow = (type: WindowType) => {
    const newWindow: Window = {
      id: uuidv4(),
      type,
      title: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Window`,
      content: getWindowContent(type),
    }
    setWorkspace({ ...workspace, windows: [...workspace.windows, newWindow] })
  }

  const getWindowContent = (type: WindowType): React.ReactNode => {
    switch (type) {
      case 'chart':
        return <ChartWindow />
      case 'orderBook':
        return <OrderBookWindow />
      case 'timeAndSales':
        return <TimeAndSalesWindow />
      case 'newsFeed':
        return <NewsFeedWindow />
      case 'watchlist':
        return <WatchlistWindow />
      case 'portfolio':
        return <PortfolioWindow />
      case 'optionsChain':
        return <OptionsChainWindow />
      case 'marketDepth':
        return <MarketDepthWindow />
      case 'excelIntegration':
        return <ExcelIntegrationWindow />
      case 'screener':
        return <ScreenerWindow />
      case 'riskAnalytics':
        return <RiskAnalyticsWindow />
      case 'strategyBuilder':
        return <StrategyBuilderWindow />
      default:
        return <div>Unknown window type</div>
    }
  }

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white font-mono">
      {/* Top Navigation Bar */}
      <header className="h-12 bg-gray-800 flex items-center px-4 justify-between border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-blue-500">AdvancedTrade</h1>
          <nav className="hidden md:flex space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Globe className="mr-2 h-4 w-4" />
                  Markets
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Global Overview</DropdownMenuItem>
                <DropdownMenuItem>Equities</DropdownMenuItem>
                <DropdownMenuItem>Forex</DropdownMenuItem>
                <DropdownMenuItem>Crypto</DropdownMenuItem>
                <DropdownMenuItem>Commodities</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Trading
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Order Management</DropdownMenuItem>
                <DropdownMenuItem>Positions</DropdownMenuItem>
                <DropdownMenuItem>Trade History</DropdownMenuItem>
                <DropdownMenuItem>Algorithms</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <PieChart className="mr-2 h-4 w-4" />
                  Analysis
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Technical Analysis</DropdownMenuItem>
                <DropdownMenuItem>Fundamental Analysis</DropdownMenuItem>
                <DropdownMenuItem>Screeners</DropdownMenuItem>
                <DropdownMenuItem>Risk Analytics</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <FileText className="mr-2 h-4 w-4" />
                  News & Research
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Latest News</DropdownMenuItem>
                <DropdownMenuItem>Economic Calendar</DropdownMenuItem>
                <DropdownMenuItem>Analyst Reports</DropdownMenuItem>
                <DropdownMenuItem>SEC Filings</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input type="search" placeholder="Search or type a command..." className="pl-8 w-64 bg-gray-700" />
          </div>
          <Button variant="ghost" size="icon"><Bell className="h-5 w-5" /></Button>
          <Button variant="ghost" size="icon"><MessageSquare className="h-5 w-5" /></Button>
          <Button variant="ghost" size="icon"><Settings className="h-5 w-5" /></Button>
          <Button variant="ghost" size="icon"><User className="h-5 w-5" /></Button>
        </div>
      </header>

      {/* Workspace Management */}
      <div className="bg-gray-800 border-b border-gray-700 p-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Save className="mr-2 h-4 w-4" />
            Save Layout
          </Button>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Load Layout" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="trading">Trading</SelectItem>
              <SelectItem value="analysis">Analysis</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Monitor className="mr-2 h-4 w-4" />
            Multi-Monitor
          </Button>
          <Button variant="outline" size="sm">
            <Grid className="mr-2 h-4 w-4" />
            Grid Layout
          </Button>
          <Button variant="outline" size="sm">
            <Layers className="mr-2 h-4 w-4" />
            Tabs
          </Button>
        </div>
      </div>

      {/* Main Workspace */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="workspace">
          {(provided) => (
            <main
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex-1 p-4 overflow-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-gray-900"
            >
              {workspace.windows.map((window, index) => (
                <Draggable key={window.id} draggableId={window.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TradingWindow window={window} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </main>
          )}
        </Droppable>
      </DragDropContext>

      {/* Bottom Status Bar */}
      <footer className="h-8 bg-gray-800 text-xs px-4 flex items-center justify-between border-t border-gray-700">
        <div>Connected: NYSE, NASDAQ</div>
        <div>Market Hours: Open</div>
        <div>Data Feed: Real-time</div>
        <div>Account: DEMO-123456</div>
        <div>CPU: 35% | RAM: 4.2GB</div>
        <div>{new Date().toLocaleTimeString()}</div>
      </footer>
    </div>
  )
}

const TradingWindow: React.FC<{ window: Window }> = ({ window }) => {
  return (
    <div className="bg-gray-800 rounded overflow-hidden border border-gray-700 flex flex-col h-[calc(50vh-40px)]">
      <div className="h-8 bg-gray-700 flex items-center justify-between px-3 text-xs border-b border-gray-600">
        <span className="text-blue-400 font-semibold">{window.title}</span>
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" className="h-5 w-5"><Minimize2 className="h-3 w-3" /></Button>
          <Button variant="ghost" size="icon" className="h-5 w-5"><Maximize2 className="h-3 w-3" /></Button>
          <Button variant="ghost" size="icon" className="h-5 w-5"><X className="h-3 w-3" /></Button>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-2 text-xs">{window.content}</div>
    </div>
  )
}

const ChartWindow: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg">AAPL - Apple Inc.</h3>
        <Select defaultValue="1D">
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1m">1 min</SelectItem>
            <SelectItem value="5m">5 min</SelectItem>
            <SelectItem value="15m">15 min</SelectItem>
            <SelectItem value="1H">1 hour</SelectItem>
            <SelectItem value="1D">1 day</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="bg-gray-700 h-64 flex items-center justify-center">
        Advanced Chart Placeholder
      </div>
      <div className="flex space-x-2">
        <Button variant="outline" size="sm">Indicators</Button>
        <Button variant="outline" size="sm">Drawing Tools</Button>
        <Button variant="outline" size="sm">Compare</Button>
      </div>
    </div>
  )
}

const OrderBookWindow: React.FC = () => {
  const orders = [
    { type: "BUY", price: 150.00, quantity: 100 },
    { type: "SELL", price: 150.50, quantity: 200 },
    { type: "BUY", price: 149.75, quantity: 150 },
    { type: "SELL", price: 151.00, quantity: 100 },
  ]

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-lg">Order Book: AAPL</h3>
      <table className="w-full">
        <thead>
          <tr className="text-left">
            <th>Type</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td className={order.type === "BUY" ? "text-green-500" : "text-red-500"}>{order.type}</td>
              <td>${order.price.toFixed(2)}</td>
              <td>{order.quantity}</td>
            
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const TimeAndSalesWindow: React.FC = () => {
  const trades = [
    { time: "14:30:05", price: 150.25, quantity: 100, side: "BUY" },
    { time: "14:30:03", price: 150.20, quantity: 50, side: "SELL" },
    { time: "14:30:01", price: 150.25, quantity: 75, side: "BUY" },
    { time: "14:29:59", price: 150.15, quantity: 200, side: "SELL" },
  ]

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
  )
}

const NewsFeedWindow: React.FC = () => {
  const news = [
    { id: 1, title: "Apple Announces New iPhone Model", time: "14:30", source: "TechCrunch" },
    { id: 2, title: "Fed Signals Potential Rate Hike", time: "13:45", source: "Bloomberg" },
    { id: 3, title: "Oil Prices Surge Amid Middle East Tensions", time: "12:20", source: "Reuters" },
    { id: 4, title: "Tesla Beats Q2 Earnings Expectations", time: "10:15", source: "CNBC" },
  ]

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-lg">Latest Financial News</h3>
      <ul className="space-y-2">
        {news.map((item) => (
          <li key={item.id} className="bg-gray-700 p-2 rounded">
            <span className="text-blue-400">{item.time}</span> - <span className="font-semibold">{item.title}</span>
            <br />
            <span className="text-gray-400 text-xs">Source: {item.source}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

const WatchlistWindow: React.FC = () => {
  const stocks = [
    { symbol: "AAPL", price: 150.25, change: 1.5 },
    { symbol: "GOOGL", price: 2750.50, change: -0.8 },
    { symbol: "MSFT", price: 305.75, change: 0.5 },
    { symbol: "AMZN", price: 3300.00, change: 2.1 },
  ]

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-lg">Watchlist</h3>
      <table className="w-full">
        <thead>
          <tr className="text-left">
            <th>Symbol</th>
            <th>Price</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr key={stock.symbol}>
              <td>{stock.symbol}</td>
              <td>${stock.price.toFixed(2)}</td>
              <td className={stock.change >= 0 ? "text-green-500" : "text-red-500"}>
                {stock.change > 0 ? "+" : ""}{stock.change.toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const PortfolioWindow: React.FC = () => {
  const holdings = [
    { symbol: "AAPL", quantity: 100, avgPrice: 145.00, currentPrice: 150.25 },
    { symbol: "GOOGL", quantity: 20, avgPrice: 2700.00, currentPrice: 2750.50 },
    { symbol: "MSFT", quantity: 50, avgPrice: 300.00, currentPrice: 305.75 },
  ]

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-lg">Portfolio</h3>
      <table className="w-full">
        <thead>
          <tr className="text-left">
            <th>Symbol</th>
            <th>Qty</th>
            <th>Avg Price</th>
            <th>Current</th>
            <th>P/L</th>
          </tr>
        </thead>
        <tbody>
          {holdings.map((holding) => {
            const profitLoss = (holding.currentPrice - holding.avgPrice) * holding.quantity
            return (
              <tr key={holding.symbol}>
                <td>{holding.symbol}</td>
                <td>{holding.quantity}</td>
                <td>${holding.avgPrice.toFixed(2)}</td>
                <td>${holding.currentPrice.toFixed(2)}</td>
                <td className={profitLoss >= 0 ? "text-green-500" : "text-red-500"}>
                  ${profitLoss.toFixed(2)}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

const OptionsChainWindow: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-lg">Options Chain: AAPL</h3>
      <div className="bg-gray-700 p-4 rounded">Options Chain Placeholder</div>
    </div>
  )
}

const MarketDepthWindow: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-lg">Market Depth: AAPL</h3>
      <div className="bg-gray-700 p-4 rounded">Market Depth Visualization Placeholder</div>
    </div>
  )
}

const ExcelIntegrationWindow: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-lg">Excel Integration</h3>
      <div className="bg-gray-700 p-4 rounded">Excel Integration Placeholder</div>
    </div>
  )
}

const ScreenerWindow: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-lg">Stock Screener</h3>
      <div className="bg-gray-700 p-4 rounded">Stock Screener Placeholder</div>
    </div>
  )
}

const RiskAnalyticsWindow: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-lg">Risk Analytics</h3>
      <div className="bg-gray-700 p-4 rounded">Risk Analytics Dashboard Placeholder</div>
    </div>
  )
}

const StrategyBuilderWindow: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-lg">Strategy Builder</h3>
      <div className="bg-gray-700 p-4 rounded">Strategy Builder Interface Placeholder</div>
    </div>
  )
}

export default AdvancedTradingTerminal