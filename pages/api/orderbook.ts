// pages/api/orderbook.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import yahooFinance from 'yahoo-finance2';

interface Order {
  price: number;
  size: number;
  total: number;
  percentage: number;
}

interface OrderBook {
  bids: Order[];
  asks: Order[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<OrderBook | { error: string }>) {
  const { symbol } = req.query;

  if (!symbol || typeof symbol !== 'string') {
    return res.status(400).json({ error: 'Invalid symbol' });
  }

  try {
    const quote = await yahooFinance.quote(symbol.toUpperCase());

    if (!quote.regularMarketPrice) {
      return res.status(404).json({ error: 'Symbol not found or no data available' });
    }

    const currentPrice = quote.regularMarketPrice;

    const generateOrders = (base: number, isBid: boolean): Order[] => {
      const orders: Order[] = [];
      for (let i = 1; i <= 5; i++) {
        const price = isBid ? base - i * 0.05 : base + i * 0.05;
        const size = Math.floor(Math.random() * 100) + 1;
        const total = size;
        const percentage = Math.floor(Math.random() * 100);
        orders.push({
          price: parseFloat(price.toFixed(2)),
          size,
          total,
          percentage,
        });
      }
      return orders;
    };

    const bids = generateOrders(currentPrice, true);
    const asks = generateOrders(currentPrice, false);

    const orderBook: OrderBook = { bids, asks };

    res.status(200).json(orderBook);
  } catch (error: any) {
    console.error('Error fetching order book data:', error.message || error);
    res.status(500).json({ error: 'Failed to fetch order book data' });
  }
}
