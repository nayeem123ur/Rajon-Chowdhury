import React, { useState } from 'react';
import { sound } from '../utils/sound';
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
      name: 'RC AI Neural Trend',
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
      <div className="rounded-3xl bg-[#171638]/90 border border-violet-500/20 p-5 backdrop-blur-xl">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400" />
          Algorithm Presets
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {strategies.map((strat) => {
            const isSelected = activeStrategy === strat.id;
            return (
              <div
                key={strat.id}
                onClick={() => {
                  sound.playClick();
                  setActiveStrategy(strat.id);
                  onApplyStrategy(strat.name);
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-b from-violet-900/40 to-[#1f1e42] border-violet-500 ring-2 ring-violet-500/40 shadow-lg'
                    : 'bg-[#1a193b]/70 hover:bg-[#22214d] border-violet-500/15'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {strat.accuracy} Accuracy
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {strat.timeframes}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white mb-1">
                    {strat.name}
                  </h4>
                  <p className="text-xs text-slate-400 leading-snug">
                    {strat.desc}
                  </p>
                </div>

                <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-violet-300">
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
      <div className="rounded-3xl bg-[#171638]/90 border border-violet-500/20 p-5 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Calculator className="w-4 h-4 text-emerald-400" />
              Martingale Calculator
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Maximum recommended: Step 1 or Step 2.
            </p>
          </div>

          {/* Quick inputs */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#14132e] border border-violet-500/20">
              <span className="text-xs text-slate-400">$</span>
              <input
                type="number"
                min="1"
                value={initialAmount}
                onChange={(e) => setInitialAmount(Math.max(1, Number(e.target.value)))}
                className="w-14 bg-transparent text-white font-mono text-sm font-bold focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#14132e] border border-violet-500/20">
              <span className="text-xs text-slate-400">%</span>
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
              <tr className="border-b border-violet-900/30 text-slate-400 font-bold uppercase text-[10px]">
                <th className="pb-2">Level</th>
                <th className="pb-2">Trade</th>
                <th className="pb-2">Cumulative Risk</th>
                <th className="pb-2 text-right">Net Profit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-violet-900/20 font-mono">
              <tr>
                <td className="py-2.5 font-bold text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Step 0
                </td>
                <td className="py-2.5 text-slate-200">${step1}</td>
                <td className="py-2.5 text-slate-400">${step1}</td>
                <td className="py-2.5 text-right font-black text-emerald-400">+${profitStep1}</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-amber-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  Step 1
                </td>
                <td className="py-2.5 text-slate-200">${step2}</td>
                <td className="py-2.5 text-slate-400">${step1 + step2}</td>
                <td className="py-2.5 text-right font-black text-emerald-400">+${profitStep2}</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-rose-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-400" />
                  Step 2
                </td>
                <td className="py-2.5 text-slate-200">${step3}</td>
                <td className="py-2.5 text-slate-400">${step1 + step2 + step3}</td>
                <td className="py-2.5 text-right font-black text-emerald-400">+${profitStep3}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
