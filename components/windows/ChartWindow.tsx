// // src/components/windows/ChartWindow.tsx

// import React, { useState, useEffect } from 'react';
// import dynamic from 'next/dynamic';
// import { Select, SelectItem } from '@/components/ui/Select';
// import { Button } from '@/components/ui/Button';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   TimeScale,
// } from 'chart.js';
// import 'chartjs-adapter-date-fns';
// import axios from 'axios';
// import { format, parseISO } from 'date-fns';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   TimeScale
// );

// // Dynamically import the Line chart to prevent SSR issues
// const LineChart = dynamic(() => import('react-chartjs-2').then(mod => mod.Line), {
//   ssr: false,
// });

// interface HistoricalPrice {
//   date: string; // Expected format: YYYY-MM-DD
//   close: number;
// }

// interface ChartDataStructure {
//   labels: string[];
//   data: number[];
// }

// const ChartWindow: React.FC<{ symbol: string }> = ({ symbol }) => {
//   const [timeframe, setTimeframe] = useState<string>('D');
//   const [chartData, setChartData] = useState<any>(null);
//   const [error, setError] = useState<string | null>(null);

//   const timeframeOptions = [
//     { label: '1 Day', value: 'D' },
//     { label: '1 Week', value: 'W' },
//     { label: '1 Month', value: 'M' },
//     { label: '3 Months', value: '3M' },
//     { label: '1 Year', value: '1Y' },
//   ];

//   useEffect(() => {
//     const fetchChartData = async () => {
//       if (!symbol) return;
//       setError(null);
//       try {
//         const response = await axios.get<HistoricalPrice[]>(
//           `/api/historical-prices/${encodeURIComponent(symbol)}`
//         );
//         const data = response.data;

//         if (!Array.isArray(data) || data.length === 0) {
//           throw new Error('No data available');
//         }

//         // Sort data by date ascending
//         data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

//         // Aggregate data based on the selected timeframe
//         const aggregatedData = aggregateDataByTimeframe(data, timeframe);

//         setChartData({
//           labels: aggregatedData.labels,
//           datasets: [
//             {
//               label: `${symbol.toUpperCase()} Price`,
//               data: aggregatedData.data,
//               fill: false,
//               borderColor: '#00B167',
//               backgroundColor: '#00B167',
//               tension: 0.1,
//             },
//           ],
//         });
//       } catch (err: any) {
//         console.error('Error fetching chart data:', err.message || err);
//         setError('Failed to load chart data.');
//       }
//     };

//     fetchChartData();
//   }, [symbol, timeframe]);

//   /**
//    * Aggregates historical price data based on the selected timeframe.
//    * @param data - Array of historical price data.
//    * @param timeframe - Selected timeframe ('D', 'W', 'M', '3M', '1Y').
//    * @returns Aggregated data with labels and corresponding average close prices.
//    */
//   const aggregateDataByTimeframe = (data: HistoricalPrice[], timeframe: string): ChartDataStructure => {
//     const result: ChartDataStructure = { labels: [], data: [] };

//     switch (timeframe) {
//       case 'D':
//         // Daily data - no aggregation needed
//         result.labels = data.map(entry => format(parseISO(entry.date), 'MMM d'));
//         result.data = data.map(entry => entry.close);
//         break;

//       case 'W':
//         // Weekly aggregation
//         result.labels = [];
//         result.data = [];
//         for (let i = 0; i < data.length; i += 7) {
//           const weekData = data.slice(i, i + 7);
//           const labelDate = weekData[weekData.length - 1].date;
//           const averageClose =
//             weekData.reduce((sum, entry) => sum + entry.close, 0) / weekData.length;
//           result.labels.push(format(parseISO(labelDate), 'MMM d'));
//           result.data.push(parseFloat(averageClose.toFixed(2)));
//         }
//         break;

//       case 'M':
//         // Monthly aggregation
//         aggregateByMonth(data, result, 1);
//         break;

//       case '3M':
//         // Quarterly aggregation (3 months)
//         aggregateByMonth(data, result, 3);
//         break;

//       case '1Y':
//         // Yearly aggregation
//         aggregateByMonth(data, result, 12);
//         break;

//       default:
//         // Fallback to daily data
//         result.labels = data.map(entry => format(parseISO(entry.date), 'MMM d'));
//         result.data = data.map(entry => entry.close);
//     }

//     return result;
//   };

//   /**
//    * Helper function to aggregate data by a specified number of months.
//    * @param data - Array of historical price data.
//    * @param result - ChartDataStructure object to populate.
//    * @param monthInterval - Number of months per aggregation period.
//    */
//   const aggregateByMonth = (
//     data: HistoricalPrice[],
//     result: ChartDataStructure,
//     monthInterval: number
//   ) => {
//     const months: { [key: string]: { sum: number; count: number } } = {};

//     data.forEach(entry => {
//       const date = parseISO(entry.date);
//       const month = date.getMonth(); // 0-based
//       const year = date.getFullYear();
//       const aggregatedMonth = Math.floor(month / monthInterval) * monthInterval;
//       const key = `${year}-${String(aggregatedMonth + 1).padStart(2, '0')}`;

//       if (!months[key]) {
//         months[key] = { sum: 0, count: 0 };
//       }
//       months[key].sum += entry.close;
//       months[key].count += 1;
//     });

//     const sortedKeys = Object.keys(months).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

//     sortedKeys.forEach(key => {
//       const [year, month] = key.split('-');
//       const label = format(new Date(parseInt(year), parseInt(month) - 1), monthInterval === 1 ? 'MMM yyyy' : 'MMM yyyy');
//       const averageClose = months[key].sum / months[key].count;
//       result.labels.push(label);
//       result.data.push(parseFloat(averageClose.toFixed(2)));
//     });
//   };

//   return (
//     <div className="flex flex-col h-full">
//       {/* Header with Symbol and Timeframe Selector */}
//       <div className="flex justify-between items-center mb-2">
//         <h3 className="font-bold text-lg text-textColor">
//           {symbol ? `${symbol.toUpperCase()} - ${symbol.toUpperCase()}` : 'Loading...'}
//         </h3>
//         <Select value={timeframe} onValueChange={setTimeframe}>
//           {timeframeOptions.map(option => (
//             <SelectItem key={option.value} value={option.value}>
//               {option.label}
//             </SelectItem>
//           ))}
//         </Select>
//       </div>

//       {/* Chart Container */}
//       <div className="flex-1 bg-panel rounded-md p-2 relative">
//         {chartData ? (
//           <LineChart
//             data={chartData}
//             options={{
//               responsive: true,
//               maintainAspectRatio: false,
//               plugins: {
//                 legend: {
//                   display: false,
//                 },
//                 tooltip: {
//                   mode: 'index',
//                   intersect: false,
//                 },
//               },
//               scales: {
//                 x: {
//                   type: 'time',
//                   time: {
//                     unit: timeframe === 'D' ? 'day' : timeframe === 'W' ? 'week' : 'month',
//                     displayFormats: {
//                       day: 'MMM d',
//                       week: 'MMM d',
//                       month: 'MMM yyyy',
//                       quarter: 'MMM yyyy',
//                       year: 'yyyy',
//                     },
//                   },
//                   grid: {
//                     display: false,
//                     color: 'rgba(255, 255, 255, 0.05)',
//                   },
//                   ticks: {
//                     color: '#6B7280',
//                   },
//                 },
//                 y: {
//                   grid: {
//                     color: 'rgba(255, 255, 255, 0.05)',
//                   },
//                   ticks: {
//                     color: '#6B7280',
//                   },
//                 },
//               },
//             }}
//           />
//         ) : error ? (
//           <div className="w-full h-full flex items-center justify-center text-red-500">
//             {error}
//           </div>
//         ) : (
//           <div className="w-full h-full flex items-center justify-center text-secondaryText">
//             Loading Chart...
//           </div>
//         )}
//       </div>

//       {/* Action Buttons */}
//       <div className="flex space-x-2 mt-2">
//         <Button variant="secondary" size="sm" className="bg-panel bg-opacity-80 hover:bg-opacity-100 transition">
//           Indicators
//         </Button>
//         <Button variant="secondary" size="sm" className="bg-panel bg-opacity-80 hover:bg-opacity-100 transition">
//           Drawing Tools
//         </Button>
//         <Button variant="secondary" size="sm" className="bg-panel bg-opacity-80 hover:bg-opacity-100 transition">
//           Compare
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default ChartWindow;
