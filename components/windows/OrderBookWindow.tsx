// import React from 'react';

// interface OrderBookEntryProps {
//   price: number;
//   size: number;
//   total: number;
//   type: 'buy' | 'sell';
//   percentage: number;
// }

// export const OrderBookEntry: React.FC<OrderBookEntryProps> = ({
//   price,
//   size,
//   total,
//   type,
//   percentage
// }) => {
//   return (
//     <div className="relative flex items-center justify-between text-sm py-1">
//       {/* Background percentage bar */}
//       <div 
//         className={`absolute left-0 top-0 h-full ${
//           type === 'buy' ? 'bg-green-500/10' : 'bg-red-500/10'
//         }`}
//         style={{ width: `${percentage}%` }}
//       />
      
//       {/* Content */}
//       <div className="relative flex justify-between w-full">
//         <span className={`font-mono ${
//           type === 'buy' ? 'text-green-500' : 'text-red-500'
//         }`}>
//           {price.toFixed(2)}
//         </span>
//         <span className="text-text-secondary">{size.toLocaleString()}</span>
//         <span className="text-text-secondary">{total.toLocaleString()}</span>
//       </div>
//     </div>
//   );
// };