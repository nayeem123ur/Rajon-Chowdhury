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
import { InjectorStrategy } from './components/InjectorStrategy';
import { DashboardView } from './components/DashboardView';
import { MoreDrawer } from './components/MoreDrawer';
import { ChartScannerModal } from './components/ChartScannerModal';
import { ShieldCheck, Flame, Radio } from 'lucide-react';

export default function App() {
  // Primary States
  const [activeTab, setActiveTab] = useState<TabKey>('analyzer');
  const [activeBroker, setActiveBroker] = useState<BrokerInfo>(BROKERS[0]); // Quotex default
  const [marketType, setMarketType] = useState<MarketType>('OTC');
  const [selectedPair, setSelectedPair] = useState<CurrencyPair>(CURRENCY_PAIRS[0]); // USD/DZD (OTC) default matching screenshot
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
      setSignalList((prev) => [freshSig, ...prev.filter((s) => s.id !== freshSig.id).slice(0, 7)]);
      setIsAnalyzing(false);
    }, 1100);
  };

  return (
    <div className="min-h-screen bg-transparent text-slate-100 flex flex-col font-sans pb-28 md:pb-16 selection:bg-purple-600/30 selection:text-white">
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
                />
              </div>

              {/* Right Column (Desktop & Tablet Enhanced View): Quick Watchlist & Live Stream & VIP Trader Info */}
              <div className="lg:col-span-5 xl:col-span-5 space-y-4 hidden lg:block">
                {/* RYN Ai & Owner - Rc Trader Brand Card */}
                <div className="p-5 rounded-3xl bg-gradient-to-br from-red-950/40 via-[#1b1738]/40 to-[#12112a] border border-red-500/25 shadow-xl relative overflow-hidden backdrop-blur-xl">
                  <div className="flex items-center gap-3.5 mb-3">
                    <img
                      src="/assets/aistudio/image_7ba9cc3d.png"
                      alt="RYN Ai - Owner - Rc Trader"
                      className="w-14 h-14 rounded-2xl object-cover ring-2 ring-red-500/80 shadow-lg"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-base font-black text-white">RYN Ai</span>
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      </div>
                      <span className="text-xs text-red-400 font-bold tracking-wider uppercase block">
                        Owner - Rc Trader
                      </span>
                      <span className="text-[11px] text-slate-300">
                        Official Quotex & Pocket Option Signals
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-center text-xs mb-3">
                    <div className="p-2 rounded-xl bg-black/45 border border-white/5 shadow-inner">
                      <span className="text-slate-400 text-[10px] uppercase block font-semibold">Today Win Rate</span>
                      <span className="text-base font-black text-emerald-400 font-mono">94.2%</span>
                    </div>
                    <div className="p-2 rounded-xl bg-black/45 border border-white/5 shadow-inner">
                      <span className="text-slate-400 text-[10px] uppercase block font-semibold">AI Engine</span>
                      <span className="text-base font-black text-violet-300 font-mono">v3.8 PRO</span>
                    </div>
                  </div>

                  <a
                    href="https://t.me/RCTraderPublic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-red-600/90 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-red-950/40 transition-all cursor-pointer group"
                  >
                    <span>JOIN VIP TELEGRAM: @RCTraderPublic</span>
                    <span className="text-xs group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                </div>

                {/* Hot Assets Watchlist */}
                <div className="p-4 rounded-3xl bg-[#151433]/90 border border-violet-500/20 backdrop-blur-xl shadow-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Flame className="w-4 h-4 text-amber-400" />
                      Top Payout Assets
                    </span>
                    <button
                      onClick={() => setIsPairModalOpen(true)}
                      className="text-xs text-violet-400 hover:text-violet-300 font-semibold cursor-pointer active:scale-95 transition-transform"
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
                              ? 'bg-violet-900/40 border-violet-500 shadow-md shadow-violet-900/30'
                              : 'bg-[#1a193b]/70 hover:bg-[#22214d] border-violet-500/10'
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
                <div className="p-4 rounded-3xl bg-[#151433]/90 border border-violet-500/20 backdrop-blur-xl shadow-lg">
                  <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 mb-3">
                    <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
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
                        className="p-2.5 rounded-xl bg-[#1a193b]/70 hover:bg-[#22214d] border border-violet-500/10 flex items-center justify-between cursor-pointer text-xs transition-all active:scale-98"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-1.5 py-0.5 rounded font-black text-[10px] ${
                              sig.direction === 'CALL'
                                ? 'bg-emerald-500/20 text-emerald-300'
                                : 'bg-rose-500/20 text-rose-300'
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
          />
        )}

        {/* TAB 3: INJECTOR STRATEGY & RISK MANAGEMENT */}
        {activeTab === 'injector' && (
          <InjectorStrategy
            onApplyStrategy={() => {
              handleAnalyzeNext();
              setActiveTab('analyzer');
            }}
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
          setSignalList((prev) => [newSignal, ...prev.filter((s) => s.id !== newSignal.id).slice(0, 7)]);
          setActiveTab('analyzer');
        }}
      />
    </div>
  );
}
