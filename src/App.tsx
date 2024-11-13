// src/App.tsx or src/pages/_app.tsx

'use client';

import React, { useState, useEffect } from 'react';
import Headers from '@/components/Headers';
import AdvancedTradingTerminal from '@/components/AdvancedTradingTerminal';
import { ToastProvider } from '@/components/ui/use-toast';
import { analyzeSearchTerm } from '@/components/utils/searchUtils'; // Ensure this utility is correctly implemented

const App: React.FC = () => {
  const [symbol, setSymbol] = useState<string>('AAPL');
  const [currentLayout, setCurrentLayout] = useState<'grid' | 'tabs'>('grid');
  const [isMultiMonitor, setIsMultiMonitor] = useState<boolean>(false);

  const handleSearch = (query: string) => {
    const searchResult = analyzeSearchTerm(query);
    if (searchResult.symbol) {
      setSymbol(searchResult.symbol);
    } else {
      console.warn('Invalid search query');
    }
  };

  const handleLayoutChange = (layout: 'grid' | 'tabs') => {
    setCurrentLayout(layout);
  };

  const handleMultiMonitorToggle = () => {
    setIsMultiMonitor(prev => !prev);
  };

  // Optionally, persist layout settings using localStorage
  useEffect(() => {
    const savedLayout = localStorage.getItem('layoutSettings');
    if (savedLayout) {
      const { currentLayout, isMultiMonitor, symbol } = JSON.parse(savedLayout);
      setCurrentLayout(currentLayout);
      setIsMultiMonitor(isMultiMonitor);
      setSymbol(symbol);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('layoutSettings', JSON.stringify({ currentLayout, isMultiMonitor, symbol }));
  }, [currentLayout, isMultiMonitor, symbol]);

  return (
    <div className="dark">
      <ToastProvider>
        <Headers
          onSearch={handleSearch}
          onLayoutChange={handleLayoutChange}
          currentLayout={currentLayout}
          isMultiMonitor={isMultiMonitor}
          onMultiMonitorToggle={handleMultiMonitorToggle}
          onSaveLayout={() => console.log('Save layout')} // Implement save functionality if needed
          onLoadLayout={() => console.log('Load layout')} // Implement load functionality if needed
          onGridViewToggle={() => setCurrentLayout('grid')}
          onTabViewToggle={() => setCurrentLayout('tabs')}
        />
        <AdvancedTradingTerminal 
          currentLayout={currentLayout} 
          symbol={symbol} 
        />
      </ToastProvider>
    </div>
  );
};

export default App;
