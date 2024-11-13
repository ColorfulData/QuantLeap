interface SignalIndicatorProps {
  value: number;
}

export const SignalIndicator: React.FC<SignalIndicatorProps> = ({ value }) => {
  const getSignal = () => {
    if (value < -2) return '🔴 Bearish';
    if (value > 2) return '🟢 Bullish';
    return '⚪ Neutral';
  };

  return (
    <span className="text-sm font-medium">
      {getSignal()}
    </span>
  );
}; 