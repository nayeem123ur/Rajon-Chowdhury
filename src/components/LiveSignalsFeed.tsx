import React, { useState, useMemo } from 'react';
import { SignalData, CurrencyPair } from '../types/trading';
import { CURRENCY_PAIRS, generateSignalForPair } from '../utils/mockMarket';
import {
  Radio,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Zap,
  Search,
  Filter,
  Flame,
  Globe,
  Coins,
  Gem,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

interface LiveSignalsFeedProps {
  signals?: SignalData[];
  onSelectSignal: (signal: SignalData) => void;
  onSelectPair?: (pair: CurrencyPair) => void;
}

type MarketCategory = 'ALL' | 'FOREX' | 'CRYPTO' | 'COMMODITIES' | 'HIGH_PAYOUT';

export const LiveSignalsFeed: React.FC<LiveSignalsFeedProps> = ({
  signals = [],
  onSelectSignal,
  onSelectPair,
}) => {
  const [search, setSearch] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<MarketCategory>('ALL');

  // Categorize the 42 markets
  const cryptoIds = useMemo(
    () =>
      new Set([
        'BTC_USD_OTC',
        'ETH_USD_OTC',
        'SOL_USD_OTC',
        'BNB_USD_OTC',
        'TON_USD_OTC',
        'XRP_USD_OTC',
        'LTC_USD_OTC',
        'BCH_USD_OTC',
        'AVAX_USD_OTC',
        'DOT_USD_OTC',
        'ETC_USD_OTC',
        'LINK_USD_OTC',
        'COSMOS_OTC',
        'ZCASH_OTC',
        'DASH_OTC',
        'AXS_USD_OTC',
        'TRUMP_OTC',
      ]),
    []
  );

  const commodityIds = useMemo(
    () => new Set(['GOLD_OTC', 'SILVER_OTC', 'UKBRENT_OTC', 'USCRUDE_OTC']),
    []
  );

  // Filtered markets
  const filteredPairs = useMemo(() => {
    return CURRENCY_PAIRS.filter((pair) => {
      // Search matching
      const matchesSearch =
        pair.name.toLowerCase().includes(search.toLowerCase()) ||
        pair.base.toLowerCase().includes(search.toLowerCase()) ||
        pair.quote.toLowerCase().includes(search.toLowerCase());

      if (!matchesSearch) return false;

      // Category filter
      if (activeCategory === 'CRYPTO') return cryptoIds.has(pair.id);
      if (activeCategory === 'COMMODITIES') return commodityIds.has(pair.id);
      if (activeCategory === 'FOREX') return !cryptoIds.has(pair.id) && !commodityIds.has(pair.id);
      if (activeCategory === 'HIGH_PAYOUT') return pair.payout >= 92;

      return true;
    });
  }, [search, activeCategory, cryptoIds, commodityIds]);

  const handleTradePair = (pair: CurrencyPair) => {
    if (onSelectPair) {
      onSelectPair(pair);
    } else {
      const freshSig = generateSignalForPair(pair, 'Quotex', '1m');
      onSelectSignal(freshSig);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-5 pb-10 animate-fade-in max-w-6xl mx-auto">
      {/* 1. Live Feed Header Banner */}
      <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-br from-[#1d0307]/95 via-[#130205]/95 to-[#090002] border border-red-500/35 backdrop-blur-2xl shadow-2xl shadow-red-950/70 relative overflow-hidden">
        {/* Subtle crimson flare */}
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-red-600/25 blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-700 flex items-center justify-center text-white shadow-lg shadow-red-600/40 ring-1 ring-red-400/50 shrink-0">
              <Radio className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-black text-white tracking-wide">
                  Live Markets Scanner
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-rose-500/25 text-rose-300 border border-rose-500/40 animate-pulse uppercase flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  STREAMING 42+ OTC
                </span>
              </div>
              <p className="text-xs text-red-200/70 mt-0.5 font-medium">
                সমস্ত অনুমোদিত ৪২টি কোটেক্স মার্কেট লাইভ অর্ডার ফ্লো ও অ্যালগরিদম সিগন্যাল
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 text-xs font-mono">
            <div className="px-3 py-1.5 rounded-xl bg-black/60 border border-red-500/30 text-right">
              <span className="text-[10px] text-red-300/70 block uppercase font-bold">
                Quotex Live Feeds
              </span>
              <span className="text-sm font-black text-emerald-400">
                {CURRENCY_PAIRS.length} Markets
              </span>
            </div>
          </div>
        </div>

        {/* 2. Search & Category Filters */}
        <div className="mt-4 pt-4 border-t border-red-500/20 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-red-300/60" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search 42 markets (e.g. USD, BDT, Gold, Bitcoin, Trump)..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-black/60 border border-red-500/30 text-white placeholder-red-300/40 text-xs focus:outline-none focus:border-red-500 transition-colors"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <button
              onClick={() => setActiveCategory('ALL')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === 'ALL'
                  ? 'bg-gradient-to-r from-red-600 to-rose-700 text-white shadow-md shadow-red-600/40 glow-red'
                  : 'bg-[#180307] text-red-300/70 hover:text-white border border-red-500/20'
              }`}
            >
              All Markets ({CURRENCY_PAIRS.length})
            </button>

            <button
              onClick={() => setActiveCategory('FOREX')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1 ${
                activeCategory === 'FOREX'
                  ? 'bg-gradient-to-r from-red-600 to-rose-700 text-white shadow-md shadow-red-600/40 glow-red'
                  : 'bg-[#180307] text-red-300/70 hover:text-white border border-red-500/20'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-rose-300" />
              <span>Forex (21)</span>
            </button>

            <button
              onClick={() => setActiveCategory('CRYPTO')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1 ${
                activeCategory === 'CRYPTO'
                  ? 'bg-gradient-to-r from-red-600 to-rose-700 text-white shadow-md shadow-red-600/40 glow-red'
                  : 'bg-[#180307] text-red-300/70 hover:text-white border border-red-500/20'
              }`}
            >
              <Coins className="w-3.5 h-3.5 text-amber-300" />
              <span>Crypto (17)</span>
            </button>

            <button
              onClick={() => setActiveCategory('COMMODITIES')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1 ${
                activeCategory === 'COMMODITIES'
                  ? 'bg-gradient-to-r from-red-600 to-rose-700 text-white shadow-md shadow-red-600/40 glow-red'
                  : 'bg-[#180307] text-red-300/70 hover:text-white border border-red-500/20'
              }`}
            >
              <Gem className="w-3.5 h-3.5 text-yellow-400" />
              <span>Commodities (4)</span>
            </button>

            <button
              onClick={() => setActiveCategory('HIGH_PAYOUT')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1 ${
                activeCategory === 'HIGH_PAYOUT'
                  ? 'bg-gradient-to-r from-red-600 to-rose-700 text-white shadow-md shadow-red-600/40 glow-red'
                  : 'bg-[#180307] text-red-300/70 hover:text-white border border-red-500/20'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-rose-400" />
              <span>92%+ Payout</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Grid of All 42 Markets with Live Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filteredPairs.map((pair, index) => {
          // Deterministic simulated conviction and direction based on pair id to look lively
          const isCall = (index % 3 !== 0);
          const confidence = 88 + (index % 7);
          const pattern = isCall ? 'Bullish Reversal' : 'Breakdown Flow';

          return (
            <div
              key={pair.id}
              onClick={() => handleTradePair(pair)}
              className="p-4 rounded-3xl bg-gradient-to-br from-[#1b0307]/90 via-[#130205]/95 to-[#0b0102] border border-red-500/25 hover:border-red-500/60 shadow-xl shadow-red-950/40 transition-all duration-200 cursor-pointer group flex flex-col justify-between hover:scale-[1.01]"
            >
              {/* Top Row: Flags & Name & Payout */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center -space-x-1 text-xl leading-none shrink-0 filter drop-shadow">
                    <span>{pair.baseFlag}</span>
                    <span>{pair.quoteFlag}</span>
                  </div>

                  <div>
                    <h3 className="text-sm font-black text-white group-hover:text-red-300 transition-colors">
                      {pair.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[11px] text-red-300/70 font-mono">
                      <span>Price: {pair.currentPrice}</span>
                      <span className={pair.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                        {pair.change24h >= 0 ? `+${pair.change24h}%` : `${pair.change24h}%`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* High Payout Badge */}
                <div className="px-2.5 py-1 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 font-mono font-black text-xs shrink-0 shadow-sm">
                  {pair.payout}%
                </div>
              </div>

              {/* Middle Row: Live Signal Insight */}
              <div className="p-2.5 rounded-2xl bg-black/60 border border-red-500/20 flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                      isCall
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40'
                        : 'bg-rose-500/20 text-rose-300 border border-rose-400/40'
                    }`}
                  >
                    {isCall ? (
                      <ArrowUp className="w-4 h-4 stroke-[2.8]" />
                    ) : (
                      <ArrowDown className="w-4 h-4 stroke-[2.8]" />
                    )}
                  </div>

                  <div className="flex flex-col">
                    <span
                      className={`text-xs font-black tracking-wide ${
                        isCall ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {isCall ? 'CALL SIGNAL' : 'PUT SIGNAL'}
                    </span>
                    <span className="text-[10px] text-red-300/60 font-medium truncate">
                      {pattern}
                    </span>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <span className="text-[9px] text-red-300/60 uppercase font-bold block">
                    Conviction
                  </span>
                  <span className="text-xs font-bold text-emerald-400">
                    {confidence}%
                  </span>
                </div>
              </div>

              {/* Bottom Action: Get Signal Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleTradePair(pair);
                }}
                className="w-full py-2 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-800 hover:from-red-500 hover:to-rose-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-red-950/60 transition-all cursor-pointer group-hover:glow-red"
              >
                <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                <span>Get {pair.name} Signal</span>
              </button>
            </div>
          );
        })}
      </div>

      {filteredPairs.length === 0 && (
        <div className="p-8 rounded-3xl bg-[#120104]/80 border border-red-500/20 text-center space-y-2">
          <p className="text-sm font-bold text-white">কোনো মার্কেট পাওয়া যায়নি</p>
          <p className="text-xs text-red-300/60">অনুগ্রহ করে সার্চ কিওয়ার্ড পরিবর্তন করুন।</p>
        </div>
      )}
    </div>
  );
};
