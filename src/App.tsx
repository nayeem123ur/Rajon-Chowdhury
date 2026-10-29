import React, { useState } from 'react';
import { BrokerInfo, CurrencyPair, MarketType, SignalData, Timeframe } from './types/trading';
import { BROKERS, CURRENCY_PAIRS, INITIAL_SIGNAL_FEEDS, generateSignalForPair } from './utils/mockMarket';
import { TopBar } from './components/TopBar';
import { SignalCard } from './components/SignalCard';
import { BottomNav, TabKey } from './components/BottomNav';
import { PairSelectorModal } from './components/PairSelectorModal';
import { BrokerModal } from './components/BrokerModal';
import { ProfileModal } from './components/ProfileModal';
import { LiveSignalsFeed } from './components/LiveSignalsFeed';
import { SignalHistoryView } from './components/SignalHistoryView';
import { DashboardView } from './components/DashboardView';
import { MoreDrawer } from './components/MoreDrawer';
import { ChartScannerModal } from './components/ChartScannerModal';
import { PasswordGate } from './components/PasswordGate';
import { ShieldCheck, Flame, Radio } from 'lucide-react';

export default function App() {
  // Security Password Gate: Authenticated state (stored in sessionStorage)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('ryn_ai_vip_auth') === 'granted';
  });

  const handleLockBot = () => {
    sessionStorage.removeItem('ryn_ai_vip_auth');
    setIsAuthenticated(false);
  };

  // Primary States
  const [activeTab, setActiveTab] = useState<TabKey>('analyzer');
  const [activeBroker, setActiveBroker] = useState<BrokerInfo>(BROKERS[0]); // Quotex default
  const [marketType, setMarketType] = useState<MarketType>('OTC');
  const [selectedPair, setSelectedPair] = useState<CurrencyPair>(CURRENCY_PAIRS[0]); // USD/COP (OTC)
  const [timeframe, setTimeframe] = useState<Timeframe>('1m');
  const [currentSignal, setCurrentSignal] = useState<SignalData>(INITIAL_SIGNAL_FEEDS[0]);
  const [signalList, setSignalList] = useState<SignalData[]>(INITIAL_SIGNAL_FEEDS);

  // Modals
  const [isPairModalOpen, setIsPairModalOpen] = useState<boolean>(false);
  const [isBrokerModalOpen, setIsBrokerModalOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isScannerModalOpen, setIsScannerModalOpen] = useState<boolean>(false);

  // Analyzing state for motion graphics
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  // Initialize and handle pair changes
  const handleSelectPair = (pair: CurrencyPair) => {
    setSelectedPair(pair);
    const newSig = generateSignalForPair(pair, activeBroker.name, timeframe);
    setCurrentSignal(newSig);
    setSignalList((prev) => [newSig, ...prev.slice(0, 7)]);
  };

  const handleToggleMarketType = (type: MarketType) => {
    setMarketType(type);
    const matchingPair = CURRENCY_PAIRS.find((p) => (type === 'OTC' ? p.isOtc : !p.isOtc)) || CURRENCY_PAIRS[0];
    handleSelectPair(matchingPair);
  };

  // Generate new signal with motion graphics scanner animation
  const handleAnalyzeNext = (targetTimeframe?: Timeframe) => {
    // Strict Lock: User CANNOT generate another signal until current timeframe candle expires!
    if (currentSignal && Date.now() < currentSignal.candleExpiryTime) {
      return;
    }

    const tf = targetTimeframe || timeframe;
    setIsAnalyzing(true);

    setTimeout(() => {
      const freshSig = generateSignalForPair(selectedPair, activeBroker.name, tf);
      setCurrentSignal(freshSig);
      setSignalList((prev) => [freshSig, ...prev.filter((s) => s.id !== freshSig.id)].slice(0, 30));
      setIsAnalyzing(false);
    }, 1100);
  };

  // If not authenticated, display the cybernetic Password Gate screen
  if (!isAuthenticated) {
    return (
      <PasswordGate
        onUnlock={() => {
          sessionStorage.setItem('ryn_ai_vip_auth', 'granted');
          setIsAuthenticated(true);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-transparent text-slate-100 flex flex-col font-sans pb-28 md:pb-16 selection:bg-red-600/30 selection:text-white">
      {/* 1. Global Top Navigation Bar */}
      <TopBar
        activeBroker={activeBroker}
        onOpenBrokerModal={() => setIsBrokerModalOpen(true)}
        marketType={marketType}
        onToggleMarketType={handleToggleMarketType}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
        onOpenScanner={() => setIsScannerModalOpen(true)}
        onLockBot={handleLockBot}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 pt-3 sm:pt-6">
        
        {/* TAB 1: ANALYZER (Exact match to screenshot with NO charts) */}
        {activeTab === 'analyzer' && (
          <div className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              
              {/* Central Signal Box: Mirrors user screenshot layout */}
              <div className="lg:col-span-7 xl:col-span-7 max-w-xl mx-auto w-full space-y-4">
                <SignalCard
                  signal={currentSignal}
                  pair={selectedPair}
                  onOpenPairModal={() => setIsPairModalOpen(true)}
                  onAnalyzeNext={() => handleAnalyzeNext()}
                  onOpenScanner={() => setIsScannerModalOpen(true)}
                  isAnalyzing={isAnalyzing}
                  timeframe={timeframe}
                  onChangeTimeframe={(tf) => {
                    // Prevent changing timeframe while signal is still running
                    if (currentSignal && Date.now() < currentSignal.candleExpiryTime) {
                      return;
                    }
                    setTimeframe(tf);
                    handleAnalyzeNext(tf);
                  }}
                  signalHistory={signalList}
                  onSelectHistorySignal={(sig) => {
                    setCurrentSignal(sig);
                    const f = CURRENCY_PAIRS.find((p) => p.id === sig.pairId);
                    if (f) setSelectedPair(f);
                  }}
                  onViewFullHistory={() => setActiveTab('history')}
                />
              </div>

              {/* Right Column (Desktop & Tablet Enhanced View): Quick Watchlist & Live Stream & VIP Trader Info */}
              <div className="lg:col-span-5 xl:col-span-5 space-y-4 hidden lg:block">
                {/* RYN Ai & Owner - Rc Trader Brand Card - Vampire Blood Red Edition */}
                <div className="p-5 rounded-3xl bg-gradient-to-br from-red-950/80 via-[#220409]/80 to-[#100103] border border-red-500/40 shadow-2xl shadow-red-950/60 relative overflow-hidden backdrop-blur-xl">
                  {/* Subtle blood red flare aura */}
                  <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-red-600/20 blur-2xl pointer-events-none" />
                  
                  <div className="flex items-center gap-3.5 mb-3.5 relative">
                    <img
                      src="/assets/aistudio/image_0a428df5.png"
                      alt="RYN Ai - Owner - Rc Trader"
                      className="w-16 h-16 rounded-2xl object-cover ring-2 ring-red-500/90 shadow-xl shadow-red-950/80"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-lg font-black text-white tracking-wide">RYN Ai</span>
                        <ShieldCheck className="w-4 h-4 text-rose-400" />
                      </div>
                      <span className="text-xs text-red-400 font-bold tracking-wider uppercase block">
                        Owner - Rc Trader
                      </span>
                      <span className="text-[11px] text-red-200/70">
                        Official Quotex & Pocket Option Signals
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-center text-xs mb-3.5">
                    <div className="p-2 rounded-xl bg-black/60 border border-red-500/20 shadow-inner">
                      <span className="text-red-300/70 text-[10px] uppercase block font-semibold">Today Win Rate</span>
                      <span className="text-base font-black text-emerald-400 font-mono">94.2%</span>
                    </div>
                    <div className="p-2 rounded-xl bg-black/60 border border-red-500/20 shadow-inner">
                      <span className="text-red-300/70 text-[10px] uppercase block font-semibold">AI Engine</span>
                      <span className="text-base font-black text-red-300 font-mono">v3.8 PRO</span>
                    </div>
                  </div>

                  <a
                    href="https://t.me/RCTraderPublic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-800 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-red-950/60 transition-all cursor-pointer group"
                  >
                    <span>JOIN VIP TELEGRAM: @RCTraderPublic</span>
                    <span className="text-xs group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                </div>

                {/* Hot Assets Watchlist */}
                <div className="p-4 rounded-3xl bg-[#140205]/90 border border-red-500/25 backdrop-blur-xl shadow-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Flame className="w-4 h-4 text-rose-400" />
                      Top Payout Assets
                    </span>
                    <button
                      onClick={() => setIsPairModalOpen(true)}
                      className="text-xs text-rose-400 hover:text-rose-300 font-semibold cursor-pointer active:scale-95 transition-transform"
                    >
                      View All
                    </button>
                  </div>

                  <div className="space-y-2">
                    {CURRENCY_PAIRS.slice(0, 5).map((p) => {
                      const isSelected = selectedPair.id === p.id;
                      return (
                        <div
                          key={p.id}
                          onClick={() => handleSelectPair(p)}
                          className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-red-950/70 border-red-500 shadow-md shadow-red-950/50'
                              : 'bg-[#1b0307]/70 hover:bg-[#25050b] border-red-500/15'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-base">{p.baseFlag}{p.quoteFlag}</span>
                            <span className="text-xs font-bold text-white">{p.name}</span>
                          </div>

                          <div className="flex items-center gap-2 font-mono">
                            <span className="text-xs font-bold text-emerald-400">{p.payout}%</span>
                            <span className={`text-[10px] ${p.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                              {p.change24h >= 0 ? `+${p.change24h}%` : `${p.change24h}%`}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Mini Signals Feed */}
                <div className="p-4 rounded-3xl bg-[#140205]/90 border border-red-500/25 backdrop-blur-xl shadow-lg">
                  <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 mb-3">
                    <Radio className="w-4 h-4 text-rose-400 animate-pulse" />
                    Live Signal Stream
                  </span>

                  <div className="space-y-2">
                    {signalList.slice(0, 3).map((sig) => (
                      <div
                        key={sig.id}
                        onClick={() => {
                          setCurrentSignal(sig);
                          const p = CURRENCY_PAIRS.find((cp) => cp.id === sig.pairId) || selectedPair;
                          setSelectedPair(p);
                        }}
                        className="p-2.5 rounded-xl bg-[#1b0307]/70 hover:bg-[#25050b] border border-red-500/15 flex items-center justify-between cursor-pointer text-xs transition-all active:scale-98"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-1.5 py-0.5 rounded font-black text-[10px] ${
                              sig.direction === 'CALL'
                                ? 'bg-emerald-500/20 text-emerald-300'
                                : 'bg-rose-500/25 text-rose-300 border border-rose-500/30'
                            }`}
                          >
                            {sig.direction}
                          </span>
                          <span className="font-bold text-white">{sig.pairName}</span>
                        </div>

                        <span className="font-mono text-emerald-400 font-bold">
                          {sig.confidence}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: LIVE SIGNALS STREAM */}
        {activeTab === 'live' && (
          <LiveSignalsFeed
            signals={signalList}
            onSelectSignal={(sig) => {
              setCurrentSignal(sig);
              const found = CURRENCY_PAIRS.find((p) => p.id === sig.pairId);
              if (found) setSelectedPair(found);
              setActiveTab('analyzer');
            }}
            onSelectPair={(pair) => {
              handleSelectPair(pair);
              setActiveTab('analyzer');
            }}
          />
        )}

        {/* TAB 3: SIGNAL HISTORY (হিস্ট্রি) */}
        {activeTab === 'history' && (
          <SignalHistoryView
            signals={signalList}
            onSelectSignal={(sig) => {
              setCurrentSignal(sig);
              const found = CURRENCY_PAIRS.find((p) => p.id === sig.pairId);
              if (found) setSelectedPair(found);
              setActiveTab('analyzer');
            }}
            onClearHistory={() => setSignalList([])}
            onGoToAnalyzer={() => setActiveTab('analyzer')}
          />
        )}

        {/* TAB 4: DASHBOARD VIEW */}
        {activeTab === 'dashboard' && (
          <DashboardView
            onGoToAnalyzer={() => setActiveTab('analyzer')}
            onOpenProfile={() => setIsProfileModalOpen(true)}
          />
        )}

        {/* TAB 5: MORE / SETTINGS / RULES */}
        {activeTab === 'more' && (
          <MoreDrawer
            onOpenProfile={() => setIsProfileModalOpen(true)}
          />
        )}
      </main>

      {/* Floating Bottom Navigation Bar (Matching screenshot) */}
      <BottomNav
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
        onOpenScanner={() => setIsScannerModalOpen(true)}
      />

      {/* Modals */}
      <PairSelectorModal
        isOpen={isPairModalOpen}
        onClose={() => setIsPairModalOpen(false)}
        selectedPair={selectedPair}
        onSelectPair={handleSelectPair}
        currentMarketType={marketType}
      />

      <BrokerModal
        isOpen={isBrokerModalOpen}
        onClose={() => setIsBrokerModalOpen(false)}
        selectedBroker={activeBroker}
        onSelectBroker={(broker) => setActiveBroker(broker)}
      />

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onLockBot={handleLockBot}
      />

      {/* Intelligent AI Chart Screenshot Vision Scanner Modal */}
      <ChartScannerModal
        isOpen={isScannerModalOpen}
        onClose={() => setIsScannerModalOpen(false)}
        selectedPair={selectedPair}
        activeBroker={activeBroker.name}
        timeframe={timeframe}
        onSignalGenerated={(newSignal) => {
          setCurrentSignal(newSignal);
          setSignalList((prev) => [newSignal, ...prev.filter((s) => s.id !== newSignal.id)].slice(0, 30));
          setActiveTab('analyzer');
        }}
      />
    </div>
  );
}
