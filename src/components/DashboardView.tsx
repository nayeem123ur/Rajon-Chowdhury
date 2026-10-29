import React from 'react';
import {
  TrendingUp,
  CheckCircle2,
  XCircle,
  Zap,
  Send,
  Clock,
} from 'lucide-react';

import { SignalData } from '../types/trading';
import { calculateHistoryStats } from '../utils/signalHistory';

interface DashboardViewProps {
  onGoToAnalyzer: () => void;
  onOpenProfile: () => void;
  signalHistory?: SignalData[];
  onSelectSignal?: (sig: SignalData) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onGoToAnalyzer,
  onOpenProfile,
  signalHistory = [],
  onSelectSignal,
}) => {
  const stats = calculateHistoryStats(signalHistory);

  return (
    <div className="space-y-5">
      {/* Hero Welcome Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-red-950/80 via-[#200308]/80 to-[#100103] border border-red-500/40 p-5 sm:p-7 shadow-2xl shadow-red-950/60 overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 relative z-10">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <button
              onClick={onOpenProfile}
              className="relative shrink-0 group cursor-pointer"
            >
              <img
                src="/assets/aistudio/image_0a428df5.png"
                alt="RYN Ai - Owner: RC Trader"
                className="w-18 h-18 sm:w-22 sm:h-22 rounded-2xl object-cover ring-2 ring-red-500 shadow-2xl group-hover:scale-105 transition-transform"
              />
              <div className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-rose-600 text-white border-2 border-[#120104]">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            </button>

            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-xl sm:text-2xl font-black text-white">RYN Ai</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/20 text-rose-300 border border-red-500/40">
                  Owner - Rc Trader
                </span>
              </div>
              <p className="text-xs text-red-200/70 mt-1 font-medium">
                Official AI binary market scanner · 24/7 high-conviction OTC feeds
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-3">
                <button
                  onClick={onGoToAnalyzer}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-bold text-xs shadow-md shadow-red-950/60 flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                  <span>Launch Analyzer</span>
                </button>

                <a
                  href="https://t.me/RCTraderPublic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-xl bg-[#1c0307] hover:bg-[#28050b] border border-red-500/30 text-white font-bold text-xs flex items-center gap-1.5 transition-all"
                >
                  <Send className="w-3.5 h-3.5 text-rose-400" />
                  <span>VIP Telegram: @RCTraderPublic</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick accuracy highlight card */}
          <div className="w-full sm:w-auto p-4 rounded-2xl bg-black/60 border border-red-500/20 text-center shrink-0">
            <span className="text-[10px] uppercase font-bold text-red-300/70 tracking-wider">
              Today VIP Accuracy
            </span>
            <div className="text-3xl font-black text-emerald-400 font-mono mt-0.5">94.2%</div>
            <span className="text-[11px] text-red-200/70 font-semibold">130 Won · 12 Lost</span>
          </div>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-4 rounded-3xl bg-[#140205]/90 border border-red-500/25 backdrop-blur-xl shadow-lg shadow-red-950/30">
          <div className="text-[11px] font-bold text-red-300/70 uppercase tracking-wider">
            Total Signals
          </div>
          <div className="text-2xl font-black text-white font-mono mt-1">{stats.total}</div>
          <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-semibold">
            <TrendingUp className="w-3 h-3" />
            {stats.winRate}% Win Rate
          </div>
        </div>

        <div className="p-4 rounded-3xl bg-[#140205]/90 border border-red-500/25 backdrop-blur-xl shadow-lg shadow-red-950/30">
          <div className="text-[11px] font-bold text-red-300/70 uppercase tracking-wider">
            Top Asset
          </div>
          <div className="text-xl font-black text-emerald-400 font-mono mt-1">USD/DZD (OTC)</div>
          <div className="text-[11px] text-red-300/70 mt-1 font-semibold">
            96% Win rate
          </div>
        </div>

        <div className="p-4 rounded-3xl bg-[#140205]/90 border border-red-500/25 backdrop-blur-xl shadow-lg shadow-red-950/30">
          <div className="text-[11px] font-bold text-red-300/70 uppercase tracking-wider">
            Brokers
          </div>
          <div className="text-xl font-black text-rose-300 font-mono mt-1">Quotex</div>
          <div className="text-[11px] text-emerald-400 mt-1 font-semibold">
            ✓ 24/7 OTC Active
          </div>
        </div>

        <div className="p-4 rounded-3xl bg-[#140205]/90 border border-red-500/25 backdrop-blur-xl shadow-lg shadow-red-950/30">
          <div className="text-[11px] font-bold text-red-300/70 uppercase tracking-wider">
            VIP Community
          </div>
          <div className="text-2xl font-black text-amber-400 font-mono mt-1">28,500+</div>
          <div className="text-[11px] text-red-300/70 mt-1 font-semibold">
            Active Community
          </div>
        </div>
      </div>

      {/* Signal History Table */}
      <div className="rounded-3xl bg-[#140205]/90 border border-red-500/25 p-5 backdrop-blur-xl shadow-lg shadow-red-950/40">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Clock className="w-4 h-4 text-rose-400" />
            <span>Saved Trade Signal History ({signalHistory.length})</span>
          </h3>
          <button
            onClick={onGoToAnalyzer}
            className="text-xs font-bold text-rose-400 hover:text-rose-300 cursor-pointer transition-colors"
          >
            Launch Analyzer →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-red-500/20 text-red-300/60 font-bold uppercase text-[10px]">
                <th className="pb-2.5">Pair</th>
                <th className="pb-2.5">Time</th>
                <th className="pb-2.5">Timeframe</th>
                <th className="pb-2.5">Direction</th>
                <th className="pb-2.5">Conviction</th>
                <th className="pb-2.5">Outcome</th>
                <th className="pb-2.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-red-500/15 font-mono">
              {signalHistory.map((row, i) => (
                <tr key={row.id || i} className="hover:bg-red-950/20 transition-colors">
                  <td className="py-2.5 font-bold text-white flex items-center gap-1.5">
                    <span>{row.baseFlag || '🇺🇸'}</span>
                    <span>{row.quoteFlag || '🇩🇿'}</span>
                    <span>{row.pairName}</span>
                  </td>
                  <td className="py-2.5 text-red-300/70 text-[11px]">
                    {row.createdAt ? new Date(row.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recent'}
                  </td>
                  <td className="py-2.5">
                    <span className="px-1.5 py-0.5 rounded bg-black/60 border border-red-500/30 text-red-300 text-[10px]">
                      {row.timeframe}
                    </span>
                  </td>
                  <td className="py-2.5">
                    <span
                      className={`px-2 py-0.5 rounded font-black text-[10px] ${
                        row.direction === 'CALL'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      }`}
                    >
                      {row.direction}
                    </span>
                  </td>
                  <td className="py-2.5 text-red-200 font-bold">{row.confidence}%</td>
                  <td className="py-2.5">
                    <span className="inline-flex items-center gap-1 font-black text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {row.status === 'WON' ? 'WON' : 'SAVED'}
                    </span>
                  </td>
                  <td className="py-2.5 text-right">
                    <button
                      onClick={() => {
                        onSelectSignal?.(row);
                        onGoToAnalyzer();
                      }}
                      className="px-2.5 py-1 rounded-lg bg-red-950/60 hover:bg-red-900 border border-red-500/30 text-rose-300 hover:text-white font-sans text-[11px] font-bold cursor-pointer transition-all"
                    >
                      ইন্ডিকেটরে দেখুন
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
