import React, { useState, useEffect } from 'react';
import { SignalData, CurrencyPair, Timeframe } from '../types/trading';
import { sound } from '../utils/sound';
import {
  TrendingUp,
  TrendingDown,
  ArrowUp,
  ArrowDown,
  Activity,
  Layers,
  ChevronDown,
  Clock,
  Sparkles,
  Zap,
  BarChart2,
  Copy,
  Check,
} from 'lucide-react';

interface SignalCardProps {
  signal: SignalData;
  pair: CurrencyPair;
  onOpenPairModal: () => void;
  onAnalyzeNext: () => void;
  isAnalyzing: boolean;
  timeframe: Timeframe;
  onChangeTimeframe: (tf: Timeframe) => void;
}

export const SignalCard: React.FC<SignalCardProps> = ({
  signal,
  pair,
  onOpenPairModal,
  onAnalyzeNext,
  isAnalyzing,
  timeframe,
  onChangeTimeframe,
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState<number>(30);
  const [copied, setCopied] = useState(false);
  const [displayConfidence, setDisplayConfidence] = useState<number>(signal.confidence);

  // Animated confidence number count-up effect
  useEffect(() => {
    setDisplayConfidence(0);
    const start = 0;
    const end = signal.confidence;
    const duration = 800; // ms
    const stepTime = 16;
    const totalSteps = duration / stepTime;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const current = Math.min(end, Math.round((step / totalSteps) * end));
      setDisplayConfidence(current);
      if (step >= totalSteps) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [signal.id, signal.confidence]);

  // Countdown timer for next candle entry
  useEffect(() => {
    const updateCountdown = () => {
      const now = Date.now();
      const diffMs = signal.candleExpiryTime - now;
      if (diffMs <= 0) {
        setSecondsRemaining(60);
      } else {
        const secs = Math.ceil(diffMs / 1000) % 60;
        setSecondsRemaining(secs === 0 ? 60 : secs);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [signal.candleExpiryTime]);

  const isCall = signal.direction === 'CALL';

  const handleCopy = () => {
    sound.playClick();
    const text = `🎯 Rajon Chowdhury Signal\n📊 ${signal.pairName}\n⏱ ${signal.timeframe}\n🧭 ${signal.direction}\n🔥 Confidence: ${signal.confidence}%\n🏢 ${signal.broker}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  // SVG circular progress calculation for Confidence Gauge
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (displayConfidence / 100) * circumference;

  // Next candle progress circle
  const candleMaxSecs = 60;
  const candleProgress = ((candleMaxSecs - secondsRemaining) / candleMaxSecs) * 100;

  const timeframes: Timeframe[] = ['5s', '15s', '30s', '1m', '2m', '5m'];

  return (
    <div className="w-full rounded-[30px] bg-gradient-to-b from-[#1b193d]/95 via-[#13122c]/98 to-[#0d0c22] border border-violet-500/25 shadow-2xl p-4 sm:p-6 backdrop-blur-2xl relative overflow-hidden transition-all">
      {/* Background ambient lighting */}
      <div
        className={`absolute -top-32 -right-32 w-80 h-80 rounded-full blur-3xl opacity-25 pointer-events-none transition-all duration-1000 ${
          isCall ? 'bg-emerald-500' : 'bg-rose-500'
        }`}
      />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full blur-3xl opacity-20 bg-violet-600 pointer-events-none" />

      {/* Top Header: Pair selector and live read badge */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 mb-4">
        {/* Pair Button */}
        <button
          onClick={() => {
            sound.playClick();
            onOpenPairModal();
          }}
          className="flex items-center gap-2.5 px-3 py-2 rounded-2xl bg-[#201e46]/80 hover:bg-[#292758] border border-violet-500/30 transition-all group text-left cursor-pointer shadow-sm active:scale-98"
        >
          {/* Pair flags */}
          <div className="flex items-center -space-x-1.5 shrink-0">
            <span className="text-2xl leading-none filter drop-shadow">{pair.baseFlag}</span>
            <span className="text-2xl leading-none filter drop-shadow">{pair.quoteFlag}</span>
          </div>

          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="text-sm sm:text-base font-bold text-white tracking-wide group-hover:text-violet-300 truncate">
                {pair.name}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-transform shrink-0" />
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="truncate font-medium">Live read · {timeframe}</span>
            </div>
          </div>
        </button>

        {/* Timeframe pill selector with all standard binary options intervals */}
        <div className="flex items-center justify-between sm:justify-start gap-1 p-1 rounded-2xl bg-[#14132e] border border-violet-500/20 shadow-inner overflow-x-auto">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => {
                sound.playClick();
                onChangeTimeframe(tf);
              }}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                timeframe === tf
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-600/40 glow-purple scale-100'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Central Hero Option Box (Exact match to screenshot with Premier Laser Scan Animation) */}
      <div
        className={`w-full rounded-2xl p-4 sm:p-6 mb-4 sm:mb-5 transition-all duration-700 relative overflow-hidden border ${
          isCall
            ? 'bg-gradient-to-br from-[#093526]/90 via-[#0b271f]/85 to-[#0d1d24]/90 border-emerald-500/40 glow-call'
            : 'bg-gradient-to-br from-[#3d111c]/90 via-[#2c0c14]/85 to-[#1d0d24]/90 border-rose-500/40 glow-put'
        }`}
      >
        {/* Holographic Laser Sweep Effect when scanning */}
        {isAnalyzing && (
          <div className="absolute inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-cyan-300 to-transparent animate-laser z-20 shadow-[0_0_15px_#22d3ee]" />
        )}

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto">
            {/* Luminous Circular Action Icon matching screenshot with animated beacon ring */}
            <div className="relative shrink-0">
              <div
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center border-2 shadow-2xl transition-all duration-500 ${
                  isCall
                    ? 'border-emerald-400/80 bg-gradient-to-tr from-emerald-950 via-emerald-800 to-emerald-600 shadow-emerald-500/40'
                    : 'border-rose-400/80 bg-gradient-to-tr from-rose-950 via-rose-800 to-rose-600 shadow-rose-500/40'
                }`}
              >
                {/* Nested inner circle icon */}
                <div
                  className={`w-11 h-11 sm:w-14 sm:h-14 rounded-full flex items-center justify-center border transition-all ${
                    isCall
                      ? 'border-emerald-300/60 bg-emerald-500/25 shadow-inner'
                      : 'border-rose-300/60 bg-rose-500/25 shadow-inner'
                  }`}
                >
                  {isCall ? (
                    <ArrowUp className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-300 stroke-[2.8] animate-bounce" />
                  ) : (
                    <ArrowDown className="w-7 h-7 sm:w-8 sm:h-8 text-rose-300 stroke-[2.8] animate-bounce" />
                  )}
                </div>
              </div>

              {/* Pulsing beacon radar */}
              <div
                className={`absolute inset-0 rounded-full animate-ping opacity-25 pointer-events-none ${
                  isCall ? 'bg-emerald-400' : 'bg-rose-400'
                }`}
              />
            </div>

            {/* Typography */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span
                  className={`w-4 h-0.5 rounded-full ${
                    isCall ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-rose-400 shadow-[0_0_8px_#fb7185]'
                  }`}
                />
                <span className="text-[10px] sm:text-xs font-bold tracking-wider text-slate-300 uppercase">
                  PLACE OPTION
                </span>
              </div>
              <h1
                className={`text-4xl sm:text-5xl font-black tracking-tight leading-none mt-1 ${
                  isCall
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-100 via-emerald-300 to-teal-200 drop-shadow-[0_0_25px_rgba(16,185,129,0.4)]'
                    : 'text-transparent bg-clip-text bg-gradient-to-r from-rose-100 via-rose-300 to-red-200 drop-shadow-[0_0_25px_rgba(244,63,94,0.4)]'
                }`}
              >
                {signal.direction}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 font-medium leading-tight">
                {signal.message}
              </p>
            </div>
          </div>

          {/* Candle countdown timer & copy action with animated radial indicator */}
          <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2.5 pt-2.5 sm:pt-0 border-t sm:border-t-0 border-white/10 shrink-0">
            {/* Countdown Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/45 backdrop-blur-md border border-white/10 text-white font-mono text-xs sm:text-sm font-bold shadow-inner">
              <div className="relative w-4 h-4 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="stroke-slate-700"
                    strokeWidth="4"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="stroke-violet-400 transition-all duration-1000 ease-linear"
                    strokeWidth="4"
                    strokeDasharray={`${candleProgress}, 100`}
                    strokeLinecap="round"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
              </div>
              <span>00:{secondsRemaining < 10 ? `0${secondsRemaining}` : secondsRemaining}s</span>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-slate-200 text-xs font-semibold transition-all cursor-pointer border border-white/5"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300 font-bold">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-300" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Two-Column Core Metrics: Confidence & Key Levels (Exact match to screenshot) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
        {/* Card 1: CONFIDENCE with animated SVG ring */}
        <div className="rounded-2xl bg-[#171638]/90 border border-violet-500/20 p-4 sm:p-5 flex flex-col items-center justify-between text-center relative overflow-hidden shadow-inner group">
          <div className="w-full flex items-center justify-between text-[11px] font-bold text-slate-400 tracking-wider uppercase mb-1">
            <span>CONFIDENCE</span>
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-spin-slow" />
          </div>

          {/* SVG Circular Progress Ring matching screenshot */}
          <div className="relative w-28 h-28 my-1 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90 filter drop-shadow-[0_0_12px_rgba(16,185,129,0.3)]" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="stroke-[#25244f]"
                strokeWidth="7"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="stroke-emerald-400 transition-all duration-700 ease-out"
                strokeWidth="7"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center font-mono">
              <span className="text-2xl font-black text-white">{displayConfidence}%</span>
            </div>
          </div>

          <div className="mt-1">
            <p className="text-xs sm:text-sm font-bold text-emerald-400 flex items-center justify-center gap-1">
              <span>High conviction</span>
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5 font-medium">
              Trade threshold {signal.tradeThreshold}%
            </p>
          </div>
        </div>

        {/* Card 2: KEY LEVELS Price Ladder (Exact match to screenshot) */}
        <div className="rounded-2xl bg-[#171638]/90 border border-violet-500/20 p-4 sm:p-5 flex flex-col justify-between shadow-inner">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 tracking-wider uppercase mb-1">
            <span>KEY LEVELS</span>
            <BarChart2 className="w-3.5 h-3.5 text-violet-400" />
          </div>

          {/* Vertical ladder gauge with glowing dot */}
          <div className="flex items-center gap-4 py-2">
            <div className="relative h-24 w-1.5 rounded-full bg-slate-800 flex flex-col justify-between items-center py-0.5 shrink-0">
              <div className="w-3 h-1 rounded-sm bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.9)]" />
              {/* Glowing translucent circle + solid center dot matching screenshot */}
              <div
                className="absolute w-6 h-6 rounded-full bg-violet-600/35 border border-violet-400/40 flex items-center justify-center transition-all duration-700 shadow-[0_0_15px_rgba(139,92,246,0.6)]"
                style={{
                  top: `${100 - signal.levels.priceZonePercent}%`,
                  transform: 'translateY(-50%)',
                }}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-white shadow-md shadow-white" />
              </div>
              <div className="w-3 h-1 rounded-sm bg-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.9)]" />
            </div>

            {/* Labels beside ladder */}
            <div className="flex flex-col justify-between h-24 w-full">
              {/* Resistance */}
              <div>
                <span className="text-[10px] font-bold tracking-wider text-emerald-400 uppercase block">
                  RESISTANCE
                </span>
                <span className="text-sm font-mono font-bold text-white truncate block">
                  {signal.levels.resistance}
                </span>
              </div>

              {/* Price Zone */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] tracking-wider text-slate-400 uppercase font-semibold">
                  PRICE ZONE
                </span>
                <span className="text-[10px] font-mono font-bold text-violet-300">
                  {signal.levels.priceZonePercent}%
                </span>
              </div>

              {/* Support */}
              <div>
                <span className="text-[10px] font-bold tracking-wider text-rose-400 uppercase block">
                  SUPPORT
                </span>
                <span className="text-sm font-mono font-bold text-white block">
                  {signal.levels.support}
                </span>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 text-right mt-1 font-mono">
            <span>RSI(14): </span>
            <span className="font-bold text-slate-200">
              {signal.levels.rsi} · {signal.levels.macd}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Indicators Row: TREND and PATTERN (Exact match to screenshot) */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4">
        {/* Trend */}
        <div className="rounded-2xl bg-[#171638]/90 border border-violet-500/20 p-3 sm:p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-950/60 border border-violet-500/30 flex items-center justify-center text-violet-300 shrink-0">
            {isCall ? (
              <TrendingUp className="w-5 h-5 text-emerald-400" />
            ) : (
              <TrendingDown className="w-5 h-5 text-rose-400" />
            )}
          </div>
          <div className="flex flex-col truncate">
            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              TREND
            </span>
            <span className="text-xs sm:text-sm font-bold text-white truncate">
              {signal.levels.trend}
            </span>
          </div>
        </div>

        {/* Pattern */}
        <div className="rounded-2xl bg-[#171638]/90 border border-violet-500/20 p-3 sm:p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-950/60 border border-violet-500/30 flex items-center justify-center text-violet-300 shrink-0">
            <Layers className="w-5 h-5 text-violet-300" />
          </div>
          <div className="flex flex-col truncate">
            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              PATTERN
            </span>
            <span className="text-xs sm:text-sm font-bold text-white truncate">
              {signal.levels.pattern}
            </span>
          </div>
        </div>
      </div>

      {/* Motion Graphics Action Trigger */}
      <button
        onClick={() => {
          sound.playScanBeep();
          onAnalyzeNext();
        }}
        disabled={isAnalyzing}
        className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-extrabold text-sm sm:text-base tracking-wide shadow-xl shadow-violet-600/35 glow-analyzer flex items-center justify-center gap-2.5 transition-all transform active:scale-[0.98] disabled:opacity-75 cursor-pointer"
      >
        {isAnalyzing ? (
          <>
            <Activity className="w-5 h-5 animate-spin text-white" />
            <span>Scanning Orderbook & Candles...</span>
          </>
        ) : (
          <>
            <Zap className="w-5 h-5 text-amber-300 fill-amber-300 animate-bounce" />
            <span>ANALYZE MARKET & GET SIGNAL</span>
          </>
        )}
      </button>
    </div>
  );
};
