import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    TradingView: any;
  }
}

interface TradingViewWidgetProps {
  symbol?: string;
  theme?: string;
  autosize?: boolean;
  interval?: string;
  timezone?: string;
  style?: string;
  locale?: string;
  enable_publishing?: boolean;
  hide_top_toolbar?: boolean;
  container_id?: string;
}

const TradingViewWidget: React.FC<TradingViewWidgetProps> = ({
  symbol = 'AAPL',
  theme = 'dark',
  autosize = true,
  interval = '1D',
  timezone = 'Asia/Kolkata',
  style = '1',
  locale = 'in',
  enable_publishing = false,
  hide_top_toolbar = false,
  container_id = 'tradingview_chart'
}) => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Remove any existing script
    const existingScript = document.getElementById('tradingview-widget-script');
    if (existingScript) {
      existingScript.remove();
    }

    // Create and load the TradingView script
    const script = document.createElement('script');
    script.id = 'tradingview-widget-script';
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      if (typeof window.TradingView !== 'undefined' && container.current) {
        new window.TradingView.widget({
          symbol: symbol,
          theme: theme,
          autosize: autosize,
          interval: interval,
          timezone: timezone,
          style: style,
          locale: locale,
          enable_publishing: enable_publishing,
          hide_top_toolbar: hide_top_toolbar,
          container_id: container_id,
          width: '100%',
          height: '100%'
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [symbol, theme, autosize, interval, timezone, style, locale, enable_publishing, hide_top_toolbar, container_id]);

  return <div id={container_id} ref={container} className="w-full h-full" />;
};

export default TradingViewWidget; 