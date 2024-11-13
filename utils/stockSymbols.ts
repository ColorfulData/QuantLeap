export const getFormattedSymbol = (inputSymbol: string) => {
  const usStocks: { [key: string]: string } = {
    'AAPL': 'AAPL',
    'MSFT': 'MSFT',
    'GOOGL': 'GOOGL',
    // Add more US stocks as needed
  };

  const indianStocks: { [key: string]: string } = {
    'RELIANCE': 'RELIANCE.BSE',
    'GTLINFRA': 'GTLINFRA.BSE',
    'TCS': 'TCS.BSE',
    // Add more Indian stocks as needed
  };

  if (usStocks[inputSymbol.toUpperCase()]) {
    return usStocks[inputSymbol.toUpperCase()];
  }

  if (indianStocks[inputSymbol.toUpperCase()]) {
    return indianStocks[inputSymbol.toUpperCase()];
  }

  return `${inputSymbol.toUpperCase()}.BSE`;
}; 