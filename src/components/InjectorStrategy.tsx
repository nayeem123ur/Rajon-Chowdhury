import React, { useState } from 'react';
import { Syringe, Calculator, ShieldAlert, CheckCircle, Zap } from 'lucide-react';

interface InjectorStrategyProps {
  onApplyStrategy: (strategyName: string) => void;
}

export const InjectorStrategy: React.FC<InjectorStrategyProps> = ({ onApplyStrategy }) => {
  const [initialAmount, setInitialAmount] = useState<number>(10);
  const [payoutRate, setPayoutRate] = useState<number>(88);
  const [activeStrategy, setActiveStrategy] = useState<string>('ai_neural');

  const strategies = [
    {
      id: 'ai_neural',
      name: 'RYN Neural Trend',
      accuracy: '94.6%',
      timeframes: '1m · 2m',
      desc: 'Order flow spikes & EMA crossovers.',
    },
    {
      id: 'sr_reversal',
      name: 'Price Action S/R',
      accuracy: '91.8%',
      timeframes: '1m · 5m',
      desc: 'Rejection wicks at key institutional levels.',
    },
    {
      id: 'otc_algo',
      name: 'OTC Candle Breakout',
      accuracy: '93.2%',
      timeframes: '30s · 1m',
      desc: 'Optimized for Quotex & Pocket Option OTC.',
    },
  ];

  // Calculate 3-step Martingale ladder
  const step1 = initialAmount;
  const step2 = Math.round(initialAmount * 2.2);
  const step3 = Math.round(initialAmount * 4.9);

  const profitStep1 = (step1 * (payoutRate / 100)).toFixed(2);
  const profitStep2 = (step2 * (payoutRate / 100) - step1).toFixed(2);
  const profitStep3 = (step3 * (payoutRate / 100) - step1 - step2).toFixed(2);

  return (
    <div className="space-y-5">
      {/* 1. Algorithmic Strategy Presets */}
      <div className="rounded-3xl bg-[#140205]/90 border border-red-500/25 p-5 backdrop-blur-xl shadow-xl shadow-red-950/40">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
          <Zap className="w-4 h-4 text-rose-400" />
          Algorithm Presets
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {strategies.map((strat) => {
            const isSelected = activeStrategy === strat.id;
            return (
              <div
                key={strat.id}
                onClick={() => {
                  setActiveStrategy(strat.id);
                  onApplyStrategy(strat.name);
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-b from-red-950/60 to-[#1e0307] border-red-500 ring-2 ring-red-500/40 shadow-lg shadow-red-950/60'
                    : 'bg-[#180205]/70 hover:bg-[#250409] border-red-500/15'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      {strat.accuracy} Accuracy
                    </span>
                    <span className="text-[10px] font-mono text-red-300/60">
                      {strat.timeframes}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white mb-1">
                    {strat.name}
                  </h4>
                  <p className="text-xs text-red-200/60 leading-snug">
                    {strat.desc}
                  </p>
                </div>

                <div className="mt-3 pt-3 border-t border-red-500/15 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-rose-300">
                    {isSelected ? 'Active' : 'Apply'}
                  </span>
                  {isSelected && <CheckCircle className="w-4 h-4 text-emerald-400" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Martingale Risk Management Calculator */}
      <div className="rounded-3xl bg-[#140205]/90 border border-red-500/25 p-5 backdrop-blur-xl shadow-xl shadow-red-950/40">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Calculator className="w-4 h-4 text-emerald-400" />
              Martingale Calculator
            </h3>
            <p className="text-xs text-red-200/60 mt-0.5">
              Owner: RC Trader Rule — Maximum recommended: Step 1 or Step 2.
            </p>
          </div>

          {/* Quick inputs */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#1c0307] border border-red-500/25">
              <span className="text-xs text-red-300/60">$</span>
              <input
                type="number"
                min="1"
                value={initialAmount}
                onChange={(e) => setInitialAmount(Math.max(1, Number(e.target.value)))}
                className="w-14 bg-transparent text-white font-mono text-sm font-bold focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#1c0307] border border-red-500/25">
              <span className="text-xs text-red-300/60">%</span>
              <input
                type="number"
                min="50"
                max="98"
                value={payoutRate}
                onChange={(e) => setPayoutRate(Math.min(98, Math.max(50, Number(e.target.value))))}
                className="w-12 bg-transparent text-white font-mono text-sm font-bold focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Martingale Calculation Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-red-900/30 text-red-300/70 font-bold uppercase text-[10px]">
                <th className="pb-2">Level</th>
                <th className="pb-2">Trade</th>
                <th className="pb-2">Cumulative Risk</th>
                <th className="pb-2 text-right">Net Profit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-red-900/20 font-mono">
              <tr>
                <td className="py-2.5 font-bold text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Step 0
                </td>
                <td className="py-2.5 text-slate-200">${step1}</td>
                <td className="py-2.5 text-red-300/70">${step1}</td>
                <td className="py-2.5 text-right font-black text-emerald-400">+${profitStep1}</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-amber-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  Step 1
                </td>
                <td className="py-2.5 text-slate-200">${step2}</td>
                <td className="py-2.5 text-red-300/70">${step1 + step2}</td>
                <td className="py-2.5 text-right font-black text-emerald-400">+${profitStep2}</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-rose-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  Step 2
                </td>
                <td className="py-2.5 text-slate-200">${step3}</td>
                <td className="py-2.5 text-red-300/70">${step1 + step2 + step3}</td>
                <td className="py-2.5 text-right font-black text-emerald-400">+${profitStep3}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
