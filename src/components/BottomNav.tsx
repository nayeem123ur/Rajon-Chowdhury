import React from 'react';
import { LayoutGrid, Radio, Scan, Syringe, Menu } from 'lucide-react';

export type TabKey = 'dashboard' | 'live' | 'analyzer' | 'injector' | 'more';

interface BottomNavProps {
  activeTab: TabKey;
  onSelectTab: (tab: TabKey) => void;
  onOpenScanner: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  onOpenScanner,
}) => {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 pb-safe pointer-events-none">
      <div className="max-w-md md:max-w-lg mx-auto px-3 pb-3">
        {/* Navigation bar matching mobile screenshot */}
        <div className="pointer-events-auto rounded-3xl bg-[#14132e]/95 backdrop-blur-2xl border border-violet-500/30 shadow-2xl shadow-violet-950/60 p-1.5 flex items-center justify-around relative">
          
          {/* 1. Dashboard */}
          <button
            onClick={() => onSelectTab('dashboard')}
            className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all cursor-pointer min-w-[48px] ${
              activeTab === 'dashboard'
                ? 'text-violet-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LayoutGrid className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-bold tracking-tight">
              Dashboard
            </span>
          </button>

          {/* 2. Live */}
          <button
            onClick={() => onSelectTab('live')}
            className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all cursor-pointer min-w-[48px] relative ${
              activeTab === 'live'
                ? 'text-violet-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="relative">
              <Radio className="w-5 h-5 mb-1" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <span className="text-[10px] font-bold tracking-tight">
              Live
            </span>
          </button>

          {/* 3. Center Scanner Button (Direct Chart Screenshot Upload Trigger) */}
          <div className="relative -mt-6">
            <button
              onClick={() => {
                onSelectTab('analyzer');
                onOpenScanner();
              }}
              title="Click to Upload Chart Screenshot & Generate Signal"
              className="group relative flex flex-col items-center justify-center cursor-pointer"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 blur-lg opacity-85 group-hover:opacity-100 transition-opacity" />

              <div className="relative w-14 h-14 rounded-2xl p-0.5 flex flex-col items-center justify-center shadow-2xl transition-transform active:scale-95 bg-gradient-to-tr from-violet-500 via-fuchsia-500 to-indigo-500 ring-2 ring-white/50">
                <div className="w-full h-full rounded-[14px] bg-[#1a1438] flex flex-col items-center justify-center">
                  <Scan className="w-6 h-6 text-white animate-pulse" />
                </div>
              </div>

              <span className="text-[10px] font-extrabold tracking-tight mt-1 text-violet-300">
                Analyzer
              </span>
            </button>
          </div>

          {/* 4. Injector */}
          <button
            onClick={() => onSelectTab('injector')}
            className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all cursor-pointer min-w-[48px] ${
              activeTab === 'injector'
                ? 'text-violet-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Syringe className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-bold tracking-tight">
              Injector
            </span>
          </button>

          {/* 5. More */}
          <button
            onClick={() => onSelectTab('more')}
            className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all cursor-pointer min-w-[48px] ${
              activeTab === 'more'
                ? 'text-violet-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Menu className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-bold tracking-tight">
              More
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
