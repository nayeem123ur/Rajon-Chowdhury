export type MarketType = 'OTC' | 'Real';

export type Timeframe = '5s' | '15s' | '30s' | '1m' | '2m' | '5m';

export type SignalDirection = 'CALL' | 'PUT';

export interface CurrencyPair {
  id: string;
  name: string;
  base: string;
  quote: string;
  baseFlag: string;
  quoteFlag: string;
  payout: number; // e.g. 89%
  currentPrice: number;
  decimals: number;
  change24h: number; // e.g. +0.42%
  isOtc: boolean;
  volatility: 'Low' | 'Medium' | 'High';
}

export interface TechnicalLevels {
  resistance: number | string;
  support: number | string;
  priceZonePercent: number; // 0 to 100 on the vertical ladder
  trend: 'Uptrend' | 'Downtrend' | 'Sideways' | 'Strong Bullish' | 'Strong Bearish';
  pattern: string;
  rsi: number;
  macd: 'Bullish Cross' | 'Bearish Cross' | 'Neutral';
  bollingerState: 'Squeezing' | 'Expanding' | 'Upper Break' | 'Lower Break' | 'Normal';
  stochastic: number;
  confidence: number; // 75 - 96%
}

export interface SignalData {
  id: string;
  pairId: string;
  pairName: string;
  marketType: MarketType;
  broker: string;
  timeframe: Timeframe;
  direction: SignalDirection;
  entryPrice: number;
  confidence: number;
  levels: TechnicalLevels;
  createdAt: number;
  candleExpiryTime: number;
  tradeThreshold: number;
  status: 'ACTIVE' | 'WON' | 'LOST' | 'PENDING';
  message: string;
  source?: 'Auto AI' | 'Chart Vision Scanner';
  baseFlag?: string;
  quoteFlag?: string;
  payout?: number;
  profit?: string;
}

export interface BrokerInfo {
  id: string;
  name: string;
  tagline: string;
  avgPayout: number;
  otcSupported: boolean;
  color: string;
  badge: string;
}
