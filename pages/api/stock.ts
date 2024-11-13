// src/pages/api/stock.ts

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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { symbol } = req.query;

  if (!symbol || typeof symbol !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid stock symbol' });
  }

  try {
    const quote = await yahooFinance.quote(symbol);

    if (!quote || !quote.regularMarketPrice) {
      throw new Error('Invalid data received from Yahoo Finance');
    }

    const stockData: StockData = {
      symbol: quote.symbol,
      regularMarketPrice: quote.regularMarketPrice ?? 0,
      regularMarketChangePercent: quote.regularMarketChangePercent ?? 0,
      fiftyDayAverage: quote.fiftyDayAverage ?? 0,
      twoHundredDayAverage: quote.twoHundredDayAverage ?? 0,
      regularMarketVolume: quote.regularMarketVolume || 0,
    };

    res.status(200).json(stockData);
  } catch (error: any) {
    console.error('Error fetching stock data:', error.message || error);
    res.status(500).json({ error: 'Failed to fetch stock data' });
  }
}
