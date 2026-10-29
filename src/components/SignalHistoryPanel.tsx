import React, { useState } from 'react';
import { SignalData, SignalDirection } from '../types/trading';
import { calculateHistoryStats } from '../utils/signalHistory';
import {
  History,
  TrendingUp,
  TrendingDown,
  ArrowUp,
  ArrowDown,
  Clock,
  Sparkles,
  Award,
  Trash2,
  Filter,
  CheckCircle2,
  Layers,
  Zap,
  Scan,
  RefreshCw,
  Search,
  ExternalLink,
  SlidersHorizontal,
} from 'lucide-react';

interface SignalHistoryPanelProps {
  history: SignalData[];
  onSelectSignal: (sig: SignalData) => void;
  onClearHistory: () => void;
  onBackToLive: () => void;
  activeSignalId?: string;
}

type FilterType = 'ALL' | 'CALL' | 'PUT' | 'WON' | 'SCANNER';

export const SignalHistoryPanel: React.FC<SignalHistoryPanelProps> = ({
  history,
  onSelectSignal,
  onClearHistory,
  onBackToLive,
  activeSignalId,
}) => {
  const [filter, setFilter] = useState<FilterType>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const stats = calculateHistoryStats(history);

  // Format timestamp nicely
  const formatTime = (timestamp?: number) => {
    if (!timestamp) return 'Just now';
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const getRelativeTime = (timestamp?: number) => {
    if (!timestamp) return 'Just now';
    const diffSecs = Math.floor((Date.now() - timestamp) / 1000);
    if (diffSecs < 60) return `${diffSecs}s ago`;
    const diffMins = Math.floor(diffSecs / 60);
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    return `${diffHours}h ago`;
  };

  // Filtered signals list
  const filteredSignals = history.filter((sig) => {
    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchPair = sig.pairName.toLowerCase().includes(q);
      const matchDir = sig.direction.toLowerCase().includes(q);
      const matchTf = sig.timeframe.toLowerCase().includes(q);
      if (!matchPair && !matchDir && !matchTf) return false;
    }

    // Category Filter
    if (filter === 'CALL') return sig.direction === 'CALL';
    if (filter === 'PUT') return sig.direction === 'PUT';
    if (filter === 'WON') return sig.status === 'WON';
    if (filter === 'SCANNER') return sig.source === 'Chart Vision Scanner';
    return true;
  });

  return (
    <div className="w-full space-y-4">
      {/* 1. Header Banner & Quick Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-[#140205]/90 border border-red-500/30 shadow-inner">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-rose-700 flex items-center justify-center text-white shadow-md shadow-red-950/60 shrink-0">
            <History className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-black text-white tracking-wide">
                সিগন্যাল হিস্টোরি (Signal History)
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/20 text-rose-300 border border-red-500/40 font-mono">
                {history.length} Saved
              </span>
            </div>
            <p className="text-[11px] text-red-300/70">
              আপনার জেনারেট করা সকল ট্রেড সিগন্যাল এখানে সংরক্ষিত আছে
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {history.length > 0 && (
            <button
              onClick={() => setShowClearConfirm(true)}
              className="px-2.5 py-1.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 text-red-300 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              title="Clear Saved History"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}

          <button
            onClick={onBackToLive}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-red-950/60 transition-all cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
            <span>লাইভ ইন্ডিকেটরে ফিরুন</span>
          </button>
        </div>
      </div>

      {/* Clear Confirmation Modal / Banner */}
      {showClearConfirm && (
        <div className="p-3.5 rounded-2xl bg-red-950/90 border border-red-500/50 shadow-xl flex items-center justify-between gap-3 text-xs animate-in fade-in slide-in-from-top-2">
          <span className="text-red-200 font-medium">
            আপনি কি নিশ্চিত যে সকল সংরক্ষিত সিগন্যাল হিস্টোরি ডিলিট করতে চান?
          </span>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                onClearHistory();
                setShowClearConfirm(false);
              }}
              className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold cursor-pointer"
            >
              হ্যাঁ, ডিলিট করুন
            </button>
            <button
              onClick={() => setShowClearConfirm(false)}
              className="px-2.5 py-1 rounded-lg bg-black/40 hover:bg-black/60 text-slate-300 cursor-pointer"
            >
              বাতিল
            </button>
          </div>
        </div>
      )}

      {/* 2. Key Statistics Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div className="p-3 rounded-2xl bg-[#170206]/90 border border-red-500/25 flex flex-col items-center justify-center text-center shadow-inner">
          <span className="text-[10px] uppercase font-bold text-red-300/70 tracking-wider">
            Total Generated
          </span>
          <span className="text-xl sm:text-2xl font-black text-white font-mono mt-0.5">
            {stats.total}
          </span>
          <span className="text-[10px] text-red-300/60">Saved Signals</span>
        </div>

        <div className="p-3 rounded-2xl bg-[#170206]/90 border border-red-500/25 flex flex-col items-center justify-center text-center shadow-inner">
          <span className="text-[10px] uppercase font-bold text-red-300/70 tracking-wider">
            Success Rate
          </span>
          <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono mt-0.5">
            {stats.winRate}%
          </span>
          <span className="text-[10px] text-emerald-300/70 font-semibold">
            {stats.won} Won · {stats.lost} Lost
          </span>
        </div>

        <div className="p-3 rounded-2xl bg-[#170206]/90 border border-red-500/25 flex flex-col items-center justify-center text-center shadow-inner">
          <span className="text-[10px] uppercase font-bold text-red-300/70 tracking-wider">
            CALL (UP)
          </span>
          <span className="text-xl sm:text-2xl font-black text-emerald-300 font-mono mt-0.5">
            {stats.callCount}
          </span>
          <span className="text-[10px] text-emerald-400/70 font-semibold">Bullish Feeds</span>
        </div>

        <div className="p-3 rounded-2xl bg-[#170206]/90 border border-red-500/25 flex flex-col items-center justify-center text-center shadow-inner">
          <span className="text-[10px] uppercase font-bold text-red-300/70 tracking-wider">
            PUT (DOWN)
          </span>
          <span className="text-xl sm:text-2xl font-black text-rose-400 font-mono mt-0.5">
            {stats.putCount}
          </span>
          <span className="text-[10px] text-rose-300/70 font-semibold">Bearish Feeds</span>
        </div>
      </div>

      {/* 3. Search Bar and Filter Pills */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-red-300/50" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search pair (e.g. USD, EUR), timeframe, or direction..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#120104] border border-red-500/25 text-white placeholder-red-300/40 text-xs focus:outline-none focus:border-red-500/70 font-medium"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 overflow-x-auto p-1 rounded-xl bg-[#120104] border border-red-500/25">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              filter === 'ALL'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-red-300/60 hover:text-white'
            }`}
          >
            All ({stats.total})
          </button>
          <button
            onClick={() => setFilter('CALL')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1 ${
              filter === 'CALL'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-emerald-400/70 hover:text-emerald-300'
            }`}
          >
            <ArrowUp className="w-3 h-3 stroke-[2.5]" />
            <span>CALL ({stats.callCount})</span>
          </button>
          <button
            onClick={() => setFilter('PUT')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1 ${
              filter === 'PUT'
                ? 'bg-rose-700 text-white shadow-sm'
                : 'text-rose-400/70 hover:text-rose-300'
            }`}
          >
            <ArrowDown className="w-3 h-3 stroke-[2.5]" />
            <span>PUT ({stats.putCount})</span>
          </button>
          <button
            onClick={() => setFilter('WON')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1 ${
              filter === 'WON'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-amber-400/70 hover:text-amber-300'
            }`}
          >
            <Award className="w-3 h-3" />
            <span>WON ({stats.won})</span>
          </button>
          <button
            onClick={() => setFilter('SCANNER')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1 ${
              filter === 'SCANNER'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-red-300/60 hover:text-white'
            }`}
          >
            <Scan className="w-3 h-3" />
            <span>Scans</span>
          </button>
        </div>
      </div>

      {/* 4. Signals History Cards List */}
      {filteredSignals.length === 0 ? (
        <div className="py-12 px-4 rounded-3xl bg-[#140205]/60 border border-red-500/20 text-center space-y-3">
          <div className="w-14 h-14 rounded-full bg-red-950/60 border border-red-500/30 flex items-center justify-center text-red-400 mx-auto">
            <History className="w-7 h-7 opacity-60" />
          </div>
          <h3 className="text-base font-bold text-white">
            কোনো সিগন্যাল হিস্টোরি পাওয়া যায়নি
          </h3>
          <p className="text-xs text-red-300/70 max-w-sm mx-auto">
            আপনি যখন 'GENERATE NEXT SIGNAL' বাটনে ক্লিক করবেন অথবা চার্ট স্ক্রিনশট স্ক্যান করবেন,
            প্রতিটি সিগন্যাল স্বয়ংক্রিয়ভাবে এখানে সেভ থাকবে।
          </p>
          <button
            onClick={onBackToLive}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 text-white font-bold text-xs shadow-md shadow-red-950/60 cursor-pointer"
          >
            সিগন্যাল জেনারেট করতে যান
          </button>
        </div>
      ) : (
        <div className="space-y-3 max-h-[580px] overflow-y-auto pr-1">
          {filteredSignals.map((item, idx) => {
            const isCall = item.direction === 'CALL';
            const isActive = item.id === activeSignalId;

            return (
              <div
                key={item.id || idx}
                className={`p-3.5 sm:p-4 rounded-2xl transition-all border relative overflow-hidden backdrop-blur-xl ${
                  isActive
                    ? 'bg-gradient-to-r from-[#2c050d] via-[#1c0307] to-[#120104] border-red-500 shadow-xl shadow-red-950/70 ring-1 ring-red-400/50'
                    : 'bg-[#150205]/90 hover:bg-[#1f0308] border-red-500/25 shadow-md shadow-black/40'
                }`}
              >
                {/* Active Indicator Pin */}
                {isActive && (
                  <div className="absolute top-0 right-0 px-2 py-0.5 rounded-bl-xl bg-red-600 text-white text-[9px] font-black uppercase tracking-wider">
                    CURRENT IN INDICATOR
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  {/* Left: Asset details & flags */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center -space-x-1.5 shrink-0 text-xl">
                      <span>{item.baseFlag || '🇺🇸'}</span>
                      <span>{item.quoteFlag || '🇪🇺'}</span>
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-sm sm:text-base font-bold text-white tracking-wide">
                          {item.pairName}
                        </span>
                        <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-black/60 border border-red-500/30 text-red-300 font-mono">
                          {item.timeframe}
                        </span>
                        <span className="px-2 py-0.5 rounded-lg text-[10px] font-semibold bg-red-950/50 text-red-300/80">
                          {item.broker || 'Quotex'}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mt-1 text-[11px] text-red-300/60 font-mono">
                        <Clock className="w-3 h-3 text-red-400/70" />
                        <span>{formatTime(item.createdAt)}</span>
                        <span>•</span>
                        <span>{getRelativeTime(item.createdAt)}</span>
                        {item.source && (
                          <>
                            <span>•</span>
                            <span className="text-rose-300 font-sans font-medium">
                              {item.source}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Middle / Right: Direction & Profit & Stats */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-red-500/20">
                    {/* Direction Badge */}
                    <div
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm tracking-wider uppercase border shadow-sm ${
                        isCall
                          ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300 shadow-emerald-950/50'
                          : 'bg-rose-950/80 border-rose-500/50 text-rose-300 shadow-rose-950/50'
                      }`}
                    >
                      {isCall ? (
                        <ArrowUp className="w-4 h-4 text-emerald-300 stroke-[3]" />
                      ) : (
                        <ArrowDown className="w-4 h-4 text-rose-300 stroke-[3]" />
                      )}
                      <span>{item.direction}</span>
                    </div>

                    {/* Result / Profit */}
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-1 text-emerald-400 text-xs sm:text-sm font-bold font-mono">
                        <Award className="w-3.5 h-3.5 text-amber-400" />
                        <span>{item.status === 'WON' ? 'WON' : 'SAVED'}</span>
                        <span className="text-[11px] font-semibold text-emerald-300">
                          {item.profit || '+91%'}
                        </span>
                      </div>
                      <span className="text-[10px] text-red-300/70 font-mono">
                        Conviction: {item.confidence}%
                      </span>
                    </div>

                    {/* Load in indicator button */}
                    <button
                      onClick={() => onSelectSignal(item)}
                      className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white text-xs font-bold transition-all shadow-md shadow-red-950/50 flex items-center gap-1 cursor-pointer active:scale-95"
                      title="Load this signal into the main indicator"
                    >
                      <Zap className="w-3 h-3 text-amber-300" />
                      <span className="hidden xs:inline">লোড করুন</span>
                    </button>
                  </div>
                </div>

                {/* Sub-bar: Technical Snapshot at signal creation */}
                {item.levels && (
                  <div className="mt-2.5 pt-2 border-t border-red-500/20 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] font-mono text-red-200/70">
                    <div className="flex items-center gap-1">
                      <span className="text-red-400/80 uppercase">RSI:</span>
                      <span className="text-white font-bold">{item.levels.rsi}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-red-400/80 uppercase">MACD:</span>
                      <span className="text-white font-bold truncate">{item.levels.macd}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-red-400/80 uppercase">TREND:</span>
                      <span className="text-white font-bold truncate">{item.levels.trend}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-red-400/80 uppercase">SUPPORT:</span>
                      <span className="text-white font-bold truncate">
                        {item.levels.support}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
