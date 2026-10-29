import React from 'react';
import { LayoutGrid, Radio, Scan, History, Menu } from 'lucide-react';

export type TabKey = 'dashboard' | 'live' | 'analyzer' | 'history' | 'more';

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
        <div className="pointer-events-auto rounded-3xl bg-[#0e0204]/95 backdrop-blur-2xl border border-red-600/35 shadow-2xl shadow-red-950/80 p-1.5 flex items-center justify-around relative">
          
          {/* 1. Dashboard */}
          <button
            onClick={() => onSelectTab('dashboard')}
            className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all cursor-pointer min-w-[48px] ${
              activeTab === 'dashboard'
                ? 'text-rose-400'
                : 'text-red-200/50 hover:text-red-200'
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
                ? 'text-rose-400'
                : 'text-red-200/50 hover:text-red-200'
            }`}
          >
            <div className="relative">
              <Radio className="w-5 h-5 mb-1" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
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
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-800 blur-lg opacity-85 group-hover:opacity-100 transition-opacity" />

              <div className="relative w-14 h-14 rounded-2xl p-0.5 flex flex-col items-center justify-center shadow-2xl transition-transform active:scale-95 bg-gradient-to-tr from-red-500 via-rose-500 to-red-700 ring-2 ring-red-400/60">
                <div className="w-full h-full rounded-[14px] bg-[#1c0307] flex flex-col items-center justify-center">
                  <Scan className="w-6 h-6 text-white animate-pulse" />
                </div>
              </div>

              <span className="text-[10px] font-extrabold tracking-tight mt-1 text-red-300">
                Analyzer
              </span>
            </button>
          </div>

          {/* 4. History */}
          <button
            onClick={() => onSelectTab('history')}
            className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all cursor-pointer min-w-[48px] ${
              activeTab === 'history'
                ? 'text-rose-400 font-extrabold'
                : 'text-red-200/50 hover:text-red-200'
            }`}
          >
            <History className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-bold tracking-tight">
              History
            </span>
          </button>

          {/* 5. More */}
          <button
            onClick={() => onSelectTab('more')}
            className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all cursor-pointer min-w-[48px] ${
              activeTab === 'more'
                ? 'text-rose-400'
                : 'text-red-200/50 hover:text-red-200'
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
