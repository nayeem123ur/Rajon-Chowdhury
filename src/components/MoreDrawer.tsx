import React from 'react';
import {
  BookOpen,
  Send,
} from 'lucide-react';

interface MoreDrawerProps {
  onOpenProfile: () => void;
}

export const MoreDrawer: React.FC<MoreDrawerProps> = ({
  onOpenProfile,
}) => {
  const tradingRules = [
    {
      title: '1. Money Management',
      desc: 'Risk 1% to 3% per trade. Never over-leverage.',
    },
    {
      title: '2. 1-Step Martingale',
      desc: 'Max 1 recovery step on split-second candle spikes.',
    },
    {
      title: '3. Daily Target Lock',
      desc: 'Take profits at 10-15% daily growth and exit.',
    },
  ];

  return (
    <div className="space-y-5">
      {/* Brand Header */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-red-950/70 via-[#1b193d]/80 to-[#12112a] border border-red-500/35 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <img
            src="/assets/aistudio/image_7ba9cc3d.png"
            alt="RYN Ai - Owner: RC Trader"
            className="w-14 h-14 rounded-2xl object-cover ring-2 ring-red-500/80 shadow-md"
          />
          <div>
            <h2 className="text-base sm:text-lg font-black text-white">RYN Ai</h2>
            <p className="text-xs text-red-300 font-bold tracking-wider">
              Owner - Rc Trader
            </p>
          </div>
        </div>

        <button
          onClick={onOpenProfile}
          className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all cursor-pointer"
        >
          View Info
        </button>
      </div>

      {/* Trading Guidelines */}
      <div className="rounded-3xl bg-[#171638]/90 border border-violet-500/20 p-5 backdrop-blur-xl">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-emerald-400" />
          RC Trader Discipline & Guidelines
        </h3>

        <div className="space-y-2.5">
          {tradingRules.map((rule, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-[#1a193b]/70 border border-violet-500/15">
              <h4 className="text-xs sm:text-sm font-bold text-white mb-0.5">{rule.title}</h4>
              <p className="text-xs text-slate-300 leading-snug">{rule.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Official Telegram Link */}
      <div className="rounded-3xl bg-[#171638]/90 border border-violet-500/20 p-5 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-white">
            Official Telegram Community
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Join @RCTraderPublic for daily VIP binary signals
          </p>
        </div>

        <a
          href="https://t.me/RCTraderPublic"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-violet-600 text-white font-bold text-xs tracking-wide shadow-md shadow-red-600/30 flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-transform"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Join @RCTraderPublic</span>
        </a>
      </div>
    </div>
  );
};
