import { Trade } from '@/services/stockService';
import type { NextApiRequest, NextApiResponse } from 'next';
import yahooFinance from 'yahoo-finance2';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ trade?: Trade; error?: string }>
) {
  const { symbol } = req.query;

  if (!symbol || typeof symbol !== 'string') {
    return res.status(400).json({ error: 'Symbol is required' });
  }

  try {
    const quote = await yahooFinance.quote(symbol);

    // Type Refinement: Ensure properties are numbers
    const { regularMarketPrice, regularMarketVolume } = quote;

    if (
      typeof regularMarketPrice !== 'number' ||
      typeof regularMarketVolume !== 'number'
    ) {
      return res.status(400).json({ error: 'Market data is unavailable for the selected stock.' });
    }

    const trade: Trade = {
      id: Date.now(),
      time: new Date(),
      type: 'buy',
      price: regularMarketPrice,
      quantity: regularMarketVolume / 100,
      total: parseFloat((regularMarketPrice * (regularMarketVolume / 100)).toFixed(2)),
      timestamp: new Date().getTime(),
      side: 'buy' as 'buy' | 'sell'
    };

    res.status(200).json({ trade });
  } catch (error: any) {
    console.error('API Error:', error.message || error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
} 