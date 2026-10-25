import React, { useState, useEffect } from 'react';
import { BrokerInfo, MarketType } from '../types/trading';
import { sound } from '../utils/sound';
import { Volume2, VolumeX, ShieldCheck, ChevronDown, Sparkles, Clock } from 'lucide-react';

interface TopBarProps {
  activeBroker: BrokerInfo;
  onOpenBrokerModal: () => void;
  marketType: MarketType;
  onToggleMarketType: (type: MarketType) => void;
  soundMuted: boolean;
  onToggleSound: () => void;
  onOpenProfileModal: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeBroker,
  onOpenBrokerModal,
  marketType,
  onToggleMarketType,
  soundMuted,
  onToggleSound,
  onOpenProfileModal,
}) => {
  const [timeString, setTimeString] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-30 w-full px-2.5 sm:px-6 py-2 sm:py-2.5 bg-[#0a091e]/90 backdrop-blur-2xl border-b border-violet-500/15">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-1.5 sm:gap-4">
        {/* Left: Broker Selector */}
        <div className="flex items-center shrink-0">
          <button
            onClick={() => {
              sound.playClick();
              onOpenBrokerModal();
            }}
            className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-2xl bg-[#171638] hover:bg-[#201f48] border border-violet-500/25 shadow-sm transition-all text-left group cursor-pointer active:scale-95"
          >
            <div
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center font-black text-white text-xs shadow-md shrink-0 transition-transform group-hover:scale-105"
              style={{ backgroundColor: activeBroker.color }}
            >
              {activeBroker.name.charAt(0)}
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] tracking-wider text-slate-400 uppercase font-semibold">
                BROKER
              </span>
              <span className="text-xs sm:text-sm font-bold text-white group-hover:text-violet-300 flex items-center gap-0.5">
                {activeBroker.name}
                <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-white transition-transform" />
              </span>
            </div>
          </button>
        </div>

        {/* Center / Brand Logo: Rajon Chowdhury */}
        <button
          onClick={() => {
            sound.playClick();
            onOpenProfileModal();
          }}
          className="flex items-center gap-2 px-2 sm:px-3 py-1 rounded-2xl bg-gradient-to-r from-red-950/60 via-[#1e173a]/50 to-[#12112a]/60 border border-red-500/30 hover:border-red-500/60 transition-all text-left cursor-pointer active:scale-95 shadow-md shadow-red-950/30"
        >
          <div className="relative shrink-0">
            <img
              src="/assets/aistudio/image_7ba9cc3d.png"
              alt="Rajon Chowdhury"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover ring-2 ring-red-500/80 shadow-md shadow-red-500/30"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full border-2 border-[#0a091e] animate-pulse"></span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-white tracking-tight whitespace-nowrap">
                Rajon Chowdhury
              </span>
              <ShieldCheck className="w-3 h-3 text-red-400 shrink-0" />
            </div>
            <span className="text-[9px] font-bold text-red-400 tracking-wider">
              RC TRADER VIP
            </span>
          </div>
        </button>

        {/* Right: Live Market Clock + OTC/Real + Sound */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Live UTC/Market Time Clock */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#14132e] border border-violet-500/20 text-slate-300 font-mono text-xs">
            <Clock className="w-3.5 h-3.5 text-violet-400 animate-spin-slow" />
            <span className="font-semibold">{timeString || '00:00:00'}</span>
          </div>

          {/* Segmented OTC / Real Toggle */}
          <div className="flex items-center p-0.5 sm:p-1 rounded-2xl bg-[#14132e] border border-violet-500/20 shadow-inner">
            <button
              onClick={() => {
                sound.playClick();
                onToggleMarketType('OTC');
              }}
              className={`px-2.5 sm:px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                marketType === 'OTC'
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-600/40 glow-purple scale-100'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3 h-3 text-violet-200" />
              OTC
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onToggleMarketType('Real');
              }}
              className={`px-2.5 sm:px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                marketType === 'Real'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/40 scale-100'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Real
            </button>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              onToggleSound();
              sound.playClick();
            }}
            title={soundMuted ? 'Unmute Sound' : 'Mute Sound'}
            className="w-8 h-8 rounded-xl bg-[#171638] border border-violet-500/20 flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer active:scale-90 shrink-0"
          >
            {soundMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />}
          </button>
        </div>
      </div>
    </header>
  );
};
