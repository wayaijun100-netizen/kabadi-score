import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, Flame, X, RotateCcw, Play } from 'lucide-react';

interface DoOrDieOverlayProps {
  isActive: boolean;
  showWarning: boolean;
  onDismissWarning: () => void;
  onResetBoth?: () => void;
  resetKeyLabel?: string;
  thirdRaidKeyLabel?: string;
}

export const DoOrDieOverlay: React.FC<DoOrDieOverlayProps> = ({
  isActive,
  showWarning,
  onDismissWarning,
  onResetBoth,
  resetKeyLabel = 'R',
  thirdRaidKeyLabel = 'D',
}) => {
  // Auto-dismiss warning banner after 4.5 seconds so it doesn't block the screen during active play
  useEffect(() => {
    if (!showWarning) return;
    const timer = setTimeout(() => {
      onDismissWarning();
    }, 4500);
    return () => clearTimeout(timer);
  }, [showWarning, onDismissWarning]);

  return (
    <AnimatePresence>
      {showWarning && (
        <motion.div
          key="do-or-die-warning-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 pointer-events-auto flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
          onClick={onDismissWarning}
        >
          {/* Pulsing hazard strobe border behind modal */}
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-amber-500 via-red-600 to-amber-500 animate-pulse" />
          <div className="absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-amber-500 via-red-600 to-amber-500 animate-pulse" />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.8, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.85, y: -20, opacity: 0 }}
            transition={{ type: 'spring', damping: 22, stiffness: 320 }}
            className="relative w-full max-w-2xl rounded-3xl bg-gradient-to-b from-slate-900 via-black to-slate-950 border-2 border-red-500/80 shadow-[0_0_80px_rgba(239,68,68,0.6)] p-6 sm:p-8 overflow-hidden text-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient Background Glow */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-600/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onDismissWarning}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
              title="Dismiss warning (or press ESC / auto-closes in 4s)"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Top Pill Beacon */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/90 border border-amber-400/80 text-amber-200 text-xs sm:text-sm font-mono font-black tracking-widest uppercase shadow-[0_0_20px_rgba(239,68,68,0.8)] mb-4 animate-pulse">
              <Flame className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span>OFFICIAL 3RD RAID ACTIVATION</span>
              <AlertTriangle className="w-4 h-4 text-yellow-300" />
            </div>

            {/* Main Headline */}
            <h2 className="font-display font-black text-3xl sm:text-5xl tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-400 to-red-600 uppercase drop-shadow-[0_0_25px_rgba(239,68,68,0.9)] mb-3">
              DO OR DIE RAID
            </h2>

            {/* Warning Rule Text */}
            <p className="text-sm sm:text-base font-sans text-slate-200 font-medium max-w-lg mx-auto leading-relaxed mb-6">
              Consecutive empty raids recorded. The raider <span className="text-amber-300 font-bold">must score a point</span>, or the defending team will be awarded one point and the raider is declared <span className="text-red-400 font-bold">OUT</span>!
            </p>

            {/* Status Card */}
            <div className="p-4 rounded-2xl bg-black/60 border border-white/10 flex items-center justify-between gap-4 max-w-md mx-auto mb-6 text-left">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500" />
                </span>
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                    <span>30s Raid Timer Running</span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-400">
                    Standard raid clock initiated
                  </div>
                </div>
              </div>

              <div className="text-right font-mono text-xs text-amber-400">
                HOTKEY: <span className="font-bold text-white bg-white/10 px-2 py-0.5 rounded">{thirdRaidKeyLabel}</span>
              </div>
            </div>

            {/* Quick Operator Action Buttons */}
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <button
                onClick={onDismissWarning}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(239,68,68,0.5)] active:scale-95"
              >
                Continue Match (Dismiss)
              </button>

              {onResetBoth && (
                <button
                  onClick={() => {
                    onResetBoth();
                    onDismissWarning();
                  }}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-slate-300 hover:text-white font-mono text-xs sm:text-sm transition-all flex items-center gap-2 active:scale-95"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset Clock &amp; 3rd Raid ({resetKeyLabel})</span>
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
