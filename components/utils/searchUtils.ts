// src/components/utils/searchUtils.ts

export const analyzeSearchTerm = (input: string) => {
  // Simple example: extract the first word as the symbol
  const symbol = input.split(' ')[0].toUpperCase();
  return { symbol };
};
