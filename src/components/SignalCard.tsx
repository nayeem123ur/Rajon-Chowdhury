import React, { useState, useEffect } from 'react';
import { SignalData, CurrencyPair, Timeframe } from '../types/trading';
import { TIMEFRAME_SECONDS, formatTimeRemaining } from '../utils/mockMarket';
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
  Scan,
  Camera,
  Lock,
  Timer,
  CheckCircle2,
  History,
  ChevronUp,
} from 'lucide-react';

interface SignalCardProps {
  signal: SignalData;
  pair: CurrencyPair;
  onOpenPairModal: () => void;
  onAnalyzeNext: () => void;
  onOpenScanner?: () => void;
  isAnalyzing: boolean;
  timeframe: Timeframe;
  onChangeTimeframe: (tf: Timeframe) => void;
  signalHistory?: SignalData[];
  onSelectHistorySignal?: (sig: SignalData) => void;
  onViewFullHistory?: () => void;
}

export const SignalCard: React.FC<SignalCardProps> = ({
  signal,
  pair,
  onOpenPairModal,
  onAnalyzeNext,
  onOpenScanner,
  isAnalyzing,
  timeframe,
  onChangeTimeframe,
  signalHistory,
  onSelectHistorySignal,
  onViewFullHistory,
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState<number>(() => {
    const diffMs = signal.candleExpiryTime - Date.now();
    return diffMs > 0 ? Math.ceil(diffMs / 1000) : 0;
  });
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

  // Accurate countdown timer based on timeframe candle expiry
  useEffect(() => {
    const updateCountdown = () => {
      const now = Date.now();
      const diffMs = signal.candleExpiryTime - now;
      if (diffMs <= 0) {
        setSecondsRemaining(0);
      } else {
        const secs = Math.ceil(diffMs / 1000);
        setSecondsRemaining(secs);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 250);
    return () => clearInterval(interval);
  }, [signal.candleExpiryTime]);

  const isSignalActive = secondsRemaining > 0;
  const isCall = signal.direction === 'CALL';

  const handleCopy = () => {
    const text = `🎯 RYN Ai Signal (Owner - Rc Trader)\n📊 ${signal.pairName}\n⏱ ${signal.timeframe}\n🧭 ${signal.direction}\n🔥 Confidence: ${signal.confidence}%\n🏢 ${signal.broker}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  // SVG circular progress calculation for Confidence Gauge
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (displayConfidence / 100) * circumference;

  // Next candle progress circle calculated exactly from total timeframe seconds
  const candleMaxSecs = TIMEFRAME_SECONDS[signal.timeframe] || 60;
  const candleProgress = Math.min(100, Math.max(0, ((candleMaxSecs - secondsRemaining) / candleMaxSecs) * 100));

  const timeframes: Timeframe[] = ['5s', '15s', '30s', '1m', '2m', '5m'];

  return (
    <div className="w-full rounded-[30px] bg-gradient-to-b from-[#1c0307]/95 via-[#130205]/98 to-[#0a0102] border border-red-600/35 shadow-2xl shadow-red-950/70 p-4 sm:p-6 backdrop-blur-2xl relative overflow-hidden transition-all">
      {/* Background ambient lighting - Blood Red Vampire Aura */}
      <div
        className={`absolute -top-32 -right-32 w-80 h-80 rounded-full blur-3xl opacity-30 pointer-events-none transition-all duration-1000 ${
          isCall ? 'bg-emerald-600' : 'bg-red-600'
        }`}
      />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full blur-3xl opacity-25 bg-rose-700 pointer-events-none" />

      {/* Top Header: Pair selector and live read badge */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 mb-4">
        {/* Pair Button */}
        <button
          onClick={onOpenPairModal}
          className="flex items-center gap-2.5 px-3 py-2 rounded-2xl bg-[#1d0307]/85 hover:bg-[#28050b] border border-red-500/30 transition-all group text-left cursor-pointer shadow-sm active:scale-98"
        >
          {/* Pair flags */}
          <div className="flex items-center -space-x-1.5 shrink-0">
            <span className="text-2xl leading-none filter drop-shadow">{pair.baseFlag}</span>
            <span className="text-2xl leading-none filter drop-shadow">{pair.quoteFlag}</span>
          </div>

          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="text-sm sm:text-base font-bold text-white tracking-wide group-hover:text-red-300 truncate">
                {pair.name}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-red-300/60 group-hover:text-white transition-transform shrink-0" />
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-red-300/70">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shrink-0" />
              <span className="truncate font-medium">Live read · {timeframe}</span>
            </div>
          </div>
        </button>

        {/* Timeframe pill selector with all standard binary options intervals */}
        <div className="flex items-center justify-between sm:justify-start gap-1 p-1 rounded-2xl bg-[#120104] border border-red-500/25 shadow-inner overflow-x-auto relative">
          {timeframes.map((tf) => (
            <button
              key={tf}
              disabled={isSignalActive && timeframe !== tf}
              onClick={() => {
                if (isSignalActive) return;
                onChangeTimeframe(tf);
              }}
              title={
                isSignalActive && timeframe !== tf
                  ? `Active ${timeframe} signal in progress (${formatTimeRemaining(secondsRemaining)} left). Wait for expiry.`
                  : `Select ${tf} timeframe`
              }
              className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all whitespace-nowrap ${
                timeframe === tf
                  ? 'bg-gradient-to-r from-red-600 to-rose-700 text-white shadow-md shadow-red-600/50 glow-red scale-100 cursor-default'
                  : isSignalActive
                  ? 'text-red-900/60 opacity-40 cursor-not-allowed'
                  : 'text-red-300/60 hover:text-white cursor-pointer active:scale-95'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Central Hero Option Box with Dynamic Rotating Vampire Blood Red Border Animation around 4 sides */}
      <div
        className={`w-full rounded-2xl p-[2px] mb-4 sm:mb-5 transition-all duration-700 relative overflow-hidden ${
          isAnalyzing
            ? 'shadow-[0_0_40px_rgba(255,23,68,0.7),0_0_80px_rgba(220,38,38,0.5)]'
            : isCall
            ? 'shadow-[0_0_30px_rgba(16,185,129,0.35)]'
            : 'shadow-[0_0_35px_rgba(239,68,68,0.5)]'
        }`}
      >
        {/* Continuous Dynamic Blood-Red Rotating Gradient Beam around all 4 sides */}
        <div className="absolute -inset-[200%] pointer-events-none flex items-center justify-center">
          <div
            className={`w-[400%] h-[400%] ${
              isAnalyzing ? 'animate-border-rotate-fast' : 'animate-border-rotate'
            }`}
            style={{
              background:
                'conic-gradient(from 0deg, #ff0033, #dc2626, #7f1d1d, #ff1744, #991b1b, #ef4444, #b91c1c, #ff0033)',
            }}
          />
        </div>

        {/* Inner Card Content Container */}
        <div
          className={`w-full rounded-[14px] p-4 sm:p-6 relative z-10 overflow-hidden transition-colors duration-700 ${
            isCall
              ? 'bg-gradient-to-br from-[#120407]/95 via-[#0d0205]/92 to-[#090103]/95 border border-emerald-500/30'
              : 'bg-gradient-to-br from-[#2a040a]/95 via-[#1d0206]/92 to-[#120103]/95 border border-rose-500/40'
          }`}
        >
          {/* Holographic Laser Sweep Effect when scanning */}
          {isAnalyzing && (
            <div className="absolute inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-cyan-300 to-transparent animate-laser z-20 shadow-[0_0_20px_#22d3ee]" />
          )}

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto">
              {/* Luminous Circular Action Icon */}
              <div className="relative shrink-0">
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center border-2 shadow-2xl transition-all duration-500 ${
                    isCall
                      ? 'border-emerald-400/80 bg-gradient-to-tr from-emerald-950 via-emerald-800 to-emerald-600 shadow-emerald-500/40'
                      : 'border-rose-400/80 bg-gradient-to-tr from-rose-950 via-rose-800 to-rose-600 shadow-rose-500/40'
                  }`}
                >
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

            {/* Candle countdown timer & copy action */}
            <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2.5 pt-2.5 sm:pt-0 border-t sm:border-t-0 border-white/10 shrink-0">
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl backdrop-blur-md border font-mono text-xs sm:text-sm font-bold shadow-inner transition-all ${
                  isSignalActive
                    ? 'bg-amber-950/40 border-amber-500/40 text-amber-300'
                    : 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400'
                }`}
              >
                <div className="relative w-4 h-4 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="stroke-slate-700/60"
                      strokeWidth="4"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className={`${
                        isSignalActive ? 'stroke-amber-400' : 'stroke-emerald-400'
                      } transition-all duration-300 ease-linear`}
                      strokeWidth="4"
                      strokeDasharray={`${candleProgress}, 100`}
                      strokeLinecap="round"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                </div>
                <span>
                  {isSignalActive ? formatTimeRemaining(secondsRemaining) : '00:00 (EXPIRED)'}
                </span>
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
      </div>

      {/* Two-Column Core Metrics: Confidence & Key Levels (Vampire Blood Red Edition) */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-4 mb-3 sm:mb-4">
        {/* Card 1: CONFIDENCE */}
        <div className="rounded-2xl bg-[#170206]/90 border border-red-500/30 p-3 sm:p-5 flex flex-col items-center justify-between text-center relative overflow-hidden shadow-inner group">
          <div className="w-full flex items-center justify-between text-[10px] sm:text-[11px] font-bold text-red-300/70 tracking-wider uppercase mb-1">
            <span>CONFIDENCE</span>
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-rose-400 animate-spin-slow shrink-0" />
          </div>

          <div className="relative w-20 h-20 sm:w-28 sm:h-28 my-1 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90 filter drop-shadow-[0_0_12px_rgba(225,29,72,0.4)]" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="stroke-[#2c040b]"
                strokeWidth="7"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="stroke-rose-500 transition-all duration-700 ease-out"
                strokeWidth="7"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center font-mono">
              <span className="text-xl sm:text-2xl font-black text-white">{displayConfidence}%</span>
            </div>
          </div>

          <div className="mt-1 w-full">
            <p className="text-xs sm:text-sm font-bold text-rose-400 flex items-center justify-center gap-1 truncate">
              <span>High conviction</span>
            </p>
            <p className="text-[10px] sm:text-[11px] text-red-300/70 mt-0.5 font-medium truncate">
              Trade threshold {signal.tradeThreshold}%
            </p>
          </div>
        </div>

        {/* Card 2: KEY LEVELS Price Ladder */}
        <div className="rounded-2xl bg-[#170206]/90 border border-red-500/30 p-3 sm:p-5 flex flex-col justify-between shadow-inner">
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-bold text-red-300/70 tracking-wider uppercase mb-1">
            <span>KEY LEVELS</span>
            <BarChart2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-rose-400 shrink-0" />
          </div>

          <div className="flex items-center gap-2.5 sm:gap-4 py-1.5 sm:py-2">
            <div className="relative h-20 sm:h-24 w-1.5 rounded-full bg-slate-900 flex flex-col justify-between items-center py-0.5 shrink-0">
              <div className="w-2.5 sm:w-3 h-1 rounded-sm bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.9)]" />
              <div
                className="absolute w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-red-600/40 border border-red-400/60 flex items-center justify-center transition-all duration-700 shadow-[0_0_15px_rgba(239,68,68,0.7)]"
                style={{
                  top: `${100 - signal.levels.priceZonePercent}%`,
                  transform: 'translateY(-50%)',
                }}
              >
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white shadow-md shadow-white" />
              </div>
              <div className="w-2.5 sm:w-3 h-1 rounded-sm bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.9)]" />
            </div>

            <div className="flex flex-col justify-between h-20 sm:h-24 w-full min-w-0">
              <div>
                <span className="text-[9px] sm:text-[10px] font-bold tracking-wider text-emerald-400 uppercase block">
                  RESISTANCE
                </span>
                <span className="text-xs sm:text-sm font-mono font-bold text-white truncate block">
                  {signal.levels.resistance}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-[9px] sm:text-[10px] tracking-wider text-red-300/70 uppercase font-semibold">
                  ZONE
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono font-bold text-rose-300">
                  {signal.levels.priceZonePercent}%
                </span>
              </div>

              <div>
                <span className="text-[9px] sm:text-[10px] font-bold tracking-wider text-rose-400 uppercase block">
                  SUPPORT
                </span>
                <span className="text-xs sm:text-sm font-mono font-bold text-white truncate block">
                  {signal.levels.support}
                </span>
              </div>
            </div>
          </div>

          <div className="text-[10px] sm:text-[11px] text-red-300/70 text-right mt-1 font-mono truncate">
            <span>RSI: </span>
            <span className="font-bold text-white">
              {signal.levels.rsi} · {signal.levels.macd}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons: Auto-Analyzer with Strict Expiry Lock */}
      <div className="space-y-2.5">
        <button
          onClick={onAnalyzeNext}
          disabled={isAnalyzing || isSignalActive}
          className={`w-full py-3.5 sm:py-4 px-6 rounded-2xl font-black text-sm sm:text-base tracking-wider flex items-center justify-center gap-2.5 transition-all transform ${
            isAnalyzing
              ? 'bg-red-900/90 text-white cursor-wait opacity-90'
              : isSignalActive
              ? 'bg-[#180307] border border-red-500/40 text-red-200 cursor-not-allowed shadow-inner select-none'
              : 'bg-gradient-to-r from-red-600 via-rose-600 to-red-800 hover:from-red-500 hover:to-rose-500 text-white shadow-xl shadow-red-950/70 glow-analyzer active:scale-[0.98] cursor-pointer'
          }`}
        >
          {isAnalyzing ? (
            <>
              <Activity className="w-5 h-5 animate-spin text-white" />
              <span>Analyzing Market...</span>
            </>
          ) : isSignalActive ? (
            <>
              <Lock className="w-5 h-5 text-rose-400 animate-pulse" />
              <div className="flex items-center gap-2">
                <span className="text-rose-300 font-bold">SIGNAL ACTIVE</span>
                <span className="text-white text-xs sm:text-sm font-mono bg-black/60 px-2.5 py-0.5 rounded-lg border border-red-500/40">
                  WAIT {formatTimeRemaining(secondsRemaining)}
                </span>
              </div>
            </>
          ) : (
            <>
              <Zap className="w-5 h-5 text-amber-300 fill-amber-300 animate-bounce" />
              <span>GENERATE NEXT SIGNAL</span>
            </>
          )}
        </button>

        {/* Informational lock banner during active candle */}
        {isSignalActive && (
          <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-red-950/40 border border-red-500/30 text-[11px] sm:text-xs text-red-200 text-center font-medium animate-pulse">
            <Lock className="w-3.5 h-3.5 shrink-0 text-rose-400" />
            <span>
              {signal.timeframe} Candle in progress · Next signal unlocks in{' '}
              <strong className="font-mono text-white underline font-bold">{formatTimeRemaining(secondsRemaining)}</strong>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
