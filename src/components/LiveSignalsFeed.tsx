import React from 'react';
import { SignalData } from '../types/trading';
import { Radio, ArrowUp, ArrowDown, Sparkles, Zap, Flame } from 'lucide-react';

interface LiveSignalsFeedProps {
  signals: SignalData[];
  onSelectSignal: (signal: SignalData) => void;
}

export const LiveSignalsFeed: React.FC<LiveSignalsFeedProps> = ({
  signals,
  onSelectSignal,
}) => {
  return (
    <div className="space-y-4">
      {/* Feed Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 sm:p-5 rounded-3xl bg-[#171638]/90 border border-violet-500/20 backdrop-blur-2xl shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              Live Signals Radar
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 animate-pulse">
                STREAMING
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Continuous multi-asset order flow & pattern detection
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-400">Win Rate:</span>
          <span className="px-2.5 py-1 rounded-xl bg-emerald-950/70 text-emerald-300 font-black border border-emerald-500/40 shadow-sm">
            94.2%
          </span>
        </div>
      </div>

      {/* Signals Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {signals.map((sig) => {
          const isCall = sig.direction === 'CALL';
          return (
            <div
              key={sig.id}
              className={`rounded-3xl p-4 sm:p-5 border transition-all duration-300 relative overflow-hidden backdrop-blur-xl ${
                isCall
                  ? 'bg-gradient-to-br from-[#0c2e22]/90 to-[#14132e]/95 border-emerald-500/30 hover:border-emerald-500/60 shadow-lg shadow-emerald-950/20'
                  : 'bg-gradient-to-br from-[#33111b]/90 to-[#14132e]/95 border-rose-500/30 hover:border-rose-500/60 shadow-lg shadow-rose-950/20'
              }`}
            >
              {/* Top Row: Pair & Confidence */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm sm:text-base font-bold text-white tracking-wide">{sig.pairName}</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-violet-950/70 text-violet-300 border border-violet-500/30">
                    {sig.marketType}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {sig.timeframe}
                  </span>
                </div>

                <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-black/40 border border-white/10 shadow-inner">
                  <Sparkles className="w-3 h-3 text-emerald-400" />
                  <span className="text-xs font-mono font-bold text-emerald-300">
                    {sig.confidence}%
                  </span>
                </div>
              </div>

              {/* Middle Row: Option direction banner */}
              <div className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-black/35 border border-white/5 mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center border transition-all ${
                      isCall
                        ? 'bg-emerald-500/25 border-emerald-400/50 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                        : 'bg-rose-500/25 border-rose-400/50 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.3)]'
                    }`}
                  >
                    {isCall ? (
                      <ArrowUp className="w-6 h-6 stroke-[3] animate-bounce" />
                    ) : (
                      <ArrowDown className="w-6 h-6 stroke-[3] animate-bounce" />
                    )}
                  </div>

                  <div>
                    <span
                      className={`text-xl font-black tracking-tight ${
                        isCall ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {sig.direction}
                    </span>
                    <span className="text-[11px] text-slate-400 block font-medium truncate">
                      {sig.levels.pattern}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">
                    Broker
                  </span>
                  <span className="text-xs font-bold text-white">{sig.broker}</span>
                </div>
              </div>

              {/* Levels & Action Button */}
              <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/5">
                <div className="text-[11px] text-slate-400 font-mono">
                  <span>Trend: </span>
                  <strong className="text-slate-200">{sig.levels.trend}</strong>
                  <span className="mx-1.5">·</span>
                  <span>RSI: </span>
                  <strong className="text-slate-200">{sig.levels.rsi}</strong>
                </div>

                <button
                  onClick={() => {
                    onSelectSignal(sig);
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-violet-600/90 hover:bg-violet-600 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-violet-600/30 cursor-pointer active:scale-95"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                  <span>Open</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
