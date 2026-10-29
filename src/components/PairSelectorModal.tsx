import React, { useState } from 'react';
import { CurrencyPair, MarketType } from '../types/trading';
import { CURRENCY_PAIRS } from '../utils/mockMarket';
import { Search, X, Check, Flame, Globe } from 'lucide-react';

interface PairSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPair: CurrencyPair;
  onSelectPair: (pair: CurrencyPair) => void;
  currentMarketType: MarketType;
}

export const PairSelectorModal: React.FC<PairSelectorModalProps> = ({
  isOpen,
  onClose,
  selectedPair,
  onSelectPair,
}) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'ALL' | 'OTC' | 'REAL'>('ALL');

  if (!isOpen) return null;

  const filteredPairs = CURRENCY_PAIRS.filter((pair) => {
    const matchesSearch =
      pair.name.toLowerCase().includes(search.toLowerCase()) ||
      pair.base.toLowerCase().includes(search.toLowerCase()) ||
      pair.quote.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;
    if (filter === 'OTC') return pair.isOtc;
    if (filter === 'REAL') return !pair.isOtc;
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-3xl bg-[#130104] border border-red-500/35 shadow-2xl shadow-red-950/80 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-red-900/30 flex items-center justify-between bg-[#0e0002]/80">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-rose-400" />
              Select Trading Asset
            </h3>
            <p className="text-xs text-red-200/60 mt-0.5">
              Quotex & Pocket Option High Payout OTC Pairs
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-red-300/80 hover:text-white flex items-center justify-center transition-colors border border-red-500/30 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search & Filters */}
        <div className="p-4 space-y-3 bg-[#0d0103]/60 border-b border-red-900/20">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-red-300/50" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search pair (e.g. USD, EUR, GBP, DZD)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1c0307] border border-red-500/25 text-white placeholder-red-300/40 text-sm focus:outline-none focus:border-red-500"
            />
          </div>

          <div className="flex items-center gap-2">
            {(['ALL', 'OTC', 'REAL'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  filter === type
                    ? 'bg-gradient-to-r from-red-600 to-rose-700 text-white shadow-md shadow-red-600/40 glow-red'
                    : 'bg-[#180205] text-red-300/60 hover:text-white border border-red-500/15'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Pair List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {filteredPairs.map((pair) => {
            const isSelected = selectedPair.id === pair.id;
            return (
              <button
                key={pair.id}
                onClick={() => {
                  onSelectPair(pair);
                  onClose();
                }}
                className={`w-full p-3 rounded-2xl border transition-all flex items-center justify-between text-left group cursor-pointer ${
                  isSelected
                    ? 'bg-red-950/60 border-red-500 shadow-md shadow-red-950/50'
                    : 'bg-[#180205]/75 hover:bg-[#250409] border-red-500/15'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center -space-x-1.5 text-2xl">
                    <span>{pair.baseFlag}</span>
                    <span>{pair.quoteFlag}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-white text-sm group-hover:text-red-300">
                        {pair.name}
                      </span>
                      {pair.payout >= 90 && (
                        <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                          <Flame className="w-2.5 h-2.5" />
                          {pair.payout}%
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-red-200/60 mt-0.5 font-mono">
                      <span>{pair.currentPrice.toFixed(pair.decimals)}</span>
                      <span className="mx-1.5">·</span>
                      <span className={pair.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                        {pair.change24h >= 0 ? `+${pair.change24h}%` : `${pair.change24h}%`}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-emerald-400 block">
                      {pair.payout}% Payout
                    </span>
                    <span className="text-[10px] text-red-300/60 uppercase">
                      {pair.volatility} Vol
                    </span>
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-red-600/50">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
