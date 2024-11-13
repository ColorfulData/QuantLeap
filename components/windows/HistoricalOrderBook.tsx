// import React, { useCallback, useEffect, useState } from "react";
// import axios from "axios"; // Using axios instead of fetch
// import { OrderBookEntry } from "./OrderBookWindow";

// interface HistoricalOrderBookProps {
//   symbol: string;
// }

// interface Order {
//   price: number;
//   size: number;
//   total: number;
//   percentage: number;
// }

// const HistoricalOrderBook: React.FC<HistoricalOrderBookProps> = ({ symbol }) => {
//   const [asks, setAsks] = useState<Order[]>([]);
//   const [bids, setBids] = useState<Order[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(true);

//   const fetchOrderBook = useCallback(async () => {
//     setIsLoading(true);
//     setError(null);
    
//     try {
//       const proxyUrl = `/api/stock/${symbol}`; // Ensure this endpoint is implemented
//       const response = await axios.get(proxyUrl);
      
//       if (!response.data) {
//         throw new Error('No data received');
//       }

//       const currentPrice = response.data.price || 100; // Fallback price if not available
      
//       const generateOrders = (basePrice: number, type: 'buy' | 'sell'): Order[] => {
//         const orders: Order[] = [];
//         const spread = type === 'buy' ? -0.1 : 0.1;
        
//         for (let i = 1; i <= 10; i++) {
//           const price = basePrice + (i * spread);
//           const size = Math.floor(Math.random() * 1000) + 100;
//           const total = price * size;
          
//           orders.push({
//             price: parseFloat(price.toFixed(2)),
//             size,
//             total: parseFloat(total.toFixed(2)),
//             percentage: Math.min(100, (size / 1000) * 100),
//           });
//         }
//         return orders;
//       };

//       setBids(generateOrders(currentPrice, 'buy'));
//       setAsks(generateOrders(currentPrice, 'sell'));
//     } catch (err) {
//       setError('Unable to fetch order book data');
//       console.error('Order book fetch error:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [symbol]);

//   useEffect(() => {
//     fetchOrderBook();
    
//     const ws = new WebSocket(`wss://your-websocket-server/${symbol}`); // Ensure this URL is correct
    
//     ws.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       if (data.bids) setBids(data.bids);
//       if (data.asks) setAsks(data.asks);
//     };

//     return () => ws.close();
//   }, [fetchOrderBook]);

//   if (isLoading) return <div className="text-text-primary p-4">Loading order book...</div>;
//   if (error) return <div className="text-red-500 p-4">{error}</div>;

//   return (
//     <div className="h-full">
//       <div className="grid grid-cols-2 gap-2">
//         <div className="bg-background-elevated rounded-lg p-2">
//           <h3 className="text-text-primary font-semibold mb-2">Bids</h3>
//           {bids.map((bid, index) => (
//             <OrderBookEntry
//               key={index}
//               price={bid.price}
//               size={bid.size}
//               total={bid.total}
//               type="buy"
//               percentage={bid.percentage}
//             />
//           ))}
//         </div>
//         <div className="bg-background-elevated rounded-lg p-2">
//           <h3 className="text-text-primary font-semibold mb-2">Asks</h3>
//           {asks.map((ask, index) => (
//             <OrderBookEntry
//               key={index}
//               price={ask.price}
//               size={ask.size}
//               total={ask.total}
//               type="sell"
//               percentage={ask.percentage}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HistoricalOrderBook;