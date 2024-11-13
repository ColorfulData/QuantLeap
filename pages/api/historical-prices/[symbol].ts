// pages/api/historical-prices/[symbol].ts

import type { NextApiRequest, NextApiResponse } from 'next';
import yahooFinance from 'yahoo-finance2';

interface HistoricalPrice {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<HistoricalPrice[] | { error: string }>) {
  const { symbol } = req.query;

  if (!symbol || typeof symbol !== 'string') {
    return res.status(400).json({ error: 'Invalid symbol' });
  }

  try {
    const queryOptions = { period1: '2000-01-01', interval: '1d' as '1d' };
    const result = await yahooFinance.historical(symbol.toUpperCase(), queryOptions);

    if (!result || result.length === 0) {
      return res.status(404).json({ error: 'No historical data found.' });
    }

    const historicalData: HistoricalPrice[] = result.map(entry => ({
      date: entry.date.toISOString().split('T')[0],
      open: entry.open,
      high: entry.high,
      low: entry.low,
      close: entry.close,
      volume: entry.volume,
    }));

    res.status(200).json(historicalData);
  } catch (error: any) {
    console.error('Error fetching historical prices:', error.message || error);
    res.status(500).json({ error: 'Failed to fetch historical prices.' });
  }
}
