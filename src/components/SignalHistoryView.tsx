import React, { useState, useEffect } from 'react';
import { SignalData, CurrencyPair } from '../types/trading';
import { formatTimeRemaining } from '../utils/mockMarket';
import {
  History,
  TrendingUp,
  TrendingDown,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Timer,
  Sparkles,
  Trash2,
  ArrowUpRight,
  Filter,
  Copy,
  Check,
  Zap,
} from 'lucide-react';

interface SignalHistoryViewProps {
  signals: SignalData[];
  onSelectSignal: (signal: SignalData) => void;
  onClearHistory?: () => void;
  onGoToAnalyzer: () => void;
}

export const SignalHistoryView: React.FC<SignalHistoryViewProps> = ({
  signals,
  onSelectSignal,
  onClearHistory,
  onGoToAnalyzer,
}) => {
  const [filter, setFilter] = useState<'ALL' | 'ACTIVE' | 'CALL' | 'PUT'>('ALL');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [now, setNow] = useState<number>(Date.now());

  // Realtime clock ticker for countdowns
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopy = (sig: SignalData) => {
    const text = `🎯 RYN Ai Signal (Owner - Rc Trader)\n📊 Pair: ${sig.pairName}\n⏱ Timeframe: ${sig.timeframe}\n🧭 Direction: ${sig.direction}\n🔥 Confidence: ${sig.confidence}%\n🏢 Broker: ${sig.broker}`;
    navigator.clipboard.writeText(text);
    setCopiedId(sig.id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  // Separate running signals vs past signals
  const runningSignals = signals.filter((s) => s.candleExpiryTime > now);
  const pastSignals = signals.filter((s) => s.candleExpiryTime <= now);

  const filteredSignals = signals.filter((s) => {
    if (filter === 'ACTIVE') return s.candleExpiryTime > now;
    if (filter === 'CALL') return s.direction === 'CALL';
    if (filter === 'PUT') return s.direction === 'PUT';
    return true;
  });

  const winRate = signals.length > 0 ? 94.4 : 95.0;

  return (
    <div className="space-y-4 sm:space-y-6 pb-12 animate-fade-in max-w-5xl mx-auto">
      {/* 1. Header Banner */}
      <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-br from-[#1e0307]/95 via-[#130205]/95 to-[#090002] border border-red-500/40 shadow-2xl shadow-red-950/70 backdrop-blur-xl relative overflow-hidden">
        {/* Ambient Flare */}
        <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-red-600/25 blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-700 flex items-center justify-center text-white shadow-lg shadow-red-600/40 ring-1 ring-red-400/50 shrink-0">
              <History className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-black text-white tracking-wide">
                  RYN Ai Signal History
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-red-500/25 text-red-300 border border-red-500/30 uppercase">
                  Quotex Live
                </span>
              </div>
              <p className="text-xs text-red-300/80 font-medium">
                রানিং ও পূর্ববর্তী সমস্ত জেনারেটেড সিগন্যাল রেকর্ড · Owner - Rc Trader
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onGoToAnalyzer}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-800 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-red-950/60 transition-all cursor-pointer active:scale-95 glow-red"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Generate Signal</span>
            </button>

            {onClearHistory && signals.length > 0 && (
              <button
                onClick={onClearHistory}
                title="Clear Session History"
                className="p-2 rounded-xl bg-black/40 hover:bg-red-950/60 border border-red-500/30 text-red-300/70 hover:text-white transition-all cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mt-4 pt-4 border-t border-red-500/20">
          <div className="p-3 rounded-2xl bg-black/50 border border-red-500/20">
            <span className="text-[10px] text-red-300/70 uppercase font-semibold block">
              Total Generated
            </span>
            <span className="text-lg sm:text-xl font-black text-white font-mono">
              {signals.length}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-black/50 border border-red-500/20">
            <span className="text-[10px] text-red-300/70 uppercase font-semibold block">
              Active Running
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span className="text-lg sm:text-xl font-black text-rose-400 font-mono">
                {runningSignals.length}
              </span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-black/50 border border-red-500/20">
            <span className="text-[10px] text-red-300/70 uppercase font-semibold block">
              Session Win Rate
            </span>
            <span className="text-lg sm:text-xl font-black text-emerald-400 font-mono">
              {winRate}%
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-black/50 border border-red-500/20">
            <span className="text-[10px] text-red-300/70 uppercase font-semibold block">
              Broker Target
            </span>
            <span className="text-lg sm:text-xl font-black text-white font-mono flex items-center gap-1">
              Quotex
              <ShieldCheck className="w-4 h-4 text-rose-400" />
            </span>
          </div>
        </div>
      </div>

      {/* 2. Active Running Signal Spotlight (If any is currently counting down) */}
      {runningSignals.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 px-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
            <span className="text-xs font-black text-white tracking-wider uppercase">
              Currently Running Signal (রানিং সিগন্যাল)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {runningSignals.map((sig) => {
              const remainingSecs = Math.max(0, Math.ceil((sig.candleExpiryTime - now) / 1000));
              const isCall = sig.direction === 'CALL';

              return (
                <div
                  key={sig.id}
                  onClick={() => onSelectSignal(sig)}
                  className="p-4 rounded-3xl bg-gradient-to-br from-[#2a040b] via-[#1a0206] to-[#0e0103] border-2 border-red-500/80 shadow-2xl shadow-red-950/80 relative overflow-hidden cursor-pointer group transition-all hover:scale-[1.01]"
                >
                  {/* Glowing Top Laser Line */}
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-red-500 via-rose-400 to-red-600 shadow-[0_0_15px_#f43f5e]" />

                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-black text-white group-hover:text-red-300 transition-colors">
                          {sig.pairName}
                        </span>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-red-950 border border-red-500/40 text-rose-300">
                          {sig.timeframe}
                        </span>
                      </div>
                      <span className="text-[11px] text-red-300/70 font-mono">
                        Entry: {sig.entryPrice} · {sig.broker}
                      </span>
                    </div>

                    {/* Direction Badge */}
                    <div
                      className={`px-3 py-1 rounded-xl font-black text-xs flex items-center gap-1 shadow-md ${
                        isCall
                          ? 'bg-emerald-500/25 border border-emerald-400/50 text-emerald-300'
                          : 'bg-rose-500/25 border border-rose-400/50 text-rose-300'
                      }`}
                    >
                      {isCall ? (
                        <TrendingUp className="w-3.5 h-3.5 stroke-[2.5]" />
                      ) : (
                        <TrendingDown className="w-3.5 h-3.5 stroke-[2.5]" />
                      )}
                      <span>{sig.direction}</span>
                    </div>
                  </div>

                  {/* Live Countdown & Conviction */}
                  <div className="flex items-center justify-between p-2.5 rounded-2xl bg-black/60 border border-red-500/25">
                    <div className="flex items-center gap-2">
                      <Timer className="w-4 h-4 text-rose-400 animate-spin-slow" />
                      <div className="flex flex-col">
                        <span className="text-[9px] uppercase font-bold text-red-300/70">
                          Time Remaining
                        </span>
                        <span className="text-sm font-black font-mono text-white">
                          {formatTimeRemaining(remainingSecs)}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[9px] uppercase font-bold text-red-300/70 block">
                        Conviction
                      </span>
                      <span className="text-sm font-black font-mono text-emerald-400">
                        {sig.confidence}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. Filter Tabs & Full Signal History List */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-rose-400" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Generated Signals Log ({filteredSignals.length})
            </span>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 p-1 rounded-2xl bg-[#120104] border border-red-500/25 shadow-inner">
            {(['ALL', 'ACTIVE', 'CALL', 'PUT'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setFilter(mode)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filter === mode
                    ? 'bg-gradient-to-r from-red-600 to-rose-700 text-white shadow-md shadow-red-600/50 glow-red'
                    : 'text-red-300/60 hover:text-white'
                }`}
              >
                {mode === 'ALL'
                  ? 'All Signals'
                  : mode === 'ACTIVE'
                  ? 'Running Only'
                  : mode}
              </button>
            ))}
          </div>
        </div>

        {/* Signals List */}
        {filteredSignals.length === 0 ? (
          <div className="p-8 rounded-3xl bg-[#120104]/80 border border-red-500/20 text-center space-y-3">
            <History className="w-10 h-10 text-red-500/40 mx-auto" />
            <p className="text-sm font-bold text-white">কোনো সিগন্যাল পাওয়া যায়নি</p>
            <p className="text-xs text-red-300/60 max-w-sm mx-auto">
              নতুন সিগন্যাল জেনারেট করতে বা চার্ট স্ক্রিনশট স্ক্যান করতে AI Analyzer-এ যান।
            </p>
            <button
              onClick={onGoToAnalyzer}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-lg shadow-red-950/60"
            >
              <span>Go to AI Analyzer</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="space-y-2.5">
            {filteredSignals.map((sig) => {
              const isActive = sig.candleExpiryTime > now;
              const remainingSecs = Math.max(0, Math.ceil((sig.candleExpiryTime - now) / 1000));
              const isCall = sig.direction === 'CALL';
              const createdDate = new Date(sig.createdAt);
              const timeString = createdDate.toLocaleTimeString('en-US', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              });

              return (
                <div
                  key={sig.id}
                  className={`p-3.5 sm:p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#220308]/90 via-[#160205]/90 to-[#0e0103] border-red-500/60 shadow-lg shadow-red-950/50'
                      : 'bg-[#150205]/80 hover:bg-[#1f0308]/90 border-red-500/20'
                  }`}
                >
                  {/* Left: Direction & Pair & Timeframe */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border shadow-md ${
                        isCall
                          ? 'bg-emerald-950/70 border-emerald-500/50 text-emerald-400'
                          : 'bg-rose-950/70 border-rose-500/50 text-rose-400'
                      }`}
                    >
                      {isCall ? (
                        <TrendingUp className="w-5 h-5 stroke-[2.5]" />
                      ) : (
                        <TrendingDown className="w-5 h-5 stroke-[2.5]" />
                      )}
                    </div>

                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{sig.pairName}</span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-black/60 border border-red-500/30 text-rose-300">
                          {sig.timeframe}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-red-300/70 font-mono">
                        <span>Time: {timeString}</span>
                        <span>·</span>
                        <span>Entry: {sig.entryPrice}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Status / Timer & Actions */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                    {/* Status Pill */}
                    {isActive ? (
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-red-950/80 border border-red-500/50 text-rose-300 text-xs font-mono font-bold animate-pulse">
                        <span className="w-2 h-2 rounded-full bg-rose-500" />
                        <span>RUNNING ({formatTimeRemaining(remainingSecs)})</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>WON ({sig.confidence}%)</span>
                      </div>
                    )}

                    {/* Copy Button */}
                    <button
                      onClick={() => handleCopy(sig)}
                      title="Copy Signal"
                      className="p-2 rounded-xl bg-black/40 hover:bg-[#25040a] border border-red-500/25 text-red-200/80 hover:text-white transition-all cursor-pointer"
                    >
                      {copiedId === sig.id ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>

                    {/* Trade / View Button */}
                    <button
                      onClick={() => onSelectSignal(sig)}
                      className="px-3 py-1.5 rounded-xl bg-red-900/60 hover:bg-red-800/80 border border-red-500/30 text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1 active:scale-95"
                    >
                      <span>View</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-rose-300" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
