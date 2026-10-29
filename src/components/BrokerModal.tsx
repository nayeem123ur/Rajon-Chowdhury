import React from 'react';
import { BrokerInfo } from '../types/trading';
import { BROKERS } from '../utils/mockMarket';
import { X, Check, ShieldCheck, Zap } from 'lucide-react';

interface BrokerModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedBroker: BrokerInfo;
  onSelectBroker: (broker: BrokerInfo) => void;
}

export const BrokerModal: React.FC<BrokerModalProps> = ({
  isOpen,
  onClose,
  selectedBroker,
  onSelectBroker,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-3xl bg-[#130104] border border-red-500/35 shadow-2xl shadow-red-950/80 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-red-900/30 flex items-center justify-between bg-[#0e0002]/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-red-600/30 border border-red-500/30 flex items-center justify-center text-rose-300">
              <Zap className="w-5 h-5 text-rose-400" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Select Binary Broker
              </h3>
              <p className="text-xs text-red-200/60 mt-0.5">
                RYN Ai Verified Platform Partners
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-red-300/80 hover:text-white flex items-center justify-center transition-colors border border-red-500/30 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Broker List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {BROKERS.map((broker) => {
            const isSelected = selectedBroker.id === broker.id;
            return (
              <div
                key={broker.id}
                onClick={() => {
                  onSelectBroker(broker);
                  onClose();
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                  isSelected
                    ? 'bg-red-950/60 border-red-500 shadow-lg shadow-red-950/60 ring-1 ring-red-500/50'
                    : 'bg-[#180205]/75 hover:bg-[#250409] border-red-500/15'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center font-black text-white text-base shadow-md"
                    style={{ backgroundColor: broker.color }}
                  >
                    {broker.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-base group-hover:text-red-300">
                        {broker.name}
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-red-950/80 text-rose-300 border border-red-500/25">
                        {broker.badge}
                      </span>
                    </div>
                    <p className="text-xs text-red-200/60 mt-1">{broker.tagline}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-emerald-400 block">
                      {broker.avgPayout}% Avg Payout
                    </span>
                    <span className="text-[10px] text-red-300/60 block">
                      {broker.otcSupported ? 'OTC 24/7 Available' : 'Real Market Only'}
                    </span>
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-red-600/50">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-red-900/30 bg-[#0e0002] text-xs text-red-200/60 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <ShieldCheck className="w-4 h-4" />
            All Signal Algorithms Synced
          </span>
          <span className="text-[11px] font-mono text-red-300/70">RC Trader Engine v3.8</span>
        </div>
      </div>
    </div>
  );
};
