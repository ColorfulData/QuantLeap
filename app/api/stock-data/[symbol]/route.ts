import { NextRequest, NextResponse } from 'next/server';
import yahooFinance from 'yahoo-finance2';

interface StockData {
  symbol: string;
  regularMarketPrice: number;
  regularMarketChangePercent: number;
  fiftyDayAverage: number;
  twoHundredDayAverage: number;
  regularMarketVolume: number;
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const symbol = url.pathname.split('/').pop(); // Extract symbol from the path

  if (!symbol) {
    return NextResponse.json(
      { error: 'Invalid or missing symbol parameter.' },
      { status: 400 }
    );
  }

  try {
    const quote = await yahooFinance.quote(symbol as string);

    const stockData: StockData = {
      symbol: quote.symbol,
      regularMarketPrice: quote.regularMarketPrice ?? 0,
      regularMarketChangePercent: quote.regularMarketChangePercent ?? 0,
      fiftyDayAverage: quote.fiftyDayAverage ?? 0,
      twoHundredDayAverage: quote.twoHundredDayAverage ?? 0,
      regularMarketVolume: quote.regularMarketVolume ?? 0,
    };

    return NextResponse.json(stockData);
  } catch (error) {
    console.error('Error fetching stock data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stock data.' },
      { status: 500 }
    );
  }
}
  