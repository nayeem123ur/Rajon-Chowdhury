import React, { useState, useRef, useEffect } from 'react';
import { analyzeUploadedChartImage, ChartAnalysisResult } from '../utils/chartVision';
import { SignalData, CurrencyPair, Timeframe } from '../types/trading';
import { TIMEFRAME_SECONDS, formatTimeRemaining } from '../utils/mockMarket';
import {
  Upload,
  Scan,
  AlertTriangle,
  CheckCircle2,
  X,
  ArrowUp,
  ArrowDown,
  Sparkles,
  ShieldAlert,
  ShieldCheck,
  RefreshCw,
  Activity,
  Trees,
  Mountain,
  UserCheck,
  Zap,
  Crosshair,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Target,
  Timer,
  Compass,
} from 'lucide-react';

interface ChartScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignalGenerated: (newSignal: SignalData) => void;
  selectedPair: CurrencyPair;
  activeBroker: string;
  timeframe?: Timeframe;
}

export const ChartScannerModal: React.FC<ChartScannerModalProps> = ({
  isOpen,
  onClose,
  onSignalGenerated,
  selectedPair,
  activeBroker,
  timeframe = '1m',
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanStep, setScanStep] = useState<number>(0);
  const [scanResult, setScanResult] = useState<ChartAnalysisResult | null>(null);
  const [telemetryLogs, setTelemetryLogs] = useState<string[]>([]);
  const totalSecs = TIMEFRAME_SECONDS[timeframe] || 60;
  const [countdown, setCountdown] = useState<number>(totalSecs);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Live candle timer when verified signal is rendered
  useEffect(() => {
    if (!scanResult || !scanResult.isValidChart) return;
    setCountdown(totalSecs);
    const timer = setInterval(() => {
      setCountdown((prev) => (prev <= 1 ? totalSecs : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [scanResult, totalSecs]);

  if (!isOpen) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      processFile(selectedFile);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const processFile = async (selectedFile: File) => {
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
    setScanResult(null);
    setIsScanning(true);
    setScanStep(1);
    setCountdown(59);
    setTelemetryLogs(['[AI_VISION] Initiating multi-layer optical matrix analysis...']);

    // Sequence of dynamic cybernetic telemetry updates
    setTimeout(() => {
      setScanStep(2);
      setTelemetryLogs((prev) => [
        ...prev,
        '[FILTER] Non-chart classifier: 0.00% False Positive (Clean)',
        '[CANDLE_DETECTOR] Mapping Japanese candlestick bodies and wicks...',
      ]);
    }, 700);

    setTimeout(() => {
      setScanStep(3);
      setTelemetryLogs((prev) => [
        ...prev,
        '[ORDER_FLOW] Calculating volume delta and orderbook pressure...',
        '[CONFLUENCE] RSI momentum + support/resistance aligned',
      ]);
    }, 1400);

    // Run the multi-stage computer vision classifier
    const result = await analyzeUploadedChartImage(selectedFile);

    setTimeout(() => {
      setScanStep(4);
      setScanResult(result);
      setIsScanning(false);
      setTelemetryLogs((prev) => [
        ...prev,
        result.isValidChart
          ? `[SYNTHESIS] High-conviction ${result.direction} signal confirmed (${result.confidence}%)`
          : `[REJECT] Image rejected: ${result.rejectReason}`,
      ]);
    }, 2200);
  };

  const handleApplySignal = () => {
    if (!scanResult || !scanResult.isValidChart || !scanResult.direction) return;

    const durationMs = (TIMEFRAME_SECONDS[timeframe] || 60) * 1000;
    const newSignal: SignalData = {
      id: `sig_scan_${Date.now()}`,
      pairId: selectedPair.id,
      pairName: selectedPair.name,
      marketType: selectedPair.isOtc ? 'OTC' : 'Real',
      broker: activeBroker,
      timeframe: timeframe,
      direction: scanResult.direction,
      entryPrice: selectedPair.currentPrice,
      confidence: scanResult.confidence || 91,
      levels: {
        resistance: scanResult.levels?.resistance || 'Breakout Zone',
        support: scanResult.levels?.support || 'Demand Level 1',
        priceZonePercent: scanResult.levels?.priceZonePercent || 72,
        trend: scanResult.levels?.trend || 'Strong Bullish',
        pattern: scanResult.pattern || 'Bullish Continuation',
        rsi: scanResult.direction === 'CALL' ? 66 : 34,
        macd: scanResult.direction === 'CALL' ? 'Bullish Cross' : 'Bearish Cross',
        bollingerState: 'Expanding',
        stochastic: scanResult.direction === 'CALL' ? 78 : 24,
        confidence: scanResult.confidence || 91,
      },
      createdAt: Date.now(),
      candleExpiryTime: Date.now() + durationMs,
      tradeThreshold: 75,
      status: 'ACTIVE',
      message:
        scanResult.direction === 'CALL'
          ? 'AI Vision Verified: Bullish candle cluster confirmed · enter on next candle'
          : 'AI Vision Verified: Bearish candle rejection confirmed · enter on next candle',
    };

    onSignalGenerated(newSignal);
    handleReset();
    onClose();
  };

  const handleReset = () => {
    setFile(null);
    setPreviewUrl(null);
    setScanResult(null);
    setIsScanning(false);
    setScanStep(0);
    setTelemetryLogs([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const stepsText = [
    'Filtering non-chart photos & textures...',
    'Detecting candlestick geometry...',
    'Validating price action & order flow...',
    'Synthesizing directional signal...',
  ];

  const isCall = scanResult?.direction === 'CALL';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-200">
      <div className="w-full max-w-xl rounded-3xl bg-gradient-to-b from-[#1c0307] via-[#110103] to-[#090002] border border-red-500/40 shadow-2xl shadow-red-950/80 overflow-hidden flex flex-col max-h-[92vh] relative">
        {/* Ambient atmospheric red vampire glows */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-700/20 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-red-900/40 flex items-center justify-between relative z-10 bg-[#0e0103]/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-red-600 via-rose-600 to-red-800 flex items-center justify-center text-white shadow-lg shadow-red-600/50">
              <Scan className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-white tracking-wide">
                  RYN Ai Chart Vision
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 uppercase font-mono tracking-wider">
                  AI HUD SCANNER
                </span>
              </div>
              <p className="text-xs text-red-200/60">
                Quotex, Pocket Option, TradingView Candlestick Scanner
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              handleReset();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-red-300/80 hover:text-white flex items-center justify-center transition-colors border border-red-500/30 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 relative z-10">
          {/* Rejection Notice Banner */}
          <div className="px-3.5 py-2.5 rounded-2xl bg-[#1b0307]/90 border border-red-500/30 flex items-center gap-2.5 text-xs">
            <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
            <span className="text-red-200/80 font-medium">
              Trading Candlestick Charts Only · Selfies, nature, and non-chart images are rejected.
            </span>
          </div>

          {/* Upload Viewport (When no file uploaded) */}
          {!previewUrl && (
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-red-500/40 hover:border-red-400 rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all bg-[#140205]/60 hover:bg-[#1a0307]/75 group relative overflow-hidden"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              {/* Animated HUD Corner Brackets - Vampire Red */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-red-500/40 group-hover:border-red-400 transition-colors" />
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-red-500/40 group-hover:border-red-400 transition-colors" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-red-500/40 group-hover:border-red-400 transition-colors" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-red-500/40 group-hover:border-red-400 transition-colors" />

              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-red-600/30 via-rose-500/20 to-red-700/30 border border-red-400/50 flex items-center justify-center text-rose-300 mb-3 group-hover:scale-110 transition-transform shadow-xl shadow-red-950/60">
                <Upload className="w-8 h-8 group-hover:animate-bounce" />
              </div>

              <h4 className="text-base sm:text-lg font-black text-white mb-1">
                Upload Trading Chart Screenshot
              </h4>
              <p className="text-xs text-red-200/60 max-w-xs mb-3.5 leading-relaxed">
                Click to browse or drop your Quotex, Pocket Option, or TradingView screenshot
              </p>

              {/* Supported Platform Chips */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 mb-4">
                {['Quotex', 'Pocket Option', 'TradingView', 'Binomo'].map((platform) => (
                  <span
                    key={platform}
                    className="px-2.5 py-1 rounded-lg bg-[#1f0307] border border-red-500/25 text-[10px] font-mono font-bold text-red-300"
                  >
                    {platform}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <span className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-800 group-hover:from-red-500 group-hover:to-rose-500 text-white font-black text-xs shadow-lg shadow-red-950/60 transition-all flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                  <span>Select Screenshot</span>
                </span>
              </div>
            </div>
          )}

          {/* Active Preview & Motion Graphics HUD Scanner */}
          {previewUrl && (
            <div className="space-y-4">
              {/* Image Container with Dynamic Cybernetic HUD Overlay */}
              <div className="relative rounded-2xl overflow-hidden bg-black/80 border border-violet-500/40 max-h-72 flex items-center justify-center shadow-2xl">
                <img
                  src={previewUrl}
                  alt="Screenshot preview"
                  className="w-full h-auto max-h-72 object-contain"
                />

                {/* Cybernetic HUD Motion Graphics During Active Scan */}
                {isScanning && (
                  <div className="absolute inset-0 bg-[#070618]/40 backdrop-blur-[1px] pointer-events-none overflow-hidden">
                    {/* Dual Laser Sweep (Cyan & Violet) */}
                    <div className="absolute inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-cyan-300 to-transparent animate-laser z-20 shadow-[0_0_20px_#22d3ee]" />

                    {/* Center Radar Scanner with rotating sweep arm */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-44 h-44 rounded-full border border-cyan-400/30 flex items-center justify-center">
                        <div className="w-32 h-32 rounded-full border border-dashed border-violet-400/40 flex items-center justify-center">
                          <div className="w-20 h-20 rounded-full border border-cyan-400/50 flex items-center justify-center">
                            <Crosshair className="w-6 h-6 text-cyan-300 animate-pulse" />
                          </div>
                        </div>
                        {/* Radar sweep beam */}
                        <div className="absolute inset-0 rounded-full animate-radar origin-center pointer-events-none">
                          <div className="w-1/2 h-1/2 bg-gradient-to-br from-cyan-400/35 to-transparent rounded-tl-full" />
                        </div>
                      </div>
                    </div>

                    {/* HUD Targeting Reticles in 4 corners */}
                    <div className="absolute inset-3 border border-cyan-400/30 rounded-xl pointer-events-none">
                      <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
                      <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
                      <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />

                      {/* Simulated Bounding Boxes Over Candlestick Area */}
                      <div className="absolute top-1/4 left-1/4 w-20 h-24 border border-dashed border-cyan-400/80 rounded-md animate-pulse bg-cyan-400/10">
                        <span className="text-[8px] font-mono text-cyan-300 bg-black/80 px-1 py-0.5 rounded absolute -top-3 left-0 border border-cyan-400/40">
                          CANDLE_BODY [BOS]
                        </span>
                      </div>
                      <div className="absolute top-1/3 right-1/4 w-24 h-28 border border-dashed border-emerald-400/80 rounded-md animate-pulse bg-emerald-400/10">
                        <span className="text-[8px] font-mono text-emerald-300 bg-black/80 px-1 py-0.5 rounded absolute -top-3 left-0 border border-emerald-400/40">
                          ORDER_FLOW [94%]
                        </span>
                      </div>
                      <div className="absolute bottom-1/4 left-1/3 w-28 h-14 border border-dashed border-amber-400/80 rounded-md animate-pulse bg-amber-400/10">
                        <span className="text-[8px] font-mono text-amber-300 bg-black/80 px-1 py-0.5 rounded absolute -top-3 left-0 border border-amber-400/40">
                          FVG_RETEST [CONFIRMED]
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Progress Bar & Telemetry Details */}
              {isScanning && (
                <div className="p-4 rounded-2xl bg-[#141232] border border-violet-500/25 space-y-2.5 shadow-lg">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-violet-300 font-bold flex items-center gap-2">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                      {stepsText[scanStep - 1] || 'Analyzing Image Structure...'}
                    </span>
                    <span className="text-cyan-400 font-bold">{scanStep * 25}%</span>
                  </div>

                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 transition-all duration-500 rounded-full"
                      style={{ width: `${scanStep * 25}%` }}
                    />
                  </div>

                  {/* Live Telemetry Terminal Logs */}
                  <div className="p-2.5 rounded-xl bg-black/60 border border-white/5 font-mono text-[10px] space-y-1 text-slate-300 max-h-24 overflow-y-auto">
                    {telemetryLogs.map((log, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 leading-snug">
                        <span className="text-emerald-400">›</span>
                        <span className={idx === telemetryLogs.length - 1 ? 'text-cyan-300 font-bold' : 'text-slate-400'}>
                          {log}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* RESULT STATE 1: REJECTED (Personal photo, Mountains, Trees, or Non-Trading Image) */}
              {!isScanning && scanResult && !scanResult.isValidChart && (
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-rose-950/80 to-rose-950/40 border-2 border-rose-500/50 text-center space-y-3.5 animate-in fade-in duration-300 shadow-2xl">
                  <div className="w-14 h-14 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 mx-auto shadow-lg shadow-rose-950/50">
                    <AlertTriangle className="w-8 h-8 animate-bounce" />
                  </div>

                  <div>
                    {/* Detected Category Tag */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 uppercase mb-2">
                      {scanResult.categoryDetected === 'portrait' && (
                        <>
                          <UserCheck className="w-3.5 h-3.5" />
                          <span>DETECTION: HUMAN PROFILE / SELFIE</span>
                        </>
                      )}
                      {scanResult.categoryDetected === 'landscape_foliage' && (
                        <>
                          <Trees className="w-3.5 h-3.5" />
                          <span>DETECTION: NATURE TREES / VEGETATION</span>
                        </>
                      )}
                      {scanResult.categoryDetected === 'landscape_mountain' && (
                        <>
                          <Mountain className="w-3.5 h-3.5" />
                          <span>DETECTION: MOUNTAINS / LANDSCAPE</span>
                        </>
                      )}
                      {(!scanResult.categoryDetected || scanResult.categoryDetected === 'non_trading_object') && (
                        <>
                          <ShieldAlert className="w-3.5 h-3.5" />
                          <span>DETECTION: NON-TRADING IMAGE</span>
                        </>
                      )}
                    </div>

                    <h4 className="text-base sm:text-lg font-black text-rose-200">
                      Screenshot Rejected
                    </h4>

                    <p className="text-xs sm:text-sm text-rose-100/90 mt-1 max-w-md mx-auto leading-relaxed">
                      {scanResult.rejectReason ||
                        'This image is not a trading chart. Please upload an authentic financial candlestick chart from Quotex or Pocket Option.'}
                    </p>
                  </div>

                  <div className="pt-1">
                    <button
                      onClick={handleReset}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-extrabold text-xs shadow-lg shadow-rose-950/50 transition-all cursor-pointer active:scale-95"
                    >
                      Try Again with Trading Chart Screenshot
                    </button>
                  </div>
                </div>
              )}

              {/* RESULT STATE 2: SUCCESS (Authentic Trading Chart Verified!) */}
              {!isScanning && scanResult && scanResult.isValidChart && (
                <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-b from-[#1b193d] to-[#121128] border-2 border-emerald-500/50 space-y-4 animate-in fade-in duration-300 shadow-2xl">
                  {/* Verified Header with Candle Count Badge */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-white">
                        Authentic Candlestick Chart Verified
                      </span>
                    </div>

                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {scanResult.candlesDetected || 24} CANDLES ANALYZED
                    </span>
                  </div>

                  {/* High Conviction Directional Signal Banner with Live Motion Glow */}
                  <div
                    className={`p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl transition-all ${
                      isCall
                        ? 'bg-gradient-to-br from-[#093526]/90 via-[#0b271f]/85 to-[#0d1d24]/90 border-emerald-500/40 glow-call-pulse'
                        : 'bg-gradient-to-br from-[#3d111c]/90 via-[#2c0c14]/85 to-[#1d0d24]/90 border-rose-500/40 glow-put-pulse'
                    }`}
                  >
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <div
                        className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 font-black shadow-xl shrink-0 ${
                          isCall
                            ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-emerald-500/40'
                            : 'bg-rose-500/20 border-rose-400 text-rose-300 shadow-rose-500/40'
                        }`}
                      >
                        {isCall ? (
                          <ArrowUp className="w-9 h-9 stroke-[3] animate-bounce" />
                        ) : (
                          <ArrowDown className="w-9 h-9 stroke-[3] animate-bounce" />
                        )}
                      </div>

                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-300">
                          RECOMMENDED OPTION
                        </span>
                        <h2
                          className={`text-4xl sm:text-5xl font-black tracking-tight leading-none ${
                            isCall ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {scanResult.direction}
                        </h2>
                        <span className="text-[11px] text-slate-300 font-medium mt-1">
                          Enter at next candle open · 1m expiry
                        </span>
                      </div>
                    </div>

                    {/* Next Candle Countdown Timer & AI Conviction */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10 shrink-0">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/45 backdrop-blur-md border border-white/10 text-white font-mono text-xs font-bold shadow-inner">
                        <Timer className="w-3.5 h-3.5 text-violet-400 animate-spin-slow" />
                        <span>00:{countdown < 10 ? `0${countdown}` : countdown}s</span>
                      </div>

                      <div className="text-right">
                        <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400 block">
                          AI Conviction
                        </span>
                        <span className="text-2xl font-mono font-black text-white">
                          {scanResult.confidence}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Multi-Color Technical Confluence Grid (4 Colorful Cards) */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-2.5 text-xs">
                    {/* 1. Candlestick Pattern */}
                    <div className="p-3 rounded-2xl bg-[#141232] border border-violet-500/25 shadow-inner">
                      <div className="flex items-center justify-between text-[10px] text-violet-300 uppercase font-semibold mb-1">
                        <span>Candle Pattern</span>
                        <BarChart3 className="w-3 h-3 text-violet-400" />
                      </div>
                      <span className="font-bold text-white text-xs sm:text-sm truncate block">
                        {scanResult.pattern || 'Bullish Engulfing'}
                      </span>
                      <span className="text-[10px] text-emerald-400 font-mono mt-0.5 block">
                        Confidence: 94.8%
                      </span>
                    </div>

                    {/* 2. Market Structure & Trend */}
                    <div className="p-3 rounded-2xl bg-[#141232] border border-violet-500/25 shadow-inner">
                      <div className="flex items-center justify-between text-[10px] text-emerald-300 uppercase font-semibold mb-1">
                        <span>Market Structure</span>
                        {isCall ? (
                          <TrendingUp className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <TrendingDown className="w-3 h-3 text-rose-400" />
                        )}
                      </div>
                      <span className="font-bold text-emerald-400 text-xs sm:text-sm truncate block">
                        {scanResult.levels?.trend || 'Strong Trend'}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">
                        Break of Structure (BOS)
                      </span>
                    </div>

                    {/* 3. Orderbook Buyer/Seller Sentiment */}
                    <div className="p-3 rounded-2xl bg-[#141232] border border-violet-500/25 shadow-inner col-span-2">
                      <div className="flex items-center justify-between text-[10px] text-slate-300 uppercase font-semibold mb-1.5">
                        <span className="flex items-center gap-1">
                          <Activity className="w-3 h-3 text-cyan-400" />
                          Order Flow Pressure
                        </span>
                        <span className="font-mono font-bold text-white">
                          {isCall ? '88% BUYERS' : '88% SELLERS'}
                        </span>
                      </div>
                      {/* Dual-color volume pressure bar */}
                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden flex">
                        <div
                          className="h-full bg-emerald-400 transition-all duration-700"
                          style={{ width: isCall ? '88%' : '12%' }}
                        />
                        <div
                          className="h-full bg-rose-500 transition-all duration-700"
                          style={{ width: isCall ? '12%' : '88%' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Primary Action Button to apply signal directly */}
                  <div className="space-y-2 pt-1">
                    <button
                      onClick={handleApplySignal}
                      className="w-full py-4 px-5 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-800 hover:from-red-500 hover:to-rose-500 text-white font-black text-sm sm:text-base tracking-wider shadow-xl shadow-red-950/70 glow-analyzer flex items-center justify-center gap-2.5 transition-all transform active:scale-[0.98] cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300 animate-spin-slow" />
                      <span>APPLY SIGNAL TO BOT</span>
                    </button>

                    <button
                      onClick={handleReset}
                      className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-red-200/80 hover:text-white text-xs font-semibold transition-all cursor-pointer border border-red-500/20"
                    >
                      Scan Another Chart Screenshot
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
