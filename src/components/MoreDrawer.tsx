import React from 'react';
import { sound } from '../utils/sound';
import {
  BookOpen,
  Volume2,
  VolumeX,
  Send,
  ShieldCheck,
} from 'lucide-react';

interface MoreDrawerProps {
  soundMuted: boolean;
  onToggleSound: () => void;
  onOpenProfile: () => void;
}

export const MoreDrawer: React.FC<MoreDrawerProps> = ({
  soundMuted,
  onToggleSound,
  onOpenProfile,
}) => {
  const tradingRules = [
    {
      title: '1. Strict Money Management',
      desc: 'Risk 1% to 3% per trade. Never risk your full balance on a single session.',
    },
    {
      title: '2. 1-Step Martingale Discipline',
      desc: 'Use at most 1 recovery step if a candle spikes by a split-second.',
    },
    {
      title: '3. Daily Target Lock',
      desc: 'Stop once reaching 8-15% daily gain to maintain long-term profitability.',
    },
  ];

  return (
    <div className="space-y-5">
      {/* Brand Header */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-red-950/70 via-[#1b193d]/80 to-[#12112a] border border-red-500/35 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <img
            src="/assets/aistudio/image_7ba9cc3d.png"
            alt="Rajon Chowdhury"
            className="w-14 h-14 rounded-2xl object-cover ring-2 ring-red-500/80 shadow-md"
          />
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white">Rajon Chowdhury VIP</h2>
            <p className="text-xs text-red-300 font-semibold tracking-wide">
              RC TRADER SIGNALS & EDUCATION
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            onOpenProfile();
          }}
          className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all cursor-pointer"
        >
          View Bio
        </button>
      </div>

      {/* Settings Grid */}
      <div className="rounded-3xl bg-[#171638]/90 border border-violet-500/20 p-5 backdrop-blur-xl">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
          Audio Preferences
        </h3>

        <div
          onClick={() => {
            onToggleSound();
            sound.playClick();
          }}
          className="p-3.5 rounded-2xl bg-[#1a193b] hover:bg-[#22214d] border border-violet-500/20 cursor-pointer flex items-center justify-between transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-violet-600/20 flex items-center justify-center text-violet-400">
              {soundMuted ? <VolumeX className="w-5 h-5 text-slate-500" /> : <Volume2 className="w-5 h-5 text-emerald-400" />}
            </div>
            <div>
              <span className="text-sm font-bold text-white block">
                Signal Chimes
              </span>
              <span className="text-[11px] text-slate-400">
                {soundMuted ? 'Muted' : 'Sound Effects Active'}
              </span>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-[#14132e] text-slate-300">
            {soundMuted ? 'OFF' : 'ON'}
          </span>
        </div>
      </div>

      {/* Trading Guidelines */}
      <div className="rounded-3xl bg-[#171638]/90 border border-violet-500/20 p-5 backdrop-blur-xl">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-emerald-400" />
          Trading Guidelines
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
            Official Telegram VIP
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Daily signals & live market sessions
          </p>
        </div>

        <a
          href="https://t.me"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => sound.playWin()}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-violet-600 text-white font-bold text-xs tracking-wide shadow-md shadow-red-600/30 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Join VIP Telegram</span>
        </a>
      </div>
    </div>
  );
};
