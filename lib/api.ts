// src/lib/api.ts

export interface Order {
  price: number;
  size: number;
}

export interface OrderBookData {
  lastUpdateId: number;
  bids: Order[];
  asks: Order[];
}

export interface ApiError {
  message: string;
  status: number;
}

export async function fetchOrderBookData(symbol: string): Promise<OrderBookData> {
  try {
    const response = await fetch(`/api/orderBook?symbol=${encodeURIComponent(symbol)}`);

    if (!response.ok) {
      const errorData = await response.json() as ApiError;
      throw new Error(errorData.message || 'Failed to fetch order book data');
    }

    const data = await response.json() as OrderBookData;
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error in fetchOrderBookData:', error.message);
      throw error;
    }
    throw new Error('Failed to fetch order book data');
  }
}
