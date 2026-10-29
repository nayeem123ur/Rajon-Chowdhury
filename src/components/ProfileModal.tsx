import React from 'react';
import { X, Send, Award, CheckCircle, Shield, TrendingUp, Sparkles } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-3xl bg-gradient-to-b from-[#18122b] via-[#12132a] to-[#0d0e1e] border border-red-500/30 shadow-2xl overflow-hidden relative">
        {/* Ambient red and violet glows */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors border border-white/10 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Hero Visual Lockup */}
        <div className="relative p-6 pt-8 text-center flex flex-col items-center">
          <div className="relative mb-4 group">
            {/* Luminous border glow around RC Trader image */}
            <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-red-600 via-amber-500 to-rose-600 blur opacity-75 group-hover:opacity-100 transition duration-1000" />
            <img
              src="/assets/aistudio/image_7ba9cc3d.png"
              alt="RYN Ai - Owner: RC Trader"
              className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover ring-4 ring-[#14152e] shadow-2xl"
            />
            <div className="absolute bottom-1 right-1 p-1 rounded-full bg-emerald-500 text-white border-2 border-[#12132a]">
              <CheckCircle className="w-4 h-4 fill-white text-emerald-500" />
            </div>
          </div>

          <div className="flex items-center gap-1.5 justify-center">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              RYN Ai
            </h2>
            <Award className="w-6 h-6 text-red-500" />
          </div>

          <p className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-amber-300 mt-0.5 tracking-wide uppercase">
            Owner - Rc Trader
          </p>

          <p className="text-xs sm:text-sm text-slate-300 max-w-sm mt-2 font-medium">
            High-conviction algorithmic binary options scanner for Quotex & Pocket Option.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2 px-6 pb-4">
          <div className="p-3 rounded-2xl bg-[#1b1c3b]/80 border border-violet-500/20 text-center">
            <div className="text-lg sm:text-xl font-black text-emerald-400 font-mono">94.2%</div>
            <div className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5">
              VIP Winrate
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#1b1c3b]/80 border border-violet-500/20 text-center">
            <div className="text-lg sm:text-xl font-black text-violet-300 font-mono">28.5K+</div>
            <div className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5">
              Members
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#1b1c3b]/80 border border-violet-500/20 text-center">
            <div className="text-lg sm:text-xl font-black text-amber-400 font-mono">1,400+</div>
            <div className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5">
              Daily Signals
            </div>
          </div>
        </div>

        {/* Verified Badges */}
        <div className="px-6 py-3 space-y-2 text-xs text-slate-300 bg-[#0e0f22]/70">
          <div className="flex items-center gap-2.5">
            <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Automated price action & order flow analysis</span>
          </div>
          <div className="flex items-center gap-2.5">
            <TrendingUp className="w-4 h-4 text-violet-400 shrink-0" />
            <span>1-step martingale risk management</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>24/7 OTC feeds & high payout assets</span>
          </div>
        </div>

        {/* Telegram VIP Action */}
        <div className="p-5 border-t border-violet-900/30 bg-[#0d0e1e] flex flex-col gap-2.5">
          <a
            href="https://t.me/RCTraderPublic"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-violet-600 hover:from-red-500 hover:to-violet-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 transition-all transform active:scale-95"
          >
            <Send className="w-4 h-4" />
            <span>Join Telegram: https://t.me/RCTraderPublic</span>
          </a>

          <p className="text-[11px] text-center text-slate-400">
            Trading involves risk. Always adhere to strict capital management.
          </p>
        </div>
      </div>
    </div>
  );
};
