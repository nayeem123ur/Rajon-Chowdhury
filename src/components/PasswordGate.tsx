import React, { useState, useEffect, useRef } from 'react';
import {
  Lock,
  Unlock,
  KeyRound,
  Eye,
  EyeOff,
  ShieldCheck,
  Sparkles,
  Send,
  AlertCircle,
  CheckCircle2,
  Cpu,
  Flame,
} from 'lucide-react';

interface PasswordGateProps {
  onUnlock: () => void;
}

export const PasswordGate: React.FC<PasswordGateProps> = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isGranted, setIsGranted] = useState(false);
  const [shaking, setShaking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isVerifying || isGranted) return;

    const trimmed = password.trim();

    if (!trimmed) {
      setError(true);
      setErrorMessage('অনুগ্রহ করে পাসওয়ার্ডটি টাইপ করুন!');
      triggerShake();
      return;
    }

    setIsVerifying(true);
    setError(false);

    // Realistic cryptographic verification sequence
    setTimeout(() => {
      if (trimmed === '@Rc$Trader68') {
        setIsVerifying(false);
        setIsGranted(true);

        // Smooth cybernetic entry animation before giving control
        setTimeout(() => {
          onUnlock();
        }, 900);
      } else {
        setIsVerifying(false);
        setError(true);
        setErrorMessage('ভুল পাসওয়ার্ড! সঠিক পাসওয়ার্ড দিন বা টেলিগ্রামে যোগাযোগ করুন।');
        triggerShake();
      }
    }, 700);
  };

  const triggerShake = () => {
    setShaking(true);
    setTimeout(() => setShaking(false), 500);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#050002] transition-opacity duration-700 select-none overflow-y-auto ${
        isGranted ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background High-Tech Crimson Ambience & Laser Grids */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Multi-point Vampire Ambient Flares */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-b from-red-600/20 via-rose-600/10 to-transparent blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-red-700/20 blur-3xl pointer-events-none" />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-rose-600/20 blur-3xl pointer-events-none" />

        {/* Matrix Cyber Scan Lines */}
        <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#ff0033_1px,transparent_1px)] [background-size:20px_20px]" />
      </div>

      {/* Center Motion Graphic Card with 4-Sided Rotating Dynamic Vampire Border */}
      <div
        className={`w-full max-w-md relative z-10 rounded-[32px] p-[2px] transition-transform duration-300 ${
          shaking ? 'animate-gate-shake' : ''
        }`}
      >
        {/* Continuous Dynamic Blood-Red Rotating Conic Gradient Beam */}
        <div className="absolute -inset-[150%] pointer-events-none flex items-center justify-center">
          <div
            className={`w-[350%] h-[350%] ${
              isVerifying ? 'animate-border-rotate-fast' : 'animate-border-rotate'
            }`}
            style={{
              background:
                'conic-gradient(from 0deg, #ff0033, #dc2626, #7f1d1d, #ff1744, #991b1b, #ef4444, #b91c1c, #ff0033)',
            }}
          />
        </div>

        {/* Inner Card Content */}
        <div className="relative w-full rounded-[30px] bg-gradient-to-b from-[#1c0307]/98 via-[#110103]/98 to-[#070001] border border-red-500/40 shadow-[0_0_60px_rgba(255,0,51,0.35)] p-6 sm:p-8 backdrop-blur-2xl overflow-hidden">
          {/* Top Laser Scanning Line Effect */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_15px_#ff0033] animate-pulse" />

          {/* 1. Animated Logo with Holographic Rings */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="relative mb-3 group">
              {/* Outer Pulsing Beacon */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-red-600 to-rose-600 opacity-60 blur-lg animate-pulse" />

              {/* Logo Frame */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl p-0.5 bg-gradient-to-tr from-red-500 via-rose-500 to-red-700 ring-2 ring-red-400/80 shadow-2xl overflow-hidden">
                <img
                  src="/assets/aistudio/image_0a428df5.png"
                  alt="RYN Ai - Owner: RC Trader"
                  className="w-full h-full object-cover rounded-[14px]"
                />

                {/* Laser scan sweep down the logo */}
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-300 to-transparent animate-laser-sweep shadow-[0_0_15px_#22d3ee]" />
              </div>

              {/* Status Orb */}
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#150103] border-2 border-red-500 flex items-center justify-center shadow-md">
                {isGranted ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Lock className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                )}
              </div>
            </div>

            {/* Brand Title */}
            <div className="flex items-center gap-1.5">
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-wider">
                RYN Ai
              </h1>
              <ShieldCheck className="w-5 h-5 text-rose-400" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-red-950/80 border border-red-500/40 text-red-300 text-xs font-bold mt-1 tracking-wide">
              <span>Owner - Rc Trader</span>
              <span>·</span>
              <span className="text-white font-mono">VIP BOT</span>
            </div>

            <p className="text-xs text-red-200/70 mt-2 font-medium">
              বটে প্রবেশ করতে সিকিউরিটি পাসওয়ার্ডটি দিন
            </p>
          </div>

          {/* 2. Password Input Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-red-300/80 uppercase tracking-wider flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <KeyRound className="w-3.5 h-3.5 text-rose-400" />
                  Security Passcode
                </span>
                <span className="text-[10px] text-red-400/60 font-mono">ENCRYPTED</span>
              </label>

              <div
                className={`relative rounded-2xl bg-black/70 border transition-all duration-300 shadow-inner ${
                  error
                    ? 'border-red-500 ring-2 ring-red-500/50'
                    : isGranted
                    ? 'border-emerald-500 ring-2 ring-emerald-500/50'
                    : 'border-red-500/40 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/40'
                }`}
              >
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-red-400">
                  {isGranted ? (
                    <Unlock className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Lock className="w-4 h-4 text-rose-400" />
                  )}
                </div>

                <input
                  ref={inputRef}
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError(false);
                  }}
                  disabled={isVerifying || isGranted}
                  placeholder="Enter VIP Password..."
                  className="w-full pl-10 pr-11 py-3 bg-transparent text-white placeholder-red-300/30 font-mono text-sm tracking-widest focus:outline-none disabled:opacity-75"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400/70 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-1.5 p-2 rounded-xl bg-red-950/70 border border-red-500/50 text-rose-300 text-xs animate-fade-in">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span className="font-medium text-[11px]">{errorMessage}</span>
                </div>
              )}

              {/* Success Granted Message */}
              {isGranted && (
                <div className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-bold animate-fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>ACCESS GRANTED · বটের ভেতরে নিয়ে যাওয়া হচ্ছে...</span>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isVerifying || isGranted}
              className={`w-full py-3.5 px-6 rounded-2xl font-black text-xs sm:text-sm tracking-wider flex items-center justify-center gap-2 transition-all transform active:scale-98 shadow-xl cursor-pointer ${
                isGranted
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-emerald-950/80'
                  : isVerifying
                  ? 'bg-red-900/80 text-white cursor-wait opacity-90'
                  : 'bg-gradient-to-r from-red-600 via-rose-600 to-red-800 hover:from-red-500 hover:to-rose-500 text-white shadow-red-950/80 glow-red'
              }`}
            >
              {isGranted ? (
                <>
                  <Unlock className="w-4 h-4 text-white animate-bounce" />
                  <span>AUTHENTICATED · UNLOCKING BOT...</span>
                </>
              ) : isVerifying ? (
                <>
                  <Cpu className="w-4 h-4 text-white animate-spin" />
                  <span>VERIFYING PASSCODE...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
                  <span>ENTER VIP BOT (প্রবেশ করুন)</span>
                </>
              )}
            </button>
          </form>

          {/* 3. Telegram Support & Contact */}
          <div className="mt-5 pt-4 border-t border-red-500/20 text-center">
            <p className="text-[11px] text-red-300/70 mb-2">
              পাসওয়ার্ড না জানলে বা কোনো সমস্যার জন্য টেলিগ্রামে মেসেজ দিন:
            </p>
            <a
              href="https://t.me/RCTraderPublic"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-black/60 hover:bg-[#200308] border border-red-500/30 text-rose-300 hover:text-white text-xs font-bold transition-all shadow-sm group"
            >
              <Send className="w-3.5 h-3.5 text-rose-400 group-hover:translate-x-0.5 transition-transform" />
              <span>Contact: @RCTraderPublic</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
