// components/TopNavBar.tsx

import React from 'react'
import {
  ChevronDown,
  Globe,
  TrendingUp,
  PieChart,
  FileText,
  Bell,
  MessageSquare,
  Settings,
  User,
  Search,
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const TopNavBar: React.FC = () => {
  return (
    <header className="h-12 bg-gray-800 flex items-center px-4 justify-between border-b border-gray-700">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold text-blue-500">QuantLeap</h1>
        <nav className="hidden md:flex space-x-2">
          {/* Markets Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <Globe className="mr-2 h-4 w-4" />
                Markets
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Markets</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem disabled>
                  <span className="font-semibold">Global Markets Overview</span>
                </DropdownMenuItem>
                <DropdownMenuItem>India: NSE, BSE Indices</DropdownMenuItem>
                <DropdownMenuItem>US Markets: Major Indices</DropdownMenuItem>
                <DropdownMenuItem>Crypto: Top Cryptocurrencies</DropdownMenuItem>
                <DropdownMenuItem>Forex: Major Currency Pairs</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuGroup>
                <DropdownMenuItem disabled>
                  <span className="font-semibold">Indian Equities</span>
                </DropdownMenuItem>
                <DropdownMenuItem>Cash Market</DropdownMenuItem>
                <DropdownMenuItem>F&O Segment</DropdownMenuItem>
                <DropdownMenuItem>Indices</DropdownMenuItem>
                <DropdownMenuItem>Pre/Post Market Activity</DropdownMenuItem>
              </DropdownMenuGroup>
              {/* Add more groups as needed */}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Trading Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <TrendingUp className="mr-2 h-4 w-4" />
                Trading
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Trading</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem>Order Management</DropdownMenuItem>
                <DropdownMenuItem>Positions</DropdownMenuItem>
                <DropdownMenuItem>Trade History</DropdownMenuItem>
                <DropdownMenuItem>Algorithms</DropdownMenuItem>
              </DropdownMenuGroup>
              {/* Add more groups as needed */}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Analysis Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <PieChart className="mr-2 h-4 w-4" />
                Analysis
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Analysis</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem>Technical Analysis</DropdownMenuItem>
                <DropdownMenuItem>Fundamental Analysis</DropdownMenuItem>
                <DropdownMenuItem>Screeners</DropdownMenuItem>
                <DropdownMenuItem>Risk Analytics</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* News & Research Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <FileText className="mr-2 h-4 w-4" />
                News & Research
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>News & Research</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem>Latest News</DropdownMenuItem>
                <DropdownMenuItem>Economic Calendar</DropdownMenuItem>
                <DropdownMenuItem>Analyst Reports</DropdownMenuItem>
                <DropdownMenuItem>Regulatory Filings</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>

      {/* Right Side of NavBar */}
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
  )
}

export default TopNavBar
