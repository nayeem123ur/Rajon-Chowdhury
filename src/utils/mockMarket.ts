import { BrokerInfo, CurrencyPair, SignalData, TechnicalLevels, Timeframe } from '../types/trading';

export const BROKERS: BrokerInfo[] = [
  {
    id: 'quotex',
    name: 'Quotex',
    tagline: 'Fast Execution & High OTC Payouts',
    avgPayout: 91,
    otcSupported: true,
    color: '#0066FF',
    badge: 'Official Partner',
  },
  {
    id: 'pocket-option',
    name: 'Pocket Option',
    tagline: 'Leading Binary & OTC Platform',
    avgPayout: 92,
    otcSupported: true,
    color: '#00B0FF',
    badge: 'Popular',
  },
  {
    id: 'binomo',
    name: 'Binomo',
    tagline: 'Safe & Verified Trading Terminal',
    avgPayout: 85,
    otcSupported: true,
    color: '#FFB800',
    badge: 'Verified',
  },
  {
    id: 'olymp-trade',
    name: 'Olymp Trade',
    tagline: 'Fixed Time & Forex Trading',
    avgPayout: 82,
    otcSupported: false,
    color: '#00C853',
    badge: 'Regulated',
  },
  {
    id: 'iq-option',
    name: 'IQ Option',
    tagline: 'Award-winning Trading Software',
    avgPayout: 88,
    otcSupported: true,
    color: '#FF5722',
    badge: 'Global',
  },
  {
    id: 'deriv',
    name: 'Deriv',
    tagline: 'Synthetic Indices & Multipliers',
    avgPayout: 90,
    otcSupported: true,
    color: '#E53935',
    badge: 'Reliable',
  },
];

export const CURRENCY_PAIRS: CurrencyPair[] = [
  {
    id: 'USD_DZD_OTC',
    name: 'USD/DZD (OTC)',
    base: 'USD',
    quote: 'DZD',
    baseFlag: '🇺🇸',
    quoteFlag: '🇩🇿',
    payout: 91,
    currentPrice: 255.45,
    decimals: 3,
    change24h: 0.38,
    isOtc: true,
    volatility: 'Medium',
  },
  {
    id: 'EUR_USD_OTC',
    name: 'EUR/USD (OTC)',
    base: 'EUR',
    quote: 'USD',
    baseFlag: '🇪🇺',
    quoteFlag: '🇺🇸',
    payout: 93,
    currentPrice: 1.0842,
    decimals: 5,
    change24h: 0.14,
    isOtc: true,
    volatility: 'Low',
  },
  {
    id: 'GBP_USD_OTC',
    name: 'GBP/USD (OTC)',
    base: 'GBP',
    quote: 'USD',
    baseFlag: '🇬🇧',
    quoteFlag: '🇺🇸',
    payout: 89,
    currentPrice: 1.2985,
    decimals: 5,
    change24h: -0.22,
    isOtc: true,
    volatility: 'High',
  },
  {
    id: 'USD_BDT_OTC',
    name: 'USD/BDT (OTC)',
    base: 'USD',
    quote: 'BDT',
    baseFlag: '🇺🇸',
    quoteFlag: '🇧🇩',
    payout: 94,
    currentPrice: 122.35,
    decimals: 3,
    change24h: 0.65,
    isOtc: true,
    volatility: 'High',
  },
  {
    id: 'USD_INR_OTC',
    name: 'USD/INR (OTC)',
    base: 'USD',
    quote: 'INR',
    baseFlag: '🇺🇸',
    quoteFlag: '🇮🇳',
    payout: 90,
    currentPrice: 85.42,
    decimals: 3,
    change24h: 0.18,
    isOtc: true,
    volatility: 'Medium',
  },
  {
    id: 'USD_PKR_OTC',
    name: 'USD/PKR (OTC)',
    base: 'USD',
    quote: 'PKR',
    baseFlag: '🇺🇸',
    quoteFlag: '🇵🇰',
    payout: 88,
    currentPrice: 279.15,
    decimals: 3,
    change24h: -0.15,
    isOtc: true,
    volatility: 'Medium',
  },
  {
    id: 'USD_BRL_OTC',
    name: 'USD/BRL (OTC)',
    base: 'USD',
    quote: 'BRL',
    baseFlag: '🇺🇸',
    quoteFlag: '🇧🇷',
    payout: 87,
    currentPrice: 5.728,
    decimals: 4,
    change24h: 0.52,
    isOtc: true,
    volatility: 'High',
  },
  {
    id: 'BTC_USD_OTC',
    name: 'BTC/USD (OTC)',
    base: 'BTC',
    quote: 'USD',
    baseFlag: '🪙',
    quoteFlag: '🇺🇸',
    payout: 92,
    currentPrice: 67840.5,
    decimals: 1,
    change24h: 1.84,
    isOtc: true,
    volatility: 'High',
  },
  {
    id: 'AUD_CAD_OTC',
    name: 'AUD/CAD (OTC)',
    base: 'AUD',
    quote: 'CAD',
    baseFlag: '🇦🇺',
    quoteFlag: '🇨🇦',
    payout: 86,
    currentPrice: 0.9124,
    decimals: 5,
    change24h: -0.08,
    isOtc: true,
    volatility: 'Low',
  },
  {
    id: 'EUR_USD_REAL',
    name: 'EUR/USD',
    base: 'EUR',
    quote: 'USD',
    baseFlag: '🇪🇺',
    quoteFlag: '🇺🇸',
    payout: 84,
    currentPrice: 1.0838,
    decimals: 5,
    change24h: 0.09,
    isOtc: false,
    volatility: 'Medium',
  },
  {
    id: 'GBP_JPY_REAL',
    name: 'GBP/JPY',
    base: 'GBP',
    quote: 'JPY',
    baseFlag: '🇬🇧',
    quoteFlag: '🇯🇵',
    payout: 82,
    currentPrice: 194.25,
    decimals: 3,
    change24h: -0.41,
    isOtc: false,
    volatility: 'High',
  },
];

export const TIMEFRAME_SECONDS: Record<Timeframe, number> = {
  '5s': 5,
  '15s': 15,
  '30s': 30,
  '1m': 60,
  '2m': 120,
  '5m': 300,
};

export function getTimeframeSeconds(tf: Timeframe): number {
  return TIMEFRAME_SECONDS[tf] || 60;
}

export function formatTimeRemaining(seconds: number): string {
  if (seconds <= 0) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export function generateSignalForPair(
  pair: CurrencyPair,
  brokerName: string = 'Quotex',
  timeframe: Timeframe = '1m',
  forcedDirection?: 'CALL' | 'PUT'
): SignalData {
  const isUp = forcedDirection ? forcedDirection === 'CALL' : Math.random() > 0.42;
  const direction = isUp ? 'CALL' : 'PUT';

  const basePrice = pair.currentPrice;
  const step = basePrice * 0.0015;

  let resistance: number | string = Number((basePrice + step * 1.8).toFixed(pair.decimals));
  let support: number | string = Number((basePrice - step * 1.5).toFixed(pair.decimals));

  // In the user's screenshot, resistance displays "No clear r..."
  if (isUp && Math.random() > 0.5) {
    resistance = 'No clear r...';
  }

  const confidenceValues = [82, 85, 87, 89, 91, 93, 94];
  const confidence = confidenceValues[Math.floor(Math.random() * confidenceValues.length)];

  const patterns = isUp
    ? [
        'Bullish Continuation',
        'Hammer Reversal',
        'Morning Star Formation',
        'Three White Soldiers',
        'Bullish Engulfing',
        'Support Bounce Pullback',
      ]
    : [
        'Bearish Engulfing',
        'Shooting Star Reversal',
        'Evening Star Pattern',
        'Three Black Crows',
        'Resistance Rejection',
        'Breakdown Continuation',
      ];

  const selectedPattern = patterns[Math.floor(Math.random() * patterns.length)];
  const trend = isUp ? 'Uptrend' : 'Downtrend';
  const priceZonePercent = isUp ? Math.floor(62 + Math.random() * 22) : Math.floor(20 + Math.random() * 25);

  const levels: TechnicalLevels = {
    resistance,
    support,
    priceZonePercent,
    trend,
    pattern: selectedPattern,
    rsi: isUp ? Math.floor(48 + Math.random() * 18) : Math.floor(32 + Math.random() * 20),
    macd: isUp ? 'Bullish Cross' : 'Bearish Cross',
    bollingerState: 'Expanding',
    stochastic: isUp ? 68 : 34,
    confidence,
  };

  const durationSec = TIMEFRAME_SECONDS[timeframe] || 60;
  const candleExpiryTime = Date.now() + durationSec * 1000;

  return {
    id: `sig_${Date.now()}_${pair.id}`,
    pairId: pair.id,
    pairName: pair.name,
    marketType: pair.isOtc ? 'OTC' : 'Real',
    broker: brokerName,
    timeframe,
    direction,
    entryPrice: pair.currentPrice,
    confidence,
    levels,
    createdAt: Date.now(),
    candleExpiryTime,
    tradeThreshold: 75,
    status: 'ACTIVE',
    message:
      direction === 'CALL'
        ? 'Upward move expected · enter on the next candle'
        : 'Downward move expected · enter on the next candle',
  };
}

export const INITIAL_SIGNAL_FEEDS: SignalData[] = [
  {
    id: 'sig_usd_dzd_live',
    pairId: 'USD_DZD_OTC',
    pairName: 'USD/DZD (OTC)',
    marketType: 'OTC',
    broker: 'Quotex',
    timeframe: '1m',
    direction: 'CALL',
    entryPrice: 255.45,
    confidence: 85,
    levels: {
      resistance: 'No clear r...',
      support: 255.0,
      priceZonePercent: 68,
      trend: 'Uptrend',
      pattern: 'Bullish Continuation',
      rsi: 62,
      macd: 'Bullish Cross',
      bollingerState: 'Expanding',
      stochastic: 74,
      confidence: 85,
    },
    createdAt: Date.now() - 60000,
    candleExpiryTime: Date.now() - 5000,
    tradeThreshold: 75,
    status: 'ACTIVE',
    message: 'Upward move expected · enter on the next candle',
  },
  {
    id: 'sig_eur_usd_live',
    pairId: 'EUR_USD_OTC',
    pairName: 'EUR/USD (OTC)',
    marketType: 'OTC',
    broker: 'Quotex',
    timeframe: '1m',
    direction: 'PUT',
    entryPrice: 1.0842,
    confidence: 89,
    levels: {
      resistance: 1.0846,
      support: 1.0837,
      priceZonePercent: 32,
      trend: 'Downtrend',
      pattern: 'Bearish Engulfing',
      rsi: 38,
      macd: 'Bearish Cross',
      bollingerState: 'Expanding',
      stochastic: 28,
      confidence: 89,
    },
    createdAt: Date.now() - 25000,
    candleExpiryTime: Date.now() + 35000,
    tradeThreshold: 75,
    status: 'ACTIVE',
    message: 'Downward move expected · enter on the next candle',
  },
  {
    id: 'sig_usd_bdt_live',
    pairId: 'USD_BDT_OTC',
    pairName: 'USD/BDT (OTC)',
    marketType: 'OTC',
    broker: 'Quotex',
    timeframe: '1m',
    direction: 'CALL',
    entryPrice: 122.35,
    confidence: 93,
    levels: {
      resistance: 'Breakout Level',
      support: 122.0,
      priceZonePercent: 82,
      trend: 'Strong Bullish',
      pattern: 'Hammer Reversal',
      rsi: 68,
      macd: 'Bullish Cross',
      bollingerState: 'Upper Break',
      stochastic: 81,
      confidence: 93,
    },
    createdAt: Date.now() - 32000,
    candleExpiryTime: Date.now() + 28000,
    tradeThreshold: 75,
    status: 'ACTIVE',
    message: 'Upward move expected · enter on the next candle',
  },
  {
    id: 'sig_gbp_usd_live',
    pairId: 'GBP_USD_OTC',
    pairName: 'GBP/USD (OTC)',
    marketType: 'OTC',
    broker: 'Quotex',
    timeframe: '1m',
    direction: 'PUT',
    entryPrice: 1.2985,
    confidence: 87,
    levels: {
      resistance: 1.2995,
      support: 1.297,
      priceZonePercent: 28,
      trend: 'Downtrend',
      pattern: 'Shooting Star Reversal',
      rsi: 41,
      macd: 'Bearish Cross',
      bollingerState: 'Expanding',
      stochastic: 32,
      confidence: 87,
    },
    createdAt: Date.now() - 40000,
    candleExpiryTime: Date.now() + 20000,
    tradeThreshold: 75,
    status: 'ACTIVE',
    message: 'Downward move expected · enter on the next candle',
  },
];
