// src/components/windows/TradingViewChart.tsx

'use client';

import React, { useEffect, useRef } from 'react';

interface TradingViewChartProps {
  symbol?: string;
  id: string; // Unique identifier for multiple charts
}

const TradingViewChart: React.FC<TradingViewChartProps> = ({ symbol = 'NASDAQ:AAPL', id }) => {
  const containerId = `tradingview_chart_${id}`;
  const widgetRef = useRef<any>(null);

  useEffect(() => {
    const scriptId = 'tradingview-widget-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://s3.tradingview.com/tv.js';
      script.async = true;
      document.body.appendChild(script);
    }

    const handleScriptLoad = () => {
      if ((window as any).TradingView) {
        const container = document.getElementById(containerId);
        if (container && !widgetRef.current) {
          widgetRef.current = new (window as any).TradingView.widget({
            autosize: true,
            symbol: symbol,
            interval: 'D',
            timezone: 'Etc/UTC',
            theme: 'dark',
            style: {
              height: '100%',
              margin: 0,
              padding: 0,
              border: 'none',
            },
            locale: 'en',
            toolbar_bg: '#11141C',
            enable_publishing: false,
            allow_symbol_change: true,
            container_id: containerId,
            studies: ["MASimple@tv-basicstudies", "RSI@tv-basicstudies"],
            overrides: {
              "mainSeriesProperties.candleStyle.upColor": "#2962FF",
              "mainSeriesProperties.candleStyle.downColor": "#64748B",
              "paneProperties.background": "#11141C",
              "paneProperties.vertGridProperties.color": "#64748B",
              "paneProperties.horzGridProperties.color": "#64748B",
              "scalesProperties.textColor": "#64748B",
              "scalesProperties.fontSize": 12,
            }
          });
        }
      }
    };

    if ((window as any).TradingView) {
      handleScriptLoad();
    } else {
      script.addEventListener('load', handleScriptLoad);
    }

    return () => {
      if (widgetRef.current) {
        try {
          const container = document.getElementById(containerId);
          if (container) {
            container.innerHTML = '';
          }
          widgetRef.current = null;
        } catch (error) {
          console.warn('Error cleaning up TradingView widget:', error);
        }
      }
      if (script) {
        script.removeEventListener('load', handleScriptLoad);
      }
    };
  }, [symbol, containerId]);

  return (
    <div 
      id={containerId} 
      className="h-full w-full"
      style={{ height: '100%' }} 
    />
  );
};

export default TradingViewChart;
