import React from 'react';
import { motion } from 'motion/react';
import { Save, LogOut, RotateCcw, Layout, Check, Magnet, Link2 } from 'lucide-react';

interface UIEditorToolbarProps {
  onSave: () => void;
  onExit: () => void;
  onResetDefault: () => void;
  snapToGrid: boolean;
  onToggleSnap: () => void;
  syncTeamSizes: boolean;
  onToggleSyncSizes: () => void;
  hasUnsavedChanges?: boolean;
}

export const UIEditorToolbar: React.FC<UIEditorToolbarProps> = ({
  onSave,
  onExit,
  onResetDefault,
  snapToGrid,
  onToggleSnap,
  syncTeamSizes,
  onToggleSyncSizes,
}) => {
  const [savedSuccess, setSavedSuccess] = React.useState(false);

  const handleSaveClick = () => {
    onSave();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2200);
  };

  return (
    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -60, opacity: 0 }}
      className="fixed top-3 inset-x-0 z-50 flex items-center justify-center pointer-events-none px-4"
    >
      <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 px-5 py-2.5 rounded-2xl bg-black/92 border border-yellow-400/50 shadow-[0_10px_40px_rgba(0,0,0,0.9),0_0_30px_rgba(250,204,21,0.25)] backdrop-blur-xl max-w-full">
        {/* Editor Mode Indicator */}
        <div className="flex items-center gap-2 pr-3 border-r border-white/20">
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-ping" />
          <div className="flex flex-col">
            <span className="font-display font-black text-xs sm:text-sm tracking-wider text-yellow-400 uppercase flex items-center gap-1.5 whitespace-nowrap">
              <Layout className="w-4 h-4" /> UI EDITOR
            </span>
          </div>
        </div>

        {/* Snap to Grid Toggle Button */}
        <button
          id="btn-toggle-grid-snap"
          onClick={onToggleSnap}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer select-none ${
            snapToGrid
              ? 'bg-sky-500/25 border-sky-400 text-sky-300 shadow-[0_0_12px_rgba(56,189,248,0.4)]'
              : 'bg-white/5 border-white/15 text-slate-400 hover:text-slate-200'
          }`}
          title="Toggle Snap to 20px Grid Boxes on/off"
        >
          <Magnet className={`w-3.5 h-3.5 ${snapToGrid ? 'text-sky-400' : 'text-slate-400'}`} />
          <span>SNAP GRID:</span>
          <span className={snapToGrid ? 'text-sky-300 font-extrabold' : 'text-slate-500'}>
            {snapToGrid ? 'ON' : 'OFF'}
          </span>
        </button>

        {/* Sync Team Sizes Checker / Toggle Button */}
        <button
          id="btn-toggle-sync-sizes"
          onClick={onToggleSyncSizes}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer select-none ${
            syncTeamSizes
              ? 'bg-amber-500/25 border-amber-400 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.4)]'
              : 'bg-white/5 border-white/15 text-slate-400 hover:text-slate-200'
          }`}
          title="When enabled, resizing Team 1 box automatically mirrors the size to Team 2 box (and vice-versa) while keeping positions independent"
        >
          <Link2 className={`w-3.5 h-3.5 ${syncTeamSizes ? 'text-amber-400' : 'text-slate-400'}`} />
          <span>SYNC SIZES:</span>
          <span className={syncTeamSizes ? 'text-amber-300 font-extrabold' : 'text-slate-500'}>
            {syncTeamSizes ? 'ON' : 'OFF'}
          </span>
        </button>

        <div className="hidden md:block w-[1px] h-4 bg-white/20" />

        {/* Reset to Default Layout */}
        <button
          onClick={onResetDefault}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-semibold text-slate-300 hover:text-white transition-all cursor-pointer"
          title="Reset to default layout positions"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>

        {/* Save Layout Button with visual feedback */}
        <button
          onClick={handleSaveClick}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-white text-xs sm:text-sm font-bold shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all cursor-pointer hover:scale-105 active:scale-95 ${
            savedSuccess
              ? 'bg-emerald-500 ring-2 ring-white'
              : 'bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400'
          }`}
          title="Save layout positions and sizes"
        >
          {savedSuccess ? (
            <>
              <Check className="w-4 h-4 text-white" />
              <span>SAVED!</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>SAVE</span>
            </>
          )}
        </button>

        {/* Exit UI Editor Button */}
        <button
          onClick={onExit}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-rose-600/80 hover:bg-rose-500 border border-rose-400/40 text-white text-xs sm:text-sm font-bold shadow-[0_0_15px_rgba(225,29,72,0.3)] transition-all cursor-pointer hover:scale-105 active:scale-95"
          title="Exit UI Editor mode"
        >
          <LogOut className="w-4 h-4" />
          <span>EXIT</span>
        </button>
      </div>
    </motion.div>
  );
};
