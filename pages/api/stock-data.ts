import type { NextApiRequest, NextApiResponse } from 'next';
import yahooFinance from 'yahoo-finance2';

interface StockData {
  symbol: string;
  regularMarketPrice: number;
  regularMarketChangePercent: number;
  fiftyDayAverage: number;
  twoHundredDayAverage: number;
  regularMarketVolume: number;
}

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse<StockData | { error: string }>
) {
  const { symbol } = req.query;

  if (!symbol || typeof symbol !== 'string') {
    res.status(400).json({ error: 'Invalid or missing symbol parameter.' });
    return;
  }

  try {
    const quote = await yahooFinance.quote(symbol);
    
    const stockData: StockData = {
      symbol: quote.symbol,
      regularMarketPrice: quote.regularMarketPrice ?? 0,
      regularMarketChangePercent: quote.regularMarketChangePercent ?? 0,
      fiftyDayAverage: quote.fiftyDayAverage ?? 0,
      twoHundredDayAverage: quote.twoHundredDayAverage ?? 0,
      regularMarketVolume: quote.regularMarketVolume ?? 0
    };

    res.status(200).json(stockData);
  } catch (error) {
    console.error('Error fetching stock data:', error);
    res.status(500).json({ error: 'Failed to fetch stock data.' });
  }
} 