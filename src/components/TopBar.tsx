import React, { useState, useEffect } from 'react';
import { BrokerInfo, MarketType } from '../types/trading';
import { TabKey } from './BottomNav';
import {
  ShieldCheck,
  ChevronDown,
  Sparkles,
  Clock,
  LayoutGrid,
  Radio,
  Scan,
  History,
  Menu,
  TrendingUp,
  Lock,
} from 'lucide-react';

interface TopBarProps {
  activeBroker: BrokerInfo;
  onOpenBrokerModal: () => void;
  marketType: MarketType;
  onToggleMarketType: (type: MarketType) => void;
  onOpenProfileModal: () => void;
  activeTab?: TabKey;
  onSelectTab?: (tab: TabKey) => void;
  onOpenScanner?: () => void;
  onLockBot?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeBroker,
  onOpenBrokerModal,
  marketType,
  onToggleMarketType,
  onOpenProfileModal,
  activeTab = 'analyzer',
  onSelectTab,
  onOpenScanner,
  onLockBot,
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

  const navLinks: { key: TabKey; label: string; icon: React.ReactNode }[] = [
    { key: 'dashboard', label: 'Dashboard', icon: <LayoutGrid className="w-4 h-4" /> },
    { key: 'live', label: 'Live Stream', icon: <Radio className="w-4 h-4" /> },
    { key: 'analyzer', label: 'AI Analyzer', icon: <Scan className="w-4 h-4" /> },
    { key: 'history', label: 'History', icon: <History className="w-4 h-4" /> },
    { key: 'more', label: 'More', icon: <Menu className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-30 w-full px-2 sm:px-6 py-2 bg-[#080103]/95 backdrop-blur-2xl border-b border-red-600/30 shadow-lg shadow-red-950/50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-1.5 sm:gap-4">
        {/* Left: Dedicated Quotex Broker Option */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 rounded-2xl bg-[#150205] border border-red-500/30 shadow-sm text-left group transition-all hover:border-red-500/60"
          >
            {/* Official Quotex Logo on White Squircle */}
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-white flex items-center justify-center p-1 shadow-md shrink-0 ring-1 ring-white/20 transition-transform group-hover:scale-105">
              <svg viewBox="0 0 32 32" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 11C7 9.89543 7.89543 9 9 9C10.1046 9 11 9.89543 11 11V21C11 22.1046 10.1046 23 9 23C7.89543 23 7 22.1046 7 21V11Z" fill="#E52B50" />
                <path d="M12.5 8C12.5 6.89543 13.3954 6 14.5 6C15.6046 6 16.5 6.89543 16.5 8V24C16.5 25.1046 15.6046 26 14.5 26C13.3954 26 12.5 25.1046 12.5 24V8Z" fill="#E52B50" />
                <path d="M18 10C18 8.89543 18.8954 8 20 8C21.1046 8 22 8.89543 22 10V22C22 23.1046 21.1046 24 20 24C18.8954 24 18 23.1046 18 22V10Z" fill="#E52B50" />
                <path d="M23.5 13C23.5 11.8954 24.3954 11 25.5 11C26.6046 11 27.5 11.8954 27.5 13V19C27.5 20.1046 26.6046 21 25.5 21C24.3954 21 23.5 20.1046 23.5 19V13Z" fill="#E52B50" />
                <path d="M9 10L14.5 7L20 9L25.5 12" stroke="#E52B50" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-[8px] sm:text-[9px] tracking-wider text-red-300/70 uppercase font-semibold">
                BROKER
              </span>
              <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
                Quotex
              </span>
            </div>
          </button>
        </div>

        {/* Desktop Navigation Links (Visible on Laptop / Desktop / Tablet) */}
        {onSelectTab && (
          <nav className="hidden xl:flex items-center gap-1 bg-[#130205]/90 p-1 rounded-2xl border border-red-500/25 shadow-inner">
            {navLinks.map((item) => {
              const isActive = activeTab === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => onSelectTab(item.key)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-red-600 to-rose-700 text-white shadow-md shadow-red-600/50 glow-red'
                      : 'text-red-200/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        )}

        {/* Center / Brand Logo: RYN Ai & Owner - Rc Trader */}
        <button
          onClick={onOpenProfileModal}
          className="flex items-center gap-1.5 sm:gap-2.5 px-2 sm:px-3.5 py-1.5 rounded-2xl bg-gradient-to-r from-red-950/80 via-[#220308]/80 to-[#120103]/85 border border-red-500/40 hover:border-red-500/80 transition-all text-left cursor-pointer active:scale-95 shadow-md shadow-red-950/50 shrink-0 group"
        >
          <div className="relative shrink-0">
            <img
              src="/assets/aistudio/image_0a428df5.png"
              alt="RYN Ai - Owner - Rc Trader"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover ring-2 ring-red-500/90 shadow-md shadow-red-500/40 group-hover:scale-105 transition-transform"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-[#0a0103] animate-pulse"></span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="text-xs sm:text-sm font-black text-white tracking-wide whitespace-nowrap">
                RYN Ai
              </span>
              <ShieldCheck className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            </div>
            <span className="text-[8px] sm:text-[10px] font-bold text-red-400 tracking-wider">
              Owner - Rc Trader
            </span>
          </div>
        </button>

        {/* Right: Live Market Clock + OTC/Real Segmented Toggle + Lock Button */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Live Market Time Clock */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#130205] border border-red-500/25 text-red-200 font-mono text-xs shadow-inner">
            <Clock className="w-3.5 h-3.5 text-rose-400 animate-spin-slow" />
            <span className="font-semibold">{timeString || '00:00:00'}</span>
          </div>

          {/* Segmented OTC / Real Toggle */}
          <div className="flex items-center p-0.5 sm:p-1 rounded-2xl bg-[#130205] border border-red-500/25 shadow-inner">
            <button
              onClick={() => onToggleMarketType('OTC')}
              className={`px-2 sm:px-3 py-1 rounded-xl text-[11px] sm:text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                marketType === 'OTC'
                  ? 'bg-gradient-to-r from-red-600 to-rose-700 text-white shadow-md shadow-red-600/50 glow-red scale-100'
                  : 'text-red-300/70 hover:text-white'
              }`}
            >
              <Sparkles className="w-3 h-3 text-rose-200" />
              OTC
            </button>
            <button
              onClick={() => onToggleMarketType('Real')}
              className={`px-2 sm:px-3 py-1 rounded-xl text-[11px] sm:text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                marketType === 'Real'
                  ? 'bg-gradient-to-r from-red-800 to-rose-900 text-white shadow-md shadow-red-800/40 scale-100 border border-red-500/30'
                  : 'text-red-300/70 hover:text-white'
              }`}
            >
              <TrendingUp className="w-3 h-3 text-red-200" />
              Real
            </button>
          </div>

          {/* Quick Lock Bot Button */}
          {onLockBot && (
            <button
              onClick={onLockBot}
              title="Lock Bot (লক করুন)"
              className="p-1.5 sm:p-2 rounded-xl bg-[#130205] hover:bg-red-950/70 border border-red-500/30 text-rose-300 hover:text-white transition-all cursor-pointer shadow-inner active:scale-95"
            >
              <Lock className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
