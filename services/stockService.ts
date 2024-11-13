export interface OrderBookEntry {
  price: number;
  size: number;
  timestamp: number;
}

export interface Trade {
  id: number;
  time: Date;
  type: "buy" | "sell";
  price: number;
  quantity: number;
  total: number;
  timestamp: number;
  side: 'buy' | 'sell';
}

export interface OrderBook {
  bids: OrderBookEntry[];
  asks: OrderBookEntry[];
  timestamp: number;
}

export const getTrades = async (
  symbol: string,
  startTime?: number,
  endTime?: number
): Promise<Trade[]> => {
  const url = `/api/trades?symbol=${symbol}${startTime ? `&startTime=${startTime}` : ''}${endTime ? `&endTime=${endTime}` : ''}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch trades');
  return response.json();
};

export const getHistoricalOrderBook = async (
  symbol: string,
  timestamp: number
): Promise<OrderBook> => {
  const url = `/api/orderbook?symbol=${symbol}&timestamp=${timestamp}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch order book');
  return response.json();
};

export const subscribeToOrderBook = (
  symbol: string,
  callback: (orderBook: OrderBook) => void
): () => void => {
  // TODO: Implement websocket connection
  return () => {
    // Cleanup function to unsubscribe
  };
};

export const getHistoricalData = async (symbol: string) => {
  const response = await fetch(`/api/stocks/${symbol}/historical`);
  if (!response.ok) throw new Error('Failed to fetch historical data');
  return response.json();
};

export const getQuote = async (symbol: string) => {
  const response = await fetch(`/api/quotes/${symbol}`);
  return response.json();
}; 