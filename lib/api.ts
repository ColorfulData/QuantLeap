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

export async function fetchOrderBookData(symbol: string): Promise<OrderBookData> {
  try {
    const response = await fetch(`/api/orderBook?symbol=${encodeURIComponent(symbol)}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch order book data');
    }

    const data: OrderBookData = await response.json();
    return data;
  } catch (error: any) {
    console.error('Error in fetchOrderBookData:', error.message || error);
    throw new Error(error.message || 'Failed to fetch order book data');
  }
}
