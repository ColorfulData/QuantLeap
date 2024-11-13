// src/components/Headers.tsx

'use client';

import React, { useState } from "react";
import { DropdownMenu } from "@/components/ui/DropdownMenu";
import {
  Globe,
  TrendingUp,
  PieChart,
  FileText,
  Monitor,
  Grid,
  Layers,
  Settings,
  Minimize2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import Button from "@/components/ui/Button";

interface HeadersProps {
  onSearch: (query: string) => void;
  onLayoutChange: (layout: "grid" | "tabs") => void;
  currentLayout: "grid" | "tabs";
  isMultiMonitor: boolean;
  onMultiMonitorToggle: () => void;
  onSaveLayout?: () => void;
  onLoadLayout?: () => void;
  onGridViewToggle?: () => void;
  onTabViewToggle?: () => void;
}

const Headers: React.FC<HeadersProps> = ({
  onSearch,
  onLayoutChange,
  currentLayout,
  isMultiMonitor,
  onMultiMonitorToggle,
  onSaveLayout,
  onLoadLayout,
  onGridViewToggle,
  onTabViewToggle,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { addToast } = useToast();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim() === "") {
      addToast("Please enter a search term.");
      return;
    }
    onSearch(searchTerm.trim());
    addToast(`Searching for "${searchTerm.trim()}"`);
    setSearchTerm("");
  };

  const navigationMenus = [
    {
      label: "Markets",
      icon: Globe,
      items: [
        { label: "Stocks", onClick: () => console.log("Stocks clicked") },
        { label: "Forex", onClick: () => console.log("Forex clicked") },
        { label: "Commodities", onClick: () => console.log("Commodities clicked") },
        { label: "Cryptocurrencies", onClick: () => console.log("Cryptocurrencies clicked") },
      ],
    },
    {
      label: "Trading",
      icon: TrendingUp,
      items: [
        { label: "Spot Trading", onClick: () => console.log("Spot Trading clicked") },
        { label: "Margin Trading", onClick: () => console.log("Margin Trading clicked") },
        { label: "Options Trading", onClick: () => console.log("Options Trading clicked") },
        { label: "Futures Trading", onClick: () => console.log("Futures Trading clicked") },
      ],
    },
    {
      label: "Analysis",
      icon: PieChart,
      items: [
        { label: "Technical Analysis", onClick: () => console.log("Technical Analysis clicked") },
        { label: "Fundamental Analysis", onClick: () => console.log("Fundamental Analysis clicked") },
        { label: "Sentiment Analysis", onClick: () => console.log("Sentiment Analysis clicked") },
        { label: "Risk Analysis", onClick: () => console.log("Risk Analysis clicked") },
      ],
    },
    {
      label: "News & Research",
      icon: FileText,
      items: [
        { label: "Latest News", onClick: () => console.log("Latest News clicked") },
        { label: "Research Reports", onClick: () => console.log("Research Reports clicked") },
        { label: "Market Insights", onClick: () => console.log("Market Insights clicked") },
        { label: "Earnings Reports", onClick: () => console.log("Earnings Reports clicked") },
      ],
    },
  ];

  return (
    <header className="h-20 bg-background-header flex items-center justify-between px-4 border-b border-border">
      {/* Left Section: Logo and Navigation */}
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold text-accent-primary whitespace-nowrap">QuantLeap</h1>
        <nav className="flex items-center space-x-2">
          {navigationMenus.map((menu, index) => (
            <DropdownMenu
              key={index}
              label={
                <div className="flex items-center space-x-1 text-text-primary bg-background-header bg-opacity-80 rounded-md px-3 py-2 cursor-pointer hover:bg-opacity-100 transition">
                  <menu.icon className="h-5 w-5 text-accent-primary" />
                  <span>{menu.label}</span>
                </div>
              }
              items={menu.items}
            />
          ))}
        </nav>
      </div>

      {/* Right Section: Controls, Search and Settings */}
      <div className="flex items-center space-x-4">
        {/* Layout Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onMultiMonitorToggle}
            className={`flex items-center justify-center w-10 h-10 text-text-primary bg-background-header bg-opacity-80 rounded-md hover:bg-opacity-100 transition ${
              isMultiMonitor ? "border border-accent-primary" : ""
            }`}
          >
            <Monitor className="h-5 w-5 text-accent-primary" />
          </button>

          <button
            onClick={onGridViewToggle}
            className={`flex items-center justify-center w-10 h-10 text-text-primary bg-background-header bg-opacity-80 rounded-md hover:bg-opacity-100 transition ${
              currentLayout === "grid" ? "border border-accent-primary" : ""
            }`}
          >
            <Grid className="h-5 w-5 text-accent-primary" />
          </button>

          <button
            onClick={onTabViewToggle}
            className={`flex items-center justify-center w-10 h-10 text-text-primary bg-background-header bg-opacity-80 rounded-md hover:bg-opacity-100 transition ${
              currentLayout === "tabs" ? "border border-accent-primary" : ""
            }`}
          >
            <Layers className="h-5 w-5 text-accent-primary" />
          </button>
        </div>

        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="relative hidden xl:flex items-center">
          <span className="absolute left-3 h-5 w-5 text-text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-text-secondary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1112 4.5a7.5 7.5 0 018.65 12.15z"
              />
            </svg>
          </span>
          <Input
            type="search"
            placeholder="Search stocks or news..."
            className="h-10 pl-10 w-60 bg-background-elevated text-primary border border-border focus:ring-accent-primary rounded-md transition"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </form>

        {/* Settings */}
        <div className="flex items-center space-x-1">
          {[Settings].map((Icon, index) => (
            <button
              key={index}
              className="h-10 w-10 flex items-center justify-center text-text-secondary hover:text-text-primary bg-background-header hover:bg-background-header rounded-full transition"
            >
              <Icon className="h-5 w-5 text-accent-primary" />
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Headers;
