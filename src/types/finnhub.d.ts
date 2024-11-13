declare module 'finnhub' {
    export class DefaultApi {
        constructor(config: { apiKey: string });
        quote(symbol: string): Promise<{
            c: number;  // Current price
            h: number;  // High price
            l: number;  // Low price
            o: number;  // Open price
            pc: number; // Previous close
            t: number;  // Timestamp
            b: number;  // Bid price
            a: number;  // Ask price
            bs: number; // Bid size
            as: number; // Ask size
        }>;
        stockTrades(symbol: string, date: string): Promise<Array<{
            p: number;  // Price
            v: number;  // Volume
            t: number;  // Timestamp
            c: string;  // Conditions
        }>>;
        stockCandles(symbol: string, resolution: string, from: number, to: number): Promise<{
            s: string;
            c: number[];  // Close prices
            h: number[];  // High prices
            l: number[];  // Low prices
            o: number[];  // Open prices
            t: number[];  // Timestamps
            v: number[];  // Volumes
        }>;
    }
} 